<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增水文信息' : type === 'edit' ? '编辑水文信息' : '水文信息详情'" />
      </span>
      <span class="detail-header-button">
         <el-button type="primary" size="medium" @click="exportExcel">导出</el-button>
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />通航水域
      </div>
      <el-row :gutter="20">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="medium"
        >
          <el-col :span="12">
            <el-form-item
              label="选择日期:"
              prop="operationDate"
            >
              <el-date-picker
                v-if="type === 'add'"
                v-model="ruleForm.operationDate"
                type="date"
                placeholder="请选择日期"
                style="width: 100%;"
                @change="fetchExist"
              />
              <span v-else>{{ ruleForm.operationDate }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="type !== 'detail'" :span="12">
            <span style="float: left; margin-right: 10px;">
              <a
                class="item"
                href="./excels/水位信息.xlsx"
              >
                <el-button
                  plain
                  size="small"
                  icon="el-icon-s-order"
                >模板下载</el-button>
              </a>
            </span>
            <ExcelRead
              ref="excel_read"
              :button="{text:'信息导入',isButton:true,size:'small',icon:'el-icon-check',type:'primary'}"
              @readData="readData"
            />
          </el-col>
          <el-col :span="24">
            <Hydrology
              ref="hydrology"
              :disabled="type !== 'detail' ? true :false"
              :hyTableData="hyTableData"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px;">
            <div class="icon-title">
              <span class="span" />主要航电枢纽
            </div>
          </el-col>
          <el-col :span="24">
            <Avionics
              ref="avionics"
              :avTableData="avTableData"
              :disabled="type !== 'detail' ? true :false"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px;">
            <div class="icon-title">
              <span class="span" />主洪峰预报
            </div>
          </el-col>
          <el-col :span="24">
            <Forecast
              ref="forecast"
              :hyTableData="hyTableData"
              :forecastData="forecastData"
              :disabled="type !== 'detail' ? false :true"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px;">
            <el-form-item
              v-if="type !== 'detail'"
              label="上传文件:"
              prop="filePath"
              style="width: 100%;"
            >
              <upload
                file
                :show-file-list="false"
                :file-list="fileList"
                :limit="5"
                @fileSuccess="success"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <FileTable
              :show-download="type !== 'add'"
              :show-delete="type !== 'detail'"
              :table-data="fileList"
              @handleDelete="handleDelete"
            />
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :disabled="ruleForm.operationDate ? false : true"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import Hydrology from './components/Hydrology'
import Avionics from './components/Avionics'
import Forecast from './components/Forecast'
import ExcelRead from '@/components/ExcelRead'
import { saveEntity, isExist, queryDetail, updateById, selectWatersList, queryInfoByTime,selectNavigationList } from '@/api/emergency-services/hydrological'
import htmlToExcel from '@/utils/htmlToExcel'
export default {
  components: {
    upload,
    FileTable,
    Hydrology,
    Avionics,
    ExcelRead,
    Forecast
  },
  data() {
    return {
      date: '',
      loading:false,
      fileList: [],
      type: '',
      ruleForm: {
        id: null,
        operationDate: ''
      },
      hydrologicalData:[], // 原始水文站数据
      hyTableData:[],// 水文站数据
      avTableData:[], // 主要航电枢纽数据
      forecastData:[], // 主洪峰预报数据
      rules: {
        operationDate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    const { id, type } = this.$route.query
    this.type = type
    await this.initWatersList()
    if (id) {
      this.fetchDetail(id)
    } else {
      await this.initNavigationList()
    }
  },
  methods: {
    // EXCEL读取数据
    readData(excelData,extend){
      if (excelData && excelData.length>0){

        // 水文站数据
        for (let i=4;i<31;i++){
          let key = this.getHydrologicalNameToKey(excelData[i][1])
          if (key!==-1){
            this.hyTableData[key].waterLevel = excelData[i][2] || undefined
          }
        }
        // 主要航电枢纽数据
        for (let i=32;i<39;i++){
          let key = this.getAvionicsNameToKey(excelData[i][0])
          if (key!==-1){
            this.avTableData[key].upstreamWaterLevel = excelData[i][1] || undefined
            this.avTableData[key].downstreamWaterLevel = excelData[i][2] || undefined
            this.avTableData[key].scheduledReceipt = excelData[i][3] || undefined
            this.avTableData[key].outboundTraffic = excelData[i][4] || undefined
          }
        }

        // 主洪峰预报
        for (let i=41;i<excelData.length;i++){
          let watersId = this.getHydrologicalNameToId(excelData[i][0])
          if (watersId){
            this.forecastData.push({
              id: null,
              watersId: watersId,
              warningWaterLevel: excelData[i][4],
              isExpectedToRise: excelData[i][3],
              floodPeakTime: momentDate(htmlToExcel.parseExcelDate(excelData[i][1], true), 'YYYY-MM-DD HH:mm:ss'),
              estimatedWaterLevelFlow: excelData[i][2],
              saved: true
            })
          }
        }
      }
    },
    // 通过主要航电枢纽获取key
    getAvionicsNameToKey(hubName){
      let key = -1
      if (!hubName){
        return key
      }
      for (let i=0;i<this.avTableData.length;i++){
        if (this.avTableData[i].hubName.replace(/\s*/g,"") === hubName.replace(/\s*/g,"")){
          key = i
          return key
        }
      }
      return key
    },
    // 通过水文站名称获取 所在水文站的key只
    getHydrologicalNameToKey(watersName){
      let key = -1
      if (!watersName){
        return key
      }
      for (let i=0;i<this.hyTableData.length;i++){
        if (this.hyTableData[i].watersName.replace(/\s*/g,"") === watersName.replace(/\s*/g,"")){
          key = i
          return key
        }
      }
      return key
    },
    // 通过水文站名称获取 所在水文站的ID
    getHydrologicalNameToId(name){
      if (!name){
        return ''
      }
      let watersId = ''
      for (let i=0;i<this.hydrologicalData.length;i++){
        if (this.hydrologicalData[i].watersName.replace(/\s*/g,"") === name.replace(/\s*/g,"")){
          watersId = this.hydrologicalData[i].watersId
        }
      }
      return watersId
    },
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = res.data
        let hyTableData = []
        this.hydrologicalData.forEach((item,index)=>{
          hyTableData.push(item)
          hyTableData[index].waterLevel = this.getLastHydrologicalData(res.data.watersDateVoList,item.watersId)
          hyTableData[index].id = this.getLastHydrologicalDataId(res.data.watersDateVoList,item.watersId)
        })
        let forecastData = []
        res.data.floodForecastVoList.forEach((item,index)=>{
          forecastData.push(item)
          forecastData[index].saved = true
        })
        this.hyTableData = hyTableData
        this.avTableData = res.data.navigationPowerJunctionDateVoList
        this.forecastData = forecastData
        this.getTheDayBefore(momentDate(new Date(res.data.operationDate).getTime() - (24*3600*1000), 'YYYY-MM-DD'))
        this.fileList = JSON.parse(res.data.filePath)
      })
    },
    // 初始化水文站信息
    async initWatersList(){
      const res = await selectWatersList()
      let data = []
      res.data.forEach(item=>{
        data.push({
          id:'', // 水文信息数据编号
          watersId:item.id, // 水文站编号
          waterLevel:undefined, // 水位
          lastdayWaterLevel:undefined,// 上一天水位
          waters:item.waters, // 水域名称
          watersName:item.name, // 水文站名称
        })
      })
      this.hydrologicalData = data
      this.hyTableData = data
    },
    // 初始化主要航电枢纽
    async initNavigationList(){
      const res = await selectNavigationList()
      let avionicsData = []
      res.data.forEach(item=>{
        avionicsData.push({
          id:'',
          hubName:item.name,
          hubId:item.id,
          downstreamWaterLevel:undefined,
          outboundTraffic:undefined,
          scheduledReceipt:undefined,
          upstreamWaterLevel:undefined
        })
      })
      this.avTableData = avionicsData
    },
    // 判断日期是否存在数据
    async fetchExist(date) {
      if (!date){
        return false
      }
      this.ruleForm.operationDate = momentDate(date, 'YYYY-MM-DD')
      let isExi = await isExist({ time: this.ruleForm.operationDate })
      if (isExi.data === true) { // 当前日期不存在数据,可以新增
        this.$message({
          showClose: true,
          message: '当前日期存在水文信息,请更换日期',
          type: 'warning'
        })
        this.ruleForm.operationDate = ''
        return false
      }
      this.getTheDayBefore(momentDate(new Date(this.ruleForm.operationDate).getTime() - (24*3600*1000), 'YYYY-MM-DD'))
    },
    // 获取前一天数据
    async getTheDayBefore(date){
      const res = await queryInfoByTime({ time: date })
      if (res.data){
        let hyTableData = []
        this.hydrologicalData.forEach((item,index)=>{
          hyTableData.push(item)
          hyTableData[index].lastdayWaterLevel = this.getLastHydrologicalData(res.data.watersDateVoList,item.watersId)
        })
        this.hyTableData = hyTableData
      }
    },
    // 获取水文站昨日水位ID
    getLastHydrologicalDataId(data,watersId){
      let id
      for (let i=0;i<data.length;i++){
        if (data[i].watersId === watersId){
          id = data[i].id
          return id
        }
      }
      return id
    },
    // 获取水文站昨日水位
    getLastHydrologicalData(data,watersId){
      let waterLevel
      for (let i=0;i<data.length;i++){
        if (data[i].watersId === watersId){
          waterLevel = data[i].waterLevel
          return waterLevel
        }
      }
      return waterLevel
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/hydrology' })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      this.loading = true
      const watersDateDtoList = this.$refs.hydrology.getTableData()
      const navigationPowerJunctionDateDtoList = this.$refs.avionics.getTableData()
      const floodForecastDtoList = this.$refs.forecast.getTableData()
      const dto = {
        id: this.ruleForm.id,
        operationDate: this.ruleForm.operationDate,
        watersDateDtoList,
        navigationPowerJunctionDateDtoList,
        floodForecastDtoList,
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      delete dto.updateTime
      const res = dto.id ? await updateById(dto) : await saveEntity(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // hook:文件上传成功
    success(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    increase(lastdayWaterLevel,waterLevel){
      if (lastdayWaterLevel===undefined || waterLevel===undefined){
        return '-'
      }
      return (parseFloat(waterLevel) - parseFloat(lastdayWaterLevel)).toFixed(2)
    },
    getWatersName(watersId) {
      const obj = this.hyTableData.find(x => x.watersId === watersId)
      return `${obj.waters} - ${obj.watersName}`
    },
    exportExcel() {
      const hyTableData = this.hyTableData.map(x => ([
        x.waters,
        x.watersName,
        x.waterLevel,
        this.increase(x.lastdayWaterLevel,x.waterLevel) === '-'?'-':(parseFloat(this.increase(x.lastdayWaterLevel,x.waterLevel)) > 0?'涨':
        (parseFloat(this.increase(x.lastdayWaterLevel,x.waterLevel)) === 0?'平':'落')),
        this.increase(x.lastdayWaterLevel,x.waterLevel)==='-'?'-':this.increase(x.lastdayWaterLevel,x.waterLevel),
        x.lastdayWaterLevel ? x.lastdayWaterLevel.toFixed(2) : '-'
      ]))
      const avTableData = this.avTableData.map(x => ([
        x.hubName,
        x.upstreamWaterLevel,
        x.downstreamWaterLevel,
        x.scheduledReceipt,
        x.outboundTraffic
      ]))
      const forecastData = this.forecastData.map(x => ([
        this.getWatersName(x.watersId),
        x.floodPeakTime,
        x.estimatedWaterLevelFlow,
        x.isExpectedToRise,
        x.warningWaterLevel
      ]))
      const data = {
        data: [
          [['水域', '水文站', '水位(米)', '较昨日', '幅度（米）', '昨日水位（米）'], ...hyTableData], 
          [['电站', '上游水位', '下游水位', '入库流量', '出库流量'], ...avTableData],
          [['水文站', '洪峰时间', '预报水位/流量(米)', '预计涨幅（米）', '警戒水位/保证水位(米)'], ...forecastData]
        ],
        sheetName: ['通航水域', '主要航电枢纽','主洪峰预报'],
        name: '水文信息.xlsx'
      }
      htmlToExcel.getMoreSheet(data)
    }
  }
}
</script>