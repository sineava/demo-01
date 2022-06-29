<template>
  <div class="upload-download">
    <template v-if="showImport">
      <a
        v-if="button_roles.import && filename"
        class="item"
        :href="`./excels/${filename}`"
        :download="filename"
      >
        <el-button
          plain
          size="small"
          icon="el-icon-s-order"
        >模板下载</el-button>
      </a>
      <el-upload
        v-if="button_roles.import"
        class="item"
        :action="action"
        :limit="10"
        :file-list="fileList"
        :show-file-list="false"
        :http-request="upload"
        :size="size"
      >
        <el-button
          :size="size"
          :loading="importLoading"
        >
          导入数据
        </el-button>
      </el-upload>
    </template>
    <el-button
      v-if="showExport&&button_roles.export"
      :size="size"
      :loading="exportLoading"
      @click="exportExcel"
    >
      {{ btnTitle }}
    </el-button>
  </div>
</template>

<script>
import htmlToExcel from '@/utils/htmlToExcel'
export default {
  props: {
    size: {
      type: String,
      default: () => 'small'
    },
    filename: {
      type: String,
      default: () => ''
    },
    action: {
      type: String,
      default: () => ''
    },
    showImport: {
      type: Boolean,
      default: () => true
    },
    showExport: {
      type: Boolean,
      default: () => true
    },
    otherData: {
      type: Object,
      default: () => {}
    },
    btnTitle: {
      type: String,
      default: () => '导出数据'
    },
    button_roles: {
      type: Object,
      default: () => ({ template: true, import: true, export: true })
    }
  },
  data() {
    return {
      fileList: [],
      list: [],
      importLoading: false,
      exportLoading: false
    }
  },
  methods: {
    // 导入
    upload(fileObj) {
      this.importLoading = true
      const formData = new FormData()
      formData.set('file', fileObj.file)
      if (this.otherData) {
        Object.keys(this.otherData).forEach(key => {
          formData.set(key, this.otherData[key])
        })
      }
      this.$emit('uploadExcel', formData, _ => {
        this.importLoading = false
      })
    },
    // 导出
    exportExcel() {
      this.exportLoading = true
      // 获取未分页数据
      this.$emit('getExportData', ({ data, title }) => {
        htmlToExcel.getJsonExcel(data, title)
        this.exportLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-download {
    display: flex;
}

.item {
    margin-right: 10px;
}

.el-upload--text {
  .el-button--mini {
    height: 100%;
  }
}
</style>
