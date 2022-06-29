<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>风险防范措施</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="857px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            <el-row :gutter="10">
              <el-col :span="8"><span>风险事件数量：<span>{{ info.count || 0 }} (个)</span></span></el-col>
              <el-col :span="8"><span>参与评估企业数量：<span>{{ info.enterpriseCount || 0 }} (个)</span></span></el-col>
              <el-col :span="8"><span>已完善风险管控措施企业数量：<span>{{ info.completeCount || 0 }} (个)</span></span></el-col>
            </el-row>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>风险等级分类统计</span>
                </div>
                <Charts :option="levelOpt" style="height: 250px" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>制险因素分类统计</span>
                </div>
                <Charts :option="factorOpt" style="height: 250px" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>完成整改分类统计</span>
                </div>
                <Charts :option="rectifyOpt" style="height: 250px" />
              </el-card>
            </el-col>
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>风险事件数量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 300px"/>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <TopicTable
      ref="topicTable"
      :tableData="list"
      :options="options"
    />
    <pagination
      :total="total"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      background
      @change="paginationChange"
    />
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie, Bar } from '@/utils/charts-basic-options'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/port-services/topic/measure-statistics'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
import { getValue } from '@/utils/index'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    pagination,
    OrdinaryScreen,
    TopicTable
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchData:[
        {label:'风险事件',prop:'incidentName',form:'input',data:''},
        {label:'风险等级',prop:'riskGrade',form:'select',data:'',option:[
          { value: 1, label: '较小风险' },
          { value: 2, label: '一般风险' },
          { value: 3, label: '较大风险' },
          { value: 4, label: '重大风险' }
        ]},
        {label:'评估时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'风险事件',type:'text',isShow:true,prop:'incidentName'},
        {label:'所属企业',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'所属作业单元',type:'text',isShow:true,prop:'activityName'},
        {label:'风险值',type:'text',isShow:true,prop:'riskValue'},
        {label:'风险等级',type:'only-num',isShow:true,prop:'riskGrade',payload: [
          { value: 1, label: '较小风险' },
          { value: 2, label: '一般风险' },
          { value: 3, label: '较大风险' },
          { value: 4, label: '重大风险' }
        ]},
        {label:'风险评估时间',type:'text',isShow:true,prop:'assessDate'},
        {label:'是否完善风险管控措施',type:'boolean-only-num',isShow:true,prop:'isPerfect',payload: [
          { value: 0, label: '否' },
          { value: 1, label: '是' },
        ]},
        {label:'责任人',type:'text',isShow:true,prop:'liablePerson'},
        {label:'联系方式',type:'text',isShow:true,prop:'contactMode'},
        {label:'管控措施',type:'text',isShow:true,prop:'controlMeasures'},
        {label:'更新时间',type:'text',isShow:true,prop:'updateTime'}
      ],
      info: {
        count: undefined,
        enterpriseCount: undefined,
        completeCount: undefined
      },
      levelOpt: {},
      factorOpt: {},
      rectifyOpt: {},
      timeOpt: {},
      riskGrade: [
        { value: 1, label: '较小风险' },
        { value: 2, label: '一般风险' },
        { value: 3, label: '较大风险' },
        { value: 4, label: '重大风险' }
      ],
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  created() {
    this.bRoles = this.button_roles
    this.init()
  },
  methods: {
    init(queryData){
      this.currentPage = 1
      this.fetchData(queryData)
      this.topic(queryData)
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      this.queryData.pageNum = this.currentPage
      this.queryData.pageSize = this.pageSize
      this.loading = true
      getTopicList(this.queryData).then(res=>{
        this.loading = false
        if (res.code === '0') {
          this.loading = false
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
        }
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        const { count="0", completeCount="0", enterpriseCount="0", factorsTypeList = [], isPerfectList = [], riskGradeList = [], timeStatisticsList = [] } = res.data || {}
        this.info = {
          count,
          completeCount,
          enterpriseCount
        }
        this.levelOpt = new Pie(riskGradeList.map(x => ({ name: x.type && this.riskGrade.find(y => y.value === x.type).label, value: x.count }))).option
        this.factorOpt = new Pie(factorsTypeList.map(x => ({ name: x.type && ['人的因数','设备因素','环境因素','管理因素'][x.type - 1], value: x.count }))).option
        this.rectifyOpt = new Pie(isPerfectList.map(x => ({ name: (x.type || x.type === 0) && ['未完善','已完善'][x.type], value: x.count }))).option
        this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 获取导出数据
     */
    getExportData(queryData,callback) {
      if(queryData){
        this.queryData = queryData
      }
      exportTopicList(queryData).then(res => {
        let header = {}
        this.options.forEach(item=>{
          if (item.file !=='file' && item.isShow){
            header[(item.prop || 'no')] = item.label
          }
        })
        let arr = []
        res.data.forEach((item,index)=>{
          let row = {}
          this.options.forEach(e=>{
            if (item.file !=='file' && e.isShow){
              row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
            }
          })
          arr.push(row)
        })
        arr.unshift(header)
        callback({ data: [...arr], title: "风险防范措施数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
