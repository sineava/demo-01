<template>
  <div>
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>应急响应
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <div class="basic-detail">
      <div v-if="tabType === 'add'" class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="searchForm"
        :model="searchForm"
      >
        <template v-if="tabType === 'add'">
          <el-descriptions
            class="descriptions"
            :column="2"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
          >
          <el-descriptions-item>
            <template slot="label">预案类型:</template>
            <el-form-item v-if="isEdit" prop="type">
              <el-select
                v-model="searchForm.type"
                clearable
                placeholder="请选择"
                style="width: 100%;"
                @change="searchPlan"
              >
                <el-option
                  v-for="item in field_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ searchForm.type }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">预案级别:</template>
            <el-form-item v-if="isEdit" prop="responseLevel">
              <el-select
                v-model="searchForm.responseLevel"
                clearable
                placeholder="请选择"
                style="width: 100%;"
                @change="searchPlan"
              >
                <el-option
                  v-for="item in field_responseLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ searchForm.responseLevel }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <div class="icon-title">
          <span class="span" />应急预案：根据预案类型与预案级别为您选出以下预案
        </div>
        <el-table
            v-loading="loading"
            :data="planList"
            element-loading-text="Loading"
            stripe
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column label="预案名称">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="预案类型">
              <template>
                {{ searchForm.type && field_type.find(item => (item.value === searchForm.type)).label }}
              </template>
            </el-table-column>
            <el-table-column label="响应级别">
              <template>
                {{ searchForm.responseLevel && field_responseLevel.find(item => (item.value === searchForm.responseLevel)).label }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  size="small"
                  plain
                  @click="handleSelect(scope.$index, scope.row)"
                >
                  <em class="el-icon-info" /> 选择
                </el-button>
                <el-button
                  size="small"
                  plain
                  @click="$router.push({ path: '/emergency/data/planDetail', query: { id: scope.row.id }})"
                >
                  <em class="el-icon-info" /> 详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="icon-title" style="margin: 20px 0 0 0;">
          <span class="span" /><i v-if="isEdit" style="margin: 0 20px 0 0;" class="required" /> 应急组织安排
        </div>
        <div class="h1">应急指挥组</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加应急指挥组"
          payload="emergencyCommandGroup"
          :persons="ruleForm.emergencyCommandGroup"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">现场指挥部</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加现场指挥部"
          payload="fieldCommand"
          :persons="ruleForm.fieldCommand"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">通讯组</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加通讯组"
          payload="communications"
          :persons="ruleForm.communications"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">后勤保障部</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加后勤保障部"
          payload="logisticsDepartment"
          :persons="ruleForm.logisticsDepartment"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">技术专家组</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加技术专家组"
          payload="technicalExpertGroup"
          :persons="ruleForm.technicalExpertGroup"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">资料收集组</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加资料收集组"
          payload="dataCollection"
          :persons="ruleForm.dataCollection"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
        <div class="h1">宣传组</div>
        <PersonGroupTable
          :show-add="tabType === 'add'"
          :show-option="tabType === 'add'"
          title="添加宣传组"
          payload="propagandaTeam"
          :persons="ruleForm.propagandaTeam"
          :options="options"
          @handleAddPerson="add"
          @removePerson="remove"
          @editPerson="edit"
          @savePerson="save"
        />
      </el-form>
      <div class="backstage-edit-btn">
        <el-button
          v-if="tabType !== 'detail'"
          type="primary"
          size="medium "
          :loading="svaeloading"
          @click="submitForm"
        >
          修改应急响应
        </el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { emergencyPlan } from '@/utils/public-fields'
import { typeSelection, personsFromResponse, reloadPersons, personsFromDisposal } from '@/api/emergency-services/disposal-respons'
export default {
  components: {
    PersonGroupTable
  },
  mixins: [emergencyPlan],
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      disposalId: null, // *应急响应编号
      loading: false,
      svaeloading:false,
      searchForm: {
        type: '',
        responseLevel: ''
      },
      ruleForm: {
        emergencyCommandGroup: [],
        fieldCommand: [],
        communications: [],
        logisticsDepartment: [],
        technicalExpertGroup: [],
        dataCollection: [],
        propagandaTeam: []
      },
      planList: [], // 预案列表
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '姓名',maxlength:20 },
        { id: 2, value: 'departmentName', label: '所属部门',maxlength:100 },
        { id: 3, value: 'job', label: '职务',maxlength:50 },
        { id: 4, value: 'phone', label: '手机',maxlength:11 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    this.isEdit = this.tabType === 'add' ? true : false
    this.disposalId = this.id
    this.fetchRespPerson()
  },
  methods: {
    // 查询应急响应人员
    async fetchRespPerson() {
      const personList = await personsFromDisposal({ disposalId: this.disposalId }).then(res => res.data)
      this.wrapperPersons(personList)
    },
    // 查询预案
    async searchPlan() {
      const { type, responseLevel } = this.searchForm
      if (type && responseLevel) {
        this.loading = true
        const res = await typeSelection({ type,responseLevel,enterpriseId: Number(this.user_info.orgcode)})
        this.planList = res.data
        this.loading = false
      }
    },
    // 选择预案
    async handleSelect(_, item) {
      const personList = await personsFromResponse({ responseId: item.id }).then(res => res.data)
      this.wrapperPersons(personList)
    },
    // 组装人员数据
    wrapperPersons(personList = []) {
      personList.forEach(person => {
        if (person.type === 1) {
          this.ruleForm.emergencyCommandGroup.push(person)
        }
        if (person.type === 2) {
          this.ruleForm.fieldCommand.push({ ...person, saved: true })
        }
        if (person.type === 3) {
          this.ruleForm.communications.push({ ...person, saved: true })
        }
        if (person.type === 4) {
          this.ruleForm.logisticsDepartment.push({ ...person, saved: true })
        }
        if (person.type === 5) {
          this.ruleForm.technicalExpertGroup.push({ ...person, saved: true })
        }
        if (person.type === 6) {
          this.ruleForm.dataCollection.push({ ...person, saved: true })
        }
        if (person.type === 7) {
          this.ruleForm.propagandaTeam.push({ ...person, saved: true })
        }
      })
    },
    // 添加人员
    add({ payload }) {
      this.changeQuote(payload).push({
        name: '',
        departmentName: '',
        job: '',
        phone: '',
        saved: false
      })
    },
    // 编辑人员
    edit({ payload, index }) {
      this.changeQuote(payload)[index].saved = false
    },
    // 保存人员
    save({ payload, index }) {
      this.changeQuote(payload)[index].saved = true
    },
    // 移除人员
    remove({ payload, index }) {
      this.changeQuote(payload).splice(index, 1)
    },
    // 引用改变
    changeQuote(payload) {
      let list = null
      if (payload === 'emergencyCommandGroup') list = this.ruleForm.emergencyCommandGroup
      if (payload === 'fieldCommand') list = this.ruleForm.fieldCommand
      if (payload === 'communications') list = this.ruleForm.communications
      if (payload === 'logisticsDepartment') list = this.ruleForm.logisticsDepartment
      if (payload === 'technicalExpertGroup') list = this.ruleForm.technicalExpertGroup
      if (payload === 'dataCollection') list = this.ruleForm.dataCollection
      if (payload === 'propagandaTeam') list = this.ruleForm.propagandaTeam
      return list
    },
    submitForm() {
      this.saveData()
    },
    // 保存数据
    async saveData() {
      this.svaeloading = true
      const dto = {
        disposalId: this.disposalId,
        personList: [
          ...this.ruleForm.emergencyCommandGroup.map(({ type, saved, disposalId, ...x }) => ({ type: 1, ...x })),
          ...this.ruleForm.fieldCommand.map(({ type, saved, disposalId, ...x }) => ({ type: 2, ...x })),
          ...this.ruleForm.communications.map(({ type, saved, disposalId, ...x }) => ({ type: 3, ...x })),
          ...this.ruleForm.logisticsDepartment.map(({ type, saved, disposalId, ...x }) => ({ type: 4, ...x })),
          ...this.ruleForm.technicalExpertGroup.map(({ type, saved, disposalId, ...x }) => ({ type: 5, ...x })),
          ...this.ruleForm.dataCollection.map(({ type, saved, disposalId, ...x }) => ({ type: 6, ...x })),
          ...this.ruleForm.propagandaTeam.map(({ type, saved, disposalId, ...x }) => ({ type: 7, ...x }))
        ],
        id: null
      }
      if (dto.personList.length === 0) {
        this.$message.warning('请至少添加一项应急组织安排信息')
        this.svaeloading = false
        return
      }
      const res = await reloadPersons(dto)
      this.svaeloading = false
      if (res.code === '0') {
        this.$message.success('应急响应人员保存成功')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
    .descriptions {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
.h1{
  font-weight: 600;
  line-height: 40px;
  margin: 0;
}
</style>
