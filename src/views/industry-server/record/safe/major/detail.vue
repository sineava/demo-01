<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="备案信息详情" />
      </span>
    </div>
    <div class="basic-detail">
      <HiddenDanger ref="HiddenDanger" :data="info" :isEdit="false" />
      <Acceptance ref="Acceptance" :data="info" :isEdit="(isEdit && info.isStatus===1)" :isHy="true" />
      <Audit v-if="(info.isStatus > 3) || (info.isStatus === 3 && isEdit)" ref="Audit" :data="info" :isEdit="isEdit" :isHy="true" />
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
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
import { findById, recordAcceptance, recordReview } from '@/api/port-services/record-management/major-threat-filing'
import HiddenDanger from '@/views/components/keeponrecord/hiddenDanger.vue'
import Acceptance from '@/views/components/keeponrecord/acceptance.vue'
import Audit from '@/views/components/keeponrecord/audit.vue'
export default {
  components: {
    HiddenDanger,
    Acceptance,
    Audit
  },
  data() {
    return {
      isEdit: false,
      isAcceptance: false,
      id: '',
      tabActive: 1,
      info: {},
      loading: false,
    }
  },
  async mounted() {
    let {id,isEdit,isAcceptance,tabActive} = this.$route.query
    this.isEdit = isEdit === 'true'
    this.isAcceptance = isAcceptance === 'true'
    this.id = id
    this.tabActive = tabActive
    let info = await findById(id)
    this.info = info.data || {}
  },
  methods: {
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
      let data = false
      if (this.info.isStatus === 1) {
        data = await this.$refs.Acceptance.submitForm()
      } else {
        data = await this.$refs.Audit.submitForm()
      }
      if(data===false){
        return false
      }
      this.loading = true
      const res = this.info.isStatus === 1 ? await recordAcceptance(data) : await recordReview(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    /**
     * 返回
     */
    returnBack() {
      this.$router.push({ path: `/record/safe/major?tabActive=${this.tabActive}` })
    }
  }
}
</script>