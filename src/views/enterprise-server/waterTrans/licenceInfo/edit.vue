<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输经营许可证" />
      </span>
    </div>
    <License ref="License" :data="ruleForm" :isEdit="true" />
    <div class="backstage-edit-btn">
      <el-button
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
import { getInfo,saveLicense,updateLicense } from '@/api/water-transportation-services/information/water-transport-business-license'
import { mapGetters } from 'vuex'
import License from '@/views/components/license/index'
export default {
  components: {
    License
  },
  data() {
    return {
      ruleForm: {
        enterpriseName:'',
        endDate:'',
        startDate:''
      },
      loading:false,
      route:{}
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async mounted() {
    this.ruleForm.enterpriseName = this.user_info.orgname
    if (this.$route.query.id){
      const res = await getInfo(this.$route.query.id)
      this.ruleForm = res.data || {}
    }
  },
  methods: {
    // 提交
    async submitForm(formName) {
      const data = await this.$refs.License.submitForm(formName)
      if (data!==false){
        this.saveData(data)
      }
    },
    // 保存
    async saveData(data) {
      this.loading = true
      data.enterpriseId = this.route.enterpriseId
      const res = data.id ? await updateLicense(data) : await saveLicense(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
  }
}
</script>
