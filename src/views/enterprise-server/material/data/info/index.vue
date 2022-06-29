<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>违规行为信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="违规行为名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入违规行为名称"
          />
        </el-form-item>
        <el-form-item
          label="违规行为种类:"
          prop="categoryId"
        >
          <el-select
            v-model="searchForm.categoryId"
            clearable
            placeholder="请选择检查项分类"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
        <div />
        <el-table-column
          label="违规行为名称"
          :show-overflow-tooltip="true"
          prop="name"
        />
        <el-table-column
          label="违规行为种类"
          :show-overflow-tooltip="true"
          prop="categoryName"
        />
        <el-table-column
          label="关联法律法规"
          :show-overflow-tooltip="true"
          prop="legislationName"
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
              @click="handleAdd(scope.row, 1)"
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
import { pageList } from '@/api/general-services/safety-supervision-and-inspection/safetyViolation'
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
        categoryId: ''
      },
      categoryList: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    const res = await findByCategoryList({ type: 2 })
    this.categoryList = res.data.map(cate => ({ label: cate.name, value: cate.id }))
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
     * 违规行为详情
     */
    handleAdd(item) {
      this.$router.push({ path: '/material/data/infoDetail', query: { item }})
    }
  }
}
</script>

