<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急物资详情" />
      </span>
    </div>
    <div class="basic-detail">
      <Goods ref="Goods" :isEdit="false" :data="ruleForm" :isHy="true" />
    </div>
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
import { selectInfo } from '@/api/emergency-services/material'
import Goods from '@/views/components/emergency-data/goods'
export default {
  components: {
    Goods
  },
  data() {
    return {
      loading: false,
      ruleForm: {},
    }
  },
  mounted() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    fetchDetail(id) {
      selectInfo({ id }).then(res => {
        this.ruleForm = {
          ...res.data
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>