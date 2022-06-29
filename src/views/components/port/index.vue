<template>
  <div class="body-card">
    <el-form
      ref="ruleForm"
      :model="basicRuleForm"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
    >
      <div class="company_basic_detail">
        <div class="change">
          <div class="title">
            <span class="text">变更情况{{ index + 1 }}</span>
            <span v-if="isEdit" class="button"><el-button size="mini" type="danger" @click="delChange">删除</el-button></span>
          </div>
          <el-descriptions
            class="descriptions"
            :column="2"
            :colon="true"
            size="medium"
            labelClassName="business-title"
            contentClassName="business-text"
            border
          >
            <el-descriptions-item>
              <template slot="label"><i v-if="isEdit" class="required" />标题:</template>
              <el-form-item v-if="isEdit" prop="title">
                <el-input v-model.trim="basicRuleForm.title" placeholder="请输入标题" />
              </el-form-item>
              <span v-else>{{ basicRuleForm.title }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"><i v-if="isEdit" class="required" />变更时间</template>
              <el-form-item v-if="isEdit" prop="changeTime">
                <el-date-picker
                  v-model="basicRuleForm.changeTime"
                  type="date"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择变更时间"
                />
              </el-form-item>
              <span v-else>{{ basicRuleForm.changeTime }}</span>
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label"><i v-if="isEdit" class="required" />变更情况说明</template>
              <el-form-item v-if="isEdit" prop="remark">
                <el-input
                  v-model="basicRuleForm.remark"
                  type="textarea"
                  placeholder="请输入经营范围"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  @change="inputChange"
                />
              </el-form-item>
              <span v-else>{{ basicRuleForm.remark }}</span>
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">附件</template>
              <el-form-item v-if="isEdit && fileList.length<3" prop="landTitanic">
                <upload
                  file
                  :show-file-list="false"
                  :file-list="fileList"
                  multiple
                  :limit="3"
                  @fileSuccess="fileUploadSuccess"
                />
              </el-form-item>
              <p v-for="(item,index) in fileList" :key="index"><el-tag :closable="isEdit?true:false" @click="clickFile(item)" @close="closeFile(index)">{{ item.name }}</el-tag></p>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-form>
    <PDF v-if="dochref" ref="PDF" :dochref="dochref" />
    <el-image
      v-if="dialogVisible"
      ref="myImg"
      class="my-img"
      style="display: none;"
      :src="dialogImageUrl"
      :preview-src-list="[dialogImageUrl]"
    />
  </div>
</template>

<script>
/*
 *
 * import { findByBasicInfo, findQyByToBasicInfo,addOrModifyOtherInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
 * import Maptable from '@/components/Maptable/index'
 * import BusinessInformation from '@/views/components/business'
 */
import upload from '@/components/upload'
import PDF from '@/components/pdf'
import { downloadCodeImg,fileUrlAssemble,momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    PDF
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    index:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      basicRuleForm: {
        id:'',
        title:'',
        remark:'',
        filePath:'',
        changeTime:''
      },
      dochref:'',
      dialogVisible:false,
      dialogImageUrl:'',
      info:{},
      fileList:[],
      rules: {
        title: [
          { required: true, message: '请输入变更标题', trigger: 'blur' }
        ],
        changeTime: [
          { required: true, message: '请选择变更时间', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入变更说明', trigger: 'blur' }
        ],
      }
    }
  },
  watch:{
    item:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    }
  },
  async mounted() {
    this.init(this.item)
    this.isAllowEdit = this.isEdit
    this.key = this.index
  },
  methods: {
    init(data){
      this.basicRuleForm = {
        id:data?.id,
        title:data?.title,
        remark:data?.remark,
        filePath:data?.filePath,
        changeTime:data?.changeTime
      }
      if (data && data.filePath){
        this.fileList = JSON.parse(data.filePath)
      }
    },
    inputChange(){

    },
    /**
     * 保存
     */
    submitForm() {
      let res = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.basicRuleForm))
          res.filePath = JSON.stringify(this.fileList)
        } else {
          res = false
        }
      })
      return res
    },
    // 预览
    async preview(){
      let item = this.info
      let fileExtension = this.getFileType(item.url)
      let url = await fileUrlAssemble(item.url)
      if (fileExtension==='pdf'){
        this.dochref = url
        this.$refs.PDF.open()
      } else if (fileExtension==='images'){
        this.dialogImageUrl = url
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.myImg.showViewer = true
        })
      }
    },
    // 获取文件后缀
    getFileType(url){
      let suffix = ''
      let fileExtension = url.split('.').pop().toLowerCase()
      if (fileExtension==='pdf'){
        suffix = 'pdf'
      } else if (fileExtension==='png' || fileExtension==='jpeg' || fileExtension==='jpg'){
        suffix = 'images'
      } else {
        suffix = 'other'
      }
      return suffix
    },
    // 下载
    async download(){
      let item = this.info
      let url = await fileUrlAssemble(item.url)
      downloadCodeImg(url)
    },
    // 点击文件
    clickFile(item){
      let fileExtension = this.getFileType(item.url)
      this.info = item
      if (fileExtension === 'images' || fileExtension === 'pdf'){
        this.$confirm(`您是否要对文件“${item.name}”进行以下操作？`, '操作提示', {
          confirmButtonText: '预览',
          cancelButtonText: '下载',
          distinguishCancelAndClose:true,
          type: 'warning',
        }).then(() => {
          this.preview()
        }).catch(action => {
          if (action === 'cancel'){
           this.download()
          }
        })
      } else {
        this.$alert(`您是否要对文件“${item.name}”进行以下操作？`, '操作提示', {
          confirmButtonText: '下载',
          callback: action => {
            if (action==='confirm'){
              this.download()
            }
          }
        })
      }
    },
    // 删除文件
    closeFile(index){
      this.fileList.splice(index,1)
    },
    // 删除对象
    delChange(){
      this.$emit('delete',this.index)
    },
    // 文件上传成功
    fileUploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100px;
    height: 100px;
}

.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.change {
    .title {
        border: 1px solid #ebeef5;
        border-bottom: none;
        padding: 0 10px;
        line-height: 50px;
        background: #fafafa;

        .text {
            font-weight: 600;
        }

        .button {
            float: right;
        }
    }
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 40%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}

.base-ruleForm {
    .el-form-item {
        margin: 0;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
