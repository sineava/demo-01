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
            height="797px"
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
                <Charts :option="reviewOpt" style="height: 220px" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>检查项类型统计</span>
                </div>
                <Charts :option="planOpt" style="height: 220px" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>企业/单位检查问题排行(前50)</span>
            </div>
            <Charts :option="rankOpt" style="height: 290px" />
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
            {label:'已完成',value:0},
            {label:'未完成',value:1},
            {label:'整改中',value:2},
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
        {label:'复查机构名称',type:'text',isShow:true,prop:'organizationName'},
        {label:'复查时间',type:'text',isShow:true,prop:'reviewTime'},
        {label:'复查人',type:'text',isShow:true,prop:'reviewer'},
        {label:'复查验收时间',type:'text',isShow:true,prop:'reviewDate'},
        {label:'复查意见',type:'text',isShow:true,prop:'opinion'}
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
          let eName = []
          let eValue = []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          this.rankOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
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
            if (item.file !=='file' && e.isShow){
              if(e.customFun === 'companyShow'){
                row[(e.prop || 'no')] = this.companyShow(item[e.prop])
              }else{
                row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
              }
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
