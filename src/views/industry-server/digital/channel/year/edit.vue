<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑年度航道养护情况' : type === 'add' ? '新增年度航道养护情况' : '年度航道养护情况详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
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
          <el-descriptions-item
            v-if="type === 'add'"
            label="机构名称:"
          >
            {{ user_info.orgname }}
          </el-descriptions-item>
          <el-descriptions-item
            v-else
            label="所属管理部门:"
          >
            {{ ruleForm.enterpriseName }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="type === 'add'"
            label="统计人:"
          >
            {{ user_info.username }}
          </el-descriptions-item>
          <el-descriptions-item
            v-else
            label="统计人:"
          >
            {{ ruleForm.statisticianName }}
          </el-descriptions-item>
          <el-descriptions-item
            label="年份:"
          >
            {{ timeInfo }}
          </el-descriptions-item>
        </el-descriptions>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />年度航道养护情况
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <upload
            file
            :limit="1"
            :show-file-list="false"
            :file-list="currentFileList"
            payload="current"
            @fileSuccess="fileUploadSuccess"
          />
          <FileTable
            :show-download="type !== 'add'"
            :show-delete="type !== 'detail'"
            :table-data="currentFileList"
            payload="current"
            @handleDelete="handleDelete"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />下一年工作计划
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <upload
            file
            :limit="1"
            :show-file-list="false"
            :file-list="nextFileList"
            payload="next"
            @fileSuccess="fileUploadSuccess"
          />
          <FileTable
            :show-download="type !== 'add'"
            :show-delete="type !== 'detail'"
            :table-data="nextFileList"
            payload="next"
            @handleDelete="handleDelete"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium "
        @click="submitForm('ruleForm')"
      >
        上报
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
import { reportYear, getYearDetail } from '@/api/channel-services/channel/report-conclusion'
import { mapGetters } from 'vuex'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    return {
      type: '',
      timeInfo: '',
      currentFileList: [], // 年度航道养护情况
      nextFileList: [], // 下一年工作计划
      ruleForm: {
        id: null,
        maintenanceWorkFile: '', // 年度航道养护情况文件
        nextWorkPlanFile: '', // 下一年工作计划文件
        reportBasicId: null
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { reportBasicId, type, timeInfo } = this.$route.query
    this.ruleForm.reportBasicId = reportBasicId // *航道养护信息编号
    this.type = type
    this.timeInfo = timeInfo
    if (type !== 'add') this.fetchDetail(reportBasicId) // *id使用航道养护信息编号
  },
  methods: {
    // 查询详情
    async fetchDetail(reportBasicId) {
      getYearDetail({ id: reportBasicId }).then(res => {
        this.ruleForm = {
          ...res.data,
          maintenanceWorkFile: res.data.maintenanceWorkFile ? JSON.parse(res.data.maintenanceWorkFile) : '',
          nextWorkPlanFile: res.data.nextWorkPlanFile ? JSON.parse(res.data.nextWorkPlanFile) : ''
        }
        this.currentFileList = res.data.maintenanceWorkFile ? JSON.parse(res.data.maintenanceWorkFile) : ''
        this.nextFileList = res.data.nextWorkPlanFile ? JSON.parse(res.data.nextWorkPlanFile) : ''
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
    // 保存数据
    async saveData() {
      const dto = {
        ...this.ruleForm,
        maintenanceWorkFile: this.currentFileList ? JSON.stringify(this.currentFileList) : '',
        nextWorkPlanFile: this.nextFileList ? JSON.stringify(this.nextFileList) : ''
      }
      const res = await reportYear(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 文件上传成功
    fileUploadSuccess(file, payload) {
      let list = null
      if (payload === 'current') list = this.currentFileList
      if (payload === 'next') list = this.nextFileList
      list.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    handleDelete({ index, payload }) {
      let list = null
      if (payload === 'current') list = this.currentFileList
      if (payload === 'next') list = this.nextFileList
      list.splice(index, 1)
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
