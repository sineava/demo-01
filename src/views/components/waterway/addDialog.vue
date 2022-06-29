<template>
  <div class="add-inv">
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
    >
      <el-form-item
        label="投资人(个人/企业):"
        prop="investorName"
      >
        <el-input v-model.trim="ruleForm.investorName" placeholder="请输入投资人个人/企业" maxlength="100" />
      </el-form-item>
      <!-- <el-form-item
        label="投资单位名称:"
        prop="investorUnit"
      >
        <el-input v-model.trim="ruleForm.investorUnit" placeholder="请输入投资单位名称" maxlength="100" />
      </el-form-item> -->
      <el-form-item
        label="金额（万元）:"
        prop="investorAmount"
      >
        <el-input-number
          v-model="ruleForm.investorAmount"
          style="width: 100%;"
          :precision="2"
          :min="1"
          :max="9999999999"
          :controls="false"
          placeholder="请输入金额"
        />
      </el-form-item>
      <el-form-item
        label="投资比例（%）:"
        prop="investorScale"
      >
        <el-input-number
          v-model="ruleForm.investorScale"
          style="width: 100%;"
          :precision="2"
          :min="0.01"
          :max="max"
          :controls="false"
          placeholder="请输入投资比例"
        />
      </el-form-item>
      <el-form-item
        label="证件号:"
        prop="credentialNo"
      >
        <el-input v-model.trim="ruleForm.credentialNo" placeholder="请输入证件号" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="备注:"
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
  </div>
</template>

<script>
export default {
  data() {
    const personExist = async(rule, value, callback) => {
      if (this.isExist(value)){
        callback(new Error('身份证号重复，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        investorName: '',
        investorUnit: '',
        investorAmount: '',
        investorScale: '',
        credentialNo: '',
        remark: '',
        investorsId:'',
        isStatus:2
      },
      max:100,
      index:-1,
      rules: {
        investorName: [
          { required: true, message: '请输入投资人个人/企业', trigger: 'blur' },
          { validator: personExist, message: '投资人个人/企业已存在', trigger: 'blur' }
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
    isExist(value){
      let res = false
      for (let i=0;i<this.tableList.length;i++){
        if (this.tableList[i].investorName===value){
          res = this.index!==i ? true : false
          return res
        }
      }
      return res
    },
    init(row,index,tableList){
      this.ruleForm = {
        investorName: row?.investorName,
        investorUnit: row?.investorUnit,
        investorAmount: row?.investorAmount,
        investorScale: row?.investorScale,
        credentialNo: row?.credentialNo,
        remark: row?.remark,
        investorsId:row?.investorsId,
        isStatus:row?.investorsId ? 1 : 2
      }
      let cmax = 0
      for (let i=0;i<tableList.length;i++){
        if (index!==i){
          cmax = cmax + parseInt(tableList[i].investorScale * 100)
        }
      }
      this.max = (parseInt(10000 - cmax)/100) > 0 ? (parseInt(10000 - cmax)/100) : 0
      this.index = index
      this.tableList = tableList
    },
    /**
     * 验证规则
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          res = [this.ruleForm,this.index]
        } else {
          res = false
        }
      })
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.add-inv {
    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
