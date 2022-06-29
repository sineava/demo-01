<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>检查结果公开信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item label="标题:" prop="newsTitle">
          <el-input v-model.trim="searchForm.newsTitle" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="发布处室:" prop="departmentName">
          <el-input v-model.trim="searchForm.departmentName" placeholder="请输入发布处室" />
        </el-form-item>
        <el-form-item label="检查时间:">
          <el-date-picker
            v-model="timeInterval"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布时间:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
          <el-button size="small" icon="el-icon-refresh-left" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex;">
        <el-button v-if="button_roles.create" type="primary" size="small" icon="el-icon-plus" @click="handleDetail">新增检查结果</el-button>
      </div>
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
            <span>{{ (pageSize*(currentPage-1))+scope.$index+ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="newsTitle" :show-overflow-tooltip="true" />
        <el-table-column label="发布处室" prop="departmentName" :show-overflow-tooltip="true" />
        <el-table-column label="检查时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.startTimeInterval }} - {{ scope.row.endTimeInterval }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.createBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="button_roles.update || button_roles.desc || button_roles.delete" :width="(button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0) + (button_roles.delete ? 95 : 0)">
          <template slot-scope="scope">
            <el-button
            v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, 1)"
            ><em class="el-icon-info" /> 详情</el-button>
            <el-button
             v-if="button_roles.update"
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            ><em class="el-icon-edit" /> 编辑</el-button>
            <el-button
             v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            ><em class="el-icon-delete" /> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
  </el-card>
</template>

<script>
import { pageList, deletePublic } from '@/api/general-services/safety-supervision-and-inspection/safetyPublic'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
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
        newsTitle: '',
        departmentName: '',
        startTimeInterval: '',
        endTimeInterval: '',
        screenStartTime: '',
        screenEndTime: ''
      },
      timeInterval: [],
      screenTime: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
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
      if (this.timeInterval.length > 0) {
        data.startTimeInterval = this.timeInterval[0] + ' 00:00:00'
        data.endTimeInterval = this.timeInterval[1] + ' 23:59:59'
      }
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      pageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.timeInterval = []
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
    handleDetail(item, disabled) {
      this.$router.push({ path: '/safe/supervise/publicDetail', query: { id: item.id, disabled: disabled }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deletePublic(item.id).then(res => {
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

