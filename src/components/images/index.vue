<template>
  <div>
    <el-image
      v-if="type==='img'"
      :style="`height: ${height};width:${width}`"
      :src="imageUrl"
      :fit="fit"
      :preview-src-list="[imageUrl]"
    />
    <el-avatar
      v-if="type==='avatar'"
      :src="imageUrl"
      :style="`height: ${height};width:${width}`"
      :preview-src-list="[imageUrl]"
    />
  </div>
</template>

<script>
import {fileUrlAssemble} from '@/utils/index'
export default {
  name: 'PictureUpload',
  props: {
    type:{
      type: String,
      default: 'img'
    },
    fit: { // 必选参数，上传的地址
      type: String,
      default: 'contain'
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '100px'
    },
    url:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  watch: {
    async url(newV,oldV) {
      this.imageUrl = await fileUrlAssemble(newV)
    }
  },
  async mounted(){
    this.imageUrl = await fileUrlAssemble(this.url)
    console.log(this.imageUrl)
  },
}
</script>
