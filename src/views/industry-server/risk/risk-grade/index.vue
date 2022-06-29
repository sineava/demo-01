<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>作业单元风险评估</span>
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
      <div style="margin-top: 50px; text-align: center;">
        <el-button
          v-if="button_roles.estimate"
          style="width: 200px;"
          type="primary"
          size="small"
          @click="handleAssessment"
        >
          开始评估
        </el-button>
      </div>
      <div class="icon-title">
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
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="风险事件"
          prop="incidentName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="制险因素" :show-overflow-tooltip="true">
          <el-table-column label="人的因数" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===1"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="设备因素" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===2"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="环境因素" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===3"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="管理因素" :show-overflow-tooltip="true">
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
        <el-table-column label="风险值" :show-overflow-tooltip="true" />
        <el-table-column label="风险等级" :show-overflow-tooltip="true" />
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { incidentList } from '@/api/port-services/risk-identification/risk-assess'
import { findEnByUserId } from '@/api/port-services/risk-identification/risk-activity'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      enterpriseList: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    // 获取当前用户关联的企业信息(风险辨识使用)
    const userEnteroriseInfo = (await findEnByUserId()).data
    this.enterpriseList = [
      {
        enterpriseName: userEnteroriseInfo.enterpriseName,
        value: '-',
        level: '-',
        updateTime: '-'
      }
    ]
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      incidentList(data).then(res => {
        this.listLoading = false
        this.list = this.dataAgain(res.data)
      })
    },
    /**
     * 重组数据
     */
    dataAgain(arr) {
      let map = {}
      let dest = []
      for (let i = 0; i < arr.length; i++) {
        let ai = arr[i]
        if (!map[ai.activityId]) {
          const showData = { ...ai }
          delete showData.activityName
          showData.showId = `${i}1`
          dest.push({
            activityId: ai.activityId,
            activityName: ai.activityName,
            showId: i,
            children: [showData]
          })
          map[ai.activityId] = ai
        } else {
          for (let j = 0; j < dest.length; j++) {
            let dj = dest[j]
            if (dj.activityId === ai.activityId) {
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
     * 开始评估
     */
    handleAssessment() {
      this.$router.push({ path: '/risk/gradeAssessment', query: { list: this.list }})
    },
    /**
     * 详情
     */
    handleDetail(listItem) {
      let activeTabIndex = 0
      let eventIndex = 0
      this.list.forEach((item, index) => {
        if (item.activityId === listItem.activityId) {
          activeTabIndex = index
          item.children.forEach((element, eleIndex) => {
            if (element.incidentId === listItem.incidentId) {
              eventIndex = eleIndex
            }
          })
        }
      })
      this.$router.push({ path: '/risk/gradeAssessment', query: { list: this.list, search: { activeTabIndex: activeTabIndex, eventIndex: eventIndex }}})
    }
  }
}
</script>

