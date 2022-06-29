<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全现状评价报告备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称/备案名称:"
          prop="reportName"
        >
          <el-input
            v-model.trim="searchForm.reportName"
            placeholder="请输入企业名称/备案名称"
          />
        </el-form-item>
        <el-form-item
          label="备案类型:"
          prop="filingForm"
        >
          <el-select
            v-model="searchForm.filingForm"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in filingForm"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="受理状态:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in isStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="填报时间:">
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
            @click="submitForm('searchForm')"
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
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        提交新的备案
      </el-button>
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安全评估报告名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.reportName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备案类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.filingForm === 1 && '初次备案' || scope.row.filingForm === 2 && '变更备案' || scope.row.filingForm === 3 && '注销备案' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备案日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.filingDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期至" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.validityDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="受理状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{
              scope.row.isStatus === 1 && '受理中'
                || scope.row.isStatus === 2 && '受理退回'
                || scope.row.isStatus === 3 && '审核中'
                || scope.row.isStatus === 4 && '审核通过'
                || scope.row.isStatus === 5 && '审核退回'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="80"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
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
import { momentDate } from '@/utils/index'
import { getPageEnList } from '@/api/port-services/port-enterprise-charge-management/report-filing'
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
        filingForm: '',
        reportName: '',
        isStatus: '',
        screenStartTime: '',
        screenEndTime: ''
      },
      filingForm: [
        { value: 1, label: '初次备案' },
        { value: 2, label: '变更备案' },
        { value: 3, label: '注销备案' }
      ],
      isStatus: [
        { value: 1, label: '受理中' },
        { value: 2, label: '审核中' },
        { value: 3, label: '审核通过' },
        { value: 4, label: '退回' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询列表数据
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }
      getPageEnList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.fetchData()
        } else {
          return false
        }
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    // 切换每页大小
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 详情
    handleDetail(_, item) {
      this.$router.push({ path: '/reportfiling/safe/statusDetail', query: { id: item.id }})
    },
    // 提交新的备案
    handleAdd() {
      this.$router.push({ path: '/reportfiling/safe/statusAdd' })
    }
  }
}
</script>
