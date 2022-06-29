<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>专项验收信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="管理部门:"
          prop="managementName"
        >
          <el-input
            v-model.trim="searchForm.managementName"
            placeholder="请输入管理部门"
          />
        </el-form-item>
        <el-form-item
          label="申请单位名称:"
          prop="applyEnterpriseName"
        >
          <el-input
            v-model.trim="searchForm.applyEnterpriseName"
            placeholder="请输入申请单位名称"
          />
        </el-form-item>
        <el-form-item
          label="项目名称:"
          prop="applyProjectName"
        >
          <el-input
            v-model.trim="searchForm.applyProjectName"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="工程起止时间:"
          prop="projectStartStopTime"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="applyPrincipal"
        >
          <el-input
            v-model.trim="searchForm.applyPrincipal"
            placeholder="请输入负责人"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="applyPhone"
        >
          <el-input
            v-model.trim="searchForm.applyPhone"
            placeholder="请输入联系电话"
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
        <el-table-column label="管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="申请单位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applyProjectName }}
          </template>
        </el-table-column>
        <el-table-column label="工程起止时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ `${scope.row.projectStartTime}-${scope.row.projectEndTime}` }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applyPrincipal }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applyPhone }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row, 'detail')"
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
import { getInPageList } from '@/api/port-services/construction-dangerous-goods/safety-facility-acceptance'
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
        managementName: '',
        applyProjectName: '',
        applyEnterpriseName: '',
        projectStartStopTime: '',
        applyPrincipal: '',
        applyPhone: ''
      },
      acceptanceState: [
        { value: 1, label: '已受理' },
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
    fetchData() {
      this.listLoading = true
      const [projectStartTime, projectEndTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        projectStartTime: momentDate(projectStartTime, 'YYYY-MM-DD'),
        projectEndTime: momentDate(projectEndTime, 'YYYY-MM-DD'),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getInPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item, type) {
      this.$router.push({ path: '/intact/danger/checkaccept/detail', query: { id: item.id, type }})
    }
  }
}
</script>
