// 判断是否是空
export function isNulls(val){
  if (val===undefined || val===null || val==='' || val===false){
    return false
  }
  return val
}
// 批量空验证
export function batchNull(item,array){
  let isNull = true
  for (let i=0; i<array.length; i++){
    if (isNulls(item[array[i]])===false){
      isNull = false
      return isNull
    }
  }
  return isNull
}
// 基础信息验证
export function basics(data) {
  // 基础信息
  if (!batchNull(data,['typeId','name','organizationalFOP','makeWay','makeDate','number'])){
    return false
  }
  return {
    id: data && data.id ? data.id : '',// 主键
    versionNumber: data && data.versionNumber ? data.versionNumber : '', // 版本号
    typeId:  data && data.typeId ? data.typeId : '',// 国标分类编号
    name:  data && data.name ? data.name : '',// 资产名称
    organizationalFOP:  data && data.organizationalFOP ? data.organizationalFOP : '',// 采购组织形式
    budgetIN:  data && data.budgetIN ? data.budgetIN : '',// 预算项目编号
    makeWay: data && data.makeWay ? data.makeWay : '',// 取得方式
    makeDate:  data && data.makeDate ? data.makeDate : '',// 取得日期
    useDate: data && data.useDate ? data.useDate : '',// 投入使用日期
    customNumber: data && data.customNumber ? data.customNumber : '',// 自定义编号
    number: data && data.number ? data.number : 0,// 数量
  }
}

// 财政信息
export function finance(data) {
  // 基础信息
  if (!batchNull(data,['valueType','dateOfFinancialEntry','accountingStatus','accountingCN','stateDepreciation'])){
    return false
  }
  return {
    valueType: data && data.valueType ? data.valueType : '',// 价值类型
    funding: data && data.funding ? data.funding : 0,// 财政拨款
    cost: data && data.cost ? data.cost : 0,// 价值
    noFunding: data && data.noFunding ? data.noFunding : 0,// 非财政拨款
    dateOfFinancialEntry: data && data.dateOfFinancialEntry ? data.dateOfFinancialEntry : '',// 财务入账日期
    accountingCN: data && data.accountingCN ? data.accountingCN : '',// 会计凭证号
    depreciationLife:data && data.depreciationLife ? data.depreciationLife : 0, // 折旧年限（月）
    stateDepreciation: data && data.stateDepreciation ? data.stateDepreciation : '',// 折旧状态
    bookValue: data && data.bookValue ? data.bookValue : 0,// 账面净值
    accountingStatus: data && data.accountingStatus ? data.accountingStatus : '',// 财务入账状态
  }
}

