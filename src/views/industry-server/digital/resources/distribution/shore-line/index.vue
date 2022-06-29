<template>
  <div>
    <el-form
      ref="searchForm"
      class="form"
      :model="searchForm"
      :inline="true"
      size="small"
      label-width="80px"
    >
      <el-form-item
        label="岸线名称:"
        prop="coastlineName"
      >
        <el-input
          v-model="searchForm.coastlineName"
          placeholder="请输入岸线名称"
        />
      </el-form-item>
      <el-form-item
        label="所在航道:"
        prop="channel"
      >
        <el-select
          v-model="searchForm.channel"
          clearable
          placeholder="请选择所在航道"
        >
          <el-option
            v-for="item in channel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search"
        >
          查询
        </el-button>
        <el-button
          icon="el-icon-refresh-left"
          @click="resetForm"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleEdit({}, true)"
        >
          新增港口规划文件
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
          {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="岸线名称" :show-overflow-tooltip="true" prop="coastlineName" />
      <el-table-column label="所在港口名称" :show-overflow-tooltip="true" prop="portName" />
      <el-table-column label="所在港区名称" :show-overflow-tooltip="true" prop="portAreaName" />
      <el-table-column label="所在航道" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.channel && channel.find(item => (item.value === scope.row.channel)).label }}
        </template>
      </el-table-column>
      <el-table-column label="岸别">
        <template v-slot="scope">
          {{ scope.row.type === 1 ? '左' : '右' }}
        </template>
      </el-table-column>
      <el-table-column label="合计" prop="totalLength" />
      <el-table-column label="已开发利用 ">
        <template v-slot="scope">
          {{ scope.row.usingLength && scope.row.usingLength + '米' }}
        </template>
      </el-table-column>
      <el-table-column label="规划利用">
        <template v-slot="scope">
          {{ scope.row.planningLength && scope.row.planningLength + '米' }}
        </template>
      </el-table-column>
      <el-table-column label="利用状况" :show-overflow-tooltip="true" prop="utilizationStatus" />
      <el-table-column label="规划用途" :show-overflow-tooltip="true" prop="planningPurposes" />
      <el-table-column
        label="操作"
        width="260"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            plain
            @click="handleEdit(scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row, true)"
          >
            <em class="el-icon-edit-outline" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
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
</template>
<script>
import { shoreLine } from '@/utils/public-fields'
import { getPageList, deleteLine } from '@/api/port-services/coastline/coastline-planning'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  mixins: [shoreLine],
  props: {
    tabs: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      current: 2,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      areaList: [], // 区域列表
      searchForm: {
        portAreaId: '',
        coastlineName: '',
        channel: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(item, isEdit = false) {
      this.$router.push({ path: '/digital/resources/distribution/detail', query: { id: item.id || '', isEdit: isEdit, tabs: this.tabs }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteLine({ id: item.id }).then(res => {
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

