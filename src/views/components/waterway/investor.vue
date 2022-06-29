<template>
  <div class="waterway">
    <div class="icon-title">
      <span class="span" />{{ title }}
    </div>
    <el-table
      :data="table"
      fit
      border
      class="table-border"
    >
      <el-table-column label="序号" width="50">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="投资人(个人/企业)"
        prop="investorName"
      />
      <!-- <el-table-column
        label="投资单位名称"
        prop="investorUnit"
      /> -->
      <el-table-column
        label="金额"
        prop="investorAmount"
      >
        <template v-slot="scope">
          {{ scope.row.investorAmount }}万元
        </template>
      </el-table-column>
      <el-table-column
        label="投资比例"
        prop="investorScale"
      >
        <template v-slot="scope">
          {{ scope.row.investorScale }}%
        </template>
      </el-table-column>
      <el-table-column
        label="证件号"
        prop="credentialNo"
      />
      <el-table-column
        label="备注"
        prop="remark"
      />
      <el-table-column
        v-if="isEdit"
        label="操作"
        width="150"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="addDialog(scope.$index,scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="deleteList(scope.$index,scope.row)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="isEdit"
      class="table-add"
      @click="addDialog(-1,'')"
    >
      <i class="el-icon-plus" />添加变更人员
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="投资人信息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="800px"
    >
      <add-dialog ref="adddia" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddDialog from './addDialog.vue'
export default {
  components: {
    AddDialog,
  },
  props: {
    data: {
      type: Array,
      default: ()=>[]
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    title:{
      type: String,
      default: false
    }
  },
  data() {
    return {
      table:[],
      dialogVisible:false,
      delTable:[],
      max:100,
    }
  },
  watch:{
    data:{
      handler(newV){
        this.table = newV || []
      },
      deep:true
    },
  },
  mounted() {
    this.table = this.data || []
  },
  methods: {
    addDialog(index,item){
      if (this.isTotal()<=0 && index===-1){
        this.$message.error('股权占比已达到100%')
        return false
      }
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.$refs.adddia.init(item,index,this.table)
      })
    },
    deleteList(index,item){
      if (item.investorsId){
        item.isStatus = 3
        this.delTable.push(item)
      }
      this.table.splice(index,1)
    },
    async addSubmit(){
      let res = await this.$refs.adddia.submitForm()
      if (res===false){
        return false
      }
      if (res[1]===-1){
        this.table.push(res[0])
      } else {
        this.$set(this.table,res[1],res[0])
      }
      this.dialogVisible = false
    },
    isTotal(){
      let cmax = 0
      for (let i=0;i<this.table.length;i++){
        cmax = cmax + parseInt(this.table[i].investorScale * 100)
      }
      return (parseInt(10000 - cmax)/100)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = this.table.concat(this.delTable)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.waterway {
    /deep/ .table-border {
        margin-bottom: 0;
    }

    .icon-title {
        margin-top: 20px;
    }

    .table-add {
        border: 1px solid #ebeef5;
        border-top: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #666666;
        cursor: pointer;
    }
}
</style>
