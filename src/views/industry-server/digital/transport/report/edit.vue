<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增节假日上报' : type === 'edit' ? '编辑节假日上报' : '节假日上报详情'" />
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
      >
        <template>
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
              {{ detailForm.statisticianName || user.name }}
            </el-descriptions-item>
            <el-descriptions-item label="统计日期：">
              {{ `${detailForm.holiday} ${detailForm.time}` }}
            </el-descriptions-item>
            <el-descriptions-item v-if="detailForm.approvalStatus!==0" label="提交时间：">
              {{ detailForm.time }}
            </el-descriptions-item>
            <el-descriptions-item label="上报状态：">
              {{ ['未上报','正常上报','延期未上报','延期上报'][detailForm.importantStatus-1] }}
            </el-descriptions-item>
            <el-descriptions-item v-if="detailForm.approvalStatus!==0" label="审核状态:">
              {{ ['','未审核','审核通过','已退回'][detailForm.approvalStatus] }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />长途信息
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <ShipTable
            ref="shiptable"
            title="添加长途信息"
            :type="type"
            @isSubmit="isSubmit"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        :type="submit?'info':'primary'"
        size="medium"
        :disabled="submit?true:false"
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
  </el-card>
</template>

<script>
import { saveInfo, queryInfo, updateInfo } from '@/api/channel-services/period/report'
import { timePeriod } from '@/utils/public-fields'
import ShipTable from './components/ShipTable'
import { mapState } from 'vuex'
export default {
  components: {
    ShipTable
  },
  mixins: [timePeriod],
  data() {
    return {
      loading: false,
      submit:false,
      ruleForm: {
        periodId: null // **节假日上报编号**
      },
      detailForm: {},
      type: '',
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
  computed: {
    ...mapState(['user'])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.ruleForm.periodId = id
    this.fetchDetail()
  },
  methods: {
    // 查询详情
    async fetchDetail() {
      queryInfo({ id: this.ruleForm.periodId }).then(res => {
        this.detailForm = { ...res.data }
        this.$refs.shiptable.setTableData(res.data)
      })
    },
    isSubmit(isSubmit){
      this.submit = isSubmit
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
      this.$router.push({ path: '/digital/transport/report' })
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
