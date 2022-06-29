<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>现场检查记录查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="被检查企业/单位名称:"
          prop="targetName"
        >
          <el-input
            v-model.trim="searchForm.targetName"
            placeholder="请输入被检查企业/单位名称"
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item
          label="检查单位:"
          prop="isUseUnit"
        >
          <el-input
            v-model.trim="searchForm.isUseUnit"
            placeholder="请输入检查单位"
          />
        </el-form-item>
        <el-form-item
          label="检查计划:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入检查计划"
          />
        </el-form-item>
        <el-form-item
          label="是否填写检查记录:"
          prop="isFillInspectionRecords"
        >
          <el-select
            v-model="searchForm.isFillInspectionRecords"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="已填写"
              :value="1"
            />
            <el-option
              label="未填写"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="检查时间:"
          prop="timeList"
        >
          <el-date-picker
            v-model="timeList"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          label="是否存在问题:"
          prop="isProblem"
        >
          <el-select
            v-model="searchForm.isProblem"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="检查正常"
              :value="0"
            />
            <el-option
              label="存在问题"
              :value="1"
            />
            <el-option
              label="存在隐患"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="被检查单位负责人:"
          prop="personCharge"
        >
          <el-input
            v-model.trim="searchForm.personCharge"
            placeholder="请输入被检查单位负责人"
          />
        </el-form-item> -->
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
        <el-table-column label="被检查企业/单位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.targetName }}
          </template>
        </el-table-column>
        <el-table-column label="检查单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.isUseUnit ? JSON.parse(scope.row.isUseUnit).join(', ') : '' }}
          </template>
        </el-table-column>
        <el-table-column label="检查计划" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planningName }}
          </template>
        </el-table-column>
        <el-table-column label="是否填写检查记录" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag
              size="mini"
              :type="scope.row.isFillInspectionRecords ? 'success' : 'danger'"
            >
              {{ scope.row.isFillInspectionRecords ? '已填写' : '未填写' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="检查时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.actualInspectionTime }}
          </template>
        </el-table-column>
        <el-table-column label="是否存在问题" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.isProblem===0?'检查正常':(scope.row.isProblem===1?'存在问题':'存在隐患') }}
          </template>
        </el-table-column>
        <el-table-column label="被检查单位负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.personCharge }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
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
import { dataAnalysisList } from '@/api/general-services/safety-supervision-and-inspection/safetyInspectRecord'
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
      timeList: [],
      searchForm: {
        targetName: '',
        isUseUnit: '',
        planningName: '',
        isFillInspectionRecords: '',
        isProblem: '',
        personCharge: ''
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
      const [startTime, endTime] = this.timeList || []
      queryInfo.startTime = startTime
      queryInfo.endTime = endTime
      dataAnalysisList(queryInfo).then(res => {
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
      this.timeList = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/safe/supervise/checkrecordDetail', query: { id: item ? item.id : null }})
    }
  }
}
</script>
