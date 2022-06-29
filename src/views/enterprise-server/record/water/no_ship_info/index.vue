<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>无船承运业务备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="无船承运人:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入无船承运人"
          />
        </el-form-item>
        <el-form-item
          label="备案时间:"
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
            @click="fetchData"
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
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增无船承运业务备案
        </el-button>
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
          label="无船承运人"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="法人代表"
          prop="legalPersonName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="法人身份证号码"
          prop="legalPersonCardNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="电话号码"
          prop="contactPhone"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="公司注册地"
          prop="officeAddress"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="备案时间"
          prop="filingDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
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
import pagination from '@/components/Pagination'
import { pageEnList } from '@/api/water-transportation-services/keep-on-record/non-ship-carriage-filing'
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
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
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
     * 添加
     */
    handleAdd() {
      this.$router.push({ path: '/record/water/other/addNoShipInfo' })
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/record/water/other/noShipInfoDetail', query: { id: item.id }})
    }
  }
}
</script>

