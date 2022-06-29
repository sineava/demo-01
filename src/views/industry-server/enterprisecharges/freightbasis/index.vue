<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口收费计费标准查询</span>
    </div>
    <div>
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收费标准名称">
          <template v-slot="scope">
            <span>{{ scope.row.tableName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新人">
          <template v-slot="scope">
            <span>{{ scope.row.updateBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, 'detail')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail(scope.row, 'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { selectTypes } from '@/api/port-services/port-enterprise-charge-management/charge-industry'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        keyword: '',
        name: '',
        type: '',
        date1: '',
        date2: '',
        info: ''
      },
      type: [
        { value: '1', label: '特殊货物' }
      ],
      tableType: [
        { value: 'CONVERSION_WEIGHT', label: '特殊货物重量换算表' },
        { value: 'DOMESTIC_TRADE_GOODS', label: '内贸货物港务信息表' },
        { value: 'FACILITY_SECURITY', label: '港口设施安保费信息表' },
        { value: 'FOREIGN_TRADE_GOODS', label: '外贸货物港务信息表' },
        { value: 'PILOT', label: '航行国内航线船舶长江或嘉陵江水系引航费表' },
        { value: 'SHIPS_SAILING_DOMESTIC_ROUTES', label: '航行国内航线船舶港口收费标准' },
        { value: 'SHIP_TUG', label: '航行内河航线船舶拖轮费' }
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
    fetchData() {
      this.listLoading = true
      selectTypes().then(res => {
        this.list = res.data ? res.data : []
        this.listLoading = false
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 详情
     */
    handleDetail(item, type) {
      this.$router.push({ path: '/enterprisecharges/freightbasisDetail', query: { tableName: item.tableType, type }})
    }
  }
}
</script>
