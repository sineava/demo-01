<template>
  <el-dialog
    title="PDF预览"
    custom-class="pdf"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    width="794px"
  >
    <div
      id="box"
      ref="Box"
      class="aui-content"
    >
      <pdf
        v-if="url"
        ref="pdf"
        :src="url"
        :page="pageNum"
        :rotate="pageRotate"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum=$event"
        @error="pdfError($event)"
        @link-clicked="page = $event"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-pagination
        v-if="pageTotalNum"
        :current-page="pageNum"
        :page-size="1"
        layout="total, prev, pager, next, jumper"
        :total="pageTotalNum"
        @current-change="handleCurrentChange"
      />
      <!-- <p v-if="pdfSrc" class="arrow2">
        <span :class="{grey: currentPage===1}" @click="changePdfPage(0)">上一页</span>
        {{ currentPage }} / {{ pageCount }}
        <span
          :class="{grey: currentPage===pageCount}"
          @click="changePdfPage(1)"
        >下一页</span>
      </p> -->
    </span>
  </el-dialog>
</template>
<script>
import pdf from "vue-pdf"
export default {
  name: "Pdf",
  components: {
    pdf
  },
  props: ["dochref", "doctype"],
  data() {
    return {
      scrollTop: '', /* 保存当前滚动条 */
      dialogVisible:false,
      url: "",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
    }
  },
  watch: {
    dochref(val) {
      this.url = val
      window.open(this.url, '_blank'); //打开新标签
    },
  },
  mounted(){
    this.url = ""
    this.url = this.dochref
  },
  methods: {
    open(){
      if(this.url){
        window.open(this.url, '_blank'); //打开新标签
      }
      // window.open(this.url, '_blank'); //打开新标签
      // this.dialogVisible = true
    },
    // 上一页函数，
    prePage() {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页函数
    nextPage() {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 页面顺时针翻转90度。
    clock() {
      this.pageRotate += 90
    },
    // 页面逆时针翻转90度。
    counterClock() {
      this.pageRotate -= 90
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded(e) {
      this.pageNum = e
    },
    // 其他的一些回调函数。
    pdfError(error) {
      console.error(error)
    },
    // 分页
    handleCurrentChange(e){
      this.pageNum = e
      this.$refs.Box.scrollTop = 0
    }
  }
}
</script>
<style lang="scss">
.pdf {
    .el-dialog__body {
        padding: 0;
        max-height: unset;
    }

    .el-pagination__total {
        float: left;
    }

    .el-dialog__footer {
        border-top: 1px solid #f5f5f5;
    }
}
</style>
<style lang="scss" scoped>
.aui-content {
    overflow-y: auto;
    height: 600px;
}
</style>
