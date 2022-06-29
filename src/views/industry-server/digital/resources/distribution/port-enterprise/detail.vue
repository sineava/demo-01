<template>
  <div>
    <div class="icon-title">
      <span class="span" />企业营业执照信息
    </div>
    <el-form
      label-width="200px"
      size="medium"
      hide-required-asterisk
      class="table-column three"
      disabled
    >
      <el-form-item
        label="公司名称:"
      >
        <el-input :value="enterpriseBusinessInfoVo.name" />
      </el-form-item>
      <el-form-item
        label="证书编号:"
      >
        <el-input :value="enterpriseBusinessInfoVo.certificateNo" />
      </el-form-item>
      <el-form-item
        label="法定代表人:"
      >
        <el-input :value="enterpriseBusinessInfoVo.legalPersonName" />
      </el-form-item>
      <el-form-item
        label="发证机关:"
      >
        <el-input :value="enterpriseBusinessInfoVo.issuingUnit" />
      </el-form-item>
      <el-form-item
        label="发证日期:"
      >
        <el-input :value="enterpriseBusinessInfoVo.issuingDate" />
      </el-form-item>
      <el-form-item
        label="有效期至:"
      >
        <el-input :value="enterpriseBusinessInfoVo.expiryDate" />
      </el-form-item>
      <el-form-item
        label="办公地址:"
      >
        <el-input :value="enterpriseBusinessInfoVo.officeAddress" />
      </el-form-item>
      <el-form-item
        label="经营地域:"
      >
        <el-input :value="enterpriseBusinessInfoVo.businessArea" />
      </el-form-item>
      <el-form-item
        label="准予从事业务:"
      >
        <el-input :value="enterpriseBusinessInfoVo.allowedBusiness" />
      </el-form-item>
      <el-form-item
        label="证书状态:"
      >
        <el-input :value="enterpriseBusinessInfoVo.certificateStatus === 1 ? '有效' : '无效'" />
      </el-form-item>
      <el-form-item
        label="证书图片:"
      >
        <Images
          ref="images"
          height="100px"
          fit="contain"
          :url="enterpriseBusinessInfoVo.certificatePicturePath"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%;"
        label-width="0"
      >
        <div class="icon-title">
          <span class="span" />企业基础信息
        </div>
      </el-form-item>
      <el-form-item
        label="所在地市港口管理部门:"
        prop="organizationName"
      >
        <el-input v-model.trim="ruleForm.organizationName" />
      </el-form-item>
      <el-form-item
        label="港口企业名称:"
        prop="enterpriseName"
      >
        <el-input v-model.trim="ruleForm.enterpriseName" />
      </el-form-item>
      <el-form-item
        label="办公地址:"
        prop="officeAddress"
      >
        <el-input v-model.trim="ruleForm.officeAddress" />
      </el-form-item>
      <el-form-item
        label="法定代表人姓名:"
        prop="legalPersonName"
      >
        <el-input v-model.trim="ruleForm.legalPersonName" />
      </el-form-item>
      <el-form-item
        label="联系人姓名:"
        prop="contactName"
      >
        <el-input v-model.trim="ruleForm.contactName" />
      </el-form-item>
      <el-form-item
        label="联系人电话:"
        prop="contactPhone"
      >
        <el-input v-model.trim="ruleForm.contactPhone" />
      </el-form-item>
      <el-form-item
        label="传真号码:"
        prop="faxNumber"
      >
        <el-input v-model.trim="ruleForm.faxNumber" />
      </el-form-item>
      <el-form-item
        label="电子邮箱:"
        prop="email"
      >
        <el-input v-model.trim="ruleForm.email" />
      </el-form-item>
      <el-form-item
        label="经济类型:"
        prop="economicType"
      >
        <el-input v-model.trim="ruleForm.economicType" />
      </el-form-item>
      <el-form-item
        label="职工总数:"
        prop="totalStaffNumber"
      >
        <el-input v-model.trim="ruleForm.totalStaffNumber" />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remark"
      >
        <el-input v-model.trim="ruleForm.remark" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, updateAddress } from '@/api/general-services/port-enterprise/port-enterprise'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      isEdit: false,
      enterpriseBusinessInfoVo: {},
      ruleForm: {
        id: '',
        geographyInfos: []
      }
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    if (this.$route.query.id) {
      this.ruleForm = (await getInfo(this.$route.query.id)).data
      this.enterpriseBusinessInfoVo = { ...this.ruleForm.enterpriseBusinessInfoVo }
      this.$emit('initMap', this.ruleForm.geographyInfos)
    }
  },
  methods: {
    saveData(geographyInfos) {
      this.ruleForm.geographyInfos = geographyInfos
      this.save()
    },
    async save() {
      let data = {
        id: this.ruleForm.id,
        geographyInfos: this.ruleForm.geographyInfos
      }
      let res = await updateAddress(data)
      if (res.code === '0') {
        this.$emit('back')
      }
    }
  }
}
</script>
