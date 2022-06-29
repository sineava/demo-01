<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>监管装备数据统计</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="907px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            装备数量：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>装备类型统计</span>
                </div>
                <Charts :option="equipTypeOpt" style="height: 280px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>装备数量变化趋势</span>
                </div>
                <Charts :option="equipTimeOpt" style="height: 280px;" />
                <!-- <Charts :option="equipTimeOpt" />
                <Charts :option="regimeTimeOpt" /> -->
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>所属机构统计</span>
            </div>
            <Charts :option="equipDeptOpt" style="height: 340px;" />
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
import { Pie, Bar, HorBar } from '@/utils/charts-basic-options'
import { getInEquip } from '@/api/general-services/manager-statistics/manager-statistics'
import Charts from '@/components/Charts/index'
import { getTopicList, exportTopicList } from '@/api/general-services/supervisory-capability/equipment'
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
        {label:'装备名称',prop:'name',form:'input',data:''},
        {label:'装备类型',prop:'type',form:'input',data:''},
        {label:'所属部门',prop:'managementName',form:'input',data:''},
        {label:'添加时间',prop:['screenStartTime', 'screenEndTime'],form:'daterange',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'装备名称',type:'text',isShow:true,prop:'name'},
        {label:'装备类型',type:'text',isShow:true,prop:'type'},
        {label:'所属部门',type:'text',isShow:true,prop:'managementName'},
        {label:'管理人',type:'text',isShow:true,prop:'personName'},
        {label:'联系电话',type:'text',isShow:true,prop:'personPhone'},
        {label:'装备数量',type:'text',isShow:true,prop:'amount'},
        {label:'装备图片',type:'image',isShow:true,prop:'filePath'},
        {label:'添加时间',type:'text',isShow:true,prop:'createTime'}
      ],
      equipTypeOpt: {},
      equipTimeOpt: {},
      equipDeptOpt: {},
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
      getInEquip(this.queryData).then(res=>{
        if (res.code === "0") {
          const { count="0", equipmentDepartmentList = [], equipmentTimeList = [], equipmentTypeList = [] } = res.data || {}
          this.count = count
          this.equipTypeOpt = new Pie(equipmentTypeList.map(x => ({ value: x.count, name: x.type }))).option
          this.equipTimeOpt = new Bar(equipmentTimeList.map(x => x.type), equipmentTimeList.map(x => x.count)).option
          let eName = []
          let eValue= []
          equipmentDepartmentList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          this.equipDeptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'','').option
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
        callback({ data: [...arr], title: "监管装备" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
