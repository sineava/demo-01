<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="值守情况详情" />
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
          <el-input
            :value="user_info.orgname"
            disabled
            style="width: 400px;"
          />
        </el-form-item>
        <el-form-item
          label="值班时间:"
          prop="onDutyTime"
        >
           <el-input
            :value="`${ruleForm.onDutyStartTimePlan} ~ ${ruleForm.onDutyEndTimePlan}`"
            disabled
            style="width: 400px;"
          />
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
            title="添加值守人领导"
            :persons="ruleForm.persons"
            :options="options"
            :show-option="false"
          />
        </el-form-item>
      </el-form>
      <el-form
        ref="editForm"
        :model="editForm"
        class="table-column two"
        label-width="120px"
        disabled
      >
        <el-form-item
          label="值班开始时间:"
          prop="startTime"
        >
          <el-input
            :value="`${editForm.startTime}`"
            disabled
           />  
        </el-form-item>
        <el-form-item
          label="值班结束时间:"
          prop="endTime"
        >
          <el-input
            :value="`${editForm.endTime}`"
            disabled
           /> 
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />值班情况
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
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
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
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { mapGetters } from 'vuex'
import { inspectorList } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import { queryDetail } from '@/api/emergency-services/watch'
export default {
  components: {
    PersonGroupTable
  },
  data() {
    return {
      dialogVisible: false,
      personsList: [], // 人员列表
      ruleForm: {
        startDate: '',
        endDate: '',
        duty: '',
        detail: '',
        leaders: [], // 带班领导
        persons: [] // 值守人员
      },
      addForm: {
        personnelId: '',
        type: ''
      },
      editForm: {
        endTime: '',
        exceptionDetails: '',
        situation: '',
        startTime: ''
      },
      options: [ // 表头
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'mobilePhone', label: '联系电话',maxlength:11 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user_info',
      'token_str'
    ])
  },
  created() {
    this.fetchPersons()
    const { id } = this.$route.query
    if (id) this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          leaders: res.data.personList.filter(person => person.type === 1).map(({ phone, ...person }) => ({ ...person, mobilePhone: phone, saved: true })),
          persons: res.data.personList.filter(person => person.type === 2).map(({ phone, ...person }) => ({ ...person, mobilePhone: phone, saved: true })),
        }
        this.editForm = {
          endTime: res.data.onDutyEndTime,
          exceptionDetails: res.data.exceptionDetails,
          situation: res.data.situation,
          startTime: res.data.onDutyStartTime
        }
      })
    },
    // 查询人员列表
    async fetchPersons() {
      inspectorList({ tokenStr: this.token_str }).then(res => {
        this.personsList = res.data ? res.data : []
      })
    },
    // 返回
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
