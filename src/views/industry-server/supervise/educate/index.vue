<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>教育培训</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="部门名称:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="searchForm.departmentName"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item
          label="培训科目:"
          prop="trainSubject"
        >
          <el-input
            v-model.trim="searchForm.trainSubject"
            placeholder="请输入培训科目"
          />
        </el-form-item>
        <el-form-item
          label="培训方式:"
          prop="trainModes"
        >
          <el-input
            v-model.trim="searchForm.trainModes"
            placeholder="请输入培训方式"
          />
        </el-form-item>
        <el-form-item label="填报时间:">
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
      </el-form>
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleDetail('add')"
      >
        新增教育培训
      </el-button>
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
        <el-table-column label="部门名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="培训科目" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainSubject }}
          </template>
        </el-table-column>
        <el-table-column label="培训方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainModes }}
          </template>
        </el-table-column>
        <el-table-column label="培训对象" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.trainObject }}
          </template>
        </el-table-column>
        <el-table-column label="填报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reporterPerson }}
          </template>
        </el-table-column>
        <el-table-column label="填报人联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reporterPhone }}
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.reportedTime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <em class="el-icon-info" /> 删除
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
import { getPageList, deleteTraining } from '@/api/general-services/educateTrain/management-training'
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
      screenTime: [],
      searchForm: {
        departmentName: '',
        trainSubject: '',
        trainModes: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const [startTime, endTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: startTime ? momentDate(startTime,'YYYY-MM-DD 23:59:59') : '',
        endTime: endTime ? momentDate(endTime,'YYYY-MM-DD 23:59:59') : ''
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    handleDetail(type, item) {
      this.$router.push({ path: '/supervise/educateDetail', query: { id: item ? item.id : null, type }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteTraining({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    }
  }
}
</script>

