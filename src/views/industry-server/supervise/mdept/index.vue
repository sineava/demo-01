<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门机构</span>
    </div>
    <div class="app-container">
      <div style="margin-bottom: 20px;">
        <!-- <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          @click="handleDetail('add')"
        >
          新增部门
        </el-button> -->
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
        <DownUpload
          v-if="button_roles['export']"
          :button_roles="{'export': true}"
          style="display: inline-block; margin-left: 10px;"
          :show-import="false"
          @getExportData="getExportData"
        />
        <el-button
          v-if="user_info.orgcategory==='1'"
          type="primary"
          size="small"
          :loading="updateLoading"
          @click="updateBatch"
        >
          更新部门
        </el-button>
      </div>
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
          prop="name"
          label="部门名称"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="状态"
        >
          <template v-slot="scope">
            <span :class="['dot', scope.row.state ? 'green' : 'red']" />
            {{ scope.row.state ? '启用' : '禁用' }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="成员数量"
        >
          <template v-slot="scope">
            <span style="color: #64b9ff;">{{ scope.row.personNumbers }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主管人员"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.directorName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="更新时间"
        >
          <template v-slot="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          sortable
          align="center"
          label="排序"
        /> -->
        <!-- v-if="button_roles.update || button_roles.delete || button_roles.desc ||button_roles.state" -->
        <el-table-column

          v-if="button_roles.update || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update && scope.row.isMine"
              size="mini"
              type="primary"
              @click="handleDetail('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <!-- <el-button
              v-if="button_roles.state && scope.row.isMine"
              size="mini"
              type="primary"
              @click="handleSetting(scope.$index, scope.row)"
            >
              <em class="el-icon-s-tools" /> 设置状态
            </el-button> -->
            <!-- <el-button
              v-if="button_roles.delete && scope.row.isMine"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 删除
            </el-button> -->
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
      <el-dialog
        :visible.sync="dialogVisible"
        title="设置状态"
        width="600px"
      >
        <el-form
          ref="settingForm"
          :model="settingForm"
          :rules="rules"
          label-width="100px"
          size="medium"
          class="setting-form"
        >
          <el-form-item
            label="部门名称"
            prop="departmentName"
          >
            <el-input
              v-model="settingForm.departmentName"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="选择状态"
            prop="state"
          >
            <el-radio-group v-model="settingForm.state">
              <el-radio
                v-model="settingForm.state"
                :label="1"
              >
                启用
              </el-radio>
              <el-radio
                v-model="settingForm.state"
                :label="0"
              >
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleSave"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
import { toTreeData } from '@/utils/index'
import DownUpload from '@/components/features/DownUpload'
import { getManagementDepartmentSelectList, deleteManagementDepartmentById, updateState, getOrganList,updateBatch } from '@/api/general-services/supervisory-capability/management-department'
// import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    // pagination,
    DownUpload
  },
  data() {
    return {
      listLoading: false,
      treeData: [],
      dialogVisible: false,
      expandAll: false,
      tableKey: 1,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: ''
      },
      settingForm: {},
      addForm: {
        name: '',
        department: '',
        personnel: '',
        describe: ''
      },
      updateLoading: false,
      rules: {
        value: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
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
      getManagementDepartmentSelectList().then(res => {
        if (!res.data) return
        this.treeData = toTreeData(res.data)
        this.total = res.data ? res.data.length : 0
        this.listLoading = false
      })
    },
    /**
     * 组装树
     */
    getTree(id, treeData) {
      const treeArr = []
      treeData.forEach((item) => {
        if (item.parentId === id) {
          const data = {
            ...item,
            enterpriseId: item.enterpriseId,
            label: item.departmentName,
            value: item.enterpriseId,
            children: this.getTree(item.enterpriseId, treeData)
          }
          if (data.children.length === 0) delete data.children
          treeArr.push({ ...data })
        }
      })
      return treeArr
    },
    /**
     * 更新部门
     */
    updateBatch() {
      this.updateLoading = true
      updateBatch().then(res => {
        this.updateLoading = false
        if (res.code === '0') {
          this.$message.success('更新成功')
          this.fetchData()
        }
      })
    },
    /**
     * 查询
     */
    submitForm() {
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs.searchForm.resetFields()
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
     * 收缩
     */
    tableShrink() {
      this.expandAll = false
      // 赋予随机数，让表格刷新
      this.tableKey = Math.random()
    },
    /**
     * 展开
     */
    tableOpen() {
      this.expandAll = true
      // 赋予随机数，让表格刷新
      this.tableKey = Math.random()
    },
    /**
     * 详情
     */
    handleDetail(type, item) {
      this.$router.push({ path: '/supervise/mdeptDetail', query: { id: item ? item.id : null, treeData: this.treeData || [], type }})
    },
    /**
     * 设置状态
     */
    handleSetting(_, item) {
      this.settingForm = { ...item, id: item.id }
      this.dialogVisible = true
    },
    /**
     * 更新状态
     */
    async handleSave() {
      updateState({ id: this.settingForm.id, state: this.settingForm.state }).then(res => {
        if (res.code === '0') {
          this.$message.success('状态修改成功!')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteManagementDepartmentById({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      getOrganList().then(res => {
        const table = toTreeData(res.data)
        const header = {
          departmentName: '机构名称',
          directorName: '主管人员',
          parentName: '所属上级部门',
          mailingAddress: '通信地址',
          zipCode: '邮政编码',
          phone: '联系电话',
          fax: '传真',
          state: '状态',
          remark: '备注',
          introduce: '部门描述'
        }
        const arr = [...table.map(x => ({
          departmentName: x.departmentName,
          directorName: x.directorName,
          parentName: x.parentName,
          mailingAddress: x.mailingAddress,
          zipCode: x.zipCode,
          phone: x.phone,
          fax: x.fax,
          state: x.state,
          remark: x.remark,
          introduce: x.introduce
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '部门机构' })
      })
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

    &.red {
        background-color: #e74c3c;
    }

    &.green {
        background-color: #54d1b0;
    }
}
</style>
