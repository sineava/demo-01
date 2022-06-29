<template>
  <div class="basics-other">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="oper==='info'?true:false"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备用途" prop="euse">
            <el-select
              v-model="ruleForm.euse"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择设备用途"
            >
              <el-option
                v-for="(item,index) in euseArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brand">
            <el-input
              v-model="ruleForm.brand"
              placeholder="请输入品牌"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号" prop="specifications">
            <el-input
              v-model="ruleForm.specifications"
              placeholder="请输入规格型号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品序列号" prop="eserialNo">
            <el-input
              v-model="ruleForm.eserialNo"
              placeholder="请输入产品序列号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂家" prop="emanufacturer">
            <el-input
              v-model="ruleForm.emanufacturer"
              placeholder="请输入生产厂家"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经销商" prop="dealer">
            <el-input
              v-model="ruleForm.dealer"
              placeholder="请输入经销商"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="contractNo">
            <el-input
              v-model="ruleForm.contractNo"
              placeholder="请输入合同编号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保修截止日期" prop="warrantyED">
            <el-date-picker
              v-model="ruleForm.warrantyED"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择保修截止日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票号" prop="invoiceNo">
            <el-input
              v-model="ruleForm.invoiceNo"
              placeholder="请输入发票号"
              clearable
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
    assetsTypeData:{
      type:Object,
      default:()=>{}
    },
    infoData:{
      type:Object,
      default:()=>{}
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {},
      propertyRFArr:[
        {label:'有产权',value:1},
        {label:'无产权',value:2},
        {label:'产权待界定',value:3}
      ],
      orgList:[],
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      euseArr:[
        {label:'办公',value:'办公'},
        {label:'教学',value:'教学'},
        {label:'培训',value:'培训'},
        {label:'执法',value:'执法'},
        {label:'窗口',value:'窗口'},
        {label:'专用',value:'专用'},
        {label:'医疗',value:'医疗'},
        {label:'科研',value:'科研'},
        {label:'其他',value:'其他'},
      ],
      rules:{
        euse: [
          { required: true, message: '请输入设备用途', trigger: 'blur' },
        ],
        specifications: [
          { required: true, message: '请输入规格型号', trigger: 'blur' },
        ],
        warrantyED: [
          { required: true, message: '请选择保修截止日期', trigger: 'blur' },
        ]
      }
    }
  },
  watch:{
    infoData(newV,oldV) {
      this.initData(newV)
    }
  },
  async mounted() {
    this.initData(this.infoData)
  },
  methods: {
    initData(data){
      this.ruleForm = {
        euse: data && data.euse ? data.euse : '',// 设备用途
        brand:  data && data.brand ? data.brand : '',// 品牌
        specifications:  data && data.specifications ? data.specifications : '',// 规格型号
        eserialNo:  data && data.eserialNo ? data.eserialNo : '',// 产品序列号
        emanufacturer: data && data.emanufacturer ? data.emanufacturer : '',// 生产厂家
        dealer: data && data.dealer ? data.dealer : '',// 经销商
        contractNo: data && data.contractNo ? data.contractNo : '',// 合同编号
        warrantyED: data && data.warrantyED ? data.warrantyED : '',// 保修截止日期
        invoiceNo: data && data.invoiceNo ? data.invoiceNo : '',// 发票号
      }
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.warrantyED = this.ruleForm.warrantyED ? moment(this.ruleForm.warrantyED).format('YYYY-MM-DD') : ''
          res = this.ruleForm
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.basics-other {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }
}
</style>
