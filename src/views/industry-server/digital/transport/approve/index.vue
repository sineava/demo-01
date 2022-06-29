<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>节假日统计信息审核</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="年份:"
          prop="year"
        >
          <el-date-picker
            v-model="searchForm.year"
            type="year"
            value-format="yyyy"
            placeholder="选择年份"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="节日:"
          prop="holiday"
        >
          <el-select
            v-model="searchForm.holiday"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, index) in field_holiday"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="上报状态:"
          prop="importantStatus"
        >
          <el-select
            v-model="searchForm.importantStatus"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, index) in field_importantStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="审核状态:"
          prop="approvalStatus"
        >
          <el-select
            v-model="searchForm.approvalStatus"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, index) in field_approvalStatus"
              :key="index"
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
        <el-form-item label="统计日期范围:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="统计单位">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="年份">
          <template v-slot="scope">
            {{ scope.row.year }}
          </template>
        </el-table-column>
        <el-table-column label="节日">
          <template v-slot="scope">
            {{ scope.row.holiday }}
          </template>
        </el-table-column>
        <el-table-column label="统计日期">
          <template v-slot="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="统计人">
          <template v-slot="scope">
            {{ scope.row.statisticianName }}
          </template>
        </el-table-column>
        <el-table-column label="上报状态">
          <template v-slot="scope">
            <span
              v-if="scope.row.importantStatus === 1"
              style="color: #f8a723;"
            >未上报</span>
            <span
              v-if="scope.row.importantStatus === 2"
              style="color: #70b603;"
            >正常上报</span>
            <span
              v-if="scope.row.importantStatus === 3"
              style="color: #ec808d;"
            >延期未上报</span>
            <span
              v-if="scope.row.importantStatus === 4"
              style="color: #ec808d;"
            >延期上报</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template v-slot="scope">
            {{ scope.row.approvalStatus ? field_approvalStatus.find(x => x.value === scope.row.approvalStatus).label : '---' }}
          </template>
        </el-table-column>
        <el-table-column label="提交时间">
          <template v-slot="scope">
            {{ scope.row.importantTime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc || button_roles.pass || button_roles.reject"
          align="center"
          label="操作"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.reject ? 95 : 0) + (button_roles.pass ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              :disabled="scope.row.approvalStatus === 1 || scope.row.approvalStatus === 2 || scope.row.approvalStatus === 3? false : true"
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.pass"
              size="mini"
              type="primary"
              :disabled="scope.row.approvalStatus === 1 ? false : true"
              @click="handleReview(scope.$index, scope.row)"
            >
              <em class="el-icon-edit" /> 审核
            </el-button>
            <el-button
              v-if="button_roles.reject"
              size="mini"
              type="danger"
              :disabled="scope.row.approvalStatus === 1 || scope.row.approvalStatus === 2 ? false : true"
              @click="handleReback(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 退回
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
              v-model="sureForm.approvalRemark"
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
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
import { getPageList, updateInfo } from '@/api/channel-services/period/period'
import pagination from '@/components/Pagination'
import { timePeriod } from '@/utils/public-fields'
export default {
  components: {
    pagination
  },
  mixins: [timePeriod],
  data() {
    return {
      dialogVisible: false,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      sureForm: {
        approvalRemark: '',
        id: null
      },
      searchForm: {
        year: '',
        holiday: '',
        approvalStatus: '',
        importantStatus: ''
      }
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
        year: this.searchForm.year && Number(this.searchForm.year),
        screenStartTime: momentDate(screenStartTime, 'YYYY-MM-DD'),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD'),
        pageNum: this.currentPage,
        pageSize: this.pageSize
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
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 数据上报(add)/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/transport/approveEdit', query: { type, id: item.id }})
    },
    /**
     * 审核
     */
    handleReview(_, item) {
      this.$confirm('是否确定审核通过？', '操作确认').then(() => {
        updateInfo({
          approvalStatus: 2,
          id: item.id
        }).then(res => {
          if (res.code === '0') {
            this.$message.success('审核通过!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 退回
     */
    handleReback(_, item) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.sureForm.resetFields()
        this.sureForm.id = item.id
      })
    },
    /**
     * 确认退回
     */
    handleSure() {
      const dto = {
        ...this.sureForm,
        approvalStatus: 3
      }
      updateInfo(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('退回成功!')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
