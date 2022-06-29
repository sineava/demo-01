<template>
  <el-card id="topic-table" :style="`margin: 10px 0;height:${height}`">
    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
      <div class="left" style="display: flex;align-items: center">
        <span>{{title}}</span>
        <slot name="tag"></slot>
      </div>
      <div class="right">
        <el-popover
          placement="bottom"
          :offset="50"
          title="表格设置"
          popper-class="popover"
          trigger="click">
          <template>
            <div class="content"><p v-for="(item,index) in options" :key="index"><el-checkbox v-model="item.isShow">{{item.label}}</el-checkbox></p></div>
          </template>
          <el-button icon="el-icon-setting" size="small" type="success" slot="reference">表格设置</el-button>
        </el-popover>
      </div>
    </div>
    <el-table
      v-loading="Loading"
      :data="tableData"
      :row-key="obj.rowKey || ''"
      :height="obj.height || undefined"
      :max-height="obj.maxHeight || undefined"
      :stripe="obj.stripe || true"
      :border="obj.border || false"
      :size="obj.size || ''"
      :show-header="obj.showHeader || undefined"
      :highlight-current-row="true"
      :empty-text="obj.emptyText || '暂无数据'"
      :default-expand-all="obj.defaultExpandAll || false"
      :expand-row-keys="obj.expandRowKeys || undefined"
      :tooltip-effect="obj.tooltipEffect || 'dark'"
      :show-summary="obj.showSummary || false"
      :sum-text="obj.sumText || '合计'"
      :tree-props="obj.treeProps || { hasChildren: 'hasChildren', children: 'children' }"
      class="table-border currency"
    >
      <template v-for="(opt,key) in options">
        <template v-if="opt.isShow">
          <!-- 序号 -->
          <el-table-column
            :key="`index-${key}`"
            v-if="opt.type === 'index'"
            :fixed="opt.fixed"
            type="index"
            :label="opt.label"
            :align="opt.align || 'center'"
            width="60"
          />
          <!-- 复选框 -->
          <el-table-column
            :key="`selection-${key}`"
            v-else-if="opt.type === 'selection'"
            :fixed="opt.fixed"
            type="selection"
            align="center"
            width="50"
          />
          <!-- 后端返回纯数字处理 -->
          <el-table-column
            v-else-if="opt.type === 'only-num'"
            :fixed="opt.fixed"
            :label="opt.label"
            :key="`only-num-${key}`"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{ getValueToLabelOrTag(opt.payload,scope.row[opt.prop],'label') }}
            </template>
          </el-table-column>
          <el-table-column
            :key="`boolean-only-num-${key}`"
            v-else-if="opt.type === 'boolean-only-num'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{ scope.row[opt.prop] === opt.payload[0].value ? opt.payload[0].label : opt.payload[1].label }}
            </template>
          </el-table-column>
          <!-- 后端返回纯数字并tag显示 -->
          <el-table-column
            :key="`tag-${key}`"
            v-else-if="opt.type === 'tag'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              <el-tag :size="opt.size || obj.size" :effect="opt.effect" :color="opt.color" :hit="opt.hit" :closable="opt.closable" :disable-transitions="true" :type="getValueToLabelOrTag(opt.payload,scope.row[opt.prop],'tag')">
                {{ getValueToLabelOrTag(opt.payload,scope.row[opt.prop],'label') }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 后端返回纯数字并tag显示 -->
          <el-table-column
            :key="`boolean-tag-${key}`"
            v-else-if="opt.type === 'boolean-tag'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              <el-tag :size="opt.size || obj.size" :effect="opt.effect" :color="opt.color" :hit="opt.hit" :closable="opt.closable" :disable-transitions="true" :type="scope.row[opt.prop] === opt.payload[0].value ? opt.payload[0].tag : opt.payload[1].tag">
                {{ scope.row[opt.prop] === opt.payload[0].value ? opt.payload[0].label : opt.payload[1].label }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 后端返回时间戳 -->
          <el-table-column
            :key="`date-${key}`"
            v-else-if="opt.type === 'date'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{ momentDate(scope.row[opt.prop], opt.format || 'YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column
            :key="`file-${key}`"
            v-else-if="opt.type === 'file'"
            :fixed="opt.fixed"
            :label="opt.label"
            :align="opt.align || 'center'"
            width="130"
          >
            <template v-slot="scope">
              <p v-for="(item,index) in getFile(scope.row[opt.prop])" :key="index" class="file-table">
              <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                <el-tag class="file-tag" @click="clickFileTag(item)">{{item.name}}</el-tag>
              </el-tooltip>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :key="`boolean-${key}`"
            v-else-if="opt.type === 'boolean'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{scope.row[opt.prop] || opt.payload[0].label }}
            </template>
          </el-table-column>
          <!-- 多表头 -->
          <el-table-column
            :key="`texta-${key}`"
            v-else-if="opt.type === 'texta'"
            :fixed="opt.fixed"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
          >
            <el-table-column
              v-for="(opta, index) in opt.opta"
              :key="index"
              :fixed="opta.fixed"
              :prop="opta.prop"
              :label="opta.label"
              :show-overflow-tooltip="opta.showTooltip !== false ? true : false"
              :align="opta.align || 'center'"
              :width="opta.width"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            :key="`image-${key}`"
            v-else-if="opt.type === 'image'"
            :fixed="opt.fixed"
            :label="opt.label"
            :align="opt.align || 'center'"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :width="opt.width"
          >
            <template v-slot="scope">
              <span class="image" v-for="(item,index) in getImage(scope.row[opt.prop])" :key="index">
                <el-image v-if="index===0" style="height: 50px" fit="scale-down" :preview-src-list="getImage(scope.row[opt.prop])" :src="item" />
              </span>
            </template>
          </el-table-column>
          <!-- 自定义显示 -->
          <el-table-column
            :key="`custom-${key}`"
            v-else-if="opt.type === 'custom'"
            :fixed="opt.fixed"
            :label="opt.label"
            :align="opt.align || 'center'"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{customFun(scope.row[opt.prop],opt.customFun)}}
            </template>
          </el-table-column>
          <!-- 纯数据展示 -->
          <el-table-column
            :key="`text-boolean-${key}`"
            v-else-if="opt.type === 'text-boolean'"
            :fixed="opt.fixed"
            :label="opt.label"
            :align="opt.align || 'center'"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :width="opt.width"
          >
            <template v-slot="scope">
              {{scope.row[opt.prop] ? scope.row[opt.prop] : opt.payload[0].label}}
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="`text-${key}`"
            :fixed="opt.fixed"
            :prop="opt.prop"
            :label="opt.label"
            :show-overflow-tooltip="opt.showTooltip !== false ? true : false"
            :align="opt.align || 'center'"
            :width="opt.width"
            :class-name="`${opt.class || ''}`"
          />

        </template>
      </template>
    </el-table>
    <PDF ref="PDF" v-if="dochref" :dochref="dochref" />
    <el-image
      v-if="dialogVisible"
      ref="myImg"
      class="my-img"
      style="display: none;"
      :src="dialogImageUrl"
      :preview-src-list="[dialogImageUrl]"
    />
  </el-card>
</template>

<script>
import { downloadCodeImg,fileUrlAssemble,momentDate } from '@/utils/index'
import PDF from '@/components/pdf'
export default {
  components: {
    PDF
  },
  props: {
    height:{
      type:String,
      default:'100%'
    },
    options:{
      type: Array,
      default: () => []
    },
    tableData:{
      type: Array,
      default: () => []
    },
    Loading:{
      type:Boolean,
      default:false
    },
    tableObj:{
      type:Object,
      default: () => {}
    },
    title:{
      type:String,
      default:'展示数据'
    }
  },
  data() {
    return {
      dialogVisible:false,
      dialogImageUrl:'',
      dochref:'',
      opVisible:false,
      info:{},
      obj:{
        rowKey:'',
        height:'',
        maxHeight:undefined,
        stripe:true,
        border:false,
        size:'',
        showHeader:'',
        emptyText:'暂无数据',
        defaultExpandAll:false,
        expandRowKeys:undefined,
        tooltipEffect:'dark',
        showSummary:false,
        sumText:'合计',
        treeProps:{ hasChildren: 'hasChildren', children: 'children' }
      }
    }
  },
  watch:{
    tableData:{
      handler(newV){
      },
      deep:true
    },
    tableData:{
      handler(newV){
        this.obj = {...this.obj,...newV}
      },
      deep:true
    },
  },
  created() {
    this.obj = {...this.obj,...this.tableObj}
  },
  methods: {
    momentDate,
    getFile(file){
      let files = file ? JSON.parse(file) : []
      files.map(item => {
        const url = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
        let fileExtension = url ? url.split('.').pop().toLowerCase() : ''
        if (fileExtension==='pdf'){
          item.suffix = 'pdf'
        } else if (fileExtension==='png' || fileExtension==='jpeg' || fileExtension==='jpg'){
          item.suffix = 'images'
        } else {
          item.suffix = 'other'
        }
        let urlArr = url.split("/")
        let fileName=urlArr.slice(urlArr.length-1, urlArr.length).toString(String);
        item.name = fileName
        return item
      });
      return files
    },
    getImage(item){
      let img = item ? JSON.parse(item) : []
      img.map(async item=>{
        let url = await fileUrlAssemble(item)
        return item = url
      })
      return img
    },
    /**
     * 自定义方法
     */
    customFun(item,customFunName){
      return this.$parent.$parent[customFunName](item)
    },
    // 通过value值获取label或tag
    getValueToLabelOrTag(data,value,type){
      let result=''
      if(!value){
        return ''
      }
      for(let i=0;i<data.length;i++){
        if(data[i].value === value){
          result = type === 'label' ? data[i]?.label : data[i]?.tag
          return result
        }
      }
      return result
    },
    //预览
    async preview(){
      let item = this.info
      const urls = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      let url = await fileUrlAssemble(urls)
      if (item.suffix==='pdf'){
        this.dochref = url
        this.$refs.PDF.open()
      } else if (item.suffix==='images'){
        this.dialogImageUrl = url
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.myImg.showViewer = true
        })
      }
    },
    //下载
    async download(){
      let item = this.info
      const urls = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      let url = await fileUrlAssemble(urls)
      downloadCodeImg(url)
    },
    clickFileTag(item){
      this.info = item
      if(item.suffix === 'images' || item.suffix === 'pdf'){
        this.$confirm(`您是否要对文件“${item.name}”进行以下操作？`, '操作提示', {
          confirmButtonText: '预览',
          cancelButtonText: '下载',
          type: 'warning',
          center: true
        }).then(() => {
          this.preview()
        }).catch(action => {
           if(action === 'cancel'){
             this.download()
           }
        });
      }else{
        this.$alert(`您是否要对文件“${item.name}”进行以下操作？`, '操作提示', {
          confirmButtonText: '下载',
          callback: action => {
            if(action==='confirm'){
              this.download()
            }
          }
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.popover {
    .content {
        overflow-y: auto;
        max-height: 250px;
    }
}

.currency {
    .file-table {
        margin: 0;
        padding: 0;

        .file-tag {
            overflow: hidden;
            padding: 0 5px;
            max-width: 108px;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
            text-overflow: ellipsis;
        }
    }
}
</style>

<style lang="scss">
.el-table__row {
  .cell-blue {
    background-color: #74b9ff !important;
    color: #fff;
  }
  .cell-green {
    background-color: #00b894 !important;
    color: #fff;
  }
  .cell-orange {
    background-color: #fab1a0 !important;
    color: #fff;
  }
}
</style>