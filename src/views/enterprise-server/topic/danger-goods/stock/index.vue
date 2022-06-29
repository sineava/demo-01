<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物存量信息</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="395px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            建设项目数：<span>{{ count }} (个)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>所在区域</span>
                </div>
                <Charts :option="areaOpt" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>存储类型</span>
                </div>
                <Charts :option="typeOpt" style="height: 220px;" />
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
import { Pie } from '@/utils/charts-basic-options'
import { getTopicStat, exportTopicList, getTopicList } from '@/api/port-services/topic/dangerous-declare-statistics'
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
      count: undefined,
      searchData:[
        {label:'所在地市港口管理部门',prop:'organizationName',form:'input',data:''},
        {label:'所在区域名称',prop:'coastlineName',form:'input',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'所在地市港口管理部门',type:'text',isShow:true,prop:'organizationName'},
        {label:'所属区域',type:'text',isShow:true,prop:'coastlineName'},
        {label:'企业名称',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'设备名称',type:'text',isShow:true,prop:'equipmentName'},
        {label:'设备类型',type:'boolean-only-num',isShow:true,prop:'storageType',payload:[
          {value: 1, label: '储罐'}
        ]},
        {label:'危险品名称',type:'text',isShow:true,prop:'goodsName'},
        {label:'当前存量',type:'text',isShow:true,prop:'stockNum'}
      ],
      areaOpt: {},
      typeOpt: {},
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
          const {count="0", departmentStatisticsList, typeStatisticsList } = res.data || {}
          this.count = count
          const arr = ['areaOpt', 'typeOpt']
          arr.forEach(x => {
            let arr = null
            if (x === 'areaOpt') arr = (departmentStatisticsList || []).map(x => ({ name: x.departmentName, value: x.count }))
            if (x === 'typeOpt') arr = (typeStatisticsList || []).map(x => ({ name: x.type ? ['储罐'][x.type - 1] : null, value: x.count }))
            this[x] = new Pie(arr).option
          })
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
        callback({ data: [...arr], title: "危险货物存量" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
