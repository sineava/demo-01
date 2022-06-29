<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="整改通知详情" />
      </span>
    </div>

    <div class="basic-detail">
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="整改通知标题:" :span="3">{{ info.noticeTitle }}</el-descriptions-item>
        <el-descriptions-item
          class="noticeContent"
          label="更改通知内容:"
          :span="3"
        >
          {{ info.noticeContent }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script>
import { findRectificationNoticeInfo } from '@/api/general-services/safety-supervision-and-inspection/noticeInfo'
export default {
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    const res = await findRectificationNoticeInfo(this.$route.query.id)
    this.info = res.data
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 150px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 80%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
