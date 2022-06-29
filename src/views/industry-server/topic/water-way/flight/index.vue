<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>航段信息数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="426px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            航段总数：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>航段现状技术等级</span>
                </div>
                <Charts :option="currentOpt" style="height: 250px" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>航段定级技术等级</span>
                </div>
                <Charts :option="levelOpt" style="height: 250px" />
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
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie } from '@/utils/charts-basic-options'
import { getFlightTopicList, exportFlightTopicList, getFlightTopicStat } from '@/api/data-management/topic/channel-building'
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
      info: {},
      searchData:[
        {label:'航段名称',prop:'name',form:'input',data:''},
        {label:'航段所在行政区划',prop:'administrativeDivision',form:'input',data:''},
        {label:'航段现状技术等级',prop:'currentTechnicalGrade',form:'input',data:''},
        {label:'航道定级技术等级',prop:'scoreTechnicalGrade',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'航段名称',type:'text',isShow:true,prop:'name'},
        {label:'航段所在行政区划',type:'text',isShow:true,prop:'administrativeDivision'},
        {label:'起点名称',type:'text',isShow:true,prop:'originName'},
        {label:'航段起点距航道点里程（公里）',type:'text',isShow:true,prop:'originTerminusMiles'},
        {label:'起点是否为主控点',type:'text',isShow:true,prop:'originIsMasteer'},
        {label:'起点是否为分界点',type:'text',isShow:true,prop:'originIsDemarcationPoint'},
        {label:'起点分界点类别',type:'text',isShow:true,prop:'originDemarcationType'},
        {label:'终点名称',type:'text',isShow:true,prop:'terminusName'},
        {label:'航段终点距航道起点里程',type:'text',isShow:true,prop:'terminusOriginMiles'},
        {label:'终点是否为主控点',type:'text',isShow:true,prop:'terminusIsMasteer'},
        {label:'终点是否为分界点',type:'text',isShow:true,prop:'terminusIsDemarcationPoint'},
        {label:'终点分界点类别',type:'text',isShow:true,prop:'terminusDemarcationType'},
        {label:'是否为界河航段',type:'text',isShow:true,prop:'isBoundaryRiver'},
        {label:'是否有分叉辅航段',type:'text',isShow:true,prop:'haveBifurcateAuxiliarySegment'},
        {label:'是否有瓶颈曲段',type:'text',isShow:true,prop:'haveBottleneckSection'},
        {label:'是否有主要浅滩',type:'text',isShow:true,prop:'haveMasterShoal'},
        {label:'是否为重复航段',type:'text',isShow:true,prop:'haveRepeatSegment'},
        {label:'航段里程（公里）',type:'text',isShow:true,prop:'segmentMileage'},
        {label:'航道水深（米）',type:'text',isShow:true,prop:'fairwayDepth'},
        {label:'航道宽度（米）',type:'text',isShow:true,prop:'courseWidth'},
        {label:'航道最小弯曲半径（米）',type:'text',isShow:true,prop:'minBendRadius'},
        {label:'航段现状技术等级',type:'text',isShow:true,prop:'currentTechnicalGrade'},
        {label:'航段定级技术等级',type:'text',isShow:true,prop:'scoreTechnicalGrade'}
      ],
      count: undefined,
      currentOpt: {},
      levelOpt: {},
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
      getFlightTopicList(this.queryData).then(res=>{
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
      getFlightTopicStat(this.queryData).then(res=>{
        if (res.code === '0') {
          const {currentTechnicalGrade = [], scoreTechnicalGrade} = res.data || {}
          this.count = currentTechnicalGrade.reduce((total,current) => total + current.amount || 0, 0)
          const arr = ['currentOpt', 'levelOpt']
          arr.forEach(x => {
            let arr = null
            if (x === 'currentOpt') arr = currentTechnicalGrade.map(x => ({ name: x.type, value: x.amount }))
            if (x === 'levelOpt') arr = scoreTechnicalGrade.map(x => ({ name: x.type, value: x.amount }))
            this[x] = new Pie(arr).option
          })
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
      exportFlightTopicList(queryData).then(res => {
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
        callback({ data: [...arr], title: "航段信息数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
