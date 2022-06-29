<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>专家资料数据查询</span>
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
        <el-form-item
          label="专家类别:"
          prop="category"
        >
          <el-input
            v-model.trim="searchForm.category"
            placeholder="请输入专家类别"
          />
        </el-form-item>
        <el-form-item
          label="职务:"
          prop="post"
        >
          <el-input
            v-model.trim="searchForm.post"
            placeholder="请输入职务"
          />
        </el-form-item>
        <el-form-item
          label="技术职称:"
          prop="technicalTitle"
        >
          <el-input
            v-model.trim="searchForm.technicalTitle"
            placeholder="请输入技术职称"
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专家类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.post }}</span>
          </template>
        </el-table-column>
        <el-table-column label="技术职称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.technicalTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所学专业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位位及部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.departmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现从事岗位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.currentPosition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机">
          <template v-slot="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) "
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
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
import { getPageList } from '@/api/general-services/public-information/expert'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
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
        name: '',
        category: '',
        post: '',
        technicalTitle: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      const queryInfo = { ...this.searchForm, pageNum: this.currentPage, pageSize: this.pageSize, }
      getPageList(queryInfo).then(res => {
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
    handleDetail(scope, item) {
      this.$router.push({ path: '/material/expert/expertDetail', query: { item }})
    }
  }
}
</script>

