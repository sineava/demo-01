<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急预案备案数据</span>
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
            备案总数：<span>{{ count }} (个)</span>
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
import { getTopicStat, getTopicList, exportTopicList } from '@/api/port-services/topic/emergency-plan-filing-statistics'
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
        {label:'企业名称',prop:'enterpriseName',form:'input',data:''},
        {label:'所在地市港口管理部门',prop:'organizationName',form:'input',data:''},
        {label:'受理时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'所在地市港口管理部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'应急预案名称',type:'text',isShow:true,prop:'planName'},
        {label:'行业类型',type:'text',isShow:true,prop:'filingDate'},
        {label:'资产总额（万）',type:'text',isShow:true,prop:'assetsTotal'},
        {label:'法定代表人',type:'text',isShow:true,prop:'legalPerson'},
        {label:'联系人',type:'text',isShow:true,prop:'contactsName'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactsPhone'},
        {label:'传真',type:'text',isShow:true,prop:'fax'},
        {label:'单位地址',type:'text',isShow:true,prop:'unitAddress'},
        {label:'电子邮箱',type:'text',isShow:true,prop:'email'},
        {label:'应急预案文件',type:'file',isShow:true,prop:'reserveFile'},
        {label:'预案评审或者论证意见',type:'file',isShow:true,prop:'reviewFile'},
        {label:'专家确认意见',type:'file',isShow:true,prop:'expertConfirm'},
        {label:'备案登记表',type:'file',isShow:true,prop:'registerTable'},
        {label:'受理人',type:'text',isShow:true,prop:'acceptBy'},
        {label:'受理时间',type:'text',isShow:true,prop:'acceptDate'},
        {label:'受理意见',type:'text',isShow:true,prop:'acceptOpinion'},
      ],
      count: undefined,
      
      perOpt: {},
      timeOpt: {},
      trendOpt: {},
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
            this.count="0"
          } else {
            const {avgTime, completeEnterpriseCount, count, enterpriseCount, maxTime, minTime, timeStatisticsList = []} = res.data || {}
            this.count=count
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
        callback({ data: [...arr], title: "应急预案备案" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
