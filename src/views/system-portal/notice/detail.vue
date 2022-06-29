<template>
  <div class="app-details">
    <div class="detail-content">
      <div class="back" @click="returnBack">返回列表</div>
      <div class="content-title">{{ obj.messageTitle }}</div>
      <div class="content-label">
        <span class="label"><div>消息类型：</div>
          <span v-if="type===1&&obj.noticeType"> {{ noticeType[obj.noticeType - 1].label }} </span>
          <span v-if="type===2">发文待办</span>
          <span v-if="type===3">收文待办</span>
          <span v-if="type===5">会议通知</span>
          <span v-if="type===6">信息通知</span>
        </span>|
        <span>{{ obj.createTime || obj.pubDate }}</span>|<span>{{ obj.sendUnit }}</span>
      </div>
      <div class="hr" />
      <div class="content" v-html="obj.messageContent" />
      <div v-if=" obj.enclosureInfo && obj.enclosureInfo.length > 0" class="file-title">附件</div>
      <div
        v-for="(item, index) in obj.enclosureInfo"
        :key="index"
        class="file-name"
        @click="download(item.filePath)"
      >
        {{ item.fileName }}
      </div>
    </div>
  </div>
</template>
<script>
import { getNoticeDetail, getDispatchInfo, getIncomingInfo, getMeetingInfo, getAdviseInfo, getAdviseSentInfo } from '@/api/system-portal/new-notice'
import { newsInfo } from '@/utils/public-fields'
import { downloadCodeImg,replaceImg } from '@/utils/index'
export default {
  mixins: [newsInfo],
  props: {
    notice: {
      type: Object,
      required: true
    },
    type: {
      type: Number,
      default: 1 // 1重要公告2发文待办3收文待办4待审批事项5会议通知6信息通知
    },
    detailType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      obj: {}
    }
  },
  async mounted() {
    let res = {}
    switch (this.type) {
    case 1: // 重要公告
      res = await getNoticeDetail(this.notice.id)
      break
    case 2: // 发文待办
      res = await getDispatchInfo(this.notice.id)
      break
    case 3: // 收文待办
      res = await getIncomingInfo(this.notice.id)
      break
    case 5: // 会议通知
      res = await getMeetingInfo(this.notice.id)
      break
    case 6: // 信息通知
      res = this.detailType === 'save' ? await getAdviseSentInfo(this.notice.id) : await getAdviseInfo(this.notice.id)
      break
    default:
      break
    }
    try {
      res.data.enclosureInfo = JSON.parse(res.data.enclosureInfo) || []
    } catch (e) {
    }
    this.obj = res.data
    this.obj.messageContent = this.obj.messageContent ? await replaceImg(this.obj.messageContent) : ''
  },
  methods: {
    returnBack() {
      this.$emit('return')
    },
    download(url) {
      downloadCodeImg(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-details {
    .detail-content {
        padding: 30px 0 40px 0;
        width: 934px;

        .back {
            border: 1px solid #3e95fc;
            border-radius: 4px;
            width: 72px;
            height: 28px;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            color: #3e95fc;
            cursor: pointer;
        }

        .content-title {
            margin: 15px 0 10px 0;
            font-size: 26px;
            line-height: 46px;
        }
    }

    .content-label {
        display: flex;
        font-size: 12px;
        color: #666666;

        span {
            margin: 0 10px;
        }

        .label {
            display: flex;
            margin-left: 0;

            div {
                color: #999999;
            }
        }
    }

    .hr {
        margin: 28px 0 22px 0;
        height: 1px;
        background: #edf1f5;
    }

    .content {
        font-size: 14px;
        line-height: 25px;
        text-align: left;
        color: #666666;
    }

    .file-title {
        margin-top: 30px;
        font-size: 14px;
        font-weight: bold;
    }

    .file-name {
        margin: 10px 0;
        font-size: 14px;
        color: #3e95fc;
        cursor: pointer;
    }
}
</style>
