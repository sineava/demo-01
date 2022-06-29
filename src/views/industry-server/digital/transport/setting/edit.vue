<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增节假日' : type === 'edit' ? '编辑节假日' : '节假日详情'" />
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
        :disabled="type === 'detail'"
      >
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />基础信息
          </div>
        </el-form-item>
        <el-form-item
          label="年份:"
          prop="year"
        >
          <el-date-picker
            v-model="ruleForm.year"
            :picker-options="yearPicker"
            value-format="yyyy"
            type="year"
            placeholder="请选择年份"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="节日:"
          prop="holiday"
        >
          <el-select
            v-model="ruleForm.holiday"
            clearable
            placeholder="请选择节日"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, index) in field_holiday"
              :key="index"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="节日时间范围:"
          prop="time"
        >
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            :picker-options="datePicker"
            range-separator="-"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="上报时段(起始):"
          prop="reportingStart"
        >
          <el-time-picker
            v-model="ruleForm.reportingStart"
            format="HH:mm"
            value-format="HH:mm"
            style="width: 100%;"
            placeholder="请选择上报时段(起始)"
          />
        </el-form-item>
        <el-form-item
          label="上报时段(结束):"
          prop="reportingEnd"
        >
          <el-time-picker
            v-model="ruleForm.reportingEnd"
            format="HH:mm"
            value-format="HH:mm"
            style="width: 100%;"
            placeholder="请选择上报时段(结束)"
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
import { timePeriod } from '@/utils/public-fields'
import { saveInfo, updateInfo } from '@/api/channel-services/period/set-important-time'
export default {
  mixins: [timePeriod],
  data() {
    return {
      loading: false,
      ruleForm: {
        id: null,
        year: null,
        holiday: '',
        time: '',
        reporting: ''
      },
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
      },
      yearPicker: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      datePicker: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  created() {
    const { id, type, item } = this.$route.query
    this.type = type
    if (id) {
      this.ruleForm = {
        id: item.id,
        year: `${item.year}`,
        holiday: item.holiday,
        time: [item.timeStart, item.timeEnd],
        reportingStart: typeof item.reportingStart==='object' ? item.reportingStart.join(':') : item.reportingStart,
        reportingEnd: typeof item.reportingEnd==='object' ? item.reportingEnd.join(':') : item.reportingEnd
      }
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
      this.loading = true
      const [timeStart, timeEnd] = this.ruleForm.time || ['', '']
      const reportingEnd = this.ruleForm.reportingEnd.split(':')
      const reportingStart = this.ruleForm.reportingStart.split(':')
      this.ruleForm.reportingEnd = reportingEnd[0]+':'+reportingEnd[1]
      this.ruleForm.reportingStart = reportingStart[0]+':'+reportingStart[1]
      const dto = {
        ...this.ruleForm,
        year: Number(this.ruleForm.year),
        timeStart,
        timeEnd
      }
      delete dto.reporting
      delete dto.time
      const res = this.ruleForm.id ? await updateInfo(dto) : await saveInfo(dto)
      if (res.code === '0') {
        this.returnBack()
      }
      this.loading = false
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/transport/setting' })
    }
  }
}
</script>
