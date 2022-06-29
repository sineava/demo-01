<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业基础信息</span>
    </div>
    <el-row :gutter="10">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
      >
        <OrgAssembly res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
        <div class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            style="margin-top: 10px;"
            size="small"
          >
            <!-- <el-form-item
              label="所在地市港口管理部门:"
              prop="organizationName"
            >
              <el-input
                v-model.trim="searchForm.organizationName"
                placeholder="请输入所在地市港口管理部门"
                style="width: 250px"
              />
            </el-form-item> -->
            <el-form-item
              label="企业名称:"
              prop="enterpriseName"
            >
              <el-input
                v-model.trim="searchForm.enterpriseName"
                placeholder="请输入企业名称"
              />
            </el-form-item>
            <el-form-item
              label="经济类型:"
              prop="economicType"
            >
              <el-input
                v-model.trim="searchForm.economicType"
                placeholder="请输入经济类型"
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
          <el-table
            v-loading="listLoading"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="list"
            element-loading-text="Loading"
            stripe
            fit
            :height="clientHeight - 220 - 98"
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              label="编号"
              width="65"
            >
              <template v-slot="scope">
                <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="所在地市港口管理部门"
              prop="organizationName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="企业名称"
              prop="enterpriseName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="法定代表人"
              prop="legalPersonName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="经济类型"
              prop="economicType"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="办公地址"
              prop="officeAddress"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="联系人姓名"
              prop="contactName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="联系人电话"
              prop="contactPhone"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="操作"
              width="100"
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
import pagination from '@/components/Pagination'
import { pagePortEnList } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      clientHeight:document.body.clientHeight,
      searchForm: {
        enterpriseName: '',
        organizationName: '',
        economicType: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    clickOrgMenu(name){
      this.searchForm.organizationName = name
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pagePortEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
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
      this.$router.push({ path: '/portenterprise/basicDetail', query: { id: item.id, name: item.enterpriseName,departmentName:item.organizationName }})
    }
  }
}
</script>

<style lang="scss" scoped>
.body-card {
    /deep/ .el-card__body {
        padding: 0 10px;
    }

    /deep/ .el-form-item {
        margin-bottom: 0;
    }
}
</style>
