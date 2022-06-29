<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口经营许可证详情" />
      </span>
    </div>
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
  </el-card>
</template>

<script>
import { findLicense } from '@/api/general-services/enterprise-qualification/business-license'
import PortLicense from '@/views/components/license/port'
export default {
  components: {
    PortLicense
  },
  data() {
    return {
      licenseData:{},
      fileList:[],
      isEdit:false
    }
  },
  created() {
    const detailId = this.$route.query.id
    this.fetchData(detailId)
  },
  methods: {
    async fetchData(detailId) {
      findLicense({ id: detailId }).then(res => {
        this.licenseData = res.data || {}
      })
    },
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>
