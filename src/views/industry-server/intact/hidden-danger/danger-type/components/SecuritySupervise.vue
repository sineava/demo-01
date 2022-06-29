<template>
  <div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称:"
          prop="targetName"
        >
          <el-input
            v-model.trim="searchForm.targetName"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item
          label="所在地市港口管理部门:"
          prop="jurisdictionUnit"
        >
          <el-input
            v-model.trim="searchForm.jurisdictionUnit"
            placeholder="请输入所在地市港口管理部门"
          />
        </el-form-item>
        <el-form-item
          label="检查名称:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入检查名称"
          />
        </el-form-item>
        <el-form-item
          label="检查项:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入检查项"
          />
        </el-form-item>
        <el-form-item
          label="危险等级:"
          prop="riskLevel"
        >
          <el-select
            v-model="searchForm.riskLevel"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="一般"
              :value="1"
            />
            <el-option
              label="重大"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否整改:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="是"
              :value="1"
            />
            <el-option
              label="否"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="整改时限:"
          prop="timeRequirement"
        >
          <el-select
            v-model="searchForm.timeRequirement"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="停业整改"
              value="停业整改"
            />
            <el-option
              label="限期整改"
              value="限期整改"
            />
            <el-option
              label="立即整改"
              value="立即整改"
            />
            <el-option
              label="挂牌督办"
              value="挂牌督办"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="开展时间:"
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
          label="整改截止时间:"
          prop="editTimeList"
        >
          <el-date-picker
            v-model="editTimeList"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.targetName }}
          </template>
        </el-table-column>
        <el-table-column label="检查单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ JSON.parse(scope.row.jurisdictionUnit || '[]').flat().join(',') }}
          </template>
        </el-table-column>
        <el-table-column label="检查名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planningName }}
          </template>
        </el-table-column>
        <el-table-column label="检查项" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="危险等级">
          <template v-slot="scope">
            {{ scope.row.riskLevel===1?'一般':'重大' }}
          </template>
        </el-table-column>
        <el-table-column label="是否整改">
          <template v-slot="scope">
            {{ scope.row.isStatus?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column label="整改时限" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.timeRequirement }}
          </template>
        </el-table-column>
        <el-table-column label="开展时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planningTime }}
          </template>
        </el-table-column>
        <el-table-column label="整改截止时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.deadlineDate ? moment(scope.row.deadlineDate).format('YYYY-MM-DD') : '' }}
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
  </div>
</template>

<script>
import { dataAnalysisList } from '@/api/general-services/enterprise-self-ledger/companydanger'
import pagination from '@/components/Pagination'
import moment from 'moment'
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
      editTimeList: [],
      searchForm: {
        targetName: '',
        jurisdictionUnit: '',
        planningName: '',
        name: '',
        riskLevel: '',
        isStatus: '',
        timeRequirement: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    moment,
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
      const [beginTime, finishTime] = this.editTimeList || []
      queryInfo.beginTime = beginTime
      queryInfo.finishTime = finishTime
      dataAnalysisList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.timeList = []
      this.editTimeList = []
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/safe/ledger/dangerrecordDetail', query: { id: item ? item.id : null, disabled: 1 }})
    }
  }
}
</script>
