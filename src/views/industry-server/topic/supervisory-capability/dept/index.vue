<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门机构数据统计</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <OrdinaryScreen
            src="OrdinaryScreen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="525px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            部门总数<span>{{ num }}</span>
          </el-card>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>机构人数统计</span>
            </div>
            <div class="charts">
              <Charts :option="orgOption" :style="`height:${chartsHeight}px`" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <TopicTable
      ref="topicTable"
      :tableObj="tableObj"
      :tableData="list"
      :options="options"
    />
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Bar } from '@/utils/charts-basic-options'
import { getManagementDepartmentSelectList,exportList } from '@/api/general-services/supervisory-capability/management-department'
import { getInDept } from '@/api/general-services/manager-statistics/manager-statistics'
import Charts from '@/components/Charts/index'
import OrdinaryScreen from '@/views/components/topic/ordinary-screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
import { getValue } from "@/utils/index"
export default {
  components: {
    Charts,
    OrdinaryScreen,
    TopicTable
  },
  data() {
    return {
      num:undefined,
      list:[],
      tableObj:{
        rowKey:'id',
        treeProps:{children: 'children', hasChildren: 'hasChildren'},
        expandRowKeys:[]
      },
      searchData:[
        {label:'部门名称',prop:'name',form:'input',data:''},
      ],
      options:[
        {label:'部门名称',type:'text',isShow:true,prop:'departmentName',width:200,align:'left'},
        {label:'状态',type:'boolean-tag',isShow:true,prop:'state',size:'small',payload:[
          {label:'启用',value:1,tag:'success'},
          {label:'禁用',value:2,tag:'info'}
        ]},
        {label:'成员数量',type:'text',isShow:true,prop:'personNumbers'},
        {label:'主管人员',type:'text',isShow:true,prop:'directorName'},
        {label:'联系电话',type:'text',isShow:true,prop:'phone'},
        {label:'传真',type:'text',isShow:true,prop:'fax'},
        {label:'通信地址',type:'text',isShow:true,prop:'mailingAddress'},
        {label:'部门描述',type:'text',isShow:true,prop:'introduce'},
        {label:'更新时间',type:'text',isShow:true,prop:'updateTime'},
        {label:'备注',type:'text',isShow:true,prop:'remark'},
      ],
      originalData:[],
      treeData:[],
      chartsHeight:350,
      orgOption: {}
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
    getValue(msg) {
      this.treeList = []
      let treeListTmp = JSON.parse(JSON.stringify(this.treeData))
      let tmp = msg
        ? this.rebuildData(msg, treeListTmp)
        : JSON.parse(JSON.stringify(treeListTmp))
      this.treeList.push(...tmp)
      return this.treeList
    },
    rebuildData(value, arr){
      let newarr = []
      arr.forEach(element => {
        if (element.departmentName.indexOf(value) > -1) { // 判断条件
          newarr.push(element)
        } else {
          if (element.children && element.children.length > 0) {
            let redata = this.rebuildData(value, element.children)
            if (redata && redata.length > 0) {
              let obj = {
                ...element,
                children: redata
              }
              newarr.push(obj)
            }
          }
        }
      })
      return newarr
    },
    // 组装树
    getTree(data) {
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.enterpriseId] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.parentId]
        it.label = it.departmentName
        it.value = it.id
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    },
    init(queryData){
      this.fetchData(queryData)
      this.topic(queryData)
    },
    async fetchData(queryData) {
      if (!queryData){
        queryData = {}
        this.loading = true
        getManagementDepartmentSelectList(queryData).then(res=>{
          this.loading = false
          if (res.code === '0') {
            this.list = this.getTree(res.data)
            this.treeData = this.list
            this.originalData = res.data
            this.tableObj.expandRowKeys = [`${this.list[0].id}`]
            this.loading = false
          }
        })
      } else {
        this.list = this.getValue(queryData.name)
      }
    },
    topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getInDept(queryData).then(res=>{
        if (res.code === "0") {
          const data = res.data || []
          this.num = data.length
          data.sort((a, b) => a.personSum - b.personSum)
          let eName = []
          let eValue= []
          data.forEach(item=>{
            eName.push(item.departmentName)
            eValue.push(item.personSum)
          })
          this.orgOption = new Bar(eName, eValue,{top: '30',left: '20',right: '45',bottom: '10',containLabel: true},eName.length>10 ? 90 : 0,'单位(人)','机构').option
        }
      })
    },
    getExcelQuyer(value){
      let res = []
      this.originalData.forEach(item=>{
        if (item.departmentName.indexOf(value) > -1) { // 判断条件
          res.push(item)
        }
      })
      return res
    },
    // 导出数据
    getExportData(queryData,callback) {
      if(queryData){
        this.queryData = queryData
      }
      this.originalData
      let res = queryData.name ? this.getExcelQuyer(queryData.name) : this.originalData

      let header = {}
      this.options.forEach(item=>{
        if (item.file !=='file' && item.isShow){
          header[(item.prop || 'no')] = item.label
        }
      })
      let arr = []
      res.forEach((item,index)=>{
        let row = {}
        this.options.forEach(e=>{
          if (item.file !=='file' && e.isShow){
            row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
          }
        })
        arr.push(row)
      })
      arr.unshift(header)
      callback({ data: [...arr], title: "管理部门" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
