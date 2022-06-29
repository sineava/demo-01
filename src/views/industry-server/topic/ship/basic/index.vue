<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>船舶基本信息数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="788px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            船舶数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>船舶种类统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>船舶状态统计</span>
                </div>
                <Charts :option="statusOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>年增长趋势</span>
            </div>
            <Charts :option="timeOpt" style="height: 300px;" />
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
import { Ring, Bar } from '@/utils/charts-basic-options'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/water-transportation-services/topic/enterprise-ship-statistics'
import Charts from '@/components/Charts/index'
import { getValue } from '@/utils/index'
import pagination from '@/components/Pagination'
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    Screen,
    TopicTable,
    pagination,
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
        {label:'中文船名',prop:'shipName',form:'input',condition:'like',data:''},
        {label:'英文船名',prop:'shipEnglishName',form:'input',condition:'like',data:''},
        {label:'船舶状态',prop:'shipStatus',form:'select',condition:'eq',data:'',
          option:[
            {label:'休眠',value:'休眠'},
            {label:'报废',value:'报废'},
            {label:'检验中',value:'检验中'},
            {label:'现有船舶',value:'现有船舶'},
            {label:'现有船',value:'现有船'},
          ]
        },
        {label:'船舶种类',prop:'shipType',form:'select',condition:'eq',data:'',
          option:[
            {label:'汽车渡驳',value:'汽车渡驳'},
            {label:'半舱货驳',value:'半舱货驳'},
            {label:'液货船',value:'液货船'},
            {label:'拖（推）船',value:'拖（推）船'},
            {label:'采砂船',value:'采砂船'},
            {label:'巡逻船',value:'巡逻船'},
            {label:'半舱货船',value:'半舱货船'},
            {label:'辅助船',value:'辅助船'},
            {label:'干货船',value:'干货船'},
            {label:'自卸砂船',value:'自卸砂船'},
            {label:'高速客船',value:'高速客船'},
            {label:'散货船',value:'散货船'},
            {label:'工程船',value:'工程船'},
            {label:'客船',value:'客船'},
            {label:'货船',value:'货船'},
            {label:'干货驳',value:'干货驳'},
            {label:'游艇（12人及以下）',value:'游艇（12人及以下）'},
            {label:'垃圾船',value:'垃圾船'},
            {label:'快艇',value:'快艇'},
            {label:'客渡驳',value:'客渡驳'},
            {label:'一般干货船',value:'一般干货船'},
            {label:'渡船',value:'渡船'},
            {label:'供应船',value:'供应船'},
            {label:'起重囤船',value:'起重囤船'},
            {label:'交通船',value:'交通船'},
            {label:'餐饮趸船',value:'餐饮趸船'},
            {label:'普通客船',value:'普通客船'},
            {label:'客渡船',value:'客渡船'},
          ]
        },
        {label:'船舶总长(米)',prop:'totalLength',form:'number',condition:'eq',data:undefined,precision:2},
        {label:'船舶型宽(米)',prop:'width',form:'number',condition:'eq',data:undefined,precision:2},
        {label:'船舶型深(米)',prop:'depth',form:'number',condition:'eq',data:undefined,precision:2},
        {label:'总吨',prop:'shipTotalTons',form:'number',condition:'eq',data:undefined,precision:3},
        {label:'净吨',prop:'netTons',form:'number',condition:'eq',data:undefined,precision:3},
        {label:'参考载重吨',prop:'netWeightTons',form:'number',condition:'eq',data:undefined,precision:3},
        {label:'主机数量',prop:'hostNum',form:'number',condition:'eq',data:undefined},
        {label:'主机功率',prop:'hostPower',form:'number',condition:'eq',data:undefined,precision:3},
        {label:'主机种类',prop:'shipEngineType',form:'input',condition:'like',data:''},
        {label:'推进器种类',prop:'shipPropellerKind',form:'input',condition:'like',data:''},
        {label:'箱位',prop:'loadingCapacity',form:'number',condition:'eq',data:undefined},
        {label:'车位',prop:'vehicleCapacity',form:'number',condition:'eq',data:undefined},
        {label:'客位',prop:'passengerQuota',form:'number',condition:'eq',data:undefined},
        {label:'船舶识别号',prop:'shipIdentifyNo',form:'input',condition:'like',data:''},
        {label:'船舶登记号',prop:'shipRegisterNo',form:'input',condition:'like',data:''},
        {label:'船检登记号',prop:'shipSurveyRegisterNo',form:'input',condition:'like',data:''},
        {label:'初次登记号',prop:'shipFirstRegisterNo',form:'input',condition:'like',data:''},
        {label:'原船舶登记号',prop:'origShipRegNo',form:'input',condition:'like',data:''},
        {label:'协助执行船舶',prop:'assistShip',form:'input',condition:'like',data:''},
        {label:'船舶呼号',prop:'shipCallSign',form:'input',condition:'like',data:''},
        {label:'IMO 编号',prop:'shipImo',form:'input',condition:'like',data:''},
        {label:'MMSI 编号',prop:'mmsi',form:'input',condition:'like',data:''},
        {label:'船籍港',prop:'registryPort',form:'input',condition:'like',data:''},
        {label:'原船籍港',prop:'origRegPortName',form:'input',condition:'like',data:''},
        {label:'原船舶登记注销日期',prop:'origDeletionDate',form:'date',condition:'eq',data:''},
        {label:'海航内河船标志',prop:'shipRegionType',form:'input',condition:'like',data:''},
        {label:'航线',prop:'shipRoute',form:'input',condition:'like',data:''},
        {label:'航区',prop:'shipSurveyArea',form:'input',condition:'like',data:''},
        {label:'船体材料',prop:'hullMaterial',form:'input',condition:'like',data:''},
        {label:'建成日期',prop:'completionDate',form:'date',condition:'eq',data:''},
        {label:'改建日期',prop:'rebuildDate',form:'date',condition:'eq',data:''},
        {label:'造船厂',prop:'shipYardCn',form:'input',condition:'like',data:''},
        {label:'造船地点',prop:'shipBuiltAddrCn',form:'input',condition:'like',data:''},
        {label:'改建船厂',prop:'conversionShipyard',form:'input',condition:'like',data:''},
        {label:'改建地点',prop:'shipRebuiltAddrCn',form:'input',condition:'like',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'中文船名',prop:'shipName',type:'text',isShow:true},
        {label:'英文船名',prop:'shipEnglishName',type:'text',isShow:true},
        {label:'船舶种类',prop:'shipType',type:'text',isShow:true},
        {label:'船舶总长(米)',prop:'totalLength',type:'text',isShow:true},
        {label:'船舶型宽(米)',prop:'width',type:'text',isShow:true},
        {label:'船舶型深(米)',prop:'depth',type:'text',isShow:true},
        {label:'总吨',prop:'shipTotalTons',type:'text',isShow:true},
        {label:'净吨',prop:'netTons',type:'text',isShow:true},
        {label:'参考载重吨',prop:'netWeightTons',type:'text',isShow:true},
        {label:'主机数量',prop:'hostNum',type:'text',isShow:true},
        {label:'主机功率',prop:'hostPower',type:'text',isShow:true},
        {label:'主机种类',prop:'shipEngineType',type:'text',isShow:true},
        {label:'推进器种类',prop:'shipPropellerKind',type:'text',isShow:true},
        {label:'推进器数量',prop:'shipPropellerNum',type:'text',isShow:true},
        {label:'箱位',prop:'loadingCapacity',type:'text',isShow:true},
        {label:'车位',prop:'vehicleCapacity',type:'text',isShow:true},
        {label:'客位',prop:'passengerQuota',type:'text',isShow:true},
        {label:'船舶状态',prop:'shipStatus',type:'text',isShow:true},
        {label:'船舶识别号',prop:'shipIdentifyNo',type:'text',isShow:true},
        {label:'船舶登记号',prop:'shipRegisterNo',type:'text',isShow:true},
        {label:'船检登记号',prop:'shipSurveyRegisterNo',type:'text',isShow:true},
        {label:'初次登记号',prop:'shipFirstRegisterNo',type:'text',isShow:true},
        {label:'原船舶登记号',prop:'origShipRegNo',type:'text',isShow:true},
        {label:'协助执行船舶',prop:'assistShip',type:'text',isShow:true},
        {label:'船舶呼号',prop:'shipCallSign',type:'text',isShow:true},
        {label:'IMO 编号',prop:'shipImo',type:'text',isShow:true},
        {label:'MMSI 编号',prop:'mmsi',type:'text',isShow:true},
        {label:'船籍港',prop:'registryPort',type:'text',isShow:true},
        {label:'原船籍港',prop:'origRegPortName',type:'text',isShow:true},
        {label:'海航内河船标志',prop:'shipRegionType',type:'text',isShow:true},
        {label:'航线',prop:'shipRoute',type:'text',isShow:true},
        {label:'航区',prop:'shipSurveyArea',type:'text',isShow:true},
        {label:'船体材料',prop:'hullMaterial',type:'text',isShow:true},
        {label:'船舶价值',prop:'shipValue',type:'text',isShow:true},
        {label:'建成日期',prop:'completionDate',type:'text',isShow:true},
        {label:'改建日期',prop:'rebuildDate',type:'text',isShow:true},
        {label:'造船厂',prop:'shipYardCn',type:'text',isShow:true},
        {label:'造船地点',prop:'shipBuiltAddrCn',type:'text',isShow:true},
        {label:'改建船厂',prop:'conversionShipyard',type:'text',isShow:true},
        {label:'改建地点',prop:'shipRebuiltAddrCn',type:'text',isShow:true},
        {label:'休眠标志',prop:'hibernateFlag',type:'text',isShow:true},
        {label:'休眠理由(若船舶已休眠)',prop:'hibernateRemark',type:'text',isShow:true},
        {label:'备注',prop:'remark',type:'text',isShow:true},
      ],
      typeOpt: {},
      statusOpt: {},
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
        if (res.code === '0') {
          const {
            count="0",
            shipStateList = [],
            shipTypeList = [],
            timeStatisticsList = []
          } = res.data || {}
          this.count = count
          const arr = ['typeOpt', 'statusOpt']
          arr.forEach(x => {
            let data = null
            if (x === 'typeOpt') data = shipTypeList.map(x => ({ name: x.type, value: x.count }))
            if (x === 'statusOpt') data = shipStateList.map(x => ({ name: x.type, value: x.count }))
            this[x] = new Ring(data).option
          })
          let timeOptXArr = []
          let timeOptSeriesArr = []
          let timeArr = []
          timeStatisticsList.forEach(item=>{
            timeArr[item.time] = {time:item.time,count:(timeArr[item.time] ? timeArr[item.time].count : 0) + item.count}
          })
          timeArr.sort()
          timeArr.forEach(item=>{
            timeOptXArr.push(item.time)
            timeOptSeriesArr.push(item.count)
          })
          this.timeOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
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
        callback({ data: [...arr], title: "船舶基本信息" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