// 使用信息【其他信息】
export function use(data,aType) {
  // 基础信息
  if (!batchNull(data,['deptId'])){
    return false
  }
  const currency = {
    deptId: data && data.deptId ? data.deptId : '', // 管理部门编号
    deptName: data && data.deptName ? data.deptName : '',// 管理部门名称
    standby: data && data.standby ? data.standby : '',// 备用字段
    remark: data && data.remark ? data.remark : '',// 备注
    filePath: data && data.filePath ? data.filePath : ''// 照片
  }
  let other = {}
  switch (Number(aType)) {
  case 1: // 1-房屋 housingInfoDto
    other = {
      selfUseValue: data && data.selfUseValue ? data.selfUseValue : 0, // 自用价值（元）
      loanedValue: data && data.loanedValue ? data.loanedValue : 0,// 出借价值（元）
      leasedValue: data && data.leasedValue ? data.leasedValue : 0, // 出租价值（元）
      idleValue: data && data.idleValue ? data.idleValue : 0,// 闲置价值（元）
      otherValue: data && data.otherValue ? data.otherValue : 0,// 其他价值（元）
    }
    break
  case 2: // 2-设备 equipmentInfoDto
    if (!batchNull(data,['usingState','useDeptId','storagePlace','userThe'])){
      return false
    }
    other = {
      usingState: data && data.usingState ? data.usingState : '',// 使用状态
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
      userThe: data && data.userThe ? data.userThe : '',// 使用人
    }
    break
  case 3: // 3-文物 culturalRelicsInfoDto
    if (!batchNull(data,['useDeptId','storagePlace','userThe'])){
      return false
    }
    other = {
      userThe:  data && data.userThe ? data.userThe : '',// 使用人
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
    }
    break
  case 4: // 4-图书 bookInfoDto
    if (!batchNull(data,['useDeptId','storagePlace','userThe'])){
      return false
    }
    other = {
      userThe:  data && data.userThe ? data.userThe : '',// 使用人
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
    }
    break
  case 5: // 5-家具 furnitureInfoDto
    if (!batchNull(data,['useDeptId','storagePlace','userThe'])){
      return false
    }
    other = {
      userThe:  data && data.userThe ? data.userThe : '',// 使用人
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
    }
    break
  case 6: // 6-动植物 plantAnimalInfoDto
    if (!batchNull(data,['useDeptId','storagePlace'])){
      return false
    }
    other = {
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
    }
    break
  case 7: // 7-物资 suppliesInfoDto

    break
  case 101: // 101-构筑物 structuresInfoDto

    break
  case 102: // 102-土地 landInfoDto
    other = {
      selfUseArea: data && data.selfUseArea ? data.selfUseArea : 0,// 自用面积（m2）
      selfUseValue: data && data.selfUseValue ? data.selfUseValue : 0,// 自用价值（元）
      loanedArea: data && data.loanedArea ? data.loanedArea : 0,// 出借面积（m2）
      loanedValue: data && data.loanedValue ? data.loanedValue : 0,// 出借价值
      leasedArea: data && data.leasedArea ? data.leasedArea : 0,// 出租面积（m2）
      leasedValue: data && data.leasedValue ? data.leasedValue : 0,// 出租价值（元）
      idleArea: data && data.idleArea ? data.idleArea : 0,// 闲置面积（m2）
      idleValue: data && data.idleValue ? data.idleValue : 0,// 闲置价值（元）
    }
    break
  case 201: // 201-车辆 vehicleInfoDto
    if (!batchNull(data,['usingState','userThe','useDeptId','vehicleUse'])){
      return false
    }
    other = {
      usingState: data && data.usingState ? data.usingState : '',// 使用状态
      userThe: data && data.userThe ? data.userThe : '',// 使用人
      useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
      useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
      vehicleUse: data && data.vehicleUse ? data.vehicleUse : '',// 车辆用途:（1）副部（省）级级以上领导用车、（2）机要通讯用车、（3）应急保障用车、（4）执法执勤用车、（5）特种专业技术用车、（6）离退休干部用车、（7）其他用车
      vehicleClassification: data && data.vehicleClassification ? data.vehicleClassification : '',// 执法执勤用车分类
      visMark: data && data.visMark ? data.visMark : '',// 是否喷涂执法执勤标识(0-否，1-是)
      vcurrentYearMileage: data && data.vcurrentYearMileage ? data.vcurrentYearMileage : 0,// 本年行驶里程
      serviceLife: data && data.serviceLife ? data.serviceLife : 0,// 已使用年限（月）
    }
    break
  default:
    break
  }
  return Object.assign(currency, other)
}

