<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>复查验收意见查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
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
          label="检查计划:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入检查计划"
          />
        </el-form-item>
        <el-form-item
          label="被检查企业/单位名称:"
          prop="targetName"
        >
          <el-input
            v-model.trim="searchForm.targetName"
            placeholder="请输入被检查企业/单位名称"
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
          label="已完成复查:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              label="已完成"
              :value="1"
            />
            <el-option
              label="未完成"
              :value="2"
            />
            <el-option
              label="整改中"
              :value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="复查要求时间:"
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
          label="复查单位:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="searchForm.organizationName"
            placeholder="请输入复查单位"
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
        <el-table-column
          label="检查项"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属检查计划"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.planningName }}
          </template>
        </el-table-column>
        <el-table-column
          label="被检查企业/单位名称"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.targetName }}
          </template>
        </el-table-column>
        <el-table-column
          label="检查单位"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.isUseUnit ? JSON.parse(scope.row.isUseUnit).join('，') : '' }}
          </template>
        </el-table-column>
        <el-table-column label="已完成整改" width="100">
          <template v-slot="scope">
            {{ scope.row.improve ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="已完成复查" width="120">
          <template v-slot="scope">
            {{ scope.row.isStatus===1?'已完成':(scope.row.isStatus===2?'未完成':'整改中') }}
          </template>
        </el-table-column>
        <el-table-column label="复查要求时间" width="120">
          <template v-slot="scope">
            {{ scope.row.reviewTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="复查单位"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.organizationName }}
          </template>
        </el-table-column>
        <el-table-column label="实际复查时间" width="120">
          <template v-slot="scope">
            {{ scope.row.reviewDate }}
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
import { dataAnalysisList } from '@/api/general-services/safety-supervision-and-inspection/reviewRecord'
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
        name: '',
        planningName: '',
        targetName: '',
        isUseUnit: '',
        isStatus: '',
        organizationName: ''
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
      const [ startTime, endTime ] = this.timeList || []
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
      this.$router.push({ path: '/safe/supervise/reviewDetail', query: { id: item ? item.id : null, disabled: 1 }})
    }
  }
}
</script>
