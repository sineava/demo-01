<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <el-form-item
        label="姓名:"
        prop="fullName"
      >
        <el-input
          v-model.trim="searchForm.fullName"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item
        label="证书类型:"
        prop="certificateType"
      >
        <el-input
          v-model.trim="searchForm.certificateType"
          placeholder="请输入证书类型"
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
        <el-button
          v-if="type!=='details'"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleDetail('add','')"
        >
          新增
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
      class="table-border"
    >
      <el-table-column
        label="姓名"
        prop="fullName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="性别"
        prop="sex"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="身份证号"
        prop="identificationNumber"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="职务"
        prop="post"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="所在部门"
        prop="departmentName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="适任证书类型"
        prop="certificateType"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="适任证书编号"
        prop="certificateCode"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="联系电话"
        prop="contactNumber"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="更新时间"
        prop="updateTime"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        v-if="type!=='details'"
        label="操作"
        width="270"
        align="center"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleDetail('detail',scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <!--  -->
          <el-button
            size="mini"
            type="primary"
            @click="handleDetail('edit',scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row)"
          >
            <em class="el-icon-delete-solid" /> 删除
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
</template>

<script>
import pagination from '@/components/Pagination'
import { pageShipHyList,deletePersonnel } from '@/api/water-transportation-services/information/manage-person'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      type:'',
      total: 0,
      searchForm: {
        enterpriseId: '',
        fullName: '',
        certificateType: ''
      },
      enterpriseName:''
    }
  },
  async mounted() {
    let { type , id ,enterpriseName,disabled} = this.$route.query
    this.type = type
    this.searchForm.enterpriseId = id
    this.enterpriseName = enterpriseName
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageShipHyList(data).then(res => {
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
    handleDel(item){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deletePersonnel(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 详情
     */
    handleDetail(type,item) {
      if (type==='detail'){
        this.$router.push({ path: '/portenterprise/ship/personnelInfoDetail', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName,oper:type }})
      } else {
        this.$router.push({ path: '/portenterprise/ship/personnelInfoEdit', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName,oper:type }})
      }
    }
  }
}
</script>
