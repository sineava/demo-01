<template>
  <div v-if="file">
    <el-upload
      :class="disabled ? 'disabled-upload-file' : 'upload-file'"
      :action="action ? action : '/upload/v1/open/file/upload'"
      :name="name"
      :limit="limit"
      :multiple="multiple"
      :data="data"
      :headers="headers"
      :with-credentials="withCredentials"
      :drag="drag"
      :accept="fileAccept"
      :disabled="disabled"
      :show-file-list="showFileList"
      :file-list="listFileUrl"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="onExceed"
      :on-progress="onProgress"
    >
      <el-button
        :loading="loading"
        :size="fileBtn.size"
        :icon="fileBtn.icon"
        :type="fileBtn.type"
      >
        {{ loading ? '加载中' : fileBtn.name }}
      </el-button>
    </el-upload>
    <div v-if="!disabled && isTips" class="tips" style="margin-top: 10px;">{{ tips || `上传文件大小不得超过${ size }MB，最多可上传${limit}个文件` }}</div>
  </div>
  <div v-else>
    <el-upload
      :action="action ? action : '/upload/v1/open/file/upload'"
      :name="name"
      list-type="picture-card"
      :file-list="listFileUrl"
      :limit="limit"
      :data="data"
      :headers="headers"
      :multiple="false"
      :with-credentials="withCredentials"
      :drag="drag"
      :accept="imgAccept"
      :show-file-list="showFileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="onExceed"
      :on-progress="onProgress"
      :class="disabled ? 'disabled-upload-file' : 'upload-file'"
    >
      <em
        style="font-size: 30px;"
        class="el-icon-plus"
      />
    </el-upload>
    <div v-if="!disabled && isTips" class="tips" style="margin-top: 10px;">{{ tips || `仅可上传jpg、png、jpeg的图片，上传文件大小不得超过${size>20 ? 20 : size}MB，最多可上传${limit}个文件` }}</div>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { fileUrlAssemble } from '@/utils/index'
export default {
  name: 'Pagintaion',
  props: {
    tips:{
      type:String,
      default:'',
    },
    imgAccept: {
      type: String,
      default: () => '.bmp,.tiff,.gif,.png,.jpeg,.jpg'
    },
    fileAccept: {
      type: String,
      default: () => '.xls,.xlsx,.doc,.docx,.rar,.zip,.pdf,.bmp,.tiff,.gif,.png,.jpeg,.jpg,.mp4,.wmv,.3gp,.mp3,.txt,.ppt'
    },
    file: { // 是否文件
      type: Boolean,
      default: false
    },
    name: { // 上传的文件字段名
      type: String,
      default: 'file'
    },
    action: { // 必选参数，上传的地址
      type: String,
      default: ''
    },
    isTips:{ //是否显示提示
      type: Boolean,
      default: true
    },
    limit: { // 最大允许上传个数
      type: Number,
      default: 5
    },
    multiple: { // 是否支持多选文件
      type: Boolean,
      default: true
    },
    fileList: { // 图片显示
      type: Array,
      default: () => []
    },
    data: { // 上传时附带的额外参数
      type: Object,
      default: () => {}
    },
    headers: { // 设置上传的请求头部
      type: Object,
      default: () => {}
    },
    withCredentials: { // 支持发送 cookie 凭证信息
      type: Boolean,
      default: false
    },
    drag: { // 是否启用拖拽上传
      type: Boolean,
      default: false
    },
    accept: { // 是否启用拖拽上传
      type: String,
      default: ''
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    showFileList: { // 是否显示已上传文件列表
      type: Boolean,
      default: true
    },
    size:{ // 文件上传大小
      type:Number,
      default:200
    },
    fileBtn: { // 文件上传的按钮
      type: Object,
      default: () => {
        return {
          name: '点击上传',
          type: 'primary',
          size: 'small',
          icon: 'el-icon-upload'
        }
      }
    },
    payload: { // 附带信息[用于区分]
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      listFileUrl:[],
      loading: false // 加载状态
    }
  },
  watch: {
    fileList(newV,oldV) {
      this.fileUrlReset()
    }
  },
  mounted(){
    this.fileUrlReset()
  },
  methods: {
    fileUrlReset(){
      const listUrl = this.fileList.length>0 ? JSON.parse(JSON.stringify(this.fileList)) : []
      const fileLists = []
      listUrl.forEach(async item => {
        item.ydz = item.url || item.filePath
        if (item.filePath){
          item.filePath = await fileUrlAssemble(item.filePath)
          item.url = await fileUrlAssemble(item.filePath)
        }
        if (item.url){
          item.url = await fileUrlAssemble(item.url)
          item.filePath = await fileUrlAssemble(item.filePath)
        }
        fileLists.push(item)
      })
      this.listFileUrl = fileLists
    },
    // 删除
    handleRemove(file) {
      this.$emit('remove', file, this.payload)
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件上传时钩子
    onProgress(event, file, fileList){
      this.percentage = parseInt((event.loaded / event.total *100).toFixed(0))
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file) {
      if (response.code==='0'){
        this.loading = false
        if (this.multiple) { // 多文件上传
          setTimeout(() => {
            this.$emit('success', response, this.payload)
            this.$emit('fileSuccess', file, this.payload)
          }, 1000)
        } else {
          this.$emit('success', response, this.payload)
          this.$emit('fileSuccess', file, this.payload)
        }
      } else {
        this.$message.error(response.message)
      }
    },
    // 文件上传失败时的钩子
    handleError(err) {
      this.loading = false
      this.$emit('error', err, this.payload)
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      const beyond = this.handleSize(file)
      if (!beyond) {
        this.loading = true
        this.$emit('beforeUpload', file, { payload: this.payload })
      } else {
        return false
      }
    },
    // 文件超出个数限制时的钩子
    onExceed() {
      this.$message.error(`最多只能上传${this.limit}个文件，请删除后再上传`)
    },
    // 文件大小限制(单个不超过20M)
    handleSize(file) {
      let size = this.size
      if (this.file === false){
        size = size > 20 ? 20 : this.size
      }
      if ((file.size / 1024 / 1024) > size) {
        this.$message.warning(`超出${size}上传限制`)
        this.action = ''
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.disabled-upload-file {
    /deep/ .el-upload {
        display: none;
    }
}

.tips {
    font-size: 13px;
    color: #f56c6c;
}
</style>
