<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>复查验收数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="515px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            风险事件数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>复查完成情况统计</span>
                </div>
                <Charts :option="reviewOpt" style="height: 340px" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>计划类型统计</span>
                </div>
                <Charts :option="planOpt" style="height: 340px" />
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
import { Pie } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/general-services/topic/safety-review-record-statistical"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
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
      searchData:[
        {label:'检查项名称',prop:'itemName',form:'input',data:''},
        {label:'检查计划名称',prop:'planningName',form:'input',data:''},
        {label:'检查单位',prop:'isUseUnit',form:'input',data:''},
        {label:'被检查单位/企业',prop:'targetName',form:'input',data:''},
        {label:'复查完成情况',prop:'isStatus',form:'select',data:'',option:[
            {label:'已完成',value:1},
            {label:'未完成',value:2},
            {label:'整改中',value:3},
          ]
        },
        {label:'检查时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'检查项',type:'text',isShow:true,prop:'itemName'},
        {label:'检查计划名称',type:'text',isShow:true,prop:'planningName'},
        {label:'检查单位',type:'custom',isShow:true,prop:'isUseUnit',customFun:'companyShow'},
        {label:'检查类型',type:'text',isShow:true,prop:'planningType'},
        {label:'被检查单位/企业',type:'text',isShow:true,prop:'targetName'},
        {label:'复查完成情况',type:'only-num',isShow:true,prop:'isStatus',payload:[
          {value: 1, label: '已完成'},
          {value: 2, label: '未完成'},
          {value: 3, label: '整改中'}
        ]},

        {label:'检查时间',type:'text',isShow:true,prop:'actualInspectionTime'},
        {label:'危险等级',type:'boolean-only-num',isShow:true,prop:'riskLevel',payload:[
          {value: 1, label: '一般'},
          {value: 2, label: '重大'},
        ]},
        {label:'违规行为',type:'text',isShow:true,prop:'irregularities'},
        {label:'检查情况',type:'text',isShow:true,prop:'inspectSituation',},
        {label:'整改要求',type:'text',isShow:true,prop:'rectificationRequirement'},
        {label:'整改时限',type:'text',isShow:true,prop:'timeRequirement'},
        {label:'整改截止时间',type:'text',isShow:true,prop:'deadlineDate'},
        // {label:'整改责任人',type:'text',isShow:true,prop:'directorName'},
        // {label:'整改落实资金',type:'text',isShow:true,prop:'fund'},
        // {label:'整改措施',type:'text',isShow:true,prop:'improvementMeasure'},
        // {label:'应急管理措施',type:'text',isShow:true,prop:'emergencyMeasure'},
        // {label:'整改时间',type:'text',isShow:true,prop:'improvedDate'},
        {label:'提交时间',type:'text',isShow:true,prop:'updateTime'},
        {label:'复查人',type:'text',isShow:true,prop:'reviewer'},
        {label:'复查验收时间',type:'text',isShow:true,prop:'reviewDate'}
      ],
      count: undefined,
      reviewOpt: {},
      planOpt: {},
      rankOpt: {},
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
          const {
            count="0",
            departmentTypeStatisticalList = [],
            planningTypeStatisticalList = [],
            typeStatisticalList = []
          } = res.data || {}
          this.count = count
          const arr = ["reviewOpt", "planOpt"]
          arr.forEach((x) => {
            let arr = null
            if (x === "reviewOpt") {
              arr = typeStatisticalList.map(x => ({ name: (x.type || x.type === 0) && ['已完成','未完成','整改中'][x.type-1], value: x.count }))
            }
            if (x === "planOpt") {
              arr = planningTypeStatisticalList.map(x => ({ name: x.type, value: x.count }))
            }
            this[x] = new Pie(arr).option
          })
        }
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    companyShow(data){
      let json = data ? JSON.parse(data) : []
      let strArr = []
      json.forEach(item=>{
        strArr.push(item[item.length-1])
      })
      return strArr.join('、')
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
            if(e.customFun === 'companyShow'){
              row[(e.prop || 'no')] = this.companyShow(item[e.prop])
            }else{
              row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
            }
          })
          arr.push(row)
        })
        arr.unshift(header)
        callback({ data: [...arr], title: "复查验收数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
