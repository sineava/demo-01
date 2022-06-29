<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业人员信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="人员类型:"
          prop="personType"
        >
          <el-select v-model="searchForm.personType" clearable placeholder="请选择人员类型">
            <el-option label="一般人员" :value="1" />
            <el-option label="安全管理人员" :value="2" />
            <el-option label="装卸管理人员" :value="3" />
            <el-option label="其他管理人员" :value="4" />
            <el-option label="环保管理人员" :value="5" />
            <el-option label="经营管理人员" :value="6" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="员工姓名:"
          prop="fullName"
        >
          <el-input
            v-model.trim="searchForm.fullName"
            placeholder="请输入员工姓名"
          />
        </el-form-item>
        <el-form-item
          label="所属企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
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
      <div style="margin:0 0 10px 0;">
        <el-button
          v-if="button_roles.create"
          type="primary"
          style="float:left;margin-right:10px;"
          size="small"
          icon="el-icon-plus"
          @click="handleAddEdit"
        >
          新增人员
        </el-button>
        <DownUpload
          filename="企业人员信息导入模板.xlsx"
          :button_roles="button_roles"
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="员工姓名"
          prop="fullName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="人员类型"
          prop="personType"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getpersonType(scope.row.personType) }}
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.sex === 0 ? '女' : '男' }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          label="所属机构"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="岗位"
          prop="position"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="办公电话"
          prop="officeTelephone"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="持证类型"
          prop="certificateType"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="证书名称"
          prop="certificateName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="证书有效期至"
          prop="validityDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.delete ||button_roles.desc"
          label="操作"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              plain
              @click="handleAddEdit(scope.row)"
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
import DownUpload from '@/components/features/DownUpload'
import pagination from '@/components/Pagination'
import {
  pageEnList,
  deletePerson,
  exportEnPerson,
  importGlPerson
} from '@/api/general-services/enterpriseInfo/enterprisePerson'
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
      searchForm: {
        enterpriseName: '',
        fullName: '',
        personType: ''
      }
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
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      const queryInfo = { ...this.searchForm }
      exportEnPerson(queryInfo).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          fullName: '员工姓名',
          personType:'人员类型',
          sex: '性别',
          enterpriseName: '所属企业名称',
          organizationName: '所属机构',
          position: '岗位',
          officeTelephone: '办公电话',
          certificateType: '持证类型',
          certificateName: '证书名称',
          validityDate: '有效期至'
        }
        const arr = [...this.table.map(x => ({
          fullName: x.fullName,
          personType:this.getpersonType(x.personType),
          sex: x.sex ? '男' : '女',
          enterpriseName: x.enterpriseName,
          organizationName: x.organizationName,
          position: x.position,
          officeTelephone: x.officeTelephone,
          certificateType: x.certificateType,
          certificateName: x.certificateName,
          validityDate: x.validityDate
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '企业人员信息' })
      })
    },
    getpersonType(personType){
      let name = ''
      switch (Number(personType)){
      case 1:
        name = '一般人员'
        break
      case 2:
        name = '安全管理人员'
        break
      case 3:
        name = '装卸管理人员'
        break
      case 4:
        name = '其他管理人员'
        break
      case 5:
        name = '环保管理人员'
        break
      default:
        name = '经营管理人员'
        break
      }
      return name
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.searchForm.personType = ''
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
     * 编辑/添加
     */
    handleAddEdit(item) {
      this.$router.push({ path: '/enterprise/basic/staffDetail', query: { id: item.id, personType: this.searchForm.personType,type:item.id?'edit':'add' }})
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/enterprise/basic/staffDetail', query: { id: item.id, personType: this.searchForm.personType, type: 'info' }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deletePerson(item.id).then(res => {
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
      let res = await importGlPerson(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
    background-color: #ffffff;
}
</style>
