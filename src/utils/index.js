/**
 * Created by PanJiaChen on 16/11/18.
 */
import moment from 'moment'
import Layout from '@/layout'
import store from '../store'
// import {getFileUrl} from '@/api/file'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        /*
         * support safari
         * https://stackoverflow.com/questions/4310953/invalid-date-in-safari
         */
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if ((String(time)).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = Number(time)
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return (
    d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
  )

}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 递归菜单
 * @param {*} data 菜单数据
 * @returns 递归后的数据
 */
export const menuTree = (data) => {
  // 删除 所有 children,以防止多次调用
  data.forEach(item => {
    delete item.children
  })
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  let map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  //        console.log(map);
  let val = []
  data.forEach(item => {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    let parent = map[item.parentId]
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  return val
}

/**
 * 排序
 */
export const numSort = (property) => {
  return function(a, b) {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}

/**
 * 组装按钮权限进菜单里面
 */
export const getButtonRole = (id) => {
  const buttonRole = store.getters.user_results
  const myRoles = []
  buttonRole.forEach(bItem => {
    if (bItem.func_TYPE === '2') {
      myRoles.push(bItem)
    }
  })
  let roles = {}
  myRoles.forEach(item => {
    if (Number(item.parent_FUNC_ID) === Number(id)) {
      roles[item.func_URL] = true
    }
  })
  return roles
}

/**
 *组装路由数据
 */
export const assembleRouter = (router) => {
  const data = router.sort(numSort('orderNum'))
  return new Promise(resolve => {
    const list = []
    data.forEach(item => {
      const children = []
      item.nextObj.sort(numSort('orderNum')).forEach(val => {
        const childChildren = []
        if (val.nextObj && val.nextObj.length > 0) {
          val.nextObj.sort(numSort('orderNum')).forEach(obj => {
            childChildren.push({
              path: `${obj.funcUrl}`,
              name: firstUpperCase(obj.funcUrl),
              meta: { title: obj.funcName, icon: obj.icon },
              component: loadView(`${obj.funcUrl}/index`),
              roles: getButtonRole(obj.funcId)
            })
          })
        }
        children.push({
          path: `${val.funcUrl}`,
          name: firstUpperCase(val.funcUrl),
          meta: { title: val.funcName, icon: val.icon },
          outUrl: val.outUrl,
          component: loadView(`${val.funcUrl}/index`),
          children: childChildren,
          roles: getButtonRole(val.funcId)
        })
      })
      list.push({
        path: `${item.funcUrl}`,
        name: firstUpperCase(item.funcUrl),
        meta: { title: item.funcName, icon: item.icon },
        component: Layout,
        children: children
      })
    })
    resolve(list)
  })
}

/**
 *获取当前菜单按钮权限
 */
export const getRouterButtonRole = (path,isManual) => {
  const router = store.state.permission.menu
  let roles
  router.forEach(item => {
    if (item.children) {
      item.children.forEach(childItem => {
        if (childItem.children && childItem.children.length > 0) {
          childItem.children.forEach(secondItem => {
            if (secondItem.path === path) {
              roles = secondItem.roles
            }
          })
        } else {
          if (childItem.path === path) {
            roles = childItem.roles
          }
        }
      })
    }
  })
  if (roles) {
    if (isManual){
      return roles
    }
    store.dispatch('user/setButtonRole', roles)
  }
}

/**
 *首字母大写
 */
export const firstUpperCase = (name) => {
  // name = name.replaceAll('/').trim()
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 *
 *解析动态路由
 *
 */
export const loadView = (view) => {
  const roleName = store.getters.roles[0] === 'admin' ? 'industry-server' : 'enterprise-server'
  return () => import(`@/views/${roleName}${view}`)
}

/**
 * 获取前一天
 */
export const prevDay = (date, format) => {
  return date ? moment(date).subtract(1, 'days').format(format || 'yyyy-MM-DD') : ''
}

/**
 *时间转化
 */
export const momentDate = (date, format) => {
  return date ? moment(date).format(format || 'yyyy-MM-DD HH:mm:ss') : ''
}

export const getMonthDate = (month) => {
  return moment().add(month, 'months').format('yyyy-MM-DD');
}

/**
 * 判断地址是否是http|https开头的
 */
export const isDomain = (url)=>{
  let match2 = /^((http|https):\/\/)+([\w\-])+/
  let testVol = match2.test(url)
  return testVol
}
/**
 * 获取文件前缀
 */
export const getFilePrefix = ()=>{
  if (!isDomain(process.env.VUE_APP_FILE_DOMAIN)){
    return location.protocol + '//' + location.host + process.env.VUE_APP_FILE_DOMAIN
  }
  return process.env.VUE_APP_FILE_DOMAIN
}

/**
 * 文件地址组装
 */
export const fileUrlAssemble = async (src) => {
  if (!src){
    return ''
  }
  if (isDomain(src)){
    return src
  }
  if (src.indexOf(process.env.VUE_APP_FILE_DOMAIN) ===0){
    return src
  }
  return process.env.VUE_APP_FILE_DOMAIN + src
}

/**
 *下载文件
 */
export const downloadCodeImg =async (codeIMG,imgName) => {
  if (!codeIMG){
    return false
  }
  const fileExtension = codeIMG.substring(codeIMG.lastIndexOf('.') + 1)
  imgName = imgName || (codeIMG.substring(codeIMG.lastIndexOf("/")+1) || Date.now()+`.${fileExtension}`)
  const link = document.createElement('a')
  // const url = await getFileUrl({fullFileName:codeIMG})
  if (codeIMG.indexOf(process.env.VUE_APP_FILE_DOMAIN) !==0){
    codeIMG = `${process.env.VUE_APP_FILE_DOMAIN}${codeIMG}`
  }
  const urls = codeIMG // codeIMG  要下载的路径
  // 这里是将url转成blob地址
  fetch(urls).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
    link.href = URL.createObjectURL(blob)
    link.download = imgName
    document.body.appendChild(link)
    link.click()
  })
}
// 正则替换富文本中文件路径
export const replaceImg = async (text) => {
  return text
  // eslint-disable-next-line multiline-comment-style
  // if (!text){
  //   return ''
  // }
  // let imgArray = text.match(/<img.*?>/g)
  // // 获取每个img url
  // if (imgArray){
  //   for (let i=0;i<imgArray.length;i++){
  //     const src = imgArray[i].match(/\ssrc=['"](.*?)['"]/)
  //     const alt = imgArray[i].match(/\salt=['"](.*?)['"]/)
  //     if (src && alt){
  //       const url = await getFileUrl({fullFileName:alt[1]})
  //       text = text.replace(src[1], url.data) // 'http://www.dlzjzx.tj.cn'自己替换的内容
  //     }
  //   }
  // }
  // return new Promise((resolve) => {
  //   resolve(text)
  // })
}

/**
 * 递归树
 */
export const toTreeData = (data) => {
  return tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
}

export const tree = (data) => {
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
}

/**
 * 返回
 */
export const returnBack = () => {
  window.history.back()
}

/**
 * 通过type获取企业类型名称
 */
export const getEnterpriseTypeName = (type) => {
  const list = [
    { key: 1, val: '港口企业' },
    { key: 2, val: '港口服务企业' },
    { key: 3, val: '水路运输企业' },
    { key: 4, val: '水路运输代理企业' },
    { key: 5, val: '船舶管理企业' },
    { key: 6, val: '其他企业' }
  ]
  return list.filter(item => item.key === type)[0].val
}

/**
 * 通过风险值获取风险等级
 */
export const getRiskGrade = (num) => {
  const list = [
    { min: 0, max: 6, label: '较小风险', level: 1 },
    { min: 5, max: 21, label: '一般风险', level: 2 },
    { min: 20, max: 56, label: '较大风险', level: 3 },
    { min: 55, max: 101, label: '重大风险', level: 4 }
  ]
  return list.filter(item => num > item.min && num < item.max)[0]
}

export const getValue = (field,value,index)=>{
  let key=''
  switch (field.type){
  case 'index': // 序号
    key = index+1
    break
  case 'only-num': // 后端返回纯数字处理
    key = getValueToLabel(field.payload,value)
    break
  case 'boolean-only-num': // boolean only-num
    key = field.payload[0].value === value ? field.payload[0].label : field.payload[1].label
    break
  case 'tag': // 后端返回纯数字并tag显示
    key = getValueToLabel(field.payload,value)
    break
  case 'boolean-tag': // boolean tag
    key = field.payload[0].value === value ? field.payload[0].label : field.payload[1].label
    break
  case 'date': // 后端返回时间戳
    key = value ? momentDate(value, field.format || 'YYYY-MM-DD') : ''
    break
  case 'file': // 文件
    key = ''
    break
  case 'text': // 文本
    key = value
    break
  case 'selection': // 复选框
    key = index+1
    break
  case 'text-boolean': // 文本
    key = value || field.payload?.[0]?.label
    break
  default:
    key = ''
    break
  }
  return key
}
// 通过value值获取label或tag
export const getValueToLabel = (data,value)=>{
  let result=''
  if (!value){
    return ''
  }
  for (let i=0;i<data.length;i++){
    if (data[i].value === value){
      result = data[i]?.label
      return result
    }
  }
  return result
}

/**
 * @description:降序 排序根据哪那个字段,适用于二维数组排序
 * @param {*}arr 要排序的数组
 * @param {*}key 需要排序的键名
 * @return {*}
 */
 export const downsort = (arr = [], key) => {
  let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
  tmp.sort(function(a, b) {
  	//判断是不是数字,数字则不处理,不是数字则转为对应Unicode码
    a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0); 
    b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
    return a - b;
  });
  return tmp;
}

/**
 * @description: 升序 排序根据哪那个字段,适用于二维数组排序
 * @param {*}arr 要排序的数组
 * @param {*}key 需要排序的键名
 * @return {*}
 */
 export const upsort = (arr = [], key) => {
  let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
  tmp.sort(function(a, b) {
    a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0);
    b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
    return b - a;
  });
  return tmp;
}
