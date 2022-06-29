<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危货建设项目基础情况信息</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="797px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            建设项目数：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>建设类别</span>
                </div>
                <Charts :option="typeOpt" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>建设性质</span>
                </div>
                <Charts :option="natureOpt" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>项目级别</span>
                </div>
                <Charts :option="levelOpt" style="height: 220px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>近五年趋势</span>
            </div>
            <Charts :option="timeOpt" style="height: 290px;" />
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
import { Ring, Bar } from '@/utils/charts-basic-options'
import { getInProject } from '@/api/port-services/construction-statistics/construction-statistics'
import { getTopicList, exportList } from '@/api/port-services/construction-dangerous-goods/construction-project'
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
      count: undefined,
      
      searchForm: {
        type: '',
        nature: '',
        portName: ''
      },
      levelOpt: {},
      natureOpt: {},
      typeOpt: {},
      timeOpt: {},
      deptOpt:{},
      searchData:[
        {label:'建设类别',prop:'type',form:'select',data:'',option:[
          { value: 1, label: '港口'},
          { value: 2, label: '航道'},
          { value: 3, label: '防波提' },
          { value: 4, label: '码头' },
          { value: 5, label: '其它' }
        ]},
        {label:'建设性质',prop:'nature',form:'select',data:'',option:[
          { value: 1, label: '改建' },
          { value: 2, label: '新建' },
          { value: 3, label: '扩建' },
          { value: 4, label: '迁建' },
          { value: 5, label: '改造' },
          { value: 6, label: '其他' }
        ]},
        {label:'所在港口名称',prop:'portName',form:'input',data:''},
        {label:'实际完工时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'项目名称',type:'text',isShow:true,prop:'projectName'},
        {label:'建设类别',type:'only-num',isShow:true,prop:'type',payload:[
          { value: 1, label: '港口'},
          { value: 2, label: '航道'},
          { value: 3, label: '防波提' },
          { value: 4, label: '码头' },
          { value: 5, label: '其它' }
        ]},
        {label:'建设性质',type:'only-num',isShow:true,prop:'nature',payload:[
          { value: 1, label: '改建' },
          { value: 2, label: '新建' },
          { value: 3, label: '扩建' },
          { value: 4, label: '迁建' },
          { value: 5, label: '改造' },
          { value: 6, label: '其他' }
        ]},
        {label:'所在港口名称',type:'text',isShow:true,prop:'portName'},
        {label:'工程地址',type:'text',isShow:true,prop:'address'},
        {label:'项目级别',type:'only-num',isShow:true,prop:'projectLevel',payload:[
          {value: 1, label: '国家重点'},
          {value: 2, label: '省重点'},
          {value: 3, label: '地市'},
          {value: 4, label: '其他'}
        ]},
        {label:'投资来源',type:'only-num',isShow:true,prop:'investmentSource',payload:[
          {value: 1, label: '中央投资'},
          {value: 2, label: '中央与地方政府合资'},
          {value: 3, label: '地方政府投资'},
          {value: 4, label: '国内企事业单位投资'},
          {value: 5, label: '港澳台及外商投资'}
        ]},
        {label:'立项部门级别',type:'text',isShow:true,prop:'departmentLevel',payload:[
          {value: 1, label: '国家级'},
          {value: 2, label: '省级'},
          {value: 3, label: '地市级'},
          {value: 4, label: '县级'}
        ]},
        {label:'计划总工期',type:'text',isShow:true,prop:'planTotalDate'},
        {label:'计划开工时间',type:'text',isShow:true,prop:'planStartDate'},
        {label:'实际开工时间',type:'text',isShow:true,prop:'actualStartDate'},
        {label:'实际完工时间',type:'text',isShow:true,prop:'actualEndDate'},
        {label:'装卸/储存主要危险货物品名',type:'text',isShow:true,prop:'mainArticleName'},
        {label:'建设项目概况',type:'text',isShow:true,prop:'generalSituation'},
        {label:'建设单位名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'统一社会信用代码',type:'text',isShow:true,prop:'certificateNo'},
        {label:'单位地址',type:'text',isShow:true,prop:'officeAddress'},
        {label:'邮政编码',type:'text',isShow:true,prop:'postalCode'},
        {label:'法定代表人',type:'text',isShow:true,prop:'legalPersonName'},
        {label:'联系人',type:'text',isShow:true,prop:'contactName'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactPhone'},
        {label:'电子邮箱',type:'text',isShow:true,prop:'email'}
      ],
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
      getInProject(this.queryData).then(res=>{
        if (res.code === "0") {
          const {count, levelStatisticsList = [], natureStatisticsList = [], timeStatisticsList = [], typeStatisticsList = []} = res.data || {}
          this.count = count
          // 类型统计
          let typeData = [
            {value:0,name:'港口'},
            {value:0,name:'航道'},
            {value:0,name:'防波提'},
            {value:0,name:'码头'},
            {value:0,name:'其它'},
          ]
          typeStatisticsList.forEach(item=>{
            typeData[item.type-1].value = item.count
          })
          this.typeOpt = new Ring(typeData).option

          let levelData = [
            {value:0,name:'国家重点'},
            {value:0,name:'省重点'},
            {value:0,name:'地市'},
            {value:0,name:'其他'},
          ]
          levelStatisticsList.forEach(item=>{
            levelData[item.type-1].value = item.count
          })
          this.levelOpt = new Ring(levelData).option

          let natureData = [
            {value:0,name:'改建'},
            {value:0,name:'新建'},
            {value:0,name:'扩建'},
            {value:0,name:'迁建'},
            {value:0,name:'改造'},
            {value:0,name:'其他'},
          ]
          natureStatisticsList.forEach(item=>{
            natureData[item.type-1].value = item.count
          })
          this.natureOpt = new Ring(natureData).option
          this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
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
      exportList(queryData).then(res => {
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
        callback({ data: [...arr], title: "危险建设项目基本数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
