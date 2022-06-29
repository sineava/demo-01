<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>复查记录管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检查项名称:"
          prop="itemName"
        >
          <el-input
            v-model.trim="searchForm.itemName"
            placeholder="请输入检查项名称"
          />
        </el-form-item>
        <el-form-item
          label="检查单位:"
          prop="isUseUnit"
        >
          <el-input
            v-model.trim="searchForm.isUseUnit"
            placeholder="请输入检查单位"
          />
        </el-form-item>
        <el-form-item
          label="复查单位:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="searchForm.organizationName"
            placeholder="请输入复查单位"
          />
        </el-form-item>
        <el-form-item
          label="是否完成复查:"
          prop="isStatus"
        >
          <el-select
            v-model="searchForm.isStatus"
            clearable
            placeholder="请选择是否完成复查"
            style="width: 184px;"
          >
            <el-option
              v-for="item in write"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="实际复查时间:"
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize*(currentPage-1))+scope.$index+ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查项名称"
          prop="itemName"
        />
        <el-table-column
          label="检查单位"
          prop="isUseUnit"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span v-for="(item,index) in scope.row.isUseUnit" :key="index">  {{ index!==0 ? '、':'' }}{{ item ? item[item.length-1] : '' }}</span>
            <!-- <span v-for="(item,index) in scope.row.isUseUnit" :key="index">  {{ index!==0 ? '、':'' }}{{ item ? item.join(' / ') : '' }}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="所属检查计划"
          prop="planningName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="被检查企业/单位名称"
          prop="targetName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="已完成整改">
          <template v-slot="scope">
            <span>{{ scope.row.isComplete === 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已完成复查">
          <template v-slot="scope">
            <span>{{ scope.row.isStatus === 1 ? '已完成' : (scope.row.isStatus === 2 ? '未完成' : (scope.row.isStatus === 3 ? '整改中' : '')) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="复查要求时间"
          prop="reviewTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="复查单位"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="实际复查时间"
          prop="reviewDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, 1)"
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
import { enPageList } from '@/api/general-services/safety-supervision-and-inspection/reviewRecord'
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
        isUseUnit: '',
        organizationName: ''
      },
      screenTime: [],
      write: [
        { value: '1', label: '已完成' },
        { value: '2', label: '未完成' },
        { value: '3', label: '整改中' }
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
      const data = { ...this.searchForm }
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      this.listLoading = true
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
    handleDetail(item, disabled) {
      this.$router.push({ path: '/safe/supervise/reviewDetail', query: { id: item.id, disabled: disabled }})
    }
  }
}
</script>
