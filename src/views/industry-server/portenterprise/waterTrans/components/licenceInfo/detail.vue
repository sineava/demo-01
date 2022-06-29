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
    <License ref="License" :data="info" :isEdit="false" />
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
import { getInfo } from '@/api/water-transportation-services/information/water-transport-business-license'
import License from '@/views/components/license/index'
export default {
  components: {
    License
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
