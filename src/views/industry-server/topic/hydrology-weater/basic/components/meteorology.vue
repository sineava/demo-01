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
            气象信息数量：<span>{{ count || 0 }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>最高温度变化趋势</span>
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
import { SmoothLine } from '@/utils/charts-basic-options'
import {
  getAreaList,
  exportWeatherAreaList,
  getStatPageList,
  getStatWeather
} from "@/api/emergency-services/weather"
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
      count: undefined,
      searchData:[
        {label:'区域',prop:'cityId',form:'select',data:'',option: []},
        {label:'日期',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'日期',type:'text',isShow:true,prop:'date'},
        {label:'区域',type:'text',isShow:true,prop:'name'},
        {label:'日出时间',type:'text',isShow:true,prop:'sunrise'},
        {label:'日落时间',type:'text',isShow:true,prop:'sunset'},
        {label:'最高温度（℃）',type:'text',isShow:true,prop:'tempMax'},
        {label:'最低温度（℃）',type:'text',isShow:true,prop:'tempMin'},
        {label:'总降水量（mm）',type:'text',isShow:true,prop:'precipitation'}
      ],
      searchForm: {
        cityId: 0
      },
      option: {},
      citys: [],
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  async created() {
    this.bRoles = this.button_roles
    await this.init()
    await this.fetchArea()
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
      getStatPageList(this.queryData).then(res=>{
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
      getStatWeather(this.queryData).then(res=>{
        if (res.code === "0") {
          let {
            weatherNum="0",
            weatherListVoList = []
          } = res.data || {}
            weatherListVoList = weatherListVoList.reverse()
            this.count = weatherNum
            this.option = new SmoothLine(weatherListVoList.map(x => x.date), weatherListVoList.map(x => x.tempMax)).option
        }
      })
    },
    // 查询区域列表
    async fetchArea() {
      this.citys = (await getAreaList()).data
      this.citys.forEach(x => {
        if (x.name === '重庆市') {
          this.searchForm.cityId = x.id
        }
      })
      this.searchData[0].option = this.citys
      this.searchData[0].option.map(item => {
        item.value = item.id
        item.label = item.name
        return item
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
      exportWeatherAreaList(queryData).then(res => {
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
