<template>
  <div>
    <el-form
      ref="searchForm"
      class="form"
      :model="searchForm"
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item
        label="码头名称:"
        prop="wharfName"
      >
        <el-input
          v-model.trim="searchForm.wharfName"
          placeholder="请输入码头名称"
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
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="handleEdit({}, true)"
        >
          新增生产码头
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
      <el-table-column label="码头名称">
        <template v-slot="scope">
          {{ scope.row.wharfName }}
        </template>
      </el-table-column>
      <el-table-column label="所在区域">
        <template v-slot="scope">
          <span>{{ scope.row.coastlineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在航道">
        <template v-slot="scope">
          {{ scope.row.channel && channel.filter(item => (item.value === scope.row.channel))[0].label }}
        </template>
      </el-table-column>
      <el-table-column label="投产年份">
        <template v-slot="scope">
          {{ scope.row.productionYear }}
        </template>
      </el-table-column>
      <el-table-column label="岸线长度（米）">
        <template v-slot="scope">
          {{ scope.row.shorelineLength }}
        </template>
      </el-table-column>
      <el-table-column label="泊位数（个）">
        <template v-slot="scope">
          {{ scope.row.berthNum }}
        </template>
      </el-table-column>
      <el-table-column label="设计靠泊能力（吨） ">
        <template v-slot="scope">
          {{ scope.row.berthingCapacity }}
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
import { getPageList, deleteWharf } from '@/api/port-services/coastline/wharf'
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
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      searchForm: {
        portAreaId: '',
        coastlineId: '',
        wharfName: '',
        channel: ''
      }
    }
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
     * 新增/编辑/详情
     */
    handleEdit(item, isEdit = false) {
      this.$router.push({ path: '/digital/resources/distribution/detail', query: { id: item.id || '', isEdit: isEdit, tabs: this.tabs }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteWharf({ id: item.id }).then(res => {
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
.app-container {
    display: flex;

    .menu {
        overflow-x: hidden;
        width: 250px;
        max-height: 800px;
    }

    .container {
        margin-left: 20px;
        width: 80%;
    }
}
</style>
