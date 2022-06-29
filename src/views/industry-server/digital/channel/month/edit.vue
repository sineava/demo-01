<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑航道养护月报' : type === 'add' ? '新增航道养护月报' : '航道养护月报详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
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
          <el-descriptions-item label="机构名称：">
            {{ type === 'add' ? user_info.orgname : ruleForm.enterpriseName }}
          </el-descriptions-item>
          <el-descriptions-item label="统计人：">
            {{ type === 'add' ? user_info.username : ruleForm.statisticianName }}
          </el-descriptions-item>
          <el-descriptions-item label="月份：">
            {{ timeInfo }}
          </el-descriptions-item>
        </el-descriptions>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />重庆市内河航道维护工程月报表
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <River
            ref="river"
            :show-add="type !== 'detail'"
            :show-option="type !== 'detail'"
            :payload="type"
            :dataTable="maintenanceMontyInfoVos"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />重庆市内河航道维护工程经费使用月报表
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <Fund
            ref="fund"
            :show-add="type !== 'detail'"
            :show-option="type !== 'detail'"
            :payload="type"
            :dataTable="expenditureMontyInfoVos"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />月报附件
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            multiple
            :limit="5"
            @fileSuccess="success"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <FileTable
            :show-download="type !== 'add'"
            :show-delete="type !== 'detail'"
            :table-data="fileList"
            @handleDelete="remove"
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
import upload from '@/components/upload'
import River from './components/River'
import Fund from './components/Fund'
import FileTable from '@/components/features/FileTable'
import { momentDate } from '@/utils/index'
import { reportMonth, getMonthDetail } from '@/api/channel-services/channel/report-conclusion'
import { mapGetters } from 'vuex'
export default {
  components: {
    upload,
    River,
    Fund,
    FileTable
  },
  data() {
    return {
      type: '',
      timeInfo: '',
      fileList: [],
      expenditureMontyInfoVos:[],
      maintenanceMontyInfoVos:[],
      ruleForm: {
        reportBasicId: '',
        importantFile: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id, type, timeInfo } = this.$route.query
    this.ruleForm.reportBasicId = id
    this.type = type
    this.timeInfo = timeInfo
    if (type !== 'add') this.fetchDetail()
  },
  methods: {
    // 查询详情
    async fetchDetail() {
      getMonthDetail({ id: this.ruleForm.reportBasicId }).then(res => {
        this.ruleForm = {
          ...res.data,
          maintenanceWorkFile: res.data.maintenanceWorkFile ? JSON.parse(res.data.maintenanceWorkFile) : [],
          nextWorkPlanFile: res.data.nextWorkPlanFile ? JSON.parse(res.data.nextWorkPlanFile) : []
        }
        this.currentFileList = res.data.maintenanceWorkFile ? JSON.parse(res.data.maintenanceWorkFile) : []
        this.nextFileList = res.data.nextWorkPlanFile ? JSON.parse(res.data.nextWorkPlanFile) : []
        this.expenditureMontyInfoVos = res.data.expenditureMontyInfoVos || []
        this.maintenanceMontyInfoVos = res.data.maintenanceMontyInfoVos || []
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      let flag = false
      const maintenanceMontyInfoDtoList = this.$refs.river.getTableData().map(({ saved, ...x }) => {
        if (!saved) flag = true
        return x
      })
      if (flag) {
        this.$message.warning('内河航道维护工程月报表存在未保存数据,请保存后再提交!')
        return
      }
      const expenditureMontyInfoDtoList = this.$refs.fund.getTableData()
      const dto = {
        ...this.ruleForm,
        importantFile: this.fileList.length ? JSON.stringify(this.fileList) : '',
        maintenanceMontyInfoDtoList,
        expenditureMontyInfoDtoList,
      }
      const res = await reportMonth(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 文件上传成功hook
    success(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    remove({ index }) {
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
