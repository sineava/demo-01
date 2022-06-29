<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>制度信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名:"
          prop="regimeName"
        >
          <el-input
            v-model.trim="searchForm.regimeName"
            placeholder="请输入文件名"
          />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="regimeType"
        >
          <el-input
            v-model.trim="searchForm.regimeType"
            placeholder="请输入制度类型"
          />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="principal"
        >
          <el-input
            v-model.trim="searchForm.principal"
            placeholder="请输入负责人"
          />
        </el-form-item>
        <el-form-item
          label="适用机构:"
          prop="applicableAgenciesName"
        >
          <el-input
            v-model.trim="searchForm.applicableAgenciesName"
            placeholder="请输入适用机构"
          />
        </el-form-item>
        <el-form-item
          label="编制部门:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="searchForm.departmentName"
            placeholder="请输入编制部门"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="principalPhone"
        >
          <el-input
            v-model.trim="searchForm.principalPhone"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item
          label="有效期至:"
        >
          <el-date-picker
            v-model="searchForm.screenStartTime"
            type="date"
            style="width: 100%;"
            placeholder="请选择有效期至"
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
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="文件名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.regimeName }}
          </template>
        </el-table-column>
        <el-table-column label="制度类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.regimeType }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principal }}
          </template>
        </el-table-column>
        <el-table-column
          label="适用机构"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.applicableAgenciesName }}
          </template>
        </el-table-column>
        <el-table-column label="编制部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.compile }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principalPhone }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.validityTime }}
          </template>
        </el-table-column>
        <el-table-column label="编制时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
import { momentDate } from '@/utils/index'
import { getRegimeList } from '@/api/general-services/intact'
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
      screenTime: [],
      searchForm: {
        regimeName: '',
        regimeType: '',
        principal: '',
        applicableAgenciesName: '',
        departmentName: '',
        principalPhone: '',
        screenStartTime:''
      }
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
        screenStartTime: momentDate(this.searchForm.screenStartTime),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getRegimeList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm.screenStartTime = ''
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/intact/supervision/rule/detail', query: { id: item.id }})
    }
  }
}
</script>
