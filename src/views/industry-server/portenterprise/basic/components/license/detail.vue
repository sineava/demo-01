<template>
  <div class="basic-detail">
    <div class="icon-title">
      <span class="span" />港口经营许可证信息
    </div>
    <PortLicense ref="PortLicense" :data="licenseData" :isEdit="false" />
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { findLicense } from '@/api/general-services/enterprise-qualification/business-license'
import PortLicense from '@/views/components/license/port'
export default {
  components: {
    PortLicense
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      licenseData: {},
    }
  },
  created() {
    const detailId = this.objData.id
    this.fetchData(detailId)
  },
  methods: {
    async fetchData(detailId) {
      findLicense({ id: detailId }).then(res => {
        this.licenseData = res.data || {}
      })
    },
    returnBack() {
      this.$emit('join', { name: '港口经营许可证' })
    }
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
