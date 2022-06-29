<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="small"
    >
      <el-form-item
        label="发证日期:"
        prop="screenTime"
      >
        <el-date-picker
          v-model="screenTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
        label="经营许可证编号"
        prop="licenseNo"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="企业名称"
        prop="enterpriseName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="法定代表人"
        prop="legalPerson"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="企业类型">
        <template>船舶管理企业</template>
      </el-table-column>
      <el-table-column
        label="批准机关"
        prop="approvalAuthority"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="起止日期"
        prop="startDate"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.startDate }} 至 {{ scope.row.endDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="发证日期"
        prop="issueDate"
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
import { pageHyList,deleteLicense } from '@/api/water-transportation-services/information/ship-manage-business-license'
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
      screenTime: [],
      searchForm: {
        enterpriseId: ''
      },
      enterpriseName:'',
      type:''
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
      if (this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0]
        data.screenEndTime = this.screenTime[1]
      }
      pageHyList(data).then(res => {
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
      this.screenTime = []
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
        deleteLicense(item.id).then(res => {
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
        this.$router.push({ path: '/portenterprise/ship/licenceInfoDetail', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName }})
      } else {
        this.$router.push({ path: '/portenterprise/ship/licenceInfoEdit', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName }})
      }
    }
  }
}
</script>
