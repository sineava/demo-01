<template>
  <div id="AssetsType">
    <el-tabs v-model="activeName">
      <el-tab-pane label="国标分组" name="GB">
        <el-input v-model.trim="GBText" placeholder="输入关键字进行过滤" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="GbClickSearch" />
        </el-input>
        <el-tree
          ref="tree"
          v-loading="loading"
          class="filter-tree"
          :data="treeData"
          :style="`height: ${clientHeight-355}px;`"
          :props="defaultProps"
          empty-text="暂无国标数据"
          node-key="id"
          :check-on-click-node="true"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="nodeClick"
        />
      </el-tab-pane>
      <el-tab-pane label="常用分组" name="CY">
        <el-input v-model.trim="CYText" placeholder="输入关键字进行过滤" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="CYClickSearch" />
        </el-input>
        <el-tree
          ref="cytree"
          v-loading="myloading"
          class="filter-tree"
          :data="myTreeData"
          :style="`height: ${clientHeight-355}px;`"
          :props="defaultProps"
          empty-text="暂无常用分组数据"
          node-key="key"
          :check-on-click-node="true"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="nodeClick"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { queryAssetsType,queryCommonUse } from '@/api/means/card'
export default {
  props:{
    clientHeight:{
      type:Number,
      default:document.body.clientHeight
    },

  },
  data() {
    return {
      activeName: 'GB',
      GBText: '',
      CYText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      myTreeData:[],
      loading:false,
      myloading:false,
      current:{}, // 当前选中对象
    }
  },
  async mounted() {
    this.queryAssetsTypeTree()
    this.queryCommonUse()
  },
  methods: {
    GbClickSearch(){
      this.$refs.tree.filter(this.GBText)
    },
    CYClickSearch(){
      this.$refs.cytree.filter(this.CYText)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 点击
    nodeClick(data,node,even){
      if (!data.children ||data.children.length===0){
        if (!this.current.id){
          this.current = data
          this.$emit('changeAssetsType',this.current)
        } else {
          if (this.current.id !== data.id){
            this.$confirm('您是否要切换当前选中分类?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.current = data
              this.$emit('changeAssetsType',this.current)
            }).catch(() => {
            })
          }
        }
      }
    },
    queryCommonUse(){
      this.myloading = true
      queryCommonUse().then(res=>{
        this.myloading = false
        let myTreeData = []
        if (res.data){
          res.data.forEach((item,index)=>{
            let row = {
              label:item.name,
              id:item.id,
              name:item.name,
              key:index,
              children:[]
            }
            item.label = item.name
            item.childTypes.forEach((val,key)=>{
              val.label = `${val.code} - ${val.alias ? val.alias : val.name}`
              val.key = `${index}-${key}`
              row.children.push(val)
            })
            myTreeData.push(row)
          })
        }
        this.myTreeData = myTreeData
      })
    },
    // 查询国标分类
    async queryAssetsTypeTree(){
      this.loading = true
      const res = await queryAssetsType()
      this.loading = false
      this.treeData = this.toTreeData(res.data,0)
    },
    /**
     * 递归树
     */
    toTreeData(data){
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },
    tree(data){
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.id] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.pid]
        it.label = `${it.code} - ${it.alias || it.name}`
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    },
  }
}
</script>

<style lang="scss" scoped>
#AssetsType {
    .filter-tree {
        overflow: auto;
        margin: 10px 0;
        border-right: 1px solid #dcdfe6;

        /deep/ .el-tree-node__content {
            height: 40px;
        }

        /deep/ .el-tree-node__expand-icon {
            font-size: 16px;
        }
    }
}
</style>
