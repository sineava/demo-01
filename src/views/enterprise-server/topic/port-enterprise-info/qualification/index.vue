<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业资质数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="715px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="topic-card">
                <div slot="header" class="clearfix">
                  <span />
                </div>
                <!-- <p style="line-height: 73px;">港口企业数量：<span>{{ info.enterpriseCount }}</span></p> -->
                <p style="line-height: 164px;">有效期内的证书数量：<span>{{ info.count }}</span></p>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="topic-card">
                <div slot="header" class="clearfix">
                  <span>企业证书正常比例</span>
                </div>
                <Charts :option="certOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>发证机关分类统计</span>
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
import { getTopicList, exportTopicList, getTopicStat } from '@/api/general-services/topic/qualification-statistics'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import { getValue } from '@/utils/index'
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
        {label:'港口经营许可证证书编号',prop:'certificateNumber',form:'input',data:''},
        // {label:'公司名称',prop:'enterpriseName',form:'input',data:''},
        {label:'法定代表人',prop:'principal',form:'input',data:''},
        {label:'经营地域',prop:'geographical',form:'input',data:''},
        {label:'办公地址',prop:'address',form:'input',data:''},
        {label:'发证日期',prop:'screenStartTime',form:'date',data:'',format:'yyyy-MM-dd'},
        // {label:'有效期至',prop:'screenTime',form:'date',data:'',format:'yyyy-MM-dd'},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'港口经营许可证证书编号',type:'text',isShow:true,prop:'certificateNumber'},
        {label:'公司名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'法定代表人',type:'text',isShow:true,prop:'principal'},
        {label:'经济类型',type:'text',isShow:true,prop:'economicType'},
        {label:'办公地址',type:'text',isShow:true,prop:'address'},
        {label:'经营地域',type:'text',isShow:true,prop:'geographical'},
        {label:'有效期至',type:'boolean',payload:[
          {value:'',label:'永久'},
        ],isShow:true,prop:'maturityDate'},
        {label:'发证机关',type:'text',isShow:true,prop:'departmentName'},
        {label:'发证日期',type:'text',isShow:true,prop:'releaseDate'},
      ],
      info:{},
      chartsHeight:300,
      certOpt: {},
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
          const { count="0", departmentTypeStatisticalList = [], enterpriseCount="0", typeStatisticalList = [] } = res.data || {}
          this.info = {
            count,
            enterpriseCount
          }
          let eName = []
          let eValue= []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          let cert = [
            {value:0,name:'正常'},
            {value:0,name:'不正常'},
          ]
          typeStatisticalList.forEach(item=>{
            let key = Number(item.type)
            if (key===1){
              cert[1].value = item.count || 0
            } else {
              cert[0].value = item.count || 0
            }
          })

          this.certOpt = new Ring(cert).option
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
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
        callback({ data: [...arr], title: "港口企业资质数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
