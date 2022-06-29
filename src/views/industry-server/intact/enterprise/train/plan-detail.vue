<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '添加培训计划' : type === 'edit' ? '编辑培训计划' : '培训计划详情页'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />培训计划
      </div>
      <el-descriptions
        style="width: 100%;"
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="企业名称:">
          {{ enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="培训计划名称:">
          {{ ruleForm.planningName }}
        </el-descriptions-item>
        <el-descriptions-item label="培训科目:">
          {{ ruleForm.trainSubjects }}
        </el-descriptions-item>
        <el-descriptions-item label="培训方式:">
          {{ ruleForm.trainModes }}
        </el-descriptions-item>
        <el-descriptions-item label="培训对象:">
          {{ ruleForm.trainObject }}
        </el-descriptions-item>
        <el-descriptions-item label="组织人:">
          {{ ruleForm.organizerPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="计划开始培训时间:">
          {{ ruleForm.planningTime }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人:">
          {{ ruleForm.reporterPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人联系电话:">
          {{ ruleForm.reporterPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="填报时间:">
          {{ ruleForm.reportedTime }}
        </el-descriptions-item>
        <el-descriptions-item label="培训内容:" :span="3">
          {{ ruleForm.trainContent }}
        </el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">
          {{ ruleForm.remark }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          v-if="type !== 'detail'"
          label="上传附件:"
          prop="file"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            multiple
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
        :loading="btnLoading"
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
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import {
  saveTrainingPlanning,
  getTrainingPlanningById,
  updateTraining
} from '@/api/general-services/educateTrain/educatePlan'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    return {
      options: [],
      enterpriseName: '',
      ruleForm: {
        enclosure: '',
        id: null,
        organizerPerson: '',
        planningName: '',
        planningTime: '',
        remark: '',
        reportedTime: '',
        reporterPerson: '',
        reporterPhone: '',
        trainContent: '',
        trainModes: '',
        trainObject: '',
        trainSubjects: ''
      },
      type: '',
      btnLoading: false,
      fileList: [] // 文件列表
    }
  },
  created() {
    // 查询关联企业信息
    const { id, type, enterpriseName } = this.$route.query
    this.enterpriseName = enterpriseName
    this.type = type
    // 获取详情
    if (id !== 0) {
      getTrainingPlanningById({ id })
        .then(res => {
          if (!res) return
          this.ruleForm.id = id
          this.ruleForm.enclosure = res.data.enclosure
          this.ruleForm.organizerPerson = res.data.organizerPerson
          this.ruleForm.planningName = res.data.planningName
          this.ruleForm.planningTime = res.data.planningTime.replace('T', ' ')
          this.ruleForm.remark = res.data.remark
          this.ruleForm.reportedTime = res.data.reportedTime.replace('T', ' ')
          this.ruleForm.reporterPerson = res.data.reporterPerson
          this.ruleForm.reporterPhone = res.data.reporterPhone
          this.ruleForm.trainContent = res.data.trainContent
          this.ruleForm.trainModes = res.data.trainModes
          this.ruleForm.trainObject = res.data.trainObject
          this.ruleForm.trainSubjects = res.data.trainSubjects
          this.ruleForm.enclosure = res.data.enclosure ? JSON.parse(res.data.enclosure) : []
          this.fileList = this.ruleForm.enclosure
        })
    }
  },
  methods: {
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
      const trainingSituationDto = {
        ...this.ruleForm,
        enclosure: JSON.stringify(this.fileList)
      }
      const res = this.ruleForm.id ? await updateTraining(trainingSituationDto) : await saveTrainingPlanning(trainingSituationDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
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
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
