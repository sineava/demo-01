<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>船员基本信息数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="576px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            船员数量：<span>{{ count }} (人)</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>船员职务类型数据</span>
                </div>
                <Charts :option="jobOpt" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>船员证书类型数据</span>
                </div>
                <Charts :option="certOpt" />
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
import { Pie,Ring } from '@/utils/charts-basic-options'
import {
  getTopicList,
  exportTopicList,
  getTopicStat
} from "@/api/water-transportation-services/information/crew"
import Charts from "@/components/Charts/index"
import pagination from "@/components/Pagination"
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
        {label:'姓名',prop:'crewName',form:'input',data:''},
        {label:'职务',prop:'post',form:'input',data:''},
        {label:'所属企业',prop:'unitName',form:'input',data:''},
        {label:'适任证书类型',prop:'certificateType',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'姓名',type:'text',isShow:true,prop:'crewName'},
        {label:'性别',type:'boolean-only-num',isShow:true,prop:'sex',payload:[
          {value: 0, label: '女'},
          {value: 1, label: '男'}
        ]},
        {label:'身份证号',type:'text',isShow:true,prop:'idCard'},
        {label:'职务',type:'text',isShow:true,prop:'post'},
        {label:'所属港航机构',type:'text',isShow:true,prop:'deptName'},
        {label:'所在单位/企业',type:'text',isShow:true,prop:'unitName'},
        {label:'适任证书类型',type:'text',isShow:true,prop:'certificateType'},
        {label:'适任证书编号',type:'text',isShow:true,prop:'certificateCode'},
        {label:'联系电话',type:'text',isShow:true,prop:'contactPhone'},
        {label:'聘用合同起',type:'text',isShow:true,prop:'hiringStartTime'},
        {label:'聘用合同至',type:'text',isShow:true,prop:'hiringEndTime'}
      ],
      jobOpt: {},
      certOpt: {},
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
      getTopicList(queryData).then(res=>{
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
        if (res.code === "0") {
          console.log(res.data)
          const {
            crewNum="0",
            crewCertificateTypeVos = [],
            crewPostTypeVos = []
          } = res.data || {}
          this.count = crewNum
          const arr = ["jobOpt", "certOpt"]
          arr.forEach((x) => {
            let arr = null
            if (x === "jobOpt") {
              arr = crewPostTypeVos.map((x) => ({
                name: x.post,
                value: x.crewNum,
              }))
            }
            if (x === "certOpt") {
              arr = crewCertificateTypeVos.map((x) => ({
                name: x.certificateType,
                value: x.crewNum,
              }))
            }
            this[x] = new Ring(arr).option
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
        callback({ data: [...arr], title: "船员基本信息数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
