<template>
  <div style="width: 100%;">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="576px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            <span>电站数量：<span>{{ info.count || 0 }} (个)</span></span>
            <span style="margin-left: 20%">今日总入库流量：<span>{{ info.inCount || 0 }} (个)</span></span>
            <span style="margin-left: 20%">今日总出库流量：<span>{{ info.outCount || 0 }} (个)</span></span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div class="btn-wrapper" style="margin-bottom: 10px;">
                  <el-button :type="current === 1 ? 'primary' : 'plain'" size="mini" @click="active(1)">
                    上游水位
                  </el-button>
                  <el-button :type="current === 2 ? 'primary' : 'plain'" size="mini" @click="active(2)">
                    下游水位
                  </el-button>
                  <el-button :type="current === 3 ? 'primary' : 'plain'" size="mini" @click="active(3)">
                    入库流量
                  </el-button>
                  <el-button :type="current === 4 ? 'primary' : 'plain'" size="mini" @click="active(4)">
                    出库流量
                  </el-button>
                </div>
                <Charts :option="option" />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Line } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/emergency-services/topic/navigation-avionics-statistics"
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
      current: 1,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      searchData:[
        {label:'电站',prop:'hubName',form:'input',data:''},
        {label:'日期',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'电站',type:'text',isShow:true,prop:'hubName'},
        {label:'上游水位',type:'text',isShow:true,prop:'upstreamWaterLevel'},
        {label:'下游水位',type:'text',isShow:true,prop:'downstreamWaterLevel'},
        {label:'入库流量',type:'text',isShow:true,prop:'scheduledReceipt'},
        {label:'出库流量',type:'text',isShow:true,prop:'outboundTraffic'},
        {label:'日期',type:'text',isShow:true,prop:'operationDate'}
      ],
      total: 0,
      info: {},
      screenTime: [],
      option: {},
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
            count,
            inCount,
            outCount,
            downstreamWaterLevelList = [],
            flowChartList = [],
            outboundTrafficList = [],
            timeList = [],
            upstreamWaterLevelList = []
          } = res.data || {}
          this.info = { count, inCount, outCount }
          let data = null
          switch (this.current) {
          case 1:
            data = upstreamWaterLevelList
            break
          case 2:
            data = downstreamWaterLevelList
            break
          case 3:
            data = flowChartList
            break
          case 4:
            data = outboundTrafficList
            break
          }
          this.option = new Line(data.map(x => x.name),timeList, data.map(x => ({name: x.name, data: x.dataList}))).option
        }
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    active(num, queryData) {
      this.current = num
      this.topic(queryData)
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
        callback({ data: [...arr], title: "水文气象数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
