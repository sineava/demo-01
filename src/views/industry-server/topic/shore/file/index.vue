<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>规划文件数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="907px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            规划岸线：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>利用情况统计</span>
                </div>
                <Charts :option="useOpt" style="height: 280px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>规划岸线数量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 280px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所在港区分类统计</span>
            </div>
            <Charts :option="deptOpt" style="height: 340px;" />
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
import { Pie, Bar, HorBar } from '@/utils/charts-basic-options'
import { shoreLine } from '@/utils/public-fields'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/port-services/topic/coastline-planning-statistics'
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
  mixins: [shoreLine], // *包含字段[channel]
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchData:[
        {label:'规划岸线名称',prop:'coastlineName',form:'input',data:''},
        {label:'所在港口名称',prop:'portName',form:'input',data:''},
        {label:'所在港区名称',prop:'portAreaName',form:'input',data:''},
        {label:'利用状况',prop:'utilizationStatus',form:'input',data:''},
        {label:'规划用途',prop:'planningPurposes',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'规划岸线名称',type:'text',isShow:true,prop:'coastlineName'},
        {label:'所在港口名称',type:'text',isShow:true,prop:'portName'},
        {label:'所在港区名称',type:'text',isShow:true,prop:'portAreaName'},
        {label:'所在航道',type:'text',isShow:true,prop:'channel'},
        {label:'岸线起迄点（千米）',type:'text',isShow:true,prop:'coastLinePoint'},
        {label:'岸别',type:'boolean-only-num',isShow:true,prop:'principalPhone',payload:[
          {value: 1, label: '左'},
          {value: 2, label: '右'}
        ]},
        {label:'合计',type:'text',isShow:true,prop:'totalLength'},
        {label:'已开发利用',type:'text',isShow:true,prop:'usingLength'},
        {label:'规划利用',type:'text',isShow:true,prop:'planningLength'},
        {label:'利用状况',type:'text',isShow:true,prop:'utilizationStatus'},
        {label:'规划用途',type:'text',isShow:true,prop:'planningPurposes'},
        {label:'备注',type:'text',isShow:true,prop:'remarks'}
      ],
      count: undefined,
      useOpt: {},
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
          const { count="0", departmentStatisticsList = [], timeStatisticsList = [], typeStatisticsList = [] } = res.data || {}
          this.count = count
          this.useOpt = new Pie(typeStatisticsList.map(x => ({ value: x.count, name: x.type }))).option
          this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
          let eName = []
          let eValue = []
          departmentStatisticsList.forEach(item=>{
            eName.push(item.departmentName)
            eValue.push(item.count)
          })
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
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
        callback({ data: [...arr], title: "规划文件" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
