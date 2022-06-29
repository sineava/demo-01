<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>船舶检验信息数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="575px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            船舶检验数量：<span>{{ count }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>船检数量统计</span>
            </div>
            <Charts :option="numOpt" style="height: 400px;" />
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
import { Bar } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/water-transportation-services/topic/inspection-records"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
import { getValue } from '@/utils/index'
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
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
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      count: undefined,
      searchData:[
        {label:'检验编号',prop:'shipSurveyNo',form:'input',condition:'like',data:''},
        {label:'船名',prop:'shipName',form:'input',condition:'like',data:''},
        {label:'船舶登记号',prop:'shipRegisterNo',form:'input',condition:'like',data:''},
        {label:'检验种类',prop:'shipSurveyItemName',form:'input',condition:'like',data:''},
        {label:'检验地点',prop:'shipSurveyPlace',form:'input',condition:'like',data:''},
        {label:'检验开始日期',prop:'shipSurveyStartDate',form:'date',condition:'eq',data:''},
        {label:'检验完成日期',prop:'shipSurveyCompleteDate',form:'date',condition:'eq',data:''},
        // {label:'下次检验日期',prop:'nextInspectionDate',form:'date',condition:'eq',data:''},
        {label:'检验单位',prop:'shipSurveyOrg',form:'input',condition:'like',data:''},
        {label:'验船师',prop:'marineSurveyor',form:'input',condition:'like',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'检验编号',prop:'shipSurveyNo',type:'text',isShow:true},
        {label:'船名',prop:'shipName',type:'text',isShow:true},
        {label:'船舶登记号',prop:'shipRegisterNo',type:'text',isShow:true},
        {label:'检验种类',prop:'shipSurveyItemName',type:'text',isShow:true},
        {label:'检验地点',prop:'shipSurveyPlace',type:'text',isShow:true},
        {label:'检验开始日期',prop:'shipSurveyStartDate',type:'text',isShow:true},
        {label:'检验完成日期',prop:'shipSurveyCompleteDate',type:'text',isShow:true},
        {label:'下次检验日期',prop:'nextInspectionDate',type:'text',isShow:true},
        {label:'检验单位',prop:'shipSurveyOrg',type:'text',isShow:true},
        {label:'验船师',prop:'marineSurveyor',type:'text',isShow:true},
        {label:'证书状态',prop:'certificateStatus',type:'text',isShow:true},
      ],
      numOpt: {},
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
      getTopicList(this.queryData).then(res=>{
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        if (res.code === "0") {
          let timeOptXArr = []
          let timeOptSeriesArr = []
          let shipTypeCount = 0
          let data = []
          res.data.forEach(item=>{
            data[item.id] = data[item.id] ? data[item.id] + item.amount : item.amount
            
          })
          data.forEach((item,key)=>{
            timeOptXArr.push(`${key}年`)
            timeOptSeriesArr.push(item)
            shipTypeCount = shipTypeCount + item
          })
          this.count = shipTypeCount
          this.numOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
            top: '30px',
            left: '4%',
            right: '40px',
            bottom: timeOptXArr.length>25 ? '40px' : '20px',
            containLabel: true
          },timeOptXArr.length > 15 ? 90 : 0,'船舶数量(艘)','年份').option
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
        callback({ data: [...arr], title: "船舶检验信息数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
