<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="风险事件与制险因素查询" />
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
        <el-table-column
          label="更新时间"
          prop="updateTime"
        />
        <el-table-column
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
import { pageIncidentList } from '@/api/port-services/risk-identification/risk-incident'
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
        riskActivityId: '',
        activityName: ''
      }
    }
  },
  async mounted() {
    this.searchForm.riskActivityId = this.$route.query.id
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageIncidentList(data).then(res => {
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
      this.$router.push({ path: '/risk/eventListDetail', query: { id: item.id, riskActivityId: this.$route.query.id, activityName: this.$route.query.activityName, enterpriseName: this.$route.query.enterpriseName }})
    }
  }
}
</script>

