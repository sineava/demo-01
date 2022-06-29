<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急预案详情</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="预案名称：">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="预案类型：">
          {{ ruleForm.type ? field_type.find(x => x.value === ruleForm.type).label : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="所属管理部门：">
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="响应级别：">
          {{ ruleForm.responseLevel ? field_responseLevel.find(x => x.value === ruleForm.responseLevel).label : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="应急通讯对象：">
          {{ ruleForm.emergencyCommunicationObject }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人：">
          {{ ruleForm.contact }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.contactPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="发布状态：">
          {{ ruleForm.state === 1 ? '未发布' : (ruleForm.state === 2 ? '已发布' : '') }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间：">
          {{ ruleForm.updateTime }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />应急处置策略
          </div>
        </el-form-item>
        <el-form-item
          label="应急指挥组:"
          prop="emergencyCommandGroup"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.emergencyCommandGroup"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="现场指挥部:"
          prop="fieldCommand"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.fieldCommand"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="通讯组:"
          prop="communications"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.communications"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="后勤保障部:"
          prop="logisticsDepartment"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.logisticsDepartment"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="技术专家组:"
          prop="technicalExpertGroup"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.technicalExpertGroup"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="资料收集组:"
          prop="dataCollection"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.dataCollection"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="宣传组:"
          prop="propagandaTeam"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.propagandaTeam"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />应急处置流程
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.emergencyDisposalProcess"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            disabled
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />应急预案文件
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <FileTable
            :show-download="true"
            :table-data="fileList"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium "
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import PersonGroupTable from '@/components/features/PersonGroupTable'
import FileTable from '@/components/features/FileTable'
import { emergencyPlan } from '@/utils/public-fields'
import { queryDetail } from '@/api/emergency-services/response-plan'
export default {
  components: {
    PersonGroupTable,
    FileTable
  },
  mixins: [emergencyPlan],
  data() {
    return {
      ruleForm: {},
      fileList: [],
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '姓名',maxlength:20 },
        { id: 2, value: 'departmentName', label: '所属部门',maxlength:100 },
        { id: 3, value: 'job', label: '职务' ,maxlength:50},
        { id: 4, value: 'phone', label: '手机',maxlength:11 }
      ]
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) { // 详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          const communications = []
          const dataCollection = []
          const emergencyCommandGroup = []
          const fieldCommand = []
          const logisticsDepartment = []
          const propagandaTeam = []
          const technicalExpertGroup = []
          res.data.personList.forEach(person => {
            if (person.type === 1) communications.push({ ...person, saved: true })
            if (person.type === 2) dataCollection.push({ ...person, saved: true })
            if (person.type === 3) emergencyCommandGroup.push({ ...person, saved: true })
            if (person.type === 4) fieldCommand.push({ ...person, saved: true })
            if (person.type === 5) logisticsDepartment.push({ ...person, saved: true })
            if (person.type === 6) propagandaTeam.push({ ...person, saved: true })
            if (person.type === 7) technicalExpertGroup.push({ ...person, saved: true })
          })
          this.ruleForm = {
            ...res.data,
            communications,
            dataCollection,
            emergencyCommandGroup,
            fieldCommand,
            filePath: JSON.parse(res.data.filePath),
            logisticsDepartment,
            propagandaTeam,
            technicalExpertGroup
          }
          this.fileList = this.ruleForm.filePath
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.quill-editor /deep/ .ql-container {
    height: 200px;
}

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
