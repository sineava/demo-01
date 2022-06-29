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
          {{ user_info.orgname }}
        </el-form-item>
        <el-form-item
          label="值班时间:"
        >
          {{ `${ruleForm.onDutyTime.length>0 ? ruleForm.onDutyTime[0] : ''} ${ruleForm.onDutyTime.length>0 ? '至' : ''} ${ruleForm.onDutyTime.length>0 ? ruleForm.onDutyTime[1] : ''}` }}
        </el-form-item>
        <el-form-item
          label="带班领导:"
          style="width: 100%;"
        >
          <PersonGroupTable
            title="添加带班领导"
            :persons="ruleForm.leaders"
            :options="options"
            :show-option="false"
            :show-add="type === 'add'"
            :only-delete="type === 'add'"
            @handleAddPerson="add('leader')"
            @removePerson="removePerson('leader')"
          />
        </el-form-item>
        <el-form-item
          label="值守人姓名:"
          style="width: 100%;"
        >
          <PersonGroupTable
            title="添加值守人领导"
            :persons="ruleForm.persons"
            :options="options"
            :show-option="false"
            :show-add="type === 'add'"
            :only-delete="type === 'add'"
            @handleAddPerson="add('person')"
            @removePerson="removePerson('person')"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-if="type !== 'add'"
        ref="editForm"
        :model="editForm"
        class="table-column two"
        label-width="120px"
        disabled
      >
        <el-form-item
          label="接班时间:"
        >
          {{ `${editForm.onDutyTime.length>0 ? editForm.onDutyTime[0] : ''} ${editForm.onDutyTime.length>0 ? '至' : ''} ${editForm.onDutyTime.length>0 ? editForm.onDutyTime[1] : ''}` }}
        </el-form-item>
        <el-form-item
          label="接班人:"
        >
          {{ editForm.successor }}
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
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
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
import { inspectorList } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import { saveEntity, queryDetail, updateInfo } from '@/api/emergency-services/watch'
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
        onDutyTime: '',
        leaders: [], // 带班领导
        persons: [] // 值守人员
      },
      editForm: {
        endTime: '',
        exceptionDetails: '',
        situation: '',
        startTime: '',
        onDutyTime: ''
      },
      startPicker: {
        disabledDate: time => {
          if (this.editForm.endTime) {
            return time.getTime() > this.editForm.editForm.getTime()
          }
        }
      },
      endPicker: {
        disabledDate: time => {
          if (this.editForm.startTime) {
            return time.getTime() < this.editForm.startTime.getTime()
          }
        }
      },
      options: [ // 表头
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'mobilePhone', label: '联系电话',maxlength:11 }
      ],
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
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
    this.fetchPersons()
    const { id, type } = this.$route.query
    this.type = type
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
          onDutyTime:[res.data?.onDutyStartTimePlan,res.data?.onDutyEndTimePlan]
        }
        if (['detail', 'edit'].includes(this.type)) {
          this.editForm = {
            ...this.ruleForm
          }
        }
      })
    },
    // 查询人员列表
    async fetchPersons() {
      inspectorList({ tokenStr: this.token_str }).then(res => {
        this.personsList = res.data ? res.data : []
      })
    },
    // 关闭dialog
    dialogClose() {
      this.dialogVisible = false
    },
    // 添加带班人员
    add(type) {
      this.addForm = {
        personnelId: '',
        type: type
      }
      this.dialogVisible = true
    },
    // 添加人员
    handleAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const personnelId = this.addForm.personnelId
          const current = this.personsList.find(person => person.personnelId === personnelId)
          const type = this.addForm.type
          if (type === 'leader') this.ruleForm.leaders.push({ ...current, saved: true, type: 1 })
          if (type === 'person') this.ruleForm.persons.push({ ...current, saved: true, type: 2 })
          this.dialogVisible = false
        } else {

          return false
        }
      })
    },
    // 移除人员
    removePerson({ index }) {
      const type = this.addForm.type
      if (type === 'leader') this.ruleForm.leaders.splice(index, 1)
      if (type === 'person') this.ruleForm.persons.splice(index, 1)
    },
    // 提交
    submitForm() {
      let ruleValid = false
      let editValid = false
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        ruleValid = true
      })
      this.$refs.editForm.validate((valid) => {
        if (!valid) return false
        editValid = true
      })
      if (ruleValid && editValid) {
        this.saveData()
      }
    },
    // 保存数据
    async saveData() {
      if (this.type === 'add') { // 填写值守人员
        const personList = [...this.ruleForm.leaders, ...this.ruleForm.persons].map(person => ({
          name: person.name,
          personId: person.personnelId,
          phone: person.mobilePhone,
          type: person.type
        }))
        const dto = {
          onDutyTime: momentDate(this.ruleForm.onDutyTime),
          personList: personList
        }
        saveEntity(dto).then(res => {
          if (res.code === '0') {
            this.returnBack()
          }
        })
      } else {
        const dto = {
          ...this.editForm,
          id: this.ruleForm.id,
          startTime: momentDate(this.editForm.startTime),
          endTime: momentDate(this.editForm.endTime)
        }
        updateInfo(dto).then(res => {
          if (res.code === '0') {
            this.returnBack()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select-dropdown__list {
    max-height: 210px;
}
</style>
