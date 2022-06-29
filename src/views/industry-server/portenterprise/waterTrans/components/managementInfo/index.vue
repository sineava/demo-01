<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <!-- <el-form-item
        label="企业名称:"
        prop="enterpriseName"
      >
        <el-input
          v-model.trim="searchForm.enterpriseName"
          placeholder="请输入企业名称"
        />
      </el-form-item> -->
      <el-form-item
        label="船舶名称:"
        prop="shipName"
      >
        <el-input
          v-model.trim="searchForm.shipName"
          placeholder="请输入船舶名称"
        />
      </el-form-item>
      <el-form-item
        label="船舶识别号:"
        prop="shipIdentifyNo"
      >
        <el-input
          v-model.trim="searchForm.shipIdentifyNo"
          placeholder="请输入船舶识别号"
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
        label="编号"
        width="55"
      >
        <template v-slot="scope">
          <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所在地市港口管理部门"
        prop="organizationName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="企业名称"
        prop="enterpriseName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="船舶名称"
        prop="shipName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="船舶识别号"
        prop="shipIdentifyNo"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="船籍港"
        prop="registryPort"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="运营证编号"
        prop="shipLicenseNo"
        :show-overflow-tooltip="true"
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
            @click="handleDetail('info',scope.row)"
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
            @click="handleDetail('delete',scope.row)"
          >
            <em class="el-icon-delete-solid" /> 解绑
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
import { pageWaterTransportHyShipList,unbound } from '@/api/water-transportation-services/information/enterprise-ship'
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
      total: 0,
      enterpriseName:'',
      type:'',
      searchForm: {
        enterpriseId: '',
        enterpriseName: '',
        shipName: '',
        shipIdentifyNo: ''
      }
    }
  },
  async mounted() {
    let { type , id ,enterpriseName} = this.$route.query
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
      pageWaterTransportHyShipList(data).then(res => {
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
    /**
     * 详情
     */
    handleDetail(type,item) {
      switch (type) {
      case 'add':
        this.$router.push({ path: '/portenterprise/managementInfoDetail', query: { id: '',enterpriseId:this.searchForm.enterpriseId,type:3,oper:type,enterpriseName:this.enterpriseName }})
        break
      case 'edit':
        this.$router.push({ path: '/portenterprise/managementInfoDetail', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,type:3,oper:type,enterpriseName:this.enterpriseName }})
        break
      case 'info':
        this.$router.push({ path: '/portenterprise/managementInfoDetail', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,type:3,oper:type,enterpriseName:this.enterpriseName }})
        break
      default:
        this.$confirm('此操作将解绑该数据, 是否继续?', '操作确认').then(() => {
          unbound({enterpriseType:3,shipId:item.id}).then(res => {
            if (res.code === '0') {
              this.$message.success('解绑成功!')
              this.fetchData()
            }
          })
        }).catch()
        break
      }
    }
  }
}
</script>

