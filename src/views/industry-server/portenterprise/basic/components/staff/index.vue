<template>
  <div class="body-card">
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
          label="所在企业:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入所在企业"
          />
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
            style="margin-right: 10px;"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="handleDetail('','add')"
          >
            新增人员
          </el-button>
          <DownUpload
            style="display: inline-block;"
            filename="企业人员信息导入模板.xlsx"
            :show-import="false"
            @getExportData="getExportData"
          />
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="员工姓名"
          prop="fullName"
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
        >
          <template v-slot="scope">
            {{ scope.row.sex === 0 ? '女' : '男' }}
          </template>
        </el-table-column>
        <el-table-column
          label="所在企业"
          prop="enterpriseName"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="所属机构"
          prop="organizationName"
          show-overflow-tooltip
        />
        <el-table-column
          label="岗位"
          prop="position"
        />
        <el-table-column
          label="办公电话"
          prop="officeTelephone"
        />
        <el-table-column
          label="持证类型"
          prop="certificateType"
          show-overflow-tooltip
        />
        <el-table-column
          label="证书名称"
          prop="certificateName"
          show-overflow-tooltip
        />
        <el-table-column
          label="证书有效期至"
          prop="validityDate"
        />
        <el-table-column
          label="操作"
          width="270"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row,'info')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row,'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
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
  </div>
</template>

<script>
import DownUpload from '@/components/features/DownUpload'
import pagination from '@/components/Pagination'
import { pageHyList, exportHyPerson,deletePerson } from '@/api/general-services/enterpriseInfo/enterprisePerson'
export default {
  components: {
    pagination,
    DownUpload
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        enterpriseId: '',
        enterpriseName: '',
        fullName: '',
        personType: '',
        sex: ''
      }
    }
  },
  async mounted() {
    this.searchForm.enterpriseId = this.$route.query.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageHyList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    resetForm() {
      this.searchForm = {
        enterpriseId: this.searchForm.enterpriseId,
        enterpriseName: '',
        fullName: '',
        personType: '',
        sex: ''
      }
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item,type) {
      this.$emit('join', { name: '人员详情', data: { id: item.id,type:type,enterpriseId:this.$route.query.id,enterpriseName:this.$route.query.name, organizationName: item.organizationName, personType: this.searchForm.personType }})
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
     * 获取导出数据
     */
    getExportData(cb) {
      const queryInfo = { ...this.searchForm }
      exportHyPerson(queryInfo).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          fullName: '员工姓名',
          personType:'人员类型',
          sex: '性别',
          enterpriseName: '所在企业',
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
    }
  }
}
</script>
