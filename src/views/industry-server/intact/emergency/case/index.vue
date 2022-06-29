<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>事故案例信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="事故名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入事故名称"
          />
        </el-form-item>
        <el-form-item
          label="事故类型:"
          prop="type"
        >
          <el-input
            v-model.trim="searchForm.type"
            placeholder="请输入事故类型"
          />
        </el-form-item>
        <el-form-item
          label="事故级别:"
          prop="level"
        >
          <el-select
            v-model="searchForm.level"
            clearable
            placeholder="请选择事故级别"
          >
            <el-option
              v-for="item in level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="事故性质:"
          prop="nature"
        >
          <el-input
            v-model.trim="searchForm.nature"
            placeholder="请输入事故性质"
          />
        </el-form-item>
        <el-form-item
          label="事故单位名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入事故单位名称"
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="事故名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.level && field_level.find(item => item.value === scope.row.level).label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故性质" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.nature }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故单位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime.replace('T', ' ') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit(scope.row)"
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
import { emergencyCase } from '@/utils/public-fields'
import { getInPageList } from '@/api/emergency-services/accident-case'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  mixins: [emergencyCase],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        type: '',
        level: '',
        nature: '',
        enterpriseName: ''
      },
      level: [
        { value: 1, label: '特别重大' },
        { value: 2, label: '重大' },
        { value: 3, label: '较大' },
        { value: 4, label: '一般' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getInPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
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
    handleEdit(item) {
      this.$router.push({ path: '/intact/emergency/case/edit', query: { id: item ? item.id : null }})
    }
  }
}
</script>
