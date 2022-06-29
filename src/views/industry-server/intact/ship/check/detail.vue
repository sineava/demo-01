<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶检验详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 船舶信息
    </div>
    <el-table
      style="margin-bottom: 20px;"
      :data="tableList"
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="船名"
        prop="shipName"
      />
      <el-table-column
        label="船检登记号"
        prop="shipInsRegNo"
      />
      <el-table-column
        label="船舶登记号"
        prop="shipRegisterNo"
      />
    </el-table>
    <div class="icon-title">
      <span class="span" /> 船舶检验信息
    </div>
    <div class="list-column-wrap">
      <div class="info-list info-list-two">
        <div class="label">
          检验编号:
        </div><div class="content">
          {{ info.shipSurveyNo }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          船名:
        </div><div class="content">
          {{ info.shipName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验编号:
        </div><div class="content">
          {{ info.shipSurveyNo }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验种类:
        </div><div class="content">
          {{ info.shipSurveyItemName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验地点:
        </div><div class="content">
          {{ info.shipSurveyPlace }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验开始日期:
        </div><div class="content">
          {{ info.shipSurveyStartDate }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验完成日期:
        </div><div class="content">
          {{ info.shipSurveyCompleteDate }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          下次检验日期:
        </div><div class="content">
          {{ info.nextInspectionDate }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          检验单位:
        </div><div class="content">
          {{ info.shipSurveyOrg }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          验船师:
        </div><div class="content">
          {{ info.marineSurveyor }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          证书状态:
        </div><div class="content">
          {{ info.certificateStatus }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label" /><div class="content" />
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /> 本次检验发放的证书文件（检验编号：{{ info.shipSurveyNo }}）
    </div>
    <div class="list-column-wrap">
      <div v-for="(item, index) in info.certificate" :key="index" class="info-list info-list-two">
        <div style="margin-left: 30px;" class="content">
          <a target="_blank" :href="item.filePath">{{ item.name }}</a>
        </div>
      </div>
    </div>
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
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
import { getInfo } from '@/api/ship-inspection/records/index'
export default {
  data() {
    return {
      info: {},
      tableList: []
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.info = (await getInfo(this.$route.query.id)).data
      this.info.certificate = JSON.parse(this.info.certificate) || []
      this.tableList = [{shipName: this.info.shipName, shipInsRegNo: this.info.shipInsRegNo,shipRegisterNo:this.info.shipRegisterNo}]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 5%;

    .el-form-item {
        width: 40%;

        .el-select {
            width: 100%;
        }
    }
}

a {
    color: #007aff;
    cursor: pointer;
}
</style>
