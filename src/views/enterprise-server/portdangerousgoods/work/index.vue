<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口危险货物作业反馈</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="组织机构:"
          prop="orgName"
        >
          <el-input
            v-model.trim="searchForm.orgName"
            placeholder="请输入组织机构"
          />
        </el-form-item>
        <el-form-item
          label="审批结果:"
          prop="approvalResult"
        >
          <el-input
            v-model.trim="searchForm.approvalResult"
            placeholder="请输入审批结果"
          />
        </el-form-item>
        <el-form-item
          label="作业类型:"
          prop="operationMode"
        >
          <el-input
            v-model.trim="searchForm.operationMode"
            placeholder="请输入作业类型"
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="组织机构">
          <template v-slot="scope">
            {{ scope.row.orgName }}
          </template>
        </el-table-column>
        <el-table-column label="作业类型">
          <template v-slot="scope">
            {{ scope.row.operationMode }}
          </template>
        </el-table-column>
        <el-table-column label="作业委托人">
          <template v-slot="scope">
            {{ scope.row.operationClient }}
          </template>
        </el-table-column>
        <el-table-column label="作业地点">
          <template v-slot="scope">
            {{ scope.row.operationBerth }}
          </template>
        </el-table-column>
        <el-table-column label="反馈状态">
          <template v-slot="scope">
            {{ scope.row.isStatus ? '已反馈' : '未反馈' }}
          </template>
        </el-table-column>
        <el-table-column label="审批结果">
          <template v-slot="scope">
            {{ scope.row.approvalResult }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleDetail('feedback', scope.row)"
            >
              作业反馈
            </el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
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
import { getEnList } from '@/api/port-services/danger-goods/dangerous-declare'
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
      row: '',
      searchForm: {
        orgName: '',
        approvalResult: '',
        operationMode: ''
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
      getEnList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
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
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
     * 详情
     */
    handleDetail(type, item) {
      this.$router.push({ path: '/portdangerousgoods/workDetail', query: { type, id: item ? item.id : null }})
    }
  }
}
</script>
