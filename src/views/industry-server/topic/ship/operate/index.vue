<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>船舶运营信息数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="575px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            船舶数量：<span>{{ count }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>船舶种类统计</span>
            </div>
            <Charts :option="typeOpt" style="height: 400px;" />
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
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/water-transportation-services/topic/license-info"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
import { Bar } from '@/utils/charts-basic-options'
import { getValue } from '@/utils/index'
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    pagination,
    Screen,
    TopicTable,
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchData:[
        {label:'船舶营运证编号',prop:'shipLicenseNo',form:'input',condition:'like',data:''},
        {label:'中文船名',prop:'shipName',form:'input',condition:'like',data:''},
        {label:'船籍港',prop:'registryPort',form:'input',condition:'like',data:''},
        // {label:'船舶识别号',prop:'shipIdentifyNo',form:'input',condition:'like',data:''},
        {label:'船舶所有人',prop:'shipOwner',form:'input',condition:'like',data:''},
        {label:'船舶经营人',prop:'shipOperator',form:'input',condition:'like',data:''},
        {label:'经营人许可证号码',prop:'operatorLicenceNo',form:'input',condition:'like',data:''},
        {label:'船舶管理人',prop:'shipCustodian',form:'input',condition:'like',data:''},
        {label:'管理人许可证号码',prop:'custodianLicenceNo',form:'input',condition:'like',data:''},
        {label:'船舶类型',prop:'shipType',form:'input',condition:'like',data:''},
        {label:'船体材料',prop:'hullMaterial',form:'input',condition:'like',data:''},
        {label:'船舶总吨',prop:'shipTotalTons',form:'input',condition:'like',data:''},
        {label:'主机功率(千瓦)',prop:'hostPower',form:'input',condition:'like',data:''},
        {label:'主机数量(台)',prop:'hostNum',form:'number',condition:'eq',data:undefined},
        {label:'建成日期',prop:'completionDate',form:'date',condition:'eq',data:''},
        {label:'改建日期',prop:'rebuildDate',form:'date',condition:'eq',data:''},
        {label:'载重吨(吨)',prop:'netWeightTons',form:'number',condition:'eq',data:undefined,precision:3},
        {label:'载箱量(TEU)',prop:'loadingCapacity',form:'number',condition:'eq',data:undefined},
        {label:'载气量(立方米)',prop:'gasCarryingCapacity',form:'number',condition:'eq',data:undefined,precision:2},
        {label:'载车量(车位)',prop:'vehicleCapacity',form:'number',condition:'eq',data:undefined},
        {label:'载客定额(客位)',prop:'passengerQuota',form:'number',condition:'eq',data:undefined}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'船舶营运证编号',prop:'shipLicenseNo',type:'text',isShow:true},
        {label:'中文船名',prop:'shipName',type:'text',isShow:true},
        {label:'船籍港',prop:'registryPort',type:'text',isShow:true},
        // {label:'船舶识别号',prop:'shipIdentifyNo',type:'text',isShow:true},
        {label:'船舶所有人',prop:'shipOwner',type:'text',isShow:true},
        {label:'船舶经营人',prop:'shipOperator',type:'text',isShow:true},
        {label:'经营人许可证号码',prop:'operatorLicenceNo',type:'text',isShow:true},
        {label:'船舶管理人',prop:'shipCustodian',type:'text',isShow:true},
        {label:'管理人许可证号码',prop:'custodianLicenceNo',type:'text',isShow:true},
        {label:'船舶类型',prop:'shipType',type:'text',isShow:true},
        {label:'船体材料',prop:'hullMaterial',type:'text',isShow:true},
        {label:'船舶总吨',prop:'shipTotalTons',type:'text',isShow:true},
        {label:'主机功率(千瓦)',prop:'hostPower',type:'text',isShow:true},
        {label:'主机数量(台)',prop:'hostNum',type:'text',isShow:true},
        {label:'建成日期',prop:'completionDate',type:'text',isShow:true},
        {label:'改建日期',prop:'rebuildDate',type:'text',isShow:true},
        {label:'载重吨(吨)',prop:'netWeightTons',type:'text',isShow:true},
        {label:'载箱量(TEU)',prop:'loadingCapacity',type:'text',isShow:true},
        {label:'载气量(立方米)',prop:'gasCarryingCapacity',type:'text',isShow:true},
        {label:'载车量(车位)',prop:'vehicleCapacity',type:'text',isShow:true},
        {label:'载客定额(客位)',prop:'passengerQuota',type:'text',isShow:true},
        {label:'船舶经营人许可证核定的经营范围',prop:'approvedBusinessScope',type:'text',isShow:true},
        {label:'本船核定的经营范围',prop:'businessScope',type:'text',isShow:true},
        {label:'本船是否符合内河货运船舶船型主尺度系列标准',prop:'isConformStandard',type:'text',isShow:true}
      ],
      count: undefined,
      typeOpt: {},
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
      getTopicList(this.queryData).then(res=>{
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        if (res.code === "0") {
          let timeOptXArr = []
          let timeOptSeriesArr = []
          let shipTypeCount = 0
          res.data.forEach(item=>{
            timeOptXArr.push(item.shipType || '其他')
            timeOptSeriesArr.push(item.amount)
            shipTypeCount = shipTypeCount + item.amount
          })
          this.count = shipTypeCount
          this.typeOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
            top: '30px',
            left: '4%',
            right: '40px',
            bottom: timeOptXArr.length>25 ? '40px' : '20px',
            containLabel: true
          },timeOptXArr.length > 15 ? 90 : 0,'船舶数量(艘)','年份').option
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
        callback({ data: [...arr], title: "船舶营运信息数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
