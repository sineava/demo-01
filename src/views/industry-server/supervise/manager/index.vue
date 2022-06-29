<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理人员</span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="所属机构:"
          prop="managementName"
        >
          <el-input
            v-model.trim="ruleForm.managementName"
            placeholder="请输入所属机构"
          />
        </el-form-item>
        <el-form-item
          label="姓名:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="适任证书类型:"
          prop="certificateType"
        >
          <el-input
            v-model.trim="ruleForm.certificateType"
            placeholder="请输入适任证书类型"
          />
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
            @click="resetForm('ruleForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex;">
        <!-- <el-button
          v-if="button_roles.create"
          style="float:left;margin-right:10px"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleEdit('add')"
        >
          新增人员
        </el-button> -->

        <el-button
          style="float: left; margin-right: 10px;"
          type="primary"
          size="small"
          :loading="updateLoading"
          @click="updateBatch"
        >
          更新人员
        </el-button>
        <DownUpload
          v-if="button_roles['export']"
          :button_roles="{'export': true}"
          filename="监管能力管理人员导入模板.xlsx"
          @uploadExcel="uploadExcel"
          @getExportData="getExportData"
        />
      </div>

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
          width="95"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所属机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.post }}
          </template>
        </el-table-column>
        <el-table-column label="适任证书类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.certificateType }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
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
      <loading ref="load" />
    </div>
  </el-card>
</template>
<script>
import DownUpload from '@/components/features/DownUpload'
import { getPageList, deleteById, bulkImport, exportList, updateBatch } from '@/api/general-services/supervisory-capability/management-person'
import pagination from '@/components/Pagination'
import loading from '@/components/loading'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    loading,
    DownUpload
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      updateLoading: false,
      ruleForm: {
        managementName: '',
        name: '',
        certificateType: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
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
      const queryInfo = {
        ...this.ruleForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 导入人员表格
     */
    async uploadExcel(formData, end) {
      const res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      exportList({ ...this.searchForm }).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          name: '姓名',
          sex: '性别',
          birthDate: '出生年月',
          idCard: '身份证号码',
          post: '职务',
          position: '职称',
          departmentName: '所属机构',
          phone: '联系电话',
          address: '联系地址',
          email: '电子邮箱',
          fax: '传真',
          obligation: '职责',
          remark: '备注',
          certificateType: '适任证书类型',
          certificateCode: '适任证书编号'
        }
        const arr = [...this.table.map(x => {
          const obj = {}
          Object.keys(header).forEach(key => {
            if (key==='sex'){
              obj[key] = x[key] === '1' ? '男' : '女'
            } else {
              obj[key] = x[key]
            }
          })
          return obj
        })]
        arr.unshift(header)
        cb({ data: [...arr], title: '管理人员' })
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
     * 更新人员
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
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 新增/编辑人员
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/supervise/newStaff', query: { type, id: item ? item.id : null }})
    },
    /**
     * 详情
     */
    handleDetail(type, { id, departmentName }) {
      this.$router.push({ path: '/supervise/managerDetail', query: { type, id, departmentName }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteById({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 模板下载
     */
    templatePlay() {
      this.$refs.load.open()
      setTimeout(() => {
        this.$refs.load.close()
      }, 2000)
    },
    /**
     * 导出数据
     */
    exportData() {
      this.$refs.load.open()
      setTimeout(() => {
        this.$refs.load.close()
      }, 5000)
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      if (file.type.indexOf('excel') > -1) {
        this.$refs.load.open()
      } else {
        this.$message.error('只能导入Excel文件')
      }
    },
    // 文件上传成功时的钩子
    uploadSuccess(response) {
      this.$refs.load.close()
    },
    // 文件上传失败时的钩子
    uploadError(err) {
      this.$refs.load.close()
    }
  }

}
</script>

