<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>建设项目信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="项目名称:"
          prop="projectName"
        >
          <el-input
            v-model.trim="searchForm.projectName"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="项目级别:"
          prop="projectLevel"
        >
          <el-select
            v-model="searchForm.projectLevel"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in projectLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="投资来源:"
          prop="investmentSource"
        >
          <el-select
            v-model="searchForm.investmentSource"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in investmentSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <div>
        <el-button
          v-if="button_roles.create"
          style="float: left; margin-right: 10px;"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleDetail('add')"
        >
          添加建设项目信息
        </el-button>
        <DownUpload
          :button_roles="button_roles"
          filename="建设项目信息导入模板.xlsx"
          @uploadExcel="uploadExcel"
          @getExportData="getExportData"
        />
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="建设单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column label="建设类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.type && types.filter(item => (item.value === scope.row.type))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="建设性质" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.nature && nature.filter(item => (item.value === scope.row.nature))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="项目级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.projectLevel && projectLevel.filter(item => (item.value === scope.row.projectLevel))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="投资来源" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.investmentSource && investmentSource.filter(item => (item.value === scope.row.investmentSource))[0].label }}
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
              @click="handleInfo('detail', scope.row)"
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
import { getPageList, deleteInfo, bulkImport, exportList } from '@/api/port-services/construction-dangerous-goods/construction-project'
import pagination from '@/components/Pagination'
import { constructionProject } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    DownUpload
  },
  mixins: [constructionProject],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      searchForm: {
        investmentSource: '',
        projectName: '',
        projectLevel: ''
      },
      types: [
        { value: 1, label: '港口' },
        { value: 2, label: '航道' },
        { value: 3, label: '防波堤' },
        { value: 4, label: '码头' },
        { value: 5, label: '其他' }
      ]
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
    /**
     * 查询列表数据
     */
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
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
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
    handleInfo(type, item) {
      this.$router.push({ path: '/danger/buildInfo', query: { type, id: item ? item.id : null }})
    },
    /**
     * 添加/编辑
     */
    handleDetail(type, item) {
      this.$router.push({ path: '/danger/buildDetail', query: { type, id: item ? item.id : null }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 导入人员表格
     */
    async uploadExcel(formData, end) {
      const res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      exportList({ ...this.searchForm }).then(res => {
        const table = res.data ? res.data : []
        const header = {
          enterpriseName: '建设单位',
          projectName:'建设项目名称',
          type:'建设类别',
          nature:'建设性质',
          projectLevel:'项目级别',
          investmentSource: '投资来源',
          address: '工程地址',
          departmentLevel: '立项部门级别',
          totalPlannedInvestment: '计划总投资',
          planTotalDate: '计划总工期',
          planStartDate: '计划开工日期',
          planEndDate: '计划完工日期',
          actualStartDate: '实际开工日期',
          actualEndDate: '实际完成日期',
          mainArticleName: '装卸/储存主要危险货物品名',
          generalSituation: '建设项目概况',
          postalCode: '邮政编码'
        }
        const arr = [...table.map(x => ({
          enterpriseName: x.enterpriseName,
          projectName:x.projectName,
          type:x.type && this.types.filter(item => (item.value === x.type))[0].label,
          nature: x.nature && this.nature.filter(item => (item.value === x.nature))[0].label,
          projectLevel:x.projectLevel && this.projectLevel.filter(item => (item.value === x.projectLevel))[0].label,
          investmentSource: x.investmentSource && this.investmentSource.find(y => y.value === x.investmentSource).label,
          address: x.address,
          departmentLevel: x.departmentLevel && this.departmentLevel.find(y => y.value === x.departmentLevel).label,
          totalPlannedInvestment: x.totalPlannedInvestment,
          planTotalDate: x.planTotalDate,
          planStartDate: x.planStartDate,
          planEndDate: x.planEndDate,
          actualStartDate: x.actualStartDate,
          actualEndDate: x.actualEndDate,
          mainArticleName: x.mainArticleName,
          generalSituation: x.generalSituation,
          postalCode: x.postalCode
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '建设项目信息' })
      })
    }
  }
}
</script>

