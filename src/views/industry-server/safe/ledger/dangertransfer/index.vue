<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>移交记录</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检查项名称/企业名称:"
          prop="itemName"
        >
          <el-input
            v-model.trim="searchForm.itemName"
            placeholder="请输入检查项名称/企业名称"
            style="width: 220px;"
          />
        </el-form-item>
        <el-form-item
          label="移交时间范围:"
          prop="range"
        >
          <el-date-picker
            v-model="searchForm.range"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label=" ">
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查项名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.targetName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查计划名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.planningName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualInspectionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="移交部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.transferUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="移交时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.transferTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
import { getHyList } from '@/api/general-services/enterprise-self-ledger/dangertransfer'
import pagination from '@/components/Pagination'
import { momentDate } from '@/utils/index'
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
      searchForm: {
        itemName: '',
        range: ''
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
      const searchData = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        itemName: this.searchForm.itemName,
        screenStartTime: this.searchForm.range[0] ? momentDate(this.searchForm.range[0], 'YYYY-MM-DD 00:00:00') : '',
        screenEndTime: this.searchForm.range[1] ? momentDate(this.searchForm.range[1], 'YYYY-MM-DD 23:59:59') : ''
      }
      getHyList(searchData).then(response => {
        this.listLoading = false
        this.total = response.data ? response.data.total : 0
        this.list = response.data ? response.data.records : []
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
     * 现场检查记录详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/safe/ledger/dangertransferDetail', query: {id: item.id} })
    }
  }
}
</script>

