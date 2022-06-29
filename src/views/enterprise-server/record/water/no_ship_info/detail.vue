<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="无船承运业务案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          type="primary"
          size="small"
          @click="reSubmit"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div>
      <Noship ref="Noship"  :data="info" :isEdit="false"/>
      <Audit v-if="info.isStatus > 1" ref="Audit" :data="info" :isEdit="false" />
    </div>
  </el-card>
</template>

<script>
import { getInfo } from '@/api/water-transportation-services/keep-on-record/non-ship-carriage-filing'
import Noship from '@/views/components/noship/index'
import Audit from '@/views/components/noship/audit'
export default {
  components: {
    Noship,
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
      this.$router.push({ path: '/record/water/other/addNoShipInfo', query: { id: this.$route.query.id }})
    }
  }
}
</script>