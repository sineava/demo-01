<template>
  <el-dialog
    title="盘点明细"
    :visible.sync="dialogVisible"
    width="70%"
    custom-class="check"
    :destroy-on-close="false"
    :close-on-click-modal="false"
  >
    <div class="app-container">
      <div>
        <el-form
          :inline="true"
          size="small"
          :model="search"
          class="demo-form-inline"
        >
          <el-form-item label="资产名称">
            <el-input v-model.trim="search.name" clearable placeholder="资产名称" />
          </el-form-item>
          <el-form-item label="资产分类">
            <el-select v-model="search.type" clearable placeholder="资产分类">
              <el-option label="房屋" value="1" />
              <el-option label="设备" value="2" />
              <el-option label="文物" value="3" />
              <el-option label="图书" value="4" />
              <el-option label="家具" value="5" />
              <el-option label="动植物" value="6" />
              <el-option label="物资" value="7" />
              <el-option label="构筑物" value="101" />
              <el-option label="土地" value="102" />
              <el-option label="车辆" value="201" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="data"
        element-loading-text="Loading"
        stripe
        fit
        height="440"
        highlight-current-row
        style="width: 100%;"
        @selection-change="changeFun"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
        />
        <el-table-column
          prop="onlyCode"
          label="资产编号"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="type"
          label="资产大类"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getTypeLable(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="资产分类"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="资产名称"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="makeDate"
          label="取得日期"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="number"
          label="数量"
          align="center"
          :show-overflow-tooltip="true"
        /><el-table-column
          prop="valueType"
          label="价值类型"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="cost"
          label="价值"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="makeWay"
          label="取得方式"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="useDeptName"
          label="使用部门"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="usingState"
          label="使用状况"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="euse"
          label="设备用途"
          align="center"
          :show-overflow-tooltip="true"
        />
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
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="success" @click="confirm">确认选择</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInventoryCards } from '@/api/light-means/check'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      loading:false, // 加载动画
      currentPage:1,// 当前页码
      pageSize:10,// 每页大小
      total:0,// 数据总数
      data:[], // 数据集
      dialogVisible:false,
      multipleSelection:[],
      selectedArr:[],
      search:{
        name:'',
        type:''
      },
    }
  },
  created() {

  },
  methods: {
    getTypeLable(type){
      let name = ''
      switch (Number(type)) {
      case 1:
        name = '房屋'
        break
      case 2:
        name = '设备'
        break
      case 3:
        name = '文物'
        break
      case 4:
        name = '图书'
        break
      case 5:
        name = '家具'
        break
      case 6:
        name = '动植物'
        break
      case 7:
        name = '物资'
        break
      case 101:
        name = '构筑物'
        break
      case 102:
        name = '土地'
        break
      default:
        name = '车辆'
        break
      }
      return name
    },
    selectable(row,index){
      let disabled = true
      this.selectedArr.forEach(item=>{
        if (item.id === row.id){
          disabled = false
          return false
        }
      })
      return disabled
    },
    // 开启
    open(datas){
      this.selectedArr = datas || []
      this.dialogVisible = true
      this.fetchData()
    },
    // 选中
    changeFun(val) {
      this.multipleSelection = val
    },
    // 确认选择
    confirm(){
      this.dialogVisible = false
      this.$emit('selected',this.multipleSelection)
    },
    // 查询列表数据
    async fetchData() {
      const res = await getInventoryCards({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        type:this.search.type,
        name:this.search.name
      })
      if (res.code==='0'){
        this.multipleSelection = []
        this.data = res.data.records || []
        this.total = res.data.total || 0
      }
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 搜索按钮点击
    onSubmit() {
      this.fetchData()
    },
  }
}
</script>
<style lang="scss">
.check {
    /deep/ .app-container {
        padding: 0;
    }

    .el-dialog__body {
        padding: 20px 20px 5px 20px;
    }
}

.popper-tools {
    overflow-y: auto;
    height: 300px;
}
</style>
