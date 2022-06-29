<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>营运船舶</span>
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
            <el-form-item label="船舶名称:" prop="shipName">
              <el-input v-model.trim="searchForm.shipName" placeholder="请输入船舶名称" />
            </el-form-item> 
            <el-form-item label="船舶经营人:" prop="shipOperator">
              <el-input v-model.trim="searchForm.shipOperator" placeholder="请输入船舶经营人" />
            </el-form-item>
            <el-form-item label="船舶识别号:" prop="shipIdentifyNo">
              <el-input v-model.trim="searchForm.shipIdentifyNo" placeholder="请输入船舶识别号" />
            </el-form-item>
            <el-form-item label="船舶类型:" prop="shipType">
              <el-input v-model.trim="searchForm.shipType" placeholder="请输入船舶类型" />
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
            <el-table-column label="船舶名称" prop="shipName" show-overflow-tooltip />
            <el-table-column label="船舶经营人" prop="shipOperator" show-overflow-tooltip />
            <el-table-column label="所在地市港口管理部门" prop="organizationName" show-overflow-tooltip />
            <el-table-column label="船舶识别号" prop="shipIdentifyNo" show-overflow-tooltip />
            <el-table-column label="船舶类型" prop="shipType" show-overflow-tooltip />
            <el-table-column label="运营证编号" prop="shipLicenseNo" show-overflow-tooltip />
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
import { integratedQueryPage } from '@/api/water-transportation-services/information/enterprise-ship'
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
        shipName: '',
        shipOperator: '',
        shipIdentifyNo: '',
        shipType: ''
      }
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
      this.searchForm.organizationName = obj.name
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
    /**
     * 详情
     */
    handleDetail(item) {
      localStorage.setItem('operatingDetail', JSON.stringify(item))
      this.$router.push({ path: '/intact/ship/operating/detail' })
    }
  }
}
</script>
