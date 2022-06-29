<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业基础信息</span>
    </div>
    <div class="license-detail">
      <div class="icon-title">
        <span class="span" />企业营业执照信息
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
        :data="enterpriseInfo.enterpriseBusinessInfoVo"
        @changeBusiness="changeBusiness"
      />
    </div>
    <el-form
      ref="ruleForm"
      :model="basicRuleForm"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
    >
      <div class="company_basic_detail">
        <div class="icon-title">
          <span class="span" />企业基础信息
        </div>
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="港口企业名称:">{{ basicRuleForm.enterpriseName }}</el-descriptions-item>
          <el-descriptions-item :span="2" label="所在地市港口管理部门:">{{ basicRuleForm.organizationName }}</el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法定代表人姓名:</template>
            <el-form-item v-if="isEdit" prop="legalPersonName">
              <el-input v-model.trim="basicRuleForm.legalPersonName" placeholder="请输入法人代表姓名" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.legalPersonName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法人联系电话:</template>
            <el-form-item v-if="isEdit" prop="legalPersonPhone">
              <el-input v-model.trim="basicRuleForm.legalPersonPhone" placeholder="请输入法人联系电话" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.legalPersonPhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="法人身份证号:">
            <el-form-item v-if="isEdit" prop="legalPersonCardNo">
              <el-input v-model.trim="basicRuleForm.legalPersonCardNo" placeholder="请输入法人身份证号" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.legalPersonCardNo }}</span>
          </el-descriptions-item>
          <!-- <el-descriptions-item label="联系电话:">
            <el-form-item v-if="isEdit" prop="contactPhone">
              <el-input v-model.trim="basicRuleForm.contactPhone" placeholder="请输入联系电话" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.contactPhone }}</span>
          </el-descriptions-item> -->
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />办公地址:</template>
            <el-form-item v-if="isEdit" prop="officeAddress">
              <el-input v-model.trim="basicRuleForm.officeAddress" placeholder="请输入办公地址" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.officeAddress }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />安全负责人姓名:</template>
            <el-form-item v-if="isEdit" prop="contactName">
              <el-input v-model.trim="basicRuleForm.contactName" placeholder="请输入安全负责人姓名" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.contactName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />手机号码:</template>
            <el-form-item v-if="isEdit" prop="contactPhone">
              <el-input v-model.trim="basicRuleForm.contactPhone" placeholder="请输入手机号码" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.contactPhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />经济性质:</template>
            <el-form-item v-if="isEdit" prop="economicType">
              <el-input v-model.trim="basicRuleForm.economicType" placeholder="请输入经济性质" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.economicType }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isEdit" class="backstage-edit-btn">
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { telephone } from '@/utils/validate'
import { findByBasicInfo, findQyByToBasicInfo,addOrModifyOtherInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Maptable from '@/components/Maptable/index'
import BusinessInformation from '@/views/components/business'
import Change from '@/views/components/port'
export default {
  components: {
    Maptable,
    BusinessInformation,
    Change
  },
  data() {
    return {
      enterpriseInfo: {
        enterpriseBusinessInfoVo: {
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
      type:'',
      changeSituationVos:[],
      remark:'',
      photoList: [], // 图片列表
      isEdit:false,
      basicRuleForm: {
        portType:'',
      },
      rules: {
        coastlineLength: [
          { required: true, message: '请输入使用自然岸线长度（米）', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { message: '联系电话错误', validator: telephone, trigger: 'blur' }
        ],
        legalPersonPhone: [
          { required: true, message: '请输入法人联系电话', trigger: 'blur' },
          { message: '法人联系电话错误', validator: telephone, trigger: 'blur' }
        ],
        coastlineTitanic: [
          { required: true, message: '请输入使用自然岸线相关批文及文号', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入安全负责人姓名', trigger: 'blur' }
        ],
        economicType: [
          { required: true, message: '请输入经济性质', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
        ],
        officeAddress: [
          { required: true, message: '请输入办公地址', trigger: 'blur' }
        ],
      }
    }
  },
  async mounted() {
    this.findByBasicInfo()
  },
  methods: {
    changeBusiness(data){
      this.enterpriseInfo.enterpriseBusinessInfoVo = data
    },
    /**
     * 查询
     */
    async findByBasicInfo() {
      const res = await findByBasicInfo()
      const base = await findQyByToBasicInfo()
      this.enterpriseInfo = res.data
      this.basicRuleForm = base.data.basicInfo
      this.remark = res.data.remark || ''
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let enterpriseBusinessInfoDto = await this.$refs.businessInformation.submitForm('ruleForm')
          if (!enterpriseBusinessInfoDto){
            return false
          }
          const postData = {
            enterpriseId:this.basicRuleForm.id,
            coastlineLength:this.basicRuleForm.coastlineLength,
            coastlineTitanic:this.basicRuleForm.coastlineTitanic,
            contactName:this.basicRuleForm.contactName,
            contactPhone:this.basicRuleForm.contactPhone,
            economicType:this.basicRuleForm.economicType,
            legalPersonName:this.basicRuleForm.legalPersonName,
            legalPersonPhone:this.basicRuleForm.legalPersonPhone,
            officeAddress:this.basicRuleForm.officeAddress,
            zoneId:this.basicRuleForm.zoneId, // 该字段未确定
            legalPersonCardNo:this.basicRuleForm.legalPersonCardNo,
            enterpriseBusinessInfoDto:enterpriseBusinessInfoDto,
            remark:this.remark
          }
          addOrModifyOtherInfo(postData).then(res=>{
            if (res.code==='0'){
              this.$message.success('修改成功')
              this.isEdit = false
            }
          })
        } else {
          this.$message.error('企业信息内存在必填项未填写，请查看')
          return false
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/enterprise/basic' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100px;
    height: 100px;
}

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

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
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
</style>
