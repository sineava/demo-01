<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>信息填报</span>
    </div>
    <div class="basic-detail">
      <Danger ref="Danger" :data="ruleForm" :isEdit="isEdit" />
      <Acceptance v-if="ruleForm.isStatus > 1" ref="Acceptance" :data="ruleForm" :isEdit="false" />
      <Audit v-if="ruleForm.isStatus > 3" ref="Audit" :data="ruleForm" :isEdit="false" />
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          type="primary"
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
    </div>
  </el-card>
</template>

<script>
import { add, update, findById } from '@/api/port-services/record-management/major-hazard-filing'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Danger from '@/views/components/keeponrecord/danger'
import Acceptance from '@/views/components/keeponrecord/acceptance'
import Audit from '@/views/components/keeponrecord/audit'
export default {
  components: {
    Danger,
    Acceptance,
    Audit
  },
  data() {
    return {
      isEdit:true,
      ruleForm: {},
      userInfo: {},
      isStatus: 0,
      loading: false,
    }
  },
  async mounted() {
    let {id,filingForm} = this.$route.query
    if (id) {
      let info = await findById(this.$route.query.id)
      this.ruleForm = info.data || {}
    }
    const res = await findByUserId()
    this.userInfo = res.data
    this.ruleForm = {
      ...this.ruleForm,
      organizationName:res.data.organizationName,
      enterpriseName:res.data.enterpriseName,
      enterpriseId:res.data.id,
      organizationId:res.data.organizationId,
    }
    this.ruleForm.filingForm = Number(filingForm) || 1
  },
  methods: {
    /**
     * 保存
     */
    submitForm(formName) {
      this.save()
    },
    async save() {
      const data = await this.$refs.Danger.submitForm()
      if(data===false){
        return false
      }
      this.loading = true
      const res = data.id ? await update(data) : await add(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回列表
    returnBack() {
      this.$router.push({ path: `/record/safe/danger` })
    }
  }
}
</script>
