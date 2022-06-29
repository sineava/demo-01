<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业自查整改情况</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="自查名称:"
          prop="examineName"
        >
          <el-input
            v-model.trim="searchForm.examineName"
            placeholder="请输入自查名称"
          />
        </el-form-item>
        <el-form-item
          label="整改状态:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in isStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="整改时限:"
          prop="timeRequirement"
        >
          <el-select
            v-model="searchForm.timeRequirement"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in timeRequirement"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="整改时间:">
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="自查项名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="自查名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.examineName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改截止时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.deadlineDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改责任人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.directorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.isStatus ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改时限" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.timeRequirement && timeRequirement.filter(item => item.value === scope.row.timeRequirement)[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改落实资金" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.fund }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整改时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.improvedDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="记录时间"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row, 'detail')"
            >
              <em class="el-icon-info" /> 详情
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
import { getPageHyList } from '@/api/general-services/enterprise-self-inspection/rectification-situation'
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
        examineName: '',
        isStatus: '',
        timeRequirement: ''
      },
      isStatus: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      timeRequirement: [
        { value: '立即整改', label: '立即整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '停业整改', label: '停业整改' },
        { value: '挂牌督办', label: '挂牌督办' }
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
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageHyList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59'),
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
     * 详情
     */
    handleDetail(_, item, type) {
      this.$router.push({ path: '/safe/self/rectifyDetail', query: { id: item.id, type }})
    }
  }
}
</script>

