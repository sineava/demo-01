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
    <InvestorOther ref="InvestorOther" :data="info" :isEdit="false" />
    <div class="backstage-edit-btn">
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
import { getInfo } from '@/api/water-transportation-services/information/investors'
import InvestorOther from '@/views/components/investor/other'
export default {
  components: {
    InvestorOther
  },
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    const res = await getInfo(this.$route.query.id)
    this.info = res.data
  },
  methods: {
    // 返回
    returnBack() {
      this.$store.state.app.basicTabActive = 2
      this.$router.back()
    },
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 12%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 88%;
        line-height: 30px;
    }
}
</style>
