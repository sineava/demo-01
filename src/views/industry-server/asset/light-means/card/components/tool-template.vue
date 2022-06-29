<template>
  <el-dropdown style="margin: 0 5px;">
    <el-button size="small" type="primary">
      模板下载<i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="template(1,'房屋类资产导入模板')">房屋</el-dropdown-item>
      <el-dropdown-item @click.native="template(2,'设备类资产导入模板')">设备</el-dropdown-item>
      <el-dropdown-item @click.native="template(3,'文物类资产导入模板')">文物</el-dropdown-item>
      <el-dropdown-item @click.native="template(4,'图书类资产导入模板')">图书</el-dropdown-item>
      <el-dropdown-item @click.native="template(5,'家具类资产导入模板')">家具</el-dropdown-item>
      <el-dropdown-item @click.native="template(6,'动植物类资产导入模板')">动植物</el-dropdown-item>
      <el-dropdown-item @click.native="template(7,'物资类资产导入模板')">物资</el-dropdown-item>
      <el-dropdown-item @click.native="template(101,'构筑物类资产导入模板')">构筑物</el-dropdown-item>
      <el-dropdown-item @click.native="template(102,'土地类资产导入模板')">土地</el-dropdown-item>
      <el-dropdown-item @click.native="template(201,'车辆类资产导入模板')">车辆</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
