<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输企业基础信息变更备案</span>
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
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item
          label="提交时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
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
            @click="search"
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
          label="所在地市港口管理部门"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <!-- <el-table-column label="企业类型">
          <template v-slot="scope">
            {{ scope.row.enterpriseType===1?'港口企业':(scope.row.enterpriseType===2?'港口服务企业':(scope.row.enterpriseType===3?'水路运输企业':
              scope.row.enterpriseType=== 4 ? '水路运输代理企业' : (scope.row.enterpriseType === 5 ? '船舶管理企业' : '其他企业'))) }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="法定代表人"
          prop="legalPersonName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="提交时间"
          prop="createTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="审核状态">
          <template v-slot="scope">
            <el-tag :type="['primary','danger','success'][scope.row.isStatus-1]">{{ ['审核中','退回','审核通过'][scope.row.isStatus-1] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="reviewedDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.handling"
              size="mini"
              :type="scope.row.isStatus===1 ? 'primary' : 'info'"
              plain
              :disabled="scope.row.isStatus===1 ? false : true"
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 业务办理
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
import pagination from '@/components/Pagination'
import { pageHyBaseFilingList } from '@/api/water-transportation-services/keep-on-record/wt-en-base-filing'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        keyword: ''
      },
      screenTime: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime && this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      pageHyBaseFilingList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
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
    handleDetail(item, isEdit) {
      this.$router.push({ path: '/record/water/waterway/basicInfoDetail', query: { id: item.id, isEdit: isEdit }})
    }
  }
}
</script>
