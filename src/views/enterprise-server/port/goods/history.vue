<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="历史资质信息" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="港口经营人:"
          prop="operator"
        >
          <el-input
            v-model.trim="searchForm.operator"
            clearable
            placeholder="请输入港口经营人"
          />
        </el-form-item>
        <el-form-item label="到期时间:">
          <el-form-item prop="screenTime">
            <el-date-picker
              v-model="screenTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
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
        <el-table-column label="港口经营人">
          <template v-slot="scope">
            {{ scope.row.operator }}
          </template>
        </el-table-column>
        <el-table-column label="作业场所">
          <template v-slot="scope">
            {{ scope.row.areaType }}
          </template>
        </el-table-column>
        <el-table-column label="作业方式">
          <template v-slot="scope">
            {{ scope.row.jobType }}
          </template>
        </el-table-column>
        <el-table-column label="作业危险货物品名">
          <template v-slot="scope">
            {{ scope.row.goodsName }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间">
          <template v-slot="scope">
            {{ scope.row.maturityDate || '永久' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
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
import { momentDate } from '@/utils/index'
import { getGoodsHistory } from '@/api/general-services/enterprise-qualification/business-license'
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
      row: '',
      screenTime:[],
      searchForm: {
        operator: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  created() {
    const certificateNumber = this.$route.query.certificateNumber
    this.certificateNumber = certificateNumber
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
        pageSize: this.pageSize,
        startTime: this.screenTime[0] ? momentDate(this.screenTime[0],'yyyy-MM-DD 00:00:00') : '',
        endTime: this.screenTime[1] ? momentDate(this.screenTime[1],'yyyy-MM-DD 23:59:59') : '',
        certificateNumber: this.certificateNumber
      }
      getGoodsHistory(queryInfo).then(res => {
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
      this.fetchData()
      this.screenTime=[]
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 关闭
    returnBack() {
      this.$router.push({ path: '/enterprise/qualification/goods' })
    },
    /**
     * 详情
     */
    handleDetail(index, item) {
      this.$router.push({ path: '/enterprise/qualification/goodsDetail', query: { id: item.idccc }})
    }
  }
}
</script>