// 1-房屋/2-设备/3-文物/4-图书/5-家具/6-动植物/7-物资/101-构筑物/102-土地/201-车辆
import htmlToExcel from '@/utils/htmlToExcel'
export default {
  props:{
    button_roles:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      basics_title:[
        // 基础信息 - 通用

        // { label:'资产编号', prop:'onlyCode' },
        { label:'资产名称', prop:'name' },
        { label:'资产大类', prop:'type' }, // 1-房屋/2-设备/3-文物/4-图书/5-家具/6-动植物/7-物资/101-构筑物/102-土地/201-车辆
        { label:'国标编码', prop:'code' },
        { label:'采购组织形式', prop:'organizationalFOP' },
        { label:'取得方式', prop:'makeWay' },
        { label:'取得日期', prop:'makeDate' },
        { label:'投入使用日期', prop:'useDate' },
        { label:'自定义编号', prop:'customNumber' },
        { label:'数量', prop:'number'},
        { label:'预算项目编号', prop:'budgetIN'},
        // 财务信息 - 通用
        { label:'价值类型', prop:'valueType' },
        { label:'价值', prop:'cost' },
        { label:'账面净值', prop:'bookValue' },
        { label:'财政拨款', prop:'funding' },
        { label:'非财政拨款', prop:'noFunding' },
        { label:'财务入账日期', prop:'dateOfFinancialEntry' },
        { label:'财务入账状态', prop:'accountingStatus' },
        { label:'会计凭证号', prop:'accountingCN' },
        { label:'折旧状态', prop:'stateDepreciation' },
        // 其他信息 - 通用
        { label:'管理部门名称', prop:'deptName' },
        { label:'备用字段', prop:'standby' },
        { label:'备注', prop:'remark' },
        // { label:'照片', prop:'filePath' }, // 照片
      ],
      title_1:[
        // 1-房屋
        { label:'坐落位置', prop:'seatingPosition' },
        { label:'产权形式', prop:'propertyRF' }, // 1-有产权/2-无产权/3-产权待界定
        { label:'建筑面积（m2）', prop:'hfloorArea' },
        { label:'其中：取暖面积（m2）', prop:'hheatingArea' },
        { label:'其中：危房面积（m2）', prop:'hdangerousArea' },
        { label:'权属证明', prop:'ownershipCertificate' },
        { label:'权属年限（月）', prop:'tenurePeriod' },
        { label:'权属证号', prop:'ownershipCardNumber' },
        { label:'建筑结构', prop:'hbuildingStructure' },
        { label:'设计用途', prop:'hdesignPurposes' },
        { label:'持证人', prop:'holder' },// (1)本单位、(2)非单位
        { label:'产权分类', prop:'hpropertyClassification' },
        { label:'发证日期', prop:'releaseDate' },
        { label:'自用价值（元）', prop:'selfUseValue' },
        { label:'出借价值（元）', prop:'loanedValue' },
        { label:'出租价值（元）', prop:'leasedValue' },
        { label:'闲置价值（元）', prop:'idleValue' },
        { label:'其他价值（元）', prop:'otherValue' },
      ],
      title_2:[
        // 2-设备
        { label:'设备用途', prop:'eUse' },
        { label:'品牌', prop:'brand' },
        { label:'规格型号', prop:'specifications' },
        { label:'产品序列号', prop:'eserialNo' },
        { label:'生产厂家', prop:'emanufacturer' },
        { label:'经销商', prop:'dealer' },
        { label:'合同编号', prop:'contractNo' },
        { label:'保修截止日期', prop:'warrantyED' },
        { label:'使用状态', prop:'usingState' },
        { label:'使用人', prop:'userThe' },
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'存放地点', prop:'storagePlace' },
      ],
      title_3:[
        // 3-文物
        { label:'来源地', prop:'crSource' },
        { label:'藏品年代', prop:'crCollection' },
        { label:'文物等级', prop:'crLevelOCR' },
        { label:'使用人', prop:'userThe' }, // 1-本单位/2-非单位
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'存放地点', prop:'storagePlace' },
      ],
      title_4:[
        // 4-图书
        { label:'出版社', prop:'bpress' },
        { label:'出版日期', prop:'bpublicationDate' },
        { label:'保存年限（月）', prop:'bshelfLife' },
        { label:'档案号', prop:'bfileNo' },
        { label:'使用人', prop:'userThe' }, // 1-本单位/2-非单位
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'存放地点', prop:'storagePlace' },
      ],
      title_5:[
        // 5-家具
        { label:'品牌', prop:'brand' },
        { label:'规格型号', prop:'specifications' },
        { label:'经销商', prop:'dealer' },
        { label:'保修截止日期', prop:'warrantyED' },
        { label:'使用人', prop:'userThe' }, // 1-本单位/2-非单位
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'存放地点', prop:'storagePlace' },
      ],
      title_6:[
        // 6-动植物
        { label:'预计寿命/栽种年龄', prop:'paLife' },
        { label:'出生/栽种年份', prop:'paYearBirth' },
        { label:'纲属科', prop:'paClassesBTF' },
        { label:'产地', prop:'paPlaceOrigin' },
        { label:'使用人', prop:'userThe' }, // 1-本单位/2-非单位
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'存放地点', prop:'storagePlace' },
      ],
      title_7:[
        // 7-物资
      ],
      title_101:[
        // 101-土地
        { label:'使用权面积（m2）', prop:'lareaOUR' },
        { label:'其中：独用面积（m2）', prop:'laloneWTA' },
        { label:'产权形式', prop:'propertyRF' },// (1)有产权、(2)无产权、(3)产权待界定
        { label:'权属证明', prop:'ownershipCertificate' }, // 权属证明(默认：中华人民共和国国有土地使用证)
        { label:'权属性质', prop:'lOwnershipNature' }, // 权属性质(1)国有、(2)集体
        { label:'权属证号', prop:'ownershipCardNumber' }, // 权属证号
        { label:'权属年限（月）', prop:'tenurePeriod' }, // 权属年限（月）
        { label:'持证人', prop:'holder' }, // 持证人:(1)本单位、(2)非单位
        { label:'发证日期', prop:'releaseDate' }, // 发证日期
        { label:'使用权性质', prop:'lnatureOUR' }, // 使用权性质:(1)出让、(2)划拨、(3)租赁、(4)其他
        { label:'分摊面积（m2）', prop:'lsharingArea' }, // 分摊面积（m2）
        { label:'土地级次', prop:'llandGrades' }, // 土地级次
        { label:'坐落位置', prop:'seatingPosition' }, // 坐落位置
        { label:'自用面积（m2）', prop:'selfUseArea' }, // 自用面积（m2）
        { label:'自用价值（元）', prop:'selfUseValue' }, // 自用价值（元）
        { label:'出借面积（m2）', prop:'loanedArea' }, // 出借面积（m2）
        { label:'出借价值（元）', prop:'loanedValue' }, // 出借价值（元）
        { label:'出租价值（元）', prop:'leasedArea' }, // 出租面积（m2）
        { label:'出租价值（元）', prop:'leasedValue' }, // 出租价值（元）
        { label:'闲置面积（m2）', prop:'idleArea' }, // 闲置面积（m2）
        { label:'闲置价值（元）', prop:'idleValue' }, // 闲置价值（元）
      ],
      title_102:[
        // 102-构筑物
        { label:'竣工日期', prop:'scompletionDate' },
        { label:'权属性质', prop:'lOwnershipNature' },
        { label:'构筑物计量', prop:'lmeasurementStructures' },
        { label:'坐落位置', prop:'seatingPosition' },
      ],
      title_201:[
        // 201-车辆
        { label:'编制情况', prop:'vwovenSituation' }, // 编制情况：1在编、2不在编、3未核定车编
        { label:'车牌号', prop:'vlicensePN' }, // 车牌号
        { label:'规格型号', prop:'specifications' },
        { label:'汽车排放量', prop:'vehicleEmissions' }, // 汽车排放量:(1)1.6（含）以下、(2)1.6-1.8（含）以下、(3)2.0-2.5（含）以下、(4)2.5（含）以下、新能源、柴油车
        { label:'车辆品牌', prop:'vehicleBrand' },
        { label:'车辆行驶证', prop:'vehicleLicense' }, // 车辆行驶证:1有、0无
        { label:'持证人', prop:'holder' }, // 持证人:(1)本单位、(2)非单位
        { label:'注册登记日期', prop:'vregistrationDate' }, // 注册登记日期
        { label:'发动机号', prop:'vengineNo' },
        { label:'车辆识别代码', prop:'vehicleIC' },
        { label:'经销商', prop:'dealer' },
        { label:'合同编号', prop:'contractNo' },
        { label:'投入使用日期', prop:'vcommissioningDate' },
        { label:'保修截止日期', prop:'warrantyED' },
        { label:'发票号', prop:'invoiceNo' },
        { label:'使用状态', prop:'usingState' },
        { label:'使用人', prop:'userThe' },
        { label:'使用部门名称', prop:'useDeptName' },
        { label:'车辆用途', prop:'vehicleUse' },// 车辆用途:（1）副部（省）级级以上领导用车、（2）机要通讯用车、（3）应急保障用车、（4）执法执勤用车、（5）特种专业技术用车、（6）离退休干部用车、（7）其他用车
        { label:'执法执勤用车分类', prop:'vehicleClassification' },
        { label:'是否喷涂执法执勤标识', prop:'vIsMark' }, // (0-否，1-是)
        { label:'本年行驶里程（km）', prop:'vcurrentYearMileage' },
        { label:'已使用年限（月）', prop:'serviceLife' },
      ]
    }
  },
  created() {
  },
  methods: {
    template(item,name){
      this.exportData(this[`title_${item}`],name)
    },
    // 获取导出数据
    getExportData(headerTitleArray){
      const header = []
      this.basics_title.forEach(item=>{
        header[item.prop] = item.label
      })
      headerTitleArray.forEach(item=>{
        header[item.prop] = item.label
      })
      return [header]
    },
    // 导出表格
    exportData(dataArray,title) {
      const data = this.getExportData(dataArray)
      htmlToExcel.getJsonExcel(data, `${title}-${new Date()}`)
    },
  }
}
</script>

