<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>信息填报</span>
    </div>
    <div class="basic-detail">
      <Emergency ref="Emergency" :data="ruleForm" :isEdit="isEdit" />
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
import { add, update, findById } from '@/api/port-services/record-management/emergency-filing'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Emergency from '@/views/components/keeponrecord/emergency'
import Acceptance from '@/views/components/keeponrecord/acceptance'
import Audit from '@/views/components/keeponrecord/audit'
export default {
  components: {
    Emergency,
    Acceptance,
    Audit
  },
  data() {
    return {
      isEdit:true,
      ruleForm: {},
      loading: false,
      userInfo: {},
      isStatus: 0,
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
    submitForm() {
      this.save()
    },
    async save() {
      const data = await this.$refs.Emergency.submitForm()
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
      this.$router.push({ path: `/record/safe/emergency` })
    }
  }
}
</script>
