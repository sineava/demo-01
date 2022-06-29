<template>
  <div>
    <el-table
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :data="list"
      element-loading-text="Loading"
      stripe
      :max-height="maxHeight"
      fit
      highlight-current-row
      class="table-border"
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
      <el-table-column label="经营企业" :show-overflow-tooltip="true">
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
      <el-table-column label="泊位吨级（吨）" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.checkBerthingCapability }}吨</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="专业化码头分类" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'][scope.row.serviceType-1] }}
        </template>
      </el-table-column> -->
      <el-table-column label="竣工验收日期" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <span>{{ scope.row.acceptanceDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
        label="操作"
        align="center"
        :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
      >
        <template v-slot="scope">
          <el-button
            v-if="button_roles.desc"
            size="mini"
            plain
            @click="handleDetails(scope.row)"
          >
            <em class="el-icon-info" /> 详情
          </el-button>
          <el-button
            v-if="button_roles.update"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            v-if="button_roles.delete"
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
      v-if="isPage"
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
import { getPageList,deleteBerth } from '@/api/port-services/coastline/berth'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  props: {
    search: {
      type: Object,
      default: {}
    },
    button_roles: {
      type: Object,
      default: {}
    },
    isPage:{
      type:Boolean,
      default:true
    },
    size:{
      type:Number,
      default:20
    },
    maxHeight:{
      type:[String,Number],
      default:''
    }
  },
  data() {
    return {
      list: [],
      total:0,
      currentPage: 1,
      pageSize: 20,
    }
  },
  watch:{
    search:{
      handler(){
        this.fetchData()
      },
      deep:true
    }
  },
  mounted() {
    this.pageSize = this.size
    this.fetchData()
  },
  methods: {
    handleDetails(item){
      this.$emit('handleDetails',item)
    },
    handleEdit(item){
      this.$emit('handleEdit',item)
    },
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteBerth(id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      getPageList({
        ...this.search,
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
  }
}
</script>
