<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <el-form-item
        label="港口企业名称:"
        prop="enterpriseName"
        clearable
      >
        <el-input
          v-model.trim="searchForm.enterpriseName"
          placeholder="请输入港口企业名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="fetchData"
        >
          查询
        </el-button>
        <el-button
          size="small"
          icon="el-icon-refresh-left"
          @click="resetForm"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="edit('add')"
        >
          新增企业
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
      >
        <template v-slot="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="企业名称" prop="enterpriseName" />
      <el-table-column label="所在地市港口管理部门" prop="orgName" />
      <el-table-column label="法定代表人" prop="legalPersonName" />
      <el-table-column label="经济类型" prop="economicType" />
      <el-table-column label="办公地址" prop="officeAddress" />
      <el-table-column label="联系人姓名" prop="contactName" />
      <el-table-column label="联系人电话" prop="contactPhone" />
      <el-table-column label="监管时间">
        <template v-slot="scope">
          {{ `${scope.row.superviseBeginTime}-${scope.row.superviseEndTime}` }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="200"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            plain
            @click="edit('detail', scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="edit('edit', scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
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
    <el-dialog
      :visible.sync="dialogVisible"
      :title="type === 'add' ? '新增重点企业' : '编辑重点企业'"
      width="600px"
      height="600px"
      @close="dialogClose = false"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addRules"
        label-width="120px"
        size="medium"
      >
        <el-form-item
          label="企业名称:"
          prop="enterpriseId"
        >
          <el-select
            v-model="addForm.enterpriseId"
            clearable
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            style="width: 90%;"
            :disabled="type === 'edit'"
          >
            <el-option
              v-for="item in enList"
              :key="item.id"
              :label="item.enterpriseName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="监管期限:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="addForm.screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 90%;"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPageList, deleteData, getEnList, addData, editData } from '@/api/analysis-model/firm-info'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      type: '',
      dialogVisible: false,
      enterpriseIds: '',
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        enterpriseName: ''
      },
      addForm: {
        id: null,
        enterpriseId: '',
        screenTime: []
      },
      addRules: {
        enterpriseId: [
          { required: true, message: '请选择企业名称', trigger: 'blur' }
        ],
        screenTime: [
          { required: true, message: '请选择监管期限', trigger: 'blur' }
        ]
      },
      loading: false,
      enList: [] // 企业列表
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
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleDetail(type, item) {
      const id = item ? item.id : 0
      this.$router.push({ path: '/educate/planDetail', query: { type, id }})
    },
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData(id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    },
    async edit(type, row) {
      this.dialogVisible = true
      if (type === 'add') {
        this.addForm = {
          id: '',
          enterpriseId: '',
          screenTime: []
        }
      }
      if (type === 'edit') {
        this.type = 'edit'
        this.addForm = {
          ...row,
          screenTime: [row.superviseBeginTime, row.superviseEndTime]
        }
      }
      if (type === 'detail') {
        this.$router.push({ path: '/portenterprise/basicDetail', query: { id: row.enterpriseId, name: row.enterpriseName }})
      }
    },
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.enList = (await getEnList({ enterpriseName: query })).data
        this.loading = false
      } else {
        this.enList = []
      }
    },
    async handleAdd() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return false
      })
      const selected = this.enList.find(x => x.id === this.addForm.enterpriseId)
      const [superviseBeginTime, superviseEndTime] = this.addForm.screenTime || []
      const firmInfoListDto = {
        contactName: selected.contactName,
        contactPhone: selected.contactPhone,
        economicType: selected.economicType,
        enterpriseId: selected.id,
        enterpriseName: selected.enterpriseName,
        legalPersonName: selected.legalPersonName,
        officeAddress: selected.officeAddress,
        orgId: selected.organizationId,
        orgName: selected.organizationName,
        id: this.addForm.id,
        superviseBeginTime,
        superviseEndTime
      }
      const res = firmInfoListDto.id ? await editData(firmInfoListDto) : await addData(firmInfoListDto)
      if (res.code === '0') {
        this.fetchData()
        this.dialogVisible = false
      }
    }
  }
}
</script>
