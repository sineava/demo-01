<template>
  <el-form
    ref="ruleForm"
    size="medium"
    :model="ruleForm"
    :rules="rules"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" />安全形式分析评估
    </div>
    <el-descriptions
      class="descriptions"
      :column="7"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      direction="vertical"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />企业名称</template>
        <el-form-item v-if="isEdit" prop="enterpriseId">
          <el-select
            v-model="ruleForm.enterpriseId"
            clearable
            placeholder="请选择企业名称"
            @change="change"
          >
            <el-option
              v-for="(item,index) in enterpriseList"
              :key="index"
              :label="item.enterpriseName"
              :value="item.enterpriseId"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{ ruleForm.enterpriseName }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="评估单位">
        {{ ruleForm.orgName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />年份</template>
        <el-form-item v-if="isEdit" prop="appraisalYear">
          <el-date-picker
            v-model="ruleForm.appraisalYear"
            value-format="yyyy"
            type="year"
            style="width: 100%;"
            placeholder="请选择年份"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.appraisalYear }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />季度</template>
        <el-form-item v-if="isEdit" prop="appraisalQuarter">
          <el-select
            v-model="ruleForm.appraisalQuarter"
            clearable
            placeholder="请选择季度"
          >
            <el-option label="一季度" :value="1" />
            <el-option label="二季度" :value="2" />
            <el-option label="三季度" :value="3" />
            <el-option label="四季度" :value="4" />
          </el-select>
        </el-form-item>
        <span v-else>{{ ruleForm.appraisalQuarter ? ['一季度','二季度','三季度','四季度'][ruleForm.appraisalQuarter-1] : '' }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="风险等级">
        {{ ruleForm.gradeName }}
      </el-descriptions-item>
      <el-descriptions-item label="风险值">
        {{ ruleForm.riskValue }}
      </el-descriptions-item>
      <el-descriptions-item label="分析时间">
        {{ ruleForm.updateTime }}
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    enterprise:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      ruleForm: {},
      enterpriseList:[],
      rules: {
        enterpriseId:[
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],
        appraisalQuarter:[
          { required: true, message: '请选择季度', trigger: 'change' }
        ],
        appraisalYear:[
          { required: true, message: '请选择年度', trigger: 'change' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.ruleForm = this.initData(newV)
      },
      deep:true
    },
    enterprise:{
      handler(newV){
        this.enterpriseList = newV
      },
      deep:true
    }
  },
  mounted() {
    this.ruleForm = this.initData(this.data)
  },
  methods: {
    change(val){
      for (let i = 0;i<this.enterpriseList.length;i++){
        if (val===this.enterpriseList[i].enterpriseId){
          this.ruleForm.enterpriseName = this.enterpriseList[i].enterpriseName
          this.ruleForm.firmInfoId = this.enterpriseList[i].id
          return true
        }
      }
    },
    initData(data){
      return {
        id:data?.id,
        orgId:data?.orgId, // 评估单位ID
        orgName:data?.orgName,// 评估单位名称
        enterpriseId:data?.enterpriseId, // 企业ID
        enterpriseName:data?.enterpriseName,// 企业名称
        firmInfoId:data?.firmInfoId,
        updateTime:data?.updateTime,// 分析时间
        appraisalQuarter:data?.appraisalQuarter,// 季度
        appraisalYear:data?.appraisalYear,// 年份
        riskValue:data?.riskValue, // 风险值
        gradeName:data?.gradeName, // 风险等级
      }
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          res = this.initData(this.ruleForm)
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.base-ruleForm {
    .descriptions {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 14.28%;
            font-weight: 700;
            line-height: 30px;
            text-align: center;
            color: #606266;
        }

        /deep/ .business-text {
            width: 14.28%;
            line-height: 30px;
            text-align: center;
        }
    }

    /deep/ .el-form-item__error {
        position: unset;
    }

    .el-form-item {
        margin: 0;
    }
}
</style>
