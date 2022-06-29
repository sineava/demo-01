<template>
  <div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        size="medium"
        class="add-yjyljh"
      >
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="单位名称:">
            {{ ruleForm.enterpriseName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">年度计划:</template>
            {{ ['应急演练','综合演练'][ruleForm.planType-1] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">演练名称:</template>
            {{ ruleForm.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">年度计划:</template>
            {{ ['应急演练','综合演练'][ruleForm.planType-1] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">演练类型:</template>
            {{ ruleForm.actingType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">演练类型细类:</template>
            {{ ruleForm.actingTypeDetailed }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">演练牵头单位:</template>
            {{ ruleForm.planOriginator }}
          </el-descriptions-item>
          <!-- 新增字段 -->
          <el-descriptions-item>
            <template slot="label">主办单位:</template>
            {{ ruleForm.organizer }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">参演人数:</template>
            {{ ruleForm.organizer }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">参演单位:</template>
            <el-tag
              v-for="(item,index) in planOrganization"
              :key="index"
              closable
              :disable-transitions="false"
              style="margin: 5px;"
              @close="handleClose(index)"
            >
              {{ item }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">计划开始演练时间:</template>
            {{ ruleForm.planStartTime }}
          </el-descriptions-item>

          <!-- 新增字段 -->
          <el-descriptions-item>
            <template slot="label">计划结束演练时间:</template>
            {{ ruleForm.planEndTime }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">演练时长（h）:</template>
            {{ ruleForm.planDays }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">演练地点:</template>
            {{ ruleForm.planAddress }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">演练流程及内容简要描述:</template>
            {{ ruleForm.planDescribe }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">填报人:</template>
            {{ ruleForm.planInformant }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">填报人联系电话:</template>
            {{ ruleForm.planInformantPhone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">填报时间:</template>
            {{ ruleForm.planFillInTime }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">备注:</template>
            {{ ruleForm.planRemark }}
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    dataObj:{
      default:{}
    }
  },
  data() {
    return {
      fileList: [],
      loading: false,
      dialogVisible:false,
      ruleForm: {
        actingType: '',
        actingTypeDetailed: '',
        id: null,
        name: '',
        planAddress: '',
        planDays: undefined,
        planDescribe: '',
        planFilePath: [],
        planFillInTime: '',
        planInformant: '',
        planInformantPhone: '',
        planOrganization: '',
        planOriginator: '',
        planPersons: undefined,
        planRemark: '',
        planStartTime: '',
        planType: '',
        planEndTime: '',
        organizer: '',
        postStatus: 1 // 默认未发布状态
      },
      personsForm:{
        name:''
      },
      planOrganization:[],// 参演单位
    }
  },
  watch:{
    dataObj(newV,e){
      this.fetchDetail(newV)
    }
  },
  created() {
    if (this.dataObj) { // 编辑
      this.fetchDetail(this.dataObj)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(data) {
      this.ruleForm = data
      this.fileList = this.ruleForm.planFilePath
      this.planOrganization = data.planOrganization ? data.planOrganization.split(',') : []
    }
  }
}
</script>
<style lang="scss">
.add-company {
    .el-dialog__body {
        min-height: 100px;
    }
}
</style>
<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}

.add-yjyljh {
    .el-form-item {
        margin: 0;
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }
}
</style>
