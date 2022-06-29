<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <em
        class="el-icon-back icon-back"
        @click="$router.back(-1)"
      />
      <span>生产码头详情</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
        label-width="80px"
      >
        <el-form-item
          label="泊位名称:"
          prop="berthName"
        >
          <el-input
            v-model.trim="searchForm.berthName"
            placeholder="请输入泊位名称"
          />
        </el-form-item>
        <el-form-item
          label="所属企业:"
          prop="belongingEnterprise"
        >
          <el-input
            v-model.trim="searchForm.belongingEnterprise"
            placeholder="请输入所属企业"
          />
        </el-form-item>
        <el-form-item
          label="结构形式:"
          prop="structuralStyle"
        >
          <el-input
            v-model.trim="searchForm.structuralStyle"
            placeholder="请输入结构形式"
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="泊位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.berthName }}
          </template>
        </el-table-column>
        <el-table-column label="所在码头" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.wharfName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属企业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.operatingEnterprise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结构形式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.structuralStyle }}
          </template>
        </el-table-column>
        <el-table-column label="主要用途" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.mainUses }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="专业化码头分类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'][scope.row.serviceType-1] }}
          </template>
        </el-table-column> -->
        <el-table-column label="竣工验收日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.acceptanceDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="核查靠泊能力" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.checkBerthingCapability }}吨</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
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
import { getPageList } from '@/api/port-services/coastline/berth'
import pagination from '@/components/Pagination'
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
      row: '',
      searchForm: {
        berthName: '',
        belongingEnterprise: '',
        operatingEnterprise: '',
        structuralStyle: '',
        serviceType: ''
      },
      wharfId: '',
      wharfName: '',
      coastlineName: ''
    }
  },
  created() {
    const { wharfId, wharfName, coastlineName } = this.$route.query
    this.wharfId = wharfId
    this.wharfName = wharfName
    this.coastlineName = coastlineName
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        wharfId: this.wharfId
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({
        path: '/intact/shoreline/pier/moorEdit',
        query: {
          type,
          wharfId: this.wharfId,
          id: item ? item.id : null,
          wharfName: this.wharfName,
          coastlineName: this.coastlineName
        }
      })
    }
  }
}
</script>

