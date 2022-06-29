<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>法律法规资料数据查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名/文号/机构:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入文件名/文号/机构"
          />
        </el-form-item>
        <el-form-item
          label="文件类型:"
          prop="fileType"
        >
          <el-input
            v-model.trim="searchForm.fileType"
            placeholder="请输入文件类型"
          />
        </el-form-item>
        <el-form-item label="颁布时间:">
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.fileType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="颁布文号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enactTitanic }}</span>
          </template>
        </el-table-column>
        <el-table-column label="颁布机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enactOrganization }}</span>
          </template>
        </el-table-column>
        <el-table-column label="颁布时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enactTime.split('T')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) "
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
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
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import { pageList } from '@/api/general-services/public-information/lawsAndRegulations'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
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
        keyword: '',
        fileType: '',
        startTime: '',
        endTime: ''
      },
      office: [
        { value: '1', label: '类型1' },
        { value: '2', label: '类型2' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      const [startTime, endTime] = this.screenTime || []
      pageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(startTime),
        endTime: momentDate(endTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
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
    /**
     * 重置查询条件
     */
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
      this.pageSize = val.pageSizeccc
      this.fetchData()
    },
    /**
     * 详情
     */
    handleDetail(scope, row) {
      this.$router.push({ path: '/material/legal/legalDetail', query: { id: row.id }})
    }
  }
}
</script>

