<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业类型查询</span>
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
          prop="enterpriseName"
        >
          <el-input v-model.trim="searchForm.enterpriseName" placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item
          label="企业类型:"
          prop="enterpriseType"
        >
          <el-select
            v-model="searchForm.enterpriseType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in enterpriseType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="经济类型:"
          prop="economicType"
        >
          <el-input v-model.trim="searchForm.economicType" placeholder="请输入经济类型" />
        </el-form-item>
        <el-form-item
          label="行政区划:"
          prop="administrativeDivision"
        >
          <el-input v-model.trim="searchForm.administrativeDivision" placeholder="请输入行政区划" />
        </el-form-item>
        <el-form-item
          label="法定代表人:"
          prop="legalPersonName"
        >
          <el-input v-model.trim="searchForm.legalPersonName" placeholder="请输入法定代表人" />
        </el-form-item>
        <el-form-item
          label="电话号码:"
          prop="contactPhone"
        >
          <el-input v-model.trim="searchForm.contactPhone" placeholder="请输入电话号码" />
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
            @click="resetForm"
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="企业名称"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="企业类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseType && enterpriseType.find(x => x.value === scope.row.enterpriseType).label }}
          </template>
        </el-table-column>
        <el-table-column label="经济类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.economicType }}
          </template>
        </el-table-column>
        <el-table-column label="行政区划" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.administrativeDivision }}
          </template>
        </el-table-column>
        <el-table-column label="法定代表人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.legalPersonName }}
          </template>
        </el-table-column>
        <el-table-column label="电话号码" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.contactPhone }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              :disabled="scope.row.enterpriseType !== 6 ? false : true"
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
    </div>
  </el-card>
</template>

<script>
import { getBasicPageList } from '@/api/general-services/integrated-query/integrated-query'
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
      searchForm: {
        enterpriseName: '',
        enterpriseType: '',
        economicType: '',
        administrativeDivision: '',
        legalPersonName: '',
        contactPhone: ''
      },
      enterpriseType: [
        { value: 1, label: '港口企业' },
        { value: 2, label: '港口服务企业' },
        { value: 3, label: '水路运输企业' },
        { value: 4, label: '水路运输代理企业' },
        { value: 5, label: '船舶管理企业' },
        { value: 6, label: '其他企业' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getBasicPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange({ currentPage, pageSize }) {
      this.currentPage = currentPage
      this.pageSize = pageSize
      this.fetchData()
    },
    handleEdit(item) {
      if (item.enterpriseType === 1) {
        this.$router.push({
          path: '/portenterprise/basicDetail',
          query: { id: item.id, name: item.enterpriseName,departmentName:item.organizationName, type :'details'}
        })
      }
      if (item.enterpriseType === 2) {
        this.$router.push({
          path: '/portenterprise/basicServiceDetail',
          query: { id: item.id, enterpriseName : item.enterpriseName , type :'details' }
        })
      }
      if (item.enterpriseType === 3) {
        this.$router.push({
          path: '/portenterprise/waterDetail',
          query: { id: item.id, enterpriseName: item.enterpriseName,certificateNo:item.certificateNo, type :'details' }
        })
      }
      if (item.enterpriseType === 4) {
        this.$router.push({
          path: '/portenterprise/shipDetail',
          query: { id: item.id ,enterpriseName:item.enterpriseName, type :'details'}
        })
      }
      if (item.enterpriseType === 5) {
        this.$router.push({
          path: '/portenterprise/shipDetail',
          query: { id: item.id, enterpriseName: item.enterpriseName , type :'details' }
        })
      }
    }
  }
}
</script>
