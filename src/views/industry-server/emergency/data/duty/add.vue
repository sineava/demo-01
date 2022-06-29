<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="新增应急值守信息" />
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
        class="table-column one"
        label-width="120px"
      >
        <el-form-item label="所属单位:">
          {{ user_info.orgname }}
        </el-form-item>
        <el-form-item
          label="值班时间:"
          prop="onDutyTime"
        >
          <el-date-picker
            v-model="ruleForm.onDutyTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['09:00:00', '09:00:00']"
          />
        </el-form-item>
        <el-form-item
          label="带班领导:"
          style="width: 100%;"
          prop="leaders"
        >
          <PersonGroupTable
            title="添加带班领导"
            :show-add="ruleForm.leaders.length>0?false:true"
            only-delete
            :persons="ruleForm.leaders"
            :options="options"
            :show-option="false"
            emits="removeLeaders"
            @handleAddPerson="add('leader')"
            @removeLeaders="removeLeaders"
          />
        </el-form-item>
        <el-form-item
          label="值守人姓名:"
          style="width: 100%;"
          prop="persons"
        >
          <PersonGroupTable
            title="添加值守人"
            show-add
            only-delete
            :persons="ruleForm.persons"
            :options="options"
            :show-option="false"
            emits="removePerson"
            @handleAddPerson="add('person')"
            @removePerson="removePerson"
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="人员列表"
      width="600px"
      height="600px"
      @close="dialogClose"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addRules"
        label-width="100px"
        size="medium"
        class="setting-form add-form"
      >
        <el-form-item
          label="人员姓名:"
          prop="personnelId"
        >
          <el-select
            v-model="addForm.personnelId"
            clearable
            style="width: 90%;"
            filterable
          >
            <el-option
              v-for="(item,index) in personsList"
              :key="index"
              :label="item.name"
              :value="item.personnelId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleAdd('addForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { mapGetters } from 'vuex'
import { inspectorList } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import { saveEntity,queryDetail,putEntity } from '@/api/emergency-services/watch'
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
        onDutyTime:[],
        endDate: '',
        duty: '',
        detail: '',
        leaders: [], // 带班领导
        persons: [] // 值守人员
      },
      date:[],
      loading:false,
      addForm: {
        personnelId: '',
        type: ''
      },
      options: [ // 表头
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'mobilePhone', label: '联系电话',maxlength:11 }
      ],
      rules: {
        onDutyTime: [
          { required: true, message: '请选择值班时间', trigger: 'blur' }
        ],
        leaders: [
          { required: true, message: '请选择带班领导', trigger: 'blur' }
        ],
        persons: [
          { required: true, message: '请选择值守人员', trigger: 'blur' }
        ]
      },
      addRules: {
        personnelId: [
          { required: true, message: '请选择人员', trigger: 'blur' }
        ]
      },
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
        const pAndL = this.getLeadersAndPersons(res.data?.personList)
        this.ruleForm = {
          ...res.data,
          leaders: pAndL[0],
          persons: pAndL[1],
          onDutyTime:[res.data.onDutyStartTimePlan,res.data.onDutyEndTimePlan]
        }
        this.editForm = {
          endTime: res.data.endTime,
          exceptionDetails: res.data.exceptionDetails,
          onDutyTime: res.data.onDutyStartTime && res.data.onDutyEndTime ? [res.data.onDutyStartTime,res.data.onDutyEndTime] : [],
          situation: res.data.situation,
          startTime: res.data.startTime
        }
      })
    },
    getLeadersAndPersons(personList){
      let leaders = []
      let persons = []
      if (personList){
        personList.forEach(element => {
          let item = {
            mobilePhone:element.phone,
            name:element.name,
            type:element.type,
            personnelId:element.personId,
            saved:true
          }
          if (element.type===1){
            leaders.push(item)
          } else {
            persons.push(item)
          }
        })
      }
      return [leaders,persons]
    },
    // 查询人员列表
    async fetchPersons() {
      inspectorList({ tokenStr: this.token_str }).then(res => {
        this.personsList = res.data ? this.unique(res.data) : []
      })
    },
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.personnelId) && res.set(arr.personnelId, 1))
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
        if (!valid) return false
        const personnelId = this.addForm.personnelId
        const current = this.personsList.find(person => person.personnelId === personnelId)
        const type = this.addForm.type
        if (type === 'leader') this.ruleForm.leaders.push({ ...current, saved: true, type: 1 })
        if (type === 'person') this.ruleForm.persons.push({ ...current, saved: true, type: 2 })
        this.dialogVisible = false
      })
    },
    // 移除人员
    removePerson(index,item) {
      this.ruleForm.persons.splice(index, 1)
    },
    // 移除领导
    removeLeaders(index,item){
      this.ruleForm.leaders.splice(index, 1)
    },
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      this.loading = true
      const personList = [...this.ruleForm.leaders, ...this.ruleForm.persons].map(person => ({
        name: person.name,
        personId: person.personnelId,
        phone: person.mobilePhone,
        type: person.type
      }))
      const dto = {
        id:this.ruleForm.id || '',
        onDutyEndTimePlan: momentDate(this.ruleForm.onDutyTime[1], 'YYYY-MM-DD HH:mm:ss'),
        onDutyStartTimePlan: momentDate(this.ruleForm.onDutyTime[0], 'YYYY-MM-DD HH:mm:ss'),
        personList: personList
      }
      this.loading = false
      let res = dto.id ? await putEntity(dto) : await saveEntity(dto)
      if (res.code === '0') {
        this.returnBack()
      } else {
        this.$message.error(res.message)
      }
      this.loading = false
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
