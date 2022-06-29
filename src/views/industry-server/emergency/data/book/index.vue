<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急通讯录</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="姓名:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入姓名"
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
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit('add')"
        >
          新增应急通讯录
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        :close-on-click-modal="false"
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="单位名称">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务">
          <template v-slot="scope">
            <span>{{ scope.row.job }}</span>
          </template>
        </el-table-column>
        <el-table-column label="固定电话">
          <template v-slot="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="移动电话">
          <template v-slot="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
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
        :title="type === 'add' ? '新增应急通讯录' : type === 'edit' ? '编辑应急通讯录' : '应急通讯录详情'"
        :close-on-click-modal="false"
        width="600px"
      >
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="rules"
          label-width="90px"
          size="medium"
          class="setting-form add-form"
          :disabled="type === 'detail'"
        >
          <el-form-item
            label="单位名称:"
          >
            {{ type === 'add' ? user_info.orgname : addForm.enterpriseName }}
          </el-form-item>
          <el-form-item
            label="联系人:"
            prop="name"
          >
            <el-input v-model.trim="addForm.name" maxlength="20" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item
            label="职务:"
            prop="job"
          >
            <el-input v-model.trim="addForm.job" maxlength="50" placeholder="请输入职务" />
          </el-form-item>
          <el-form-item
            label="手机:"
            prop="mobilePhone"
          >
            <el-input v-model.trim="addForm.mobilePhone" maxlength="11" placeholder="请输入手机" />
          </el-form-item>
          <el-form-item
            label="固定电话:"
            prop="phone"
          >
            <el-input v-model.trim="addForm.phone" maxlength="20" placeholder="请输入固定电话" />
          </el-form-item>
          <el-form-item
            label="传真:"
            prop="fax"
          >
            <el-input v-model.trim="addForm.fax" maxlength="20" placeholder="请输入传真" />
          </el-form-item>
          <el-form-item
            label="专长:"
            prop="specialty"
          >
            <el-input
              v-model="addForm.specialty"
              type="textarea"
              rows="6"
              style="width: 100%;"
              maxlength="200"
              placeholder="请输入专长"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            :loading="loading"
            @click="handleSave('ruleForm')"
          >保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/Pagination'
import { telephone, fax } from '@/utils/validate'
import { getPageList, deleteBook, queryDetail, saveEntity, updateById } from '@/api/emergency-services/address-book'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      loading:false,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      addDialogVisible: false,
      type: '',
      searchForm: {
        keyword: ''
      },
      addForm: {
        fax: '',
        id: null,
        job: '',
        mobilePhone: '',
        name: '',
        phone: '',
        specialty: ''
      },
      rules: {
        enterpriseName: [
          { required: true, message: '请输入机构单位名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        phone: [
          { validator: telephone, trigger: 'blur' }
        ],
        fax: [
          { validator: fax, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info',
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询列表数据
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
    // 查询
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
    // 新增/编辑/详情打开
    handleEdit(type, item) {
      this.addDialogVisible = true
      this.type = type
      this.$nextTick(_ => {
        this.$refs.addForm.resetFields()
      })
      if (['detail', 'edit'].includes(type)) {
        this.fetchDetail(item.id)
      }
    },
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.data) this.addForm = { ...res.data }
      })
    },
    // 点击确定
    handleSave() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      this.loading = true
      const dto = {
        ...this.addForm
      }
      delete dto.updateTime
      delete dto.enterpriseId
      delete dto.enterpriseName
      const res = dto.id ? await updateById(dto) : await saveEntity(dto)
      this.loading = false
      if (res.code === '0') {
        this.addDialogVisible = false
        this.fetchData()
      }
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    // 切换每页大小
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 详情
    handleDetail() {
      this.$router.push({ path: '/emergency/data/agencyDetail' })
    },
    // 删除
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteBook({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    }
  }
}
</script>
