<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="重大风险报备详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 评估信息
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      label-width="150px"
      disabled
    >
      <div class="table-title">
        风险事件
      </div>
      <div class="form-list">
        <div class="form-label">
          所属企业
        </div><div class="from-text">
          {{ info.enterpriseName }}
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          所属风险作业单元
        </div>
        <div class="from-text">
          {{ ruleForm.riskActivityName }}
        </div>
      </div>
      <div class="form-list">
        <div class="form-label">
          风险事件
        </div>
        <div
          v-if="ruleForm.incidentId && incidentList.length > 0"
          class="from-text"
        >
          <el-select
            v-model="ruleForm.incidentId"
            placeholder="请选择"
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
            placeholder="请选择"
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
        style="margin-top: 20px;"
        label="责任人:"
        prop="liablePerson"
      >
        <el-input v-model.trim="ruleForm.liablePerson" />
      </el-form-item>
      <el-form-item
        label="联系方式:"
        prop="contactMode"
      >
        <el-input v-model.trim="ruleForm.contactMode" />
      </el-form-item>
      <el-form-item
        label="报备类型:"
        prop="reportingType"
      >
        <el-select
          v-model="ruleForm.reportingType"
          placeholder="请选择"
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
        />
      </el-form-item>
      <el-form-item
        label="现场图片:"
        prop="sceneImg"
      >
        <img
          v-for="(item,index) in ruleForm.sceneImg"
          :key="index"
          :src="item.url"
          class="img-view"
        >
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
        />
      </el-form-item>
    </el-form>
    <common-table
      :table-data="ruleForm.enclosureInfo"
      show-download
    />
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
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
import { getInfo, findIncidentList } from '@/api/port-services/risk-identification/major-risk-reporting'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        enterpriseId: '',
        id: '',
        enterpriseName: '',
        riskActivityId: '',
        incidentId: ''
      },
      info: {},
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
    // 查询事件列表
    findIncidentList() {
      findIncidentList({ riskActivityId: this.ruleForm.riskActivityId }).then(res => {
        this.incidentList = res.data
        this.incidentIndex = this.incidentList.findIndex(item => item.id === this.ruleForm.incidentId)
      })
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

.img-view {
    float: left;
    margin: 0 10px 10px 0;
    border-radius: 8px;
    width: 150px;
    height: 150px;
}
</style>
