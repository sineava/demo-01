<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>经营许可证</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="button_roles"
            :searchData="searchData"
            height="525px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            经营许可证数量：<span>{{ num }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属区县</span>
            </div>
            <div class="charts">
              <Charts :option="deptOption" style="height:300px" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <TopicTable
      ref="topicTable"
      :tableData="list"
      :options="options"
    />
    <Pagination
      :total="total"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      background
      @change="paginationChange"
    />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination"
import { mapGetters } from 'vuex'
import { Bar } from '@/utils/charts-basic-options'
import Charts from '@/components/Charts/index'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
import { getPageList, getStatic } from '@/api/water-transportation-services/topic/water-transport-business-license-statistics'
import { getValue } from '@/utils/index'
export default {
  components: {
    Charts,
    OrdinaryScreen,
    TopicTable,
    Pagination
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      num:undefined,
      list:[],
      searchData:[
        {label:'企业名称',prop:'enterpriseName',form:'input',data:''},
        {label:'经济类型',prop:'economicType',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true},
        {label:'企业名称',isShow:true,prop:'enterpriseName',type:'text'},
        {label:'统一社会信用代码',isShow:true,prop:'certificateNo',type:'text'},
        {label:'所属港航机构',isShow:true,prop:'organizationName',type:'text'},
        {label:'法定代表人',isShow:true,prop:'legalPerson',type:'text'},
        {label:'地址',isShow:true,prop:'address',type:'text'},
        {label:'经济类型',isShow:true,prop:'economicType',type:'text'},
        {label:'许可证编号',isShow:true,prop:'licenseNo',type:'text'},
        {label:'经营期限',isShow:true,prop:'operationTerm',type:'text'},
        {label:'批准机关',isShow:true,prop:'approvalAuthority',type:'text'},
        {label:'文号',isShow:true,prop:'documentNo',type:'text'},
        {label:'开始时间',isShow:true,prop:'startDate',type:'text'},
        {label:'结束时间',isShow:true,prop:'endDate',type:'text'},
        {label:'发证日期',isShow:true,prop:'issueDate',type:'text'},
        {label:'旅客运输',isShow:true,prop:'passengerTransport',type:'text'},
        {label:'货物运输',isShow:true,prop:'goodsTransport',type:'text'},
        {label:'兼营',isShow:true,prop:'sideline',type:'text'}
      ],
      deptOption: {}
    }
  },
  computed: {
    ...mapGetters(['button_roles', 'user_info'])
  },
  created() {
    if (this.user_info.orgcategory==='1') {
      this.searchData.unshift({label:'所属港航机构',prop:'orgName',form:'input',data:''})
    }
    this.init()
  },
  methods: {
    init(queryData) {
      this.currentPage = 1
      this.fetchData(queryData)
      this.topic(queryData)
    },
    paginationChange({ currentPage, pageSize }) {
      this.pageNum = currentPage
      this.pageSize = pageSize
      this.fetchData()
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      const { pageNum, pageSize } = this
      const { total, records } = (await getPageList({ isPage: true, pageNum, pageSize, ...this.queryData }))?.data || {}
      this.list = records || []
      this.total = total || 0
    },
    async topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      const res = (await getStatic({ ...this.queryData }))
      if (res.code === '0') {
        const { departmentTypeStatistical, count } = res?.data || {}
        this.num = count || 0
        ;(departmentTypeStatistical || []).sort((a, b) => a.count - b.count)
        let eName = []
        let eValue= []
        ;(departmentTypeStatistical || []).forEach(item=>{
          eName.push(item.type)
          eValue.push(item.count)
        })
        this.deptOption = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'单位(人)','机构').option
      }
    },
    // 导出数据
    async getExportData(queryData,callback) {
      const res = (await getPageList({ ...queryData, isPage: false }))?.data
      let header = {}
      this.options.forEach(item=>{
        if (item.file !=='file' && item.isShow){
          header[(item.prop || 'no')] = item.label
        }
      })
      let arr = []
      ;(res.records || []).forEach((item,index)=>{
        let row = {}
        this.options.forEach(e=>{
          if (item.file !=='file' && e.isShow){
            row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
          }
        })
        arr.push(row)
      })
      arr.unshift(header)
      callback({ data: [...arr], title: "经营许可证" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
