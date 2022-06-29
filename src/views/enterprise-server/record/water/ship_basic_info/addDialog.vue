<template>
  <el-form
    ref="ruleForm"
    size="medium"
    :inline="true"
    :model="ruleForm"
    :rules="rules"
    label-width="200px"
  >
    <el-form-item
      label="投资人个人/企业："
      prop="investorName"
    >
      <el-input v-model.trim="ruleForm.investorName" placeholder="请输入投资人个人/企业" maxlength="100" />
    </el-form-item>
    <el-form-item
      label="投资单位名称："
      prop="investorUnit"
    >
      <el-input v-model.trim="ruleForm.investorUnit" placeholder="请输入投资单位名称" maxlength="100" />
    </el-form-item>
    <el-form-item
      label="金额（万元）："
      prop="investorAmount"
    >
      <el-input-number
        v-model="ruleForm.investorAmount"
        style="width: 100%;"
        :precision="2"
        :min="1"
        :max="9999999999"
        placeholder="请输入金额"
      />
    </el-form-item>
    <el-form-item
      label="投资比例（%）："
      prop="investorScale"
    >
      <el-input-number
        v-model="ruleForm.investorScale"
        style="width: 100%;"
        :precision="2"
        :min="0.01"
        :max="100"
        placeholder="请输入投资比例"
      />
    </el-form-item>
    <el-form-item
      label="证件号："
      prop="credentialNo"
    >
      <el-input v-model.trim="ruleForm.credentialNo" placeholder="请输入证件号" maxlength="100" />
    </el-form-item>
    <el-form-item
      label="备注："
      style="width: 100%;"
      prop="remark"
    >
      <el-input
        v-model="ruleForm.remark"
        type="textarea"
        rows="6"
        placeholder="请输入备注"
        maxlength="200"
        show-word-limit
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    tableIndex: {
      type: Number,
      default: -1
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ruleForm: {
        investorName: '',
        investorUnit: '',
        investorAmount: '',
        investorScale: '',
        credentialNo: '',
        remark: ''
      },
      rules: {
        investorName: [
          { required: true, message: '请输入投资人 个人/企业', trigger: 'blur' }
        ],
        investorUnit: [
          { required: true, message: '请输入投资单位名称', trigger: 'blur' }
        ],
        investorAmount: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        investorScale: [
          { required: true, message: '请输入投资比例', trigger: 'blur' }
        ],
        credentialNo: [
          { required: true, message: '请输入证件号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 验证规则
     */
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 判断名字是否重复
          let isRepeat = false
          this.tableList.forEach(item => {
            if (item.investorName === this.ruleForm.investorName && item.isStatus !== 3) {
              this.$message.error('个人/企业名称重复')
              isRepeat = true
            }
          })
          if (!isRepeat) {
            this.$emit('submit', this.ruleForm)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
    width: 600px;

    .el-input--medium {
        width: 350px;
    }
}
</style>