// 使用信息【其他信息】
export function others(data,aType) {
  let other = {}
  switch (Number(aType)) {
  case 1: // 1-房屋 housingInfoDto
    if (!batchNull(data,['propertyRF','ownershipCertificate','ownershipCardNumber','hbuildingStructure','hpropertyClassification','releaseDate','seatingPosition'])){
      return false
    }
    other = {
      propertyRF: data && data.propertyRF ? data.propertyRF : '',// 产权形式
      hfloorArea:  data && data.hfloorArea ? data.hfloorArea : 0,// 建筑面积（m2）
      hheatingArea:  data && data.hheatingArea ? data.hheatingArea : 0,// 其中：取暖面积（m2）
      hdangerousArea:  data && data.hdangerousArea ? data.hdangerousArea : 0,// 其中：危房面积（m2）
      ownershipCertificate: data && data.ownershipCertificate ? data.ownershipCertificate : '',// 权属证明(默认：中华人民共和国国有土地使用证)
      tenurePeriod: data && data.tenurePeriod ? data.tenurePeriod : 0,// 权属年限（月）
      ownershipCardNumber: data && data.ownershipCardNumber ? data.ownershipCardNumber : '',// 权属证号
      hbuildingStructure: data && data.hbuildingStructure ? data.hbuildingStructure : '',// 建筑结构
      hdesignPurposes: data && data.hdesignPurposes ? data.hdesignPurposes : '',// 设计用途
      hpropertyClassification: data && data.hpropertyClassification ? data.hpropertyClassification : '',// 产权分类
      holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
      releaseDate: data && data.releaseDate ? data.releaseDate : '',// 发证日期
      seatingPosition:data && data.seatingPosition ? data.seatingPosition : '',// 坐落位置
    }
    break
  case 2: // 2-设备 equipmentInfoDto
    if (!batchNull(data,['euse','specifications','warrantyED'])){
      return false
    }
    other = {
      euse: data && data.euse ? data.euse : '',// 设备用途
      brand:  data && data.brand ? data.brand : '',// 品牌
      specifications:  data && data.specifications ? data.specifications : '',// 规格型号
      eserialNo:  data && data.eserialNo ? data.eserialNo : '',// 产品序列号
      emanufacturer: data && data.emanufacturer ? data.emanufacturer : '',// 生产厂家
      dealer: data && data.dealer ? data.dealer : '',// 经销商
      contractNo: data && data.contractNo ? data.contractNo : '',// 合同编号
      warrantyED: data && data.warrantyED ? data.warrantyED : '',// 保修截止日期
      invoiceNo: data && data.invoiceNo ? data.invoiceNo : '',// 发票号
    }
    break
  case 3: // 3-文物 culturalRelicsInfoDto
    if (!batchNull(data,['crSource','crCollection','crLevelOCR'])){
      return false
    }
    other = {
      crSource: data && data.crSource ? data.crSource : '',// 来源地
      crCollection:  data && data.crCollection ? data.crCollection : '',// 藏品年代
      crLevelOCR:  data && data.crLevelOCR ? data.crLevelOCR : '',// 文物等级
    }
    break
  case 4: // 4-图书 bookInfoDto
    if (!batchNull(data,['bpublicationDate','bfileNo'])){
      return false
    }
    other = {
      bpress: data && data.bpress ? data.bpress : '',// 出版社
      bpublicationDate: data && data.bpublicationDate ? data.bpublicationDate : '',// 出版日期
      bshelfLife: data && data.bshelfLife ? data.bshelfLife : 0,// 保存年限（月）
      bfileNo: data && data.bfileNo ? data.bfileNo : '',// 档案号
    }
    break
  case 5: // 5-家具 furnitureInfoDto
    if (!batchNull(data,['specifications','warrantyED'])){
      return false
    }
    other = {
      brand: data && data.brand ? data.brand : '',// 品牌
      specifications: data && data.specifications ? data.specifications : '',// 规格型号
      dealer: data && data.dealer ? data.dealer : '',// 经销商
      warrantyED: data && data.warrantyED ? data.warrantyED : '',// 保修截止日期
      depreciationLife:data && data.depreciationLife ? data.depreciationLife : 0,// 折旧年限（月）
    }
    break
  case 6: // 6-动植物 plantAnimalInfoDto
    if (!batchNull(data,['paLife','paYearBirth','paClassesBTF','paPlaceOrigin'])){
      return false
    }
    other = {
      paLife: data && data.paLife ? data.paLife : '',// 预计寿命/栽种年龄
      paYearBirth: data && data.paYearBirth ? data.paYearBirth : '',// 出生/栽种年份
      paClassesBTF: data && data.paClassesBTF ? data.paClassesBTF : '',// 纲属科
      paPlaceOrigin: data && data.paPlaceOrigin ? data.paPlaceOrigin : '',// 产地
    }
    break
  case 7: // 7-物资 suppliesInfoDto

    break
  case 101: // 101-构筑物 structuresInfoDto

    break
  case 102: // 102-土地 landInfoDto
    if (!batchNull(data,['propertyRF','lownershipNature','holder','releaseDate','lnatureOUR','ltypeName','llandGrades','seatingPosition'])){
      return false
    }
    other = {
      lareaOUR: data && data.lareaOUR ? data.lareaOUR : 0,// 使用权面积（m2）
      laloneWTA:  data && data.laloneWTA ? data.laloneWTA : 0,// 其中：独用面积（m2）
      propertyRF:  data && data.propertyRF ? data.propertyRF : '',// 产权形式:(1)有产权、(2)无产权、(3)产权待界定
      ownershipCertificate:  data && data.ownershipCertificate ? data.ownershipCertificate : '',// 权属证明(默认：中华人民共和国国有土地使用证)
      lownershipNature: data && data.lownershipNature ? data.lownershipNature : '',// 权属性质:(1)国有、(2)集体
      ownershipCardNumber: data && data.ownershipCardNumber ? data.ownershipCardNumber : '',// 权属证号
      tenurePeriod: data && data.tenurePeriod ? data.tenurePeriod : 0,// 权属年限（月）
      holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
      releaseDate: data && data.releaseDate ? data.releaseDate : '',// 发证日期
      lnatureOUR: data && data.lnatureOUR ? data.lnatureOUR : '',// 使用权性质:(1)出让、(2)划拨、(3)租赁、(4)其他
      lsharingArea: data && data.lsharingArea ? data.lsharingArea : 0,// 分摊面积（m2）
      ltypeName: data && data.ltypeName ? data.ltypeName : '',// 地类（用途）国标分类名称自动带出
      llandGrades: data && data.llandGrades ? data.llandGrades : '',// 土地级次
      seatingPosition: data && data.seatingPosition ? data.seatingPosition : '',// 坐落位置
    }
    break
  case 201: // 201-车辆 vehicleInfoDto
    if (!batchNull(data,['vwovenSituation','vlicensePN','specifications','vehicleEmissions','vehicleBrand','vehicleLicense','holder','vregistrationDate','vengineNo','vehicleIC','vcommissioningDate','warrantyED','invoiceNo'])){
      return false
    }
    other = {
      vwovenSituation: data && data.vwovenSituation ? data.vwovenSituation : '',// 编织情况：1在编、2不在编、3未核定车编
      vlicensePN:  data && data.vlicensePN ? data.vlicensePN : '',// 车牌号
      specifications:  data && data.specifications ? data.specifications : '',// 规格型号
      vehicleEmissions:  data && data.vehicleEmissions ? data.vehicleEmissions : '',// 汽车排放量:(1)1.6（含）以下、(2)1.6-1.8（含）以下、(3)2.0-2.5（含）以下、(4)2.5（含）以下、新能源、柴油车
      vehicleBrand: data && data.vehicleBrand ? data.vehicleBrand : '',// 车辆品牌
      vehicleLicense: data && data.vehicleLicense ? data.vehicleLicense : '',// 车辆行驶证:1有、0无
      holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
      vregistrationDate: data && data.vregistrationDate ? data.vregistrationDate : '',// 注册登记日期
      vengineNo: data && data.vengineNo ? data.vengineNo : '',// 发动机号
      vehicleIC: data && data.vehicleIC ? data.vehicleIC : '',// 车辆识别代码
      dealer: data && data.dealer ? data.dealer : '',// 经销商
      contractNo: data && data.contractNo ? data.contractNo : '',// 合同编号
      vcommissioningDate: data && data.vcommissioningDate ? data.vcommissioningDate : '',// 投入使用日期
      warrantyED: data && data.warrantyED ? data.warrantyED : '',// 保修截止日期
      invoiceNo: data && data.invoiceNo ? data.invoiceNo : '',// 发票号
    }
    break
  default:
    return false
  }
  return Object.assign(other)
}
