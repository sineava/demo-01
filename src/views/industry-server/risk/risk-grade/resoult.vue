<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="作业单元风险评估详情" />
      </span>
      <span class="detail-header-button">
        <el-button type="primary" @click="exportRecord" size="small">导出风险评估报告</el-button>
      </span>
    </div>
    <div class="app-container">
      <div class="icon-title">
        <span class="span" /> 风险评估
      </div>
      <el-table
        :data="enterpriseList"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
        />
        <el-table-column
          label="风险值"
          prop="value"
        />
        <el-table-column
          label="风险等级"
          prop="level"
        />
        <el-table-column
          label="更新时间"
          prop="updateTime"
        />
      </el-table>
      <div
        v-if="!isList"
        style="margin-top: 50px; text-align: center;"
      >
        <el-button
          style="width: 200px;"
          type="primary"
          size="small"
          plain
          @click="handleAssessment"
        >
          重新评估
        </el-button>
        <el-button
          style="width: 200px;"
          type="primary"
          size="small"
          @click="confirmAssess"
        >
          评估完成
        </el-button>
      </div>
      <div
        style="margin-top: 20px;"
        class="icon-title"
      >
        <span class="span" /> 风险评估
      </div>
      <el-table
        v-if="list.length > 0"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
        row-key="showId"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="activityName"
          width="150"
          label="风险单元名称"
        />
        <el-table-column
          label="风险事件"
          prop="incidentName"
        />
        <el-table-column label="制险因素">
          <el-table-column label="人的因数">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===1"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="设备因素">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===2"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="环境因素">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===3"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="管理因素">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===4"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="风险值"
          prop="riskValue"
        />
        <el-table-column
          label="风险等级"
          prop="riskGrade"
        >
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.riskValue"
              :type="getRiskGrade(scope.row.riskValue).level===1?'success':(getRiskGrade(scope.row.riskValue).level===2?
                '':(getRiskGrade(scope.row.riskValue).level===3?'warning':'danger'))"
              effect="dark"
              size="mini"
            >
              {{ getRiskGrade(scope.row.riskValue).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template v-slot="scope">
            <el-button
              v-if="!scope.row.activityName"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="!isList && !scope.row.activityName"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-if="isList"
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
    </div>
  </el-card>
</template>

<script>
import { getInfo, confirmAssess } from '@/api/port-services/risk-identification/risk-assess'
import { exportWord } from '@/components/word'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      enterpriseList: [],
      id: '',
      isList: false
    }
  },
  async mounted() {
    this.id = this.$route.query.id
    if (this.$route.query.isList) {
      this.isList = this.$route.query.isList
    }
    // 获取评估的信息
    const info = (await getInfo(this.$route.query.id)).data
    this.enterpriseList = [
      {
        enterpriseName: info.enterpriseName,
        value: info.riskValue,
        level: this.getRiskGrade(info.riskValue).label,
        updateTime: info.updateTime
      }
    ]
    this.list = this.dataAgain(info.riskAssessTermInfoVoList)
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
    /**
     * 重组数据
     */
    dataAgain(arr) {
      let map = {}
      let dest = []
      for (let i = 0; i < arr.length; i++) {
        let ai = arr[i]
        if (!map[ai.riskActivityId]) {
          const showData = { ...ai }
          delete showData.activityName
          showData.showId = `${i}1`
          dest.push({
            riskActivityId: ai.riskActivityId,
            activityName: ai.activityName,
            showId: i,
            children: [showData]
          })
          map[ai.riskActivityId] = ai
        } else {
          for (let j = 0; j < dest.length; j++) {
            let dj = dest[j]
            if (dj.riskActivityId === ai.riskActivityId) {
              const showData = { ...ai }
              showData.showId = `${i}1`
              delete showData.activityName
              dj.children.push(showData)
              break
            }
          }
        }
      }
      return dest
    },
    /**
     * 完成评估
     */
    confirmAssess() {
      confirmAssess(this.id).then(res => {
        if (res.code === '0') {
          this.$router.push({ path: '/risk/risk-assessment' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 重新评估
     */
    handleAssessment() {
      this.$router.push({ path: '/risk/gradeAssessment', query: { list: this.list, id: this.id }})
    },
    /**
     * 详情/编辑
     */
    handleDetail(listItem, isEdit) {
      let activeTabIndex = 0
      let eventIndex = 0
      this.list.forEach((item, index) => {
        if (item.riskActivityId === listItem.riskActivityId) {
          activeTabIndex = index
          item.children.forEach((element, eleIndex) => {
            if (element.incidentId === listItem.incidentId) {
              eventIndex = eleIndex
            }
          })
        }
      })
      this.$router.push({ path: '/risk/gradeAssessment', query: { list: this.list, search: { activeTabIndex: activeTabIndex, eventIndex: eventIndex, isEdit: isEdit }}})
    },
    async exportRecord(){
      const info = (await getInfo(this.$route.query.id)).data
      let list = []
      if(info.riskAssessTermInfoVoList){
        info.riskAssessTermInfoVoList.forEach(item=>{
          let humanFactor='' //人为因素
          let equipmentFactor='' //设备因素
          let environmentalFactor='' //环境因素
          let managementFactor='' //管理因素
          if(item.riskControlFactorsInfoVoList){
            item.riskControlFactorsInfoVoList.forEach(item=>{
              switch(item.factorsType){
                case 1:
                  humanFactor = item.factorsName
                break;
                case 2:
                  equipmentFactor = item.factorsName
                break;
                case 3:
                  environmentalFactor = item.factorsName
                break;
                default:
                  managementFactor = item.factorsName
                  break;
              }
            })
          }
          list.push({
            activityName:item.activityName || '',
            incidentName:item.incidentName || '',
            humanFactor:humanFactor,
            equipmentFactor:equipmentFactor,
            environmentalFactor:environmentalFactor,
            managementFactor:managementFactor,
            riskValue:item.riskValue || '',
            riskGrade:item.riskGrade ? this.getRiskGrade(item.riskGrade).label : '',
          })
        })
      }
      let data = {
        enterpriseName:info.enterpriseName || '',
        riskGrade:info.riskGrade ? this.getRiskGrade(info.riskValue).label : '',
        updateTime:info.updateTime || '',
        riskValue:info.riskValue || '',
        list:list
      }
      exportWord('./excels/风险评估报告.docx',data,`风险评估报告`)
    },
  }
}
</script>
