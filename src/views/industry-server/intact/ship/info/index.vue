<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输船舶信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="所在地市港口管理部门:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="searchForm.organizationName"
            placeholder="请输入所在地市港口管理部门"
            style="width: 250px;"
          />
        </el-form-item>
        <el-form-item
          label="企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item
          label="船舶名称:"
          prop="shipName"
        >
          <el-input
            v-model.trim="searchForm.shipName"
            placeholder="请输入船舶名称"
          />
        </el-form-item>
        <el-form-item
          label="船舶识别号:"
          prop="shipIdentifyNo"
        >
          <el-input
            v-model.trim="searchForm.shipIdentifyNo"
            placeholder="请输入船舶识别号"
          />
        </el-form-item>
        <el-form-item
          label="营运证编号:"
          prop="shipLicenseNo"
        >
          <el-input
            v-model.trim="searchForm.shipLicenseNo"
            placeholder="请输入营运证编号"
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
          width="55"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所在地市港口管理部门"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="公司名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶名称"
          prop="shipName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶识别号"
          prop="shipIdentifyNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船籍港"
          prop="registryPort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="运营证编号"
          prop="shipLicenseNo"
          :show-overflow-tooltip="true"
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
import { managePersonList } from '@/api/water-transportation-services/information/enterprise-ship'
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
        organizationName: '',
        enterpriseName: '',
        shipName: '',
        shipIdentifyNo: '',
        shipLicenseNo: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      managePersonList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
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
    // 重置查询条件
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
    handleDetail(item) {
      this.$router.push({ path: '/intact/ship/info/detail', query: { id: item.id }})
    }
  }
}
</script>
