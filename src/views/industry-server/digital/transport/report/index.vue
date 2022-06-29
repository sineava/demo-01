<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>节假日统计数据上报</span>
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
          v-if="button_roles.record || button_roles.update || button_roles.desc"
          label="操作"
          min-width="120"
          align="center"
          :width="(button_roles.record ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="[1, 3].includes(scope.row.importantStatus) && button_roles.record"
              size="mini"
              type="success"
              @click="handleEdit('add', scope.row)"
            >
              <em class="el-icon-info" /> 数据上报
            </el-button>
            <el-button
              v-if="[1, 2, 3].includes(scope.row.approvalStatus) && button_roles.desc"
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="[1,3].includes(scope.row.approvalStatus) && button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 重新上报
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
import { getPageList } from '@/api/channel-services/period/report'
import pagination from '@/components/Pagination'
import { timePeriod } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  mixins: [timePeriod],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
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
     * 数据上报(add)/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/transport/reportEdit', query: { type, id: item.id }})
    }
  }
}
</script>
