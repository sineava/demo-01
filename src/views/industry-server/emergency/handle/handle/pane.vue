<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急处置详情" />
      </span>
      <el-button type="primary" size="small" @click="visible = true;show()" style="margin-left: 20px">单兵信息</el-button>
      <span class="detail-header-button">
        <el-button v-if="state===3" type="success" style="margin: 10px;" @click="exportRecord" size="small">导出报告</el-button>
        <el-radio-group v-model="activeName" size="small">
          <el-radio-button v-for="(item,index) in tabs" :key="index" :label="item.name">{{item.label}}</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="content">
      <component
        :is="activeName"
        :id="id"
        :state="Number(state)"
        :tabType="tabType"
        @setCenter="setCenter"
      />
      <el-button
        v-if="tabType === 'add'"
        type="warning"
        size="medium"
        class="btn"
        @click="end"
      >
        终止响应
      </el-button>
    </div>
    <el-dialog
      :visible.sync="visible"
      width="80%"
      :close-on-click-modal="false"
      fullscreen
    >
      <div slot="title">
        <div style="display: flex;align-items: center">
          <img src="@/assets/map-logo.png" style="height:40px" />
          <span style="margin-left:10px;font-size:14px">应急救援地图</span>
        </div>
      </div>
      <Maptable
        ref="dialogMap"
        name="dialogMap"
        :height="800"
        :isTable="false"
        :is-edit="false"
        :isManual="false"
        :tool="['spot']"
        is-full
      />
    </el-dialog>
  </el-card>
</template>

<script>
import receive from './pane/receive'
import renewal from './pane/renewal'
import resp from './pane/resp'
import team from './pane/team'
import supplies from './pane/supplies'
import expert from './pane/expert'
import situation from './pane/situation'
import Maptable from '@/components/Maptable'
import {assemblyData} from './export'
import { exportWord } from '@/components/word'
export default {
  components: {
    receive,
    renewal,
    resp,
    team,
    supplies,
    expert,
    situation,
    Maptable
  },
  data() {
    return {
      visible: false,
      id: null,
      activeName: 'receive',
      status: '',
      state:1,
      tabType: '',
      tabs:[
        {name:'receive',label:'接警记录'},
        {name:'renewal',label:'续报记录'},
        {name:'resp',label:'应急响应'},
        {name:'team',label:'应急队伍'},
        {name:'supplies',label:'应急物资'},
        {name:'expert',label:'应急专家'},
      ],
      center: []
    }
  },
  created() {
    const { id, state, tabType,isJy } = this.$route.query
    if (state === 3) {
      this.status = 'end'
    }
    if(!isJy || tabType==='add'){
      this.tabs.push({name:'situation',label:'救援情况'})
    }
    this.id = Number(id)
    this.state = Number(state)
    this.tabType = tabType
  },
  methods: {
    async exportRecord(){
      const loading = this.$loading({
        lock: true,
        text: '正在生成报告，请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let data = await assemblyData({id:this.id})
      exportWord('./excels/应急救援评估报告.docx',data,`应急救援评估报告`)
      loading.close()
    },
    // 处理tab切换
    handlePaneChange({ name }) {
      this.activeName = name
      if (name !== 'situation') this.status = ''
    },
    // 终止响应
    end() {
      this.status = 'end'
      this.activeName = 'situation'
    },
    // 显示地图
    show() {
      this.$nextTick(() => {
        this.$refs.dialogMap?.init(this.center)
      })
    },
    // 设置中心点
    setCenter(center) {
      this.center = center
    }
  }
}
</script>

<style lang="scss" scoped>
$height: calc(100vh - 50px);
.content{
  position: relative;
  .btn {
    position: absolute;
    top: 7px;
    right: 5px;
  }
}
/deep/ .el-dialog {
  overflow: hidden;
  border-radius: 0 !important;
  .el-dialog__header {
    background-color: #2980b9 !important;
    * {
      color: #fff !important;
    }
  }
  .el-dialog__body {
    padding: 0 !important;
    height: $height !important;
    max-height: $height !important;
    #dialogMap {
      height: $height !important;
    }
  }
}
</style>
