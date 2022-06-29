<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急值守信息查询</span>
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
              label="所属企业（单位）:"
              prop="enterpriseName"
            >
              <el-input
                v-model="searchForm.enterpriseName"
                placeholder="请输入所属企业（单位）"
              />
            </el-form-item>
            <el-form-item
              label="值守人员:"
              prop="person"
            >
              <el-input
                v-model="searchForm.person"
                placeholder="请输入值守人员"
              />
            </el-form-item>
            <el-form-item label="计划值守时间:">
              <el-date-picker
                v-model="screenTime"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="submitForm('searchForm')"
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
        </div>
        <el-table
          v-loading="listLoading"
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
          <el-table-column label="所属企业（单位）" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.enterpriseName }}
            </template>
          </el-table-column>
          <el-table-column label="计划值守时间" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ momentDate(scope.row.onDutyStartTimePlan,'YYYY-MM-DD HH:mm') }} 至 {{ momentDate(scope.row.onDutyEndTimePlan,'YYYY-MM-DD HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column label="实际值守时间" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ momentDate(scope.row.onDutyStartTime,'YYYY-MM-DD HH:mm') }} {{ scope.row.onDutyStartTime && scope.row.onDutyEndTime ? '至' : '' }} {{ momentDate(scope.row.onDutyEndTime,'YYYY-MM-DD HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column label="带班领导" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.leadership }}
            </template>
          </el-table-column>
          <el-table-column label="值守人员" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.person }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template v-slot="scope">
              <el-button
                size="small"
                plain
                @click="handleEdit(scope.row)"
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import { getInPageList } from '@/api/emergency-services/watch'
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
      searchForm: {
        enterpriseName: '',
        person: '',
        orgCode:'',
        organizationName:''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
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
    momentDate,
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getInPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59'),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.fetchData()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(item) {
      this.$router.push({ path: '/intact/emergency/duty/edit', query: { id: item ? item.id : null, type: 'detail' }})
    }
  }
}
</script>
