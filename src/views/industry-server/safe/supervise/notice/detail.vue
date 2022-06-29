<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="现场检查通知详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" /> 现场检查基本资料
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
        <el-descriptions-item label="计划名称:" :span="3">{{ info.planningName }}</el-descriptions-item>
        <el-descriptions-item label="计划类型:" :span="3">{{ info.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="被检查企业/单位:" :span="3">{{ info.inspectionTarget }}</el-descriptions-item>
        <el-descriptions-item label="计划检查时间:" :span="3">{{ info.planningTime }}</el-descriptions-item>
        <el-descriptions-item label="检查人员:" :span="3">
          <el-tag
            v-for="(item, index) in info.safetyInspectorInfoVoList"
            :key="index"
            type="success"
            style="margin-right: 5px;"
          >
            {{ item.name }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="专家人员:" :span="3">
          <el-tag
            v-for="(item, index) in info.safetyExpertInfoVoList"
            :key="index"
            type="success"
            style="margin-right: 5px;"
          >
            {{ item.name }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="提交时间:" :span="3">{{ info.createTime }}</el-descriptions-item>
        <el-descriptions-item label="检查单位:" :span="3">
          <el-tag v-for="(item,index) in info.isUseUnit" :key="index" style="margin: 5px;"> {{ item ? item[item.length-1] : '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布人:" :span="3">{{ info.createBy }}</el-descriptions-item>
        <el-descriptions-item label="检查备注:" :span="3">{{ info.remark }}</el-descriptions-item>
      </el-descriptions>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { findById, noticeConfirm } from '@/api/general-services/safety-supervision-and-inspection/noticeInfo'
export default {
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    this.info = res.data
    this.info.isUseUnit = JSON.parse(this.info.isUseUnit)
  },
  methods: {
    async saveSubmit() {
      const res = await noticeConfirm(this.info.id)
      if (res.code === '0') {
        this.returnBack()
      }
    }
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
