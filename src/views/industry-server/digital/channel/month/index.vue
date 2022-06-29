<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>航道养护月报管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="机构名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入机构名称"
          />
        </el-form-item>
        <el-form-item
          label="上报状态:"
          prop="importantStatus"
        >
          <el-select
            v-model="searchForm.importantStatus"
            clearable
            placeholder="请选择上报状态"
          >
            <el-option
              v-for="item in importantStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="审批状态:"
          prop="approvalStatus"
        >
          <el-select
            v-model="searchForm.approvalStatus"
            clearable
            placeholder="请选择审批状态"
          >
            <el-option
              v-for="item in approvalStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="月份:"
          prop="timeInfo"
        >
          <el-date-picker
            v-model="searchForm.timeInfo"
            placeholder="请选择月份"
            type="month"
            style="width: 100%;"
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
          <el-button
            v-if="button_roles.setTime"
            size="small"
            type="primary"
            @click="handleStandard"
          >
            航道养护月报上传规范
          </el-button>
        </el-form-item>
      </el-form>
    </div>
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
        label="编号"
        width="55"
      >
        <template v-slot="scope">
          {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="月份">
        <template v-slot="scope">
          {{ scope.row.timeInfo }}
        </template>
      </el-table-column>
      <el-table-column label="机构名称" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.enterpriseName }}
        </template>
      </el-table-column>
      <el-table-column label="上报状态">
        <template v-slot="scope">
          {{ scope.row.importantStatus && importantStatus.find(x => x.value === scope.row.importantStatus).label }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态">
        <template v-slot="scope">
          <!-- 如果才新增数据,后端返回的0 -->
          {{ scope.row.approvalStatus ? approvalStatus.find(x => x.value === scope.row.approvalStatus).label : null }}
        </template>
      </el-table-column>
      <el-table-column label="上报时间">
        <template v-slot="scope">
          {{ scope.row.importantTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="120"
        align="center"
        :width="(button_roles.pass ? 95 : 0) + (button_roles.reject ? 95 : 0) + (button_roles.desc ? 95 : 0) + (button_roles.record ? 110 : 0)"
      >
        <template v-slot="scope">
          <el-button
            v-if="button_roles.desc"
            size="small"
            plain
            :disabled="[2, 4].includes(scope.row.importantStatus) ? false : true"
            @click="handleEdit('detail', scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            v-if="button_roles.record"
            size="small"
            type="success"
            :disabled="[1, 3].includes(scope.row.importantStatus) ? false : true"
            @click="handleEdit('add', scope.row)"
          >
            <em class="el-icon-info" /> 数据上报
          </el-button>
          <el-button
            v-if="button_roles.pass"
            size="small"
            type="success"
            :disabled="scope.row.approvalStatus===2 ? true : ([2, 4].includes(scope.row.importantStatus) ? false : true)"
            @click="handleReview(scope.row)"
          >
            <em class="el-icon-info" /> 通过
          </el-button>
          <el-button
            v-if="button_roles.reject"
            size="small"
            type="danger"
            :disabled="scope.row.approvalStatus===3 ? true : ([2, 4].includes(scope.row.importantStatus) ? false : true)"
            @click="handleReback(scope.row)"
          >
            <em class="el-icon-info" /> 退回
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="操作确认"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <el-form
        ref="sureForm"
        :model="sureForm"
        size="medium"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <span>是否确定退回操作?</span>
        </el-form-item>
        <el-form-item
          label-width="0"
          prop="approvalRemark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="sureForm.approvalRemark"
            type="textarea"
            rows="6"
            placeholder="请输入退回原因"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import { getMonthList, auditInfo } from '@/api/channel-services/channel/report-conclusion'
export default {
  components: {
    pagination
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        enterpriseName: '',
        importantStatus: '',
        approvalStatus: '',
        timeInfo: ''
      },
      sureForm: {
        approvalRemark: ''
      },
      importantStatus: [
        { value: 1, label: '未上报' },
        { value: 2, label: '正常上报' },
        { value: 3, label: '延期未上报' },
        { value: 4, label: '延期上报' }
      ],
      approvalStatus: [
        { value: 1, label: '未审核' },
        { value: 2, label: '审核已通过' },
        { value: 3, label: '已驳回' }
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
      getMonthList({
        ...this.searchForm,
        timeInfo: momentDate(this.searchForm.timeInfo, 'YYYY-MM')
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
        this.fetchData()
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
     * 数据上报/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/channel/monthEdit', query: { type, id: item.id, timeInfo: item.timeInfo }})
    },
    /**
     * 航道规范
     */
    handleStandard() {
      // !type 2月报 3年报
      this.$router.push({ path: '/digital/channel/claim', query: { type: 2 }})
    },
    // 退回
    handleReback(item) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.sureForm.resetFields()
        this.sureForm.id = item.id
      })
    },
    // 确认退回
    handleSure() {
      const dto = {
        ...this.sureForm,
        approvalStatus: 3 // 退回状态码
      }
      auditInfo(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('退回成功!')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => err)
    },
    // 审核
    handleReview(item) {
      this.$confirm('是否确定审核通过？', '操作确认').then(() => {
        auditInfo({
          approvalStatus: 2, // 审核通过
          id: item.id
        }).then(res => {
          if (res.code === '0') {
            this.$message.success('审核通过!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    }
  }
}
</script>
