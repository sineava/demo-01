<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>节假日设置管理</span>
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
            value-format="yyyy"
            type="year"
            placeholder="选择年份"
          />
        </el-form-item>
        <el-form-item
          label="节日"
          prop="holiday"
        >
          <el-select
            v-model="searchForm.holiday"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in field_holiday"
              :key="index"
              :label="item.value"
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleEdit('add')"
      >
        新增节假日
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
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节日名称">
          <template v-slot="scope">
            <span>{{ scope.row.holiday }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年份">
          <template v-slot="scope">
            <span>{{ scope.row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节日时间范围">
          <template v-slot="scope">
            <span>{{ `${scope.row.timeStart} - ${scope.row.timeEnd}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上报时段范围">
          <template v-slot="scope">
            <span>{{ `${scope.row.reportingStart.slice(0,5)} - ${scope.row.reportingEnd.slice(0,5)}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交人">
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
          label="操作"
          width="260"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="small"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="small"
              type="primary"
              :disabled="scope.row.havePush > 0"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="small"
              type="danger"
              :disabled="scope.row.havePush > 0"
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
import { timePeriod } from '@/utils/public-fields'
import { getPageList, deleteInfo } from '@/api/channel-services/period/set-important-time'
import pagination from '@/components/Pagination'
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
      searchForm: {
        year: '',
        holiday: ''
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
      getPageList({
        ...this.searchForm,
        year: Number(this.searchForm.year) || null
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
    /**
     * 详情/编辑/新增
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/transport/settingEdit', query: { type, id: item ? item.id : null, item: item }})
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
