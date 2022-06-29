<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急通讯录</span>
    </div>
    <el-row :gutter="10">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
      >
        <OrgAssembly res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
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
            <el-table-column label="单位名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseName }}
              </template>
            </el-table-column>
            <el-table-column label="姓名" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="职务" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.job }}
              </template>
            </el-table-column>
            <el-table-column label="固定电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.phone }}
              </template>
            </el-table-column>
            <el-table-column label="移动电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.mobilePhone }}
              </template>
            </el-table-column>
            <el-table-column label="更新时间" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.updateTime }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
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
            width="600px"
          >
            <el-form
              ref="addForm"
              :model="addForm"
              label-width="120px"
              size="medium"
              class="setting-form add-form"
              :disabled="type === 'detail'"
            >
              <el-form-item
                v-if="type === 'add'"
                label="单位名称:"
              >
                <el-input
                  :value="user_info.orgname"
                  disabled
                />
              </el-form-item>
              <el-form-item
                v-else
                label="单位名称:"
              >
                <el-input
                  v-model="addForm.enterpriseName"
                  disabled
                />
              </el-form-item>
              <el-form-item
                label="联系人:"
                prop="name"
              >
                <el-input
                  v-model="addForm.name"
                  placeholder="输入内容"
                />
              </el-form-item>
              <el-form-item
                label="职务:"
                prop="job"
              >
                <el-input
                  v-model="addForm.job"
                  placeholder="输入内容"
                />
              </el-form-item>
              <el-form-item
                label="手机:"
                prop="mobilePhone"
              >
                <el-input
                  v-model="addForm.mobilePhone"
                  placeholder="输入内容"
                />
              </el-form-item>
              <el-form-item label="固定电话:">
                <el-form-item prop="phone">
                  <el-input
                    v-model="addForm.phone"
                    placeholder="输入内容"
                  />
                </el-form-item>
              </el-form-item>
              <el-form-item
                label="传真:"
                prop="fax"
              >
                <el-input
                  v-model="addForm.fax"
                  placeholder="输入内容"
                />
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
                  placeholder="输入内容"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="addDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/Pagination'
import { getPageList, queryDetail } from '@/api/emergency-services/address-book'
import OrgAssembly from '../components/index'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      addDialogVisible: false,
      type: '',
      searchForm: {
        keyword: '',
        orgCode:'',
        organizationName:''
      },
      addForm: {}
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    if (this.user_info.orgcategory!=='1'){
      this.searchForm.orgCode = this.user_info.orgcode
      this.searchForm.organizationName = this.user_info.orgname
    }
    this.fetchData()
  },
  methods: {
    clickOrgMenu(name,code){
      this.searchForm.organizationName = name
      this.searchForm.orgCode = code
      this.currentPage = 1
      this.fetchData()
    },
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
      this.addForm = {
        extension: '',
        fax: '',
        id: null,
        job: '',
        mobilePhone: '',
        name: '',
        phone: '',
        specialty: ''
      }
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
    }
  }
}
</script>
