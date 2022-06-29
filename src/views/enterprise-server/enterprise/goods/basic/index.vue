<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>建设项目信息管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="项目名称:"
          prop="projectName"
        >
          <el-input
            v-model.trim="searchForm.projectName"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="项目级别:"
          prop="projectLevel"
        >
          <el-select
            v-model="searchForm.projectLevel"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in projectLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="投资来源:"
          prop="investmentSource"
        >
          <el-select
            v-model="searchForm.investmentSource"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in investmentSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column label="建设类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.type && type.filter(item => (item.value === scope.row.type))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="建设性质" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.nature && nature.filter(item => (item.value === scope.row.nature))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="项目级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectLevel && projectLevel.filter(item => (item.value === scope.row.projectLevel))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="投资来源" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.investmentSource && investmentSource.filter(item => (item.value === scope.row.investmentSource))[0].label }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
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
import { getPageList } from '@/api/port-services/construction-dangerous-goods/construction-project'
import pagination from '@/components/Pagination'
import { constructionProject } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  mixins: [constructionProject],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      searchForm: {
        investmentSource: '',
        projectName: '',
        projectLevel: ''
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
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
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
    handleDetail(item) {
      this.$router.push({ path: '/enterprise/goods/basicDetail', query: { id: item.id }})
    }
  }
}
</script>

