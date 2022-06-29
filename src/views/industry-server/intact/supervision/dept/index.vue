<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门机构查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="部门名称:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="searchForm.departmentName"
            placeholder="请输入部门名称"
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
          <el-button
            plain
            size="small"
            @click="tableOpen"
          >
            全部展开
          </el-button>
          <el-button
            plain
            size="small"
            @click="tableShrink"
          >
            全部折叠
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="treeData"
        style="margin-bottom: 20px; width: 100%;"
        row-key="enterpriseId"
        stripe
        fit
        highlight-current-row
        :default-expand-all="expandAll"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        class="table-border"
      >
        <el-table-column
          show-overflow-tooltip
          prop="name"
          label="部门名称"
        >
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="状态"
          align="center"
          width="120"
        >
          <template v-slot="scope">
            <span :class="['dot', scope.row.state ? 'text-green' : 'text-red']" />
            {{ scope.row.state ? '启用' : '禁用' }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="成员数量"
          align="center"
          width="120"
        >
          <template v-slot="scope">
            <span style="color: #64b9ff;">{{ scope.row.personNumbers }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主管人员"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            {{ scope.row.directorName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="更新时间"
          align="center"
          width="150"
        >
          <template v-slot="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          sortable
          label="排序"
          align="center"
          width="120"
        /> -->
        <el-table-column
          label="操作"
          align="center"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      /> -->
    </div>
  </el-card>
</template>
<script>
import { getManagementDepartmentSelectList } from '@/api/general-services/intact'
// import pagination from '@/components/Pagination'
import { toTreeData } from '@/utils/index'
export default {
  components: {
    // pagination
  },
  data() {
    return {
      listLoading: false,
      treeData: [],
      expandAll: false,
      tableKey: 1,
      currentPage: 1,
      pageSize: 1,
      total: 0,
      searchForm: {
        departmentName: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getManagementDepartmentSelectList({
        ...this.searchForm
      }).then(res => {
        if (!res.data) return
        if (this.searchForm.departmentName) { // 筛选则显示普通列表
          const data = []
          res.data.forEach(item=>{
            if (item.departmentName.search(this.searchForm.departmentName) !== -1){
              data.push(item)
            }
          })
          this.treeData = data
        } else {
          this.treeData = toTreeData(res.data)
        }
        this.total = res.data ? res.data.length : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/intact/supervision/deptEdit', query: { id: item ? item.id : null, treeData: this.treeData || [], type }})
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 收缩
    tableShrink() {
      this.expandAll = false
      // 赋予随机数，让表格刷新
      this.tableKey = Math.random()
    },
    // 展开
    tableOpen() {
      this.expandAll = true
      // 赋予随机数，让表格刷新
      this.tableKey = Math.random()
    }
  }
}
</script>
<style lang="scss" scoped>
.setting-form {
    margin: 40px 20px;

    /deep/ .el-input--medium {
        width: 380px;
    }

    /deep/ .el-radio--medium.is-bordered .el-radio__inner {
        display: none;
    }

    /deep/ .el-radio--medium.is-bordered {
        border-radius: 18px;
        padding: 10px 30px 0 20px;
    }

    &.add-form {
        margin: 10px 20px;

        /deep/ .el-textarea__inner {
            height: 100px;
            resize: none;
        }
    }
}

.mdept-form {
    .el-form-item {
        margin-bottom: 0;
    }
}

.dot {
    display: inline-block;
    margin-right: 4px;
    border-radius: 50%;
    width: 8px;
    height: 8px;

    &.text-red {
        background-color: #e74c3c;
    }

    &.text-green {
        background-color: #54d1b0;
    }
}
</style>
