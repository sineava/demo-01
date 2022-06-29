<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="风险管控措施记录" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="风险事件:"
          prop="incidentName"
        >
          <el-input
            v-model.trim="searchForm.incidentName"
            placeholder="请输入风险事件"
          />
        </el-form-item>
        <el-form-item
          label="风险等级:"
          prop="riskGrade"
        >
          <el-select
            v-model="searchForm.riskGrade"
            placeholder="请选择风险等级"
          >
            <el-option
              label="较小风险"
              :value="1"
            />
            <el-option
              label="一般风险"
              :value="2"
            />
            <el-option
              label="较大风险"
              :value="3"
            />
            <el-option
              label="重大风险"
              :value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否完善风险管控措施:"
          prop="isPerfect"
        >
          <el-select
            v-model="searchForm.isPerfect"
            placeholder="请选择是否完善风险管控措施"
          >
            <el-option
              label="否"
              :value="0"
            />
            <el-option
              label="是"
              :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="风险评估时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="fetchData"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('searchForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="风险事件"
          prop="incidentName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="所属作业单元"
          prop="activityName"
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
        <el-table-column
          label="风险值"
          prop="riskValue"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="风险等级" :show-overflow-tooltip="true">
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
          label="风险评估时间"
          :show-overflow-tooltip="true"
          prop="assessDate"
        />
        <el-table-column label="是否完善风险管控措施" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag :type="scope.row.isPerfect?'success':'warning'">
              {{ scope.row.isPerfect?'已完善':'未完善' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          width="150"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
  </el-card>
</template>

<script>
import pagination from '@/components/Pagination'
import { pageRecordList } from '@/api/port-services/risk-identification/risk-control-measures'
import { getEnterpriseTypeName, getRiskGrade } from '@/utils/index'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        assessId: '',
        incidentName: '',
        riskGrade: '',
        isPerfect: ''
      },
      screenTime: []
    }
  },
  async mounted() {
    this.searchForm.assessId = this.$route.query.id
    this.fetchData()
  },
  methods: {
    getEnterpriseTypeName(type) {
      return getEnterpriseTypeName(type)
    },
    getRiskGrade(num) {
      return getRiskGrade(num)
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      pageRecordList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.fetchData()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/risk/controlDetail', query: { id: item.id }})
    }
  }
}
</script>

