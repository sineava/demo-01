<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="备案受理详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus === 1 || info.isStatus === 2 || info.isStatus === 5"
          type="primary"
          size="small"
          @click="add(info.filingForm)"
        >
          重新提交
        </el-button>
        <el-button
          v-if="info.isStatus === 4 && info.filingForm !== 3"
          type="primary"
          size="small"
          @click="add(2)"
        >
          变更备案
        </el-button>
        <el-button
          v-if="info.isStatus === 4 && info.filingForm !== 3"
          type="primary"
          size="small"
          @click="add(3)"
        >
          注销备案
        </el-button>
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本信息
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
        <el-descriptions-item label="港口企业名称:" :span="2">{{ info.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="法定代表人姓名:">{{ info.legalPerson }}</el-descriptions-item>
        <el-descriptions-item label="经营场所:" :span="3">{{ info.premises }}</el-descriptions-item>
        <el-descriptions-item label="经营范围:" :span="3">{{ info.businessScope }}</el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">{{ info.remarks }}</el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />附件信息
      </div>
      <common-table
        :table-data="info.enclosureInfo"
        show-download
        :show-delete="false"
        @handleDelete="handleDelete"
      />

      <el-descriptions
        class="descriptions-one"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item v-if="info.cancellationReason" label="注销原因:">{{ info.cancellationReason }}</el-descriptions-item>
      </el-descriptions>

      <div v-if="info.isStatus > 1" style="margin-top: 20px;">
        <div class="icon-title">
          <span class="span" />备案受理
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
          <el-descriptions-item label="受理状态:">{{ info.isStatus===1?'受理中':(info.isStatus===2?'受理退回':'已受理') }}</el-descriptions-item>
          <el-descriptions-item label="受理人:">{{ info.acceptBy }}</el-descriptions-item>
          <el-descriptions-item label="受理时间:">{{ info.acceptDate }}</el-descriptions-item>
          <el-descriptions-item label="受理意见:">{{ info.acceptOpinion }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <div v-if="isAcceptance && info.isStatus > 3">
        <div class="icon-title">
          <span class="span" />备案审核
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
          <el-descriptions-item label="审核状态:">{{ info.isStatus===4?'已审核':'审核退回' }}</el-descriptions-item>
          <el-descriptions-item label="审核人:">{{ info.reviewedBy }}</el-descriptions-item>
          <el-descriptions-item label="审核时间:">{{ info.reviewedDate }}</el-descriptions-item>
          <el-descriptions-item label="审核意见:">{{ info.reviewedOpinion }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 备案受理 -->
      <!-- 备案审核 -->
      <div v-if="isAcceptance && info.isStatus > 2">
        <div
          v-if="isEdit || info.isStatus > 3"
          class="icon-title"
        >
          <span class="span" />审核附件
        </div>
        <common-table
          v-if="isEdit || info.isStatus > 3"
          :table-data="fileList"
          show-download
          show-delete
          @handleDelete="handleDelete"
        />
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
import { findById } from '@/api/port-services/record-management/service-en-filing'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      isEdit: false,
      isAcceptance: false,
      id: '',
      info: {},
      fileList:[]
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit === 'true'
    this.isAcceptance = this.$route.query.isAcceptance === 'true'
    this.id = this.$route.query.id
    let info = await findById(this.$route.query.id)
    try {
      info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
      info.data.reviewedFile = JSON.parse(info.data.reviewedFile) || []
      this.fileList = info.data.reviewedFile || []
    } catch (err) {
      console.log()
    }
    this.info = info.data
  },
  methods: {
    /**
     * 添加
     */
    add(type) {
      this.$router.push({ path: `/record/enterprise/addAccept?filingForm=${type}&id=${this.id}` })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.info.enclosureInfo.splice(index, 1)
    }
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
        width: 20%;
        line-height: 30px;
    }
}
.descriptions-one{
  margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 90%;
        line-height: 30px;
    }
}
</style>
