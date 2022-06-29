const isOnline = require('is-online')
export default {
  async init() {
    const online = await isOnline()
    const len = [...document.body.children]?.filter(x => x['data-tianditu'])?.length
    return new Promise((resolve, reject) => {
      if (len) {
        if (window.T) resolve(window.T)
      } else {
        const script = document.createElement('script')
        script.src = online ? 'http://api.tianditu.gov.cn/api?v=4.0&tk=110b120ef7e02ee5ef47b0cf42461bd8' : '/tianditu.js'
        script['data-tianditu'] = true
        script.async = true
        document.body.appendChild(script)
        script.onload = () => {
          if (window.T) resolve(window.T)
        }
        script.onerror = () => {
          throw new Error('加载失败')
        }
      }
    })
  }
}