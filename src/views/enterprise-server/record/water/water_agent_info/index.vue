<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路代理企业备案</span>
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
            placeholder="请输入企业名称/法定代表人"
          />
        </el-form-item>
        <el-form-item
          label="申请业务类型:"
          prop="appliedBusinessType"
        >
          <el-select
            v-model="searchForm.appliedBusinessType"
            placeholder="请选择申请业务类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增水路代理企业备案
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
          label="企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="企业类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ getEnterpriseTypeName(scope.row.enterpriseType) }}
          </template>
        </el-table-column>
        <el-table-column
          label="法人姓名"
          :show-overflow-tooltip="true"
          prop="legalPersonName"
        />
        <el-table-column
          label="行政区划"
          :show-overflow-tooltip="true"
          prop="administrativeDivision"
        />
        <el-table-column label="申请业务种类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ options[scope.row.appliedBusinessType -1].label }}
          </template>
        </el-table-column>
        <el-table-column
          label="提交时间"
          prop="createTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="审核状态">
          <template v-slot="scope">
            {{ scope.row.isStatus===1?'审核中':(scope.row.isStatus===2?'退回':'审核通过') }}
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="reviewedDate"
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
import { pageEnList } from '@/api/water-transportation-services/keep-on-record/wt-auxiliary-opening-filing'
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
        keyword: '',
        accidentLevel: ''
      },
      screenTime: [],
      options: [{
        value: 1,
        label: '水路旅客运输代理'
      }, {
        value: 2,
        label: '水路货物运输代理'
      }, {
        value: 3,
        label: '船舶代理'
      }]
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
      if (this.screenTime&&this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 通过type获取企业类型名称
     */
    getEnterpriseTypeName(type) {
      const list = [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
      return list.filter(item => item.key === type)[0].val
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
     * 添加
     */
    handleAdd() {
      this.$router.push({ path: '/record/water/other/addAgentInfo' })
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/record/water/other/agentInfoDetail', query: { id: item.id }})
    }
  }
}
</script>
