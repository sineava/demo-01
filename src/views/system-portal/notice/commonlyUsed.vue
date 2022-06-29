/* eslint-disable vue/no-deprecated-slot-scope-attribute */
<template>
  <div id="commonly-used">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :destroy-on-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div v-if="!isAdd">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-circle-plus"
          style="margin-bottom: 10px;"
          @click="append"
        >
          添加分组
        </el-button>
        <div class="div-tree">
          <el-tree
            ref="tree"
            v-loading="loading"
            :data="data"
            node-key="id"
            :expand-on-click-node="false"
            show-checkbox
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span v-if="(node.level===1 && data.name) || (node.level===2 && data.enterpriseName)">{{ node.level===1 ? data.name : data.enterpriseName }}</span>
              <span v-if="node.level===1 && data.isCustom !==0">
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-edit-outline"
                  @click="edit(node, data)"
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-remove"
                  @click="remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div v-else>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="分组名称" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入分组名称" />
          </el-form-item>
          <el-form-item label="分组排序" prop="name">
            <el-input-number
              v-model="ruleForm.sortNo"
              :min="0"
              :max="1000"
              label="描述文字"
            />
          </el-form-item>
          <el-form-item label="联系人" prop="ids">
            <el-select
              v-model="ruleForm.ids"
              multiple
              collapse-tags
              placeholder="请选择联系人"
              style="width: 100%;"
              @change="orgChange"
            >
              <el-option
                v-for="item in orgList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <div class="org-show">
              <el-row v-for="(item,index) in selectedOrg" :key="index" :gutter="20">
                <el-col :span="18">{{ item.enterpriseName }}</el-col>
                <el-col :span="6" style="text-align: center;">
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-remove"
                    @click="orgRemove(index,item)"
                  />
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button
          v-loading="saveloading"
          size="mini"
          type="primary"
          @click="submit"
        >{{ isAdd ? '保存' : '确定' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCommonUsed,addCommonUsed,putCommonUsed,delCommonUsed } from '@/api/system-portal/new-notice'
export default {
  props:{
    orgList:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      dialogVisible:false,
      title:'常用联系人',
      isAdd:false,
      selectedOrg:[],
      data:[],
      loading:false,
      saveloading:false,
      ruleForm: {
        id:'',
        name: '',
        ids: [],
        sortNo:1
      },
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
        ],
        sortNo:[
          { required: true, message: '请输入分组排序', trigger: 'blur' },
        ],
        ids:[
          { required: true, message: '请选择联系人', trigger: 'blur' },
        ]
      }
    }
  },
  async mounted() {
    this.getCommonUse()
  },
  methods: {
    async getCommonUse(){
      this.loading = true
      const res = await getCommonUsed()
      this.loading = false
      if (!res.data){
        this.data = [
          {
            id:0,
            name:'未分组联系人',
            isCustom:0,
            children:[]
          }
        ]
      } else {
        res.data.forEach((item,index)=>{
          if(item.isCustom===0){
            item.children.forEach((val,key)=>{
              res.data[index].children[key].enterpriseName = this.getEnterpriseIdToName(val.enterpriseId)
            })
          }
        })
        this.data = res.data
      }
    },
    /** 
     * 通过企业ID获取企业名称
     */
    getEnterpriseIdToName(id){
      let enterpriseName = ''
      this.orgList.forEach(item=>{
        if(item.orgId===id){
          enterpriseName = item.orgName
          return false
        }
      })
      return enterpriseName
    },
    // 开启弹出
    handleOpen(){
      this.title = '常用联系人'
      this.isAdd = false
      this.dialogVisible = true
      this.getCommonUse()
    },
    // 关闭弹出
    handleClose(){
      if (this.isAdd){
        this.title = '常用联系人'
        this.isAdd = false
      } else {
        this.dialogVisible = false
      }
    },
    // 添加
    append(){
      this.title = '添加分组'
      this.selectedOrg=[]
      this.ruleForm ={
        id:'',
        name: '',
        ids: [],
        sortNo:1
      }
      this.isAdd = true
    },
    // 编辑
    edit(node, data){
      this.title = '修改分组'
      let ids = []
      this.selectedOrg = []
      if (data.children){
        data.children.forEach(item=>{
          ids.push(item.enterpriseId)
          this.selectedOrg.push({
            enterpriseName:item.enterpriseName,enterpriseId:item.enterpriseId
          })
        })
      }
      this.ruleForm = {
        id:data.id,
        name: data.name,
        ids: ids,
        sortNo:data.sortNo
      }
      this.isAdd = true
    },
    // 删除
    remove(node, data){
      delCommonUsed({id:data.id}).then(res=>{
        if (res.code==='0'){
          this.$message.success('删除成功')
          this.getCommonUse()
        }
      })
    },
    // 取消
    close(){
      if (this.isAdd){
        this.isAdd = false
      } else {
        this.dialogVisible = false
      }
    },
    submit(){
      if (this.isAdd){
        this.submitForm('ruleForm')
      } else {
        this.dialogVisible = false
        const checked = this.$refs.tree.getCheckedNodes()
        const noticeMessageOrgDtoList = []
        checked.forEach(element => {
          if (element.enterpriseId){
            noticeMessageOrgDtoList.push(element.enterpriseId)
          }
        })
        this.$emit('setNoticeMessageOrgDtoList',this.unique(noticeMessageOrgDtoList))
      }
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    orgRemove(index,item){
      this.selectedOrg.splice(index,1)
      this.ruleForm.ids.splice(index,1)
    },
    // 选择
    orgChange(e){
      let data = []
      if (e.length>0){
        this.orgList.forEach(item=>{
          if (e.indexOf(item.orgId)!==-1){
            data.push({enterpriseName:item.orgName,enterpriseId:item.orgId})
          }
        })
      }
      this.selectedOrg = data
    },
    // 发布
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    async save() {
      this.saveloading = true
      let data = {
        id:this.ruleForm.id,
        name:this.ruleForm.name,
        sortNo:this.ruleForm.sortNo,
        children:this.selectedOrg
      }
      this.loading = true
      const res = data.id ? await putCommonUsed(data) : await addCommonUsed(data)
      this.saveloading = false
      if (res.code==='0'){
        this.returnBack()
      }
    },
    returnBack(){
      this.getCommonUse()
      this.isAdd = false
    }
  }
}
</script>
<style lang="scss" scoped>
#commonly-used {
    /deep/ .custom-tree-node {
        display: flex;
        padding-right: 8px;
        font-size: 14px;
        flex: 1;
        align-items: center;
        justify-content: space-between;
    }

    /deep/ .el-tree-node__content {
        border-bottom: 1px solid #f2f2f2;
        height: 40px;
    }

    /deep/ .el-tree-node__expand-icon {
        font-size: 14px;
    }

    .div-tree {
        overflow-x: hidden;
        overflow-y: auto;
        height: 470px;
    }

    .org-show {
        overflow-x: hidden;
        overflow-y: auto;
        height: 300px;
    }

    .org-show::-webkit-scrollbar,.div-tree::-webkit-scrollbar {
        width: 5px;
        height: 9px;
    }

    .org-show::-webkit-scrollbar-thumb,.div-tree::-webkit-scrollbar-thumb {/* 滚动条里面小方块 */
        border-radius: 3px;
        background: rgba(14, 65, 126, 0.2);
        box-shadow: inset 0 0 6px rgba(14, 65, 126, 0.2);
    }

    .org-show::-webkit-scrollbar-track,.div-tree::-webkit-scrollbar-track {/* 滚动条里面轨道 */
        border-radius: 0;
        background: #ffffff;
        box-shadow: inset 0 0 6px #ffffff;
    }
}

</style>
