<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      船闸通航情况统计
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        :rules="rules"
        size="small"
      >
        <el-form-item
          label="选择年份:"
          prop="year"
        >
          <el-date-picker
            v-model="searchForm.year"
            type="year"
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
        <el-table-column label="时间">
          <template v-slot="scope">
            {{ scope.row.timeInfo | dateFilter }}
          </template>
        </el-table-column>
        <el-table-column label="日历天数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.calendarDays }}
          </template>
        </el-table-column>
        <el-table-column label="停航天数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.restDays }}
          </template>
        </el-table-column>
        <el-table-column label="通航天数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.workingDays }}
          </template>
        </el-table-column>
        <el-table-column label="通航总计" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.workingCount }}
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="报送部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="210"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              size="small"
              plain
              :disabled="scope.row.id === null && scope.row.type !== 'year'"
              @click="handleDetail(scope.row.type === 'year' ? 'year' : 'month', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="scope.row.type !== 'year'"
              size="small"
              type="primary"
              @click="handleEdit('month', scope.row.id ? 'edit' : 'add', scope.row)"
            >
              <em class="el-icon-edit" /> 数据填报
            </el-button>
            <el-button
              v-if="scope.row.type !== 'year'"
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <em class="el-icon-delete" /> 删除信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { momentDate } from '@/utils/index'
import { getPageList, deleteInfo } from '@/api/channel-services/ship/year-statistical'
export default {
  filters: {
    dateFilter(val) {
      if (val === '年报合计') return '年报合计'
      return momentDate(val, 'YYYY-MM')
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      searchForm: {
        year: Date.now()
      },
      rules: {
        year: [
          { required: true, message: '请选择年份', trigger: 'blur' }
        ]
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
    // 查询列表数据
    async fetchData() {
      this.listLoading = true
      getPageList({
        year: momentDate(this.searchForm.year, 'YYYY')
      }).then(res => {
        const months = res.data.map(x => Number(momentDate(x.timeInfo, 'M')))
        for (let i = 1; i <= 12; i++) {
          if (!months.includes(i)) {
            const time = `${momentDate(this.searchForm.year, 'YYYY')}-${i < 10 ? '0' + i : i}`
            res.data.splice(i - 1, 0, {
              calendarDays: moment(time, 'YYYY-MM').daysInMonth(),
              createTime: '',
              departmentName: '',
              id: null,
              restDays: '',
              timeInfo: time,
              workingCount: '',
              workingDays: ''
            })
          }
        }
        const footer = {
          calendarDays: 0,
          createTime: '',
          departmentName: '',
          id: null,
          restDays: 0,
          timeInfo: '年报合计',
          workingCount: 0,
          workingDays: 0,
          type: 'year'
        }
        res.data.forEach(x => {
          if (x.restDays) footer.restDays += x.restDays
          if (x.workingDays) footer.workingDays += x.workingDays
          if (x.workingCount) footer.workingCount += x.workingCount
          if (x.calendarDays) footer.calendarDays += x.calendarDays
        })
        res.data.push(footer)
        this.list = res.data ? res.data : []
        this.listLoading = false
      })
    },
    // 查询
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
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    // 切换每页大小
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 新增/编辑
    handleEdit(dateType = '', type, item) {
      this.$router.push({ path: '/digital/ship/situationEdit', query: { dateType, type, id: item.id || null }})
    },
    // 详情(年报/月报)
    handleDetail(dateType = '', item, year = '') {
      if (dateType === 'month') {
        const flag = Date.parse(item.timeInfo) <= Date.parse(moment().subtract(1, 'months').format('YYYY-MM'))
        if (!flag) {
          this.$message.warning('只能操作之前月份数据')
          return
        }
      } else {
        year = momentDate(this.searchForm.year, 'YYYY')
      }
      this.$router.push({ path: '/digital/ship/situationDetail', query: { dateType, id: item ? item.id : null, date: item ? item.timeInfo : null, year }})
    },
    // 删除
    handleDelete(item) {
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

