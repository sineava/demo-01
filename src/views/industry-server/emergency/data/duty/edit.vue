<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="填写值守情况" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        class="table-column one"
        label-width="120px"
        disabled
      >
        <el-form-item label="所属单位:">
          {{ user_info.orgname }}
        </el-form-item>
        <el-form-item
          label="值班时间:"
          prop="onDutyTime"
        >
          {{ ruleForm.onDutyStartTimePlan }}  至  {{ ruleForm.onDutyEndTimePlan }}
        </el-form-item>
        <el-form-item
          label="带班领导:"
          style="width: 100%;"
          prop="leaders"
        >
          <PersonGroupTable
            title="添加带班领导"
            :persons="ruleForm.leaders"
            :options="options"
            :show-option="false"
          />
        </el-form-item>
        <el-form-item
          label="值守人姓名:"
          style="width: 100%;"
          prop="persons"
        >
          <PersonGroupTable
            title="添加值守人"
            :persons="ruleForm.persons"
            :options="options"
            :show-option="false"
          />
        </el-form-item>
      </el-form>
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        class="table-column"
        label-width="120px"
      >
        <el-form-item
          label="接班时间:"
          prop="onDutyTime"
          style="width: 100%;"
        >
          <el-date-picker
            v-model="editForm.onDutyTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['09:00:00', '09:00:00']"
          />
        </el-form-item>
        <el-form-item
          label="接班人:"
          style="width: 100%;"
          prop="successor"
        >
          <el-input
            v-model.trim="editForm.successor"
            placeholder="请输入接班人"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" /><span style="color:red;margin: 0 4px;padding-top:2px">*</span>值班情况
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
          prop="situation"
        >
          <el-input
            v-model.trim="editForm.situation"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入值班情况"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />异常详细情况
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="editForm.exceptionDetails"
            type="textarea"
            rows="6"
            placeholder="请输入异常详细情况"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm"
      >
        提交
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
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { mapGetters } from 'vuex'
import { queryDetail, updateInfo } from '@/api/emergency-services/watch'
export default {
  components: {
    PersonGroupTable
  },
  data() {
    return {
      dialogVisible: false,
      personsList: [], // 人员列表
      loading:false,
      ruleForm: {},
      editForm: {
        endTime: '',
        exceptionDetails: '',
        situation: '',
        startTime: '',
        successor: ''
      },
      options: [ // 表头
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'mobilePhone', label: '联系电话',maxlength:11 }
      ],
      rules: {
        successor:[
          { required: true, message: '请输入接班人', trigger: 'blur' }
        ],
        onDutyTime: [
          { required: true, message: '请选择接班时间', trigger: 'blur' }
        ],
        situation: [
          { required: true, message: '请输入值班情况', trigger: 'blur' }
        ],
        exceptionDetails: [
          { required: true, message: '请输入异常详细情况', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info',
      'token_str'
    ])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          leaders: res.data.personList.filter(person => person.type === 1).map(({ phone, ...person }) => ({ ...person, mobilePhone: phone, saved: true })),
          persons: res.data.personList.filter(person => person.type === 2).map(({ phone, ...person }) => ({ ...person, mobilePhone: phone, saved: true }))
        }
        this.editForm = {
          exceptionDetails: res.data.exceptionDetails || '',
          onDutyTime: res.data.onDutyEndTimePlan && res.data.onDutyEndTime ? [res.data.onDutyEndTimePlan,res.data.onDutyEndTime] : [],
          situation:  res.data.situation || '',
          successor: res.data.successor || '',
        }
      })
    },
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (!valid) return false
        this.saveData()
      })
    },
    async saveData() {
      this.loading = true
      // *这个时间不需要格式化
      const dto = {
        id: this.ruleForm.id,
        onDutyEndTime: momentDate(this.editForm.onDutyTime[1], 'YYYY-MM-DD HH:mm:ss'),
        onDutyStartTime: momentDate(this.editForm.onDutyTime[0], 'YYYY-MM-DD HH:mm:ss'),
        successor:this.editForm.successor,
        situation:this.editForm.situation,
        exceptionDetails:this.editForm.exceptionDetails
      }
      updateInfo(dto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
      this.loading = true
    },
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select-dropdown__list {
    max-height: 210px;
}
</style>
