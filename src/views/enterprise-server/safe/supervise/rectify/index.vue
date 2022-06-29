<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>整改记录</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检查项:"
          prop="itemName"
        >
          <el-input
            v-model.trim="searchForm.itemName"
            placeholder="请输入检查项"
          />
        </el-form-item>
        <el-form-item
          label="整改状态:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择整改状态"
            style="width: 184px;"
          >
            <el-option
              label="未整改"
              value="0"
            />
            <el-option
              label="已整改"
              value="1"
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
            placeholder="请选择整改时限"
            style="width: 184px;"
          >
            <el-option
              v-for="item in time_limit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
            value-format="yyyy-MM-dd"
            type="daterange"
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
            <span>{{ (pageSize*(currentPage-1))+scope.$index+ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查项"
          prop="itemName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="企业名称"
          prop="targetName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查计划名称"
          prop="planningName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查时间"
          prop="actualInspectionTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="整改截止时间"
          prop="deadlineDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="整改责任人"
          prop="directorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="整改状态">
          <template v-slot="scope">
            <span>{{ scope.row.isStatus === 1 ? '已整改' : '未整改' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="整改时限"
          prop="timeRequirement"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="整改落实资金"
          prop="fund"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="整改时间"
          prop="improvedDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="提交时间"
          prop="createTime"
          :show-overflow-tooltip="true"
        >
          <template v-slot="{row}">
            {{ row.isStatus === 1 ? row.createTime : '' }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc || button_roles.update"
          label="操作"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              :disabled="scope.row.isStatus === 0 ? false : true"
              size="mini"
              plain
              @click="handleEdit(scope.row)"
            >
              <em class="el-icon-edit" /> 填写
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
import { enPageList } from '@/api/general-services/safety-supervision-and-inspection/improvementRecord'
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
      searchForm: {
        itemName: '',
        isStatus: '',
        timeRequirement: ''
      },
      screenTime: [],
      time_limit: [
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
      const data = { ...this.searchForm, pageNum: this.currentPage, pageSize: this.pageSize }
      if (this.screenTime && this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      this.listLoading = true
      enPageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
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
    handleDetail(item) {
      this.$router.push({ path: '/safe/supervise/rectifyDetail', query: { id: item.id }})
    },
    /**
     * 修改
     */
    handleEdit(item) {
      this.$router.push({ path: '/safe/supervise/addRectify', query: { id: item.id }})
    }
  }
}
</script>
