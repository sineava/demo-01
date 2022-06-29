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
        <el-form-item label="值班时间:">
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
      <div style="display: flex;">
        <el-button
          v-if="button_roles.create"
          size="small"
          type="primary"
          icon="el-icon-plus"
          style="float: left; margin-right: 10px;"
          @click="handleAdd"
        >
          新增应急值守信息
        </el-button>
        <DownUpload
          :button_roles="button_roles"
          :show-import="false"
          @getExportData="getExportData"
        />
      </div>
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
        align="center"
      >
        <template v-slot="scope">
          {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="所属企业（单位）" align="center">
        <template v-slot="scope">
          {{ scope.row.enterpriseName }}
        </template>
      </el-table-column>
      <el-table-column label="值班时间" align="center">
        <template v-slot="scope">
          {{ momentDate(scope.row.onDutyEndTimePlan,'YYYY-MM-DD HH:mm') }} ~ {{ momentDate(scope.row.onDutyStartTimePlan,'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="带班领导" align="center" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.leadership }}
        </template>
      </el-table-column>
      <el-table-column label="值守人员" align="center" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.person }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="button_roles.desc ||button_roles.delete || button_roles.update"
        label="操作"
        align="center"
        :width="150"
      >
        <template v-slot="scope">
          <el-dropdown>
            <el-button size="mini" type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="button_roles.desc" @click.native="handleDetail(scope.row,'info')"><em class="el-icon-info" /> 详情</el-dropdown-item>
              <el-dropdown-item v-if="button_roles.update" :disabled="scope.row.onDutyStartTime ? true :false" @click.native="handleAdd(scope.row)"><em class="el-icon-edit" /> 编辑</el-dropdown-item>
              <el-dropdown-item v-if="button_roles.record" @click.native="handleSituation(scope.row)"><em class="el-icon-circle-plus" /> 填写值守情况</el-dropdown-item>
              <el-dropdown-item v-if="button_roles.delete" @click.native="handleDelete(scope.$index, scope.row)"><em class="el-icon-delete" /> 删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      searchForm: {},
      screenTime: [],
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
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59'),
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
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
    handleAdd(item) {
      this.$router.push({ path: '/emergency/data/dutyAdd', query: { id: item ? item.id : null } })
    },
    handleSituation(item) {
      this.$router.push({ path: '/emergency/data/dutyEdit', query: { id: item ? item.id : null }})
    },
    handleDetail(item,oper) {
      this.$router.push({ path: '/emergency/data/dutyDetail', query: { id: item ? item.id : null }})
    },
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