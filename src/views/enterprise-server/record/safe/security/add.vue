<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="信息填报" />
      </span>
    </div>
    <div class="basic-detail">
      <Security v-if="Object.keys(ruleForm).length > 0" ref="Security" :data="ruleForm" :isEdit="isEdit" />
      <Acceptance v-if="ruleForm.isStatus > 1" ref="Acceptance" :data="ruleForm" :isEdit="false" />
      <Audit v-if="ruleForm.isStatus > 3" ref="Audit" :data="ruleForm" :isEdit="false" />
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          type="primary"
          :loading="loading"
          @click="submitForm"
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
    </div>
  </el-card>
</template>

<script>
import { add, update, findById } from '@/api/port-services/record-management/report-filing'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Security from '@/views/components/keeponrecord/security.vue'
import Acceptance from '@/views/components/keeponrecord/acceptance.vue'
import Audit from '@/views/components/keeponrecord/audit.vue'
export default {
  components: {
    Security,
    Acceptance,
    Audit
  },
  data() {
    return {
      ruleForm: {},
      isEdit:true,
      userInfo: {
        filingForm:1,
        id:''
      },
      isAcceptance: false,
      loading: false,
    }
  },
  async mounted() {
    let {id,filingForm,isAcceptance} = this.$route.query
    this.isAcceptance = isAcceptance
    if (id) {
      let info = await findById(id)
      this.ruleForm = info.data || {}
    }
    //获取企业用户信息
    const res = await findByUserId()
    this.ruleForm = {
      ...this.ruleForm,
      organizationName:res.data.organizationName,
      enterpriseName:res.data.enterpriseName,
      enterpriseId:res.data.id,
      organizationId:res.data.organizationId,
    }
    this.userInfo = res.data
    this.ruleForm.filingForm = Number(filingForm) || 1
  },
  methods: {
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
      const data = await this.$refs.Security.submitForm()
      if(data===false){
        return false
      }
      this.loading = true
      const res = this.ruleForm.id ? await update(data) : await add(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回列表
    returnBack() {
      this.$router.push({ path: `/record/safe/security` })
    }
  }
}
</script>
