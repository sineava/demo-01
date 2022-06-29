<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业专职管理人员变更备案详情页" />
      </span>
    </div>
    <KeepProfessional
      ref="KeepProfessional"
      :data="data"
      :isEdit="false"
    />
    <div style="margin-top: 20px;" />
    <KeepProfessionalAuth
      ref="keepProfessionalAuth"
      :data="data"
      :isEdit="isEdit"
    />
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
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/ship-manage-person-filing'
import { momentDate } from '@/utils/index'
import KeepProfessional from '@/views/components/keep/professionalSip'
import KeepProfessionalAuth from '@/views/components/keep/auth'
export default {
  components: {
    KeepProfessional,
    KeepProfessionalAuth
  },
  data() {
    return {
      data:{},
      isEdit:false,
      loading: false,
      enterpriseInfo: false,
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit ? true :false
    // 查询详情
    if (this.$route.query.id) {
      const res = await getInfo(this.$route.query.id)
      this.data = res.data || {}
      this.data.reviewedBy = this.$store.getters.user_info.username
      this.data.reviewedDate = momentDate(new Date(),'YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    /**
     * 保存
     */
    submitForm(formName) {
      this.save()
    },
    async save() {
      const data = await this.$refs.keepProfessionalAuth.submitForm()
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
