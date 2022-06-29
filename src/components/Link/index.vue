<template>
  <el-link
    :href="filePath"
    target="_blank"
    type="primary"
  >
    {{ fileName }}
  </el-link>
</template>

<script>
import {fileUrlAssemble} from '@/utils/index'
export default {
  name: 'PictureUpload',
  props: {
    type:{
      type: String,
      default: 'primary'
    },
    target: { // 必选参数，上传的地址
      type: String,
      default: '_blank'
    },
    width: {
      type: String,
      default: 'auto'
    },
    fileName:{
      type: String,
      default: ''
    },
    url:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filePath: '',
      name:''
    }
  },
  watch: {
    async url(newV,oldV) {
      this.filePath = await fileUrlAssemble(newV)
    },
    fileName(newV,oldV){
      this.name = newV
    }
  },
  async mounted(){
    this.filePath = await fileUrlAssemble(this.url)
    this.name = this.fileName
  },
}
</script>
