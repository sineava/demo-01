<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>重大危险源备案数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="797px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            备案总数：<span>{{ info.count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>备案完成率统计</span>
                </div>
                <Charts :option="perOpt" style="height: 220px" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>备案办理时间统计</span>
                </div>
                <Charts :option="timeOpt" style="height: 220px" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>近五年趋势</span>
            </div>
            <Charts :option="trendOpt" style="height: 290px" />
          </el-card>
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
import { getTopicStat, getTopicList, exportTopicList } from '@/api/port-services/topic/major-hazard-filing-statistics'
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
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchData:[
        {label:'企业名称',prop:'enterpriseName',form:'input',data:''},
        {label:'所在地市港口管理部门',prop:'organizationName',form:'input',data:''},
        {label:'审核时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'所在地市港口管理部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'重大危险源库区名称',type:'text',isShow:true,prop:'warehouseAreaName'},
        {label:'重大危险源库区所在地址',type:'text',isShow:true,prop:'warehouseAreaAddress'},
        {label:'投入使用时间',type:'text',isShow:true,prop:'useDate'},
        {label:'重大危险源级别',type:'text',isShow:true,prop:'level'},
        {label:'R值',type:'text',isShow:true,prop:'rvalue'},
        {label:'库区内构成重大危险源物质的种类、数量或者储存方式及其相关设备、设施',width:260,type:'text',isShow:true,prop:'dangerGoodsDetail'},
        {label:'是否位于化工（工业）园区内',width:200,type:'boolean-only-num',isShow:true,prop:'isInPark',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'},
        ]},
        {label:'重大危险源与周边重点防护目标最近距离情况（m）',width:250,type:'text',isShow:true,prop:'personNumber'},
        {label:'罐区边界外500m范围内人数估算值',type:'text',width:200,isShow:true,prop:'email'},
        {label:'近三年内港口危险货物事故情况',width:200,type:'text',isShow:true,prop:'accident'},
        {label:'预案评审或者论证意见',type:'text',isShow:true,prop:'reviewFile'},
        {label:'联系人',type:'text',isShow:true,prop:'contactsName'},
        {label:'联系方式',type:'text',isShow:true,prop:'contactsPhone'},
        {label:'备案日期',type:'text',isShow:true,prop:'filingDate'},
        {label:'备案有效期至',type:'text',isShow:true,prop:'validityDate'},
        {label:'附件',type:'file',isShow:true,prop:'enclosureInfo'},
        {label:'受理状态',type:'text',isShow:true,prop:'isStatus'},
        {label:'受理人',type:'text',isShow:true,prop:'acceptBy'},
        {label:'受理时间',type:'text',isShow:true,prop:'acceptDate'},
        {label:'受理意见',type:'text',isShow:true,prop:'acceptOpinion'},
        {label:'审核人',type:'text',isShow:true,prop:'reviewedBy'},
        {label:'审核时间',type:'text',isShow:true,prop:'reviewedDate'},
        {label:'审核文书',type:'file',isShow:true,prop:'reviewedFile'},
        {label:'审核意见',type:'text',isShow:true,prop:'reviewedOpinion'}
      ],
      count: undefined,
      
      perOpt: {},
      timeOpt: {},
      trendOpt: {},
      info: {
        avgTime: '',
        count: undefined
      },
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
        if (res.code === '0') {
          if (!res.data) {
            this.perOpt=new Pie().option
            this.timeOpt=new Pie().option
            this.trendOpt=new Bar().option
            this.info.count="0"
          } else {
            const {avgTime, completeEnterpriseCount, count, enterpriseCount, maxTime, minTime, timeStatisticsList = []} = res.data || {}
            this.info = {
              avgTime,
              count
            }
            const arr = ['perOpt', 'timeOpt']
            arr.forEach(x => {
              let arr = null
              if (x === 'perOpt') arr = [{ name: '完成备案企业', value: completeEnterpriseCount }, { name: '未完成备案企业', value: enterpriseCount - completeEnterpriseCount }]
              if (x === 'timeOpt') arr = [{ name: '最短受理时间', value: minTime }, { name: '最长受理时间', value: maxTime }]
              this[x] = new Pie(arr).option
            })
            this.trendOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
          }
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
        callback({ data: [...arr], title: "重大危险源备案" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
