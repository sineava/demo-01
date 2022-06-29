<template>
  <div class="container">
    <div v-if="type === 'list'">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="单位名称:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="searchForm.organizationName"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item
          label="姓名:"
          prop="fullName"
        >
          <el-input
            v-model.trim="searchForm.fullName"
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
            placeholder="请选择"
            style="width: 100%;"
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
        <el-table-column label="单位/部门名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.organizationName }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.fullName }}
          </template>
        </el-table-column>
        <el-table-column label="申请材料" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span
              v-for="(item, index) in scope.row.materials ? JSON.parse(scope.row.materials) : []"
              :key="index"
            >
              {{ item.fileName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.isStatus && isStatus.filter(item => (item.value === scope.row.isStatus))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="申请时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.isStatus !== 1"
              @click="handleDetail('edit', scope.row)"
            >
              审核
            </el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.isStatus !== 1"
              @click="handleReject(scope.$index, scope.row)"
            >
              驳回
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
    <reject
      ref="reject"
      @playEnd="handlePlayEnd"
    />
    <detail
      v-if="type === 'detail'"
      :payload="payload"
      @playEnd="handlePlayEnd"
    />
  </div>
</template>
<script>
import { momentDate } from '@/utils/index'
import { getAuthorityList } from '@/api/system-portal/authority-application'
import pagination from '@/components/Pagination'
import reject from './reject'
import detail from './detail'
export default {
  components: {
    pagination,
    reject,
    detail
  },
  props:{
    queryType:{
      type:String,
      default:'list'
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      type: 'list',
      screenTime: [],
      searchForm: {
        organizationName: '',
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
  mounted() {
    this.fetchData()
  },
  methods: {
    switchList(){
      this.type = 'list'
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getAuthorityList({
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
        if (valid) {
          this.fetchData()
        } else {

          return false
        }
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
     * 详情
     */
    handleDetail(type, item) {
      this.payload = { id: item ? item.id : null, type }
      this.type = 'detail'
    },
    /**
     * 驳回
     */
    handleReject(index, item) {
      this.$refs.reject.openReject('驳回操作', { id: item.id })
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    /**
     * 返回
     */
    handlePlayEnd() {
      this.type = 'list'
      this.fetchData()
    }
  }

}
</script>
<style  lang="scss" scoped>
.system-form {
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 150px;
    }

    .el-form-item__content {
        margin-left: 10px;
    }
}
</style>
