<template>
  <div style="width: 100%;">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="5">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="576px"
            @fetchData="fetchList"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="19">
          <el-card class="topic-card">
            <span>水文站点数：<span>{{ info.count || 0 }} (个)</span></span>
            <span style="margin-left: 20%">涨幅站点数：<span>{{ info.roseCount || 0 }} (个)</span></span>
            <span style="margin-left: 20%">降幅站点数：<span>{{ info.fallCount || 0 }} (个)</span></span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>涨幅趋势</span>
                  <el-date-picker
                    style="float:right;margin-top:10px"
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="topic($event, 'range')"
                  />
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
      :current-page="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      background
      @change="paginationChange"
    />
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { mapGetters } from 'vuex'
import { Line } from '@/utils/charts-basic-options'
import {
  exportTopicList,
  getTopicStat,
  getStatic
} from "@/api/emergency-services/topic/water-statistics"
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
      date: null,
      list: [],
      listLoading: true,
      pageNum: 1,
      pageSize: 20,
      total: 0,   
      info: {
        count: undefined,
        roseCount: undefined,
        fallCount: undefined
      },
      searchData:[
        {label:'日期',prop:'time',form:'date',data:''}
      ],
      options:[],
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
      this.topic(queryData)
      this.fetchList(queryData)
    },
    async fetchList(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      this.currentPage = 1
      const queryInfo = {
        ...this.queryData,
        isPage: true,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const { records, total } = (await getStatic(queryInfo))?.data || {}
      const list = this.handleData(records || [])
      const data = list[0] // 后端数据有点怪异
      this.options = list.length > 0 ? Object.keys(data).map(x => {
        const obj = {
          type: 'text',
          isShow:true,
          prop: x
        }
        if (x === 'date') {
          obj.label = '日期'
          obj.width = '100px'
        } else {
          obj.label = data[x].split(',')[0]
        }
        return obj
      }) : []
      this.total = total || 0
      this.list = list.map(x => {
        const obj = {}
        Object.keys(x).forEach(k => {
          if (k === 'date') {
            obj[k] = x[k]
          } else {
            obj[k] = x[k].split(',')[1]
          }
        })
        return obj
      })
    },
    handleData(list) {
      return list.map(x => {
        const obj = { date: x.time }
        Object.keys(x).map(k => {
          const info = x[k]
          if (info?.watersId) obj[`key${info?.watersId}`] = `${info?.watersName},${info.waterLevel}`
        })
        return obj
      }).flat()
    },
    topic(){
      const [screenStartTime, screenEndTime] = this.date || []
      getTopicStat({ screenStartTime: momentDate(screenStartTime), screenEndTime: momentDate(screenEndTime)}).then(res=>{
        if (res.code === "0") {
          const {
            count,
            fallCount,
            roseCount,
            timeList = [],
            stackedLineChartList = []
          } = res.data || {}
          this.info = { count, roseCount, fallCount }
          this.option = new Line(stackedLineChartList.map(x => x.name),timeList, stackedLineChartList.map(x => ({name: x.name, data: x.dataList}))).option
        }
      })
    },
    paginationChange({ currentPage, pageSize }) {
      this.pageNum = currentPage
      this.pageSize = pageSize
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
        callback({ data: [...arr], title: "通航水域数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
