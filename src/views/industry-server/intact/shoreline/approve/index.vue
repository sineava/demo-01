<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>岸线审批信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="建筑项目名称"
          prop="constructionProjectName"
        >
          <el-input
            v-model.trim="searchForm.constructionProjectName"
            placeholder="请输入建筑项目名称"
          />
        </el-form-item>
        <el-form-item
          label="岸线类型:"
          prop="coastlineCategory"
        >
          <el-select
            v-model="searchForm.coastlineCategory"
            clearable
            placeholder="请选择岸线类型"
          >
            <el-option
              label="深水岸线"
              value="深水岸线"
            />
            <el-option
              label="非深水岸线"
              value="非深水岸线"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="申请单位名称:"
          prop="orgName"
        >
          <el-input
            v-model.trim="searchForm.orgName"
            placeholder="请输入申请单位名称"
          />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contacts"
        >
          <el-input
            v-model.trim="searchForm.contacts"
            placeholder="请输入联系人"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="contactsPhone"
        >
          <el-input
            v-model.trim="searchForm.contactsPhone"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item label="批复时间:">
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
        <el-table-column label="建筑项目名称">
          <template v-slot="scope">
            {{ scope.row.constructionProjectName }}
          </template>
        </el-table-column>
        <el-table-column label="岸线类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.coastlineCategory }}
          </template>
        </el-table-column>
        <el-table-column label="岸线使用功能" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.useFunction }}
          </template>
        </el-table-column>
        <el-table-column label="申请单位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.orgName }}
          </template>
        </el-table-column>
        <el-table-column label="联系人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.contacts }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.contactsPhone }}
          </template>
        </el-table-column>
        <el-table-column label="岸线申请位置" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applyCoastlineLocation }}
          </template>
        </el-table-column>
        <el-table-column label="岸线使用长度" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applyCoastlineLength }}
          </template>
        </el-table-column>
        <el-table-column label="岸线批复文号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.approvalNumber }}
          </template>
        </el-table-column>
        <el-table-column label="岸线批复时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.approvalDate }}
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
import { momentDate } from '@/utils/index'
import { getInPageList } from '@/api/port-services/coastline/coastline-approval'
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
      row: '',
      screenTime: [],
      searchForm: {
        constructionProjectName: '',
        coastlineCategory: '',
        orgName: '',
        contacts: '',
        contactsPhone: ''
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
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getInPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59'),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
    submitForm() {
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
    handleDetail(item) {
      this.$router.push({ path: '/intact/shoreline/approve/detail', query: { id: item ? item.id : null }})
    }
  }
}
</script>
