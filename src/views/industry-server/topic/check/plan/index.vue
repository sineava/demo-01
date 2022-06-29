<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全检查计划数据</span>
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
            检查计划数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>企业检查覆盖率统计</span>
                </div>
                <Charts :option="coverOpt" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>计划类型统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 220px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>被检查单位分类统计</span>
            </div>
            <Charts :option="deptOpt" style="height: 290px;" />
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
import { getTopicList, exportTopicList, getTopicStat} from '@/api/general-services/topic/safety-planning-statistical'
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
      count: undefined,
      searchData:[
        {label:'检查计划名称',prop:'planningName',form:'input',data:''},
        {label:'计划类型',prop:'categoryName',form:'input',data:''},
        {label:'检查单位',prop:'isUseUnit',form:'input',data:''},
        {label:'被检查单位/企业',prop:'targetName',form:'input',data:''},
        {label:'发布状态',prop:'publishStatus',form:'select',data:'',option:[
            {label:'未发布',value:0},{label:'已发布',value:1}
          ]
        },
        {label:'检查时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'计划名称',type:'text',isShow:true,prop:'planningName'},
        {label:'计划类型',type:'text',isShow:true,prop:'categoryName'},
        {label:'被检查企业/单位',type:'text',isShow:true,prop:'targetName'},
        {label:'计划检查时间',type:'text',isShow:true,prop:'planningTime'},
        {label:'是否邀请专家',type:'boolean-only-num',isShow:true,prop:'isExpertInvited',payload:[
          {value: 0, label: '否'},
          {value: 1, label: '是'},
        ]},
        {label:'检查单位',type:'custom',isShow:true,prop:'isUseUnit',customFun:'companyShow'},
        {label:'发布人',type:'text',isShow:true,prop:'createBy'},
        {label:'发布状态',type:'boolean-only-num',isShow:true,prop:'publishStatus',payload:[
          {value: 0, label: '未发布'},
          {value: 1, label: '已发布'},
        ]},
        {label:'检查备注',type:'text',isShow:true,prop:'remark'}
      ],
      
      coverOpt: {},
      typeOpt: {},
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
        const {count, departmentTypeStatisticalList = [], enterpriseCount=0, enterpriseInCount=0, typeStatisticalList = []} = res.data || {}
        this.count = count
        const arr = ['coverOpt', 'typeOpt']
        arr.forEach(x => {
          let arr = null
          if (x === 'coverOpt') arr = [{ name: '检查企业', value: enterpriseInCount }, { name: '未检查企业', value: enterpriseCount - enterpriseInCount }]
          if (x === 'typeOpt') arr = typeStatisticalList.map(x => ({ name: x.type, value: x.count }))
          this[x] = new Ring(arr).option
        })
        let eName = []
        let eValue = []
        departmentTypeStatisticalList.forEach(item=>{
          eName.push(item.type)
          eValue.push(item.count)
        })
        this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','机构').option
      })
    },
    companyShow(data){
      let json = data ? JSON.parse(data) : []
      let strArr = []
      json.forEach(item=>{
        strArr.push(item[item.length-1])
      })
      return strArr.join('、')
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
              if(e.customFun === 'companyShow'){
                row[(e.prop || 'no')] = this.companyShow(item[e.prop])
              }else{
                row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
              }
            }
          })
          arr.push(row)
        })
        arr.unshift(header)
        callback({ data: [...arr], title: "安全检查计划" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
