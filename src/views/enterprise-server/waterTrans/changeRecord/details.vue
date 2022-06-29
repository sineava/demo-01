<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="变更记录详情" />
      </span>
    </div>
    <div class="app-container">
      <ChangeDetails ref="ChangeDetails" :data="info" :type="type" />
    </div>
  </el-card>
</template>

<script>
import { getLicenseChangeInfo } from '@/api/general-services/license'
import ChangeDetails from '@/views/components/business/details'
export default {
  components: {
    ChangeDetails
  },
  data() {
    return {
      info:{},
      type: '',
    }
  },
  async mounted() {
    let id = this.$route.query.id
    this.type = this.$route.query.type
    if (id){
      this.fetchData(id)
    }
  },
  methods: {
    /**
     * 查询详情数据
     */
    fetchData(id) {
      getLicenseChangeInfo({id:id}).then(res => {
        this.info = res.data || {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body-card {
    /deep/ .el-card__body {
        padding: 0 10px;
    }

    /deep/ .el-form-item {
        margin-bottom: 0;
    }
}
</style>
