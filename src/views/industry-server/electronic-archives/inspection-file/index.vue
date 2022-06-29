<template>
<div>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>船舶检验档案管理</span>
      <span class="detail-header-button">
        <el-button
          :type="tabActive === 1 ? 'primary' : ''"
          @click="tabChange(1)"
        >
          系统已有数据
        </el-button>
        <el-button
          :type="tabActive === 2 ? 'primary' : ''"
          @click="tabChange(2)"
        >
          海事系统查询
        </el-button>
      </span>
    </div>
    <div v-if="tabActive === 2">
      <div class="icon-title">
        <span class="span" />  船舶查询添加（<span style="color:#409EFF"> 请选择输船舶识别号进行查询添加</span>）
      </div>
      <div style="margin: 20px 0;">
        <el-input placeholder="请输入内容" v-model="shipIdentifyNo" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="船舶识别号" value="1"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" type="primary" :loading="searchLoading" @click="searchQuery">搜索</el-button>
        </el-input>
      </div>
      <substituting-record
        v-if="substitutingList.length"
        :list="substitutingList"
        @tabClick="substitutingId = $event" 
      />
    </div>
    <div v-if="tabActive === 1" class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检验编号:"
          prop="shipSurveyNo"
        >
          <el-input
            v-model.trim="searchForm.shipSurveyNo"
            placeholder="请输入检验编号"
          />
        </el-form-item>
        <el-form-item
          label="船名:"
          prop="shipName"
        >
          <el-input
            v-model.trim="searchForm.shipName"
            placeholder="请输入船名"
          />
        </el-form-item>
        <el-form-item label="开始时间:">
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
      <DownUpload
        :show-import="false"
        @getExportData="getExportData"
      />
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检验编号"
          prop="shipSurveyNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船名"
          prop="shipName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船检登记号"
          prop="shipSurveyNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶登记号"
          prop="shipRegisterNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检验种类"
          prop="shipSurveyItemName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="开始时间"
          prop="shipSurveyStartDate"
          :show-overflow-tooltip="true"
        />
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
              @click="handleAdd(scope.row.id)"
            >
              <em class="el-icon-info" />
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
  <record-info v-if="substitutingId" :id="substitutingId" />
</div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getList } from '@/api/ship-inspection/records/index'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { updateShipInspection } from '@/api/ship-inspection/records/index'
import SubstitutingRecord from '../components/SubstitutingRecord.vue'
import RecordInfo from '../components/RecordInfo.vue'
import DownUpload from '@/components/features/DownUpload'
export default {
  components: {
    pagination,
    SubstitutingRecord,
    RecordInfo,
    DownUpload
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
        shipSurveyNo: '',
        shipName: '',
      },
      tabActive: 1,
      searchLoading: false,
      shipIdentifyNo: '',
      substitutingList: [],
      select: '1',
      substitutingId: ''
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
    tabChange(num) {
      this.tabActive = num
      if (num == 1) {
        this.shipIdentifyNo = ''
        this.substitutingList = []
        this.substitutingId = ''
        this.fetchData()
      }
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        isPage: true,
        startDate: momentDate(screenStartTime),
        endDate: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
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
     * 详情/编辑
     */
    handleAdd(id, isEdit) {
      this.$router.push({ path: '/electronic-archives/inspection/detail', query: { id, isEdit }})
    },
    searchQuery() {
      this.searchLoading = true;
      updateShipInspection({shipIdentifyNo: this.shipIdentifyNo}).then(res => {
        this.searchLoading = false;
        if (res.code === '0') {
          this.substitutingList = res?.data || []
        }
      })
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        isPage: false,
        startDate: momentDate(screenStartTime),
        endDate: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }
      getList(queryInfo).then(res => {
        this.table = res?.data?.records || []
        const header = {
          index: '编号',
          shipName: '船名',
          shipSurveyNo: '船检登记号',
          shipRegisterNo: '船舶登记号',
          shipSurveyItemName: '检验种类',
          shipSurveyStartDate: '开始时间'
        }
        const arr = [...this.table.map((x,index) => ({
          index: index + 1,
          shipName: x.shipName,
          shipSurveyNo: x.shipSurveyNo,
          shipRegisterNo: x.shipRegisterNo,
          shipSurveyItemName: x.shipSurveyItemName,
          shipSurveyStartDate: x.shipSurveyStartDate
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '应急值守信息' })
      })
    }
  }
}
</script>
<style>
.input-with-select .el-select .el-input {
  width: 130px;
}
</style>
<style lang="scss" scoped>
/deep/ .clearfix {
  display: flex;
  align-items: center;

  .detail-header-button {
    margin-left: 50px;
  }
}
</style>