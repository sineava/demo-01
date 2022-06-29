<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>专职管理人员</span>
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
            专职管理人员数量：<span>{{ count }}</span>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>职务类型</span>
                </div>
                <Charts :option="postStatisticalOption" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>性别</span>
                </div>
                <Charts :option="sexStatisticalOption" style="height: 220px;" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>适任证书类型</span>
                </div>
                <Charts :option="certificateTypeStatisticalOption" style="height: 220px;" />
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
    />
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
import { getPageList, getStatic } from '@/api/water-transportation-services/topic/enterprise-manage-person-statistics'
export default {
  props: {
    enterpriseType: {
      type: Number,
      required: true
    }
  },
  components: {
    Charts,
    pagination,
    OrdinaryScreen,
    TopicTable
  },
  data() {
    return {
      list: [],
      total: 0,
      count: '',
      pageNum: 1,
      pageSize: 20,
      postStatisticalOption: {}, // 职务类型
      sexStatisticalOption: {}, // 性别
      certificateTypeStatisticalOption: {}, // 证书类型
      departmentTypeStatisticalOption: {}, // 所属区县
      searchData:[
        {label:'所在企业',prop:'enterpriseName',form:'input',data:''},
        {label:'姓名',prop:'fullName',form:'input',data:''},
        {label:'性别',prop:'sex',form:'input',data:''},
        {label:'职务',prop:'post',form:'input',data:''},
        {label:'适任证书类型',prop:'certificateType',form:'input',data:''}
      ],
      options:[
        {label:'序号',type:'index',isShow:true},
        {label:'姓名',isShow:true,prop:'fullName',type: 'text'},
        {label:'所在企业',isShow:true,prop:'enterpriseName',type: 'text'},
        {label:'所属港航管理部门',isShow:true,prop:'organizationName',type: 'text'},
        {label:'性别',isShow:true,prop:'sex',type: 'text'},
        {label:'身份证号',isShow:true,prop:'identificationNumber',type: 'text'},
        {label:'职务',isShow:true,prop:'post',type: 'text'},
        {label:'所在部门',isShow:true,prop:'departmentName',type: 'text'},
        {label:'适任证书类型',isShow:true,prop:'certificateType',type: 'text'},
        {label:'适任证书编号',isShow:true,prop:'certificateCode',type: 'text'},
        {label:'联系地址',isShow:true,prop:'contactAddress',type: 'text'},
        {label:'联系电话',isShow:true,prop:'contactNumber',type: 'text'},
        {label:'电子邮件',isShow:false,prop:'email',type: 'text'},
        {label:'聘用合同起',isShow:false,prop:'contractStartDate',type: 'text'},
        {label:'聘用合同至',isShow:false,prop:'聘用合同至',type: 'text'},
        {label:'备注',isShow:false,prop:'remark',type: 'text'}
      ],
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles', 'user_info'])
  },
  created() {
    if (this.user_info.orgcategory==='1') {
      this.searchData.unshift({label:'所在港航管理部门',prop:'organizationName',form:'input',data:''})
    }
    this.init()
  },
  methods: {
    init(queryData) {
      this.pageNum = 1
      this.fetchData(queryData)
      this.topic(queryData)
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      const { pageNum, pageSize } = this
      const { total, records } = (await getPageList({ ...this.queryData, isPage: true, pageNum, pageSize, enterpriseType: this.enterpriseType }))?.data || {}
      this.list = records || []
      this.total = total || 0
    },
    async topic(queryData){
      if(queryData){
        this.queryData = queryData
      }
      const res = (await getStatic({ ...this.queryData, enterpriseType: this.enterpriseType }))
      if (res.code === '0') {
        const { postStatistical, sexStatistical, certificateTypeStatistical, departmentTypeStatistical, count } = res?.data || {}
        this.count = count || 0
        const info = {
          postStatistical: [],
          sexStatistical: [],
          certificateTypeStatistical: [],
          departmentTypeStatistical: { label: [], value: [] }
        }
        ;(postStatistical || []).forEach(({ count, type })=>{
          info.postStatistical.push({ value: count, name: type })
        })
        ;(sexStatistical || []).forEach(({ count, type })=>{
          info.sexStatistical.push({ value: count, name: type })
        })
        ;(certificateTypeStatistical || []).forEach(({ type, count })=>{
          info.certificateTypeStatistical.push({ value:count, name: type })
        })
        ;(departmentTypeStatistical || []).forEach(({ type, count }) => {
          info.departmentTypeStatistical.label.push(type)
          info.departmentTypeStatistical.value.push(count)
        })
        this.postStatisticalOption = new Pie(info.postStatistical).option
        this.sexStatisticalOption = new Pie(info.sexStatistical).option
        this.certificateTypeStatisticalOption = new Pie(info.certificateTypeStatistical).option
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
    /**
     * 获取导出数据
     */
    async getExportData(queryData,callback) {
      const res = (await getPageList({ ...queryData, isPage: false, enterpriseType: this.enterpriseType }))?.data
      let header = {}
      this.options.forEach(item=>{
        if (item.file !=='file' && item.isShow){
          header[(item.prop || 'no')] = item.label
        }
      })
      let arr = []
      ;(res.records || []).forEach((item,index)=>{
        let row = {}
        this.options.forEach(e=>{
          if (item.file !=='file' && e.isShow){
            row[(e.prop || 'no')] = getValue(e,item[e.prop],index)
          }
        })
        arr.push(row)
      })
      arr.unshift(header)
      callback({ data: [...arr], title: "专职管理人员" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
