<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>建设项目信息查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="建设单位"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入建设单位"
          />
        </el-form-item>
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
          label="建设类别:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            clearable
            placeholder="请选择建设类别"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="建设性质:"
          prop="nature"
        >
          <el-select
            v-model="searchForm.nature"
            clearable
            placeholder="请选择建设类别"
          >
            <el-option
              v-for="item in nature"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目级别:"
          prop="projectLevel"
        >
          <el-select
            v-model="searchForm.projectLevel"
            clearable
            placeholder="请选择项目级别"
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
            placeholder="请选择投资来源"
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="建设单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column label="建设类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.type && type.find(item => (item.value === scope.row.type)).label }}
          </template>
        </el-table-column>
        <el-table-column label="建设性质" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.nature && nature.find(item => (item.value === scope.row.nature)).label }}
          </template>
        </el-table-column>
        <el-table-column label="项目级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectLevel && projectLevel.find(item => (item.value === scope.row.projectLevel)).label }}
          </template>
        </el-table-column>
        <el-table-column label="投资来源" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.investmentSource && investmentSource.find(item => (item.value === scope.row.investmentSource)).label }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
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
import { getInPageList } from '@/api/port-services/construction-dangerous-goods/construction-project'
import pagination from '@/components/Pagination'
import { constructionProject } from '@/utils/public-fields'
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
        enterpriseName: '',
        projectName: '',
        type: '',
        nature: '',
        projectLevel: '',
        investmentSource: ''
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
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(type, item) {
      this.$router.push({ path: '/intact/danger/build/detail', query: { type, id: item ? item.id : null }})
    }
  }
}
</script>
