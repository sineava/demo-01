<template>
  <div>
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
        label="经济类型:"
        prop="economicType"
      >
        <el-input
          v-model.trim="searchForm.economicType"
          placeholder="请输入经济类型"
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
      <div />
      <el-table-column
        label="编号"
        width="65"
      >
        <template v-slot="scope">
          <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所在地市港口管理部门"
        prop="organizationName"
      />
      <el-table-column
        label="企业名称"
        prop="enterpriseName"
      />
      <el-table-column
        label="法定代表人"
        prop="legalPersonName"
      />
      <el-table-column
        label="经济类型"
        prop="economicType"
      />
      <el-table-column
        label="办公地址"
        prop="officeAddress"
      />
      <el-table-column
        label="联系人姓名"
        prop="contactName"
      />
      <el-table-column
        label="联系人电话"
        prop="contactPhone"
      />
      <el-table-column
        label="操作"
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
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleDetail(scope.row, true)"
          >
            <em class="el-icon-edit" /> 编辑
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
</template>

<script>
import pagination from '@/components/Pagination'
import { getList } from '@/api/general-services/port-enterprise/port-enterprise'
export default {
  components: {
    pagination
  },
  props: {
    tabs: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        enterpriseName: '',
        organizationName: '',
        economicType: ''
      }
    }
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getList({
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
    handleDetail(item, isEdit = false) {
      this.$router.push({ path: '/digital/resources/distribution/detail', query: { id: item.id || '', isEdit: isEdit, tabs: this.tabs }})
    }
  }
}
</script>
