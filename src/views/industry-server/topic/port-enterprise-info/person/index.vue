<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口企业人员数据</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="788px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="topic-card">
                人员数量：<span>{{ info.count }}</span>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="topic-card">
                企业数量：<span>{{ info.enterpriseCount }}</span>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>性别</span>
                </div>
                <Charts :option="sexOpt" style="height: 200px;" />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>人员类型统计</span>
                </div>
                <Charts :option="typeOpt" style="height: 200px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>企业人数统计</span>
            </div>
            <Charts :option="deptOpt" :style="`height:${chartsHeight}px`" />
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
import { Ring, Bar } from '@/utils/charts-basic-options'
import { getTopicList, exportTopicList, getTopicStat } from '@/api/general-services/topic/person-statistics'
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
      info: {},
      chartsHeight:300,
      searchData:[
        {label:'所属企业',prop:'enterpriseName',form:'input',data:''},
        {label:'性别',prop:'sex',form:'select',data:'',
          option:[
            {label:'男',value:1},{label:'女',value:0}
          ]
        },
        {label:'年龄大于',prop:'ageStart',form:'number',data:undefined,min:18,max:70},
        {label:'年龄小于',prop:'ageEnd',form:'number',data:undefined,min:18,max:70},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'员工姓名',type:'text',isShow:true,prop:'fullName'},
        {label:'性别',prop:'sex',type:'boolean-tag',data:'',
          payload:[
            {value:1,label:'男',tag:''},
            {value:0,label:'女',tag:'danger'},
          ]
        },
        {label:'出生日期',type:'text',isShow:true,prop:'birthDate'},
        {label:'所属企业',type:'text',isShow:true,prop:'enterpriseName'},
        {label:'人员类型',prop:'personType',type:'only-num',data:'',
          payload:[
            {value:1,label:'一般人员'},
            {value:2,label:'安全管理人员'},
            {value:3,label:'装卸管理人员'},
            {value:4,label:'其他管理人员'},
            {value:5,label:'环保管理人员'},
            {value:6,label:'经营管理人员'},
          ]
        },
        {label:'职务',type:'text',isShow:true,prop:'post'},
        {label:'所属机构',type:'text',isShow:true,prop:'organizationName'},
        {label:'办公电话',type:'text',isShow:true,prop:'officeTelephone'},
        {label:'持证类型',type:'text',isShow:true,prop:'certificateType'},
        {label:'证书名称',type:'text',isShow:true,prop:'certificateName'},
        {label:'证书有效期至',type:'boolean',payload:[
          {value:'',label:'永久'},
        ],isShow:true,prop:'validityDate'},
      ],
      sexOpt: {},
      typeOpt: {},
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
          const { count="0", enterpriseCount="0", departmentTypeStatisticalList = [], personTypeStatisticalList = [], sexTypeStatisticalList = [] } = res.data || {}
          this.info = {
            count,
            enterpriseCount
          }
          let eName = []
          let eValue= []
          departmentTypeStatisticalList.forEach(item=>{
            eName.push(item.type)
            eValue.push(item.count)
          })
          let type = [
            {value:0,name:'一般人员'},
            {value:0,name:'安全管理人员'},
            {value:0,name:'装卸管理人员'},
            {value:0,name:'其他管理人员'},
            {value:0,name:'环保管理人员'},
            {value:0,name:'经营管理人员'},
          ]
          personTypeStatisticalList.forEach(item=>{
            let key = Number(item.type)
            if (0<key<7){
              type[key-1].value = item.count
            }
          })
          let sex = [
            {value:0,name:'男'},
            {value:0,name:'女'},
          ]
          sexTypeStatisticalList.forEach(item=>{
            let key = Number(item.type)
            if (key===1){
              sex[0].value = item.count
            } else {
              sex[1].value = item.count
            }
          })
          this.sexOpt = new Ring(sex).option
          this.typeOpt = new Ring(type).option
          this.deptOpt = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'数量','企业').option
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
        callback({ data: [...arr], title: "港口企业人员数据" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
