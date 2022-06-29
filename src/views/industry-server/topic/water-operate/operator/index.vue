<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输经营者</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="button_roles"
            :searchData="searchData"
            height="797px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            经营者数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>运输类型</span>
                </div>
                <Charts :option="transportAreaOption" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>个体比例</span>
                </div>
                <Charts :option="isIndividualOption" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>沿海内河</span>
                </div>
                <Charts :option="coastalInlandOption" style="height: 220px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属区县</span>
            </div>
            <Charts :option="departmentTypeStatisticalOption" style="height: 290px;" />
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
        <div v-for="item, i in ['工商信息', '企业基本信息', '初始运力信息', '经营许可证信息']" style="display: flex;align-items: center;margin: 0 10px;fontSize:12px;fontWeight:400">
          <div :style="{width: '16px',height: '16px', border: '1px solid #aaa', color: 'grey', backgroundColor: ['#fff', '#74b9ff','#00b894','#fab1a0'][i],marginRight: '4px',cursor: 'pointer'}"></div> {{ item }}
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
import { Pie, Bar } from '@/utils/charts-basic-options'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
import { getValue } from '@/utils/index'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
import { getPageList, getStatic } from '@/api/general-services/topic/waterway-statistics'
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
      pageNum: 1,
      pageSize: 20,
      total: 0,
      info: {},
      count: undefined,
      searchForm: {
        type: '',
        nature: '',
        portName: ''
      },
      coastalInlandOption: {}, // 沿海内河
      isIndividualOption: {}, // 个体比例
      transportAreaOption: {}, // 运输类型
      departmentTypeStatisticalOption: {}, // 所属区县
      searchData:[
        {label:'企业名称',prop:'enterpriseName',form:'input',data:''},
        {label:'运输类型',prop:'transportGoodsType',form:'input',data:''},
        {label:'运输主水系类型',prop:'transportBasinType',form:'input',data:''},
        {label:'是否集装箱班轮内支线运输',prop:'isContainerTransport',form:'select',data:'',option: [
          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ]},
        {label:'沿海内河',prop:'coastalInland',form:'input',data:''},
        {label:'是否个体',prop:'isIndividual',form:'select',data:'',option:[
          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ]}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'企业名称',isShow:true,prop:'enterpriseName',type: 'text'},
        {label:'统一社会信用代码',isShow:true,prop:'certificateNo',type: 'text'},
        {label:'类型',isShow:true,prop:'type',type: 'text'},
        {label:'住所',isShow:true,prop:'officeAddress',type: 'text'},
        {label:'法定代表人',isShow:true,prop:'legalPerson',type: 'text'},
        {label:'注册资本（万元）',isShow:true,prop:'registeredCapital',type: 'text'},
        {label:'成立时间',isShow:true,prop:'issuingDate',type: 'text'},
        {label:'营业期限至',isShow:true,prop:'expiryDate',type: 'text'},
        {label:'登记机关',isShow:true,prop:'issuingUnit',type: 'text'},
        {label:'更新时间',isShow:true,prop:'timeInfo',type: 'text'},
        {label:'经营范围',isShow:true,prop:'businessArea',type: 'text'},
        {label:'所在地市港航局部门',isShow:false,prop:'organizationName', class: 'organizationName',type: 'text'},
        {label:'企业类型',isShow:false,prop:'enterpriseType', class: 'cell-blue', type: 'boolean-tag', payload: [
          { label: '港口企业', value: 1 },
          { label: '港口服务企业', value: 2 },
          { label: '水路运输企业', value: 3 },
          { label: '水路运输代理企业', value: 4 },
          { label: '船舶管理企业', value: 5 },
          { label: '其他企业', value: 6 }
        ]},
        {label:'经济类型',isShow:false,prop:'economicType', class: 'cell-blue',type: 'text'},
        {label:'法定代表人',isShow:false,prop:'legalPersonName', class: 'cell-blue',type: 'text'},
        {label:'法人联系电话',isShow:false,prop:'legalPersonPhone', class: 'cell-blue',type: 'text'},
        {label:'法人身份证号',isShow:false,prop:'legalPersonCardNo', class: 'cell-blue',type: 'text'},
        {label:'办公地址',isShow:false,prop:'officeAddress', class: 'cell-blue',type: 'text'},
        {label:'资金币种',isShow:false,prop:'currencyCategory', class: 'cell-blue',type: 'text'},
        {label:'联系人',isShow:false,prop:'contactName', class: 'cell-blue',type: 'text'},
        {label:'联系人电话',isShow:false,prop:'contactPhone', class: 'cell-blue',type: 'text'},
        {label:'是否集装箱班轮内支线运输',isShow:false,prop:'isContainerTransport', class: 'cell-blue',type: 'text'},
        {label:'运输主水系类型',isShow:false,prop:'transportBasinType', class: 'cell-blue',type: 'text'},
        {label:'运输类型',isShow:false,prop:'transportGoodsType', class: 'cell-blue',type: 'text'},
        {label:'沿海内河',isShow:false,prop:'coastalInland', class: 'cell-blue',type: 'text'},
        {label:'是否个体',isShow:false,prop:'isIndividual', class: 'cell-blue',type: 'text'},
        {label:'职工总数（人）',isShow:false,prop:'totalStaffNumber', class: 'cell-blue',type: 'text'},
        {label:'高级船员总数',isShow:false,prop:'seniorCrew', class: 'cell-blue',type: 'text'},
        {label:'签订合同的高级船员人数',isShow:false,prop:'seniorContractCrew', class: 'cell-blue',type: 'text'},
        {label:'签订合同的高级船员比例（%）',isShow:false,prop:'seniorCrewRatio', class: 'cell-blue',type: 'text'},
        {label:'经营范围（客运）',isShow:false,prop:'passengerBusinessScope', class: 'cell-blue',type: 'text'},
        {label:'经营范围（货运）',isShow:false,prop:'freightBusinessScope', class: 'cell-blue',type: 'text'},
        {label:'经营范围（兼营）',isShow:false,prop:'sideline', class: 'cell-blue',type: 'text'},
        {label:'备注',isShow:false,prop:'remark', class: 'cell-blue',type: 'text'},
        {label:'船舶艘数(合计)',isShow:false,prop:'shipNum', class: 'cell-green',type: 'text'},
        {label:'船舶总吨(合计)',isShow:false,prop:'shipTotalTons', class: 'cell-green',type: 'text'},
        {label:'参考载重吨(吨)',isShow:false,prop:'netWeightTons', class: 'cell-green',type: 'text'},
        {label:'载客量(客位)',isShow:false,prop:'passengerQuota', class: 'cell-green',type: 'text'},
        {label:'载箱量(TEU)',isShow:false,prop:'loadingCapacity', class: 'cell-green',type: 'text'},
        {label:'载车量(车位)',isShow:false,prop:'vehicleCapacity', class: 'cell-green',type: 'text'},
        {label:'载气量(立方米)',isShow:false,prop:'gasCarryingCapacity', class: 'cell-green',type: 'text'},
        {label:'主机总功率(千瓦)',isShow:false,prop:'hostTotalPower', class: 'cell-green',type: 'text'},
        {label:'许可证编号',isShow:false,prop:'licenseNo', class: 'cell-orange',type: 'text'},
        {label:'经营期限',isShow:false,prop:'operationTerm', class: 'cell-orange',type: 'text'},
        {label:'批准机关',isShow:false,prop:'approvalAuthority', class: 'cell-orange',type: 'text'},
        {label:'文号',isShow:false,prop:'documentNo', class: 'cell-orange',type: 'text'},
        {label:'开始时间',isShow:false,prop:'startDate', class: 'cell-orange',type: 'text'},
        {label:'结束时间',isShow:false,prop:'endDate', class: 'cell-orange',type: 'text'},
        {label:'发证日期',isShow:false,prop:'issuingDate', class: 'cell-orange',type: 'text'},
        {label:'经营范围（客运）',isShow:false,prop:'passengerTransport', class: 'cell-orange',type: 'text'},
        {label:'经营范围（货运）',isShow:false,prop:'goodsTransport', class: 'cell-orange',type: 'text'},
        {label:'经营范围（兼营）',isShow:false,prop:'sideline', class: 'cell-orange',type: 'text'}
      ],
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles', 'user_info'])
  },
  created() {
    if (this.user_info.orgcategory==='1') {
      this.searchData.unshift({label:'所在港航管理部门',prop:'orgName',form:'input',data:''})
    }
    this.init()
  },
  methods: {
    init(queryData){
      this.pageNum = 1
      this.fetchData(queryData)
      this.topic(queryData)
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      const { pageNum, pageSize } = this
      const { total, records } = (await getPageList({ isPage: true, pageNum, pageSize, ...this.queryData }))?.data || {}
      this.list = (records||[]).map(x => ({
        ...x.basicInfo,
        ...x.enterpriseBusinessInfoVo,
        ...x.enterpriseInitialCapacityInfoVo,
        ...x.waterTransportBusinessLicenseVo,
        basicLegalPerson: x?.basicInfo?.basicInfolegalPersonName,
        isIndividual: x?.basicInfo?.isIndividual === '0' ? '否' : x?.basicInfo?.isIndividual === '1' ? '是' : x?.basicInfo?.isIndividual
      }))
      this.total = total || 0
    },
    async topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      const res = (await getStatic({ ...this.queryData }))
      if (res.code === '0') {
        const { coastalInland, departmentTypeStatistical, isIndividual, transportArea, count } = res?.data
        this.count = count || 0
        const info = {
          coastalInland: [],
          isIndividual: [],
          transportArea: [],
          departmentTypeStatistical: { label: [], value: [] }
        }
        ;(coastalInland || []).forEach(({ count, type })=>{
          info.coastalInland.push({ value: count, name: type })
        })
        ;(isIndividual || []).forEach(({ count, type })=>{
          if (type !== '是') { // 后端有条脏数据
            info.isIndividual.push({ value: count, name: type === '1' ? '个体' : '企业' })
          }
        })
        ;(transportArea || []).forEach(({ type, count })=>{
          info.transportArea.push({ value:count, name: type })
        })
        ;(departmentTypeStatistical || []).forEach(({ type, count }) => {
          info.departmentTypeStatistical.label.push(type)
          info.departmentTypeStatistical.value.push(count)
        })
        this.coastalInlandOption = new Pie(info.coastalInland).option
        this.isIndividualOption = new Pie(info.isIndividual).option
        this.transportAreaOption = new Pie(info.transportArea).option
        const { label, value } = info.departmentTypeStatistical
        const option = {top: '30',left: '20',right: '45',bottom: '10',containLabel: true}
        this.departmentTypeStatisticalOption = new Bar(label, value, option, label.length>10 ? 90 : 0,'单位(人)','机构').option
      }
    },
    paginationChange({ currentPage, pageSize }) {
      this.pageNum = currentPage
      this.pageSize = pageSize
      this.fetchData()
    },
    async getExportData(queryData,callback) {
      const res = (await getPageList({ ...queryData, isPage: false, pageNum: this.pageNum, pageSize: this.pageSize }))?.data
      let header = {}
      this.options.forEach(item=>{
        if (item.file !=='file' && item.isShow){
          header[(item.prop || 'no')] = item.label
        }
      })
      let arr = []
      ;(res.records || []).map(x => ({
        ...x.basicInfo,
        ...x.enterpriseBusinessInfoVo,
        ...x.enterpriseInitialCapacityInfoVo,
        ...x.waterTransportBusinessLicenseVo,
        basicLegalPerson: x?.basicInfo?.basicInfolegalPersonName,
        isIndividual: x?.basicInfo?.isIndividual === '0' ? '否' : x?.basicInfo?.isIndividual === '1' ? '是' : x?.basicInfo?.isIndividual
      })).forEach((item,index)=>{
        let row = {}
        this.options.forEach(e=>{
          if (item.file !=='file' && e.isShow){
            row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
          }
        })
        arr.push(row)
      })
      console.log(arr)
      arr.unshift(header)
      callback({ data: [...arr], title: "水路运输经营者" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
