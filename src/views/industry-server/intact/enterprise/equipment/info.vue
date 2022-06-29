<template>
  <el-card class="body-card">
     <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="检测维护信息" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="作业类型:"
          prop="jobType"
        >
          <el-select
            v-model="ruleForm.jobType"
            clearable
            placeholder="请选择作业类型"
          >
            <el-option
              v-for="item in jobType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="检测/维修人:"
          prop="repair"
          label-widt="100"
        >
          <el-input
            v-model.trim="ruleForm.repair"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="检测/维修时间:"
          prop="date"
        >
          <el-date-picker
            v-model="date"
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
            @click="fetchData"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('ruleForm')"
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
          width="95"
        >
          <template v-slot="scope">
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="设备名称"
          prop="facilityName"
        />
        <el-table-column label="设备类别">
          <template v-slot="scope">
            {{ type[scope.row.facilityCategory - 1].label }}
          </template>
        </el-table-column>
        <el-table-column label="作业类型">
          <template v-slot="scope">
            {{ jobType[scope.row.jobType - 1].label }}
          </template>
        </el-table-column>
        <el-table-column
          label="检测/维修人"
          prop="repair"
        />
        <el-table-column
          label="检测/维修时间"
          prop="repairTime"
        />
        <el-table-column
          label="检测/维修内容"
          prop="repairContent"
          show-overflow-tooltip
        />
        <el-table-column label="检测/维修附件">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDownload(scope.row)"
            >
              <em class="el-icon-download" /> 下载
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail( scope.row)"
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
import { pageEnList } from '@/api/general-services/enterpriseInfo/enterpriseFacilityMaintain'
import pagination from '@/components/Pagination'
import { downloadCodeImg } from '@/utils/index'
import moment from 'moment'
export default {
  components: {
    pagination
  },
  data() {
    return {
      facilityId: '',
      facilityName: '',
      facilityCategory: '',
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      date:[],
      ruleForm: {
        jobType: '',
        repair: '',
        screenStartTime: '',
        screenEndTime: ''
      },
      jobType: [
        { value: '1', label: '维修' },
        { value: '2', label: '检测' }
      ],
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ],
      startPicker: {
        disabledDate: time => {
          // 设置当前时间后的时间不可选
          if (this.ruleForm.screenEndTime) {
            return time.getTime() > this.ruleForm.screenEndTime.getTime()
          }
        }
      },
      endPicker: {
        disabledDate: time => {
          if (this.ruleForm.screenStartTime) {
            return time.getTime() < this.ruleForm.screenStartTime.getTime()
          }
        }
      }
    }
  },
  mounted() {
    const { id } = this.$route.query
    this.facilityId = id
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.ruleForm }
      data.screenStartTime = this.date[0] ? moment(this.date[0]).format('YYYY-MM-DD') : ''
      data.screenEndTime = this.date[1] ? moment(this.date[1]).format('YYYY-MM-DD') : ''
      data.facilityId = this.facilityId
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.date = []
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
     * 下载
     */
    handleDownload(item) {
      item.enterpriseFacilityMaintainEnclosureVoList.forEach(element => {
        if (element.filePath) {
          downloadCodeImg(element.filePath)
        }
      })
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/intact/enterprise/equipment/info/detail', query: { id: item.id, name: item.facilityName }})
    }
  }
}
</script>
