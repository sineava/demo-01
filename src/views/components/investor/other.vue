<template>
  <el-form
    ref="ruleForm"
    :model="investor"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <el-descriptions
      class="descriptions"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="investor-title"
      contentClassName="investor-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i class="required" />投资人:</template>
        <el-form-item v-if="isEdit" prop="investorName">
          <el-input v-model.trim="investor.investorName" placeholder="请输入投资人(个人/企业)" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ investor.investorName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />投资金额(万元):</template>
        <el-form-item v-if="isEdit" prop="investorAmount">
          <el-input-number
            v-model="investor.investorAmount"
            :min="0"
            :max="10000000000"
            :precision="4"
            placeholder="请输入投资金额(万元)"
            :controls="false"
            style="width: 100%;"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ investor.investorAmount }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />投资比例:</template>
        <el-form-item v-if="isEdit" prop="investorScale">
          <el-input-number
            v-model="investor.investorScale"
            :min="0"
            :max="100"
            :precision="2"
            placeholder="请输入投资份额（占比）"
            :controls="false"
            style="width: 100%;"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ investor.investorScale }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">证件号:</template>
        <el-form-item v-if="isEdit" prop="credentialNo">
          <el-input v-model.trim="investor.credentialNo" placeholder="请输入证件号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ investor.credentialNo }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">备注:</template>
        <el-form-item v-if="isEdit" prop="remark">
          <el-input
            v-model.trim="investor.remark"
            type="textarea"
            placeholder="请输入备注"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ investor.remark }}</span>
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
  },
  data() {
    return {
      investor: {},
      rules: {
        investorName: [
          { required: true, message: '请输入投资人(个人/企业)', trigger: 'blur' }
        ],
        /*
         * investorUnit: [
         *   { required: true, message: '请输入投资单位名称', trigger: 'blur' }
         * ],
         */
        investorAmount: [
          { required: true, message: '请输入投资金额（万元）', trigger: 'blur' }
        ],
        investorScale: [
          { required: true, message: '请输入投资比例', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initInvestor(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.initInvestor(this.data)
  },
  methods: {
    initInvestor(data){
      this.investor = {
        id:data?.id,
        investorName:data?.investorName,
        investorAmount:data?.investorAmount,
        investorScale:data?.investorScale,
        credentialNo:data?.credentialNo,
        remark:data?.remark
      }
    },
    // 输入框变更
    inputChange(){
      this.initInvestor(this.investor)
      this.$emit('changeInvestor',this.investor)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          res = this.investor
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
.base-ruleForm {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .investor-title {
            // width: 15%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .investor-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
