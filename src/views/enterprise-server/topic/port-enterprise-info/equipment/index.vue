<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业设施设备数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="375px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            设施/设备数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span> 设施/设备类型统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span> 设施/设备数量变化趋势</span>
                </div>
                <Charts :option="timeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <!-- <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属企业设施/设备数量统计</span>
            </div>
            <Charts :option="deptOpt" :style="`height:${chartsHeight}px`" />
          </el-card> -->
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
import { getValue } from '@/utils/index'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/general-services/topic/facility-statistics'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
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
      screenTime: [],
      chartsHeight:300,
      searchData:[
        {label:'设施/设备名称',prop:'facilityName',form:'input',data:''},
        {label:'设施/设备类型',prop:'facilityCategory',form:'select',data:'',
          option:[
            { value: 1, label: '泊位' },
            { value: 2, label: '储罐' },
            { value: 3, label: '堆场' },
            { value: 4, label: '仓库' },
            { value: 5, label: '趸船' },
            { value: 6, label: '环保设施' },
            { value: 7, label: '管线' }
          ]
        },
        {label:'添加时间',prop:['screenStartTime','screenEndTime'],form:'daterange',data:[],format:['yyyy-MM-dd','yyyy-MM-dd 23:59:59']},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'设施/设备名称',type:'text',isShow:true,prop:'facilityName'},
        {label:'设施/设备类型',type:'only-num',isShow:true,prop:'facilityCategory',
          payload:[
            { value: 1, label: '泊位' },
            { value: 2, label: '储罐' },
            { value: 3, label: '堆场' },
            { value: 4, label: '仓库' },
            { value: 5, label: '趸船' },
            { value: 6, label: '环保设施' },
            { value: 7, label: '管线' }
          ]
        },
        {label:'所属企业',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'负责人姓名',type:'text',isShow:true,prop:'directorName'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactNumber'},
        {label:'添加时间',type:'text',isShow:true,prop:'createTime'},
        {label:'备注',type:'text',isShow:true,prop:'remark'}
      ],
      count: undefined,
      typeOpt: {},
      timeOpt: {},
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
          const { count="0", departmentTypeStatisticalList = [], timeStatisticalList = [], typeStatisticalList = [] } = res.data || {}
          this.count = count
          let type = [
            { value: 0, name: '泊位' },
            { value: 0, name: '储罐' },
            { value: 0, name: '堆场' },
            { value: 0, name: '仓库' },
            { value: 0, name: '趸船' },
            { value: 0, name: '环保设施' },
            { value: 0, name: '管线' }
          ]
          typeStatisticalList.forEach(item=>{
            let key = Number(item.type)
            if (0<key<8){
              type[key-1].value = item.count
            }
          })
          this.typeOpt = new Ring(type).option
          this.timeOpt = new Bar(timeStatisticalList.map(x => x.type), timeStatisticalList.map(x => x.count),{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},0,'数量','年份').option
          let eName = []
          let eValue= []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
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
        callback({ data: [...arr], title: "企业设施设备数据" })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
