<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门机构人员信息查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="姓名:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <!-- <el-form-item
          label="所属机构:"
          prop="managementName"
        >
          <el-input
            v-model.trim="searchForm.managementName"
            placeholder="请输入所属机构"
          />
        </el-form-item> -->
        <el-form-item
          label="证书类型:"
          prop="certificateType"
        >
          <el-input
            v-model.trim="searchForm.certificateType"
            placeholder="请输入证书类型"
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
            @click="resetForm"
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
          width="95"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所属机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.post }}
          </template>
        </el-table-column>
        <el-table-column label="适任证书类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.certificateType }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
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
import { getManagementPersonList } from '@/api/general-services/intact'
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
      searchForm: {
        managementName: '',
        name: '',
        certificateType: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getManagementPersonList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/material/supervision/agencyDetail', query: { id: item.id, departmentName: item.departmentName }})
    }
  }
}
</script>

