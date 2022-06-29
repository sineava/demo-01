<template>
  <el-card class="body-card berth">
    <div
      slot="header"
    >
      <span>泊位信息</span>
    </div>
    <div>
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
        class="searchForm"
      >
        <el-form-item
          label="泊位名称:"
          prop="berthName"
        >
          <el-input
            v-model.trim="searchForm.berthName"
            placeholder="请输入泊位名称"
          />
        </el-form-item>
        <el-form-item
          v-if="!enterpriseId"
          label="所属企业:"
          prop="belongingEnterprise"
        >
          <el-input
            v-model.trim="searchForm.belongingEnterprise"
            placeholder="请输入所属企业"
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
            v-if="button_roles.create || !auth"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="handleEdit({}, 'add')"
          >
            新增泊位信息
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
        max-height="655"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="泊位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.berthName }}
          </template>
        </el-table-column>
        <el-table-column label="所在码头" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.wharfName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属企业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.operatingEnterprise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结构形式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.structuralStyle }}
          </template>
        </el-table-column>
        <el-table-column label="主要用途" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.mainUses }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="专业化泊位分类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'][scope.row.serviceType-1] }}
          </template>
        </el-table-column> -->
        <el-table-column label="竣工验收日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.acceptanceDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="核查靠泊能力" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.checkBerthingCapability }}吨</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc || !auth"
          label="操作"
          align="center"
          :width="auth ?((button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)) : 280"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc || !auth"
              size="mini"
              plain
              @click="handleEdit(scope.row,'detail')"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update || !auth"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row, 'edit')"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete || !auth"
              size="mini"
              plain
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
import { getPageList, deleteBerth } from '@/api/port-services/coastline/berth'
import pagination from '@/components/Pagination'
import { getRouterButtonRole } from '@/utils/index'
export default {
  components: {
    pagination
  },
  props: {
    wharfId: {
      type: [Number,String],
      default: ''
    },
    tabs:{
      type: [Number,String],
      default: 6
    },
    enterpriseId:{
      type:[Number,String],
      default:''
    },
    retrunUrl: {
      type: String,
      default: ''
    },
    auth:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      button_roles:{},
      row: '',
      options: ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'],
      searchForm: {
        berthName: '',
        belongingEnterprise: '',
        operatingEnterprise: '',
        serviceType: '',
        wharfId: '',
        enterpriseId:''
      }
    }
  },
  watch:{
    wharfId:{
      handler(newV){
        this.searchForm.wharfId = this.wharfId
        this.fetchData()
      },
      deep:true
    },
    enterpriseId:{
      handler(newV){
        this.searchForm.enterpriseId = this.enterpriseId
        this.fetchData()
      },
      deep:true
    }
  },
  created() {
    this.searchForm.wharfId = this.wharfId
    this.searchForm.enterpriseId = this.enterpriseId
    if (this.auth){
      let roles = getRouterButtonRole(this.auth,true)
      this.button_roles = roles || {}
    }
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(item, type) {
      this.$router.push({ path: '/digital/resources/distribution/moor/detail', query: {
        id: item.id || '',
        type: type,
        tabs: this.tabs,
        enterpriseId:this.enterpriseId,
        url:this.retrunUrl ? encodeURIComponent(this.retrunUrl) : ''
      }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteBerth(item.id).then(res => {
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
<style lang="scss" scoped>
.berth {
    margin: 0;
    box-shadow: none;

    /deep/ .el-card__body {
        padding: 0 10px;
    }

    /deep/ .el-card__header {
        padding: 0 10px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
    }

    .searchForm {
        margin: 10px 0;

        /deep/ .el-form-item {
            margin-bottom: 0;
        }
    }
}
</style>
