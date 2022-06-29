<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口制度制度信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名称:"
          prop="fileName"
        >
          <el-input v-model.trim="searchForm.fileName" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="systemType"
        >
          <el-select
            v-model="searchForm.systemType"
            clearable
            placeholder="请选择制度类型"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="编制部门:"
          prop="organizationId"
        >
          <el-cascader
            v-model="searchForm.organizationId"
            :options="departmentList"
            :props="{label: 'organizationName', value: 'id', expandTrigger: 'hover', checkStrictly: true }"
            :show-all-levels="false"
            placeholder="请选择编制部门"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="search"
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleDetail"
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名称"
          prop="fileName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="制度类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ type[scope.row.systemType - 1].label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="编制部门"
          prop="organizationName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="编制负责人"
          prop="directorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="编制时间"
          prop="expiryStartDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="联系电话"
          :show-overflow-tooltip="true"
          prop="phone"
        />
        <el-table-column
          label="有效期至"
          prop="expiryEndDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row,'details')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row,'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
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
import pagination from '@/components/Pagination'
import { pageEnList, deleteSystem } from '@/api/general-services/enterpriseInfo/enterpriseBasic'
import { findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
import { mapGetters } from 'vuex'
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
      searchForm: {
        fileName: '',
        systemType: '',
        organizationId: ''
      },
      type: [
        { value: '1', label: '人力资源管理制度' },
        { value: '2', label: '安全管理制度' },
        { value: '3', label: '财务管理制度' },
        { value: '4', label: '行政管理制度' },
        { value: '5', label: '物资管理制度' },
        { value: '6', label: '生产管理制度' },
        { value: '7', label: '销售管理制度' },
        { value: '8', label: '质量管理制' }
      ],
      departmentList: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.fetchOrganize()
    this.fetchData()
  },
  methods: {
    /**
     * 查询组织机构
     */
    async fetchOrganize() {
      const res = await findByEnOrganizationList()
      this.departmentList = this.clearNullArr([...res.data])
    },
    clearNullArr(arr) {
      return arr.map(x => ({ ...x, children: (x.children && x.children.length) ? this.clearNullArr(x.children) : null }))
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.organizationId = data.organizationId[data.organizationId.length - 1]
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageEnList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
     * 详情
     */
    handleDetail(item,type) {
      this.$router.push({ path: '/enterprise/basic/systemDetail', query: { id: item.id,type }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteSystem(item.id).then(res => {
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

