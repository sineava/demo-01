<template>
  <div v-if="oper!=='add' || isShow">
    <div class="icon-title">
      <span class="span" />船舶营业证信息
    </div>
    <el-form
      ref="ruleForm"
      :model="license"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
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
        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶营运证编号</template>
          <el-form-item v-if="isEdit && enterpriseType===3" prop="shipLicenseNo">
            <el-input
              v-model="license.shipLicenseNo"
              placeholder="请输入船舶营运证编号"
              clearable
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ license.shipLicenseNo }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />首次办证时间</template>
          <el-form-item v-if="isEdit && enterpriseType===3" prop="firstRegistrationDate">
            <el-date-picker
              v-model="license.firstRegistrationDate"
              type="date"
              clearable
              style="width: 100%;"
              placeholder="选择首次办证时间"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ license.firstRegistrationDate }}</span>
        </el-descriptions-item>

        <el-descriptions-item label="船舶中文名称">{{ basic.shipName }}</el-descriptions-item>
        <el-descriptions-item label="曾用名">{{ basic.usedName }}</el-descriptions-item>
        <el-descriptions-item label="船籍港">{{ basic.registryPort }}</el-descriptions-item>

        <el-descriptions-item label="船舶登记号">{{ basic.shipRegisterNo }}</el-descriptions-item>
        <el-descriptions-item label="船检登记号">{{ basic.shipSurveyRegisterNo }}</el-descriptions-item>
        <el-descriptions-item label="船舶所有人">{{ basic.shipOwner }}</el-descriptions-item>

        <el-descriptions-item label="船舶经营人">{{ basic.shipOperator }}</el-descriptions-item>
        <el-descriptions-item label="经营人许可证号码" :span="2">{{ basic.operatorLicenceNo }}</el-descriptions-item>

        <el-descriptions-item label="船舶管理人">{{ basic.shipCustodian }}</el-descriptions-item>
        <el-descriptions-item label="管理人许可证号码" :span="2">{{ basic.custodianLicenceNo }}</el-descriptions-item>

        <el-descriptions-item label="船舶类型">{{ basic.shipType }}</el-descriptions-item>
        <el-descriptions-item label="船体材料">{{ basic.hullMaterial }}</el-descriptions-item>
        <el-descriptions-item label="船舶总吨">{{ basic.shipTotalTons }}</el-descriptions-item>

        <el-descriptions-item label="主机功率（千瓦）">{{ basic.hostPower }}</el-descriptions-item>
        <el-descriptions-item label="主机数量（台）">{{ basic.hostNum }}</el-descriptions-item>
        <el-descriptions-item label="建成日期">{{ moments(basic.completionDate) }}</el-descriptions-item>

        <el-descriptions-item label="改建日期">{{ moments(basic.rebuildDate) }}</el-descriptions-item>
        <el-descriptions-item label="载重吨（吨）">{{ basic.referenceCapacity }}</el-descriptions-item>
        <el-descriptions-item label="载箱量（TEU）">{{ basic.loadingCapacity }}</el-descriptions-item>

        <el-descriptions-item label="载气量（立方米）">{{ basic.gasCarryingCapacity }}</el-descriptions-item>
        <el-descriptions-item label="载车量（车位）">{{ basic.vehicleCapacity }}</el-descriptions-item>
        <el-descriptions-item label="载客定额（客位）">{{ basic.passengerQuota }}</el-descriptions-item>

        <el-descriptions-item :span="3">
          <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶经营人许可证核定的经营范围</template>
          <el-form-item v-if="isEdit && enterpriseType===3" prop="approvedBusinessScope">
            <el-input
              v-model="license.approvedBusinessScope"
              type="textarea"
              clearable
              placeholder="请输入船舶经营人许可证核定的经营范围"
              :autosize="{ minRows: 6, maxRows: 6 }"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ license.approvedBusinessScope }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />本船核定的经营范围</template>
          <el-form-item v-if="isEdit && enterpriseType===3" prop="businessScope">
            <el-input
              v-model="license.businessScope"
              type="textarea"
              clearable
              placeholder="请输入本船核定的经营范围"
              :autosize="{ minRows: 6, maxRows: 6 }"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ license.businessScope }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    initData: {
      type: Object,
      default:()=>{}
    },
    licenseData:{
      type: Object,
      default:()=>{}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    enterpriseType:{ // 企业类型 3-水路运输，5-船舶管理
      type:[String,Number],
      default:3
    },
    operType:{
      type:String,
      default:'add'
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      basic: {},
      license:{},
      oper:'',
      rules: {
        shipLicenseNo: [
          { required: true, message: '请输入船舶营运证编号', trigger: 'blur' }
        ],
        approvedBusinessScope: [
          { required: true, message: '请输入船舶经营人许可证核定的经营范围', trigger: 'blur' }
        ],
        businessScope: [
          { required: true, message: '请输入本船核定的经营范围', trigger: 'blur' }
        ],
        firstRegistrationDate:[
          { required: true, message: '选择首次办证时间', trigger: 'blur' }
        ],
      },
    }
  },
  watch:{
    initData:{
      handler(newV){
        this.basic = newV
      },
      deep:true
    },
    licenseData:{
      handler(newV){
        this.initLicense(newV)
      },
      deep:true
    },
    operType(newV,obj){
      this.oper = newV
    }
  },
  mounted() {
    this.basic = this.initData
    this.oper = this.operType
    this.initLicense(this.licenseData)
  },
  methods: {
    moments(date){
      return date ? moment(date).format('YYYY-MM-DD') : ''
    },
    initLicense(data){
      this.license = {
        id:data && data.id || '',
        approvedBusinessScope:data && data.approvedBusinessScope || '',
        businessScope:data && data.businessScope || '',
        shipLicenseNo:data && data.shipLicenseNo || '',
        firstRegistrationDate:data && data.firstRegistrationDate ? moment(data.firstRegistrationDate).format('YYYY-MM-DD') : '',
      }
    },
    // 输入框变更
    inputChange(){
      this.$emit('changeBusiness',this.license)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          res = {
            approvedBusinessScope:this.license.approvedBusinessScope || '',
            businessScope:this.license.businessScope || '',
            id:this.license.id || '',
            shipLicenseNo:this.license.shipLicenseNo || '',
            firstRegistrationDate:this.license.firstRegistrationDate ? moment(this.license.firstRegistrationDate).format('YYYY-MM-DD') : '',

            completionDate:this.basic.completionDate ? moment(this.basic.completionDate).format('YYYY-MM-DD') : '',
            custodianLicenceNo:this.basic.custodianLicenceNo || '',
            gasCarryingCapacity:this.basic.gasCarryingCapacity || '',
            hostNum:this.basic.hostNum || '',
            hostPower:this.basic.hostPower || '',
            hullMaterial:this.basic.hullMaterial || '',
            loadingCapacity:this.basic.loadingCapacity || '',
            netWeightTons:this.basic.netWeightTons || '',
            operatorLicenceNo:this.basic.operatorLicenceNo || '',
            passengerQuota:this.basic.passengerQuota || '',
            rebuildDate:this.basic.rebuildDate ? moment(this.basic.rebuildDate).format('YYYY-MM-DD') : '',
            registryPort:this.basic.registryPort || '',
            shipCustodian:this.basic.shipCustodian || '',
            shipName:this.basic.shipName || '',
            shipOperator:this.basic.shipOperator || '',
            shipOwner:this.basic.shipOwner || '',
            shipRegisterNo:this.basic.shipRegisterNo || '',
            shipSurveyRegisterNo:this.basic.shipSurveyRegisterNo || '',
            shipTotalTons:this.basic.shipTotalTons || '',
            shipType:this.basic.shipType || '',
            usedName:this.basic.usedName || '',
            vehicleCapacity:this.basic.vehicleCapacity || ''
          }
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
        width: 20%;
        line-height: 30px;
    }
}

.base-ruleForm {
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
}
</style>
