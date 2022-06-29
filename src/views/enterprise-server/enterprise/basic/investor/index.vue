<template>
   <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>投资人信息</span>
    </div>
    <div v-if="!dialogVisible" class="content-wrapper">
      <div class="app-container">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="small"
        >
          <el-form-item
            label="投资人姓名:"
            prop="name"
          >
            <el-input v-model.trim="searchForm.name" placeholder="请输入投资人姓名" />
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
              @click="resetForm('searchForm')"
            >
              重置
            </el-button>
            <el-button
              size="small"
              icon="el-icon-circle-plus-outline"
              type="warning"
              v-if="button_roles.create"
              @click="addInvestor"
            >
              新增投资人
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
          default-expand-all
          class="table-border"
          style="margin-bottom: 20px; width: 100%;"
        >
          <el-table-column
            prop="name"
            align="center"
            label="主要投资人名称"
          />
          <el-table-column
            prop="isForeign"
            align="center"
            label="是否外商投资"
          >
            <template v-slot="scope">
              <el-tag :type="scope.row.isForeign ? '': 'success'">{{ scope.row.isForeign ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="investmentShare"
            label="投资份额（%）"
            align="center"
          />
          <el-table-column
            prop="investmentAmount"
            label="投资金额（万元）"
            align="center"
          />
          <el-table-column
            prop="address"
            label="注册（居住）地址"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            prop="remark"
            label="备注"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            v-if="button_roles.update || button_roles.delete ||button_roles.desc"
            label="操作"
            align="center"
            :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
          >
            <template v-slot="scope">
              <el-button
                v-if="button_roles.desc"
                size="mini"
                type="primary"
                plain
                @click="handleEdit(scope.row,'detail')"
              >
                <em class="el-icon-info" /> 详情
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-if="button_roles.update"
                plain
                @click="handleEdit(scope.row)"
              >
                <em class="el-icon-edit" /> 编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="button_roles.delete"
                @click="handleDelete(scope.row)"
              >
                <em class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="dialogVisible">
      <InvestorPort ref="InvestorPort" :data="ruleForm" :isEdit="isEdit" />
      <div class="backstage-edit-btn">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          v-loading="loading"
          type="primary"
          size="small"
          @click="submitForm('ruleForm')"
        >
          确 定
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getInvestors, addInvestors, editInvestors,deteleInvestors } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import InvestorPort from '@/views/components/investor/port'
import { mapGetters } from 'vuex'
export default {
  components: {
    InvestorPort
  },
  data() {
    return {
      searchList: [],
      totalList: [],
      title:'',
      list: [],
      loading:false,
      dialogVisible:false,
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      show: false,
      isEdit:false,
      ruleForm:{},
      rules: {
        address: [
          { required: true, message: '请输入注册（居住）地址', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        investmentAmount: [
          { required: true, message: '请输入投资金额(万元)', trigger: 'blur' }
        ],
        investmentShare: [
          { required: true, message: '请输入投资份额', trigger: 'blur' }
        ],
        isForeign: [
          { required: true, message: '请选择是否外商投资', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入主要投资人名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      searchForm: {
        enterpriseId: '',
        name: ''
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
     * 添加投资人信息
     *
     */
    addInvestor(){
      this.title = '新增投资人信息'
      this.dialogVisible = true
      this.isEdit = true
      this.ruleForm={}
    },
    handleEdit(row,type){
      this.title = type==='detail' ? '投资人详情信息' : '编辑投资人信息'
      this.dialogVisible = true
      this.isEdit = type==='detail' ? false : true
      this.ruleForm=row
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getInvestors(this.searchForm).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data : []
      })
    },
    async submitForm(formName) {
      const formData = await this.$refs.InvestorPort.submitForm(formName)
      if (formData!==false){
        this.saveSubmit(formData)
      }
    },
    async saveSubmit(formData) {
      if (this.loading){
        return false
      }
      this.loading = true
      const res = this.title === '编辑投资人信息' ? await editInvestors(formData) : await addInvestors(formData)
      this.loading = false
      if (res.code === '0') {
        this.dialogVisible = false
        this.fetchData()
      }
    },
    handleClose(){
      this.listLoading = false
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deteleInvestors(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
    display: flex;
    flex-flow: row;

    .tree {
        width: 200px;
    }

    .app-container {
        flex: 1;
    }
}
</style>
