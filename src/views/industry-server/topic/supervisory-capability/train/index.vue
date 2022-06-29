<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>教育培训数据统计</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="475px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            教育培训数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>所属机构统计</span>
                </div>
                <Charts :option="planDeptOpt" style="height: 300px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>数量变化趋势</span>
                </div>
                <Charts :option="planTimeOpt" style="height: 300px;" />
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
import { Bar } from '@/utils/charts-basic-options'
import { getInTrain } from '@/api/general-services/manager-statistics/manager-statistics'
import { getTopicList, getTopicExport } from '@/api/general-services/educateTrain/management-training'
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
      
      searchData:[
        {label:'培训科目',prop:'trainSubject',form:'input',data:''},
        {label:'所属单位',prop:'departmentName',form:'input',data:''},
        {label:'填报时间',prop:'reportedTime',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'培训科目',type:'text',isShow:true,prop:'trainSubject'},
        {label:'所属单位',type:'text',isShow:true,prop:'departmentName'},
        {label:'培训方式',type:'text',isShow:true,prop:'trainModes'},
        {label:'培训学时（h）',type:'text',isShow:true,prop:'hours'},
        {label:'培训对象',type:'text',isShow:true,prop:'trainObject'},
        {label:'培训人数',type:'text',isShow:true,prop:'peopleNumber'},
        {label:'填报时间',type:'text',isShow:true,prop:'reportedTime'},
        {label:'填报人',type:'text',isShow:true,prop:'reporterPerson'},
        {label:'联系方式',type:'text',isShow:true,prop:'reporterPhone'},
        {label:'培训内容',type:'text',isShow:true,prop:'trainContent'},
        {label:'备注',type:'text',isShow:true,prop:'remark'}
      ],
      info: {},
      count: undefined,
      planDeptOpt: {}, // *适用机构统计
      planTimeOpt: {}, // *制度文件数量
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
      getInTrain(this.queryData).then(res=>{
        if (res.code === '0') {
          const { count, planningDepartmentList = [], planningTimeList = [] } = res.data || {}
          this.count = count
          this.planTimeOpt = new Bar(planningTimeList.map(x => x.type), planningTimeList.map(x => x.count)).option
          let eName = []
          let eValue= []
          planningDepartmentList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          this.planDeptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'','').option
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
      getTopicExport(queryData).then(res => {
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
        callback({ data: [...arr], title: "教育培训" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
