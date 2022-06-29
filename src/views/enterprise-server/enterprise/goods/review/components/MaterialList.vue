<template>
  <el-table
    :data="fileList"
    border
    style="width: 100%;"
  >
    <el-table-column
      label="序号"
      width="80"
      align="center"
    >
      <template v-slot="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column
      prop="materialName"
      label="材料名称"
      align="center"
    />
    <el-table-column
      label="电子文件"
      align="center"
    >
      <template v-slot="scope">
        <span style="color: #02aff4;">{{ scope.row.file }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          type="primary"
          plain
          size="medium"
          @click="uploadUrl(scope.row.path)"
        >
          下载
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { downloadCodeImg } from '@/utils/index'
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    fileList() {
      return this.info.pathVoList
    }
  },
  methods: {
    uploadUrl(path) {
      const obj = JSON.parse(path)
      obj.forEach(item => {
        downloadCodeImg(item.filePath,item.fileName)
      })
    }
  }
}
</script>
