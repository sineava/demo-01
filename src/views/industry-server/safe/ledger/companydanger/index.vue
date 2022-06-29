<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业自查隐患信息记录</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="自查名称:"
          prop="examineName"
        >
          <el-input
            v-model.trim="searchForm.examineName"
            placeholder="请输入自查名称"
          />
        </el-form-item>
        <el-form-item
          label="危险等级:"
          prop="riskLevel"
        >
          <el-select
            v-model="searchForm.riskLevel"
            clearable
            placeholder="请选择危险等级"
          >
            <el-option
              v-for="item in riskLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            placeholder="请选择是否整改"
          >
            <el-option
              v-for="item in isStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            placeholder="请选择整改时限"
            style="width: 220px;"
          >
            <el-option
              v-for="item in timeRequirement"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="企业名称"
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.examineName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查项" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="危险等级" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span><el-tag :type="scope.row.riskLevel === 2 ? 'danger' : 'warning'">{{ scope.row.riskLevel===2 ? '重大' : '一般' }}</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column label="是否存在问题" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span><el-tag :type="scope.row.isProblem === 0 ? 'success' : (scope.row.isProblem === 1? 'danger':'warning' )">{{ scope.row.isProblem === 0 ? '检查正常' : (scope.row.isProblem === 1? '存在问题':'存在隐患' ) }}</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column label="是否整改" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span><el-tag :type="scope.row.isStatus ? 'danger' : 'success'">{{ scope.row.isStatus ? '是' : '否' }}</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column label="整改审核" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.timeRequirement }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开展时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.launchTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改截止时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.deadlineDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改责任人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.directorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改落实资金" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.fund }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row, 1)"
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
import { getHyList } from '@/api/general-services/enterprise-self-ledger/companydanger'
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
      searchForm: {
        examineName: '',
        isStatus: '',
        riskLevel: '',
        timeRequirement: ''
      },
      isStatus: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      riskLevel: [
        { value: 1, label: '一般' },
        { value: 2, label: '重大' }
      ],
      timeRequirement: [
        { value: '停业整改', label: '停业整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '立即整改', label: '立即整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ]
    }
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
      this.searchForm.pageSize = this.pageSize
      this.searchForm.pageNum = this.currentPage
      getHyList(this.searchForm).then(response => {
        this.listLoading = false
        this.total = response.data ? response.data.total : 0
        this.list = response.data ? response.data.records : []
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
     * 详情
     */
    handleDetail(item, disabled) {
      this.$router.push({ path: '/safe/ledger/companydangerDetail', query: { id: item.id, disabled: disabled }})
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
    }
  }
}
</script>

