<template>
  <el-card class="body-card info">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="委托船舶管理企业变更备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="ruleForm.isStatus < 3 && !isEdit"
          type="primary"
          size="small"
          @click="isEdit=true"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div>
      <Entrustship ref="Entrustship" :enterpriseId="enterpriseId" :data="ruleForm" :isEdit="isEdit" @changeFrontEnterprise="changeFrontEnterprise"/>
      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" />船舶管理企业变更信息
      </div>
      <el-row :gutter="20">
          <el-col :span="12">
            <h3>变更前数据</h3>
            <Enterprise ref="changeFrontEnterpriseId" :enterpriseId="changeFrontEnterpriseId" :isEdit="false"/>
          </el-col>
          <el-col :span="12">
            <h3>变更后数据</h3>
            <Enterprise ref="changeEnterpriseId" :enterpriseId="changeEnterpriseId" :isEdit="isEdit"/>
          </el-col>
      </el-row>
      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" />委托协议变更信息
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>变更前数据</h3>
          <Agreement ref="beforeFrontEnShip" :height="300" :data="beforeFrontEnShip" :isEdit="false" title="变更前" />
        </el-col>
        <el-col :span="12">
          <h3>变更后数据</h3>
          <Agreement ref="AfterFrontEnShip" :height="300" :data="AfterFrontEnShip" :isEdit="isEdit" title="变更后" />
        </el-col>
      </el-row>
      <Audit v-if="ruleForm.isStatus > 1" ref="Audit" :data="ruleForm" :isEdit="false" />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { addData, getInfo, updateData, findByShip } from '@/api/water-transportation-services/keep-on-record/entrust-change-filing'

import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Entrustship from '@/views/components/entrustship/index'
import Enterprise from '@/views/components/entrustship/enterprise'
import Agreement from '@/views/components/entrustship/agreement'
import Audit from '@/views/components/entrustship/audit'
export default {
  components: {
    Entrustship,
    Enterprise,
    Agreement,
    Audit
  },
  data() {
    return {
      enterpriseId:'',
      isEdit:false,
      changeFrontEnterpriseId:'', //变更前企业ID
      changeEnterpriseId:'', //变更后企业ID
      beforeFrontEnShip: {}, // 变更前委托协议信息
      AfterFrontEnShip:{}, //变化后协议信息
      loading:false,
      ruleForm: {},
    }
  },
  async mounted() {
    let {id} = this.$route.query
    if(id){
      let info = await getInfo(this.$route.query.id)
      this.ruleForm = info.data || {}
      this.changeFrontEnterpriseId = this.ruleForm?.changeFrontEnterpriseId || '' //变更前企业ID
      this.changeEnterpriseId = this.ruleForm?.changeEnterpriseId || '' //变更后企业ID
      this.beforeFrontEnShip = {
        entrustAgreementName:this.ruleForm?.frontEntrustAgreementName,
        entrustAgreementNo:this.ruleForm?.frontEntrustAgreementNo,
        enclosureInfo:this.ruleForm?.frontEnclosureInfo
      }
      this.AfterFrontEnShip = {
        entrustAgreementName:this.ruleForm?.changeFilingEntrustAgreementInfoVo.entrustAgreementName,
        entrustAgreementNo:this.ruleForm?.changeFilingEntrustAgreementInfoVo.entrustAgreementNo,
        enclosureInfo:this.ruleForm?.changeFilingEntrustAgreementInfoVo.enclosureInfo
      }
    }

    const user = await findByUserId()
    this.enterpriseId = user.data.id
    this.ruleForm = {
      ...this.ruleForm,
      organizationName:user.data.organizationName,
      enterpriseName:user.data.enterpriseName,
      enterpriseId:user.data.id,
      organizationId:user.data.organizationId,
    }
  },
  methods: {
    //选择船舶
    changeFrontEnterprise(changeFrontEnterpriseId,shipId){
      this.changeFrontEnterpriseId = changeFrontEnterpriseId
      findByShip({ shipId: shipId }).then(res => {
        this.beforeFrontEnShip = res.data || {}
      })
    },
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
      let Entrustship = await this.$refs.Entrustship.submitForm()
      let changeFrontEnterpriseId = await this.$refs.changeFrontEnterpriseId.submitForm() //企业
      let changeEnterpriseId = await this.$refs.changeFrontEnterpriseId.submitForm()
      let beforeFrontEnShip = await this.$refs.beforeFrontEnShip.submitForm() //协议
      let AfterFrontEnShip = await this.$refs.AfterFrontEnShip.submitForm()

      if(Entrustship===false || changeFrontEnterpriseId===false || changeEnterpriseId===false || beforeFrontEnShip===false || AfterFrontEnShip===false){
        return false
      }
      
      let data = {
        //基础信息
        ...Entrustship,
        //变更后协议
        changeFilingEntrustAgreementInfoDto:AfterFrontEnShip,
        //变更前协议
        frontEntrustAgreementNo:beforeFrontEnShip.entrustAgreementNo,
        frontEntrustAgreementName:beforeFrontEnShip.entrustAgreementName,
        frontEnclosureInfo:beforeFrontEnShip.enclosureInfo,
        //变更前企业
        changeFrontEnterpriseId:changeFrontEnterpriseId.enterpriseId,
        //变更后企业
        changeOrganizationName:changeEnterpriseId.changeOrganizationName,
        certificateCode:changeEnterpriseId.certificateCode,
        changeEnterpriseId:changeEnterpriseId.enterpriseId,
        changeEnterpriseName:changeEnterpriseId.enterpriseName
      }
      this.loading = true
      let res = data.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
    h3 {
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        color: #ffffff;
        background: #8aafd5;
    }
}
</style>

