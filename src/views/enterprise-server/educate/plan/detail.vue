<template>
  <el-card class="body-card plan">
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
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-position="top"
        size="medium"
        :disabled="type === 'detail'"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="企业名称:"
              prop="enterpriseName"
            >
              <el-input
                v-model="enterpriseName"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="培训计划名称:"
              prop="planningName"
            >
              <el-input
                v-model="ruleForm.planningName"
                maxlength="100"
                placeholder="请输入培训计划名称"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="培训科目:"
              prop="trainSubjects"
            >
              <el-input
                v-model="ruleForm.trainSubjects"
                maxlength="100"
                placeholder="请输入培训科目"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="培训方式:"
              prop="trainModes"
            >
              <el-input
                v-model="ruleForm.trainModes"
                maxlength="100"
                placeholder="请输入培训方式"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="培训对象:"
              prop="trainObject"
            >
              <el-input
                v-model="ruleForm.trainObject"
                maxlength="100"
                placeholder="请输入培训对象"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="组织人:"
              prop="organizerPerson"
            >
              <el-input
                v-model="ruleForm.organizerPerson"
                maxlength="30"
                placeholder="请输入组织人"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="计划开始培训时间:"
              prop="planningTime"
            >
              <el-date-picker
                v-model="ruleForm.planningTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="请选择计划开始培训时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="填报人:"
              prop="reporterPerson"
            >
              <el-input
                v-model="ruleForm.reporterPerson"
                maxlength="30"
                placeholder="请选择填报人"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="填报人联系电话:"
              prop="reporterPhone"
            >
              <el-input
                v-model="ruleForm.reporterPhone"
                maxlength="11"
                placeholder="请输入填报人联系电话"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="填报时间:"
              prop="reportedTime"
            >
              <el-date-picker
                v-model="ruleForm.reportedTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择填报时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="培训内容:"
              prop="trainContent"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.trainContent"
                type="textarea"
                rows="6"
                placeholder="请输入培训内容"
                style="width: 100%;"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="备注:"
              prop="remark"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.remark"
                type="textarea"
                rows="6"
                placeholder="请输入备注"
                style="width: 100%;"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
                :limit="5"
                @fileSuccess="uploadSuccess"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
import { telephone, zh } from '@/utils/validate'
import {
  saveTrainingPlanning,
  getTrainingPlanningById,
  updateTraining
} from '@/api/general-services/educateTrain/educatePlan'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
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
      fileList: [], // 文件列表
      rules: {
        planningName: [
          { required: true, message: '请输入培训计划名称', trigger: 'blur' }
        ],
        trainSubjects: [
          { required: true, message: '请输入培训科目', trigger: 'blur' }
        ],
        trainModes: [
          { required: true, message: '请输入培训方式', trigger: 'blur' }
        ],
        trainObject: [
          { required: true, message: '请输入培训对象', trigger: 'blur' },
          { validator: zh }
        ],
        organizerPerson: [
          { required: true, message: '请输入组织人', trigger: 'blur' },
          { validator: zh }
        ],
        planningTime: [
          { required: true, message: '请选择计划开始时间', trigger: 'blur' }
        ],
        reporterPerson: [
          { required: true, message: '请输入填报人', trigger: 'blur' },
          { validator: zh }
        ],
        reporterPhone: [
          { required: true, message: '请输入填报人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        reportedTime: [
          { required: true, message: '请选择填报时间', trigger: 'blur' }
        ],
        trainContent: [
          { required: true, message: '请输入培训内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 查询关联企业信息
    findByUserId().then(res => {
      this.enterpriseName = res.data ? res.data.enterpriseName : ''
    })
    const { id, type } = this.$route.query
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
      this.$router.push({ path: '/educate/plan' })
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
