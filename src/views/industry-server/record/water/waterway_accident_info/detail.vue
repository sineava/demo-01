<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输企业重大事件备案详情页" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />基础信息
    </div>
    <AccidentBasic
      ref="AccidentBasic"
      :data="info"
      :isEdit="false"
      :enterpriseId="enterpriseId"
    />
    <div
      class="icon-title"
      style="margin-top: 20px;"
    >
      <span class="span" /> 审核信息
    </div>
    <AccidentAudit
      ref="AccidentAudit"
      :data="info"
      :isEdit="isEdit && info.isStatus === 1 ? true : false"
      :isHy="true"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium"
        :loading="loading"
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
import { findById, reviewData } from '@/api/water-transportation-services/information/water-transport-en-major-events-filing'
import AccidentBasic from '@/views/components/accident'
import AccidentAudit from '@/views/components/accident/audit'
export default {
  components: {
    AccidentBasic,
    AccidentAudit
  },
  data() {
    return {
      info: {},
      ruleForm: {
        id: '',
        isStatus: '',
        reviewedBy: '',
        reviewedOpinion: ''
      },
      enterprise:{},
      enterpriseId:'',
      isEdit: false,
      loading: false,
    }
  },
  async mounted() {
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    // 查询详情
    if (this.$route.query.id) {
      let info = await findById(this.$route.query.id)
      this.enterprise = {
        id:info.data?.enterpriseId,
        enterpriseName:info.data?.enterpriseName,
        organizationName:info.data?.organizationName
      }
      this.enterpriseId = info.data.enterpriseId
      this.info = info.data
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
      let data = await this.$refs.AccidentAudit.submitForm()
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        }
      })
    }
  }
}
</script>
