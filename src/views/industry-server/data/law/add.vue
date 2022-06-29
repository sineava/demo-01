<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增法律法规' : '编辑法律法规'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="110px"
        class="table-column two"
      >
        <el-form-item
          label="文件名:"
          prop="fileName"
        >
          <el-input
            v-model.trim="ruleForm.fileName"
            placeholder="请输入文件名称"
            :maxlength="50"
          />
        </el-form-item>
        <el-form-item
          label="文件类型:"
          prop="fileType"
        >
          <el-row :gutter="5">
            <el-col :span="17" style="padding-right: 0; padding-left: 0;">
              <el-cascader
                v-model="ruleForm.fileType"
                style="width: 100%;"
                :options="options"
                placeholder="请选文件类型"
                :props="{ value: 'id',label:'name' }"
                clearable
              />
            </el-col>
            <el-col :span="6" style="padding-right: 0; padding-left: 0; text-align: right;"><el-button size="mini" type="success" @click="clickLawType">类型管理</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="颁布机构:"
          prop="enactOrganization"
        >
          <el-input
            v-model.trim="ruleForm.enactOrganization"
            placeholder="请输入颁布机构"
            :maxlength="50"
          />
        </el-form-item>
        <el-form-item
          label="颁布文号:"
          prop="enactTitanic"
        >
          <el-input
            v-model.trim="ruleForm.enactTitanic"
            placeholder="请输入颁布文号"
            :maxlength="50"
          />
        </el-form-item>
        <el-form-item
          label="颁布时间:"
          prop="enactTime"
        >
          <el-date-picker
            v-model="ruleForm.enactTime"
            type="date"
            placeholder="选择颁布时间"
            style="width: 100%;"
            format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="内容:"
          prop="synopsis"
          style="width: 100%;"
        >
          <Editor v-model="ruleForm.synopsis" />
          <!-- <Ueditor :initHeight="400" :content="ruleForm.synopsis" /> -->
        </el-form-item>

        <el-form-item
          label="上传附件:"
          prop="file"
          style="width: 100%;"
        >
          <upload
            file
            :file-list="fileList"
            :limit="5"
            multiple
            :show-file-list="false"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
      </el-form>
      <FileTable
        :show-download="type !== 'add'"
        :show-delete="type !== 'detail'"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        :disabled="saveloading"
        type="primary"
        size="medium "
        :loading="saveloading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
    <Type ref="Type" @getType="getType" />
  </el-card>
</template>

<script>
import Editor from '@/components/QuillEditor'
import upload from '@/components/upload'
import { momentDate,replaceImg } from '@/utils/index'
import FileTable from '@/components/features/FileTable'
import Type from './type'
import { getLawDetail, addLawRegulation, updateLawRegulation,getLayType } from '@/api/general-services/public-information/lawsAndRegulations'
export default {
  components: {
    upload,
    FileTable,
    Editor,
    Type
  },
  data() {
    return {
      saveloading: false,
      fileList: [],
      options: [],
      title: '',
      ruleForm: {
        enactOrganization: '',
        enactTime: '',
        enactTitanic: '',
        fileName: '',
        filePath: [],
        fileType: '',
        id: 0,
        synopsis: ''
      },
      rules: {
        fileName: [
          { required: true, message: '请输入文件名', trigger: 'blur' }
        ],
        fileType: [
          { required: true, message: '请输入文件类型', trigger: 'blur' }
        ],
        enactOrganization: [
          { required: true, message: '请输入颁布机构', trigger: 'blur' }
        ],
        enactTitanic: [
          { required: true, message: '请输入颁布文号', trigger: 'blur' }
        ],
        enactTime: [
          { required: true, message: '请选择颁布时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const detailId = this.$route.query.id
    this.getType()
    if (detailId) {
      this.type = 'edit'
      this.getDetail(detailId)
    } else {
      this.type = 'add'
    }
  },
  methods: {
    // 查询详情
    async getDetail(detailId) {
      const res = await getLawDetail({ id: detailId })
      if (!res.data) return
      const {
        enactOrganization,
        enactTime,
        enactTitanic,
        fileName,
        filePath,
        id
      } = res.data
      const synopsis = await replaceImg(res.data.synopsis)
      this.ruleForm = {
        enactOrganization,
        enactTime,
        enactTitanic,
        fileName,
        filePath: filePath ? JSON.parse(filePath) : [],
        id,
        synopsis:synopsis
      }
      const typeIDS = []
      if (res.data.fileTypePId){
        typeIDS.push(res.data.fileTypePId)
      }
      if (res.data.fileTypeId){
        typeIDS.push(res.data.fileTypeId)
      }
      this.ruleForm.fileType = typeIDS
      this.ruleF
      this.fileList = [...this.ruleForm.filePath]
    },
    clickLawType(){
      this.$refs.Type.open()
    },
    getType(){
      getLayType({}).then(res => {
        res.data.forEach((item,index)=>{
          res.data[index].pid = item.pid || 0
        })
        const data = res.data ? this.toTreeData(res.data) : []
        data.forEach((item,index) => {
          if (item.children.length===0){
            delete data[index].children
          } else {
            item.children.forEach((val,key)=>{
              if (val.children.length===0){
                delete data[index].children[key].children
              }
            })
          }
        })
        this.options = data
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
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      if (this.saveloading){
        return false
      }
      this.saveloading = true
      this.ruleForm.fileType = this.ruleForm.fileType[this.ruleForm.fileType.length-1]
      const lawRegulationDto = {
        ...this.ruleForm,
        enactTime: momentDate(this.ruleForm.enactTime),
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      const res = lawRegulationDto.id ? await updateLawRegulation(lawRegulationDto) : await addLawRegulation(lawRegulationDto)
      this.saveloading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/data/law' })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        border: 1px solid #ebeef5;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            border-top: 1px solid #ebeef5;
            border-right: 1px solid #ebeef5;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;

            .quill-editor /deep/ .ql-container {
                height: 200px;
            }
        }
    }
}

.quill-editor /deep/ .ql-container {
    height: 200px;
}
</style>
