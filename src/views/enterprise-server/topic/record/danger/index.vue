<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>重大隐患备案数据</span>
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
import { getTopicStat, getTopicList, exportTopicList } from '@/api/port-services/topic/major-threat-filing-statistics'
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
        {label:'所在地市港口管理部门',prop:'organizationName',form:'input',data:''},
        {label:'审核时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'所在地市港口管理部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'备案编号',type:'text',isShow:true,prop:'filingCode'},
        {label:'审核时间',type:'text',isShow:true,prop:'reviewedDate'},
        {label:'重大隐患名称',type:'text',isShow:true,prop:'threatName'},
        {label:'联系人',type:'text',isShow:true,prop:'contactsName'},
        {label:'联系方式',type:'text',isShow:true,prop:'contactsPhone'},
        {label:'备案日期',type:'text',isShow:true,prop:'filingDate'},
        {label:'隐患现状描述',type:'text',isShow:true,prop:'threatPresent'},
        {label:'隐患产生原因',type:'text',isShow:true,prop:'threatCauses'},
        {label:'可能导致发生的安全生产事故及后果',type:'text',isShow:true,prop:'threatConsequences'},
        {label:'整改方案或已经采取的治理措施',type:'text',isShow:true,prop:'measures'},
        {label:'治理效果和可能存在的遗留问题',type:'text',isShow:true,prop:'remainingProblems'},
        {label:'隐患整改验收情况',type:'text',isShow:true,prop:'acceptSituation'},
        {label:'责任人处理结果',type:'text',isShow:true,prop:'treatmentResults'},
        {label:'是否发生安全生产事故',type:'boolean-only-num',isShow:true,prop:'isAccident',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'},
        ]},
        {label:'审核文书',type:'file',isShow:true,prop:'reviewedFile'}
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
        if (res.code === "0") {
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
        callback({ data: [...arr], title: "重大隐患备案" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
