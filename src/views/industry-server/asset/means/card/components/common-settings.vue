<template>
  <el-dialog
    title="常用分类设置"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
    :destroy-on-close="false"
    :close-on-click-modal="false"
    custom-class="common-settings"
  >
    <div v-show="!isBj">
      <el-row :gutter="20" class="oper">
        <el-col :span="24" class="button">
          <el-button size="mini" @click="addGroup">新建分组</el-button>
          <el-button size="mini" :type="isEdit ? 'primary':''" @click="isEdit= !isEdit">修改分组</el-button>
          <el-button size="mini" @click="deleteGroup">删除分组</el-button>
          <el-button v-if="myData.length>0" size="mini" @click="maintainGroup">细类维护</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content">
        <el-col :span="6" class="left">
          <div v-if="myData && myData.length>0">
            <div
              v-for="(item,index) in myData"
              :key="index"
              :class="`nav ${cindex===index ? 'action' : ''}`"
              @click="nodeClick(index)"
            >
              <span v-if="isEdit && cindex===index">
                <el-input
                  v-model="item.name"
                  placeholder="请输入分类别名"
                  clearable
                />
              </span>
              <span v-else>{{ item.name }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无分组数据" />
        </el-col>
        <el-col :span="18">
          <el-table
            :data="tableData"
            border
            size="small"
            :height="500"
            style="width: 100%;"
          >
            <el-table-column
              label="序号"
              width="65"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="分组名称"
              align="center"
            />
            <el-table-column
              prop="code"
              label="分类编码"
              align="center"
            />
            <el-table-column
              label="分类别名"
              width="180"
              align="center"
            >
              <template v-slot="scope">
                <span v-if="isEdit">
                  <el-input
                    v-model="scope.row.alias"
                    placeholder="请输入分类别名"
                    clearable
                  />
                </span>
                <span v-else>{{ scope.row.alias }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="isEdit"
              label="操作"
              align="center"
              width="60"
            >
              <template v-slot="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="点击删除"
                  circle
                  @click="handleDelete(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <CommonSettingsAdd v-if="isBj" ref="CommonSettingsAdd" :currentData="currentData" />
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button
        v-if="isEdit"
        v-loading="saveloading"
        size="mini"
        type="primary"
        @click="updataSaveData"
      >确 定</el-button>
      <el-button
        v-if="isBj"
        v-loading="saveloading"
        size="mini"
        type="primary"
        @click="saveData"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { queryCommonUse,addCommonUse,putCommonUse,delCommonUse } from '@/api/means/card'
import CommonSettingsAdd from './common-settings-add'
export default {
  components:{ CommonSettingsAdd },
  data() {
    return {
      dialogVisible:false,
      myloading:false,
      myData:[],
      tableData:[],
      isEdit:false,
      cindex: 0,
      saveloading:false,
      isBj:false,
      currentData:{},
    }
  },
  async mounted() {
    this.queryCommonUse()
  },
  methods: {
    handleClose(done) {
      if (this.isBj){
        this.isBj = false
      } else {
        this.dialogVisible = false
        this.$emit('refresh')
      }
    },
    // 新建分组
    addGroup(){
      this.isEdit = false
      this.isBj = true
      this.currentData = {}
    },
    // 维护分组
    maintainGroup(){
      this.isEdit = false
      this.isBj = true
      this.currentData = this.myData[this.cindex]
    },
    // 删除分组
    deleteGroup(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isEdit = false
        if (this.myData.length===0){
          return false
        }
        delCommonUse(this.myData[this.cindex].id).then(res=>{
          if (res.code==='0'){
            this.cindex = 0
            this.myData.splice(this.cindex,1)
            this.nodeClick(0)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
    },
    // 修改保存数据
    async updataSaveData(){
      this.isEdit = false
      const formData = {
        id:this.myData[this.cindex].id,
        name:this.myData[this.cindex].name
      }
      const ids = []
      this.tableData.forEach(item=>{
        ids.push({id:item.id,alias:item.alias})
      })
      formData.ids = ids
      const res = putCommonUse(formData)
      this.saveloading = false
      if (res.code === '0'){
        this.queryCommonUse()
      }
    },
    // 保存数据
    async saveData(){
      this.isEdit = false
      if (this.saveloading){
        return false
      }
      this.saveloading = true
      let formData = this.$refs.CommonSettingsAdd.submitForm('ruleForm')
      if (formData===false){
        return false
      }
      const res = formData.id ? await putCommonUse(formData) : await addCommonUse(formData)
      this.saveloading = false
      if (res.code === '0'){
        this.isBj = false
        this.queryCommonUse()
      }
    },
    // 点击分组
    nodeClick(index){
      this.cindex = index
      this.tableData = this.myData.length>0 ? this.myData[index].childTypes : []
    },
    handleDelete(index,item){
      this.myData[index].childTypes.splice(index,1)
      this.tableData.splice(index,1)
    },
    queryCommonUse(){
      this.myloading = true
      queryCommonUse().then(res=>{
        this.myloading = false
        this.myData = res.data || []
        this.tableData = this.myData.length > 0 ? this.myData[0].childTypes : []
      })
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
.common-settings {
    .oper {
        border-bottom: 1px solid #dcdfe6;
        padding: 5px 0;

        .button {
            padding-right: 0 !important;
            padding-left: 0 !important;
        }
    }

    .content {
        margin: 10px 0;

        .left {
            overflow-x: hidden;
            overflow-y: auto;
            border-right: 1px solid #dcdfe6;
            padding-left: 0 !important;
            height: 500px;

            .nav {
                padding: 0 5px;
                font-size: 14px;
                line-height: 40px;
                cursor: pointer;

                /deep/ .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                }
            }

            .action {
                color: #ffffff;
                background: #409eff;
            }
        }
    }
}
</style>
