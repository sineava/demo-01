<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>管理制度数据统计</span>
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
            管理制度：<span>{{ regimeCount }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>制度类型统计</span>
                </div>
                <Charts :option="regimeTypeOpt" style="height: 280px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>文件数量变化趋势</span>
                </div>
                <Charts :option="regimeTimeOpt" style="height: 280px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>适用机构统计</span>
            </div>
            <Charts :option="regimeDeptOpt" style="height: 340px;" />
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
import { Bar,Ring } from '@/utils/charts-basic-options'
import { managementRegimeStatisticalPage, exportTopicList } from '@/api/general-services/supervisory-capability/management-regime'
import { getInRegime } from '@/api/general-services/manager-statistics/manager-statistics'
import Charts from '@/components/Charts/index'
import { getValue } from '@/utils/index'
import pagination from '@/components/Pagination'
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
      searchData:[
        {label:'文件名',prop:'regimeName',form:'input',data:''},
        {label:'制度类型',prop:'regimeType',form:'input',data:''},
        {label:'适用机构',prop:'applicableAgenciesName',form:'input',data:''},
        {label:'有效期至',prop:'validityTime',form:'date',data:'', format:'yyyy-MM-dd'}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'文件名',type:'text',isShow:true,prop:'regimeName'},
        {label:'制度类型',type:'text',isShow:true,prop:'regimeType'},
        {label:'适用机构',type:'text',isShow:true,prop:'applicableAgenciesName'},
        {label:'编制部门',type:'text',isShow:true,prop:'departmentName'},
        {label:'编制负责人',type:'text',isShow:true,prop:'principal'},
        {label:'联系电话',type:'text',isShow:true,prop:'principalPhone'},
        {label:'有效期至',type:'boolean',payload:[
          {value:'',label:'永久'},
        ],isShow:true,prop:'validityTime'},
        {label:'文件页数',type:'text',isShow:true,prop:'pages'},
        {label:'编制时间',type:'text',isShow:true,prop:'createTime'},
        {label:'备注',type:'text',isShow:true,prop:'remark'},
      ],
      regimeCount: undefined,
      chartsHeight:350,
      regimeTypeOpt: {}, // *制度类型
      regimeTimeOpt: {}, // *制度文件数量
      regimeDeptOpt: {}, // *适用机构统计
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
      managementRegimeStatisticalPage(queryData).then(res=>{
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
      getInRegime(queryData).then(res=>{
        if (res.code === "0") {
          if (!res.data) {
            this.regimeTypeOpt = {}
            this.regimeTimeOpt = {}
            this.regimeDeptOpt = {}
          }
          const { regimeCount="0", regimeDepartmentList = [], regimeTimeList = [], regimeTypeList = [] } = res.data || {}
          this.regimeCount = regimeCount
          let regimeTimeData = []
          regimeTimeList.forEach(item=>{
            regimeTimeData.push({
              name:item.type,
              value:item.count
            })
          })
          let regimeTypeData = []
          regimeTypeList.forEach(item=>{
            regimeTypeData.push({
              name:item.type,
              value:item.count
            })
          })
          regimeTimeList.map(x => x.type)
          this.regimeTypeOpt = new Ring(regimeTypeData).option
          this.regimeTimeOpt = new Ring(regimeTimeData).option
          let eName = []
          let eValue= []
          regimeDepartmentList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          this.regimeDeptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
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
        callback({ data: [...arr], title: "管理制度" })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
