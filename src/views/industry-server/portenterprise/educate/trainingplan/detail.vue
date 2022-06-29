<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业培训计划详情页" />
      </span>
    </div>
    <div class="basic-detail2">
      <div class="icon-title">
        <span class="span" />培训计划
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
        <el-descriptions-item label="企业名称：">
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="培训计划：">
          {{ ruleForm.planningName }}
        </el-descriptions-item>
        <el-descriptions-item label="培训科目：">
          {{ ruleForm.trainSubjects }}
        </el-descriptions-item>
        <el-descriptions-item label="培训方式：">
          {{ ruleForm.trainModes }}
        </el-descriptions-item>
        <el-descriptions-item label="培训对象：">
          {{ ruleForm.trainObject }}
        </el-descriptions-item>
        <el-descriptions-item label="培训内容：">
          {{ ruleForm.trainContent }}
        </el-descriptions-item>
        <el-descriptions-item label="计划开始培训时间：">
          {{ ruleForm.planningTime }}
        </el-descriptions-item>
        <el-descriptions-item label="组织人：">
          {{ ruleForm.organizerPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人：">
          {{ ruleForm.reporterPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人联系电话：">
          {{ ruleForm.reporterPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="填报时间">
          {{ ruleForm.reportedTime }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="备注">
          {{ ruleForm.remark }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />附件信息
      </div>
      <FileTable
        :show-download="true"
        :table-data="ruleForm.enclosure"
      />
    </div>
  </el-card>
</template>

<script>
import FileTable from '@/components/features/FileTable'
import { getTrainingPlanningById } from '@/api/general-services/educateTrain/educatePlan'
export default {
  components: {
    FileTable
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const { id } = this.$route.query
    getTrainingPlanningById({ id }).then(res => {
      if (!res.data) return
      this.ruleForm = {
        ...res.data,
        enclosure: res.data.enclosure ? JSON.parse(res.data.enclosure) : []
      }
    })
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
