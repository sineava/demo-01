<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门制度信息查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="serachForm"
        :model="serachForm"
        :inline="true"
        size="small"
        class="system-form"
      >
        <el-form-item
          label="文件名:"
          prop="regimeName"
        >
          <el-input
            v-model.trim="serachForm.regimeName"
            placeholder="请输入文件名"
          />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="regimeType"
        >
          <el-input
            v-model.trim="serachForm.regimeType"
            placeholder="请输入制度类型"
          />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="principal"
        >
          <el-input
            v-model.trim="serachForm.principal"
            placeholder="请输入负责人"
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
            @click="resetForm('serachForm')"
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
        <el-table-column label="适用机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applicableAgenciesName }}
          </template>
        </el-table-column>
        <el-table-column label="编制时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.createTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column label="编制部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.compile }}
          </template>
        </el-table-column>
        <el-table-column label="编制负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principal }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principalPhone }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.validityTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
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
import { getRegimeList } from '@/api/general-services/intact'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      serachForm: {
        regimeName: '',
        regimeType: '',
        principal: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.serachForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getRegimeList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    handleDetail(index, item) {
      this.$router.push({ path: '/material/supervision/deptDetail', query: { id: item.id, applicableAgenciesName: item.applicableAgenciesName, departmentName: item.departmentName }})
    }
  }

}
</script>
