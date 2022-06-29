<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>重大隐患备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称/重大隐患名称:"
          prop="threatName"
        >
          <el-input
            v-model.trim="searchForm.threatName"
            placeholder="请输入企业名称/重大隐患名称"
          />
        </el-form-item>
        <el-form-item
          label="备案类型:"
          prop="filingForm"
        >
          <el-select
            v-model="searchForm.filingForm"
            clearable
            placeholder="请选择备案类型"
            style="width: 184px;"
          >
            <el-option
              v-for="item in filingFormList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间:">
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
            @click="resetForm('searchForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="add"
      >
        提交新的备案
      </el-button>
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="重大隐患名称"
          prop="threatName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="备案类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.filingForm===1?'初次备案':(scope.row.filingForm===2?'变更备案':(scope.row.filingForm===3?'注销备案':'--')) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.isStatus===1?'受理中':(scope.row.isStatus===3?'审核中':(scope.row.isStatus===4?'已审核':'退回')) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备案时间"
          prop="filingDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="提交时间"
          prop="createTime"
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
              plain
              @click="handleDetail(scope.row, false)"
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
import { pageEnList } from '@/api/port-services/record-management/major-threat-filing'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
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
      searchForm: {
        filingForm: '',
        threatName: '',
        isStatus: ''
      },
      screenTime: [],
      filingFormList: [
        { value: '1', label: '初次备案' },
        { value: '2', label: '变更备案' },
        { value: '3', label: '注销备案' }
      ],
      examineType: [
        { value: '1', label: '受理中' },
        { value: '3', label: '审核中' },
        { value: '4', label: '审核通过' },
        { value: '5', label: '退回' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      pageEnList({
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
    /**
     * 重置查询条件
     */
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
    handleDetail(row, isEdit) {
      const isAcceptance = !(this.searchForm.isStatus === 1)
      this.$router.push({ path: `/record/safe/majorDetail?isEdit=${isEdit}&isAcceptance=${isAcceptance}&id=${row.id}` })
    },
    /**
     * 添加
     */
    add() {
      this.$router.push({ path: `/record/safe/addMajor` })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>

