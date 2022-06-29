<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全检查计划查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="计划名称:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入计划名称"
          />
        </el-form-item>
        <el-form-item
          label="计划类型:"
          prop="categoryId"
        >
          <el-select
            v-model="searchForm.categoryId"
            clearable
            placeholder="请选择计划类型"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="检查单位:"
          prop="isUseUnit"
        >
          <el-input
            v-model.trim="searchForm.isUseUnit"
            placeholder="请输入检查单位"
          />
        </el-form-item>
        <el-form-item
          label="检查时间:"
          prop="planningTime"
        >
          <el-date-picker
            v-model="searchForm.planningTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="是否邀请专家:"
          prop="isExpertInvited"
        >
          <el-select
            v-model="searchForm.isExpertInvited"
            clearable
            placeholder="请选择是否邀请专家"
          >
            <el-option
              label="是"
              :value="1"
            />
            <el-option
              label="否"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发布状态:"
          prop="publishStatus"
        >
          <el-select
            v-model="searchForm.publishStatus"
            clearable
            placeholder="请选择发布状态"
          >
            <el-option
              label="已发布"
              :value="1"
            />
            <el-option
              label="未发布"
              :value="0"
            />
          </el-select>
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
        <el-table-column
          label="计划名称"
          prop="planningName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="计划类型"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.categoryName }}
          </template>
        </el-table-column>
        <el-table-column
          label="检查单位"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.isUseUnit ? JSON.parse(scope.row.isUseUnit).join('，'): '' }}
          </template>
        </el-table-column>
        <el-table-column label="检查时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planningTime }}
          </template>
        </el-table-column>
        <el-table-column label="是否邀请专家" width="120">
          <template v-slot="scope">
            <el-tag
              size="mini"
              :type="scope.row.isExpertInvited ? 'success' : 'primary'"
            >
              {{ scope.row.isExpertInvited ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" width="120" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag
              size="mini"
              :type="scope.row.publishStatus ? 'success' : 'danger'"
            >
              {{ scope.row.publishStatus ? '已发布' : '未发布' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
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
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { dataAnalysisList } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
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
      categoryList:  [],
      searchForm: {
        planningName: '',
        categoryId: ''
      }
    }
  },
  async mounted() {
    this.categoryList = (await findByCategoryList({type: 1})).data
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
      dataAnalysisList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
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
    handleDetail(item) {
      this.$router.push({ path: '/safe/supervise/planDetail', query: { id: item ? item.id : null, disabled: 1 }})
    }
  }
}
</script>
