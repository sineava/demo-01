<template>
  <el-dialog
    title="类型管理"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="60%"
  >
    <el-table
      :data="tableData"
      style="margin-bottom: 20px; width: 100%;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="name"
        label="类型名称"
      >
        <template v-slot="scope">
          <span v-if="scope.row.isEdit" style="display: inline-block;">
            <el-input v-model.trim="scope.row.name" placeholder="请输入类型名称" />
          </span>
          <span v-else style="display: inline-block;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="180">
        <template slot="header">
          <el-button
            size="mini"
            type="success"
            @click="handleAdd('')"
          >
            <i class="el-icon-circle-plus"> 新增</i>
          </el-button>
        </template>
        <template v-slot="scope">
          <el-button
            v-if="scope.row.isAdd && scope.row.id>0"
            size="mini"
            type="success"
            @click="handleAdd(scope.row)"
          >
            <i class="el-icon-circle-plus" />
          </el-button>
          <el-button
            v-if="!scope.row.isEdit"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            <i class="el-icon-edit" />
          </el-button>
          <el-button
            v-if="scope.row.isEdit && scope.row.name"
            size="mini"
            type="warning"
            @click="handleSave(scope.row)"
          >
            <i class="el-icon-circle-check" />
          </el-button>
          <el-button
            v-if="scope.row.isDel"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            <i class="el-icon-delete-solid" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { getLayType, deleteLawType, addLawType,updateLawType } from '@/api/general-services/public-information/lawsAndRegulations'
export default {
  data() {
    return {
      dialogVisible:false,
      tableData: [],
      ids:0
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    // 打开弹出
    open(){
      this.fetchData()
      this.dialogVisible = true
    },
    // 关闭弹出
    handleClose(){
      this.dialogVisible = false
      this.$emit('getType')
    },
    // 查询列表数据
    fetchData() {
      getLayType({}).then(res => {
        res.data.forEach((item,index)=>{
          res.data[index].pid = item.pid || 0
          res.data[index].isDel= 1
          res.data[index].isAdd= 0
          res.data[index].isEdit= 0
        })
        const data = res.data ? this.toTreeData(res.data) : []
        data.forEach((item,index)=>{
          data[index].isAdd = 1
          data[index].pindex= index
          data[index].index = ''
          if (item.children.length>0){
            data[index].isDel = 0
          }
          item.children.forEach((val,key) => {
            data[index].children[key].pindex = index
            data[index].children[key].index = key
          })
        })
        this.tableData = data
      })
    },
    /**
     * 递归树
     */
    toTreeData(data) {
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },
    tree(data, id) {
      const arr = []
      data.filter(item => {
        return item.pid === id
      }).forEach(item => {
        arr.push({
          ...item,
          children: this.tree(data, item.id)
        })
      })
      return arr
    },
    /**
     * 删除
     */
    handleDelete(item) {
      if (item.id<0){
        if (item.index===''){
          this.tableData.splice(item.pindex,1)
        } else {
          this.tableData[item.pindex].children.splice(item.index,1)
        }
      } else {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
          deleteLawType(item.id).then(res => {
            if (res.code === '0') {
              this.$message.success('删除成功!')
              this.fetchData()
            }
          })
        }).catch()
      }
    },
    handleAdd(item){
      this.ids++
      if (!item){
        this.tableData.push({
          id:-this.ids,
          name:'',
          pid:0,
          type:1,
          isAdd:1,
          isDel:1,
          isEdit:1,
          pindex:this.tableData.length,
          index:'',
          children:[]
        })
      } else {
        if (!this.tableData[item.pindex].children || typeof(this.tableData[item.pindex].children)!=='object'){
          this.tableData[item.pindex].children = []
        }
        this.tableData[item.pindex].isDel=0
        this.tableData[item.pindex].children.push({
          id:-this.ids,
          name:'',
          pid:item.id,
          index:this.tableData[item.pindex].children.length,
          pindex:item.pindex,
          type:2,
          isAdd:0,
          isDel:1,
          isEdit:1
        })
      }
    },
    handleSave(item){
      if (item.id<0){
        addLawType({name:item.name,pid:item.pid,type:item.type}).then(res=>{
          if (res.code==='0'){
            if (item.index===''){
              this.tableData[item.pindex].id = res.data.id
            } else {
              this.tableData[item.pindex].children[item.index].id = res.data.id
            }
            this.setIsEdit(item,0)
          }
        })
      } else {
        updateLawType({name:item.name,pid:item.pid,type:item.type,id:item.id}).then(res=>{
          if (res.code==='0'){
            this.setIsEdit(item,0)
          }
        })
      }
    },
    setIsEdit(item,isedit){
      if (item.index===''){
        this.tableData[item.pindex].isEdit = isedit
      } else {
        this.tableData[item.pindex].children[item.index].isEdit = isedit
      }
    },
    handleEdit(item){
      this.setIsEdit(item,1)
    }
  },
}
</script>
