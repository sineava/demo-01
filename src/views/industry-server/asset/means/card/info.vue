<template>
  <div class="card-info">
    <div v-if="aType">
      <Basics
        ref="Basics"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
        @typeData="typeData"
      />
      <BasicsOne
        v-if="aType===1"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsTwo
        v-if="aType===2"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsThree
        v-if="aType===3"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsFour
        v-if="aType===4"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsFive
        v-if="aType===5"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsSix
        v-if="aType===6"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsSeven
        v-if="aType===7"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsLand
        v-if="aType===101"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsCar
        v-if="aType===201"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <BasicsBuilding
        v-if="aType===102"
        ref="BasicsOther"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <Finance ref="Finance" :financeData="info" :oper="oper" />
      <Other
        ref="Other"
        :assetsTypeData="aData"
        :infoData="info"
        :oper="oper"
      />
      <div v-if="oper==='edit' || oper==='add'" class="submit">
        <el-button
          v-loading="loading"
          icon="el-icon-success"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          立即保存
        </el-button>
      </div>
    </div>

    <el-empty v-else description="请选择卡片类别" />
  </div>
</template>

<script>
import moment from 'moment'
import Basics from './components/basics'// 通用基础信息
import Finance from './components/finance'// 财务
import BasicsOne from './components/basics-one'// 房屋
import BasicsTwo from './components/basics-two'// 设备
import BasicsThree from './components/basics-three'// 文物
import BasicsFour from './components/basics-four'// 图书
import BasicsFive from './components/basics-five'// 家具
import BasicsSix from './components/basics-six'// 动植物
import BasicsSeven from './components/basics-seven'// 物资
import BasicsLand from './components/basics-land'// 土地
import BasicsCar from './components/basics-car' // 车辆
import BasicsBuilding from './components/basics-building' // 构建物
import Other from './components/other' // 其他信息
import { getAssetsCard,getoldCardinfo } from '@/api/means/card'
export default {
  components: {
    Basics,
    Finance,
    BasicsOne,
    BasicsTwo,
    BasicsThree,
    BasicsFour,
    BasicsFive,
    BasicsSix,
    BasicsSeven,
    BasicsLand,
    BasicsCar,
    BasicsBuilding,
    Other
  },
  props:{
    id:{
      type:Number,
      default:0
    },
    oper:{
      type:String,
      default:'add'
    },
    assetsType:{
      type:Number,
      default:0,
    },
    assetsTypeData:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      loading:false,
      info:{},
      aid:0,
      aType:0,
      aData:{},
      depreciation:{ // 折旧信息
        type:1,
        cost:0,
        depreciationLife:0,
        zjPrice:0,
        zjMonth:0,
        dateOfFinancialEntry:''
      },
    }
  },
  watch: {
    id(newName, oldName) {
      this.aid = newName
      this.queryAsetsCard()
    },
    assetsType(newName, oldName){
      this.aType = newName
    },
    assetsTypeData(newName, oldName){
      this.aData = newName
    }
  },
  mounted() {
    this.aid = this.id
    this.aType = this.assetsType
    this.aData = this.assetsTypeData
    this.queryAsetsCard()
  },
  methods: {
    typeData(data){
      this.aData = data
    },
    // 查询卡片信息
    async queryAsetsCard(){
      if (!this.id){
        return false
      }
      const res = this.oper === 'yw' ? await getoldCardinfo({ id:this.id }) : await getAssetsCard({ id:this.id })
      if (res.code!=='0'){
        this.$emit('returnBack')
      }
      this.aType = Number(res.data.type)
      this.aData = {
        id:res.data.typeId,
        type:res.data.type,
        name:res.data.typeName,
        label:res.data.typeName
      }
      switch (this.aType) {
      case 1: // 1-房屋 housingInfoDto
        this.info = res.data.housingInfoVo
        this.financeData = res.data.housingInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.housingInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.housingInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.equipmentInfoVo.dateOfFinancialEntry
        }
        break
      case 2: // 2-设备 equipmentInfoDto
        this.info = res.data.equipmentInfoVo
        this.financeData = res.data.equipmentInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.equipmentInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.equipmentInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.equipmentInfoVo.dateOfFinancialEntry
        }
        break
      case 3: // 3-文物 culturalRelicsInfoDto
        this.info = res.data.culturalRelicsInfoVo
        this.financeData = res.data.culturalRelicsInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.culturalRelicsInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.culturalRelicsInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.culturalRelicsInfoVo.dateOfFinancialEntry
        }
        break
      case 4: // 4-图书 bookInfoDto
        this.info = res.data.bookInfoVo
        this.financeData = res.data.bookInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.bookInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.bookInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.bookInfoVo.dateOfFinancialEntry
        }
        break
      case 5: // 5-家具 furnitureInfoDto
        this.info = res.data.furnitureInfoVo
        this.financeData = res.data.furnitureInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.furnitureInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.furnitureInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.furnitureInfoVo.dateOfFinancialEntry
        }
        break
      case 6: // 6-动植物 plantAnimalInfoDto
        this.info = res.data.plantAnimalInfoVo
        this.financeData = res.data.plantAnimalInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.plantAnimalInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.plantAnimalInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.plantAnimalInfoVo.dateOfFinancialEntry
        }
        break
      case 7: // 7-物资 suppliesInfoDto
        this.info = res.data.suppliesInfoVo
        this.financeData = res.data.suppliesInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.suppliesInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.suppliesInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.suppliesInfoVo.dateOfFinancialEntry
        }
        break
      case 101: // 101-构筑物 structuresInfoDto
        this.info = res.data.structuresInfoVo
        this.financeData = res.data.structuresInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.structuresInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.structuresInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.structuresInfoVo.dateOfFinancialEntry
        }
        break
      case 102: // 102-土地 landInfoDto
        this.info = res.data.landInfoVo
        this.financeData = res.data.landInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.landInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.landInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.landInfoVo.dateOfFinancialEntry
        }
        break
      case 201: // 201-车辆 vehicleInfoDto
        this.info = res.data.vehicleInfoVo
        this.financeData = res.data.vehicleInfoVo
        if (this.info.stateDepreciation!=='不提折旧'){
          this.depreciation.cost = parseFloat(res.data.vehicleInfoVo.cost)
          this.depreciation.depreciationLife = parseFloat(res.data.vehicleInfoVo.depreciationLife)
          this.depreciation.dateOfFinancialEntry = res.data.vehicleInfoVo.dateOfFinancialEntry
        }
        break
      default:
        break
      }
      this.depreciation.zjMonth = this.monDiff(this.depreciation.dateOfFinancialEntry,moment(new Date()).format('YYYY-MM-DD'))
      if (this.depreciation.zjMonth>0){
        this.depreciation.zjPrice = this.depreciation.zjMonth < this.depreciation.depreciationLife ? ((this.depreciation.cost / this.depreciation.depreciationLife) * this.depreciation.zjMonth).toFixed(2) : this.depreciation.cost
      }
      this.$emit('updata',this.assetsType,this.assetsTypeData,this.depreciation,this.info,this.financeData)
    },
    // 获取时间跨度
    monDiff(startTime, endTime) {
      startTime = new Date(startTime)
      endTime = new Date(endTime)
      if ((endTime.getYear() == startTime.getYear()) && (endTime.getMonth() == startTime.getMonth())&& endTime>startTime) {
        return 1
      } else if (endTime>startTime && (endTime.getYear() == startTime.getYear())) {
        return (endTime.getYear() - startTime.getYear()) * 12 + endTime.getMonth() - startTime.getMonth()+1
      } else if (endTime>startTime && (endTime.getYear() > startTime.getYear())){
        return (endTime.getYear() - startTime.getYear()) * 12 + endTime.getMonth() - startTime.getMonth()
      }
      return 0
    },
    // 保存卡片信息
    async submitForm() {
      const basics = this.$refs.Basics.submitForm('ruleForm')
      const info = this.$refs.BasicsOther.submitForm('ruleForm')
      const finance = this.$refs.Finance.submitForm('ruleForm')
      const other = this.$refs.Other.submitForm('ruleForm')
      if (basics===false || info===false || finance===false ||other===false){
        return false
      }
      // let data = {...basics,...info,...finance,...other}
      let data = Object.assign(basics, info,finance,other)
      let postData = {
        typeInfoId:basics.typeId
      }
      switch (Number(this.aType)) {
      case 1: // 1-房屋 housingInfoDto
        postData.housingInfoDto = data
        break
      case 2: // 2-设备 equipmentInfoDto
        postData.equipmentInfoDto = data
        break
      case 3: // 3-文物 culturalRelicsInfoDto
        postData.culturalRelicsInfoDto = data
        break
      case 4: // 4-图书 bookInfoDto
        postData.bookInfoDto = data
        break
      case 5: // 5-家具 furnitureInfoDto
        postData.furnitureInfoDto = data
        break
      case 6: // 6-动植物 plantAnimalInfoDto
        postData.plantAnimalInfoDto = data
        break
      case 7: // 7-物资 suppliesInfoDto
        postData.suppliesInfoDto = data
        break
      case 101: // 101-构筑物 structuresInfoDto
        postData.structuresInfoDto = data
        break
      case 102: // 102-土地 landInfoDto
        postData.landInfoDto = data
        break
      case 201: // 201-车辆 vehicleInfoDto
        postData.vehicleInfoDto = data
        break
      default:
        break
      }
      this.$emit('submitForm',postData,this.assetsTypeData)
    },
  }
}
</script>

<style lang="scss" scoped>
.card-info {
    .submit {
        margin: 20px 0 10px 0;
        text-align: center;
    }
}
</style>
