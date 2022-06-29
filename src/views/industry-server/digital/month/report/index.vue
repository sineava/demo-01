<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输月报上报</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="单位名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item
          label="月报月份:"
          prop="timeInfo"
        >
          <el-date-picker
            v-model="searchForm.timeInfo"
            type="month"
            placeholder="请输入月报月份"
          />
        </el-form-item>
        <el-form-item
          label="审核状态:"
          prop="auditState"
        >
          <el-select
            v-model="searchForm.auditState"
            clearable
            placeholder="请选择审核状态"
          >
            <el-option
              v-for="item in auditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="填报时间:">
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
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleEdit('add')"
      >
        新增水路运输月报
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="单位名称"
          prop="enterpriseName"
        />
        <el-table-column
          label="月报月份"
          prop="timeInfo"
        />
        <el-table-column label="货运船舶">
          <el-table-column
            label="总计艘数"
            prop="cargoShipsTotal"
          />
          <el-table-column
            label="内河艘数"
            prop="cargoShipsInlandRiver"
          />
          <el-table-column
            label="总计净载重量"
            prop="cargoShipLoadTotal"
          />
          <el-table-column
            label="内河净载重量"
            prop="cargoShipLoadInlandRiver"
          />
        </el-table-column>
        <el-table-column label="货运量">
          <el-table-column
            label="总计货运量"
            prop="freightTotal"
          />
          <el-table-column
            label="内河货运量"
            prop="freightInlandRiver"
          />
        </el-table-column>
        <el-table-column label="货物周转量">
          <el-table-column
            label="总计货物周转量"
            prop="cargoTurnoverTotal"
          />
          <el-table-column
            label="内河货物周转量"
            prop="cargoTurnoverInlandRiver"
          />
        </el-table-column>
        <el-table-column label="审批状态">
          <template v-slot="scope">
            <el-tag :type="scope.row.auditState && ['', 'success', 'danger'][scope.row.auditState - 1]">{{ scope.row.auditState && ['未审核', '审核已通过', '审核已退回'][scope.row.auditState - 1] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="填报时间"
          prop="fillInTheDate"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="small"
              plain
              @click="handleDetails( scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="small"
              type="primary"
              :disabled="scope.row.auditState === 2"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 重新上报
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="small"
              type="danger"
              :disabled="scope.row.auditState === 2"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 删除
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
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
import { getPageList, deleteInfo } from '@/api/channel-services/month/water-report'
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
      screenTime: [],
      searchForm: {
        enterpriseName: '',
        timeInfo: '',
        auditState: ''
      },
      auditState: [
        { value: 1, label: '未审核' },
        { value: 2, label: '已审核' },
        { value: 3, label: '退回' }
      ]
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
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
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        timeInfo: momentDate(this.searchForm.timeInfo, 'YYYY-MM'),
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
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
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
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 编辑/新增
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/month/reportEdit', query: { type, id: item ? item.id : null }})
    },
    /**
     * 详情
     * @param {*} item
     */
    handleDetails(item){
      this.$router.push({ path: '/digital/month/details', query: { id: item?.id,auditState:item?.auditState }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo({ id: item.id }).then(res => {
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
