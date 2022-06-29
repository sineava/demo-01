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
    <div class="list-column-wrap">
      <div class="info-list">
        <div class="label">
          船舶名称：
        </div><div class="content">
          {{ info.shipName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶营运证编号：
        </div><div class="content">
          {{ info.shipLicenseNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          事故等级：
        </div><div class="content">
          {{ options[info.accidentLevel -1].label }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label">
          事故描述：
        </div><div
          class="content"
        >
          {{ info.accidentDesc }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label">
          事故原因：
        </div><div class="content">
          {{ info.accidentReason }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label">
          备注：
        </div><div class="content">
          {{ info.remarks }}
        </div>
      </div>
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
import { findById } from '@/api/water-transportation-services/information/ship-en-major-events-filing'
export default {
  data() {
    return {
      info: {},
      options: [{
        value: '1',
        label: '特别重大'
      }, {
        value: '2',
        label: '重大'
      }, {
        value: '3',
        label: '较大'
      }, {
        value: '4',
        label: '一般'
      }]
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    this.info = res.data
  },
  methods: {
    returnBack() {
      this.$store.state.app.basicTabActive = 6
      window.history.back()
    }
  }
}
</script>
