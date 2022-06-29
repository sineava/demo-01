<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>风险等级数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="886px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            <span>风险事件数量：<span>{{ info.count || 0 }} (个)</span></span>
            <span style="margin-left: 20%">重大风险事件数量：<span>{{ info.majorCount || 0 }} (个)</span></span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>风险等级分类统计</span>
                </div>
                <Charts :option="levelOpt" style="height: 300px" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>制险因素分类统计</span>
                </div>
                <Charts :option="factorOpt" style="height: 300px" />
              </el-card>
            </el-col>
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>风险事件数量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 300px" />
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
import { getTopicList, exportTopicList, getTopicStat } from '@/api/port-services/topic/level-statistic'
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
      info: {
        count: '',
        majorCount: ''
      },
     searchData:[
        {label:'风险事件',prop:'incidentName',form:'input',data:''},
        {label:'所属企业',prop:'enterpriseName',form:'input',data:''},
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
        {label:'制险因素',type:'texta',isShow:true,opta: [
          {label:'人的因素',type:'text',isShow:true,prop:'factorsPerson'},
          {label:'设备因素',type:'text',isShow:true,prop:'factorsEquipment'},
          {label:'环境因素',type:'text',isShow:true,prop:'factorsEnvironment'},
          {label:'管理因素',type:'text',isShow:true,prop:'factorsManagement'}
        ]},
        {label:'发生可能性（L）',type:'text',isShow:true,prop:'happenPossibility'},
        {label:'后果严重程度（C）',type:'text',isShow:true,prop:'seriousDegree'},
        {label:'风险值',type:'text',isShow:true,prop:'riskValue'},
        {label:'风险等级',type:'only-num',isShow:true,prop:'riskGrade',payload: [
          { value: 1, label: '较小风险' },
          { value: 2, label: '一般风险' },
          { value: 3, label: '较大风险' },
          { value: 4, label: '重大风险' }
        ]},
        {label:'评估时间',type:'text',isShow:true,prop:'assessDate'}
      ],
      levelOpt: {},
      factorOpt: {},
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
        this.loading = false
        if (res.code === '0') {
          const { count="0", majorCount="0", factorsStatisticsList = [], timeStatisticsList = [], typeStatisticsList = [] } = res.data || {}
          this.info = {
            count,
            majorCount
          }
          this.levelOpt = new Pie(typeStatisticsList.map(x => ({ name: x.type && this.riskGrade.find(y => y.value === x.type).label, value: x.count }))).option
          this.factorOpt = new Pie(factorsStatisticsList.map(x => ({ name: x.type && ['人的因数','设备因素','环境因素','管理因素'][x.type - 1], value: x.count }))).option
          this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
        }
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
            if(item.label==='制险因素') delete item.label
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
            if(e.opta){
              e.opta.forEach(a=>{
                row[(a.prop || 'no')] = getValue(a,item[a.prop],index)
                header[(a.prop || 'no')] = a.label
              })
            }
          })
          arr.push(row)
        })
        arr.unshift(header)
        callback({ data: [...arr], title: "风险等级数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>