<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 2 ? '航道养护月报上传规范' : '年度航道养护情况上传规范'" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          :label="type === 2 ? '月份' : '年份'"
          prop="timeInfo"
        >
          <el-date-picker
            v-model="searchForm.timeInfo"
            :type="type === 2 ? 'month' : 'year'"
            :placeholder="type === 2 ? '请选择月份' : '请选择年份'"
            style="width: 100%;"
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
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="handleEdit('add')"
          >
            {{ type === 2 ? '新增月份航道养护情况上传规范' : '新增年度航道养护情况上传规范' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="编号"
        width="55"
      >
        <template v-slot="scope">
          {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="type === 2 ? '月份' : '年份'">
        <template v-slot="scope">
          {{ scope.row.timeInfo }}
        </template>
      </el-table-column>
      <el-table-column label="上报时段">
        <template v-slot="scope">
          {{ `${scope.row.reportingStart} - ${scope.row.reportingEnd}` }}
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template v-slot="scope">
          {{ scope.row.createBy }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="120"
      >
        <template v-slot="scope">
          <el-button
            size="small"
            @click="handleEdit('detail', scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleEdit('edit', scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            v-if="scope.row.isOver === 0"
            size="small"
            type="danger"
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
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import { getPageList, deleteInfo } from '@/api/channel-services/channel/channel-report'
export default {
  components: {
    pagination
  },
  data() {
    return {
      type: null, // *2.月报 3.年报
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        timeInfo: ''
      }
    }
  },
  created() {
    const { type } = this.$route.query
    this.type = type
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getPageList({
        timeInfo: momentDate(this.searchForm.timeInfo, this.type === 2 ? 'YYYY-MM' : 'YYYY'),
        type: this.type,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/channel/claimEdit', query: { id: item ? item.id : null, type, infoType: this.type }})
    },
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    },
    returnBack() {
      if (this.type === 2) this.$router.push({ path: '/digital/channel/month' })
      if (this.type === 3) this.$router.push({ path: '/digital/channel/year' })
    }
  }
}
</script>
