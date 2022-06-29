<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>大坝信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="大坝名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入大坝名称"
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleEdit('add')"
      >
        新增大坝信息
      </el-button>
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
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="大坝名称">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="大坝编码全称">
          <template v-slot="scope">
            {{ scope.row.coding }}
          </template>
        </el-table-column>
        <el-table-column label="大江编码">
          <template v-slot="scope">
            {{ scope.row.greatRiverCoding }}
          </template>
        </el-table-column>
        <el-table-column label="大江名称">
          <template v-slot="scope">
            {{ scope.row.greatRiverName }}
          </template>
        </el-table-column>
        <el-table-column label="干流名称">
          <template v-slot="scope">
            {{ scope.row.mainStreamName }}
          </template>
        </el-table-column>
        <el-table-column label="干流编码">
          <template v-slot="scope">
            {{ scope.row.mainStreamCoding }}
          </template>
        </el-table-column>
        <el-table-column label="支流名称">
          <template v-slot="scope">
            {{ scope.row.tributaryName }}
          </template>
        </el-table-column>
        <el-table-column label="支流编码">
          <template v-slot="scope">
            {{ scope.row.tributaryCoding }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="small"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="small"
              type="primary"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 删除
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
import { timePeriod } from '@/utils/public-fields'
import { getPageList, deleteInfo } from '@/api/channel-services/ship/dam'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  mixins: [timePeriod],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
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
     * 详情/编辑/新增
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/ship/damEdit', query: { type, id: item ? item.id : null, item }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    }
  }
}
</script>
