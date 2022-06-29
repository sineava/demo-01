<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>岸线审批信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
        label-width="80px"
      >
        <el-form-item
          label="组织机构:"
          prop="orgName"
        >
          <el-input
            v-model.trim="searchForm.orgName"
            placeholder="请输入组织机构"
          />
        </el-form-item>
        <el-form-item
          label="岸线类型:"
          prop="coastlineCategory"
        >
          <el-select
            v-model="searchForm.coastlineCategory"
            clearable
            placeholder="请选择岸线类型"
          >
            <el-option
              label="深水岸线"
              value="深水岸线"
            />
            <el-option
              label="非深水岸线"
              value="非深水岸线"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="批复时间:">
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
          align="center"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="建筑项目名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.constructionProjectName }}
          </template>
        </el-table-column>
        <el-table-column label="岸线类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.coastlineCategory }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岸线使用功能" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.useFunction }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.contactsPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岸线申请位置" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.applyCoastlineLocation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岸线使用长度" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.applyCoastlineLength }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岸线批复文号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.approvalNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岸线批复时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.approvalDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
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
import { momentDate } from '@/utils/index'
import { getPageList } from '@/api/port-services/coastline/coastline-approval'
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
        orgName: '',
        coastlineCategory: ''
      },
      type: [
        {
          value: 1,
          label: '岸线类型1'
        }, {
          value: 2,
          label: '岸线类型2'
        }
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
      let [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59'),
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
    handleDetail(item) {
      this.$router.push({ path: '/plan/shorelineDetail', query: { id: item ? item.id : null }})
    }
  }
}
</script>

