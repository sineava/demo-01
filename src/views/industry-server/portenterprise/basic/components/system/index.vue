<template>
  <div class="body-card">
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名称:"
          prop="fileName"
        >
          <el-input v-model.trim="searchForm.fileName" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="systemType"
        >
          <el-select
            v-model="searchForm.systemType"
            clearable
            placeholder="请选择制度类型"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="编制负责人:"
          prop="directorName"
        >
          <el-input v-model.trim="searchForm.directorName" placeholder="请输入编制负责人" />
        </el-form-item>
        <el-form-item label="有效期至:">
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名称"
          prop="fileName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="制度类型">
          <template v-slot="scope">
            <span>{{ type[scope.row.systemType - 1].label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="编制部门"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="编制负责人"
          prop="directorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="编制时间"
          prop="expiryStartDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="联系电话"
          prop="phone"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="有效期至"
          prop="expiryEndDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
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
              <em class="el-icon-edit" />详情
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
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import { pageEnList } from '@/api/general-services/enterpriseInfo/enterpriseBasic'
import { findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
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
        enterpriseId: '',
        fileName: '',
        systemType: '',
        directorName: ''
      },
      screenTime: [],
      type: [
        { value: '1', label: '人力资源管理制度' },
        { value: '2', label: '安全管理制度' },
        { value: '3', label: '财务管理制度' },
        { value: '4', label: '行政管理制度' },
        { value: '5', label: '物资管理制度' },
        { value: '6', label: '生产管理制度' },
        { value: '7', label: '销售管理制度' },
        { value: '8', label: '质量管理制' }
      ],
      departmentList: []
    }
  },
  async mounted() {
    const res = await findByEnOrganizationList()
    this.departmentList = res.data
    this.searchForm.enterpriseId = this.$route.query.id
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
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]+' 23:59:59'
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
     * 详情
     */
    handleDetail(item) {
      this.$emit('join', { name: '制度详情', data: { id: item.id }})
    }
  }
}
</script>
