<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="name" />
      </span>
    </div>
    <basic-info />
  </el-card>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
export default {
  components: {
    BasicInfo
  },
  data() {
    return {
      name:''
    }
  },
  async mounted() {
    this.name = this.$route.query.name
  }
}
</script>
