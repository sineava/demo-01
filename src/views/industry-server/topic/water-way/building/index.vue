<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>过江建筑物信息</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="625px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            过江建筑物总数：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col>
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>建成年份统计</span>
                </div>
                <Charts :option="timeOpt" style="height: 450px" />
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
import { getBuildingTopicList, exportBuildingTopicList, getBuildingTopicStat } from '@/api/data-management/topic/channel-building'
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
        {label:'建筑物名称',prop:'name',form:'input',data:''},
        {label:'所在航段起点名称',prop:'originName',form:'input',data:''},
        {label:'所在航段终点名称',prop:'terminusName',form:'input',data:''},
        {label:'建筑物管理单位名称',prop:'managementUnitName',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'建筑物名称',type:'text',isShow:true,prop:'name'},
        {label:'建成时间（年份）',type:'text',isShow:true,prop:'buildTime'},
        {label:'所在航段起点名称',type:'text',isShow:true,prop:'originName'},
        {label:'所在航段终点名称',type:'text',isShow:true,prop:'terminusName'},
        {label:'建筑物管理单位名称',type:'text',isShow:true,prop:'managementUnitName'},
        {label:'距航道起点里程（公里）',type:'text',isShow:true,prop:'beginFairwayMileage'},
        {label:'是否达标',type:'text',isShow:true,prop:'isStandard'},
        {label:'水上过河建筑物种类',type:'text',isShow:true,prop:'waterBuildSpeciesClass'},
        {label:'水上过河建筑物净高（米）',type:'text',isShow:true,prop:'buildingHeight'},
        {label:'水下过河建筑物种类',type:'text',isShow:true,prop:'underwaterBuildSpeciesClass'},
        {label:'水下过河建筑物顶部设置深度（米）',type:'text',isShow:true,prop:'buildingDepth'},
        {label:'是否仅在分叉辅航段上',type:'text',isShow:true,prop:'isOnlyBifurcatedAuxiliarySection'}
      ],
      count: undefined,
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
      getBuildingTopicList(this.queryData).then(res=>{
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
      getBuildingTopicStat(this.queryData).then(res=>{
        this.loading = false
        if (res.code === '0') {
          const data = res.data || []
          this.count = data.reduce((total,current) => total + current.amount || 0, 0)
          this.timeOpt = new Bar(data.map(x => x.buildTime), data.map(x => x.amount)).option
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
      exportBuildingTopicList(queryData).then(res => {
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
        callback({ data: [...arr], title: "过江建筑物信息" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
