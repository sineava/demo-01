<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="mini"
    >
      <el-form-item
        label="姓名:"
        prop="fullName"
      >
        <el-input
          v-model="searchForm.fullName"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item
        label="审核状态:"
        prop="isStatus"
      >
        <el-select
          v-model="searchForm.isStatus"
          clearable
          placeholder="请选择作业类型"
        >
          <el-option
            v-for="item in isStatus"
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
      type="primary"
      size="small"
      icon="el-icon-plus"
      @click="handleEdit('add')"
    >
      提交申请权限
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="姓名" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="企业/单位名称" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.organizationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.post }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限申请描述" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.applicationDescription.substr(0, 20) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请原因" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.applicationReason.substr(0, 20) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.isStatus && isStatus.filter(item => (item.value === scope.row.isStatus))[0].label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="受理时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.acceptorDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            plain
            @click="handleEdit('detail', scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            :disabled="scope.row.isStatus === 2"
            @click="handleEdit('edit', scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            :disabled="scope.row.isStatus !== 1"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <em class="el-icon-delete" /> 删除
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
</template>
<script>
import { momentDate } from '@/utils/index'
import { getUserAuthorityList, deleteAuthority } from '@/api/system-portal/authority-application'
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
        fullName: '',
        isStatus: ''
      },
      isStatus: [
        { value: 1, label: '审核中' },
        { value: 2, label: '已审核' },
        { value: 3, label: '驳回' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询列表数据
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime
      getUserAuthorityList({
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.fetchData()
      })
    },
    /**
     * 重置查询条件
     */
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
     * 新增/编辑/详情
     */
    handleEdit(type, item) {
      // tab: 'add'跳转用
      this.$emit('switchOper', { payload: { id: item ? item.id : null, type, tab: 'add' }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      if (item.isStatus !== 1) {
        this.$message.warning('当前状态不能删除!')
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteAuthority({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    }
  }

}
</script>
<style  lang="scss" scoped>
.datatable {
    padding-left: 20px;

    .system-form {
        margin: 20px 0 0 0;
    }
}
</style>
