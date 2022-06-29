/**
 *
 * 风险值颜色表
 * @export
 * @return {*}
 */
export function riskColor() {
  return [
    '#FF0000', // 红色 - 高风险 - 一级
    '#f2bd00', // 黄色 - 较高风险 - 二级
    '#f27900', // 橙色 - 一般风险 - 三级
    '#60aef2', // 蓝色 - 较低风险 - 四级
    '#0e6f5d', // 绿色 - 低风险 - 五级
  ]
}
/**
 *
 * 风险值颜色表
 * @export
 * @return {*}
 */
 export function riskName() {
  return [
    '红色', // 红色 - 高风险 - 一级
    '黄色', // 黄色 - 较高风险 - 二级
    '橙色', // 橙色 - 一般风险 - 三级
    '蓝色', // 蓝色 - 较低风险 - 四级
    '绿色', // 绿色 - 低风险 - 五级
  ]
}
/**
 *
 * 风险值颜色表
 * @export
 * @return {*}
 */
 export function levelColor() {
  return [
    '#0e6f5d', // 绿色 - 低风险 - 一级
    '#60aef2', // 蓝色 - 较低风险 - 二级
    '#f27900', // 橙色 - 一般风险 - 三级
    '#f2bd00', // 黄色 - 较高风险 - 四级
    '#FF0000', // 红色 - 高风险 - 五级
  ]
}
/**
 *
 * 风险值颜色名称表
 * @export
 * @return {*}
 */
 export function levelName() {
  return [
    '绿色', // 绿色 - 低风险 - 一级
    '蓝色', // 蓝色 - 较低风险 - 二级
    '橙色', // 橙色 - 一般风险 - 三级
    '黄色', // 黄色 - 较高风险 - 四级
    '红色', // 红色 - 高风险 - 五级
  ]
}
export function getLevelNameToColor(type,name){
  let color = ''
  if(type==1){
    switch(name){
      case '高风险':
        color = '#FF0000';
        break;
      case '较高风险':
        color = '#60aef2';
        break;
      case '一般风险':
        color = '#f27900';
        break;
      case '较低风险':
        color = '#60aef2';
        break;
      case '低风险':
        color = '#0e6f5d';
        break;
    }
  }else{
    switch(name){
      case '高水平':
        color = '#0e6f5d';
        break;
      case '较高水平':
        color = '#f2bd00';
        break;
      case '一般水平':
        color = '#f27900';
        break;
      case '较低水平':
        color = '#f2bd00';
        break;
      case '低水平':
        color = '#FF0000';
        break;
    }
  }
  return color
}
/**
 *筛选条件选择配置
 */
export const getConditionOpt = (opt) => {
  let condition = [
    {label:'包含',value:'like'}, // 模糊查询
    {label:'等于',value:'eq'},
    {label:'不等于',value:'ne'},
    {label:'大于',value:'gt'},
    {label:'小于',value:'lt'},
    {label:'大于等于',value:'ge'},
    {label:'小于等于',value:'le'},
    {label:'包含',value:'in'}, // 多条件查询
  ]
  if (!opt || opt.length===0){
    return condition
  }
  let conditionOpt = []
  condition.forEach(item=>{
    if (opt.indexOf(item.value)!==-1){
      conditionOpt.push(item)
    }
  })
  return conditionOpt
}

// 证件类型
export const getDocumentTypeOptions = () => {
  return [
    {value: '1',label: '身份证'},
    {value: '2',label: '中国人民解放军军人身份证件'},
    {value: '3',label: '中国人民武装警察身份证件'},
    {value: '4',label: '港澳居民来往内地通行证'},
    {value: '5',label: '台湾居民来往大陆通行证'},
    {value: '6',label: '护照'},
    {value: '9',label: '其他有效身份证件'},
  ]
}
// 状态
export const getCertificateStatusOptions = () => {
  return [
    {value: '1',label: '存续'},
    {value: '2',label: '撤销'},
    {value: '3',label: '吊销'},
    {value: '4',label: '注销'}
  ]
}
// 船员职务
export const getPostOptions = () => {
  return [
    {value: '10',label: '船长'},
    {value: '11',label: '大副'},
    {value: '12',label: '二副'},
    {value: '13',label: '三副'},
    {value: '14',label: '驾驶员'},
    {value: '15',label: '驾机员'},

    {value: '16',label: '正驾长'},
    {value: '17',label: '副驾长'},
    {value: '18',label: '水手'},
    {value: '20',label: '轮机长'},

    {value: '21',label: '大管轮'},
    {value: '22',label: '二管轮'},
    {value: '23',label: '三管轮'},

    {value: '24',label: '司机'},
    {value: '26',label: '机工'},
    {value: '31',label: '水手'},
    {value: '33',label: '轮机员'},
  ]
}
// 船员适任证书等级
export const getGradeOptions = () => {
  return [
    {value: '11',label: '一等--1600总吨以上'},
    {value: '12',label: '二等--600总吨以上至1600总吨以下'},
    {value: '13',label: '三等--200总吨以上至600总吨以下'},
    {value: '14',label: '四等--50总吨以上至200总吨以下'},
    {value: '15',label: '五等--50总吨以下'},
    {value: '16',label: '一等非机动船：200总吨及以上'},
    {value: '17',label: '二等非机动船：未满200总吨'},
    {value: '21',label: '一等--1500千瓦以上'},
    {value: '22',label: '二等--441千瓦以上至1500千瓦以下'},
    {value: '23',label: '三等--147千瓦以上至441千瓦以下'},
    {value: '24',label: '四等--147千瓦以下'},
    {value: '25',label: '五等--36.8千瓦以下'},
    {value: '50',label: '小型船舶--100总吨及以下'},
    {value: '51',label: '小型客渡--50总吨以下'},
    {value: 'N11',label: '一类--1000总吨及以上'},
    {value: 'N12',label: '二类--300总吨以上至1000总吨'},
    {value: 'N13',label: '三类--300总吨以下'},
    {value: 'N15',label: '内河小型船舶工作'},
    {value: 'N16',label: '内河小型客渡船工作'},
    {value: 'N21',label: '一类--500千瓦及以上'},
    {value: 'N22',label: '二类--150千瓦及以上至500千瓦'},
    {value: 'N23',label: '三类--150千瓦以下'},
    {value: '0',label: '无'},
  ]
}

