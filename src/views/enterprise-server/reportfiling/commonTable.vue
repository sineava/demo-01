<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    :header-cell-style="{ backgroundColor: '#F2F2F2' }"
    border
    style="margin-top: 10px;"
  >
    <el-table-column
      prop="fileName"
      label="文件名"
      align="center"
    />
    <el-table-column
      prop="fileSize"
      label="大小"
      align="center"
    >
      <template v-slot="scope">
        <span>{{ parseInt(scope.row.fileSize)/1024 > 0.1 ? (parseInt(scope.row.fileSize)/1024).toFixed(2) + 'MB' : scope.row.fileSize+'KB' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="上传时间"
      align="center"
    />
    <el-table-column
      label="操作"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          v-if="showDownload"
          size="mini"
          plain
          @click="handleDownload(scope.row.filePath)"
        >
          <em class="el-icon-download" /> 下载
        </el-button>
        <el-button
          v-if="showDelete"
          size="mini"
          plain
          type="danger"
          @click="handleDelete(scope.$index)"
        >
          <em class="el-icon-delete" /> 移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { downloadCodeImg } from '@/utils/index'
export default {
  props: {
    tableData: { // 列表数据
      type: Array,
      default: () => []
    },
    payload: { // 用于区分
      type: String,
      default: () => ''
    },
    showDownload: { // 显示下载按钮
      type: Boolean,
      default: () => false
    },
    showDelete: { // 显示移除按钮
      type: Boolean,
      default: () => false
    },
    loading: { // 加载状态
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleDownload(url) {
      downloadCodeImg(url)
    },
    handleDelete(index) {
      this.$emit('handleDelete', { payload: this.payload, index })
    }
  }
}
</script>
