<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>岸线审批信息</span>
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
            规划岸线数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <!-- <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>岸线类型分类统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 220px;" />
              </el-card>
            </el-col> -->
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>岸线功能分类统计</span>
                </div>
                <Charts :option="funcOpt" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>岸线利用功能分类统计</span>
                </div>
                <Charts :option="useOpt" style="height: 220px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>岸线审批数量变化趋势</span>
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
import { getTopicList, exportTopicList, getTopicStat } from '@/api/port-services/topic/coastline-approval-statistics'
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
      searchData:[
        {label:'建设项目名称',prop:'constructionProjectName',form:'input',data:''},
        {label:'岸线类别',prop:'coastlineCategory',form:'input',data:''},
        {label:'岸线使用功能',prop:'useFunction',form:'input',data:''},
        {label:'组织机构名称',prop:'orgName',form:'input',data:''},
        {label:'岸线批复时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'建设项目名称',type:'text',isShow:true,prop:'constructionProjectName'},
        {label:'岸线类别',type:'text',isShow:true,prop:'coastlineCategory'},
        {label:'岸线使用功能',type:'text',isShow:true,prop:'useFunction'},
        {label:'邮政编码',type:'text',isShow:true,prop:'postcode'},
        {label:'联系人',type:'text',isShow:true,prop:'contacts'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactsPhone'},
        {label:'项目审批核准部门',type:'text',isShow:true,prop:'approvalDepartment'},
        {label:'申请岸线位置',type:'text',isShow:true,prop:'applyCoastlineLocation'},
        {label:'申请岸线使用长度',type:'text',isShow:true,prop:'applyCoastlineLength'},
        {label:'申请岸线试用期',type:'text',isShow:true,prop:'probationPeriod'},
        {label:'主要建设内容',type:'text',isShow:true,prop:'projectContent'},
        {label:'岸线批复文号',type:'text',isShow:true,prop:'approvalNumber'},
        {label:'岸线批复时间',type:'text',isShow:true,prop:'approvalDate'},
        {label:'组织机构名称',type:'text',isShow:true,prop:'orgName'},
        {label:'组织机构现状',type:'text',isShow:true,prop:'orgState'},
        {label:'组织结构代码',type:'text',isShow:true,prop:'orgCode'},
        {label:'组织机构代码证发证日期',type:'text',isShow:true,prop:'orgIssuingDate'},
        {label:'组织机构代码证发证机构',type:'text',isShow:true,prop:'orgIssuingUnit'},
        {label:'组织机构代码证发证有效期起',type:'text',isShow:true,prop:'startDate'},
        {label:'组织机构代码证发证有效期止',type:'text',isShow:true,prop:'endDate'},
        {label:'组织机构类型',type:'text',isShow:true,prop:'orgType'},
        {label:'组织机构英文名称',type:'text',isShow:true,prop:'orgEnName'},
        {label:'企业类别代码',type:'text',isShow:true,prop:'enterpriseCategoryCode'},
        {label:'企业类别名称',type:'text',isShow:true,prop:'enterpriseCategoryName'},
        {label:'法定代表人',type:'text',isShow:true,prop:'legalPersonName'},
        {label:'法定代表人类型',type:'text',isShow:true,prop:'legalPersonType'},
        {label:'法人证件名称',type:'text',isShow:true,prop:'legalPersonCertificateName'},
        {label:'法人证件号码',type:'text',isShow:true,prop:'legalPersonCertificateNum'},
        {label:'登记注册日期',type:'text',isShow:true,prop:'registrationDate'},
        {label:'单位注册地址',type:'text',isShow:true,prop:'registrationAddress'},
        {label:'经营（生产）范围（主营）',type:'text',isShow:true,prop:'businessScope'}
      ],
      
      typeOpt: {},
      funcOpt: {},
      useOpt: {},
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
          const {count="0", coastlineCategoryList = [], timeStatisticsList = [], typeStringStatisticsList = [], useFunctionList = []} = res.data || {}
          this.count = count
          const arr = ['typeOpt', 'funcOpt', 'useOpt']
          arr.forEach(x => {
            let arr = null
            if (x === 'typeOpt') arr = coastlineCategoryList.map(x => ({ name: x.type, value: x.count }))
            if (x === 'funcOpt') arr = useFunctionList.map(x => ({ name: x.type, value: x.count }))
            if (x === 'useOpt') arr = typeStringStatisticsList.map(x => ({ name: x.type, value: x.count }))
            this[x] = new Ring(arr).option
          })
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
        callback({ data: [...arr], title: "岸线审批" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
