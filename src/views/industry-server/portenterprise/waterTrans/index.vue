<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输企业管理</span>
      <span v-if="user_info.orgcategory==='1' || user_info.orgcategory==='2' ||user_info.orgcategory==='3'" style="float: right;">
        <el-button
          type="warning"
          size="small"
          icon="el-icon-refresh-left"
          @click="updateBatch"
        >
          更新企业信息
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-c-scale-to-original"
          @click="changeRecord"
        >
          变更记录
        </el-button>
      </span>
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
            size="small"
            style="margin-top: 10px;"
          >
            <el-form-item
              label="企业中文名称:"
              prop="enterpriseName"
            >
              <el-input
                v-model.trim="searchForm.enterpriseName"
                placeholder="请输入企业中文名称"
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
                {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="企业中文名称"
              prop="enterpriseName"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="统一社会信用代码" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.certificateNo:'' }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="行政区划" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.businessArea:'' }}
              </template>
            </el-table-column> -->
            <el-table-column label="法定代表人" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.legalPersonName:'' }}
              </template>
            </el-table-column>
            <el-table-column
              label="经济类型"
              prop="economicType"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="注册资本" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.registeredCapital:'' }}
              </template>
            </el-table-column>
            <el-table-column
              label="联系电话"
              prop="contactPhone"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="更新时间"
              prop="updateTime"
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
                  @click="handleDetail(scope.row, true)"
                >
                  <em class="el-icon-info" /> 详情
                </el-button>
                <!-- <el-button
              v-if="button_roles.edit"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            ><em class="el-icon-edit" /> 编辑</el-button> -->
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
import { pageWaterTransportEnList } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
import { refreshData } from '@/api/general-services/license'
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
        economicType: '',
        organizationName:''
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
      pageWaterTransportEnList(data).then(res => {
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
    handleDetail(item, disabled) {
      this.$store.state.app.basicTabActive = 1
      this.$router.push({ path: '/portenterprise/waterDetail', query: {
        id: item.id,
        enterpriseName: item.enterpriseName,
        certificateNo:item.enterpriseBusinessInfoVo.certificateNo,
        disabled: disabled
      }})
    },
    updateBatch(){
      this.$confirm(`本次更新预计需要${this.total * 2}分钟，建议点击详情进行单个企业更新。您是否还要继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        zIndex: 3000
      }).then(async () => {
        refreshData({code:this.info.enterpriseBusinessInfoVo.certificateNo}).then(res=>{
          if (res.code==='0'){
            this.$message.success('更新成功')
          }
        })
      }).catch(() => {
        // 几点取消的提示
      })
    },
    changeRecord(){
      this.$router.push({ path: '/portenterprise/changeRecord'})
    },
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
