<template>
  <div class="water-detail">
    <div class="icon-title">
      <span class="span" />营业执照信息
      <span v-if="type!=='details'" class="oper-button" style="margin-left: 20px;">
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
        <el-descriptions-item label="企业名称:" :span="2">{{ info.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="所在地港航部门:">{{ info.organizationName }}</el-descriptions-item>
        <!-- <el-descriptions-item label="企业类型:">
          {{ enterpriseTypeList[info.enterpriseType-1] }}
        </el-descriptions-item> -->
        <el-descriptions-item label="企业类型:">
          <el-form-item v-if="isEdit" label=" " prop="agentType">
            <el-select v-model="info.agentType" clearable placeholder="请选择企业类型">
              <el-option label="货物代理" value="货物代理" />
              <el-option label="客运代理" value="客运代理" />
              <el-option label="船舶代理" value="船舶代理" />
            </el-select>
          </el-form-item>
          <span v-else>{{ info.agentType }}</span>
        </el-descriptions-item>
        <el-descriptions-item  label="联系人姓名:">
          <el-form-item v-if="isEdit" label=" " prop="contactName">
            <el-input v-model.trim="info.contactName" placeholder="请输入联系人姓名" />
          </el-form-item>
          <span v-else>{{ info.contactName }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="联系人电话:">
          <el-form-item v-if="isEdit" label=" " prop="contactPhone">
            <el-input v-model.trim="info.contactPhone" placeholder="请输入手机号码" />
          </el-form-item>
          <span v-else>{{ info.contactPhone }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="传真号码:">
          <el-form-item v-if="isEdit" label=" " prop="faxNumber">
            <el-input v-model.trim="info.faxNumber" placeholder="请输入传真号码" />
          </el-form-item>
          <span v-else>{{ info.faxNumber }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="电子邮箱:">
          <el-form-item v-if="isEdit" label=" " prop="email">
            <el-input v-model.trim="info.email" placeholder="请输入电子邮箱" />
          </el-form-item>
          <span v-else>{{ info.email }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="经济类型:">
          <el-form-item v-if="isEdit" label=" " prop="economicType">
            <el-input v-model.trim="info.economicType" placeholder="请输入经济类型" />
          </el-form-item>
          <span v-else>{{ info.economicType }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="资金币种:">
          <el-form-item v-if="isEdit" label=" " prop="currencyCategory">
            <el-input v-model.trim="info.currencyCategory" placeholder="请输入资金币种" />
          </el-form-item>
          <span v-else>{{ info.currencyCategory }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="法定代表人:">
          <el-form-item v-if="isEdit" label=" " prop="legalPersonName">
            <el-input v-model.trim="info.legalPersonName" placeholder="请输入法定代表人" />
          </el-form-item>
          <span v-else>{{ info.legalPersonName }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="法人联系电话:">
          <el-form-item v-if="isEdit" label=" " prop="legalPersonPhone">
            <el-input v-model.trim="info.legalPersonPhone" placeholder="请输入法人联系电话" />
          </el-form-item>
          <span v-else>{{ info.legalPersonPhone }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="法人身份证号:">
          <el-form-item v-if="isEdit" label=" " prop="legalPersonCardNo">
            <el-input v-model.trim="info.legalPersonCardNo" placeholder="请输入法人身份证号" />
          </el-form-item>
          <span v-else>{{ info.legalPersonCardNo }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="职工总数（人）:">
          <el-form-item v-if="isEdit" label=" " prop="totalStaffNumber">
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
          <el-form-item v-if="isEdit" label=" " prop="officeAddress">
            <el-input v-model.trim="info.officeAddress" placeholder="请输入办公地址" />
          </el-form-item>
          <span v-else>{{ info.officeAddress }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">
          <el-form-item v-if="isEdit" label=" " prop="remark">
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
</template>

<script>
import { getHyWaterAgentInfo,updateBasicInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { telephone,email } from '@/utils/validate'
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
      isEdit:false,
      photoList:[],
      isUpdata:false,
      type:'',
      rules:{
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        legalPersonPhone: [
          { message: '请输入有效联系电话', trigger: 'blur' },
          { message: '请输入有效联系电话', validator: telephone, trigger: 'blur' }
        ],
        officeAddress: [
          { required: true, message: '请输入办公地址', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contactPhone:[
          { message: '请输入有效联系电话', validator: telephone, trigger: 'blur' }
        ],
        email: [
          { message: '请输入有效邮箱地址', validator: email, trigger: 'blur' }
        ],
        economicType: [
          { required: true, message: '请输入经济性质', trigger: 'blur' }
        ],
        agentType:[
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ]
      },
      id: '',
      disabled: '',
      enterpriseTypeList: ['港口企业', '港口服务企业', '水路运输企业', '水路运输代理企业', '船舶管理企业', '其他企业']
    }
  },
  async mounted() {
    let { type , id ,enterpriseName,disabled} = this.$route.query
    this.type = type
    this.id = id
    this.disabled = disabled
    const res = await getHyWaterAgentInfo(this.id)
    this.info = res.data
    if (res.data.enterpriseBusinessInfoVo.certificateNo){
      this.isUpdata = true
    }
  },
  methods: {
    changeBusiness(data){
      this.info.enterpriseBusinessInfoVo = data
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
            waterTransportAgent:{
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
              agentType:this.info.agentType
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
.el-input.is-disabled /deep/ .el-input__inner {
    border: none;
}
</style>
<style lang="scss" scoped>
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

/deep/ .el-input,.el-select {
  width: 90%;
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
