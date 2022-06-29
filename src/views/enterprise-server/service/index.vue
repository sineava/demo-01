<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口服务企业详情</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />企业营业执照信息
        <span class="oper-button" style="margin-left: 20px;">
          <el-button
            v-if="isEdit"
            type="primary"
            size="mini"
            @click="isEdit=!isEdit"
          >取消编辑</el-button>
          <el-button
            v-if="!isEdit"
            type="primary"
            size="mini"
            @click="isEdit=!isEdit"
          >编辑</el-button>
        </span>
      </div>
      <BusinessInformation
        ref="businessInformation"
        :is-edit="isEdit"
        :isUpdata="isUpdata"
        :data="info.enterpriseBusinessInfoVo"
        @changeBusiness="changeBusiness"
      />

      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="info"
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
          <el-descriptions-item label="港口企业名称:" :span="2">{{ info.enterpriseName }}</el-descriptions-item>
          <el-descriptions-item label="所在地市港航局部门:">{{ info.organizationName }}</el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法定代表人:</template>
            <el-form-item v-if="isEdit" prop="legalPersonName">
              <el-input v-model.trim="info.legalPersonName" placeholder="请输入法定代表人" />
            </el-form-item>
            <span v-else>{{ info.legalPersonName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法人联系电话:</template>
            <el-form-item v-if="isEdit" prop="legalPersonPhone">
              <el-input v-model.trim="info.legalPersonPhone" placeholder="请输入法人联系电话" />
            </el-form-item>
            <span v-else>{{ info.legalPersonPhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法人身份证号:</template>
            <el-form-item v-if="isEdit" prop="legalPersonCardNo">
              <el-input v-model.trim="info.legalPersonCardNo" placeholder="请输入法人身份证号" />
            </el-form-item>
            <span v-else>{{ info.legalPersonCardNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />联系人姓名:</template>
            <el-form-item v-if="isEdit" prop="contactName">
              <el-input v-model.trim="info.contactName" placeholder="请输入联系人姓名" />
            </el-form-item>
            <span v-else>{{ info.contactName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />联系人电话:</template>
            <el-form-item v-if="isEdit" prop="contactPhone">
              <el-input v-model.trim="info.contactPhone" placeholder="请输入联系人电话" />
            </el-form-item>
            <span v-else>{{ info.contactPhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="传真号码:">
            <el-form-item v-if="isEdit" prop="faxNumber">
              <el-input v-model.trim="info.faxNumber" placeholder="请输入传真号码" />
            </el-form-item>
            <span v-else>{{ info.faxNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="电子邮箱:">
            <el-form-item v-if="isEdit" prop="email">
              <el-input v-model.trim="info.email" placeholder="请输入电子邮箱" />
            </el-form-item>
            <span v-else>{{ info.email }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="经济类型:">
            <el-form-item v-if="isEdit" prop="economicType">
              <el-input v-model.trim="info.economicType" placeholder="请输入经济类型" />
            </el-form-item>
            <span v-else>{{ info.economicType }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="职工总数（人）:">
            <el-form-item v-if="isEdit" prop="totalStaffNumber">
              <el-input-number
                v-model="info.totalStaffNumber"
                :min="0"
                :max="1000000000"
                placeholder="请输入职工总数（人）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ info.totalStaffNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="办公地址:" :span="2">
            <el-form-item v-if="isEdit" prop="officeAddress">
              <el-input v-model.trim="info.officeAddress" placeholder="请输入办公地址" />
            </el-form-item>
            <span v-else>{{ info.officeAddress }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="备注:">
            <el-form-item v-if="isEdit" prop="remark">
              <el-input v-model.trim="info.remark" type="textarea" placeholder="请输入备注" />
            </el-form-item>
            <span v-else>{{ info.remark }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div class="backstage-edit-btn">
          <el-button v-if="isEdit" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button
            size="medium"
            @click="returnBack"
          >
            返回
          </el-button>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getEnPortServicesInfo,findLicense,updateBasicInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { momentDate } from '@/utils/index'
import { telephone,email,fax,identity } from '@/utils/validate'
import BusinessInformation from '@/views/components/business'
export default {
  components: {
    BusinessInformation
  },
  data() {
    return {
      info: {
        enterpriseBusinessInfoVo:{
          certificateNo:'',// 统一社会信用代码
          name:'',// 名称
          type:'',// 类型
          officeAddress:'',// 住所
          legalPersonName:'',// 法定代表人
          registeredCapital:'',// 注册资本
          issuingDate:'',// 成立时间
          expiryDate:'',// 营业期限
          allowedBusiness:'',// 经营范围
          issuingUnit:'',// 登记机关
          timeInfo:'',// 时间
          certificatePicturePath:'',// 证书图片
        }
      },
      isUpdata:false,
      isEdit:false,
      photoList:[],
      ruleForm: {},
      loading: false,
      rules:{
        legalPersonCardNo:[
          { required: true, message: '请输入法人身份证号码', trigger: 'blur' },
          { validator: identity,message: '身份证号码格式错误', trigger: 'blur' }
        ],
        legalPersonName:[
          { required: true, message: '请输入法定代表人', trigger: 'blur' },
        ],
        officeAddress: [
          { required: true, message: '请输入办公地址', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { validator: telephone,message: '联系电话格式错误', trigger: 'blur' }
        ],
        faxNumber: [
          { validator: fax,message: '传真格式错误', trigger: 'blur' }
        ],
        email: [
          { validator: email,message: '电子邮箱格式错误', trigger: 'blur' }
        ],
        legalPersonPhone:[
           { required: true, message: '请输入法人联系电话', trigger: 'blur' },
          { validator: telephone,message: '电话格式错误', trigger: 'blur' }
        ]
      },
      otherRuleForm: {
        annualReviewYear: undefined,
        applicationDate: '',
        boatAgentVolume: undefined,
        boatManagementVolume: undefined,
        businessAddress: '',
        businessScope: '',
        complianceCertificateNo: '',
        cost: undefined,
        enterpriseId: '',
        faxPhone: '',
        freightAgentVolume: undefined,
        freightTurnover: undefined,
        freightVolume: undefined,
        id: '',
        income: undefined,
        lastYearProdBusiness: '',
        lastYearProdMeasures: '',
        marineDieselConsumption: undefined,
        marineFuelConsumption: undefined,
        passengerAgentVolume: undefined,
        passengerTurnover: undefined,
        passengerVolume: undefined,
        phone: '',
        problems: '',
        registeredAddress: '',
        safetyManagementSys: '',
        terminalTotalAssets: undefined,
        terminalNetAssets: undefined
      }
    }
  },
  async mounted() {
    this.fetchDetail()
  },
  methods: {
    changeBusiness(data){
      this.info.enterpriseBusinessInfoVo = data
    },
    /**
     * 查询
     */
    async fetchDetail() {
      const res = await getEnPortServicesInfo()
      this.info = res.data
      if (res.data.enterpriseBusinessInfoVo.certificateNo){
        this.isUpdata = true
      }
    },
    /**
     * 保存
     */
    query(){
      if (this.info.enterpriseBusinessInfoVo.certificateNo){
        findLicense({code:this.info.enterpriseBusinessInfoVo.certificateNo}).then(res=>{
          if (res.data){
            this.info.enterpriseBusinessInfoVo = {
              certificateNo:res.data.uniscid,// 统一社会信用代码
              name:res.data.entname,// 名称
              type:res.data.enttype_CN,// 类型
              officeAddress:res.data.dom,// 住所
              legalPersonName:res.data.name,// 法定代表人
              registeredCapital:res.data.regcap,// 注册资本
              issuingDate:res.data.estdate ? momentDate(res.data.estdate,'YYYY-MM-DD') : '',// 成立时间
              expiryDate:res.data.opfrom ? momentDate(res.data.opfrom,'YYYY-MM-DD') : '',// 营业期限
              allowedBusiness:res.data.opscope,// 经营范围
              issuingUnit:res.data.regorg_CN,// 登记机关
              timeInfo:res.data.s_EXT_DATATIME ? momentDate(res.data.s_EXT_DATATIME,'YYYY-MM-DD') : '',// 时间
              certificatePicturePath:this.info.enterpriseBusinessInfoVo.certificatePicturePath,// 证书图片
            }
          } else {
            // this.enterpriseInfo.enterpriseBusinessInfoVo = {}
          }
        })
      } else {
        this.$message.error('请输入统一社会信用代码')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let enterpriseBusinessInfoDto = await this.$refs.businessInformation.submitForm('ruleForm')
          if (!enterpriseBusinessInfoDto){
            return false
          }
          const postData = {
            enterpriseId:this.info.id,
            portServiceInfoDto:{
              contactName:this.info.contactName,
              contactPhone:this.info.contactPhone,
              currencyCategory:this.info.currencyCategory,
              economicType:this.info.economicType,
              email:this.info.email,
              faxNumber:this.info.faxNumber,
              id:this.info.id,
              legalPersonCardNo:this.info.legalPersonCardNo,
              legalPersonName:this.info.legalPersonName,
              legalPersonPhone:this.info.legalPersonPhone,
              officeAddress:this.info.officeAddress,
              remark:this.info.remark,
              totalStaffNumber:this.info.totalStaffNumber,
            },
            enterpriseBusinessInfoDto:enterpriseBusinessInfoDto
          }
          updateBasicInfo(postData).then(res=>{
            if (res.code==='0'){
              this.$message.success('修改成功')
              this.isEdit = false
            }
          })
        } else {

          return false
        }
      })
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

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}

/deep/ .el-image {
    width: 100px !important;
}
</style>
