<template>
 <el-card  class="body-card">
    <div slot="header" class="clearfix">
      <span v-if="isBack" class="detail-back">
        <el-page-header @back="returnBack" content="船舶检验详情" />
      </span>
      <span v-else class="detail-back">检验详情
        <span style="font-weight: 400;font-size: 14px;">
        （<span style="color:#2B85E4">{{info.shipSurveyNo}}</span>）
        <span style="color:#D9001B">备注：括号内显示检验编号</span>
        </span>
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 船舶信息
    </div>
    <el-descriptions
      class="descriptions"
      direction="vertical"
      :column="3"
      :labelStyle="{'text-align':'center'}"
      :contentStyle="{'text-align':'center'}"
      label-class-name="business-title"
      content-class-name="business-text"
      border
    >
      <el-descriptions-item label="船名">{{info.shipName}}</el-descriptions-item>
      <el-descriptions-item label="船检登记号">{{info.shipInsRegNo}}</el-descriptions-item>
      <el-descriptions-item label="船舶登记号">{{info.shipRegisterNo}}</el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 20px;" class="icon-title">
      <span class="span" /> 船舶信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      label-class-name="business-title"
      content-class-name="business-text"
      border
    >
      <el-descriptions-item label="检验编号：">{{ info.shipSurveyNo }}</el-descriptions-item>
      <el-descriptions-item label="船名：">{{ info.shipName }}</el-descriptions-item>
      <el-descriptions-item label="检验种类：">{{ info.shipSurveyItemName }}</el-descriptions-item>
      <el-descriptions-item label="检验地点：">{{ info.shipSurveyPlace }}</el-descriptions-item>
      <el-descriptions-item label="检验开始日期：">{{ info.shipSurveyStartDate }}</el-descriptions-item>
      <el-descriptions-item label="检验完成日期：">{{ info.shipSurveyCompleteDate }}</el-descriptions-item>
      <el-descriptions-item label="下次检验日期：">{{ info.nextInspectionDate }}</el-descriptions-item>
      <el-descriptions-item label="检验单位：">{{ info.shipSurveyOrg }}</el-descriptions-item>
      <el-descriptions-item label="验船师：">{{ info.marineSurveyor }}</el-descriptions-item>
      <el-descriptions-item label="证书状态：">{{ info.certificateStatus }}</el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 20px;" class="icon-title">
      <span class="span" /> 本次检验发放的证书文件（检验编号：{{info.shipSurveyNo}}）
    </div>
    <el-descriptions
      direction="vertical"
      :column="3"
      border
      :labelStyle="{'display':'none'}"
      :contentStyle="{'width':'20%'}"
      style="margin-bottom: 20px"
    >
      <el-descriptions-item 
         v-for="(item, index) in info.certificate"
        :key="index"
      >
        <a @click="clickBlank(item.filePath)" class="link">{{ item.name }}</a>
      </el-descriptions-item>
    </el-descriptions>
 </el-card>
</template>
<script>
import { getInfo } from "@/api/ship-inspection/records/index";
export default {
  data() {
    return {
      info: {},
    };
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    id: {
      async handler() {
        this.info = (await getInfo(this.id)).data;
        this.info.certificate = JSON.parse(this.info.certificate || '[]')
      },
      immediate: true
    }
  },
  methods: {
    clickBlank(url) {
      window.open(url, "_blank"); // 新窗口打开外链接
    }
  }
};
</script>
<style lang="scss" scoped>
.descriptions {
  margin-bottom: 20px;

  ::v-deep .business-title {
      width: 10%;
      font-weight: 700;
      line-height: 30px;
      text-align: right;
      color: #606266;
  }

  ::v-deep .business-text {
      width: 20%;
      line-height: 30px;
  }
}
.link {
  color: #02A7F0;
  line-height: 30px;
}
</style>