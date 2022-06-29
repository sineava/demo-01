<template>
  <div>
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>应急专家
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <el-button
      v-if="type === 'index' && tabType === 'add'"
      type="primary"
      size="small"
      @click="handleAdd"
    >
      添加应急专家
    </el-button>
    <div class="app-container">
      <el-form
        v-if="type === 'add'"
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item>
          <em
            class="el-icon-back"
            style="font-size: 14px; cursor: pointer;"
            @click="back"
          />
        </el-form-item>
        <el-form-item
          label="专家姓名:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入专家姓名"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          label="专家类别:"
          prop="category"
        >
          <el-input
            v-model.trim="searchForm.category"
            placeholder="请输入专家类别"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          label="专家职务:"
          prop="post"
        >
          <el-input
            v-model.trim="searchForm.post"
            placeholder="请输入专家职务"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item
          label="技术职称:"
          prop="technicalTitle"
        >
          <el-input
            v-model.trim="searchForm.technicalTitle"
            placeholder="请输入技术职称"
            maxlength="50"
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
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专家类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.post }}</span>
          </template>
        </el-table-column>
        <el-table-column label="技术职称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.technicalTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所学专业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位位及部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.departmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现从事岗位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.currentPosition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'index'"
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              size="small"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="tabType === 'add'"
              size="small"
              type="danger"
              @click="handleRevoke(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 取消选择
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'add'"
          label="操作"
          width="180"
        >
          <template v-slot="scope">
            <el-button
              size="small"
              plain
              :disabled="scope.row.isDispatch === 1"
              @click="handleDispatch(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 选择
            </el-button>
            <el-button
              size="small"
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
  </div>
</template>

<script>
import { pageResponseExpert, pageExpertList, dispatchExpert, withdrawExpert } from '@/api/emergency-services/disposal-respons'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      type: 'index', // index:首页,add: 添加应急
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        category: '',
        post: '',
        technicalTitle: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.type === 'index') {
        this.listLoading = true
        pageResponseExpert({
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
      if (this.type === 'add') {
        this.listLoading = true
        pageExpertList({
          ...this.searchForm,
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(item) {
      this.$router.push({ path: '/data/expertAdd', query: { id: item.expertId, type: 'detail' }})
    },
    handleAdd() {
      this.type = 'add'
      this.fetchData()
    },
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 返回列表
     */
    back() {
      this.type = 'index'
      this.fetchData()
    },
    /**
     * 派遣
     */
    handleDispatch(_, item) {
      const dto = {
        disposalId: this.id,
        expertId: item.expertId
      }
      dispatchExpert(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('派遣完成!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 撤回
     */
    handleRevoke(_, item) {
      withdrawExpert({ responseId: item.responseExpertId }).then(res => {
        if (res.code === '0') {
          this.$message.success('撤回完成!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
