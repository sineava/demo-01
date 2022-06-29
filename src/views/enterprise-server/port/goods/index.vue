<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口危险货物作业附证信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item label="到期时间:">
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
      <div>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          v-if="button_roles.create"
          @click="handleDetail('add','')"
        >
          添加港口危险货物作业附证信息
        </el-button>
      </div>
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="港口经营人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.operator }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="作业场所" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.areaType }}
          </template>
        </el-table-column>
        <el-table-column label="作业方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.jobType }}
          </template>
        </el-table-column>
        <el-table-column label="作业危险货物品名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.goodsName }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.maturityDate || '永久' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag :type="scope.row.isOverdue === '过期' ? 'danger' : (scope.row.isOverdue === '正常' ? 'success': '')">{{ scope.row.isOverdue }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="历史资质信息" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.isHistory === 1"
              size="mini"
              plain
              @click="handleInfo(scope.row)"
            >
              <em class="el-icon-info" /> 查看
            </el-button>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
            v-if="button_roles.update ||  button_roles.desc"
            label="操作"
            align="center"
            :width="(button_roles.update ? 90 : 0) + (button_roles.desc ? 90 : 0)"
          >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.update"
              size="mini"
              plain
              type="primary"
              @click="handleDetail('edit', scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              v-if="button_roles.desc"
              plain
              @click="handleDetail('details', scope.row)"
            >
              详情
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
import { getGoodsCertificatePageList } from '@/api/general-services/enterprise-qualification/business-license'
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
      row: '',
      screenTime: [],
      searchForm: {
        operator: ''
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
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const queryInfo = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(screenStartTime),
        endTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }
      getGoodsCertificatePageList(queryInfo).then(res => {
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
     * 历史资质
     */
    handleInfo(item) {
      this.$router.push({ path: '/enterprise/qualification/goodsHistory', query: { certificateNumber: item.certificateNumber }})
    },
    /**
     * 详情
     */
    handleDetail(type, item) {
      this.$router.push({ path: '/enterprise/qualification/goodsDetail', query: { id: item.id,type:type }})
    }
  }
}
</script>

