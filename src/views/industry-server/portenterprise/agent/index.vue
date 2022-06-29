<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输代理企业信息管理</span>
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
            <el-form-item
              label="更新时间:"
              prop="screenTime"
            >
              <el-date-picker
                v-model="screenTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
            <!-- <el-table-column
          label="国内符合证明编号"
          prop="certificateCode"
        /> -->
            <el-table-column
              label="企业中文名称"
              prop="enterpriseName"
              :show-overflow-tooltip="true"
            />
            <!-- <el-table-column label="企业类型" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseType ? ['港口企业','港口服务企业','水路运输企业','水路运输代理企业','船舶管理企业','其他企业'][scope.row.enterpriseType-1] : '' }}
              </template>
            </el-table-column> -->

            <el-table-column
              label="经济类型"
              prop="economicType"
              :show-overflow-tooltip="true"
            />
            <!-- <el-table-column label="行政区划" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.businessArea:'' }}
              </template>
            </el-table-column> -->
            <el-table-column label="注册地址" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.officeAddress:'' }}
              </template>
            </el-table-column>
            <!-- <el-table-column
          label="国内符合证明发证单位"
          prop="certificateUnit"
        /> -->
            <el-table-column label="法定代表人" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseBusinessInfoVo?scope.row.enterpriseBusinessInfoVo.legalPersonName:'' }}
              </template>
            </el-table-column>
            <el-table-column
              label="电话号码"
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
import { pageWaterAgentEnList } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
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
      screenTime: [],
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
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      pageWaterAgentEnList(data).then(res => {
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
      this.screenTime = []
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
      this.$router.push({ path: '/portenterprise/agentDetail', query: { id: item.id, disabled: disabled,name:item.enterpriseName }})
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
