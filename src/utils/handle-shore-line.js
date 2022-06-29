class Handle {
  constructor(data = []) {
    this.data = data
  }
  get sameProps() {
    return this.calcProps(this.data)
  }
  // 统一树每级属性
  calcProps(arr) {
    return arr.map(x => {
      const keys = Object.keys(x)
      keys.forEach(k => {
        if (['portAreaVoList','businessDistrictVoList'].includes(k)) {
          x.children = x[k]
          delete x[k]
        }
        if (['portName', 'portAreaName'].includes(k)) { // 港口港区修改id,避免后端的id冲突
          x.name = x[k]
          x.id = `0${x.id}`
          // x.disabled = true
          delete x[k]
        }
      })
      return {
        ...x,
        children: (x.children && x.children.length) ? this.calcProps(x.children) : null
      }
    })
  }
}

export {
  Handle
}
