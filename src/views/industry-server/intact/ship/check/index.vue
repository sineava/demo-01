<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>船舶检验信息查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检验编号:"
          prop="shipSurveyNo"
        >
          <el-input
            v-model.trim="searchForm.shipSurveyNo"
            placeholder="请输入检验编号"
          />
        </el-form-item>
        <el-form-item
          label="船名:"
          prop="shipName"
        >
          <el-input
            v-model.trim="searchForm.shipName"
            placeholder="请输入船名"
          />
        </el-form-item>
        <el-form-item label="开始时间:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="search"
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检验编号"
          prop="shipSurveyNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船名"
          prop="shipName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船检登记号"
          prop="shipInsRegNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶登记号"
          prop="shipRegisterNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检验种类"
          prop="shipSurveyItemName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检验开始日期"
          prop="shipSurveyStartDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleAdd(scope.row.id)"
            >
              <em class="el-icon-info" />
              详情
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
import { momentDate } from '@/utils/index'
import { getShipList } from '@/api/ship-inspection/inspection-records/inspection-records'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      searchForm: {
        shipSurveyNo: '',
        shipName: '',
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getShipList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startDate: momentDate(screenStartTime),
        endDate: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
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
     * 详情/编辑
     */
    handleAdd(id, isEdit) {
      this.$router.push({ path: '/intact/ship/check/detail', query: { id, isEdit }})
    }
  }
}
</script>
