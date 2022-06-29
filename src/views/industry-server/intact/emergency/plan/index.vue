<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急预案查询</span>
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
              label="预案名称:"
              prop="name"
            >
              <el-input
                v-model.trim="searchForm.name"
                placeholder="请输入预案名称"
              />
            </el-form-item>
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
              label="预案类型:"
              prop="type"
            >
              <el-select
                v-model="searchForm.type"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in field_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="响应级别:"
              prop="responseLevel"
            >
              <el-select
                v-model="searchForm.responseLevel"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in field_responseLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="发布状态:"
              prop="state"
            >
              <el-select
                v-model="searchForm.state"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间:">
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
            <el-table-column label="预案名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="企业名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.enterpriseName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="所属管理部门"
              :show-overflow-tooltip="true"
            >
              <template v-slot="scope">
                <span>{{ scope.row.enterpriseName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预案类型" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.type && field_type.find(item => (item.value === scope.row.type)).label }}</span>
              </template>
            </el-table-column>
            <el-table-column label="响应级别" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.responseLevel && field_responseLevel.find(item => (item.value === scope.row.responseLevel)).label }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布状态" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.state && state.find(item => (item.value === scope.row.state)).label }}</span>
              </template>
            </el-table-column>
            <el-table-column label="应急通讯对象" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.emergencyCommunicationObject }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系人" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.contact }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.contactPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              min-width="100"
              :show-overflow-tooltip="true"
            >
              <template v-slot="scope">
                <span>{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
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
import { momentDate } from '@/utils/index'
import { emergencyPlan } from '@/utils/public-fields'
import { getInPageList } from '@/api/emergency-services/response-plan'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  mixins: [emergencyPlan],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      searchForm: {
        name: '',
        responseLevel: '',
        type: '',
        state: '',
        enterpriseName: '',
        orgCode:'',
        organizationName:''
      },
      state: [
        { value: 1, label: '未发布' },
        { value: 2, label: '已发布' }
      ]
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
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
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
    handleDetail(item) {
      this.$router.push({ path: '/intact/emergency/plan/detail', query: { id: item.id }})
    }
  }
}
</script>
