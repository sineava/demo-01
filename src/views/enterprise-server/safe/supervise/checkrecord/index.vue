<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>现场检查记录管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检查计划:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入检查计划"
          />
        </el-form-item>
        <el-form-item
          label="发布单位:"
          prop="isUseUnit"
        >
          <el-input
            v-model.trim="searchForm.isUseUnit"
            placeholder="请输入发布单位"
          />
        </el-form-item>
        <el-form-item
          label="检查时间:"
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize*(currentPage-1))+scope.$index+ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="被检查企业/单位名称"
          prop="targetName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发布单位"
          prop="isUseUnit"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span v-for="(item,index) in scope.row.isUseUnit" :key="index">  {{ index!==0 ? '、':'' }}{{ item ? item[item.length-1] : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查计划"
          prop="planningName"
        />
        <el-table-column label="是否填写检查记录">
          <template v-slot="scope">
            <span>{{ scope.row.actualInspectionTime ? '已填写' : '未填写' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查时间"
          prop="actualInspectionTime"
        />
        <el-table-column label="是否存在问题">
          <template v-slot="scope">
            <span>{{ scope.row.isProblem > 0 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="被检查单位负责人"
          prop="personCharge"
        />
        <el-table-column
          label="更新时间"
          prop="updateTime"
        />
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit(scope.row)"
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
import { enPageList } from '@/api/general-services/safety-supervision-and-inspection/safetyInspectRecord'
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
      screenTime:'',
      searchForm: {
        planningName: '',
        isUseUnit: ''
      }
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
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime && this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      enPageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.list.forEach((item,index) => {
          this.list[index].isUseUnit = item.isUseUnit ? JSON.parse(item.isUseUnit) : []
        })
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
      this.screenTime = ''
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
     * 填写检查记录
     */
    handleEdit(item) {
      this.$router.push({ path: '/safe/supervise/checkrecordCheck', query: { id: item.id }})
    }
  }
}
</script>
