<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急预案详情</span>
    </div>
    <div class="basic-detail">
      <Paln ref="Paln" :isEdit="false" :data="ruleForm"/>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium "
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { queryDetail } from '@/api/emergency-services/response-plan'
import Paln from '@/views/components/plan'
export default {
  components: {
    Paln
  },
  data() {
    return {
      ruleForm: {},
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) { // 详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = res.data || {}
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/plan' })
    }
  }
}
</script>