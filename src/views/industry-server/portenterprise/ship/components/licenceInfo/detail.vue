<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="经营许可证" />
      </span>
    </div>
    <LicenseAship ref="LicenseAship" :data="info" :isEdit="false" />
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
import { getInfo } from '@/api/water-transportation-services/information/ship-manage-business-license'
import LicenseAship from '@/views/components/license/aship'
export default {
  components: {
    LicenseAship
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
    returnBack() {
      this.$store.state.app.basicTabActive = 5
      window.history.back()
    }
  }
}
</script>
