<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>视频监控管理</span>
      <span style="float: right;">
        <el-button
          v-if="button_roles.refresh"
          icon="el-icon-refresh"
          type="primary"
          size="small"
          :disabled="disabled"
          @click="refresh"
        >更新视频监控</el-button>
      </span>
    </div>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="left">
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            />

            <el-tree
              ref="tree"
              class="filter-tree"
              :data="treeData"
              :props="defaultProps"
              :accordion="true"
              :indent="5"
              :style="`height:${height-310}px;`"
              node-key="value"
              :highlight-current="true"
              :default-expanded-keys="['root000000']"
              :filter-node-method="filterNode"
              :render-content="renderContent"
              @node-click="handleNodeClick"
            />
          </div>
        </el-col>
        <el-col ref="rigth" :span="18">
          <div style="height: 80px;">
            <el-alert
              title="当前选中视频"
              type="success"
              show-icon
              :closable="false"
            >
              <div>
                <el-tag
                  v-if="currentData.id"
                  size="mini"
                  style="margin-right: 10px;"
                  :type="!currentData.status ? '' : 'info'"
                >
                  {{ !currentData.status ? '在线':'离线' }}
                </el-tag>
                <span>{{ currentData.label || '尚未选中视频' }}</span>
              </div>
              <span v-if="currentData.id && button_roles.update" style="position: absolute; top: 15px; right: 20px;"><el-button
                size="mini"
                type="primary"
                plain
                @click="videoUpdata"
              >修改</el-button></span>
            </el-alert>
          </div>
          <haikang
            v-if="width>0"
            ref="haikang"
            :width="width - 20"
            :height="height-320"
            :playType="1"
            layout="3x3"
            @initSuccess="initSuccess"
          />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { getVidesAuxiliary,getVides,updateRegions } from '@/api/data-management/resources/auxiliary-facilities'
import { mapGetters } from 'vuex'
import haikang from '@/components/haikangVideo'
export default {
  components: {
    haikang
  },
  data() {
    return {
      treeData:[],
      filterText:'', // 搜索文本
      isInitSucc:false,
      currentData:{},
      disabled:false,
      height:document.body.clientHeight,
      width: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.width = this.$refs.rigth.$el.clientWidth
    this.init()
  },
  methods: {
    refresh(){
      this.disabled = true
      updateRegions().then(res=>{
        this.disabled = false
        if (res.code==='0'){
          this.$message.success('视频更新成功')
          this.init()
        }
      })
    },
    init(){
      this.currentData = {}
      this.treeData = []
      this.getAuxiliary()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data){
      if (data.type === 'video'){
        this.currentData = data
        if (!data.status){
          if (this.isInitSucc === false){
            this.$message.error('播放组件正在初始化请稍后')
          } else {
            this.$refs.haikang.preview(data.videoLink,0,1,0,0)
          }
        } else {
          this.$message.error('当前视频离线状态')
        }
      }
    },
    renderContent(h, { node, data, store }) {
      let icon
      let butt
      let text
      if (data.type === 'video'){
        icon = !data.status ? <span class="blue"><i style="color: #409EFF;" class="el-icon-video-camera"></i></span> : <span class="info"><i style="color: #909399;" class="el-icon-video-camera"></i></span>
        // butt = <el-button size="mini" type="text" on-click={ () => this.videoUpdata(data) }>编辑</el-button>
        text = data.geographyInfos && data.geographyInfos.length>0 && data.geographyInfos[0].latitude && data.geographyInfos[0].longitude ? <span>{node.label}</span> : <span style="color:#F56C6C;">{node.label}</span>
      } else {
        text = <span>{node.label}</span>
      }
      if ((!data.children || data.children.length === 0 || data.children[0].type==='video') && (data.type !== 'video')){
        butt = <el-button size="mini" type="text" on-click={ () => this.append(data) }>{data.children ? '刷新' : '加载'}视频</el-button>
      }
      let zx = <span class="custom-tree-node">
        {icon || ''}
        {text}
        <span style="margin-left: 5px;">
          {butt || ''}
        </span>
      </span>

      return (
        zx
      )
    },
    async append(data) {
      let res = await getVides(data.value)
      let newChild = []
      res.data.forEach(item=>{
        item.type = 'video'
        item.label = `${item.cameraName}(${item.unitType})`
        item.value = item.id
        newChild.push(item)
      })
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children = newChild
    },
    // 视频信息修改
    videoUpdata(){
      this.$refs.haikang.closeWindow()
      this.$router.push({ path: '/digital/resources/videoDetail', query: { id: this.currentData.id, isEdit: true }})
    },
    // 视频组件初始成功
    initSuccess(){
      this.isInitSucc = true
    },
    async getAuxiliary(){
      let res = await getVidesAuxiliary()
      this.treeData = this.toTreeData(res.data || [])
    },
    /**
     * 递归树
     */
    toTreeData(data){
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },

    tree(data){
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.indexCode] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.parentIndexCode]
        it.label = it.name
        it.value = it.indexCode
        it.type = 'catalogue'
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
    border-right: 1px solid #cccccc;
    padding: 10px;

    .filter-tree {
        overflow-y: auto;
        margin-top: 10px;

        /deep/ .el-tree-node__content {
            overflow: hidden;
            width: 100%;
            height: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
