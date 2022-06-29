<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>应急预案数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="738px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            预案数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>预案类型</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>响应级别</span>
                </div>
                <Charts :option="levelOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>近五年趋势</span>
            </div>
            <Charts :option="timeOpt" style="height: 250px;" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <TopicTable ref="topicTable" :tableData="list" :options="options" />
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
import { Ring, Bar } from '@/utils/charts-basic-options'
import { getValue,momentDate } from "@/utils/index"
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
import {
  getTopicList,
  exportList,
  getTopicPlan
} from "@/api/emergency-services/topic/emergency-statistics"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
export default {
  components: {
    Charts,
    pagination,
    Screen,
    TopicTable
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      info: {},
      count: undefined,
      queryData:{},
      typeOpt: {},
      levelOpt: {},
      timeOpt: {},
      searchData:[
        {label:'预案类型',prop:'type',form:'select',condition:'eq',data:'',
          option:[
            {label:'综合预案',value:1},{label:'专项预案',value:2}
          ]
        },
        {label:'预案名称',prop:'name',form:'input',condition:'like',data:''},
        {label:'响应级别',prop:'responseLevel',form:'select',condition:'eq',data:'',
          option:[
            {label:'省级',value:1},{label:'市级',value:2},{label:'县级',value:3},{label:'企业级',value:4},{label:'其他',value:9}
          ]
        },
        {label:'编制单位',prop:'enterpriseName',form:'input',condition:'like',data:''},
        {label:'应急通讯对象',prop:'emergencyCommunicationObject',form:'input',condition:'like',data:''},
        {label:'更新时间',prop:['screenStartTime','screenEndTime'],form:'daterange',condition:'eq',data:'',format:['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']},
        {label:'联系人',prop:'contact',form:'input',condition:'like',data:''},
        {label:'联系电话',prop:'contactPhone',form:'input',condition:'like',data:''},
        {label:'发布状态',prop:'state',form:'select',condition:'eq',data:'',
          option:[
            {label:'未发布',value:1},{label:'已发布',value:2}
          ]
        },
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'预案名称',type:'text',isShow:true,prop:'name'},
        {label:'预案类型',type:'only-num',isShow:true,prop:'type',payload:[
          {label:'综合预案',value:1},
          {label:'专项预案',value:2}
        ]},
        {label:'响应级别',type:'only-num',isShow:true,prop:'responseLevel',payload:[
          {label:'省级',value:1},{label:'市级',value:2},{label:'县级',value:3},{label:'企业级',value:4},{label:'其他',value:9}
        ]},
        {label:'编制单位',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'应急通讯对象',type:'text',isShow:true,prop:'emergencyCommunicationObject'},
        {label:'联系人',type:'text',isShow:true,prop:'contact'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactPhone'},
        // {label:'联系电话',type:'text',isShow:true,prop:'phone'},
        {label:'更新时间',type:'text',isShow:true,prop:'updateTime'},
        {label:'发布状态',type:'tag',isShow:true,prop:'state',payload:[
          {label:'未发布',value:1,tag:''},{label:'已发布',value:2,tag:'success'}
        ]},
        {label:'应急处置流程',type:'text',isShow:true,prop:'emergencyDisposalProcess'},
        {label:'应急预案文件',type:'file',isShow:true,prop:'filePath'},
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
      this.fetchData(queryData)
      this.topicAeg(queryData)
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
    topicAeg(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicPlan(this.queryData).then(res=>{
        if (res.code === "0") {
          this.count = res.data?.count || 0
          let levelOptSeriesArr = [
            { value: 0, name: '省级' },
            { value: 0, name: '市级' },
            { value: 0, name: '县级' },
            { value: 0, name: '企业级' },
            { value: 0, name: '其他' },
          ]
          if (res.data && res.data.levelStatisticsList){
            res.data.levelStatisticsList.forEach(item=>{
              switch (item.type){
              case 1:
                levelOptSeriesArr[0].value = item.count
                break
              case 2:
                levelOptSeriesArr[1].value = item.count
                break
              case 3:
                levelOptSeriesArr[2].value = item.count
                break
              case 4:
                levelOptSeriesArr[3].value = item.count
                break
              default:
                levelOptSeriesArr[4].value = item.count
                break
              }
            })
          }
          this.levelOpt = new Ring(levelOptSeriesArr).option
          let typeOptSeriesArr = [
            { value: 0, name: '综合预案' },
            { value: 0, name: '专项预案' }
          ]
          if (res.data && res.data.typeStatisticsList){
            res.data.typeStatisticsList.forEach(item=>{
              switch (item.type){
              case 1:
                typeOptSeriesArr[0].value = item.count
                break
              default:
                typeOptSeriesArr[1].value = item.count
                break
              }
            })
          }
          this.typeOpt = new Ring(typeOptSeriesArr).option
          let cYear = Number(momentDate(new Date(),'YYYY'))
          let timeOptXArr = [cYear-4,cYear-3,cYear-2,cYear-1,cYear]
          let timeOptSeriesArr = [0,0,0,0,0]
          if (res.data && res.data.timeStatisticsList){
            res.data.timeStatisticsList.forEach(item=>{
              if (Number(item.type) === cYear - 4){
                timeOptSeriesArr[0] = item.count
              } else if (Number(item.type) === cYear - 3){
                timeOptSeriesArr[1] = item.count
              } else if (Number(item.type) === cYear - 2){
                timeOptSeriesArr[2] = item.count
              } else if (Number(item.type) === cYear - 1){
                timeOptSeriesArr[3] = item.count
              } else if (Number(item.type) === cYear){
                timeOptSeriesArr[4] = item.count
              }
            })
          }
          this.timeOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
            top: '30',
            left: '4%',
            right: '40',
            bottom: '3%',
            containLabel: true
          },0,'预案数量(个)','年份').option
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
      exportList(queryData).then(res => {
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
        callback({ data: [...arr], title: "应急预案" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>

