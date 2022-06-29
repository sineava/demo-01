<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>风险事件与制险因素</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="风险作业单元名称:"
          prop="activityName"
        >
          <el-input
            v-model.trim="searchForm.activityName"
            placeholder="请输入风险作业单元名称"
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="风险作业单元名称"
          prop="activityName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="所属风险范围"
          prop="scopeName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="企业类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ options[scope.row.enterpriseType - 1].val }}
          </template>
        </el-table-column>
        <el-table-column
          label="风险事件数量"
          prop="incidentNum"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="更新时间"
          prop="updateTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column v-if="button_roles.update" label="操作" width="140">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 风险事件管理
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
import { pageHyList } from '@/api/port-services/risk-identification/risk-incident'
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
        activityName: ''
      },
      options: [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
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
      pageHyList(data).then(res => {
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
     * 风险事件管理
     */
    handleDetail(item) {
      this.$router.push({ path: '/risk/eventList', query: { id: item.id, activityName: item.activityName, enterpriseName: item.enterpriseName }})
    }
  }
}
</script>

