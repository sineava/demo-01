<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="重大责任事故详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />基础信息
    </div>
    <AccidentBasic
      ref="AccidentBasic"
      :data="info"
      :isEdit="false"
    />
    <div v-if="info.isStatus>1">
      <div
        class="icon-title"
        style="margin-top: 20px;"
      >
        <span class="span" /> 审核信息
      </div>
      <AccidentAudit
        ref="AccidentAudit"
        :data="info"
        :isEdit="false"
        :isHy="false"
      />
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
import { findById } from '@/api/water-transportation-services/information/water-transport-en-major-events-filing'
import AccidentBasic from '@/views/components/accident'
import AccidentAudit from '@/views/components/accident/audit'
export default {
  components: {
    AccidentBasic,
    AccidentAudit
  },
  data() {
    return {
      info: {},
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    this.info = res.data
  }
}
</script>
