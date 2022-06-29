<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <el-form-item
        label="关键字:"
        prop="keyword"
      >
        <el-input
          v-model.trim="searchForm.keyword"
          placeholder="请输入名称/营运证编号"
        />
      </el-form-item>
      <el-form-item
        label="事故等级:"
        prop="accidentLevel"
      >
        <el-select
          v-model="searchForm.accidentLevel"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="船舶名称"
        prop="shipName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="船舶营运证编号"
        prop="shipLicenseNo"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="事故等级">
        <template v-slot="scope">
          {{ options[scope.row.accidentLevel -1].label }}
        </template>
      </el-table-column>
      <el-table-column
        label="事故描述"
        prop="accidentDesc"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="事故原因"
        prop="accidentReason"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="更新时间"
        prop="reviewedDate"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        width="100"
      >
        <template v-slot="scope">
          <el-button
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
</template>

<script>
import pagination from '@/components/Pagination'
import { pageHyMajorAccidentList } from '@/api/water-transportation-services/information/ship-en-major-events-filing'
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
        enterpriseId: '',
        keyword: '',
        accidentLevel: ''
      },
      options: [{
        value: '1',
        label: '特别重大'
      }, {
        value: '2',
        label: '重大'
      }, {
        value: '3',
        label: '较大'
      }, {
        value: '4',
        label: '一般'
      }]
    }
  },
  async mounted() {
    this.searchForm.enterpriseId = this.$route.query.id
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
      pageHyMajorAccidentList(data).then(res => {
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
      this.$router.push({ path: '/portenterprise/ship/accidentInfoDetail', query: { id: item.id }})
    }
  }
}
</script>

