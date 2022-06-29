<template>
  <!-- v-if="button_roles.create" -->
  <el-button
    type="primary"
    size="small"
    @click="handle"
  >
    导出数据
  </el-button>
</template>

<script>
import htmlToExcel from '@/utils/htmlToExcel'
import { getCardExcel } from '@/api/means/card'
export default {
  props:{
    button_roles:{
      type:Object,
      default:()=>{}
    },
    search:{
      type:Object,
      default:()=>{}
    },
    talbeTitle:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      loading:'',
    }
  },
  created() {
  },
  methods: {
    handle(){
      this.loading = this.$loading({
        lock: true,
        text: '文件下载中请稍后..',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      getCardExcel({
        name:this.search.name,
        type:this.search.type
      }).then(res=>{
        this.exportData(res.data || [])
        this.loading.close()
      })
    },
    filter(item,key){
      if (!key || !item || item[key]==='' || item[key]===null || item[key]===undefined){
        return ''
      }
      let name = ''
      switch (key) {
      case 'type':
        name = this.getType(item[key])
        break
      case 'propertyRF':
        name = this.getPropertyRF(item[key])
        break
      case 'holder':
        name = Number(item[key]) === 1 ? '本单位' : '非单位'
        break
      case 'lNatureOUR':
        name = this.getLNatureOUR(item[key])
        break
      case 'lOwnershipNature':
        if (Number(item['type'])===101){
          name = Number(item[key]) === 1 ? '国有' : '集体'
        } else {
          name = item[key]
        }
        break
      case 'vehicleEmissions':
        name = this.getVehicleEmissions(item[key])
        break
      case 'vehicleLicense':
        name = Number(item[key]) === 1 ? '有' : '无'
        break
      case 'vIsMark':
        name = Number(item[key]) === 1 ? '是' : '否'
        break
      case 'vehicleUse':
        name = this.getVehicleUse(item[key])
        break
      default:
        name = item[key]
        break
      }
      return name
    },
    getVehicleUse(vehicleUse){
      let name = ''
      switch (Number(vehicleUse)) {
      case 1:
        name = '副部（省）级级以上领导用车'
        break
      case 2:
        name = '机要通讯用车'
        break
      case 3:
        name = '应急保障用车'
        break
      case 4:
        name = '执法执勤用车'
        break
      case 5:
        name = '特种专业技术用车'
        break
      case 6:
        name = '离退休干部用车'
        break
      default:
        name = '其他用车'
        break
      }
      return name
    },
    getVehicleEmissions(vehicleEmissions){
      let name = ''
      switch (Number(vehicleEmissions)) {
      case 1:
        name = '1.6（含）以下'
        break
      case 2:
        name = '1.6-1.8（含）以下'
        break
      case 3:
        name = '2.0-2.5（含）以下'
        break
      case 4:
        name = '2.5（含）以下'
        break
      default:
        name = '新能源、柴油车'
        break
      }
      return name
    },
    getLNatureOUR(lNatureOUR){
      if (lNatureOUR===''){
        return ''
      }
      let name = ''
      switch (Number(lNatureOUR)) {
      case 1:
        name = '出让'
        break
      case 2:
        name = '划拨'
        break
      case 3:
        name = '租赁'
        break
      default:
        name = '其他'
        break
      }
      return name
    },
    getPropertyRF(propertyRF){
      if (propertyRF===''){
        return ''
      }
      let name = ''
      switch (Number(propertyRF)) {
      case 1:
        name = '有产权'
        break
      case 2:
        name = '无产权'
        break
      default:
        name = '产权待界定'
        break
      }
      return name
    },
    getType(type){
      let name = ''
      switch (Number(type)) {
      case 1:
        name = '房屋'
        break
      case 2:
        name = '设备'
        break
      case 3:
        name = '文物'
        break
      case 4:
        name = '图书'
        break
      case 5:
        name = '家具'
        break
      case 6:
        name = '动植物'
        break
      case 7:
        name = '物资'
        break
      case 101:
        name = '构筑物'
        break
      case 102:
        name = '土地'
        break
      default:
        name = '车辆'
        break
      }
      return name
    },
    // 获取导出数据
    getExportData(dataArr){
      const header = [
        '资产编号','资产大类','资产分类','资产名称','财务入账日期','会计凭证号','取得日期','价值类型','数量','单价','价值','财政性资金','非财政性资金','取得方式','使用状况'
        ,'使用部门','管理部门','存放地点','使用人','面积',
        // '制单人','制单时间', // 没有这两个字段
        '规格型号','产权形式','产权分类','折旧状态',
        // '折旧方法','累计折旧','净值', // 没有保存
        '折旧年限','自定义编号','备注',
        '其中：取暖面积（m2）','其中：危房面积（m2）',
        '车辆持证人','车辆识别号','发动机号','编织情况','权属年限','发证日期',
        '建筑结构','竣工日期','已使用年限（月）','设备用途','投入使用日期','采购组织形式',
        '生产厂家','经销商','合同编号','发票号','备用字段'
      ]
      const data = [header]
      dataArr.forEach((item,index)=>{
        let items = [
          this.filter(item,'onlyCode'),
          this.filter(item,'type'),
          this.filter(item,'typeName'),
          this.filter(item,'dateOfFinancialEntry'),
          this.filter(item,'accountingCN'),
          this.filter(item,'makeDate'),
          this.filter(item,'valueType'),
          this.filter(item,'number'),
          this.filter(item,'unitPrice'),
          this.filter(item,'cost'),
          this.filter(item,'funding'),
          this.filter(item,'noFunding'),
          this.filter(item,'makeWay'),
          this.filter(item,'usingState'),
          this.filter(item,'useDeptName'),
          this.filter(item,'deptName'),
          this.filter(item,'storagePlace'),
          this.filter(item,'userThe'),
          this.filter(item,'hfloorArea'),
          this.filter(item,'specifications'),
          this.filter(item,'propertyRF'),
          this.filter(item,'hpropertyClassification'),
          this.filter(item,'stateDepreciation'),
          this.filter(item,'depreciationLife'),
          this.filter(item,'customNumber'),
          this.filter(item,'remark'),
          this.filter(item,'hheatingArea'),
          this.filter(item,'hdangerousArea'),
          this.filter(item,'holder'),
          this.filter(item,'vehicleIC'),
          this.filter(item,'vengineNo'),
          this.filter(item,'vwovenSituation'),
          this.filter(item,'tenurePeriod'),
          this.filter(item,'releaseDate'),
          this.filter(item,'hbuildingStructure'),
          this.filter(item,'scompletionDate'),
          this.filter(item,'serviceLife'),
          this.filter(item,'euse'),
          this.filter(item,'useDate'),
          this.filter(item,'organizationalFOP'),
          this.filter(item,'emanufacturer'),
          this.filter(item,'dealer'),
          this.filter(item,'contractNo'),
          this.filter(item,'invoiceNo'),
          this.filter(item,'standby'),
        ]
        data.push(items)
      })
      return data
    },
    // 导出表格
    exportData(dataArray) {
      const data = this.getExportData(dataArray)
      htmlToExcel.getJsonExcel(data, `资产卡片-${new Date()}`)
    },
  }
}
</script>

