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
            洪峰预警数量：<span>{{ info.count || 0 }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div class="btn-wrapper" style="margin-bottom: 10px;">
                  <el-button :type="current === 1 ? 'primary' : 'plain'" size="mini" @click="active(1)">
                    预报水位/流量
                  </el-button>
                  <el-button :type="current === 2 ? 'primary' : 'plain'" size="mini" @click="active(2)">
                    预计涨幅(米)
                  </el-button>
                  <el-button :type="current === 3 ? 'primary' : 'plain'" size="mini" @click="active(3)">
                    警戒水位/保证水位
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
import { MultiBar } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/emergency-services/topic/flood-forecast-statistics"
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
      searchData:[
        {label:'水文站',prop:'waterName',form:'input',data:''},
        {label:'所在水域',prop:'waters',form:'input',data:''},
        {label:'日期',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'水文站',type:'text',isShow:true,prop:'watersName'},
        {label:'所在水域',type:'text',isShow:true,prop:'waters'},
        {label:'洪峰时间',type:'text',isShow:true,prop:'floodPeakTime'},
        {label:'预报水位/流量',type:'text',isShow:true,prop:'estimatedWaterLevelFlow'},
        {label:'预计涨幅（米）',type:'text',isShow:true,prop:'isExpectedToRise'},
        {label:'警戒水位/保证水位',type:'text',isShow:true,prop:'warningWaterLevel'},
        {label:'日期',type:'text',isShow:true,prop:'operationDate'}
      ],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      info: {},
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
            count="0",
            weekDataStatisticalList = []
          } = res.data || {}
          this.info = { count }
          let data = null
          switch (this.current) {
          case 1:
            data = weekDataStatisticalList.map(x => ({name: x.typeName, data: weekDataStatisticalList.map(y => y.estimatedWaterLevelFlow)}))
            break
          case 2:
            data = weekDataStatisticalList.map(x => ({name: x.typeName, data: weekDataStatisticalList.map(y => y.isExpectedToRise)}))
            break
          case 3:
            data = weekDataStatisticalList.map(x => ({name: x.typeName, data: weekDataStatisticalList.map(y => y.warningWaterLevel)}))
            break
          default:
            data = []
            break
          }
          this.option = new MultiBar(weekDataStatisticalList.map(x => x.typeName),weekDataStatisticalList.map(x => x.timeInfo), data).option
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
