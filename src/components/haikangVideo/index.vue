<!-- @desc [海康监控视频组件] -->
<template>
  <div
    id="playWnd"
    class="playWnd"
    :style="`width:${width}px;height:${height}px`"
  >
    <el-empty v-if="!isLoad" :description="description">
      <a v-if="description!=='播放插件未启动，正在尝试启动，请稍候...' && description!=='播放插件初始化失败，请检查网络或一级视频平台配置是否正确...'" href="./VideoWebPlugin.exe"><el-button type="text">立刻下载</el-button></a>
    </el-empty>
  </div>
</template>

<script>
import {momentDate} from '@/utils/index'
export default {
  props: {
    appkey: {
      type: String,
      default: '20273300', // 合作方Appkey
    },
    secret:{
      type: String,
      default: 'VOk5Afo6ZSpdvS9m8pdR', // 合作方Secret
    },
    ip:{
      type: String,
      default: '10.224.127.66', // 平台IP地址
    },
    szPort:{
      type: [String,Number],
      default: 443, // 平台端口
    },
    layout:{
      type: String,
      default: '2x2', // 窗口布局[1x1 | 2x2 | 3x3 | 4x4 | 5x5 | 1x2 | 1x4 | 4x6 | 1+2 | 1+5 | 1+7 | 1+8 | 1+9 | 1+12 | 1+16 | 4+9 | 1+1+12 | 3+4]
    },
    szShowToolbar:{
      type: Number,
      default: 1, // 显示智能信息 [0-隐藏,1-显示]
    },
    btIds:{
      type: String,
      default: '1,0,16,256,257,258,259,260,512,513,514,515,516,517,768,769', // 工具条按钮ID集 [1,0,16,256,257,258,259,260,512,513,514,515,516,517,768,769]
    },
    width:{
      type:Number,
      default: 800
    },
    height:{
      type:Number,
      default: 400
    }
  },
  data() {
    return {
      isLoad:false, // 是否加载成功
      description:'播放插件未启动，正在尝试启动，请稍候...', // 自定义描述文字
      oWebControl: null,// 插件对象
      bIE:(!!window.ActiveXObject || 'ActiveXObject' in window),// 是否为IE浏览器
      pubKey:'',
      initCount:0,
      snapDir:'D:\SnapDir', // 抓图存储路径
      SnapType:0,// 抓图模式[0-选中窗口抓图,1-指定窗口抓图]
      SnapWndId:0,// 抓图窗口ID
      videoDir:'D:\VideoDir', // 录像存储路径
      szShowSmart:1,// 显示智能信息 [0-隐藏,1-显示]
      rectTimes:5, // 重连次数
      rectDuration:5,// 重连间隔
      language:'zh_CN',// 多语言[zh_CN-中文,en_US-英文]
      isHttps:1,// 启用HTTPS协议
      encryptedFields:['secret'], // 加密字段 [appkey,secret,ip,snapDir,videoDir,layout]
      playType:0,// 预览模式[0-空闲窗口预览,1-选中窗口预览,2-指定窗口预览],
      playWndId:0,// 预览窗口ID
      setOSDType:0,// 叠加模式[0-选中窗口字符串叠加,1-指定窗口字符串叠加]
      osdWndId:0,// 叠加窗口ID
      isMultiPlay:0,// 是否批量播放 [0-不启用,1-启用] 是否批量播放
    }
  },
  created() {
  },
  mounted() {
    this.loadVideo()
  },
  beforeDestroy(){
    this.closeWindow()
  },
  methods:{
    loadVideo() {
      return new Promise(async (resolve) => {
        const len = [...document.body.children]?.filter(x => x['data-haikang'])?.length
        if(len){
          this.initPlugin()
        }else{
          const jscript = document.createElement('script')
          const crypt = document.createElement('script')
          const controlScript = document.createElement('script')
          jscript.src = '/jquery-1.12.4.min.js'
          jscript['data-haikang'] = true
          crypt.src = '/jsencrypt.min.js'
          crypt['data-haikang'] = true
          controlScript.src = '/jsWebControl-1.0.0.min.js'
          controlScript['data-haikang'] = true
          await document.body.appendChild(jscript)
          await document.body.appendChild(crypt)
          await document.body.appendChild(controlScript)
          controlScript.onload = () => {
            this.initPlugin()
          }
        }
      })
    },
    init(){
      // 初始化
      this.getPubKey(() => {
        let appkey = this.encryptedFields.includes('appkey') ? this.setEncrypt(this.appkey.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.appkey.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let secret = this.encryptedFields.includes('secret') ? this.setEncrypt(this.secret.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.secret.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let ip = this.encryptedFields.includes('ip') ? this.setEncrypt(this.ip.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.ip.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let szPort = this.szPort
        let snapDir = this.encryptedFields.includes('snapDir') ? this.setEncrypt(this.snapDir.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.snapDir.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let videoDir = this.encryptedFields.includes('videoDir') ? this.setEncrypt(this.videoDir.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.videoDir.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let layout = this.encryptedFields.includes('layout') ? this.setEncrypt(this.layout.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")) : this.layout.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
        let encryptedFields = this.encryptedFields.join(",")
        let szShowToolbar = this.szShowToolbar
        let szShowSmart = this.szShowSmart
        let btIds = this.btIds
        let rectTimes = this.rectTimes
        let rectDuration = this.rectDuration
        let language = this.language

        let port = szPort
        let showSmart = szShowSmart
        let showToolbar = szShowToolbar
        let enableHttps = this.isHttps
        let reconnectTimes = rectTimes
        let duration = rectDuration

        this.oWebControl.JS_RequestInterface({
          funcName: "init",
          argument: JSON.stringify({
            appkey: appkey,
            secret: secret,
            ip: ip,
            playMode: 0, // 预览
            port: port,
            snapDir: snapDir,
            videoDir: videoDir,
            layout: layout,
            enableHTTPS: enableHttps,
            showToolbar: showToolbar,
            showSmart: showSmart,
            buttonIDs: btIds,
            encryptedFields: encryptedFields,
            language: language,
            reconnectTimes: reconnectTimes,
            reconnectDuration: duration
          })
        }).then((oData) => {
          if (oData.responseMsg.code===0){
            this.updatePlayTypeValue()
            this.updateSnapTypeValue()
            this.updateSetOSDTypeValue()
            this.oWebControl.JS_Resize(this.width, this.height) // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
            this.$emit('initSuccess')
          } else {
            this.isLoad = false
            this.description = '播放插件初始化失败，请检查网络或一级视频平台配置是否正确...'
          }
          this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
        })
      })
    },
    // 视频预览
    /**
     *
     * @param {*} cameraIndexCode 视频code
     * @param {*} streamMode 主子码流标识 [0-主码流,1-子码流] 默认 0
     * @param {*} transMode 传输协议 [0-UDP,1-TCP] 默认 1
     * @param {*} gpuMode 是否启用GPU硬解 [0-不启用,1-启用] 默认 0
     * @param {*} isDirectEzviz 是否直连萤石预览 [0-不启用,1-启用] 默认 0
     * @param {*} wndId 指定窗口预览 默认(-1)为空闲窗口预览 【//指定窗口预览 playType === 2 时有效】
     * @param {*} wndids 批量播放播放窗口序号 eg [1,2,3]
     */
    preview(cameraIndexCode,streamMode,transMode,gpuMode,isDirectEzviz,wndId,wndids){
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
      if (this.playType === 2){
        wndId = wndId ? wndId : -1
      } else if (this.playType === 1){ // 选中窗口预览
        wndId = 0
      } else {
        wndId = -1
      }
      if (!cameraIndexCode ) {
        this.showCBInfo("监控点编号不能为空！", 'error')
        return
      }
      // 是否批量播放
      if (this.isMultiPlay === 1){
        if (!wndids || wndids.length === 0) {
          this.showCBInfo("批量播放时窗口序号不能为空，请填入以英文逗号分割，从1开始到当前布局最大窗口数之间的窗口Id！请自行保证仅填入数字，并且逗号左右无空格！", 'error')
          return
        }
        let dataArr = []
        wndids.forEach(element => {
          dataArr.push({
            cameraIndexCode : cameraIndexCode ,
            streamMode: streamMode || 0,
            transMode: transMode || 1,
            gpuMode: gpuMode || 0,
            wndId: parseInt(element),
            ezvizDirect: isDirectEzviz
          })
        })

        let tmpAgr = {
          "list": dataArr
        }
        this.oWebControl.JS_RequestInterface({
          funcName: "startMultiPreviewByCameraIndexCode",
          argument: JSON.stringify(tmpAgr)
        }).then((oData) => {
          this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
        })
      } else {
        this.oWebControl.JS_RequestInterface({
          funcName: "startPreview",
          argument: JSON.stringify({
            cameraIndexCode : cameraIndexCode ,
             streamMode: streamMode || 0,
            transMode: transMode || 1,
            gpuMode: gpuMode || 0,
            wndId: wndId,
            ezvizDirect: isDirectEzviz
          })
        }).then((oData) => {
          this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
        })
      }
    },
    // 停止播放视频
    stopAll(){
      this.oWebControl.JS_RequestInterface({
        funcName: "stopAllPreview"
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    // 停止播放传输窗口视频
    stop(stopWndIds){
      if (!stopWndIds || stopWndIds.length===0) {
        this.showCBInfo("批量播放时窗口序号不能为空，请填入以英文逗号分割，从1开始到当前布局最大窗口数之间的窗口Id！请自行保证仅填入数字，并且逗号左右无空格！", 'error')
        return
      }
      let dataArr = []
      let tmpAgr = {
        "list": dataArr
      }
      stopWndIds.forEach(item=>{
        dataArr.push({
          wndId: parseInt(item)
        })
      })
      this.oWebControl.JS_RequestInterface({
        funcName: "stopMultiPlay",
        argument: JSON.stringify(tmpAgr)
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    /**
     * 抓图
     * @param {*} picName 图片名称 默认当前时间.jpg
     * @param {*} wndId 要抓取图片的窗口序号 抓图模式[0-选中窗口抓图,1-指定窗口抓图]【只有抓图模式为1时设置有效】 默认 0 - 选中窗口抓图
     */
    snapPic(picName,wndId){
      let snapName = `${this.snapDir}\\${picName || momentDate(new Date(),'YYYYMMDDHHmmss')+'.jpg'}` // 图片名称
      snapName = snapName.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
      if (this.SnapType === 1){ // 指定窗口抓图
        wndId = wndId || 0
      } else {
        wndId = 0
      }
      this.oWebControl.JS_RequestInterface({
        funcName: "snapShot",
        argument: JSON.stringify({
          name : snapName,
          wndId: wndId
        })
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    // 初始化播放器
    initPlugin () {
      // eslint-disable-next-line no-undef
      this.oWebControl = new WebControl({
        szPluginContainer: "playWnd",
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: ()=> {
          this.initCount = 0
          this.setCallbacks()
          this.oWebControl.JS_StartService("window", {
            dllPath: "./VideoPluginConnect.dll"
          }).then(() => {
            this.oWebControl.JS_CreateWnd("playWnd", 1000, 400).then(() => {
              this.isLoad = true
              // 组件加载完成，初始化播放器
              this.init()
            })
          }, () => {

          })
        },
        cbConnectError:  ()=> {
          this.oWebControl = null
          this.description = '播放插件未启动，正在尝试启动，请稍候...'
          // eslint-disable-next-line no-undef
          WebControl.JS_WakeUp("VideoWebPlugin://")
          this.initCount ++
          if (this.initCount < 3) {
            setTimeout(() => {
              this.initPlugin()
            }, 3000)
          } else {
            this.isLoad = false
            this.description = '播放插件启动失败，请检查插件是否安装！'
          }
        },
        cbConnectClose: (bNormalClose) => {
          /*
           * 异常断开：bNormalClose = false
           * JS_Disconnect正常断开：bNormalClose = true
           */
          this.oWebControl = null
        }
      })
    },
    // 停止预览模式
    stopPlayValue(){
      this.oWebControl.JS_RequestInterface({
        funcName: "stopAllPreview"
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    // 设置布局
    setLayout(){
      this.oWebControl.JS_RequestInterface({
        funcName: "setLayout",
        argument: JSON.stringify({
          layout : this.layout
        })
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
        this.updatePlayTypeValue()
        this.updateSnapTypeValue()
        this.updateSetOSDTypeValue()
      })
    },
    // 获取当前布局
    getLayout(){
      this.oWebControl.JS_RequestInterface({
        funcName: "getLayout"
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
        this.updatePlayTypeValue()
        this.updateSnapTypeValue()
        this.updateSetOSDTypeValue()
      })
    },
    // 设置截图窗口信息
    updateSnapTypeValue(){
      if (this.SnapType === 1)
      {
        // 获取布局，并显示标签和窗口选择下拉框
        this.oWebControl.JS_RequestInterface({
          funcName: "getLayout"
        }).then((oData) => {
          // 分析窗口数
          let Data = JSON.stringify(oData.responseMsg.data)
          Data = Data.replace(/\\n/g, "")
          Data = Data.replace(/\\/g, "")
          Data = Data.replace(/\"{/g, "{")
          Data = Data.replace(/}\"/g, "}")
          let DataNum = JSON.parse(Data).wndNum
          this.createSnapSelectOption(DataNum)
        })
      }
    },
    // 设置播放窗口信息
    updatePlayTypeValue(){
      if (this.playType === 2){
        // 获取布局，并显示标签和窗口选择下拉框
        this.oWebControl.JS_RequestInterface({
          funcName: "getLayout"
        }).then((oData) => {
          /*
           * 分析窗口数
           * {"errorCode":0,"errorModule":0,"responseMsg":{"code":0,"data":"{\n    \"layout\": \"2x2\",\n    \"wndNum\": 4\n}\n"},"sequence":"93298475-03d0-49c9-bc3a-a94ec696f983","uuid":"{c76078b4-4f19-4198-b68d-83df1d3d71a9}"}
           */
          // "{\n    \"layout\": \"2x2\",\n    \"wndNum\": 4\n}\n"
          let Data = JSON.stringify(oData.responseMsg.data)
          // "{    \"layout\": \"2x2\",    \"wndNum\": 4}"
          Data = Data.replace(/\\n/g, "")
          // "{    "layout": "2x2",    "wndNum": 4}"
          Data = Data.replace(/\\/g, "")
          // {    "layout": "2x2",    "wndNum": 4}"
          Data = Data.replace(/\"{/g, "{")
          // {    "layout": "2x2",    "wndNum": 4}"
          Data = Data.replace(/}\"/g, "}")
          let DataNum = JSON.parse(Data).wndNum

          this.createSelectOption(DataNum)
        })
      }
    },
    // 设置叠加窗口信息
    updateSetOSDTypeValue(){
      if (this.setOSDType === 1){
        // 获取布局，并显示标签和窗口选择下拉框
        this.oWebControl.JS_RequestInterface({
          funcName: "getLayout"
        }).then((oData) => {
          // 分析窗口数
          let Data = JSON.stringify(oData.responseMsg.data)
          Data = Data.replace(/\\n/g, "")
          Data = Data.replace(/\\/g, "")
          Data = Data.replace(/\"{/g, "{")
          Data = Data.replace(/}\"/g, "}")
          let DataNum = JSON.parse(Data).wndNum
          this.createSetOSDSelectOption(DataNum)
        })
      }
    },
    // 创建叠加窗口选项
    createSetOSDSelectOption(wndNum){
      let window = []
      for (let i = 0; i < wndNum; i++){
        window.push({value:i+1,lable:`窗口${i+1}`})
      }
    },
    // 创建播放窗口选项
    createSelectOption(wndNum){
      let window = []
      for (let i = 0; i < wndNum; i++){
        window.push({value:i+1,lable:`窗口${i+1}`})
      }
    },
    // 创建截图窗口选项
    createSnapSelectOption(wndNum){
      let window = []
      for (let i = 0; i < wndNum; i++){
        window.push({value:i+1,lable:`窗口${i+1}`})
      }
    },
    // RSA加密
    setEncrypt (value) {
      // eslint-disable-next-line no-undef
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(this.pubKey)
      return encrypt.encrypt(value)
    },

    // 获取公钥
    getPubKey (callback) {
      this.oWebControl.JS_RequestInterface({
        funcName: "getRSAPubKey",
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then((oData)=>{
        if (oData.responseMsg.data) {
          this.pubKey = oData.responseMsg.data
          callback()
        }
      })
    },
    // 设置窗口控制回调
    setCallbacks() {
      this.oWebControl.JS_SetWindowControlCallback({
        // eslint-disable-next-line no-undef
        cbIntegrationCallBack: this.cbIntegrationCallBack
      })
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      this.showCBInfo(JSON.stringify(oData.responseMsg))
    },
    // 显示回调信息
    showCBInfo(szInfo, type) {
      // console.log(szInfo,type)
    },
    //  反初始化
    uninit () {
      this.oWebControl.JS_RequestInterface({
        funcName: "uninit"
      }).then((oData) => {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    // 关闭视频窗口
    closeWindow() {
      if (this.oWebControl !== null) {
        this.stopAll()
        this.uninit()
        this.oWebControl.JS_HideWnd() // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
        this.oWebControl.JS_Disconnect().then(
          () => {
            // 断开与插件服务连接成功
          },
          () => {
            // 断开与插件服务连接失败
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.playWnd {
    border: 1px solid red;
}
</style>

