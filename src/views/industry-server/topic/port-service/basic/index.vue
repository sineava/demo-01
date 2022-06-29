<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业基本信息统计</span>
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
            港口服务企业数量：<span>{{ num }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属港航部门分类统计</span>
            </div>
            <div class="charts">
              <Charts :option="orgOption" style="height:300px" />
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
import { getPageList, getStatic } from '@/api/general-services/topic/port-service-statistics'
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
        {label:'类型',prop:'economicType',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName',width:200,align:'left'},
        {label:'所属港航机构',type:'text',isShow:true,prop:'organizationName'},
        {label:'类型',type:'text',isShow:true,prop:'economicType'},
        {label:'统一社会信用代码',type:'text',isShow:true,prop:'certificateNo',width:200,align:'left'},
        {label:'住所',type:'text',isShow:true,prop:'officeAddressBl'},
        {label:'法定代表人',type:'text',isShow:true,prop:'legalPersonName'},
        {label:'注册资本（万元）',type:'text',isShow:true,prop:'registeredCapital'},
        {label:'成立时间',type:'text',isShow:true,prop:'issuingDate'},
        {label:'营业期限至',type:'text',isShow:true,prop:'expiryDate'},
        {label:'登记机关',type:'text',isShow:true,prop:'issuingUnit'},
        {label:'更新时间',type:'text',isShow:false,prop:'updateTime'},
        {label:'经营范围',type:'text',isShow:false,prop:'allowedBusiness'},
        {label:'法定代表人(营业执照信息)',type:'text',isShow:false,prop:'legalPersonNameBl'},
        {label:'法人身份证号',type:'text',isShow:false,prop:'legalPersonCardNo'},
        {label:'联系人姓名',type:'text',isShow:false,prop:'contactName'},
        {label:'联系人电话',type:'text',isShow:false,prop:'contactPhone'},
        {label:'传真号码',type:'text',isShow:false,prop:'faxNumber'},
        {label:'电子邮箱',type:'text',isShow:false,prop:'email'},
        {label:'职工总数（人）',type:'text',isShow:false,prop:'totalStaffNumber'},
        {label:'办公地址',type:'text',isShow:false,prop:'officeAddress'},
        {label:'备注',type:'text',isShow:false,prop:'remark'}
      ],
      orgOption: {},
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles', 'user_info'])
  },
  created() {
    if (this.user_info.orgcategory==='1') {
      this.searchData.unshift({label:'所属港航机构',prop:'organizationName',form:'input',data:''})
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
        const { orgStatistical, count } = res?.data
        this.num = count || 0
        ;(orgStatistical || []).sort((a, b) => a.count - b.count)
        let eName = []
        let eValue= []
        ;(orgStatistical || []).forEach(item=>{
          eName.push(item.type)
          eValue.push(item.count)
        })
        this.orgOption = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'单位(人)','机构').option
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
      callback({ data: [...arr], title: "港口服务企业基本信息" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
