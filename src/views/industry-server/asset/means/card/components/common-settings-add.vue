<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="80px"
    size="small"
    class="common-settings-add"
  >
    <el-form-item label="分组名称" prop="name">
      <el-input v-model.trim="ruleForm.name" />
    </el-form-item>
    <el-form-item label="分组分类">
      <tree-transfer
        ref="treetransferData"
        v-loading="loading"
        :title="['国标分类','已选分类']"
        :from_data="fromData"
        :to_data="toData"
        :defaultProps="{label:'label'}"
        :defaultCheckedKeys="defaultCheckedKeys"
        :defaultTransfer="true"
        :transferOpenNode="false"
        :mode="mode"
        height="455px"
        :button_text="['添加','移除']"
        filter
        :openAll="false"
        @add-btn="add"
        @remove-btn="remove"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { queryAssetsType } from '@/api/means/card'
import treeTransfer from 'el-tree-transfer' // 引入
export default {
  components:{ treeTransfer },
  props:{
    currentData:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      mode: "transfer", // transfer addressList
      fromData:[],
      toData:[],
      defaultCheckedKeys:[],
      ruleForm:{
        id: '',
        name:'',// 分类名称
        ids:[],
      },
      loading:false,
      childNodeData:[],
      rules:{
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    this.queryAssetsTypeTree()
    this.ruleForm.id = this.currentData.id || ''
    this.ruleForm.name = this.currentData.name || ''

    /*
     * if (this.currentData.childTypes){
     * }
     */
  },
  methods: {
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.ids = this.getChecked()
          res = this.ruleForm
        }
      })
      return res
    },
    //  获取选中数据
    getChecked(){
      this.childNodeData = []
      return this.treeChildNode(this.toData)
    },
    // 查询国标分类
    async queryAssetsTypeTree(){
      this.loading = true
      const res = await queryAssetsType()
      this.loading = false
      this.fromData = this.tree(res.data,0)
      this.defaultCheckedKeys = []
      if (this.currentData && this.currentData.childTypes){
        this.currentData.childTypes.forEach(item=>{
          this.defaultCheckedKeys.push(item.id)
        })
      }
    },
    // 递归
    tree(data, id) {
      const arr = []
      data.filter(item => {
        item.label = `${item.code} - ${item.name}`
        return item.pid === id
      }).forEach(item => {
        arr.push({
          ...item,
          children: this.tree(data, item.id)
        })
      })
      return arr
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList"
      } else {
        this.mode = "transfer"
      }
    },
    treeChildNode(arr){
      for (let item = 0;item < arr.length;item++){
        if (arr[item].children && arr[item].children.length>0){
          this.treeChildNode(arr[item].children)
        } else {
          this.childNodeData.push({id:arr[item].id})
        }
      }
      return this.childNodeData
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // this.ruleForm.ids = this.getChecked()
    },
    // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      // this.ruleForm.ids = this.getChecked()
    }
  }
}
</script>
<style lang="scss">
.common-settings {
    .el-dialog__body {
        padding: 0 20px;
    }
}
</style>
<style lang="scss" scoped>
.common-settings-add {
    margin-top: 20px;

    /deep/ .transfer-title {
        margin: 0;
        font-size: 14px;
    }

    /deep/ .el-tree-node__content {
        height: 30px;
        font-size: 13px;
    }
}
</style>
