<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="客运班轮停航备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus < 3"
          type="primary"
          size="small"
          @click="reSubmit"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <PassengerTransport ref="PassengerTransport" :data="info" :isEdit="false" />
    <Audit v-if="info.isStatus > 1" ref="Audit" :data="info" :isEdit="false" />
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
import { getInfo } from '@/api/water-transportation-services/keep-on-record/cruise-liner-suspend-filing'
import PassengerTransport from '@/views/components/passenger-transport/index'
import Audit from '@/views/components/passenger-transport/audit'
export default {
  components: {
    PassengerTransport,
    Audit
  },
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.info = info.data
    }
  },
  methods: {
    reSubmit() {
      this.$router.push({ path: '/record/water/other/addPassengerInfo', query: { id: this.$route.query.id }})
    }
  }
}
</script>
