<template>
  <div style="margin-bottom: 20px;">
    <el-table
      :data="list"
      :border="true"
    >
      <el-table-column
          label="编号"
          width="60"
          align="center"
        >
        <template v-slot="scope">
          <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投资人"
        prop="investorName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="金额（万元）"
        prop="investorAmount"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="投资比例（%）"
        prop="investorScale"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="证件号"
        prop="credentialNo"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="备注"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        width="140"
        v-if="type!=='details'"
        align="center"
      >
        <template  slot="header">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="handleDetail('add','')"
          >
            新增投资人
          </el-button>
        </template>
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDetail('edit',scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDel(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pageWaterTransportHyList,deleteInvestors } from '@/api/water-transportation-services/information/investors'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 100,
      type:'',
      total: 0,
      searchForm: {
        enterpriseId: '',
        investorUnit: '',
        investorName: ''
      },
      enterpriseName:''
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
      pageWaterTransportHyList(data).then(res => {
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
    handleDel(item){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInvestors(item.id).then(res => {
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
        this.$router.push({ path: '/portenterprise/investorInfoDetail', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName }})
      } else {
        this.$router.push({ path: '/portenterprise/investorInfoEdit', query: { id: item.id,enterpriseId:this.searchForm.enterpriseId,enterpriseName:this.enterpriseName }})
      }
    }
  }
}
</script>
