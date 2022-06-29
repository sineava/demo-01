<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="isEdit ? '编辑重大风险报备' : '重大风险报备详情'" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 评估信息
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      :disabled="isEdit?false:true"
    >
      <div class="table-title">
        风险事件
      </div>
      <div class="form-list">
        <div class="form-label">
          所属企业
        </div><div class="from-text">
          {{ userEnterpriseInfo.enterpriseName }}
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          所属风险作业单元
        </div>
        <div class="from-text">
          <el-select
            v-model="ruleForm.riskActivityId"
            placeholder="请选择所属风险作业单元"
            @change="activityChange"
          >
            <el-option
              v-for="item in riskActivityList"
              :key="item.id"
              :label="item.activityName"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          风险事件
        </div>
        <div class="from-text">
          <el-select
            v-model="ruleForm.incidentId"
            placeholder="请选择风险事件"
          >
            <el-option
              v-for="item in incidentList"
              :key="item.id"
              :label="item.incidentName"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          描述
        </div><div class="from-text">
          {{ incidentIndex>=0 ? incidentList[incidentIndex].incidentDesc : '' }}
        </div>
      </div>
      <div
        v-if="incidentIndex>=0"
        class="table-title"
      >
        制险因素
      </div>
      <el-table
        v-if="incidentIndex>=0"
        :data="incidentList[incidentIndex].riskControlFactorsInfoVoList"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="制险因素"
          prop="factorsName"
        />
        <el-table-column label="制险因素分类">
          <template v-slot="scope">
            {{ scope.row.factorsType===1?'人的因素':(scope.row.factorsType===2?'设备因素':(scope.row.factorsType===3?'环境因素':'管理因素')) }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="factorsDesc"
        />
      </el-table>
      <div class="table-title">
        制险因素
      </div>
      <div class="form-list">
        <div class="form-label">
          发生可能性（L）：
        </div>
        <div class="from-text">
          <el-input-number
            v-model="ruleForm.happenPossibility"
            :min="1"
            :max="10"
            @change="calculatingRisk"
          />
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          风险值：
        </div><div class="from-text">
          {{ ruleForm.riskValue }}
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          后果严重程度（C）：
        </div>
        <div class="from-text">
          <el-select
            v-model="ruleForm.seriousDegree"
            placeholder="请选择后果严重程度"
            @change="calculatingRisk"
          >
            <el-option
              label="不严重"
              :value="1"
            />
            <el-option
              label="较严重"
              :value="2"
            />
            <el-option
              label="严重"
              :value="5"
            />
            <el-option
              label="特别严重"
              :value="10"
            />
          </el-select>
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          风险等级：
        </div><div class="from-text">
          {{ ruleForm.riskValue ? getRiskGrade(ruleForm.riskValue).label : '' }}
        </div>
      </div>
      <el-form-item
        style="margin-top: 20px; width: 400px;"
        label="责任人:"
        prop="liablePerson"
      >
        <el-input v-model.trim="ruleForm.liablePerson" placeholder="请输入责任人" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="联系方式:"
        prop="contactMode"
        style="width: 400px;"
      >
        <el-input v-model.trim="ruleForm.contactMode" placeholder="请输入联系方式" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="报备类型:"
        prop="reportingType"
        style="width: 400px;"
      >
        <el-select
          v-model="ruleForm.reportingType"
          placeholder="请选择报备类型"
          style="width: 100%;"
        >
          <el-option
            label="初次报备"
            :value="1"
          />
          <el-option
            label="定期报备"
            :value="2"
          />
          <el-option
            label="动态报备"
            :value="3"
          />
        </el-select>
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 风险管控措施
      </div>
      <el-form-item
        label="管控措施:"
        prop="controlMeasures"
      >
        <el-input
          v-model="ruleForm.controlMeasures"
          :rows="6"
          type="textarea"
          placeholder="请输入管控措施"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="controlMeasuresRemarks"
      >
        <el-input
          v-model="ruleForm.controlMeasuresRemarks"
          :rows="6"
          type="textarea"
          placeholder="请输入备注"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="现场图片:"
        prop="sceneImg"
      >
        <upload
          :limit="9"
          :file-list="ruleForm.sceneImg"
          multiple
          @fileSuccess="uploadImgSuccess"
          @remove="uploadImgRemove"
        />
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 预警信息
      </div>
      <el-form-item
        label="预警内容:"
        prop="earlyWarningContent"
      >
        <el-input
          v-model="ruleForm.earlyWarningContent"
          :rows="6"
          type="textarea"
          placeholder="请输入预警内容"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="earlyWarningRemarks"
      >
        <el-input
          v-model="ruleForm.earlyWarningRemarks"
          :rows="6"
          type="textarea"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 应急处置方案
      </div>
      <el-form-item
        label="应急处置方案:"
        prop="disposalPlan"
      >
        <el-input
          v-model="ruleForm.disposalPlan"
          :rows="6"
          type="textarea"
          placeholder="请输入应急处置方案"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remarks"
      >
        <el-input
          v-model="ruleForm.remarks"
          :rows="6"
          type="textarea"
          placeholder="请输入备注"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        v-if="isEdit"
        label="附件:"
        prop="enclosureInfo"
      >
        <upload
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
      </el-form-item>
      <common-table
        v-if="isEdit"
        :table-data="ruleForm.enclosureInfo"
        show-download
        show-delete
        @handleDelete="handleDelete"
      />
    </el-form>
    <common-table
      v-if="!isEdit"
      :table-data="ruleForm.enclosureInfo"
      show-download
    />
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
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
import { getInfo, addData, updateData, findList, findIncidentList } from '@/api/port-services/risk-identification/major-risk-reporting'
import { findEnByUserId } from '@/api/port-services/risk-identification/risk-activity'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        enterpriseId: '',
        id: '',
        enterpriseName: '',
        riskActivityId: '',
        incidentId: '',
        seriousDegree: '',
        riskValue: '',
        happenPossibility: '',
        enclosureInfo: [],
        sceneImg: []
      },
      rules: {
        liablePerson: [
          { required: true, message: '请输入责任人', trigger: 'blur' }
        ],
        contactMode: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        reportingType: [
          { required: true, message: '请输入报备类型', trigger: 'change' }
        ],
        controlMeasures: [
          { required: true, message: '请输入风险管控措施', trigger: 'blur' }
        ],
        sceneImg: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        disposalPlan: [
          { required: true, message: '请输入应急处置方案', trigger: 'blur' }
        ],
        earlyWarningContent: [
          { required: true, message: '请输入预警内容', trigger: 'blur' }
        ]
      },
      loading: false,
      info: {},
      isEdit: false,
      userEnterpriseInfo: {},
      riskActivityList: [],
      incidentList: [],
      incidentIndex: -1
    }
  },
  watch: {
    'ruleForm.riskActivityId'(val) {
      this.findIncidentList()
    },
    'ruleForm.incidentId'(val) {
      this.incidentIndex = this.incidentList.findIndex(item => item.id === val)
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit// 判断编辑/详情
    this.userEnterpriseInfo = (await findEnByUserId()).data
    this.riskActivityList = (await findList()).data
    this.ruleForm.enterpriseId = this.userEnterpriseInfo.id
    this.ruleForm.enterpriseName = this.userEnterpriseInfo.enterpriseName
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.info = (await getInfo(this.$route.query.id)).data
      try {
        this.info.sceneImg = JSON.parse(this.info.sceneImg)
        this.info.enclosureInfo = JSON.parse(this.info.enclosureInfo)
      } catch (err) {
        console.log()
      }
      this.ruleForm = { ...this.info }
      this.ruleForm.sceneImg = this.info.sceneImg || []
      this.ruleForm.enclosureInfo = this.info.enclosureInfo || []
    }
  },
  methods: {
    // 图片上传成功钩子
    uploadImgSuccess(file) {
      this.ruleForm.sceneImg.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 图片列表移除文件时的钩子
    uploadImgRemove(file) {
      this.ruleForm.sceneImg.splice(this.ruleForm.sceneImg.findIndex(item => item.uid === file.uid), 1)
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.ruleForm.enclosureInfo.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除
    handleDelete(val) {
      this.ruleForm.enclosureInfo.splice(val.index, 1)
    },
    // 通过风险值获取风险等级
    getRiskGrade(num) {
      const list = [
        { min: 0, max: 6, label: '较小风险', level: 1 },
        { min: 5, max: 21, label: '一般风险', level: 2 },
        { min: 20, max: 56, label: '较大风险', level: 3 },
        { min: 55, max: 101, label: '重大风险', level: 4 }
      ]
      return list.filter(item => num > item.min && num < item.max)[0]
    },
    /**
     * 计算风险值
     */
    calculatingRisk() {
      if (this.ruleForm.happenPossibility && this.ruleForm.seriousDegree) {
        this.ruleForm.riskValue = this.ruleForm.happenPossibility * this.ruleForm.seriousDegree
      }
    },
    activityChange() {
      this.incidentIndex = -1
      this.ruleForm.incidentId = ''
    },
    // 查询事件列表
    findIncidentList() {
      findIncidentList({ riskActivityId: this.ruleForm.riskActivityId }).then(res => {
        this.incidentList = res.data
        if (this.incidentList.length > 0 && this.ruleForm.incidentId) {
          this.incidentIndex = this.incidentList.findIndex(item => item.id === this.ruleForm.incidentId)
        }
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    async save() {
      let data = { ...this.ruleForm }
      data.sceneImg = JSON.stringify(data.sceneImg)
      data.enclosureInfo = JSON.stringify(data.enclosureInfo)
      data.riskGrade = this.getRiskGrade(this.ruleForm.riskValue).level
      delete data.riskActivityName
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
    padding-left: 20px;
    height: 35px;
    line-height: 35px;
    background-color: rgba(2, 167, 240, 1);
}

.form-list {
    display: flex;
    align-items: center;
    height: 50px;

    .form-label {
        padding-left: 20px;
        width: 210px;
        height: 50px;
        line-height: 50px;
        background-color: #f2f2f2;
    }

    .from-text {
        border-right: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        padding-left: 20px;
        height: 50px;
        line-height: 50px;
        flex: 1;
    }
}
</style>
