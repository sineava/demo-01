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
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">船舶名称：</template>
        {{ info.shipName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">船舶营运证编号：</template>
        {{ info.shipLicenseNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">事故等级：</template>
        {{ info.accidentLevel >= 1 ? options[info.accidentLevel -1].label: '' }}
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">事故描述：</template>
        {{ info.accidentDesc }}
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">事故原因：</template>
        {{ info.accidentReason }}
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">备注：</template>
        {{ info.remarks }}
      </el-descriptions-item>
    </el-descriptions>
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
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
