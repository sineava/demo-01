<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>设施设备</span>
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
            <el-form-item label="设备名称:" prop="facilityName">
              <el-input v-model.trim="searchForm.facilityName" placeholder="请输入设备名称" />
            </el-form-item>
            <el-form-item label="所在企业:" prop="enterpriseName">
              <el-input v-model.trim="searchForm.enterpriseName" placeholder="请输入所在企业" />
            </el-form-item>
            <el-form-item label="设备类型:" prop="facilityCategory">
              <el-select v-model="searchForm.facilityCategory" placeholder="请选择设备类型">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
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
            :height="clientHeight - 220 - 136"
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
            <el-table-column label="设备名称" prop="facilityName" show-overflow-tooltip />
            <el-table-column label="所在企业" prop="enterpriseName" show-overflow-tooltip />
            <el-table-column label="所属港航机构" prop="departmentName" show-overflow-tooltip />
            <el-table-column label="设备类型" prop="enterpriseName" show-overflow-tooltip>
              <template v-slot="scope">
                {{ type[scope.row.facilityCategory - 1].label }}
              </template>
            </el-table-column>
            <el-table-column label="负责人姓名" prop="directorName" show-overflow-tooltip />
            <el-table-column label="手机号码" prop="contactNumber" show-overflow-tooltip />
            <el-table-column label="检测维护信息" width="95px">
              <template v-slot="scope">
                <el-button size="mini" plain @click="toInfo(scope.row)">
                  <em class="el-icon-info" /> 查看
                </el-button>
              </template>
            </el-table-column>
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
import { integratedQueryPage } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
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
        facilityName: '',
        enterpriseName: '',
        facilityCategory: ''
      },
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
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
      this.searchForm.orgId = obj.id
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      let data = { ...this.searchForm, pageNum: this.currentPage, pageSize: this.pageSize, isPage: true }
      integratedQueryPage(data).then(res => {
        this.listLoading = false
        this.list = res.data?.records || []
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
    // 维护信息
    toInfo(item) {
      this.$router.push({ path: '/intact/enterprise/equipmentInfo', query: { id: item.id }})
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/intact/enterprise/equipmentDetail', query: { id: item.id, name: item.departmentName }})
    }
  }
}
</script>
