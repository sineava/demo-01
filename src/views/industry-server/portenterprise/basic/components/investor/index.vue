<template>
  <div>
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
            label="投资份额"
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
            label="操作"
            width="175"
            align="center"
          >
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleDetail(scope.row)"
              >
                <em class="el-icon-info" /> 详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="dialogVisible">
      <InvestorPort ref="InvestorPort" :data="ruleForm" :isEdit="false" />
      <div class="backstage-edit-btn">
        <el-button size="small" @click="dialogVisible = false">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getInvestors } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import InvestorPort from '@/views/components/investor/port'
export default {
  components: {
    InvestorPort
  },
  data() {
    return {
      searchList: [],
      totalList: [],
      ruleForm:{},
      list: [],
      dialogVisible:false,
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      show: false,
      searchForm: {
        enterpriseId: '',
        name: ''
      }
    }
  },
  created() {
    this.searchForm.enterpriseId = this.$route.query.id
    this.fetchData()
  },
  methods: {
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
    /**
     * 输入框搜索时调用的方法
     */
    searchKeyList() {
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.paging()
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.ruleForm = item
      this.dialogVisible = true
      // this.$emit('join', { name: '投资人详情', data: item })
    }
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
