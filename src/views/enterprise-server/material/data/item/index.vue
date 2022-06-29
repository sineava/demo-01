<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全检查项目</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="检查项目名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入检查项目名称"
          />
        </el-form-item>
        <el-form-item
          label="检查项分类:"
          prop="categoryId"
        >
          <el-select
            v-model="searchForm.categoryId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查项目名称"
          prop="name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查项分类"
          prop="categoryName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查方法"
          prop="mode"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="相关依据"
          prop="basis"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查内容"
          prop="content"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="提交人"
          prop="createBy"
        />
        <el-table-column
          label="提交时间"
          prop="createTime"
        />
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) "
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
import { pageList } from '@/api/general-services/safety-supervision-and-inspection/safetyItem'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
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
        name: '',
        categoryId: '',
        riskLevel: ''
      },
      categoryList: [],
      level: [
        { value: '1', label: '一般' },
        { value: '2', label: '重大' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
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
      pageList(data).then(res => {
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
     * 检查项详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/material/data/itemDetail', query: { item }})
    }
  }
}
</script>

