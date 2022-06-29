<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全设施设计审查信息</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="475px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            安全条件审查数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="10">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>近五年趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 300px;" />
              </el-card>
            </el-col>
            <el-col :span="14">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>所在港区分类统计</span>
                </div>
                <Charts :option="deptOpt" style="height: 300px;" />
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
import { Bar, HorBar } from '@/utils/charts-basic-options'
import { getInDesign } from '@/api/port-services/construction-statistics/construction-statistics'
import { getTopicList, exportTopicList } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
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
      
      info: {},
      count: undefined,
      searchData:[
        {label:'项目名称',prop:'projectName',form:'input',data:''},
        {label:'申请单位名称',prop:'enterpriseName',form:'input',data:''},
        {label:'所在地港航管理部门',prop:'departmentName',form:'input',data:''},
        {label:'审查申请时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'项目名称',type:'text',isShow:true,prop:'projectName'},
        {label:'审批状态',type:'tag',isShow:true,prop:'reviewState',payload:[
          {value:1,label:'已受理',tag:''},
          {value:2,label:'审核中',tag:'warning'},
          {value:3,label:'审核通过',tag:'success'},
          {value:4,label:'退回',tag:'danger'},
        ]},
        {label:'申请单位名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'所在地市港口管理部门',type:'text',isShow:true,prop:'departmentName'},
        {label:'负责人',type:'text',isShow:true,prop:'declarePrincipal'},
        {label:'联系电话',type:'text',isShow:true,prop:'declarePhone'},
        {label:'审查申请时间',type:'text',isShow:true,prop:'applyTime'},
        {label:'申请原因',type:'text',isShow:true,prop:'applyReason'},
        {label:'受理意见',type:'text',isShow:true,prop:'acceptOpinion'},
        {label:'建设项目安全设施设计专篇文件附件',type:'file',isShow:true,prop:'filePathE'},
        {label:'选址意见书附件',type:'file',isShow:true,prop:'filePathC'},
        {label:'当地公安机关消防机构的消防设计审查文件附件',type:'file',isShow:true,prop:'filePathD'},
        {label:'安全设施设计审查意见书附件',type:'file',isShow:true,prop:'filePathA'}
      ],
      deptOpt: {}, // *所在港区分类统计
      timeOpt: {}, // *时间趋势
      reviewResult: [
        { value: 3, label: '通过' },
        { value: 4, label: '未通过' }
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
      getInDesign(this.queryData).then(res=>{
        if (res.code === '0') {
          if (!res.data){
            this.timeOpt = new Bar().option
            this.deptOpt = new HorBar().option
            this.count=0
          } else {
            const { count, departmentStatisticsList = [], timeStatisticsList = [] } = res.data || {}
            this.count = count
            this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
            let eName = []
            let eValue= []
            departmentStatisticsList.forEach(item=>{
              eName.push(item.departmentName)
              eValue.push(item.count)
            })
            this.deptOpt = new Bar(eName, eValue,{top: '30px',left: '20px',right: '65px',bottom: eName.length>25 ? '40px' : '30px',containLabel: true},eName.length>10?90:0,'','').option
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
        callback({ data: [...arr], title: "安全设施设计调查" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>

