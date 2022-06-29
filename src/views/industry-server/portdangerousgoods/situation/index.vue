<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物存量信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="所在地市港口管理部门:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="searchForm.organizationName"
            placeholder="请输入所在地市港口管理部门"
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
          label="设备名称:"
          prop="equipmentName"
        >
          <el-input
            v-model.trim="searchForm.equipmentName"
            placeholder="请输入设备名称"
          />
        </el-form-item>
        <el-form-item
          label="设备类型:"
          prop="storageType"
        >
          <el-select
            v-model="searchForm.storageType"
            clearable
            placeholder="请选择设备类型"
          >
            <el-option
              v-for="item in storageType"
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所在地市港口管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.organizationName }}
          </template>
        </el-table-column>
        <el-table-column label="所属区域" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.coastlineName }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="设备名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.equipmentName }}
          </template>
        </el-table-column>
        <el-table-column label="设备类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.storageType && storageType.filter(item => (item.value === scope.row.storageType))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="危险品名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.goodsName || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="当前存量" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.stockNum }}
          </template>
        </el-table-column>
        <el-table-column label="历史最高存量" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.historyStockNum || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleRecord(scope.row)"
            >
              <em class="el-icon-info" /> 存储记录
            </el-button>
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
import { getHyList } from '@/api/port-services/danger-goods/stock-equipment'
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
        organizationName: '',
        storageType: '',
        equipmentName: ''
      },
      storageType: [
        { value: 1, label: '储罐' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getHyList({
        ...this.searchForm
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
    // 存储记录
    handleRecord(item) {
      this.$router.push({ path: '/portdangerousgoods/situationRecord', query: { stockEquipmentId: item ? item.id : null }})
    },
    // 详情/编辑/新增
    handleEdit(type, item) {
      this.$router.push({ path: '/portdangerousgoods/situationDetail', query: { type, id: item ? item.id : null }})
    }
  }
}
</script>

