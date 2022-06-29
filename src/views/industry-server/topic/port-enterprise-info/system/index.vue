<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业制度数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="786px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            管理制度数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>制度类型统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>文件数量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属企业制度数量统计</span>
            </div>
            <Charts :option="deptOpt" :style="`height:${chartsHeight}px`" />
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
import { getTopicList, exportTopicList, getTopicStat } from '@/api/general-services/topic/regime-statistics'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import { getValue } from '@/utils/index'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    OrdinaryScreen,
    TopicTable,
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchData:[
        {label:'文件名',prop:'fileName',form:'input',data:''},
        {label:'制度类型',prop:'systemType',form:'select',data:'',
          option:[
            { value: 1, label: '人力资源管理制度' },
            { value: 2, label: '安全管理制度' },
            { value: 3, label: '财务管理制度' },
            { value: 4, label: '行政管理制度' },
            { value: 5, label: '物资管理制度' },
            { value: 6, label: '生产管理制度' },
            { value: 7, label: '销售管理制度' },
            { value: 8, label: '质量管理制度' }
          ]
        },
        {label:'所属企业',prop:'enterpriseName',form:'input',data:''},
        {label:'有效期至',prop:'screenStartTime',form:'date',data:'',format:'yyyy-MM-dd'},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'文件名',type:'text',isShow:true,prop:'fileName'},
        {label:'制度类型',isShow:true,prop:'systemType',type:'only-num',
          payload:[
            { value: 1, label: '人力资源管理制度' },
            { value: 2, label: '安全管理制度' },
            { value: 3, label: '财务管理制度' },
            { value: 4, label: '行政管理制度' },
            { value: 5, label: '物资管理制度' },
            { value: 6, label: '生产管理制度' },
            { value: 7, label: '销售管理制度' },
            { value: 8, label: '质量管理制度' }
          ]
        },
        {label:'所属企业',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'编制部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'编制负责人',type:'text',isShow:true,prop:'directorName'},
        {label:'联系电话',type:'text',isShow:true,prop:'phone'},
        {label:'有效期至',type:'text-boolean',isShow:true,prop:'expiryEndDate',payload:[
          { value: 1, label: '永久' },
        ]},
      ],
      chartsHeight:300,
      count: undefined,
      typeOpt: {},
      timeOpt: {},
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
    checkboxChange(e){
      this.checkList = e || []
    },
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
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.loading = false
        }
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        if (res.code === "0") {
          const { count="0", departmentTypeStatisticalList = [], timeStatisticList = [], typeStatisticalList = [] } = res.data || {}
          this.count = count
          let eName = []
          let eValue= []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          let type = [
            { value: 0, name: '人力资源管理制度' },
            { value: 0, name: '安全管理制度' },
            { value: 0, name: '财务管理制度' },
            { value: 0, name: '行政管理制度' },
            { value: 0, name: '物资管理制度' },
            { value: 0, name: '生产管理制度' },
            { value: 0, name: '销售管理制度' },
            { value: 0, name: '质量管理制度' }
          ]
          typeStatisticalList.forEach(item=>{
            let key = Number(item.type)
            if (0<key<9){
              type[key-1].value = item.count
            }
          })
          this.typeOpt = new Ring(type).option
          this.timeOpt = new Bar(timeStatisticList.map(x => x.year), timeStatisticList.map(x => x.count),{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},0,'数量','年份').option
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','企业').option
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
        callback({ data: [...arr], title: "港口企业制度数据" })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
