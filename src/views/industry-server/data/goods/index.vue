<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险化学品/货物资料数据管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="名称/英文名称/UN编号:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入名称/英文名称/UN编号"
            style="width: 200px;"
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
      <div style="display: flex;">
        <el-button
          v-if="button_roles.create"
          style="float: left; margin-right: 10px;"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增危险化学品/货物资料数据管理
        </el-button>
        <DownUpload
          :button_roles="button_roles"
          filename="危险化学品导入模板.xlsx"
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
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="联合国编号（UN编号）" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.unNumber }}
          </template>
        </el-table-column>
        <el-table-column label="名称/说明" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="英文名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.ename }}
          </template>
        </el-table-column>
        <el-table-column label="类别/项别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.category }}
          </template>
        </el-table-column>
        <el-table-column label="次要危险性" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.subRisk }}
          </template>
        </el-table-column>
        <el-table-column label="包装类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.packagingCategory }}
          </template>
        </el-table-column>
        <el-table-column label="特殊规定" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.stipulate }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
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
      <el-dialog
        :visible.sync="addDialogVisible"
        :close-on-click-modal="false"
        :title="ruleForm.id === 0 ? '新增危险化学品/货物资料数据管理' : '编辑危险化学品/货物资料数据管理'"
        width="600px"
      >
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          size="medium"
          class="setting-form add-form"
        >
          <el-form-item
            label="联合国编号:"
            prop="unNumber"
          >
            <el-input v-model.trim="ruleForm.unNumber" :maxlength="50" placeholder="请输入联合国编号" />
          </el-form-item>
          <el-form-item
            label="名称/说明:"
            prop="name"
          >
            <el-input v-model.trim="ruleForm.name" :maxlength="50" placeholder="请输入名称/说明" />
          </el-form-item>
          <el-form-item
            label="英文名称:"
            prop="ename"
          >
            <el-input v-model.trim="ruleForm.ename" :maxlength="100" placeholder="请输入英文名称" />
          </el-form-item>
          <el-form-item
            label="类别/项别:"
            prop="category"
          >
            <el-input v-model.trim="ruleForm.category" :maxlength="50" placeholder="请输入类别/项别" />
          </el-form-item>
          <el-form-item
            label="次要危险性:"
            prop="subRisk"
          >
            <el-input v-model.trim="ruleForm.subRisk" :maxlength="50" placeholder="请输入次要危险性" />
          </el-form-item>
          <el-form-item
            label="包装类别:"
            prop="packagingCategory"
          >
            <el-input v-model.trim="ruleForm.packagingCategory" :maxlength="50" placeholder="请输入包装类别" />
          </el-form-item>
          <el-form-item
            label="特殊规定:"
            prop="stipulate"
          >
            <el-input
              v-model="ruleForm.stipulate"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入特殊规定"
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            :disabled="editLoaing"
            :loading="editLoaing"
            type="primary"
            @click="handleSave"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import DownUpload from '@/components/features/DownUpload'
import { en } from '@/utils/validate'
import { getPageList, deleteHazardousChemical, saveHazardousChemical, updateHazardousChemical, exportList, bulkImport } from '@/api/general-services/public-information/hazardous-chemical'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    DownUpload
  },
  data() {
    return {
      editLoaing: false,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      addDialogVisible: false,
      searchForm: {
        keyword: '',
        category: ''
      },
      ruleForm: {
        category: '',
        ename: '',
        id: '',
        name: '',
        packagingCategory: '',
        stipulate: '',
        subRisk: '',
        unNumber: ''
      },
      rules: {
        unNumber: [
          { required: true, message: '请输入联合国编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称/说明', trigger: 'blur' }
        ],
        ename: [
          { validator: en, trigger: 'blur' }
        ]
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
     * 新增危险化学品
     */
    handleAdd() {
      this.addDialogVisible = true
      this.ruleForm = {
        category: '',
        ename: '',
        id: 0,
        name: '',
        packagingCategory: '',
        stipulate: '',
        subRisk: '',
        unNumber: ''
      }
    },
    /**
     * 编辑危险化学品
     */
    handleDetail(index, item) {
      this.ruleForm = { ...item }
      this.addDialogVisible = true
    },
    async handleSave() {
      if (this.editLoaing) return
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    async saveData() {
      this.editLoaing = true
      const lawRegulationDto = { ...this.ruleForm }
      delete lawRegulationDto.updateTime
      const res = lawRegulationDto.id ? await updateHazardousChemical(lawRegulationDto) : await saveHazardousChemical(lawRegulationDto)
      this.editLoaing = false
      if (res.code === '0') {
        this.addDialogVisible = false
        this.fetchData()
      }
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.searchForm,
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
     * 导入表格
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
        const table = res.data ? res.data : []
        const header = {
          unNumber: '联合国编号',
          name: '名称/说明',
          ename: '英文名称',
          category: '类别/项别',
          subRisk: '次要危险性',
          packagingCategory: '包装类别',
          stipulate: '特殊规定'
        }
        const arr = [...table.map(x => ({
          unNumber: x.unNumber,
          name: x.name,
          ename: x.ename,
          category: x.category,
          subRisk: x.subRisk,
          packagingCategory: x.packagingCategory,
          stipulate: x.stipulate
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '危险化学品' })
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
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteHazardousChemical(item.id).then(res => {
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
