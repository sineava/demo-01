<template>
  <div>
    <el-table
      :data="fileData"
      :header-cell-style="{ backgroundColor: '#F2F2F2' }"
      border
      :height="height || undefined"
      style="margin-top: 10px;"
    >
      <el-table-column
        prop="fileName"
        label="文件名"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="fileSize"
        label="大小"
        width="150"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.fileSize">{{ parseInt(scope.row.fileSize)/1024 > 0.1 ? (parseInt(scope.row.fileSize)/1024).toFixed(2) + 'MB' : (scope.row.fileSize > 0 ? scope.row.fileSize: 1)+'KB' }}</span>
          <span v-else>{{ parseInt(scope.row.size)/1024 > 0.1 ? (parseInt(scope.row.size)/1024).toFixed(2) + 'MB' : (scope.row.size>0?scope.row.size:1)+'KB' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span v-if="scope.row.createTime">{{ scope.row.createTime }}</span>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showDownload || showDelete || showView"
        label="操作"
        :width="(showDownload ? 95 : 0) + (showDelete ? 95 : 0) + (showView ? 95 : 0)"
      >
        <template v-slot="scope">
          <el-button
            v-if="showDownload"
            size="mini"
            @click="handleDownload(scope.row)"
          >
            <em class="el-icon-download" /> 下载
          </el-button>
          <el-button
            v-if="showDelete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <em class="el-icon-delete" /> 移除
          </el-button>
          <el-button
            v-if="showView && (scope.row.suffix==='pdf' || scope.row.suffix==='images')"
            size="mini"
            type="success"
            @click="preview(scope.row)"
          >
            <em class="el-icon-view" /> 预览
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <PDF ref="PDF" :dochref="dochref" />
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
import { downloadCodeImg,fileUrlAssemble } from '@/utils/index'
import PDF from '@/components/pdf'
export default {
  components: {
    PDF
  },
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
    showView:{ // 是否预览
      type: Boolean,
      default: () => true
    },
    height:{
      type: [String,Number],
      default:''
    }
  },
  data() {
    return {
      fileData:[],
      dochref: '',
      dialogVisible:false,
      dialogImageUrl:''
    }
  },
  watch:{
    tableData(newV,obj){
      this.fileData = newV
      this.initFileData()
    }
  },
  async mounted() {
    this.fileData = this.tableData
    this.initFileData()
  },
  methods: {
    handleDownload(item) {
      const url = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      downloadCodeImg(url,item.fileName)
    },
    handleDelete(index, item) {
      this.$emit('handleDelete', { payload: this.payload, index: index, item: item })
    },
    async preview(item){
      const urls = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      let url = await fileUrlAssemble(urls)
      if (item.suffix==='pdf'){
        this.dochref = url
        this.$refs.PDF.open(url)
      } else if (item.suffix==='images'){
        this.dialogImageUrl = url
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.myImg.showViewer = true
        })
      }
    },
    initFileData(){
      if (this.fileData && this.fileData.length>0){
        this.fileData.map(item=>{
          const url = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
          let fileExtension = url ? url.split('.').pop().toLowerCase() : ''
          if (fileExtension==='pdf'){
            item.suffix = 'pdf'
          } else if (fileExtension==='png' || fileExtension==='jpeg' || fileExtension==='jpg'){
            item.suffix = 'images'
          } else {
            item.suffix = 'other'
          }
          return item
        })
      }
    }
  }
}
</script>
