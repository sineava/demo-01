<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="投资人信息" />
      </span>
    </div>
    <InvestorOther ref="InvestorOther" :data="ruleForm" :isEdit="true" />
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
import { getInfo,saveInvestors,updateInvestors } from '@/api/water-transportation-services/information/investors'
import InvestorOther from '@/views/components/investor/other'
export default {
  components: {
    InvestorOther
  },
  data() {
    return {
      ruleForm: {},
      loading:false
    }
  },
  async mounted() {
    if (this.$route.query.id){
      const res = await getInfo(this.$route.query.id)
      this.ruleForm = res.data || {}
    }
  },
  methods: {
    // 提交
    async submitForm(formName) {
      let dataFrom = await this.$refs.InvestorOther.submitForm(formName)
      if (dataFrom!==false){
        this.saveData(dataFrom)
      }
    },
    // 保存
    async saveData(data) {
      this.loading = true
      const res = data.id ? await updateInvestors(data) : await saveInvestors(data)
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
<style lang="scss" scoped>
.investor {
    /deep/ .el-input--medium {
        .el-input__inner {
            text-align: left !important;
        }
    }
}
</style>
