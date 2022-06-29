<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="变更记录" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          v-if="(user_info.orgcategory==='1' || user_info.orgcategory==='2' ||user_info.orgcategory==='3') && !searchForm.enterpriseId"
          label="企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item
          label="更新时间:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            clearable
            placeholder="请选择更新时间"
            @change="changeType"
          >
            <el-option label="今日" :value="1" />
            <el-option label="本周" :value="2" />
            <el-option label="本月" :value="3" />
            <el-option label="其他" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="searchForm.type===4"
          prop="date"
        >
          <el-date-picker
            v-model="date"
            type="daterange"
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
      <ChangeTable ref="changeTable" :data="list" />
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
  </el-card>
</template>

<script>
import pagination from '@/components/Pagination'
import { getLicenseChangeList } from '@/api/general-services/license'
import { mapGetters } from 'vuex'
import ChangeTable from '@/views/components/business/change'
import {momentDate } from '@/utils/index'
export default {
  components: {
    pagination,
    ChangeTable
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      date:[],
      enterpriseName:'',
      searchForm: {
        type:'',
        enterpriseName: '',
        enterpriseId: '',
        screenStartTime:'',
        screenEndTime:''
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
    let enterpriseId = this.$route.query.enterpriseId
    this.enterpriseName = this.$route.query.enterpriseName
    if (enterpriseId){
      this.searchForm.enterpriseId = enterpriseId
    }
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      const data = {
        enterpriseId:this.searchForm.enterpriseId,
        enterpriseName:this.searchForm.enterpriseName,
        screenStartTime:this.date && this.date[0] ? momentDate(this.date[0],'YYYY-MM-DD') : this.searchForm.screenStartTime,
        screenEndTime:this.date && this.date[1] ? momentDate(this.date[1],'YYYY-MM-DD') : this.searchForm.screenEndTime,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      getLicenseChangeList(data).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    getThisWeek(type) {
      let now = new Date()
      this.date = []
      switch (type) {
      case 1: // 今天
        this.searchForm.screenStartTime = momentDate(now,'YYYY-MM-DD')
        this.searchForm.screenEndTime = momentDate(now.getTime()+24*60*60*1000,'YYYY-MM-DD')
        break
      case 2: // 本周第一天
        this.searchForm.screenStartTime = momentDate(now.getTime() - (now.getDay() - 1) * (24 * 60 * 60 * 1000),'YYYY-MM-DD')
        this.searchForm.screenEndTime = momentDate(now.getTime()+24*60*60*1000,'YYYY-MM-DD')
        break
      case 3: // 本月第一天
        this.searchForm.screenStartTime = momentDate(now,'YYYY-MM-01')
        this.searchForm.screenEndTime = momentDate(now.getTime()+24*60*60*1000,'YYYY-MM-DD')
        break
      default:
        this.searchForm.screenStartTime = ''
        this.searchForm.screenEndTime = ''
        break
      }
    },
    changeType(value){
      this.getThisWeek(value)
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm.screenStartTime = ''
      this.searchForm.screenEndTime = ''
      this.searchForm.type = ''
      this.date = []
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
