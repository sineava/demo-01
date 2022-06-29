<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>投资人信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="投资人:"
          prop="investorName"
        >
          <el-input
            v-model.trim="searchForm.investorName"
            placeholder="请输入投资人个人/企业"
          />
        </el-form-item>
        <!-- <el-form-item
          label="投资单位名称:"
          prop="investorUnit"
        >
          <el-input
            v-model.trim="searchForm.investorUnit"
            placeholder="请输入投资单位名称"
          />
        </el-form-item> -->
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
            v-if="button_roles.create"
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
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        height="500"
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
        <el-table-column
          label="投资人 个人/企业"
          prop="investorName"
          :show-overflow-tooltip="true"
          align="center"
        />
        <!-- <el-table-column
          label="投资单位名称"
          prop="investorUnit"
          :show-overflow-tooltip="true"
          align="center"
        /> -->
        <el-table-column
          label="金额（万元）"
          prop="investorAmount"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="投资比例（%）"
          prop="investorScale"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.investorScale.toFixed(2) }}%
          </template>
        </el-table-column>
        <el-table-column
          label="证件号"
          prop="credentialNo"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          v-if="button_roles.desc || button_roles.update || button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
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
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleDetail('edit',scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
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
  </el-card>
</template>

<script>
import pagination from '@/components/Pagination'
import { pageShipEnList,deleteInvestors } from '@/api/water-transportation-services/information/investors'
import { mapGetters } from 'vuex'
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
      searchForm: {
        investorName: '',
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
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
      pageShipEnList(data).then(res => {
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
        this.$router.push({ path: '/ship/investorInfoDetail', query: { id: item.id }})
      } else {
        this.$router.push({ path: '/ship/investorInfoEdit', query: { id: item.id || '' }})
      }
    }
  }
}
</script>
