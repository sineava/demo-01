<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>应急演练数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="738px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="topic-card">
                演练情况数量：<span>{{ info.count }}</span>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="topic-card">
                参与演练企业：<span>{{ info.organPercent }}</span>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="topic-card">
                参与演练机构：<span>{{ info.organPercent }}</span>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>年度计划</span>
                </div>
                <Charts :option="yearOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>演习类型</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>企业/行业</span>
                </div>
                <Charts :option="enOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>近五年趋势</span>
            </div>
            <Charts :option="timeOpt" style="height: 250px;" />
          </el-card>
        </el-col>
      </el-row>
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
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ring, Bar } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/emergency-services/topic/exercise-plan-statistics"
import { getValue,momentDate } from '@/utils/index'
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    pagination,
    Screen,
    TopicTable,
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
        {label:'单位名称',prop:'enterpriseName',form:'input',condition:'like',data:''},
        {label:'年度计划',prop:'planType',form:'select',condition:'eq',data:'',
          option:[
            {label:'应急演练',value:1},{label:'综合演练',value:2}
          ]
        },
        {label:'演练名称',prop:'name',form:'input',condition:'like',data:''},
        {label:'演习组织机构',prop:'actualOrganization',form:'input',condition:'like',data:''},
        {label:'演习类型',prop:'actingType',form:'input',condition:'like',data:''},
        {label:'演习类型细类',prop:'actingTypeDetailed',form:'input',condition:'like',data:''},
        {label:'填报人',prop:'actualInformant',form:'input',condition:'like',data:''},
        {label:'填报人联系电话',prop:'actualInformantPhone',form:'input',condition:'like',data:''},
        {label:'填报时间',prop:'actualFillInTime',form:'date',condition:'eq',data:''},
        {label:'开展时间',prop:'actualStartTime',form:'date',condition:'eq',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'单位名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'年度计划',type:'tag',isShow:true,prop:'planType',payload:[
          {label:'应急演练',value:1,tag:''},
          {label:'综合演练',value:2,tag:'success'}
        ]},
        {label:'演练名称',type:'text',isShow:true,prop:'name'},
        {label:'演习组织机构',type:'text',isShow:true,prop:'actualOrganization'},
        {label:'演习类型',type:'text',isShow:true,prop:'actingType'},
        {label:'演习类型细类',type:'text',isShow:true,prop:'actingTypeDetailed'},
        {label:'填报人',type:'text',isShow:true,prop:'actualInformant'},
        {label:'填报人联系电话',type:'text',isShow:true,prop:'actualInformantPhone'},
        {label:'填报时间',type:'text',isShow:true,prop:'actualFillInTime'},
        {label:'开展时间',type:'text',isShow:true,prop:'actualStartTime'},
      ],
      yearOpt: {},
      typeOpt: {},
      enOpt: {},
      timeOpt: {},
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
          const {
            count = 0,
            enterpriseCount,
            enterpriseJoinCount,
            exerciseTypeStatisticsList = [],
            industryCount,
            industryJoinCount,
            timeStatisticsList = [],
            typeStatisticsList = []
          } = res.data || {}
          this.info = {
            count,
            enPercent: `${enterpriseJoinCount || 0} / ${enterpriseCount || 0}`,
            organPercent: `${industryJoinCount || 0} / ${industryCount || 0}`
          }

          let arr = exerciseTypeStatisticsList.map(x => ({ name: x.type, value: x.count }))

          this.typeOpt = new Ring(arr).option

          let enOptSeriesArr = [
            { value: enterpriseCount || 0, name: '企业总数' },
            { value: industryCount || 0, name: '行业总数' }
          ]
          this.enOpt = new Ring(enOptSeriesArr).option
          let yearOptSeriesArr = [
            { value: 0, name: '应急演练' },
            { value: 0, name: '综合演练' }
          ]
          typeStatisticsList.forEach(item=>{
            switch (item.type){
            case 1:
              yearOptSeriesArr[0].value = item.count
              break
            default:
              yearOptSeriesArr[1].value = item.count
              break
            }
          })
          this.yearOpt = new Ring(yearOptSeriesArr).option
          let cYear = Number(momentDate(new Date(),'YYYY'))
          let timeOptXArr = [cYear-4,cYear-3,cYear-2,cYear-1,cYear]
          let timeOptSeriesArr = [0,0,0,0,0]
          timeStatisticsList.forEach(item=>{
            if (Number(item.type) === cYear - 4){
              timeOptSeriesArr[0] = item.count
            } else if (Number(item.type) === cYear - 3){
              timeOptSeriesArr[1] = item.count
            } else if (Number(item.type) === cYear - 2){
              timeOptSeriesArr[2] = item.count
            } else if (Number(item.type) === cYear - 1){
              timeOptSeriesArr[3] = item.count
            } else if (Number(item.type) === cYear){
              timeOptSeriesArr[4] = item.count
            }
          })
          this.timeOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
            top: '30',
            left: '4%',
            right: '40',
            bottom: '3%',
            containLabel: true
          },0,'应急演练数量(个)','年份').option
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
        callback({ data: [...arr], title: "应急演练" })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
