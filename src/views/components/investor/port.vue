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
        <template slot="label"><i v-if="isEdit" class="required" />主要投资人名称:</template>
        <el-form-item v-if="isEdit" prop="name">
          <el-input v-model.trim="investor.name" placeholder="请输入主要投资人名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ investor.name }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />是否外商投资:</template>
        <el-form-item v-if="isEdit" prop="isForeign">
          <el-radio v-model="investor.isForeign" :label="0">否</el-radio>
          <el-radio v-model="investor.isForeign" :label="1">是</el-radio>
        </el-form-item>
        <span v-else><el-tag :type="investor.isForeign ? '': 'success'">{{ investor.isForeign ? '是' : '否' }}</el-tag></span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />注册（居住）地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model.trim="investor.address" placeholder="请输入注册（居住）地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ investor.address }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />投资金额(万元):</template>
        <el-form-item v-if="isEdit" prop="investmentAmount">
          <el-input-number
            v-model="investor.investmentAmount"
            :min="0"
            :max="10000000000"
            :precision="4"
            placeholder="请输入投资金额(万元)"
            :controls="false"
            style="width: 100%;"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ investor.investmentAmount }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />投资份额（%）:</template>
        <el-form-item v-if="isEdit" prop="investmentShare">
          <el-input-number
            v-model="investor.investmentShare"
            :min="0"
            :max="100"
            :precision="2"
            placeholder="请输入投资份额（占比）"
            :controls="false"
            style="width: 100%;"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ investor.investmentShare }}</span>
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
      investor: {
        id:'',
        address:'',
        investmentAmount:undefined,
        investmentShare:undefined,
        isForeign:'',
        name:'',
        remark:''
      },
      rules: {
        address: [
          { required: true, message: '请输入注册（居住）地址', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        investmentAmount: [
          { required: true, message: '请输入投资金额(万元)', trigger: 'blur' }
        ],
        investmentShare: [
          { required: true, message: '请输入投资份额', trigger: 'blur' }
        ],
        isForeign: [
          { required: true, message: '请选择是否外商投资', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入主要投资人名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
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
        address:data?.address,
        investmentAmount:data?.investmentAmount,
        investmentShare:data?.investmentShare,
        isForeign:data?.isForeign,
        name:data?.name,
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
            width: 10%;
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
