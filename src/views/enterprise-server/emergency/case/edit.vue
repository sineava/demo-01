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
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
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
          <template slot="label">事故名称:</template>
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">事故类型:</template>
          {{ ruleForm.type }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">事故级别:</template>
          {{ field_level.find(x => x.value === ruleForm.level).label }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">事故类别:</template>
          {{ field_category.find(x => x.value === ruleForm.category).label }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">联系电话:</template>
          {{ ruleForm.phone }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
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
        <el-form-item
          v-if="type !== 'detail'"
          style="width: 100%;"
          label-width="0"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            multiple
            :limit="5"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
      </el-form>
      <FileTable
        :show-download="type !== 'add'"
        :show-delete="type !== 'detail'"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
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
import { telephone } from '@/utils/validate'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { saveEntity, updateById, queryDetail } from '@/api/emergency-services/accident-case'
export default {
  components: {
    FileTable,
    upload
  },
  mixins: [emergencyCase],
  data() {
    return {
      ruleForm: {
        accidentHappened: '',
        accidentLesson: '',
        accidentDescribe: '',
        emergencyRescueSituation: '',
        enterpriseName: '',
        filePath: [],
        id: null,
        immediateCause: '',
        indirectReason: '',
        level: '',
        name: '',
        nature: '',
        phone: '',
        precautionaryMeasure: '',
        processingOpinion: '',
        responsibilityIdentification: '',
        summary: '',
        type: ''
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入事故名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入事故类型', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择事故级别', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择事故类别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        enterpriseName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '请输入事故性质', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          filePath: JSON.parse(res.data.filePath)
        }
        this.fileList = this.ruleForm.filePath
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存
    async saveData() {
      const id = this.ruleForm.id || null
      const dto = {
        ...this.ruleForm,
        id,
        filePath: JSON.stringify(this.fileList)
      }
      const res = id ? await updateById(dto) : await saveEntity(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/case' })
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: file.size,
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
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
</style>
