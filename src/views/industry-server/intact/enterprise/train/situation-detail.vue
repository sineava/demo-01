<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="培训情况详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />培训情况
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
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="培训计划名称:">
          {{ (options.find(x => x.value === ruleForm.planningId) || {}).label }}
        </el-descriptions-item>
        <el-descriptions-item label="培训科目:">
          {{ ruleForm.trainSubjects }}
        </el-descriptions-item>
        <el-descriptions-item label="培训方式:">
          {{ ruleForm.trainModes }}
        </el-descriptions-item>
        <el-descriptions-item label="组织人:">
          {{ ruleForm.organizerPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="开始培训时间:">
          {{ ruleForm.trainTime }}
        </el-descriptions-item>
        <el-descriptions-item label="培训学时:">
          {{ ruleForm.trainStudyHours }}
        </el-descriptions-item>
        <el-descriptions-item label="培训对象:">
          {{ ruleForm.trainObject }}
        </el-descriptions-item>
        <el-descriptions-item label="培训人数:">
          {{ ruleForm.personNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人:">
          {{ ruleForm.filledBy }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人联系电话:">
          {{ ruleForm.contactNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="填报时间:">
          {{ ruleForm.fillingTime }}
        </el-descriptions-item>
        <el-descriptions-item label="培训详情:" :span="3">
          {{ ruleForm.content }}
        </el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">
          {{ ruleForm.remark }}
        </el-descriptions-item>
        <el-descriptions-item label="培训情况图片(最多2张):" :span="3">
          <div
            style="display: flex; flex-wrap: wrap;"
          >
            <Images
              v-for="({ url }, idx) in imgList"
              :key="idx"
              :ref="`images${idx}`"
              height="100px"
              style="margin: 10px 10px 0 0;"
              fit="cover"
              :url="url"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          v-if="type !== 'detail'"
          label="上传附件:"
          prop="enclosure"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            multiple
            :limit="5"
            @fileSuccess="fileUploadSuccess"
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
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { getTrainingPlanningLikePlanName } from '@/api/general-services/educateTrain/educatePlan'
import { trainingSituationQuery, trainingSituationSave, updateSituation } from '@/api/general-services/educateTrain/educationSituation'
import Images from '@/components/images'
export default {
  components: {
    upload,
    FileTable,
    Images
  },
  data() {
    return {
      options: [],
      loading: false,
      fileList: [],
      imgList: [],
      type: '',
      ruleForm: {
        contactNumber: '',
        content: '',
        enclosure: '',
        fillingTime: '',
        filledBy: '',
        id: 0,
        organizerPerson: '',
        personNumber: undefined,
        planningId: '',
        remark: '',
        trainSubjects: '',
        trainModes: '',
        trainObject: '',
        trainStudyHours: undefined,
        trainTime: '',
        trainingPicture: '',
        enterpriseName: ''
      }
    }
  },
  mounted() {
    this.searchPlanList('')
    if (this.$route.query) {
      this.type = this.$route.query.type
      const id = this.$route.query.id
      if (id !== 0) {
        trainingSituationQuery({ id })
          .then(res => {
            if (!res.data) return
            const {
              contactNumber,
              content,
              fillingTime,
              filledBy,
              id,
              organizerPerson,
              personNumber,
              planningId,
              trainModes,
              trainObject,
              trainStudyHours,
              trainSubjects,
              trainTime,
              enclosure,
              remark,
              trainingPicture,
              enterpriseName
            } = res.data
            this.ruleForm = {
              contactNumber,
              content,
              fillingTime: fillingTime.replace('T', ' '),
              filledBy,
              id,
              organizerPerson,
              personNumber,
              planningId,
              trainModes,
              trainObject,
              trainStudyHours,
              trainSubjects,
              trainTime: trainTime.replace('T', ' '),
              enclosure: enclosure ? JSON.parse(enclosure) : [],
              remark,
              trainingPicture: trainingPicture ? JSON.parse(trainingPicture) : [],
              enterpriseName
            }
            this.imgList = this.ruleForm.trainingPicture
            this.fileList = this.ruleForm.enclosure
          })
      }
    }
  },
  methods: {
    // 图片上传成功时的钩子
    imgUploadSuccess(res) {
      this.imgList.push({ url: res.data })
    },
    // 文件列表移除文件时的钩子
    imgUploadRemove(file) {
      this.imgList.forEach((item, index) => {
        if (item === file.response.data) {
          this.ruleForm.certificateImg.splice(index, 1)
        }
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
      const trainingSituationDto = {
        ...this.ruleForm,
        trainTime: momentDate(this.ruleForm.trainTime),
        fillingTime: momentDate(this.ruleForm.fillingTime),
        trainingPicture: JSON.stringify(this.imgList),
        enclosure: JSON.stringify(this.fileList)
      }
      const res = this.ruleForm.id ? await updateSituation(trainingSituationDto) : await trainingSituationSave(trainingSituationDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 模糊查询计划列表
    searchPlanList(val) {
      this.loading = true
      this.options = []
      getTrainingPlanningLikePlanName({ planName: val }).then(res => {
        res.data.forEach(({ planningName, id, trainSubjects }) => {
          this.options.push({
            label: planningName,
            value: id,
            trainSubjects
          })
        })
        this.loading = false
      })
    },
    // 下拉框改变
    handleChange(val) {
      if (!val) {
        this.ruleForm.trainSubjects = ''
      } else {
        this.options.forEach(option => {
          if (option.value === val) {
            this.ruleForm.trainSubjects = option.trainSubjects
          }
        })
      }
    },
    // 文件上传成功
    fileUploadSuccess(file) {
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