// 危险化学品水路运输作业类型
export const getwaterOptions = () => {
  return [
    {value: '11',label: '国际水路运输包装'},
    {value: '12',label: '国际水路运输散装固体'},
    {value: '13',label: '国际水路运输散装液体'},
    {value: '21',label: '国内水路运输包装'},
    {value: '22',label: '国内水路运输散装固体'},
    {value: '23',label: '国内水路运输散装液体'}
  ]
}
// 船员适任证书种类
export const getCertificateTypeOptions = () => {
  return [
    {value: 'N110',label: '一等船长'},
    {value: 'N111',label: '一等大副'},
    {value: 'N112',label: '一等二副'},
    {value: 'N113',label: '一等三副'},
    {value: 'N120',label: '二等船长'},
    {value: 'N121',label: '二等大副'},
    {value: 'N122',label: '二等二副'},
    {value: 'N123',label: '二等三副'},
    {value: 'N130',label: '三等船长'},
    {value: 'N131',label: '三等大副'},
    {value: 'N132',label: '三等二副'},
    {value: 'N134',label: '三等驾驶员'},
    {value: 'N140',label: '四等船长'},
    {value: 'N141',label: '四等大副'},
    {value: 'N142',label: '四等二副'},
    {value: 'N144',label: '四等驾驶员'},
    {value: 'N154',label: '五等驾驶'},
    {value: 'N231',label: '三等轮机长'},
    {value: 'N232',label: '三等大管轮'},
    {value: 'N234',label: '三等二管轮'},
    {value: 'N240',label: '四等轮机长'},
    {value: 'N241',label: '四等大管轮'},
    {value: 'N242',label: '四等二管轮'},
    {value: 'N244',label: '四等轮机员'},
    {value: 'N254',label: '五等司机'},
    {value: 'N1111',label: '一类船长'},
    {value: 'N1112',label: '一类大副'},
    {value: 'N1113',label: '一类二副'},
    {value: 'N1114',label: '一类三副'},
    {value: 'N1211',label: '二类船长'},
    {value: 'N1215',label: '二类驾驶员'},
    {value: 'N1311',label: '三类船长'},
    {value: 'N1315',label: '三类驾驶员'},
    {value: 'N1515',label: '内河小型船舶驾驶员'},
    {value: 'N1615',label: '内河小型客渡船驾驶员'},
    {value: 'N155',label: '五等驾机员'},
    {value: 'N157',label: '游艇驾驶员（已经无效）'},
    {value: 'N158',label: '乡镇机动渡船驾机员'},
    {value: 'N159',label: '乡镇机动渡船渡工'},
    {value: 'N166',label: '一等正驾长'},
    {value: 'N167',label: '一等副驾长'},
    {value: 'N176',label: '二等正驾长'},
    {value: 'N177',label: '二等副驾长'},
    {value: 'N210',label: '一等轮机长'},
    {value: 'N211',label: '一等大管轮'},
    {value: 'N212',label: '一等二管轮'},
    {value: 'N213',label: '一等三管轮'},
    {value: 'N220',label: '二等轮机长'},
    {value: 'N221',label: '二等大管轮'},
    {value: 'N222',label: '二等二管轮'},
    {value: 'N223',label: '二等三管轮'},
    {value: 'N230',label: '三等轮机员'},
    {value: 'N2121',label: '一类轮机长'},
    {value: 'N2122',label: '一类大管轮'},
    {value: 'N2123',label: '一类二管轮'},
    {value: 'N2124',label: '一类三管轮'},
    {value: 'N2221',label: '二类轮机长'},
    {value: 'N2225',label: '二类轮机员'},
    {value: 'N2321',label: '三类轮机长'},
    {value: 'N2325',label: '三类轮机员'},
  ]
}

