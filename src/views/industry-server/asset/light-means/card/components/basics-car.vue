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
          <el-form-item label="编制情况" prop="vwovenSituation">
            <el-select
              v-model="ruleForm.vwovenSituation"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择编制情况"
            >
              <el-option
                v-for="(item,index) in vwovenSituationArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号" prop="vlicensePN">
            <el-input
              v-model="ruleForm.vlicensePN"
              placeholder="请输入车牌号"
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
          <el-form-item label="汽车排放量" prop="vehicleEmissions">
            <el-select
              v-model="ruleForm.vehicleEmissions"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择汽车排放量"
            >
              <el-option
                v-for="(item,index) in vehicleEmissionsArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆品牌" prop="vehicleBrand">
            <el-input
              v-model="ruleForm.vehicleBrand"
              placeholder="请输入车辆品牌"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆行驶证" prop="vehicleLicense">
            <el-select
              v-model="ruleForm.vehicleLicense"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择车辆行驶证"
            >
              <el-option
                v-for="(item,index) in vehicleLicenseArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="持证人" prop="holder">
            <el-select
              v-model="ruleForm.holder"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择持证人"
            >
              <el-option
                v-for="(item,index) in holderArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册登记日期" prop="vregistrationDate">
            <el-date-picker
              v-model="ruleForm.vregistrationDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择注册登记日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发动机号" prop="vengineNo">
            <el-input
              v-model="ruleForm.vengineNo"
              placeholder="请输入发动机号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆识别代码" prop="vehicleIC">
            <el-input
              v-model="ruleForm.vehicleIC"
              placeholder="请输入车辆识别代码"
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
          <el-form-item label="投入使用日期" prop="vcommissioningDate">
            <el-date-picker
              v-model="ruleForm.vcommissioningDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择投入使用日期"
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
      ruleForm: {
        vwovenSituation:'',
        vehicleEmissions:'',
        vehicleLicense:'',
        holder:''
      },
      vwovenSituationArr:[
        {label:'在编',value:1},
        {label:'不在编',value:2},
        {label:'未核定车编',value:3}
      ],
      orgList:[],
      vehicleEmissionsArr:[
        {label:'1.6（含）以下',value:1},
        {label:'1.6-1.8',value:2},
        {label:'2.0-2.5',value:3},
        {label:'2.5（含）以上、新能源、柴油车',value:4},
      ],
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      vehicleLicenseArr:[
        {label:'有',value:1},
        {label:'无',value:0},
      ],
      rules:{
        vwovenSituation: [
          { required: true, message: '请选择编制情况', trigger: 'change' },
        ],
        vlicensePN: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
        ],
        specifications: [
          { required: true, message: '请输入规格型号', trigger: 'blur' },
        ],
        vehicleEmissions: [
          { required: true, message: '请选择汽车排放量', trigger: 'change' },
        ],
        vehicleBrand: [
          { required: true, message: '请输入车辆品牌', trigger: 'blur' },
        ],
        vehicleLicense: [
          { required: true, message: '请选择车辆行驶证', trigger: 'change' },
        ],
        holder: [
          { required: true, message: '请选择持证人', trigger: 'change' },
        ],
        vregistrationDate: [
          { required: true, message: '请选择注册登记日期', trigger: 'blur' },
        ],
        vengineNo: [
          { required: true, message: '请输入发动机号', trigger: 'blur' },
        ],
        vehicleIC: [
          { required: true, message: '请输入车辆识别代码', trigger: 'blur' },
        ],
        contractNo: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
        ],
        vcommissioningDate: [
          { required: true, message: '请选择投入使用日期', trigger: 'blur' },
        ],
        warrantyED: [
          { required: true, message: '请选择保修截止日期', trigger: 'blur' },
        ],
        invoiceNo: [
          { required: true, message: '请输入发票号', trigger: 'blur' },
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
        vwovenSituation: data && data.vwovenSituation ? data.vwovenSituation : '',// 编制情况：1在编、2不在编、3未核定车编
        vlicensePN:  data && data.vlicensePN ? data.vlicensePN : '',// 车牌号
        specifications:  data && data.specifications ? data.specifications : '',// 规格型号
        vehicleEmissions:  data && data.vehicleEmissions ? data.vehicleEmissions : '',// 汽车排放量:(1)1.6（含）以下、(2)1.6-1.8（含）以下、(3)2.0-2.5（含）以下、(4)2.5（含）以下、新能源、柴油车
        vehicleBrand: data && data.vehicleBrand ? data.vehicleBrand : '',// 车辆品牌
        vehicleLicense: data && data.vehicleLicense ? data.vehicleLicense : '',// 车辆行驶证:1有、0无
        holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
        vregistrationDate: data && data.vregistrationDate ? data.vregistrationDate : '',// 注册登记日期
        vengineNo: data && data.vengineNo ? data.vengineNo : '',// 发动机号
        vehicleIC: data && data.vehicleIC ? data.vehicleIC : '',// 车辆识别代码
        dealer: data && data.dealer ? data.dealer : '',// 经销商
        contractNo: data && data.contractNo ? data.contractNo : '',// 合同编号
        vcommissioningDate: data && data.vcommissioningDate ? data.vcommissioningDate : '',// 投入使用日期
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
          this.ruleForm.vregistrationDate = this.ruleForm.vregistrationDate ? moment(this.ruleForm.vregistrationDate).format('YYYY-MM-DD') : ''
          this.ruleForm.vcommissioningDate = this.ruleForm.vcommissioningDate ? moment(this.ruleForm.vcommissioningDate).format('YYYY-MM-DD') : ''
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
