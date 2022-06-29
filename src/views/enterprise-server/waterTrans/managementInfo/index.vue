<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输船舶信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
          />
        </el-form-item>
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
            v-if="button_roles.update"
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
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所在地市港口管理部门"
          prop="organizationName"
        />
        <el-table-column
          label="公司名称"
          prop="enterpriseName"
        />
        <el-table-column
          label="船舶名称"
          prop="shipName"
        />
        <el-table-column
          label="船舶识别号"
          prop="shipIdentifyNo"
        />
        <el-table-column
          label="船籍港"
          prop="registryPort"
        />
        <el-table-column
          label="运营证编号"
          prop="shipLicenseNo"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
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
              @click="handleDetail('info',scope.row)"
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
  </el-card>
</template>

<script>
import pagination from '@/components/Pagination'
import { pageWaterTransportEnShipList,unbound } from '@/api/water-transportation-services/information/enterprise-ship'
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
        enterpriseName: '',
        shipName: '',
        shipIdentifyNo: ''
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
      pageWaterTransportEnShipList(data).then(res => {
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
        this.$router.push({ path: '/waterTrans/managementInfoDetail', query: { id: '',type:3,oper:type }})
        break
      case 'edit':
        this.$router.push({ path: '/waterTrans/managementInfoDetail', query: { id: item.id,type:3,oper:type }})
        break
      case 'info':
        this.$router.push({ path: '/waterTrans/managementInfoDetail', query: { id: item.id,type:3,oper:type }})
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
