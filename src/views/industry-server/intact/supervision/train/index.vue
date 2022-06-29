<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>教育培训情况</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="部门名称:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="searchForm.departmentName"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item
          label="培训科目:"
          prop="trainSubject"
        >
          <el-input
            v-model.trim="searchForm.trainSubject"
            placeholder="请输入培训科目"
          />
        </el-form-item>
        <el-form-item
          label="培训方式:"
          prop="trainModes"
        >
          <el-input
            v-model.trim="searchForm.trainModes"
            placeholder="请输入培训方式"
          />
        </el-form-item>
        <el-form-item
          label="填报人:"
          prop="reporterPerson"
        >
          <el-input
            v-model.trim="searchForm.reporterPerson"
            placeholder="请输入填报人"
          />
        </el-form-item>
        <el-form-item
          label="联系方式:"
          prop="reporterPhone"
        >
          <el-input
            v-model.trim="searchForm.reporterPhone"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <el-form-item label="填报时间:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
          width="60"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="部门名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.departmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训科目" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.trainSubject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.trainModes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训对象" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.trainObject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.reporterPerson }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.reporterPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.reportedTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="95"
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
import { momentDate } from '@/utils/index'
import { getTrainList } from '@/api/general-services/intact'
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
        departmentName: '',
        trainSubject: '',
        trainModes: '',
        reporterPerson: '',
        reporterPhone: ''
      },
      screenTime: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const [startTime, endTime] = this.screenTime || []
      getTrainList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(startTime),
        endTime: momentDate(endTime)
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/intact/supervision/train/detail', query: { id: item ? item.id : null }})
    }
  }
}
</script>
