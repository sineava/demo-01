<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      :disabled="disabled ? true : false"
      size="small"
    >
      <el-form-item
        label="名称:"
        prop="itemName"
      >
        <el-input
          v-model="searchForm.itemName"
          placeholder="请输入自查项/所属单位"
        />
      </el-form-item>
      <el-form-item
        label="创建单位/企业:"
        prop="isUseUnit"
      >
        <el-input
          v-model="searchForm.isUseUnit"
          placeholder="请输入创建单位/企业"
        />
      </el-form-item>
      <el-form-item
        label="自查项分类:"
        prop="cate"
      >
        <el-select
          v-model="searchForm.categoryId"
          clearable
          placeholder="请选择"
          style="width: 100%;"
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
        label="创建时间:"
        prop="screenTime"
      >
        <el-date-picker
          v-model="screenTime"
          type="daterange"
          placeholder="选择时间"
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
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="编号"
        width="55"
      >
        <template v-slot="scope">
          <span>{{ (pageSize*(currentPage-1))+scope.$index+ 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="自查项名称"
        prop="itemName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="自查项分类"
        prop="categoryName"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="自查周期（标准）" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.cycle === 1 ? '周' : (scope.row.cycle === 2 ? '月' : (scope.row.cycle === 3 ? '季' : '年')) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="自查标准"
        prop="standard"
      />
      <el-table-column label="创建机构" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span :class="scope.row.type===2 ? 'enterprise' : ''">{{ scope.row.type === 1 ? '本企业': scope.row.isUseUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        prop="createBy"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        prop="createTime"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        width="100px"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            plain
            :disabled="isExist(scope.row.id)"
            @click="handleSelect(scope.row)"
          >
            <em class="el-icon-circle-plus-outline" /> 添加
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
</template>

<script>
import { pageList, deleteItem } from '@/api/general-services/enterprise-self-inspection/examineItem'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: '',
      searchForm: {
        categoryId: '',
        itemName: '',
        isUseUnit: ''
      },
      categoryList: []
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    this.fetchData()
  },
  methods: {
    isExist(id) {
      return this.selected && this.selected.length > 0 ? this.selected.some(val => val.id === id) : false
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      pageList(data).then(res => {
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
     * 选择项目
     */
    handleSelect(item) {
      this.$emit('addItemData', item)
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteItem(item.id).then(res => {
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
<style lang="scss" scoped>
.enterprise {
    color: #409eff;
}
</style>

