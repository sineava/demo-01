<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="人员详情" />
      </span>
    </div>
    <Professional ref="professional" :data="info" :isEdit="isEdit" />
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
import { getInfo } from '@/api/water-transportation-services/information/manage-person'
import Professional from '@/views/components/professional'
export default {
  components:{
    Professional
  },
  data() {
    return {
      info: {},
      isEdit:false
    }
  },
  async mounted() {
    const res = await getInfo(this.$route.query.id)
    this.info = res.data
  },
  methods: {
    returnBack() {
      this.$store.state.app.basicTabActive = 3
      window.history.back()
    }
  }
}
</script>
<style>
.my-label {
    font-weight: 600 !important;
    text-align: right !important;
}

.my-content {
    width: 23.33%;
}
</style>
