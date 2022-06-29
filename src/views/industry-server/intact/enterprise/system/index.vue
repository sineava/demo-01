<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>企业制度</span>
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
            <el-form-item label="文件名:" prop="fileName">
              <el-input v-model.trim="searchForm.fileName" placeholder="请输入文件名" />
            </el-form-item>
            <el-form-item label="制度类型:" prop="systemType">
              <el-select v-model="searchForm.systemType" placeholder="请选择制度类型">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人姓名:" prop="directorName">
              <el-input v-model.trim="searchForm.directorName" placeholder="请输入负责人姓名" />
            </el-form-item>
            <el-form-item label="有效期至:" prop="screenTime">
              <el-date-picker
                v-model="searchForm.screenTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
            <el-table-column label="文件名" prop="fileName" show-overflow-tooltip />
            <el-table-column label="制度类型" prop="systemTypeName" show-overflow-tooltip />
            <el-table-column label="适用机构" prop="departmentName" show-overflow-tooltip />
            <el-table-column label="编制时间" prop="expiryStartDate" show-overflow-tooltip />
            <el-table-column label="编制部门" prop="organizationName" show-overflow-tooltip />
            <el-table-column label="编制负责人" prop="directorName" show-overflow-tooltip />
            <el-table-column label="联系电话" prop="phone" show-overflow-tooltip />
            <el-table-column label="有效期至" prop="expiryEndDate" show-overflow-tooltip />
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
import { integratedQueryPage } from '@/api/general-services/enterpriseInfo/enterpriseBasic'
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
        fileName: '',
        systemType: '',
        directorName: '',
        screenTime: []
      },
      type: [
        { value: '1', label: '人力资源管理制度' },
        { value: '2', label: '安全管理制度' },
        { value: '3', label: '财务管理制度' },
        { value: '4', label: '行政管理制度' },
        { value: '5', label: '物资管理制度' },
        { value: '6', label: '生产管理制度' },
        { value: '7', label: '销售管理制度' },
        { value: '8', label: '质量管理制' }
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
      const [screenStartTime,screenEndTime] = this.searchForm?.screenTime || []
      let data = { ...this.searchForm, pageNum: this.currentPage, pageSize: this.pageSize, isPage: true, screenStartTime, screenEndTime }
      delete data.screenTime
      integratedQueryPage(data).then(res => {
        this.listLoading = false
        const list = res.data?.records || []
        this.list = list.map(x => ({
          ...x,
          systemTypeName: this.type[x.systemType - 1].label
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
      localStorage.setItem('systemDetail', JSON.stringify(item))
      this.$router.push({ path: '/intact/enterprise/systemDetail' })
    }
  }
}
</script>
