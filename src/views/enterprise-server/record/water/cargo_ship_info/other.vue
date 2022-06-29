<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item,index) in data"
        :key="index"
        :timestamp="item.createTime"
        placement="top"
      >
        <el-card>
          <h4>{{ ['提交审核','业务退回','业务办理','业务审核'][item.state-1] }}</h4>
          <p>处理人：{{ item.enterpriseName }} - {{ item.createBy }}</p>
          <p>时间：{{ item.createTime }}</p>
          <p v-if="item.state!==1">处理状态：<el-tag :type="['','warning','success','success'][item.state-1]">{{ ['审核中','退回','受理通过','审核通过'][item.state-1] }}</el-tag></p>
          <p>{{ item.state===1 ? '备注':'处理意见' }}：{{ item.remark }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { getFilingInfoTrace } from '@/api/water-transportation-services/keep-on-record/ordinary-freighter-transport-filing'

export default {
  props:{
    fid:{
      type:[Number,String],
      default:0
    }
  },
  data() {
    return {
      id:'',
      data:[]
    }
  },
  watch:{
    fid(newV,obj){
      this.id = newV
      this.init()
    }
  },
  async mounted() {
    this.id = this.fid
    this.init()
  },
  methods: {
    init(){
      getFilingInfoTrace({recordId:this.id}).then(res=>{
        this.data = res.data
      })
    }
  }
}
</script>
