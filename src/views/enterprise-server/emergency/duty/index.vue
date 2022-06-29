<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急值守信息管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item label="计划值守时间:">
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
        size="small"
        type="primary"
        icon="el-icon-plus"
        style="float: left; margin-right: 10px;"
        @click="handleAdd"
      >
        新增应急值守
      </el-button>
      <DownUpload
        :show-import="false"
        @getExportData="getExportData"
      />
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
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
      <el-table-column label="所属企业（单位）" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.enterpriseName }}
        </template>
      </el-table-column>
      <el-table-column label="计划值守时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ momentDate(scope.row.onDutyStartTimePlan,'YYYY-MM-DD HH:mm') }} 至 {{ momentDate(scope.row.onDutyEndTimePlan,'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="实际值守时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ momentDate(scope.row.onDutyStartTime,'YYYY-MM-DD HH:mm') }} {{ scope.row.onDutyStartTime && scope.row.onDutyEndTime ? '至' : '' }} {{ momentDate(scope.row.onDutyEndTime,'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="带班领导" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.leadership }}
        </template>
      </el-table-column>
      <el-table-column label="值守人员" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.person }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
        label="操作"
        align="center"
        :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 120 : 0) + (button_roles.delete ? 95 : 0)"
      >
        <template v-slot="scope">
          <el-button
            v-if="button_roles.desc"
            size="small"
            plain
            @click="handleDetail(scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            v-if="button_roles.update"
            size="small"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            <em class="el-icon-edit" /> 填写值守情况
          </el-button>
          <el-button
            v-if="button_roles.delete "
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <em class="el-icon-delete" /> 删除
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
  </el-card>
</template>

<script>
import DownUpload from '@/components/features/DownUpload'
import { momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import { telephone } from '@/utils/validate'
import { getPageList, deleteWatch, selectList } from '@/api/emergency-services/watch'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    DownUpload
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
        screenStartTime: '',
        screenEndTime: ''
        // enterpriseName: ''
      },
      addForm: {
        leaders: [], // 带班领导
        persons: [] // 值守人员
      },
      rules: {
        leaders: [
          { required: true, message: '请选择带班领导', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择值守人员', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入所属单位企业', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        telephone: [
          { validator: telephone, trigger: 'blur' }
        ]
      }
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
    momentDate,
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59'),
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
     * 详情/编辑/新增
     */
    handleEdit(item) {
      this.$router.push({ path: '/emergency/dutyEdit', query: { id: item ? item.id : null }})
    },
    handleAdd() {
      this.$router.push({ path: '/emergency/dutyAdd' })
    },
    handleDetail(item) {
      this.$router.push({ path: '/emergency/dutyDetail', query: { id: item ? item.id : null }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteWatch({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      const queryInfo = { ...this.searchForm }
      selectList(queryInfo).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          enterpriseName: '所属企业(单位)',
          date1: '值班时间',
          leadership: '带班领导',
          person: '值守人员',
          date2: '更新时间'
        }
        const arr = [...this.table.map(x => ({
          enterpriseName: x.enterpriseName,
          date1: `${momentDate(x.onDutyEndTimePlan,'YYYY-MM-DD HH:mm')} ~ ${momentDate(x.onDutyStartTimePlan,'YYYY-MM-DD HH:mm')}`,
          leadership: x.leadership,
          person: x.person,
          date2: x.updateTime
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '应急值守信息' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden-option /deep/ .el-input__suffix {
    visibility: hidden;
}

.hidden-option /deep/ .el-tag.el-tag--info {
    // background-color: #f0f9eb;
    border-color: transparent;
    color: #409eff;
}

.hidden-option /deep/ .el-tag__close.el-icon-close {
    top: 0;
    right: -7px;
    color: #ffffff;
    background-color: #c0c4cc;
}

/deep/ .el-select-dropdown.el-popper.is-multiple {
    visibility: hidden;
}
</style>

