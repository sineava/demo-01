<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>培训情况管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="关键字:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入企业名称/填报人"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="培训方式:"
          prop="trainModes"
        >
          <el-input
            v-model.trim="searchForm.trainModes"
            placeholder="请输入培训方式"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="填报时间:"
          prop="date"
        >
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
        @click="handleDetail('add')"
      >
        新增培训情况
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
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.trainModes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训对象" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.trainObject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.filledBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报人联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.contactNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.fillingTime.replace('T', ' ') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
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
import { momentDate } from '@/utils/index'
import { trainingSituatioPageList, trainingSituationDelete } from '@/api/general-services/educateTrain/educationSituation'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
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
        keyword: '',
        trainModes: ''
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
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59')
      }
      trainingSituatioPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.currentPage = 1
      this.fetchData()
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
     * 详情
     */
    handleDetail(type, item) {
      const id = item ? item.id : 0
      this.$router.push({ path: '/educate/situationDetail', query: { type, id }})
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        trainingSituationDelete({ id: item.id }).then(res => {
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

