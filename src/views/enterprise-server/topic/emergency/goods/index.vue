<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急物资数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="738px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            应急物资数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>各应急物资种类数量</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>行业/企业数量统计</span>
                </div>
                <Charts :option="enOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>近五年趋势</span>
            </div>
            <Charts :option="timeOpt" style="height: 250px;" />
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
import { Ring, Bar } from '@/utils/charts-basic-options'
import { emergencyGoods } from '@/utils/public-fields'
import { getMaterialType } from '@/api/emergency-services/material'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/emergency-services/topic/material-statistics'
import Charts from '@/components/Charts/index'
import { getValue,momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    Screen,
    TopicTable,
    pagination
  },
  mixins: [emergencyGoods],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      count: undefined,
      searchData:[
        {label:'物资名称',prop:'name',form:'input',condition:'like',data:''},
        {label:'物资类别',prop:'type',form:'select',condition:'eq',data:'',
          option:[]
        },
        {label:'应急物资储备点',prop:'storageName',form:'input',condition:'like',data:''},
        /*
         * {label:'所属港区',prop:'harbourDistrictName',form:'input',condition:'like',data:''},
         * {label:'所属企业/单位',prop:'enterpriseName',form:'input',condition:'like',data:''},
         */
        {label:'规格型号',prop:'specifications',form:'input',condition:'like',data:''},
        {label:'计量单位',prop:'measuringUnit',form:'input',condition:'like',data:''},
        {label:'数量',prop:'numbers',form:'number',condition:'eq',data:undefined},
        {label:'联系人',prop:'contact',form:'input',condition:'like',data:''},
        {label:'联系电话',prop:'contactPhone',form:'input',condition:'like',data:''},
        {label:'储备点位置',prop:'address',form:'input',condition:'like',data:''},
        // {label:'提交时间',prop:'createTime',form:'date',condition:'eq',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'物资名称',type:'text',isShow:true,prop:'name'},
        {label:'物资类别',type:'only-num',isShow:true,prop:'type',payload:[]},
        {label:'应急物资储备点',type:'text',isShow:true,prop:'storageName'},
        // {label:'所属港区',type:'text',isShow:true,prop:'harbourDistrictName'},
        {label:'所属企业/单位',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'规格型号',type:'text',isShow:true,prop:'specifications'},
        {label:'计量单位',type:'text',isShow:true,prop:'measuringUnit'},
        {label:'数量',type:'text',isShow:true,prop:'numbers'},
        {label:'联系人',type:'text',isShow:true,prop:'contact'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactPhone'},
        {label:'位置(经度)',type:'text',isShow:true,prop:'longitude'},
        {label:'位置(纬度)',type:'text',isShow:true,prop:'latitude'},
        {label:'储备点位置',type:'text',isShow:true,prop:'address'},
        {label:'提交时间',type:'text',isShow:true,prop:'createTime'},
      ],
      fieldTypeAll:[],
      needDetailType: [],
      detailType: [],
      typeOpt: {},
      enOpt: {},
      timeOpt: {},
      teamOpt: {},
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  async created() {
    // 用于后期数据还原
    this.bRoles = this.button_roles
    this.detailType = [...this.field_detailedType]
    await this.initMaterialType()
    this.init()
  },
  methods: {
    async initMaterialType(){
      const res = await getMaterialType()
      let option = []
      res.data.forEach(item=>{
        option.push({label:item.name,value:item.id})
      })
      this.searchData[1].option = option
      this.options[2].payload = option
      this.fieldTypeAll = option
    },
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
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getTopicStat(this.queryData).then(res=>{
        const { count=0, enterpriseCount=0, industryCount=0, timeStatisticsList = [], typeStatisticsList = [] } = res.data || {}
        this.count = count
        this.enOpt = new Ring([{ name: '行业', value: industryCount }, { name: '企业', value: enterpriseCount }]).option
        let typeData = []
        this.fieldTypeAll.forEach((item,index)=>{
          typeData.push({name:item.label,value:0})
          if(typeStatisticsList){
            typeStatisticsList.forEach(val=>{
              if(item.value === val.type){
                typeData[index].value = val.count
              }
            })
          }
        })
        this.typeOpt = new Ring(typeData).option
        let cYear = Number(momentDate(new Date(),'YYYY'))
        let timeOptXArr = [cYear-4,cYear-3,cYear-2,cYear-1,cYear]
        let timeOptSeriesArr = [0,0,0,0,0]
        timeStatisticsList.forEach(item=>{
          if (Number(item.type) === cYear - 4){
            timeOptSeriesArr[0] = item.count
          } else if (Number(item.type) === cYear - 3){
            timeOptSeriesArr[1] = item.count
          } else if (Number(item.type) === cYear - 2){
            timeOptSeriesArr[2] = item.count
          } else if (Number(item.type) === cYear - 1){
            timeOptSeriesArr[3] = item.count
          } else if (Number(item.type) === cYear){
            timeOptSeriesArr[4] = item.count
          }
        })
        this.timeOpt = new Bar(timeOptXArr, timeOptSeriesArr,{
          top: '30',
          left: '4%',
          right: '40',
          bottom: '3%',
          containLabel: true
        },0,'物资数量(个)','年份').option
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    getFieldType(value){
      let name = ''
      for (let i=0;i<this.materialType.length;i++){
        if (this.materialType[i].id === value){
          name = this.materialType[i].name
          return name
        }
      }
      return name
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
        callback({ data: [...arr], title: "应急物资" })

        /*
         * if (key === 'type') {
         *       obj[key] = this.getFieldType(x[key])
         */
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
