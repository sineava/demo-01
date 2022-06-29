<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业教育培训查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
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
          label="培训科目:"
          prop="trainSubjects"
        >
          <el-input
            v-model.trim="searchForm.trainSubjects"
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
          label="培训对象:"
          prop="trainObject"
        >
          <el-input
            v-model.trim="searchForm.trainObject"
            placeholder="请输入培训对象"
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
          label="填报人联系电话:"
          prop="reporterPhone"
        >
          <el-input
            v-model.trim="searchForm.reporterPhone"
            placeholder="请输入填报人联系电话"
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
            @click="search"
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
          width="65"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="培训科目" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainSubjects }}
          </template>
        </el-table-column>
        <el-table-column label="培训方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainModes }}
          </template>
        </el-table-column>
        <el-table-column label="培训对象" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainObject }}
          </template>
        </el-table-column>
        <el-table-column label="填报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reporterPerson }}
          </template>
        </el-table-column>
        <el-table-column label="填报人联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reporterPhone }}
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reportedTime.replace('T', ' ') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleSituation(scope.row)"
            >
              <em class="el-icon-info" /> 培训情况
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
import { momentDate } from '@/utils/index'
import { getTrainingPageList } from '@/api/general-services/integrated-query/integrated-query'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      enterpriseIds: '',
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        enterpriseName: '',
        trainSubjects: '',
        trainModes: '',
        trainObject: '',
        reporterPerson: '',
        reporterPhone: ''
      },
      screenTime: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getTrainingPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(type, item) {
      const id = item ? item.id : 0
      this.$router.push({ path: '/intact/enterprise/train/plan-detail', query: { type, id, enterpriseName: item.enterpriseName }})
    },
    // 跳转培训情况
    handleSituation(item) {
      this.$router.push({
        path: '/intact/enterprise/train/situation',
        query: { planningId: item.id }
      })
    }
  }
}
</script>
