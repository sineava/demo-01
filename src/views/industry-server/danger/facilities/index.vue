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
          label="所在地市港口管理部门:"
          prop="managementName"
        >
          <el-input
            v-model.trim="searchForm.managementName"
            placeholder="请输入所在地市港口管理部门"
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        受理安全设施设计审查信息
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所在地市港口管理部门" :show-overflow-tooltip="true">
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
        <el-table-column label="审查状态" width="140" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.reviewState === 1"
            >
              已受理
            </el-tag>
            <el-tag
              v-if="scope.row.reviewState === 2"
              type="warning"
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
        <el-table-column label="负责人" width="140" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.declarePrincipal }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="140" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.declarePhone }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.handling || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.handling ? 120 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, 'detail')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.handling"
              size="mini"
              plain
              type="success"
              :disabled="scope.row.reviewState === 2 || scope.row.reviewState === 1 ? false : true"
              @click="handleEditDetail(scope.row, 'handle')"
            >
              <em class="el-icon-info" /> 业务办理
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
import { getPageList } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
import pagination from '@/components/Pagination'
import { portSafetyFacilityDesignReview } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
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
      row: '',
      searchForm: {
        managementName: '',
        declareEnterpriseName: '',
        projectName: ''
      }
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
    // 查询列表数据
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    // 查询
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
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    // 换页
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 受理安全设施设计审查信息
    handleAdd() {
      this.$router.push({ path: '/danger/facilitiesAdd' })
    },
    // 办理业务
    handleEditDetail(item, type) {
      this.$router.push({ path: '/danger/facilitiesInfo', query: { id: item.id, type }})
    },
    // 详情
    handleDetail(item, type) {
      this.$router.push({ path: '/danger/facilitiesInfo', query: { id: item.id, type }})
    }
  }
}
</script>
