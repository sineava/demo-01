<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>码头泊位类型数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="497px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            泊位数：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>结构形式</span>
                </div>
                <Charts :option="structureOpt" style="height: 320px" />
              </el-card>
            </el-col>
            <el-col :span="16">
              <el-card class="card-m">
                <!-- <div slot="header" class="clearfix">
                  <span>专业化泊位分类</span>
                </div>
                <Charts :option="pierOpt" style="height: 220px" /> -->
                <div slot="header" class="clearfix">
                  <span>所在港区分类统计</span>
                </div>
                <Charts :option="deptOpt" style="height: 320px" />
              </el-card>
            </el-col>
          </el-row>
          <!-- <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所在港区分类统计</span>
            </div>
            <Charts :option="deptOpt" style="height: 290px" />
          </el-card> -->
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
import { getTopicStat, getTopicList, exportTopicList } from '@/api/port-services/topic/port-berth-statistics'
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
      count: undefined,
      
      searchData:[
        {label:'泊位名称',prop:'berthName',form:'input',data:''},
        {label:'所在码头',prop:'portName',form:'input',data:''},
        {label:'所属企业',prop:'operatingEnterprise',form:'input',data:''},
        {label:'结构形式',prop:'structuralStyle',form:'input',data:''},
        {label:'主要用途',prop:'mainUses',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'泊位名称',type:'text',isShow:true,prop:'berthName'},
        {label:'所在码头',type:'text',isShow:true,prop:'wharfName'},
        {label:'所属企业',type:'text',isShow:true,prop:'operatingEnterprise'},
        {label:'结构形式',type:'text',isShow:true,prop:'structuralStyle'},
        {label:'主要用途',type:'text',isShow:true,prop:'mainUses'},
        // {label:'专业化泊位分类',type:'only-num',isShow:true,prop:'serviceType',payload:[
        //   {value: 1, label: '集装箱'},
        //   {value: 2, label: '煤炭'},
        //   {value: 3, label: '金属矿石'},
        //   {value: 4, label: '原油'},
        //   {value: 5, label: '成品油'},
        //   {value: 6, label: '液体化工'},
        //   {value: 7, label: '液化天然气'},
        //   {value: 8, label: '液化石油气'},
        //   {value: 9, label: '散装粮食'},
        //   {value: 10, label: '散装水泥'},
        //   {value: 11, label: '客运'},
        //   {value: 12, label: '滚装'}
        // ]},
        {label:'竣工验收日期',type:'text',isShow:true,prop:'acceptanceDate'},
        {label:'核查靠泊能力（吨）',type:'text',isShow:true,prop:'checkBerthingCapability'}
      ],
      structureOpt: {},
      pierOpt: {},
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
        if (!res.data){
          this.structureOpt=new Pie().option
          this.timepierOptOpt=new Pie().option
          this.deptOpt=new HorBar().option
          this.count="0"
        } else {
          const {count, departmentStatistics = [], typeStatisticsList = [], typeStringStatisticsList = []} = res.data || {}
          this.count = count
          const arr = ['structureOpt', 'pierOpt']
          arr.forEach(x => {
            let arr = null
            if (x === 'structureOpt') arr = typeStringStatisticsList.map(x => ({ name: x.type, value: x.count }))
            if (x === 'pierOpt') arr = typeStatisticsList.map(x => ({ name: ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'][x.type-1], value: x.count }))
            this[x] = new Pie(arr).option
          })
          let eName = []
          let eValue = []
          departmentStatistics.forEach(item=>{
            eName.push(item.departmentName)
            eValue.push(item.count)
          })
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
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
        callback({ data: [...arr], title: "码头泊位类型数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
