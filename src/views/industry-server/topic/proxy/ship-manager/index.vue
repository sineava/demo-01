<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>水路运输经营者</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="button_roles"
            :searchData="searchData"
            height="465px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            经营者数量：<span>{{ num }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属区县</span>
            </div>
            <Charts :option="orgOption" style="height: 290px;" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <TopicTable
      ref="topicTable"
      :tableData="list"
      :options="options"
    >
      <template v-slot:tag>
        <div v-for="item, i in ['工商信息', '企业基本信息']" style="display: flex;align-items: center;margin: 0 10px;fontSize:12px;fontWeight:400">
          <div :style="{width: '16px',height: '16px', border: '1px solid #aaa', color: 'grey', backgroundColor: ['#fff', '#74b9ff'][i],marginRight: '4px',cursor: 'pointer'}"></div> {{ item }}
        </div>
      </template>
    </TopicTable>
    <pagination
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
import { mapGetters } from 'vuex'
import { Bar } from '@/utils/charts-basic-options'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
import { getValue } from '@/utils/index'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
import { getPageList, getStatic } from '@/api/general-services/topic/waterway-agent-statistics'
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
      pageNum: 1,
      pageSize: 20,
      total: 0,
      num: '',
      orgOption: {},
      searchData:[
        {label:'法定代表人',prop:'legalPersonName',form:'input',data:''},
        {label:'经济类型',prop:'economicType',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',isShow:true,prop:'enterpriseName', type: 'text'},
        {label:'统一社会信用代码',isShow:true,prop:'certificateNo', type: 'text'},
        {label:'类型',isShow:true,prop:'type', type: 'text'},
        {label:'住所',isShow:true,prop:'officeAddress', type: 'text'},
        {label:'法定代表人',isShow:true,prop:'basicLegalPersonName', type: 'text'},
        {label:'注册资本（万元）',isShow:true,prop:'registeredCapital', type: 'text'},
        {label:'成立时间',isShow:true,prop:'timeInfo', type: 'text'},
        {label:'营业期限至',isShow:true,prop:'expiryDate', type: 'text'},
        {label:'登记机关',isShow:true,prop:'issuingUnit', type: 'text'},
        {label:'更新时间',isShow:true,prop:'updateTime', type: 'text'},
        {label:'经营范围',isShow:true,prop:'businessArea', type: 'text'},
        {label:'企业类型',isShow:true,prop:'enterpriseType',type: 'boolean-tag', payload: [
          { label: '港口企业', value: 1 },
          { label: '港口服务企业', value: 2 },
          { label: '水路运输企业', value: 3 },
          { label: '水路运输代理企业', value: 4 },
          { label: '船舶管理企业', value: 5 },
          { label: '其他企业', value: 6 }
        ]},
        {label:'所在地市港航局部门',isShow:false,prop:'organizationName', class: 'cell-blue', type: 'text'},
        {label:'经济类型',isShow:false,prop:'economicType', class: 'cell-blue', type: 'text'},
        {label:'法定代表人',isShow:false,prop:'licenseLegalPersonName', class: 'cell-blue', type: 'text'},
        {label:'法人联系电话',isShow:false,prop:'legalPersonPhone', class: 'cell-blue', type: 'text'},
        {label:'法人身份证号',isShow:false,prop:'legalPersonCardNo', class: 'cell-blue', type: 'text'},
        {label:'办公地址',isShow:false,prop:'officeAddress', class: 'cell-blue', type: 'text'},
        {label:'资金币种',isShow:false,prop:'currencyCategory', class: 'cell-blue', type: 'text'},
        {label:'联系人',isShow:false,prop:'contactName', class: 'cell-blue', type: 'text'},
        {label:'联系人电话',isShow:false,prop:'contactPhone', class: 'cell-blue', type: 'text'},
        {label:'传真号码',isShow:false,prop:'faxNumber', class: 'cell-blue', type: 'text'},
        {label:'电子邮箱',isShow:false,prop:'email', class: 'cell-blue', type: 'text'},
        {label:'职工总数（人）',isShow:false,prop:'totalStaffNumber', class: 'cell-blue', type: 'text'},
        {label:'备注',isShow:false,prop:'remark', class: 'cell-blue', type: 'text'}
      ],
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles', 'user_info'])
  },
  created() {
    if (this.user_info.orgcategory==='1') {
      this.searchData.unshift({label:'所在港航机构',prop:'orgName',form:'input',data:''})
    }
    this.init()
  },
  methods: {
    init(queryData) {
      this.pageNum = 1
      this.fetchData(queryData)
      this.topic(queryData)
    },
    paginationChange(val) {
      this.pageNum = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      const { pageNum, pageSize } = this
      const { total, records } = (await getPageList({ isPage: true, pageNum, pageSize, ...this.queryData }))?.data || {}
      this.list = (records || []).map(x => ({
        ...x?.basicInfo,
        ...x?.enterpriseBusinessInfoVo,
        basicLegalPersonName: x?.basicInfo?.legalPersonName,
        licenseLegalPersonName: x?.enterpriseBusinessInfoVo?.legalPersonName
      })) || []
      this.total = total || 0
    },
    async topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      const res = (await getStatic({ ...this.queryData }))
      if (res.code === '0') {
        const { departmentTypeStatistical, count } = res?.data
        this.num = count || 0
        let eName = []
        let eValue= []
        ;(departmentTypeStatistical || []).forEach(item=>{
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
      ;(res.records || []).map(x => ({
        ...x?.basicInfo,
        ...x?.enterpriseBusinessInfoVo,
        basicLegalPersonName: x?.basicInfo?.legalPersonName,
        licenseLegalPersonName: x?.enterpriseBusinessInfoVo?.legalPersonName
      })).forEach((item,index)=>{
        let row = {}
        this.options.forEach(e=>{
          if (item.file !=='file' && e.isShow){
            row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
          }
        })
        arr.push(row)
      })
      arr.unshift(header)
      callback({ data: [...arr], title: "船舶管理经营者" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
