<template>
  <div>
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <el-form-item
        label="名称:"
        prop="name"
      >
        <el-input
          v-model.trim="searchForm.name"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item
        label="更新时间:"
        prop="screenTime"
      >
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
          @click="search"
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
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleDetail({}, true)"
      >
        新增
      </el-button>
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
      <div />
      <el-table-column
        label="序号"
        width="65"
      >
        <template v-slot="scope">
          {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="机构名称"
        prop="name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="概述"
        prop="summary"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="更新时间"
        prop="updateTime"
      />
      <el-table-column
        label="操作"
        width="280"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleDetail(scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.row, true)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
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
import pagination from '@/components/Pagination'
import { getList, deleteData } from '@/api/data-management/overall-distribution/organization'
export default {
  components: {
    pagination
  },
  props: {
    tabs: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: ''
      },
      screenTime: [],
    }
  },
  async mounted() {
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
      const [ startTime, endTime ] = this.screenTime || []
      data.screenStartTime = startTime
      data.screenEndTime = endTime ? endTime+' 23:59:59' : ''
      getList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
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
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 详情
     */
    handleDetail(item, isEdit) {
      this.$router.push({ path: '/digital/resources/distribution/detail', query: { id: item.id || '', isEdit: isEdit?isEdit:false, tabs: this.tabs }})
    }
  }
}
</script>

