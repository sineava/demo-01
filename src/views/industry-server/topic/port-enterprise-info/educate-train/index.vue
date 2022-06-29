<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业设施设备数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="715px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="topic-card">
                <div slot="header" class="clearfix">
                  <span />
                </div>
                <p style="line-height: 165px;">教育培训数量：<span>{{ count }}</span></p>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="topic-card">
                <div slot="header" class="clearfix">
                  <span>教育培训计划变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属企业统计</span>
            </div>
            <Charts :option="deptOpt" :style="`height:${chartsHeight}px`" />
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
import { Bar, HorBar } from '@/utils/charts-basic-options'
import { momentDate,getValue } from '@/utils/index'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/general-services/topic/training-statistics'
import Charts from '@/components/Charts/index'
import DownUpload from '@/components/features/DownUpload'
import pagination from '@/components/Pagination'
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
        {label:'培训科目',prop:'trainSubjects',form:'input',data:''},
        {label:'企业名称',prop:'enterpriseName',form:'input',data:''},
        {label:'培训时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:[],format:['yyyy-MM-dd','yyyy-MM-dd 23:59:59']},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'培训科目',type:'text',isShow:true,prop:'trainSubjects'},
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'培训方式',type:'text',isShow:true,prop:'trainModes'},
        {label:'组织人',type:'text',isShow:true,prop:'organizerPerson'},
        {label:'开始培训时间',type:'text',isShow:true,prop:'trainTime'},
        {label:'培训学时（h）',type:'text',isShow:true,prop:'trainStudyHours'},
        {label:'培训对象',type:'text',isShow:true,prop:'trainObject'},
        {label:'培训人数',type:'text',isShow:true,prop:'personNumber'},
        {label:'填报人',type:'text',isShow:true,prop:'filledBy'},
        {label:'填报时间',type:'text',isShow:true,prop:'fillingTime'},
        {label:'联系方式',type:'text',isShow:true,prop:'contactNumber'},
        {label:'培训详情',type:'text',isShow:true,prop:'content'},
        {label:'备注',type:'text',isShow:true,prop:'remark'},
      ],
      count: undefined,
      chartsHeight:300,
      typeOpt: {},
      timeOpt: {},
      deptOpt: {},
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
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.loading = false
        }
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        if (res.code === "0") {
          const { count="0", departmentTypeStatisticalList = [], timeStatisticalList = [] } = res.data || {}
          let eName = []
          let eValue= []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })

          this.count = count
          this.timeOpt = new Bar(timeStatisticalList.map(x => x.year), timeStatisticalList.map(x => x.count),{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},0,'次数','年份').option
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'次数','机构').option
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
        callback({ data: [...arr], title: "港口企业教育培训数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
