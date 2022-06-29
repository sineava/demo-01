<template>
  <div class="body-card">
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="关键字:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入关键字"
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
        <el-form-item
          label="危险等级:"
          prop="riskLevel"
        >
          <el-select
            v-model="searchForm.riskLevel"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in level"
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
            @click="fetchData"
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查项分类"
          prop="categoryName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="危险等级">
          <template v-slot="scope">
            <span>{{ scope.row.riskLevel === 1 ? '一般' : '重大' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查方法"
          :show-overflow-tooltip="true"
          prop="mode"
        />
        <el-table-column
          label="相关依据"
          :show-overflow-tooltip="true"
          prop="basis"
        />
        <el-table-column
          label="检查内容"
          :show-overflow-tooltip="true"
          prop="content"
        />
        <el-table-column
          label="提交人"
          :show-overflow-tooltip="true"
          prop="createBy"
        />
        <el-table-column
          label="提交时间"
          :show-overflow-tooltip="true"
          prop="createTime"
        />
        <el-table-column
          label="操作"
          width="100px"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleAdd(scope.row)"
            >
              <em class="el-icon-edit" /> 添加
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
  </div>
</template>

<script>
import { pageList } from '@/api/general-services/safety-supervision-and-inspection/safetyItem'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  props: {
    checkIdList: {
      type: Array,
      default: () => []
    }
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
        const list = res.data ? res.data.records : []
        this.list = []
        list.forEach(element => {
          element.isShow = true
          this.checkIdList.forEach(child => {
            if (Number(element.id) === Number(child)) {
              element.isShow = false
            }
          })
          if (element.isShow) {
            this.list.push(element)
          }
        })
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleAdd(item) {
      this.$emit('getCheckItems', item)
    }
  }
}
</script>

