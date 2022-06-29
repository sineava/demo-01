<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="节假日上报" />
      </span>
      <span v-if="type !== 'add'" class="detail-header-button">
        <el-button
          size="mini"
          type="primary"
          :disabled="detailForm.approvalStatus === 1 ? false : true"
          @click="handleReview(0, detailForm)"
        >
          <em class="el-icon-edit" /> 审核
        </el-button>
        <el-button
          size="mini"
          type="danger"
          :disabled="detailForm.approvalStatus === 1 || detailForm.approvalStatus === 2 ? false : true"
          @click="handleReback(0, detailForm)"
        >
          <em class="el-icon-delete" /> 退回
        </el-button>
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="140px"
        size="medium"
        class="table-column three"
        disabled
      >
        <template v-if="type !== 'add'">
          <el-form-item
            style="width: 100%;"
            label-width="0"
          >
            <div class="icon-title">
              <span class="span" />基础信息
            </div>
          </el-form-item>
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
            <el-descriptions-item label="统计单位：">
              {{ detailForm.departmentName }}
            </el-descriptions-item>
            <el-descriptions-item label="统计人：">
              {{ detailForm.statisticianName }}
            </el-descriptions-item>
            <el-descriptions-item label="统计日期：">
              {{ `${detailForm.holiday} ${detailForm.time}` }}
            </el-descriptions-item>
            <el-descriptions-item label="提交时间：">
              {{ detailForm.time }}
            </el-descriptions-item>
            <el-descriptions-item label="上报状态：">
              {{ ['未上报','正常上报','延期未上报','延期未上报','延期上报'][detailForm.importantStatus-1] }}
            </el-descriptions-item>
            <el-descriptions-item v-if="detailForm.approvalStatus!==0" label="审核状态:">
              {{ detailForm.approvalStatus ? field_approvalStatus.find(x => x.value === detailForm.approvalStatus).label : null }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <ShipTable
            ref="shiptable"
            title="添加长途信息"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        {{ type === 'add' ? '保存' : '重新上报' }}
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="操作确认"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <el-form
        ref="sureForm"
        :model="sureForm"
        size="medium"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <span>是否确定退回操作?</span>
        </el-form-item>
        <el-form-item
          label-width="0"
          prop="approvalRemark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="sureForm.approvalRemark"
            type="textarea"
            rows="6"
            placeholder="请输入退回原因"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { saveInfo, queryInfo, updateInfo } from '@/api/channel-services/period/report'
import { updateInfo as updateInfos} from '@/api/channel-services/period/period'
import { timePeriod } from '@/utils/public-fields'
import ShipTable from './components/ShipTable'
export default {
  components: {
    ShipTable
  },
  mixins: [timePeriod],
  data() {
    return {
      loading: false,
      ruleForm: {
        periodId: null // **节假日上报编号**
      },
      sureForm: {
        approvalRemark: '',
        id: null
      },
      dialogVisible:false,
      detailForm: {},
      rules: {
        year: [
          { required: true, message: '请选择年份', trigger: 'blur' }
        ],
        holiday: [
          { required: true, message: '请选择节日', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择节日时间范围', trigger: 'blur' }
        ],
        reportingStart: [
          { required: true, message: '请选择上报时段-起始日期', trigger: 'blur' }
        ],
        reportingEnd: [
          { required: true, message: '请选择上报时段-结束日期', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.ruleForm.periodId = id
    if (this.ruleForm.periodId) {
      this.fetchDetail()
    }
  },
  methods: {
    // 查询详情
    async fetchDetail() {
      queryInfo({ id: this.ruleForm.periodId }).then(res => {
        this.detailForm = { ...res.data }
        this.sureForm.id = this.detailForm.id
        this.$refs.shiptable.setTableData(res.data)
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    /**
     * 退回
     */
    handleReback(_, item) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.sureForm.resetFields()
        this.sureForm.id = item.id
      })
    },
    /**
     * 确认退回
     */
    handleSure() {
      const dto = {
        ...this.sureForm,
        approvalStatus: 3
      }
      updateInfos(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('退回成功!')
          this.dialogVisible = false
          this.fetchDetail()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 审核
     */
    handleReview(_, item) {
      this.$confirm('是否确定审核通过？', '操作确认').then(() => {
        updateInfos({
          approvalStatus: 2,
          id: item.id
        }).then(res => {
          if (res.code === '0') {
            this.$message.success('审核通过!')
            this.fetchData()
          }
        })
      }).catch()
    },
    // 保存
    async saveData() {
      this.loading = true
      const dto = this.$refs.shiptable.getTableData()
      dto.periodId = this.ruleForm.periodId
      const res = this.type === 'add' ? await saveInfo(dto) : await updateInfo(dto)
      if (res.code === '0') {
        this.returnBack()
      }
      this.loading = false
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/transport/approve' })
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
