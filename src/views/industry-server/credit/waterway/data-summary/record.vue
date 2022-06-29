<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="`${orgName}上报记录`" />
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
          label="信息状态:"
          prop="projectLevel"
        >
          <el-select
            v-model="searchForm.status"
            clearable
            placeholder="请选择信息状态"
          >
            <el-option label="有效" :value="1" />
            <el-option label="失效" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="上报时间:"
          prop="date"
        >
          <el-date-picker
            v-model="searchForm.date"
            type="daterange"
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
        <el-table-column label="单位" :show-overflow-tooltip="true" prop="enterpriseName" />
        <el-table-column label="上报水运企业数量" :show-overflow-tooltip="true" prop="count" />
        <el-table-column label="上报时间" :show-overflow-tooltip="true" prop="reportTime" />
        <el-table-column label="信息状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '有效数据' : '失效数据' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="95"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleInfo('detail', scope.row)"
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
import { getRecordList } from '@/api/credit/waterway/data-summary'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      date:[],
      searchForm: {
        enterpriseId:'',
        status:'',
        date:[],
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    const { orgCode, orgName } = this.$route.query
    this.orgName = orgName
    if (orgCode){
      this.searchForm.enterpriseId = orgCode
      this.fetchData()
    }
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        status:this.searchForm.status,
        enterpriseId:this.searchForm.enterpriseId,
        screenStartTime:this.searchForm.date && this.searchForm.date.length > 0 ? moment(this.searchForm.date[0]).format('YYYY-MM-DD') : '',
        screenEndTime:this.searchForm.date && this.searchForm.date.length > 0 ? moment(this.searchForm.date[1]).format('YYYY-MM-DD') : '',
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getRecordList(queryInfo).then(res => {
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
    handleInfo(type, item) {
      this.$router.push({ path: '/credit/waterway/data-summary/details', query: { type, basicId: item ? item.id : null }})
    }
  }
}
</script>

