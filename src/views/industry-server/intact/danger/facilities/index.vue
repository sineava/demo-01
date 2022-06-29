<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全设施设计审查信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="港口管理部门:"
          prop="managementName"
        >
          <el-input
            v-model.trim="searchForm.managementName"
            placeholder="请输入港口管理部门"
          />
        </el-form-item>
        <el-form-item
          label="申请单位名称:"
          prop="declareEnterpriseName"
        >
          <el-input
            v-model.trim="searchForm.declareEnterpriseName"
            placeholder="请输入申请单位名称"
          />
        </el-form-item>
        <el-form-item
          label="项目名称:"
          prop="projectName"
        >
          <el-input
            v-model.trim="searchForm.projectName"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="审查结果:"
          prop="reviewState"
        >
          <el-select
            v-model="searchForm.reviewState"
            clearable
            placeholder="请选择审查结果"
          >
            <el-option
              v-for="item in reviewState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="declarePrincipal"
        >
          <el-input
            v-model.trim="searchForm.declarePrincipal"
            placeholder="请输入负责人"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="declarePhone"
        >
          <el-input
            v-model.trim="searchForm.declarePhone"
            placeholder="请输入联系电话"
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
        <el-table-column label="港口管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="申请单位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column label="审查状态" width="120" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.reviewState === 2"
              type="primary"
            >
              审核中
            </el-tag>
            <el-tag
              v-if="scope.row.reviewState === 3"
              type="success"
            >
              审核通过
            </el-tag>
            <el-tag
              v-if="scope.row.reviewState === 4"
              type="danger"
            >
              退回
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.declarePrincipal }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.declarePhone }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row, 'detail')"
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
import { getInPageList } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
import pagination from '@/components/Pagination'
import { portSafetyFacilityDesignReview } from '@/utils/public-fields'
export default {
  components: {
    pagination
  },
  mixins: [portSafetyFacilityDesignReview],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        managementName: '',
        declareEnterpriseName: '',
        projectName: '',
        reviewState: '',
        declarePrincipal: '',
        declarePhone: ''
      },
      reviewState: [
        { value: 1, label: '已受理' },
        { value: 2, label: '审核中' },
        { value: 3, label: '审核通过' },
        { value: 4, label: '退回' }
      ]
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
      getInPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item, type) {
      this.$router.push({ path: '/intact/danger/facilities/detail', query: { id: item.id, type }})
    }
  }
}
</script>
