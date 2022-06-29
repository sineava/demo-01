// 获取数据层数据
const getDataLevel = (data,arr) => {
  data.forEach(x => {
    if (x.indicators.length > 0) {
      getDataLevel(x.indicators, arr)
    } else {
      let obj = {}
      if (x.indicatorType === 2) {
        obj = JSON.parse(JSON.stringify(x))
        delete obj.indicators
        delete obj.tags
        arr.push(obj)
      }
    }
  })
  return arr
}

export {
  getDataLevel
}
