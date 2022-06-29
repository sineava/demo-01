<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物记录表</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="危险品名称:"
          prop="dangerousGoodsName"
        >
          <el-input
            v-model.trim="searchForm.dangerousGoodsName"
            placeholder="请输入危险品名称"
          />
        </el-form-item>
        <el-form-item
          label="危险品种类:"
          prop="dangerousGoodsType"
        >
          <el-select
            v-model="searchForm.dangerousGoodsType"
            clearable
            placeholder="请选择危险品种类"
          >
            <el-option
              v-for="item in dangerousGoodsType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="存量记录时间:">
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
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleEdit('add')"
      >
        新增记录
      </el-button>
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
          width="60"
        >
          <template v-slot="scope">
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="危险品名称">
          <template v-slot="scope">
            {{ scope.row.dangerousGoodsName }}
          </template>
        </el-table-column>
        <el-table-column label="危险品种类">
          <template v-slot="scope">
            {{ scope.row.dangerousGoodsType && dangerousGoodsType.filter(item => (item.value === scope.row.dangerousGoodsType))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="危险品进出方式">
          <template v-slot="scope">
            {{ scope.row.mode && scope.row.mode === 1 ? '进' : '出' }}
          </template>
        </el-table-column>
        <el-table-column label="作业量">
          <template v-slot="scope">
            {{ scope.row.taskNum }}
          </template>
        </el-table-column>
        <el-table-column label="存储种类">
          <template>
            储罐
          </template>
        </el-table-column>
        <el-table-column label="记录人">
          <template v-slot="scope">
            {{ scope.row.recordBy }}
          </template>
        </el-table-column>
        <el-table-column label="存量记录时间">
          <template v-slot="scope">
            {{ scope.row.recordTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
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
import { momentDate } from '@/utils/index'
import { getList, deleteGoods } from '@/api/port-services/danger-goods/dangerous-goods-record'
import pagination from '@/components/Pagination'
import { dangerGoods } from '@/utils/public-fields'
export default {
  components: {
    pagination
  },
  mixins: [dangerGoods],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      searchForm: {
        dangerousGoodsName: '',
        dangerousGoodsType: ''
      },
      stockEquipmentId: null
    }
  },
  created() {
    const stockEquipmentId = this.$route.query.stockEquipmentId
    this.company = this.$route.query.company
    this.stockEquipmentId = stockEquipmentId
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getList({
        ...this.searchForm,
        id: this.stockEquipmentId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.currentPage = 1
      this.fetchData()
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
    handleEdit(type, item) {
      this.$router.push({ path: '/portdangerousgoods/situationRecordEdit',
        query: {
          type,
          id: item ? item.id : '',
          stockEquipmentId: this.stockEquipmentId,
          company: this.company
        }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteGoods({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    }
  }
}
</script>
