<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="专职管理人员信息" />
      </span>
    </div>
    <Professional ref="professional" :data="ruleForm" :isEdit="isEdit" />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
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
import { getInfo,savePersonnel,updatePersonnel } from '@/api/water-transportation-services/information/manage-person'
import Professional from '@/views/components/professional'
export default {
  components:{
    Professional
  },
  data() {
    return {
      ruleForm: {},
      loading:false,
      isEdit:false,
      route:{}
    }
  },
  async mounted() {
    this.route = this.$route.query
    this.isEdit = this.$route.query.oper === 'detail' ? false : true
    if (this.$route.query.id){
      const res = await getInfo(this.$route.query.id)
      this.ruleForm = res.data || {}
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.saveData()
    },
    // 保存
    async saveData() {
      const ruleForm = await this.$refs.professional.submitForm()
      if (ruleForm===false){
        return false
      }
      this.loading = true
      ruleForm.enterpriseId = this.route.enterpriseId
      const res = ruleForm.id ? await updatePersonnel(ruleForm) : await savePersonnel(ruleForm)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$store.state.app.basicTabActive = 3
      this.$router.back()
    },
  }
}
</script>
