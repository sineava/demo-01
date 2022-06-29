<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>客运班轮停航备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item
          label="停航船舶名称:"
          prop="shipName"
        >
          <el-input
            v-model.trim="searchForm.shipName"
            placeholder="请输入停航船舶名称"
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
          label="企业名称"
          prop="enterpriseName"
        />
        <el-table-column
          label="法人代表"
          prop="legalPerson"
        />
        <el-table-column
          label="经营许可证编号"
          prop="licenseNo"
        />
        <el-table-column
          label="停航船舶名称"
          prop="shipName"
        />
        <el-table-column
          label="提交时间"
          prop="createTime"
        />
        <el-table-column label="审核状态">
          <template v-slot="scope">
            {{ scope.row.isStatus===1?'审核中':(scope.row.isStatus===2?'退回':'审核通过') }}
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="reviewedDate"
        />
        <el-table-column
          v-if="button_roles.desc || button_roles.handling"
          label="操作"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.handling ? 110 : 0)"
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
              type="primary"
              plain
              :disabled="scope.row.isStatus===1 ? false : true"
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 业务办理
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
import { pageHyList } from '@/api/water-transportation-services/keep-on-record/cruise-liner-suspend-filing'
import { mapGetters } from 'vuex'
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
        keyword: '',
        shipName: ''
      }
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
      this.$router.push({ path: '/record/water/other/passengerInfoDetail', query: { id: item.id, isEdit: isEdit }})
    }
  }
}
</script>
