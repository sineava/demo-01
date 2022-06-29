<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理人员数据统计</span>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <Screen
            src="Screen"
            :buttonRoles="bRoles"
            :searchData="searchData"
            height="837px"
            @fetchData="init"
            @getExportData="getExportData"
          />
        </el-col>
        <el-col :span="18">
          <el-card class="topic-card">
            <el-row :gutter="10">
              <el-col :span="6">
            人员总数：<span>{{ info.personSum }}</span>
              </el-col>
              <el-col :span="6">
            男：<span>{{ info.boysSum }}</span>
              </el-col>
              <el-col :span="6">
            女：<span>{{ info.girlSum }}</span>
              </el-col>
            </el-row>
          </el-card>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>年龄统计</span>
                </div>
                <div class="topic-card" style="height: 232px;">
                  <p>平均年龄: {{ info.ageAvg }}</p>
                  <p>最大年龄: {{ info.ageMax }}</p>
                  <p>最小年龄: {{ info.ageMin }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="9">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>年龄占比</span>
                </div>
                <Charts :option="ageOption" style="height: 250px;" />
              </el-card>
            </el-col>
            <el-col :span="9">
              <el-card class="card-m">
                <div slot="header" class="clearfix">
                  <span>年龄人数</span>
                </div>
                <Charts :option="ageBarOption" style="height: 250px;" />
              </el-card>
            </el-col>
          </el-row>
          <el-card class="card-m">
            <div slot="header" class="clearfix">
              <span>机构人数统计</span>
            </div>
            <Charts :option="orgOption" :style="`height:${chartsHeight}px`" />
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
import { getValue } from '@/utils/index'
import { getInBasic } from '@/api/general-services/manager-statistics/manager-statistics'
import { getStatisticalPageList, exportList } from '@/api/general-services/supervisory-capability/management-person'
import Charts from '@/components/Charts/index'
import pagination from '@/components/Pagination'
// import DownUpload from '@/components/features/DownUpload'
import Screen from '@/views/components/topic/screen.vue'
import TopicTable from '@/views/components/topic/table.vue'
export default {
  components: {
    Charts,
    pagination,
    // DownUpload,
    Screen,
    TopicTable
  },
  data() {
    return {
      list: [],
      loading: true,
      currentPage: 1,
      pageSize: 20,
      bRoles:{},
      total: 0,
      info: {},
      chartsHeight:300,
      searchData:[
        {label:'姓名',prop:'name',form:'input',condition:'like',data:''},
        {label:'性别',prop:'sex',form:'select',condition:'eq',data:'',
          option:[
            {label:'男',value:1},{label:'女',value:2}
          ]
        },
        {label:'出生年月',prop:'birthDate',form:'date',condition:'eq',data:'',type:'month',format:'yyyy-MM'},
        {label:'所属机构',prop:'departmentName',form:'input',condition:'like',data:''},
        {label:'身份证号',prop:'idCard',form:'input',condition:'like',data:''},
        {label:'联系电话',prop:'phone',form:'input',condition:'like',data:''},
        {label:'电子邮件',prop:'email',form:'input',condition:'like',data:''},
      ],
      options:[
        {label:'序号',type:'index',isShow:true },
        {label:'姓名',type:'text',isShow:true,prop:'name'},
        {label:'性别',type:'tag',isShow:true,prop:'sex',payload:[
          {value:'1',label:'男',tag:''},
          {value:'2',label:'女',tag:'danger'},
        ]},
        {label:'身份证号',type:'text',isShow:true,prop:'idCard'},
        {label:'出生年月',type:'text',isShow:true,prop:'birthDate'},
        {label:'所属机构',type:'text',isShow:true,prop:'departmentName'},
        {label:'职务',type:'text',isShow:true,prop:'post'},
        {label:'联系电话',type:'text',isShow:true,prop:'phone'},
        {label:'联系地址',type:'text',isShow:true,prop:'address'},
        {label:'电子邮件',type:'text',isShow:true,prop:'email'},
        {label:'传真',type:'text',isShow:true,prop:'fax'},
        {label:'备注',type:'text',isShow:true,prop:'remark'},
        {label:'适任证书类型',type:'text',isShow:true,prop:'certificateType'},
        {label:'适任证书编号',type:'text',isShow:true,prop:'certificateCode'},
      ],
      ageOption: {},
      ageBarOption: {},
      orgOption: {},
      queryData:{}
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  created() {
    this.bRoles = this.button_roles
    this.fetchData()
    this.topicAeg()
  },
  methods: {
    init(queryData) {
      this.pageNum = 1
      this.fetchData(queryData)
      this.topicAeg(queryData)
    },
    toDecimal(x) {
      let f = parseFloat(x)
      if (isNaN(f)) {
        return
      }
      f = Math.round(x*100)/100
      return f
    },
    // 人员统计
    topicAeg(queryData){
      if(queryData){
        this.queryData = queryData
      }
      getInBasic(queryData).then(res=>{
        this.info = {
          personSum: res.data.personSum,
          girlSum: res.data.girlSum,
          boysSum: res.data.boysSum,
          ageAvg: res.data.ageAvg,
          ageMax: res.data.ageMax,
          ageMin: res.data.ageMin
        }
        let ageData = [
          { value: res.data.betweenOne > 0 ? this.toDecimal((res.data.betweenOne / res.data.personSum) * 100) : 0, name: '0~25' },
          { value: res.data.betweenTwo > 0 ? this.toDecimal((res.data.betweenTwo / res.data.personSum) * 100) : 0, name: '26~30' },
          { value: res.data.betweenThree > 0 ? this.toDecimal((res.data.betweenThree / res.data.personSum) * 100) : 0, name: '31~35' },
          { value: res.data.betweenFour > 0 ? this.toDecimal((res.data.betweenFour / res.data.personSum) * 100) : 0, name: '36~40' },
          { value: res.data.betweenFive > 0 ? this.toDecimal((res.data.betweenFive / res.data.personSum) * 100) : 0, name: '41~45' },
        ]
        ageData.push(
          { value: this.toDecimal(100-ageData[0].value-ageData[1].value-ageData[2].value-ageData[3].value-ageData[4].value), name: '45以上' },
        )
        this.ageOption = new Ring(ageData,'年龄占比(%)').option
        this.ageBarOption = new Bar(
          ['0~25','26~30','31~35','36~40','41~45','45以上'],
          [res.data.betweenOne,
            res.data.betweenTwo,
            res.data.betweenThree,
            res.data.betweenFour,
            res.data.betweenFive,
            res.data.betweenSix
          ],
          {top: '30px',left: '4%',right: '40px',bottom: '40px',containLabel: true},
          0,
          '(人)',
          '年龄'
        ).option
        let eName = []
        let eValue= []
        res.data.departmentVoList.forEach(item=>{
          eName.push(item.type)
          eValue.push(item.count)
        })
        this.orgOption = new Bar(eName, eValue,{top: '30px',left: '20px',right: '65px',bottom: eName.length>25 ? '40px' : '30px',containLabel: true},eName.length>10?90:0,'单位(人)','应急机构').option
      })
    },
    async fetchData(queryData) {
      if(queryData){
        this.queryData = queryData
      }
      this.queryData.pageNum = this.currentPage
      this.queryData.pageSize = this.pageSize
      this.loading = true
      getStatisticalPageList(this.queryData).then(res=>{
        this.loading = false
        if (res.code === '0') {
          this.loading = false
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
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
      exportList(queryData).then(res => {
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
        callback({ data: [...arr], title: "管理人员" })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/toip.scss";
</style>
