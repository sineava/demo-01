<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="事故案例详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />基础信息
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
        <el-descriptions-item label="事故名称：">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="事故类型：">
          {{ ruleForm.type }}
        </el-descriptions-item>
        <el-descriptions-item label="事故级别：">
          {{ (field_level.find(x => x.value === ruleForm.level) || {}).label }}
        </el-descriptions-item>
        <el-descriptions-item label="事故类别：">
          {{ (field_category.find(x => x.value === ruleForm.category) || {}).label }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.phone }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故概述
          </div>
        </el-form-item>
        <el-form-item
          prop="accidentDescribe"
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.accidentDescribe"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故单位概括
          </div>
        </el-form-item>
        <el-form-item
          label="单位名称:"
          prop="enterpriseName"
        >
          <el-input v-model.trim="ruleForm.enterpriseName" />
        </el-form-item>
        <el-form-item
          label="概括"
          prop="summary"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.summary"
            type="textarea"
            rows="8"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故发生经过
          </div>
        </el-form-item>
        <el-form-item
          prop="pass"
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.accidentHappened"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故抢救情况
          </div>
        </el-form-item>
        <el-form-item
          prop="situation"
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.emergencyRescueSituation"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故性质和原因
          </div>
        </el-form-item>
        <el-form-item
          label="事故性质"
          prop="nature"
        >
          <el-input v-model.trim="ruleForm.nature" />
        </el-form-item>
        <el-form-item
          label="事故直接原因"
          prop="immediateCause"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.immediateCause"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="事故间接原因"
          prop="indirectReason"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.indirectReason"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故责任与处理
          </div>
        </el-form-item>
        <el-form-item
          label="事故责任认定"
          prop="responsibilityIdentification"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.responsibilityIdentification"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="处理建议"
          prop="processingOpinion"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.processingOpinion"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />事故教训和防范措施
          </div>
        </el-form-item>
        <el-form-item
          label="事故教训"
          prop="accidentLesson"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.accidentLesson"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="防范措施"
          prop="precautionaryMeasure"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.precautionaryMeasure"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />应急预案文件
          </div>
        </el-form-item>
      </el-form>
      <FileTable
        :show-download="true"
        :show-delete="false"
        :table-data="fileList"
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
import { mapGetters } from 'vuex'
import { emergencyCase } from '@/utils/public-fields'
import FileTable from '@/components/features/FileTable'
import { queryDetail } from '@/api/emergency-services/accident-case'
export default {
  components: {
    FileTable
  },
  mixins: [emergencyCase],
  data() {
    return {
      ruleForm: {},
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id } = this.$route.query
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          filePath: JSON.parse(res.data.filePath)
        }
        this.fileList = this.ruleForm.filePath
      })
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
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
