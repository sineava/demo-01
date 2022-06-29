<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
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
        <el-form-item label="检测/维修时间:" prop="screenTime">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始时间"
            range-separator="至"
            end-placeholder="开始时间"
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
      <el-button
        type="primary"
        size="small"
        class="el-icon-plus"
        @click="handleDetail"
      >
        新增检测/维修记录
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
        <el-table-column label="设备类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ type[scope.row.facilityCategory - 1].label }}
          </template>
        </el-table-column>
        <el-table-column label="作业类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ jobType[scope.row.jobType - 1].label }}
          </template>
        </el-table-column>
        <el-table-column
          label="检测/维修人"
          prop="repair"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检测/维修时间"
          prop="repairTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检测/维修内容"
          prop="repairContent"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="检测/维修附件" :show-overflow-tooltip="true">
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
          width="260"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail( scope.row,'details')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail( scope.row,'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
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
    </div>
  </el-card>
</template>

<script>
import { pageEnList, deleteMaintain } from '@/api/general-services/enterpriseInfo/enterpriseFacilityMaintain'
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
      screenTime:[],
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
    if (this.$route.query.id) {
      this.facilityName = this.$route.query.facilityName
      this.facilityCategory = this.$route.query.facilityCategory
      this.facilityId = this.$route.query.id
      this.fetchData()
    }
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.ruleForm }
      data.screenStartTime = this.screenTime[0] ? moment(this.screenTime[0]).format('YYYY-MM-DD') : ''
      data.screenEndTime = this.screenTime[1] ? moment(this.screenTime[1]).format('YYYY-MM-DD') : ''
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
      this.screenTime=[]
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
    returnBack(){
      this.$router.push({ path: '/port/equipment'})
    },
    /**
     * 详情
     */
    handleDetail(item,type) {
      this.$router.push({ path: '/enterprise/basic/equipmentinfoDetail', query: { id: item.id, facilityId: this.facilityId, facilityName: this.facilityName, facilityCategory: this.facilityCategory,type }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteMaintain(item.id).then(res => {
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
