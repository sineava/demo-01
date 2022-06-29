<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>隐患类型数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="476px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            隐患数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>检查类型统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 300px" />
              </el-card>
            </el-col>
            <!-- <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>企业/单位检查问题排行(前50)</span>
                </div>
                <Charts :option="rankOpt" style="height: 300px" />
              </el-card>
            </el-col> -->
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
import { Pie, HorBar } from '@/utils/charts-basic-options'
import {
  getHdTopicList,
  exportHdTopicList,
  getHdTopicStat
} from "@/api/general-services/topic/hidden-danger-statistics"
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
        {label:'发布单位',prop:'isUseUnit',form:'input',data:''},
        {label:'被检查单位/企业',prop:'targetName',form:'input',data:''},
        {label:'检查时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'检查项',type:'text',isShow:true,prop:'itemName'},
        // {label:'检查项分类',type:'text',isShow:true,prop:'itemType'},
        {label:'检查计划名称',type:'text',isShow:true,prop:'planningName'},
        {label:'被检查企业/单位',type:'text',isShow:true,prop:'targetName'},
        {label:'计划检查时间',type:'text',isShow:true,prop:'planningTime'},
        {label:'发布单位',type:'custom',isShow:true,prop:'isUseUnit',customFun:'companyShow'},
        {label:'存在问题',type:'only-num',isShow:true,prop:'isProblem',payload: [
          {value:0,label:'检查正常'},
          {value:1,label:'存在问题'},
          {value:2,label:'存在隐患'}
        ]},
        {label:'违规行为',type:'boolean-only-num',isShow:true,prop:'irregularities',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'}
        ]},
        {label:'是否需要整改',type:'boolean-only-num',isShow:true,prop:'isRectification',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'}
        ]},
        {label:'整改时限',type:'text',isShow:true,prop:'timeRequirement'},
        {label:'整改截止时间',type:'text',isShow:true,prop:'deadlineDate'},
        {label:'是否需要复查',type:'boolean-only-num',isShow:true,prop:'isReview',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'}
        ]},
        {label:'复查部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'整改状态',type:'boolean-only-num',isShow:true,prop:'isStatus',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'}
        ]},
        {label:'整改责任人',type:'text',isShow:true,prop:'directorName'},
        {label:'整改落实资金',type:'text',isShow:true,prop:'fund'},
        {label:'建筑物管理单位名称',type:'text',isShow:true,prop:'improvementMeasure'}
      ],
      count: undefined,
      typeOpt: {},
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
      getHdTopicList(this.queryData).then(res=>{
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
      getHdTopicStat(this.queryData).then(res=>{
        this.loading = false
        if (res.code === "0") {
          const {
            hiddenDangerItemVoList = [],
            hiddenDangerNum="0",
            hiddenDangerUnitVoList = []
          } = res.data || {}
          this.count = hiddenDangerNum
          this.typeOpt = new Pie(hiddenDangerItemVoList.map(x => ({ name: x.itemCategoryName, value: x.hiddenDangerNum }))).option
          // this.rankOpt = new HorBar(hiddenDangerUnitVoList.map((x) => x.targetName), hiddenDangerUnitVoList.map((x) => x.hiddenDangerNum)).option
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
      exportHdTopicList(queryData).then(res => {
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
        callback({ data: [...arr], title: "隐患类型数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
