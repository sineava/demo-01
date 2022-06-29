<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>无船承运业务备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="无船承运人:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入无船承运人"
          />
        </el-form-item>
        <el-form-item
          label="提交时间:"
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
        highlight-current-row
        class="table-border"
      >
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="无船承运人"
          prop="enterpriseName"
        />
        <el-table-column
          label="法人代表"
          prop="legalPersonName"
        />
        <el-table-column
          label="法人身份证号码"
          prop="legalPersonCardNo"
        />
        <el-table-column
          label="电话号码"
          prop="contactPhone"
        />
        <el-table-column
          label="公司注册地"
          prop="officeAddress"
        />
        <el-table-column label="审核状态">
          <template v-slot="scope">
            {{ scope.row.isStatus===1?'审核中':(scope.row.isStatus===2?'退回':'审核通过') }}
          </template>
        </el-table-column>
        <el-table-column
          label="提交时间"
          prop="filingDate"
        />
        <el-table-column
          v-if="button_roles.handling || button_roles.receipt || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.handling ? 120 : 0) + (button_roles.receipt ? 120 : 0) + (button_roles.desc ? 90 : 0)"
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
            <el-button
              v-if="button_roles.handling"
              size="mini"
              type="success"
              plain
              :disabled="(scope.row.isStatus===1 && scope.row.isBeAudited===1) ? false : true"
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 业务办理
            </el-button>
            <el-button
              v-if="button_roles.receipt"
              size="mini"
              type="warning"
              :disabled="(scope.row.isStatus!==1 && scope.row.isStatus!==2) ? false : true"
              plain
              @click="download(scope.row)"
            >
              <em class="el-icon-download" /> 下载回执
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
  </el-card>
</template>

<script>
import pagination from '@/components/Pagination'
import { pageHyList,getInfo } from '@/api/water-transportation-services/keep-on-record/non-ship-carriage-filing'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { exportWord } from '@/components/word'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        keyword: ''
      },
      screenTime: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime&&this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      pageHyList(data).then(res => {
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
    handleDetail(item, isEdit) {
      this.$router.push({ path: '/record/water/other/noShipInfoDetail', query: { id: item.id, isEdit: isEdit }})
    },
    async download(item){
      const loadingInstance = Loading.service({ fullscreen: true })
      const info = await getInfo(item.id)
      exportWord('./excels/重庆市无船承运业备案.docx',{
        enterpriseName:info.data.enterpriseName || '',
        legalPersonName:info.data.legalPersonName || '',
        legalPersonCardNo:info.data.legalPersonCardNo || '',
        officeAddress:info.data.officeAddress || '',
        economicType:info.data.economicType || '',
        registeredCapital:info.data.registeredCapital+'万元',
        filingDate:info.data.filingDate || '',
        validityDate:info.data.validityDate || '',
        contactPhone: info.data.contactPhone || '',
        reviewedCode:info.data.reviewedCode || '',
        reviewedBy:info.data.reviewedBy || '',
        reviewedDate:info.data.reviewedDate || '',
        reviewedOrg:info.data.reviewedOrg || ''
      },
      `无船承运业备案表`)
      loadingInstance.close()
    }
  }
}
</script>
