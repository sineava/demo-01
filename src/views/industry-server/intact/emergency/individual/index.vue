<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>单兵信息</span>
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
          >
            <el-form-item
              label="单兵名称:"
              prop="individualName"
            >
              <el-input
                v-model="searchForm.individualName"
                placeholder="请输入单兵名称"
              />
            </el-form-item>
            <el-form-item
              label="所属单位:"
              prop="affiliatedUnitName"
            >
              <el-input
                v-model="searchForm.affiliatedUnitName"
                placeholder="请输入所属单位"
              />
            </el-form-item>
            <el-form-item
              label="单兵类型:"
              prop="individualType"
            >
              <el-select v-model="searchForm.individualType" placeholder="请选择">
                <el-option label="应急单兵" value="应急单兵" />
              </el-select>
            </el-form-item>
            <el-form-item
              label="时间:"
              prop="timeList"
            >
              <el-date-picker
                v-model="searchForm.timeList"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
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
          <div style="display: flex;">
            <el-button
              v-if="button_roles.create"
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="addDialog"
            >
              新增单兵信息
            </el-button>
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
            <el-table-column label="单兵名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.individualName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属单位" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.affiliatedUnitName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单兵类型" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.individualType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.linkPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="100"
            >
              <template v-slot="scope">
                <el-button
                  size="mini"
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
import { getList } from '@/api/individual-soldier/single-pawn/single-pawn'
import pagination from '@/components/Pagination'
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
      saveLoading: false,
      pageSize: 20,
      total: 0,
      searchForm: {
        individualName: '',
        individualType: '',
        affiliatedUnitName: '',
        timeList: [],
        orgCode:'',
        organizationName:''
      },
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  async mounted() {
    if (this.user_info.orgcategory!=='1'){
      this.searchForm.orgCode = this.user_info.orgcode
      this.searchForm.organizationName = this.user_info.orgname
    }
    this.fetchData()
  },
  methods: {
    clickOrgMenu(name,code){
      this.searchForm.organizationName = name
      this.searchForm.orgCode = code
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      let query = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const [ startTime, endTime ] = this.searchForm.timeList || []
      query.startTime = startTime ? startTime +' 00:00:00' :''
      query.endTime = endTime ? endTime +' 23:59:59' : ''
      delete query.timeList
      getList(query).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
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
      this.$router.push({ path: '/emergency/data/individual/detail', query: { id: item ? item.id : null}})
    }
  }
}
</script>
