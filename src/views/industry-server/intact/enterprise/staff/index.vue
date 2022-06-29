<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>水运专职管理人员</span>
    </div>
    <el-row :gutter="10">
      <el-col v-if="user_info.orgcategory==='1'" :span="4" class="left">
        <OrgAssembly res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
        <div class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            size="small"
            style="margin-top: 10px;"
          >
            <el-form-item label="姓名:" prop="fullName">
              <el-input v-model.trim="searchForm.fullName" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="身份证号:" prop="identificationNumber">
              <el-input v-model.trim="searchForm.identificationNumber" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="证书类型:" prop="certificateType">
              <el-input v-model.trim="searchForm.certificateType" placeholder="请输入证书类型" />
            </el-form-item>
            <el-form-item label="所在企业:" prop="enterpriseName">
              <el-input v-model.trim="searchForm.enterpriseName" placeholder="请输入所在企业" />
            </el-form-item>
             <el-form-item label="企业类型:" prop="enterpriseType">
              <el-select
                v-model="searchForm.enterpriseType"
                clearable
                placeholder="请选择企业类型"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in enterpriseTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
              <el-button size="small" icon="el-icon-refresh-left" @click="resetForm('searchForm')">重置</el-button>
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
            :height="clientHeight - 220 - 186"
            highlight-current-row
            class="table-border"
            style="margin-top:0"
          >
            <div />
            <el-table-column label="编号" width="65">
              <template v-slot="scope">
                {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" show-overflow-tooltip />
            <el-table-column label="所在企业" prop="enterpriseName" show-overflow-tooltip />
            <el-table-column label="企业类型" prop="enterpriseTypeName" show-overflow-tooltip />
            <el-table-column label="所属港航机构" prop="organizationName" show-overflow-tooltip />
            <el-table-column label="性别" prop="sexName" show-overflow-tooltip />
            <el-table-column label="身份证号" prop="identificationNumber" show-overflow-tooltip />
            <el-table-column label="职务" prop="post" show-overflow-tooltip />
            <el-table-column label="适任证书类型" prop="certificateType" show-overflow-tooltip />
            <el-table-column label="适任证书编号" prop="certificateCode" show-overflow-tooltip />
            <el-table-column label="联系电话" prop="contactNumber" show-overflow-tooltip />
            <el-table-column label="操作" width="95px">
              <template v-slot="scope">
                <el-button size="mini" plain @click="handleDetail(scope.row)">
                  <em class="el-icon-info" /> 详情
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getPageList } from '@/api/water-transportation-services/topic/enterprise-manage-person-statistics'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import OrgAssembly from '../../components/index'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      clientHeight:document.body.clientHeight,
      searchForm: {
        fullName: '',
        identificationNumber: '',
        certificateType: '',
        enterpriseName: '',
        enterpriseType: ''
      },
      enterpriseTypeList: [
        {label: '水路运输企业', value: 3},
        {label: '船舶管理企业', value: 5}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    clickOrgMenu(obj){
      this.searchForm.organizationId = obj.id
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      let data = { ...this.searchForm, pageNum: this.currentPage, pageSize: this.pageSize, isPage: true }
      getPageList(data).then(res => {
        this.listLoading = false
        const list = res.data?.records || []
        this.list = list.map(x => ({
          ...x,
          enterpriseTypeName: Number(x.enterpriseType) === 3 ? '水路运输企业' : '船舶管理企业',
          sexName: Number(x.sex) === 1 ? '男' : '女'
        }))
        this.total = res.data?.total || 0
      })
    },
    /**
     * 查询
     */
    search() {
      this.currentPage = 1
      this.fetchData()
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
    handleDetail(item) {
      localStorage.setItem('staffDetail', JSON.stringify(item))
      this.$router.push({ path: '/intact/enterprise/staffDetail' })
    }
  }
}
</script>