export const getTypeOptions = () => {
  return [
    {value: '17',label: '二等非机动船：未满200总吨'},
    {value: '21',label: '一等--1500千瓦以上'},
    {value: '22',label: '二等--441千瓦以上至1500千瓦以下'},
    {value: '23',label: '三等--147千瓦以上至441千瓦以下'},
    {value: '24',label: '四等--147千瓦以下'},
    {value: '25',label: '五等--36.8千瓦以下'},
    {value: '50',label: '小型船舶--100总吨及以下'},
    {value: '51',label: '小型客渡--50总吨以下'},
    {value: 'N11',label: '一类--1000总吨及以上'},
    {value: 'N12',label: '二类--300总吨以上至1000总吨'},
    {value: 'N13',label: '三类--300总吨以下'},
    {value: 'N15',label: '内河小型船舶工作'},
    {value: 'N16',label: '内河小型客渡船工作'},
    {value: 'N21',label: '一类--500千瓦及以上'},
    {value: 'N22',label: '二类--150千瓦及以上至500千瓦'},
    {value: 'N23',label: '三类--150千瓦以下'},
    {value: '0',label: '无'},
    {value: '11',label: '一等--1600总吨以上'},
    {value: '12',label: '二等--600总吨以上至1600总吨以下'},
    {value: '13',label: '三等--200总吨以上至600总吨以下'},
    {value: '14',label: '四等--50总吨以上至200总吨以下'},
    {value: '15',label: '五等--50总吨以下'},
    {value: '16',label: '一等非机动船：200总吨及以上'},
  ]
}
// 危险化学品水路运输从业资格类型
export const getChemistryOptions = () => {
  return [
    {value:'1',label:'装卸管理人员'},
    {value:'2',label:'申报员'},
    {value:'3',label:'检查员'},
  ]
}

// 单位类型
export const getEnterpriseTypeOptions = () => {
  return [
    {value:'1',label:'央企'},
    {value:'2',label:'长航局直属企业'},
    {value:'3',label:'地方企业'},
    {value:'5',label:'外商投资企业'},
    {value:'9',label:'其他'},
  ]
}

// 经济类型
export const getEconomicTypeOptions = () => {
  return [
    {value:'100',label:'内资'},
    {value:'200',label:'港、澳、台投资'},
    {value:'110',label:'国有全资'},
    {value:'210',label:'内地和港、澳或台合资'},
    {value:'120',label:'集体全资'},
    {value:'220',label:'内地和港、澳或台合作'},
    {value:'130',label:'股份合作'},
    {value:'230',label:'港、澳、台独资'},
    {value:'140',label:'联 营'},
    {value:'240',label:'内地和港、澳或台投资股份有限（公司）'},
    {value:'141',label:'国有联营'},
    {value:'290',label:'其他港澳台投资'},
    {value:'142',label:'集体联营'},
    {value:'300',label:'国外投资'},
    {value:'143',label:'国有与集体联营'},
    {value:'310',label:'中外合资'},
    {value:'149',label:'其他联营'},
    {value:'320',label:'中外合作'},
    {value:'150',label:'有限责任（公司）'},
    {value:'330',label:'外资'},
    {value:'159',label:'其他有限责任（公司）'},
    {value:'340',label:'国外投资股份有限（公司）'},
    {value:'160',label:'股份有限（公司）'},
    {value:'390',label:'其他国外投资'},
    {value:'170',label:'私有'},
    {value:'900',label:'其他'},
    {value:'171',label:'私有独资'},
    {value:'172',label:'私有合伙'},
    {value:'173',label:'私营有限责任（公司）'},
    {value:'174',label:'私营股份有限（公司）'},
    {value:'175',label:'个体经营'},
    {value:'179',label:'其他私有'}
  ]
}

// 企业证件类型
export const getqyDocumentTypeCodeOptions = () => {
  return [
    {value:'1',label:'国内水路运输经营许可证'},
    {value:'5',label:'国际船舶国际代理经营资格登记证'},
    {value:'2',label:'船舶管理业务经营许可证'},
    {value:'6',label:'国际海运辅助业经营资格登记证'},
    {value:'3',label:'船舶营业运输证'},
    {value:'7',label:'班轮航线运营许可证'},
    {value:'4',label:'国际船舶运输经营许可证'},
    {value:'90',label:'其他'}
  ]
}

// 获取选项名称
export const getLabelName = (value,data) => {
  let label = ''
  for (let i=0;i<data.length;i++){
    if (data[i].value === value){
      label = data[i].label
    }
  }
  return label
}
