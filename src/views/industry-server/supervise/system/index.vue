<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>制度信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名:"
          prop="regimeName"
        >
          <el-input
            v-model.trim="ruleForm.regimeName"
            placeholder="请输入文件名"
          />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="regimeType"
        >
          <el-input
            v-model.trim="ruleForm.regimeType"
            placeholder="请输入制度类型"
          />
        </el-form-item>
        <el-form-item
          label="编制负责人:"
          prop="principal"
        >
          <el-input
            v-model.trim="ruleForm.principal"
            placeholder="请输入编制负责人"
          />
        </el-form-item>
        <el-form-item label="有效期至:">
          <el-form-item prop="screenStartTime">
            <el-date-picker
              v-model="ruleForm.screenStartTime"
              type="date"
              style="width: 100%;"
              placeholder="请选择有效期至"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="submitForm('ruleForm')"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('ruleForm')"
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
        @click="newSystem"
      >
        新增制度
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="文件名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.regimeName }}
          </template>
        </el-table-column>
        <el-table-column label="制度类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.regimeType }}
          </template>
        </el-table-column>
        <el-table-column label="适用机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.applicableAgenciesName }}
          </template>
        </el-table-column>
        <el-table-column label="编制时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.createTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column label="编制部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.compile }}
          </template>
        </el-table-column>
        <el-table-column label="编制负责人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principal }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.principalPhone }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.validityTime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row, 'detail')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row, 'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
  </el-card>
</template>
<script>
import { managementRegimePageList, deleteManagementRegime } from '@/api/general-services/supervisory-capability/management-regime'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
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
      ruleForm: {
        regimeName: '',
        regimeType: '',
        principal: ''
      },
      company: []
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
        pageSize: this.pageSize,
        screenStartTime: momentDate(this.ruleForm.screenStartTime)
      }
      managementRegimePageList(queryInfo).then(res => {
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
     * 新增制度
     */
    newSystem() {
      this.$router.push({ path: '/supervise/newSystem' })
    },
    /**
     * 详情
     */
    handleDetail(index, item, type) {
      this.$router.push({ path: '/supervise/systemDetail', query: { id: item.id, type }})
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteManagementRegime({ id: item.id }).then(res => {
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

<style  lang="scss">
.system-form {
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 150px;
    }

    .el-form-item__content {
        margin-left: 10px;
    }
}
</style>
