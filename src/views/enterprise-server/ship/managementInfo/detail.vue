<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理信息详情" />
      </span>
    </div>
    <!-- 船舶基础信息 -->
    <Ashipbasic
      ref="Ashipbasic"
      :isEdit="isEdit"
      :initData.sync="info"
      :operType="oper"
      :enterpriseType="5"
      :enterpriseId="enterpriseId"
      :enterpriseName="enterpriseName"
      :isShow="isShow"
      @saveButton="saveButton"
      @changeBusiness="changeBusiness"
      @changeLicense="changeLicense"
    />
    <Ashiplicense
      ref="Ashiplicense"
      :isEdit="isEdit"
      :isShow="isShow"
      :initData="info"
      :operType="oper"
      :enterpriseType="5"
      :licenseData="license"
      @changeLicense="changeLicense"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit && isShow"
        type="primary"
        size="medium "
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
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
import { getInfo,putCBShip } from '@/api/water-transportation-services/information/enterprise-ship'
import { mapGetters } from 'vuex'
import Ashipbasic from '@/views/components/aship/basic'
import Ashiplicense from '@/views/components/aship/license'
export default {
  components: {
    Ashipbasic,
    Ashiplicense
  },
  data() {
    return {
      info: {},
      license:{},
      isEdit:true,
      enterpriseId:'',
      isShow:false,
      oper:'',
      loading:false,
      enterpriseName:'',
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async mounted() {
    this.enterpriseName = this.user_info.orgname
    this.oper = this.$route.query.oper
    this.isEdit = this.oper==='add' || this.oper==='edit' ? true : false
    this.isShow = this.oper==='edit' ? true : false
    if (this.$route.query.id){
      const res = await getInfo(this.$route.query.id)
      this.info = res.data
      this.license = res.data.enterpriseShipLicenseInfoVo || {}
    }
  },
  methods: {
    returnBack() {
      this.$router.back(-1)
    },
    // 提交
    async submitForm() {
      if (this.loading){
        return false
      }
      const data = await this.$refs.Ashipbasic.submitForm('ruleForm')
      if (data===false){
        return false
      }
      const shipLicenseInfoDto = await this.$refs.Ashiplicense.submitForm('ruleForm')
      if (shipLicenseInfoDto===false){
        return false
      }
      this.loading = true
      data.shipLicenseInfoDto=shipLicenseInfoDto
      const res = await putCBShip(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    saveButton(isShow){
      this.isShow = isShow
    },
    // 船舶基础信息变更
    changeBusiness(data){
      this.info = data
    },
    // 船舶执照信息变更
    changeLicense(data){
      this.license = data
    }
  }
}
</script>
