<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物作业量数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="555px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            危险货物作业数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>所在港区吞吐量分类统计</span>
                </div>
                <Charts :option="deptOpt" style="height: 380px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>吞吐量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 380px;" />
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
import { getTopicList, exportTopicList, getTopicStat } from '@/api/port-services/topic/dangerous-cargo-statistics'
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
        {label:'组织机构名称',prop:'orgName',form:'input',data:''},
        {label:'船名/车牌号',prop:'boatName',form:'input',data:''},
        {label:'作业时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:'',format: ['yyyy-MM-dd 00:00:00','yyyy-MM-dd 23:59:59']}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'组织机构名称',type:'text',isShow:true,prop:'orgName'},
        {label:'组织机构现状',type:'text',isShow:true,prop:'orgState'},
        {label:'组织机构代码',type:'text',isShow:true,prop:'orgCode'},
        {label:'组织机构代码证发证日期',type:'text',isShow:true,prop:'orgIssuingDate'},
        {label:'组织机构代码证发证机构',type:'text',isShow:true,prop:'orgIssuingUnit'},
        {label:'组织机构代码证有效期起',type:'text',isShow:true,prop:'startDate'},
        {label:'组织机构代码证有效期止',type:'text',isShow:true,prop:'endDate'},
        {label:'组织机构类型',type:'text',isShow:true,prop:'orgType'},
        {label:'组织机构英文名称',type:'text',isShow:true,prop:'orgEnName'},
        {label:'企业类别代码',type:'text',isShow:true,prop:'enterpriseCategoryCode'},
        {label:'企业类别名称',type:'text',isShow:true,prop:'enterpriseCategoryName'},
        {label:'法定代表人',type:'text',isShow:true,prop:'legalPersonName'},
        {label:'法定代表人类型',type:'text',isShow:true,prop:'legalPersonType'},
        {label:'登记注册日期',type:'text',isShow:true,prop:'registrationDate'},
        {label:'单位注册地址',type:'text',isShow:true,prop:'registrationAddress'},
        {label:'港口危险货物作业单位',type:'text',isShow:true,prop:'operationUnit'},
        {label:'船名/车牌号',type:'text',isShow:true,prop:'boatName'},
        {label:'船舶/车辆国籍',type:'text',isShow:true,prop:'boatNationality'},
        {label:'现场负责人',type:'text',isShow:true,prop:'sitePersonName'},
        {label:'现场负责人联系电话',type:'text',isShow:true,prop:'sitePersonPhone'},
        {label:'作业委托人',type:'text',isShow:true,prop:'operationClient'},
        {label:'作为委托人联系人电话',type:'text',isShow:true,prop:'operationClientContactPhone'},
        {label:'靠泊/作业时间',type:'text',isShow:true,prop:'berthingTime'},
        {label:'作业时间',type:'text',isShow:true,prop:'operationTime'},
        {label:'作业泊位/区域',type:'text',isShow:true,prop:'operationBerth'},
        {label:'危险货物名称',type:'text',isShow:true,prop:'dangerCargoName'},
        {label:'危险货物类别',type:'text',isShow:true,prop:'dangerCargoCategory'},
        {label:'危险货物危规/联合国UN编号',type:'text',isShow:true,prop:'unCode'},
        {label:'危险货物重量/箱量',type:'text',isShow:true,prop:'dangerCargoNumber'},
        {label:'装货港/地点1',type:'text',isShow:true,prop:'firstLoadPort'},
        {label:'卸货港/地点1',type:'text',isShow:true,prop:'firstUnloadPort'},
        {label:'装货港/地点2',type:'text',isShow:true,prop:'secondLoadPort'},
        {label:'卸货港/地点2',type:'text',isShow:true,prop:'secondUnloadPort'},
        {label:'货物经济性质',type:'text',isShow:true,prop:'cargoEconomicNature'},
        {label:'进出口标记',type:'text',isShow:true,prop:'importExportMark'},
        {label:'惰性化情况',type:'text',isShow:true,prop:'situation'},
        {label:'是否包装危险货物',type:'text',isShow:true,prop:'isPacked'},
        {label:'特殊要求说明',type:'text',isShow:true,prop:'specialRequestDescription'},
        {label:'作业安全防范措施',type:'text',isShow:true,prop:'operationSafetyPrecaution'},
        {label:'备注',type:'text',isShow:true,prop:'remark'},
      ],
      count: undefined,
      deptOpt: {},
      timeOpt: {},
      queryData:{},
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
        if (res.code === '0') {
          const { count="0", departmentStatisticsList = [], timeStatisticsList = [] } = res.data || {}
          this.count = count
          this.timeOpt = new Bar(timeStatisticsList.map(x => x.type), timeStatisticsList.map(x => x.count)).option
          let eName = []
          let eValue = []
          departmentStatisticsList.forEach(item=>{
            eName.push(item.departmentName)
            eValue.push(item.count)
          })
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'','').option
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
        callback({ data: [...arr], title: "危险货物作业量" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
