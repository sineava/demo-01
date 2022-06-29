<template>
  <div id="finance">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="oper==='info'?true:false"
    >
      <div class="icon-title">
        <span class="span" />财务信息
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="价值类型" prop="valueType">
            <el-select
              v-model="ruleForm.valueType"
              clearable
              style="width: 100%;"
              placeholder="请选择价值类型"
            >
              <el-option
                v-for="(item,index) in valueTypeArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财政拨款" prop="funding">
            <el-input-number
              v-model="ruleForm.funding"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入财政拨款金额"
              :controls="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="价值（元）" prop="cost">
            <el-input-number
              v-model="ruleForm.cost"
              :precision="2"
              :min="0"
              :max="100000000000"
              clearable
              style="width: 100%;"
              placeholder="请输入价值"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="非财政拨款" prop="noFunding">
            <el-input-number
              v-model="ruleForm.noFunding"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入非财政拨款"
              :controls="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="财务入账状态" prop="accountingStatus">
            <el-select
              v-model="ruleForm.accountingStatus"
              clearable
              style="width: 100%;"
              placeholder="请选择财务入账状态"
            >
              <el-option
                v-for="(item,index) in accountingStatusArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财务入账日期" prop="dateOfFinancialEntry">
            <el-date-picker
              v-model="ruleForm.dateOfFinancialEntry"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择财务入账日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="会计凭证号" prop="accountingCN">
            <el-input
              v-model="ruleForm.accountingCN"
              placeholder="请输入会计凭证号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="折旧状态" prop="stateDepreciation">
            <el-select
              v-model="ruleForm.stateDepreciation"
              clearable
              style="width: 100%;"
              placeholder="请选择折旧状态"
            >
              <el-option
                v-for="(item,index) in stateDepreciationArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-if="ruleForm.stateDepreciation!=='不提折旧'" :span="12">
          <el-form-item label="折旧年限" prop="depreciationLife">
            <el-input-number
              v-model="ruleForm.depreciationLife"
              :min="0"
              :max="12000"
              style="width: 100%;"
              clearable
              placeholder="请输入折旧年限(月)"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账面净值" prop="bookValue">
            <el-input-number
              v-model="ruleForm.bookValue"
              :precision="2"
              :min="0"
              :max="100000000000"
              clearable
              style="width: 100%;"
              placeholder="请输入账面净值"
              :controls="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props:{
    financeData:{
      type:[Object,Array],
      default:()=>{}
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {
        valueType:'',
        accountingStatus:'',
        stateDepreciation:'',
      },
      valueTypeArr:[
        {label:'原值',value:'原值'},
        {label:'暂估值',value:'暂估值'},
        {label:'重置值',value:'重置值'},
        {label:'评估值',value:'评估值'},
        {label:'名义金额',value:'名义金额'}
      ],
      accountingStatusArr:[
        {label:'已入账',value:'已入账'},
        {label:'未入账',value:'未入账'},
      ],
      stateDepreciationArr:[
        {label:'提折旧',value:'提折旧'},
        {label:'不提折旧',value:'不提折旧'},
        {label:'已完成折旧',value:'已完成折旧'},
      ],
      rules:{
        valueType: [
          { required: true, message: '请选择价值类型', trigger: 'change' },
        ],
        funding: [
          { required: true, message: '请输入财政拨款金额', trigger: 'blur' }
        ],
        cost: [
          { required: true, message: '请输入价值金额', trigger: 'blur' }
        ],
        noFunding: [
          { required: true, message: '请输入非财政拨款', trigger: 'blur' }
        ],
        dateOfFinancialEntry: [
          { required: true, message: '请选择财务入账日期', trigger: 'blur' }
        ],
        accountingStatus: [
          { required: true, message: '请选择财务入账状态', trigger: 'change' }
        ],
        accountingCN: [
          { required: true, message: '请输入会计凭证号', trigger: 'blur' }
        ],
        stateDepreciation: [
          { required: true, message: '请输入折旧状态', trigger: 'change' }
        ],
        depreciationLife:[
          { required: true, message: '请输入折旧年限（月）', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{
    financeData(newV,oldV) {
      this.initData(newV)
    }
  },
  async mounted() {
    this.initData(this.financeData)
  },
  methods: {
    initData(data){
      this.ruleForm = {
        valueType: data && data.valueType ? data.valueType : '',// 价值类型
        funding: data && data.funding ? data.funding : 0,// 财政拨款
        cost: data && data.cost ? data.cost : 0,// 价值
        noFunding: data && data.noFunding ? data.noFunding : 0,// 非财政拨款
        dateOfFinancialEntry: data && data.dateOfFinancialEntry ? data.dateOfFinancialEntry : '',// 财务入账日期
        accountingCN: data && data.accountingCN ? data.accountingCN : '',// 会计凭证号
        depreciationLife:data && data.depreciationLife ? data.depreciationLife : 0, // 折旧年限（月）
        stateDepreciation: data && data.stateDepreciation ? data.stateDepreciation : '',// 折旧状态
        bookValue: data && data.bookValue ? data.bookValue : 0,// 账面净值
        accountingStatus: data && data.accountingStatus ? data.accountingStatus : '',// 财务入账状态
      }
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.depreciationLife = this.ruleForm.stateDepreciation==='不提折旧' ? 0 : this.ruleForm.depreciationLife
          this.ruleForm.dateOfFinancialEntry = this.ruleForm.dateOfFinancialEntry ? moment(this.ruleForm.dateOfFinancialEntry).format('YYYY-MM-DD') : ''
          res = this.ruleForm
        }
      })
      return res

    }
  }
}
</script>

<style lang="scss" scoped>
#finance {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }
}
</style>
