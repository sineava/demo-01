<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action ? action : '/upload/v1/open/file/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        alt="img"
        :style="{'width': `${width}px`, 'height': `${height}px`}"
      >

      <em
        v-else
        class="el-icon-plus avatar-uploader-icon"
        :style="{'width': `${width}px`, 'height': `${height}px`, 'line-height': `${height}px`}"
      />
    </el-upload>
    <div class="tips">仅可上传jpg、png、jpeg的图片，上传文件大小不得超过20m</div>
  </div>
</template>

<script>
import {fileUrlAssemble} from '@/utils/index'
export default {
  name: 'PictureUpload',
  props: {
    action: { // 必选参数，上传的地址
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
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
  methods: {
    fileUrlAssemble,
    async setImgUrl(url) {
      this.imageUrl = await fileUrlAssemble(url)
    },
    async handleAvatarSuccess(res, file) {
      this.imageUrl = await fileUrlAssemble(res.data)
      this.$emit('handleAvatarSuccess', res)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    overflow: hidden;
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    width: 150px;
    height: 150px;
    font-size: 28px;
    line-height: 150px;
    text-align: center;
    color: #8c939d;
}

.avatar {
    display: block;
    width: 150px;
    height: 150px;
}

.tips {
    font-size: 12px;
    color: #666666;
}
</style>>
