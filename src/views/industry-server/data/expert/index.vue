<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>专家资料</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="姓名:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="专家类别:"
          prop="category"
        >
          <el-input
            v-model.trim="searchForm.category"
            placeholder="请输入专家类别"
          />
        </el-form-item>
        <el-form-item
          label="职务:"
          prop="post"
        >
          <el-input
            v-model.trim="searchForm.post"
            placeholder="请输入职务"
          />
        </el-form-item>
        <el-form-item
          label="技术职称:"
          prop="technicalTitle"
        >
          <el-input
            v-model.trim="searchForm.technicalTitle"
            placeholder="请输入技术职称"
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
        v-if="button_roles.create"
        style="float: left; margin-right: 10px;"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        新增专家资料
      </el-button>
      <DownUpload
        filename="专家资料导入模板.xlsx"
        :button_roles="button_roles"
        @uploadExcel="uploadExcel"
        @getExportData="getExportData"
      />
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
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="专家类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.category }}
          </template>
        </el-table-column>
        <el-table-column label="职务" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.post }}
          </template>
        </el-table-column>
        <el-table-column label="技术职称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.technicalTitle }}
          </template>
        </el-table-column>
        <el-table-column label="所学专业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.major }}
          </template>
        </el-table-column>
        <el-table-column label="工作单位位及部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="现从事岗位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.currentPosition }}
          </template>
        </el-table-column>
        <el-table-column label="手机">
          <template v-slot="scope">
            {{ scope.row.mobilePhone }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
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
    </div>
  </el-card>
</template>

<script>
import DownUpload from '@/components/features/DownUpload'
import { getPageList, deleteExpert, bulkImport } from '@/api/general-services/public-information/expert'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    DownUpload
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      searchForm: {
        name: '',
        category: '',
        post: '',
        technicalTitle: ''
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
    handleAdd() {
      this.$router.push({ path: '/data/expertAdd', query: { type: 'add', id: null } })
    },
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    async uploadExcel(formData, end) {
      const res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    getExportData(cb) {
      const queryInfo = { ...this.searchForm,  pageNum: this.currentPage, pageSize: this.pageSize }
      getPageList(queryInfo).then(res => {
        const table = res.data ? res.data.records : []
        const header = {
          id: '序号',
          name: '专家姓名',
          dateBirth: '出生年月',
          category: '专家类别',
          post: '专家职务',
          departmentName: '工作单位及部门',
          technicalTitle: '技术职称',
          major: '所学专业',
          currentPosition: '现从事岗位',
          fixedPhone: '固定电话',
          mobilePhone: '移动电话',
          email: 'E-mail',
          mainAchievements: '主要安全工作业绩'
        }
        const arr = [...table.map(x => ({
          id: x.id,
          name: x.name,
          dateBirth: x.dateBirth,
          category: x.category,
          post: x.post,
          departmentName: x.departmentName,
          technicalTitle: x.technicalTitle,
          major: x.major,
          currentPosition: x.currentPosition,
          fixedPhone: x.fixedPhone,
          mobilePhone: x.mobilePhone,
          email: x.email,
          mainAchievements: (x.mainAchievements)?.replace(/<[^>]+>/g, '')
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '专家资料' })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(_, item) {
      this.$router.push({ path: '/data/expertAdd', query: { id: item.id }})
    },
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteExpert(item.id).then(res => {
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

