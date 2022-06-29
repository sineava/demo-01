<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>重大风险登记管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="风险事件:"
          prop="incidentName"
        >
          <el-input
            v-model.trim="searchForm.incidentName"
            placeholder="请输入风险事件"
          />
        </el-form-item>
        <el-form-item
          label="是否登记:"
          prop="isCheck"
        >
          <el-select
            v-model="searchForm.isCheck"
            placeholder="请选择是否登记"
          >
            <el-option
              label="是"
              :value="1"
            />
            <el-option
              label="否"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="更新时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="search"
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="风险事件"
          prop="incidentName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="所属作业单元"
          prop="activityName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="制险因素" :show-overflow-tooltip="true">
          <el-table-column label="人的因数">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===1"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="设备因素" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===2"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="环境因素" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===3"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="管理因素" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span
                v-for="item in scope.row.riskControlFactorsInfoVoList"
                :key="item.factorsName"
              >
                <span v-if="item.factorsType===4"> {{ item.factorsName }}、</span>
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="风险值"
          prop="riskValue"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="风险等级">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.riskValue"
              :type="getRiskGrade(scope.row.riskValue).level===1?'success':(getRiskGrade(scope.row.riskValue).level===2?
                '':(getRiskGrade(scope.row.riskValue).level===3?'warning':'danger'))"
              effect="dark"
              size="mini"
            >
              {{ getRiskGrade(scope.row.riskValue).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="风险评估时间"
          prop="assessDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="是否登记">
          <template v-slot="scope">
            {{ scope.row.isCheck ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.desc"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row)"
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
import pagination from '@/components/Pagination'
import { pageEnList } from '@/api/port-services/risk-identification/major-risk-register'
import { getRiskGrade } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        incidentName: '',
        isCheck: ''
      },
      screenTime: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    getRiskGrade(num) {
      return getRiskGrade(num)
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
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
    handleDetail(item, isEdit) {
      this.$router.push({ path: '/risk/registerDetail', query: { id: item.id, isEdit: isEdit }})
    }
  }
}
</script>

