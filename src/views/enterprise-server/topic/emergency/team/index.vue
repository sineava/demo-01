<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>应急队伍管理</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="807px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="topic-card">
                队伍数量：<span>{{ info.teamCount }}</span>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="topic-card">
                总人数：<span>{{ info.organPercent }}</span>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>配置应急队伍的港航机关</span>
                </div>
                <Charts :option="organOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>配置应急队伍的企业</span>
                </div>
                <Charts :option="enOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>队伍人数统计</span>
            </div>
            <Charts :option="teamOpt" :style="`height:${chartsHeight}px`" />
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
import { Pie, Bar } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/emergency-services/topic/team-statistics"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
import { getValue } from "@/utils/index"
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    pagination,
    Screen,
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
      chartsHeight:300,
      searchData:[
        {label:'队伍名称',prop:'name',form:'input',condition:'like',data:''},
        {label:'机构名称',prop:'orgName',form:'input',condition:'like',data:''},
        // {label:'所属单位',prop:'enterpriseName',form:'input',condition:'like',data:''},
        {label:'级别',prop:'level',form:'input',condition:'like',data:''},
        {label:'负责人',prop:'principal',form:'input',condition:'like',data:''},
        {label:'负责人电话',prop:'principalPhone',form:'input',condition:'like',data:''},
        {label:'总人数',prop:'personCount',form:'number',condition:'eq',data:undefined},
        {label:'地址',prop:'address',form:'input',condition:'like',data:''},
        {label:'提交时间',prop:'createTime',form:'date',condition:'ge',data:'',conditionOpt:['ge','le','lt','gt']},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'机构名称',type:'text',isShow:true,prop:'organizationName'},
        {label:'应急队伍名称',type:'text',isShow:true,prop:'name'},
        {label:'应急所属单位',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'级别',type:'text',isShow:true,prop:'level'},
        {label:'负责人',type:'text',isShow:true,prop:'principal'},
        {label:'负责人电话',type:'text',isShow:true,prop:'principalPhone'},
        {label:'联系人',type:'text',isShow:true,prop:'contact'},
        {label:'联系人电话',type:'text',isShow:true,prop:'contactPhone'},
        {label:'总人数',type:'text',isShow:true,prop:'personCount'},
        {label:'位置(北纬)',type:'text',isShow:true,prop:'latitude'},
        {label:'位置(东经)',type:'text',isShow:true,prop:'longitude'},
        {label:'地址',type:'text',isShow:true,prop:'address'},
        {label:'提交时间',type:'text',isShow:true,prop:'createTime'},
        // {label:'专长描述',type:'text',isShow:true,prop:'featDescription'},
        {label:'主要装备描述',type:'text',isShow:true,prop:'equipmentDescribed'},
      ],
      organOpt: {},
      enOpt: {},
      teamOpt: {}
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
      getTopicStat(this.queryData).then(res=>{
        if (res.code === "0") {
          this.info = {
            teamCount:res.data.teamCount,
            personCount:res.data.personCount,
            organPercent: `${res.data?.departmentNotOutfitCount || 0}/${res.data?.departmentNotOutfitCount || 0 + res.data?.departmentOutfitCount || 0}`,
            enterprise: `${res.data?.enterpriseOutfitCount || 0}/${res.data?.enterpriseNotOutfitCount || 0 + res.data?.enterpriseOutfitCount || 0}`
          }
          let organData = [
            { value: res.data?.departmentNotOutfitCount || 0, name: '未配置' },
            { value: res.data?.departmentOutfitCount || 0, name: '已配置' },
          ]
          this.organOpt = new Pie(organData).option
          let enData = [
            { value: res.data?.enterpriseNotOutfitCount || 0, name: '未配置' },
            { value: res.data?.enterpriseOutfitCount || 0, name: '已配置' },
          ]
          this.enOpt = new Pie(enData).option
          if (res.data && res.data.teamPersonStatisticsList){
            let eName = []
            let eValue= []
            this.chartsHeight = res.data?.teamPersonStatisticsList.length * 25 > 350 ? res.data?.orgStatisticsList.length * 25 : 350
            res.data.teamPersonStatisticsList.forEach(item=>{
              eName.push(item.name)
              eValue.push(item.count)
            })
            this.teamOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '65',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'人','应急队伍').option
          }
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
        callback({ data: [...arr], title: "应急队伍" })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
