<template>
  <div class="type-detail">
    <div class="icon-title">
      <span class="span" />设施详细信息
    </div>
     <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <template v-if="facilityCategory === '2'">
        <el-descriptions-item label="储罐名称或编号:">{{ formData.enterpriseFacilityTankInfoDto.tankName }}</el-descriptions-item>
        <el-descriptions-item label="罐区名称:">{{ formData.enterpriseFacilityTankInfoDto.tankAreaName }}</el-descriptions-item>
        <el-descriptions-item label="罐组名称:">{{ formData.enterpriseFacilityTankInfoDto.tankGroupName }}</el-descriptions-item>
        <el-descriptions-item label="所属企业:">{{ formData.enterpriseFacilityTankInfoDto.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="储罐形状:">{{ formData.enterpriseFacilityTankInfoDto.tankShape }}</el-descriptions-item>
        <el-descriptions-item label="储罐形式:">{{ formData.enterpriseFacilityTankInfoDto.tankForm }}</el-descriptions-item>
        <el-descriptions-item label="储罐材质:">{{ formData.enterpriseFacilityTankInfoDto.tankMaterial }}</el-descriptions-item>
        <el-descriptions-item label="容积:">{{ formData.enterpriseFacilityTankInfoDto.tankVolume }}</el-descriptions-item>
        <el-descriptions-item label="罐内直径:">{{ formData.enterpriseFacilityTankInfoDto.internalDiameter }}</el-descriptions-item>
        <el-descriptions-item label="高高液位:">{{ formData.enterpriseFacilityTankInfoDto.highLiquidLevel }}</el-descriptions-item>
        <el-descriptions-item label="低低液位:">{{ formData.enterpriseFacilityTankInfoDto.lowLiquidLevel }}</el-descriptions-item>
        <el-descriptions-item label="设计储存货物名称:">{{ formData.enterpriseFacilityTankInfoDto.storageCargoName }}</el-descriptions-item>
        <el-descriptions-item label="许可储存介质:">{{ formData.enterpriseFacilityTankInfoDto.storageMedium }}</el-descriptions-item>
        <el-descriptions-item label="是否有设计资料:">{{ getName(formData.enterpriseFacilityTankInfoDto.hadDesignData) }}</el-descriptions-item>
        <el-descriptions-item label="设计单位名称:">{{ formData.enterpriseFacilityTankInfoDto.designerName }}</el-descriptions-item>
        <el-descriptions-item label="设计单位资质:">{{ formData.enterpriseFacilityTankInfoDto.designerQualification }}</el-descriptions-item>
        <el-descriptions-item label="设计压力:">{{ formData.enterpriseFacilityTankInfoDto.designedPressure }}</el-descriptions-item>
        <el-descriptions-item label="设计温度:">{{ formData.enterpriseFacilityTankInfoDto.designedTemperature }}</el-descriptions-item>
        <el-descriptions-item label="建造日期:">{{ formData.enterpriseFacilityTankInfoDto.buildDate }}</el-descriptions-item>
        <el-descriptions-item label="是否有建造工程资料（竣工资料）:">{{ getName(formData.enterpriseFacilityTankInfoDto.hadBuildData) }}</el-descriptions-item>
        <el-descriptions-item label="建造单位名称:">{{ formData.enterpriseFacilityTankInfoDto.builderName }}</el-descriptions-item>
        <el-descriptions-item label="建造单位资质:">{{ formData.enterpriseFacilityTankInfoDto.builderQualification }}</el-descriptions-item>
        <el-descriptions-item label="设计使用寿命:">{{ formData.enterpriseFacilityTankInfoDto.useLife }}</el-descriptions-item>
        <el-descriptions-item label="检测周期:">{{ ['','周','月','季', '年'][Number(formData.enterpriseFacilityTankInfoDto.testPeriod)] }}</el-descriptions-item>
        <el-descriptions-item label="是否对储罐维修过:">{{ getName(formData.enterpriseFacilityTankInfoDto.isRepaired) }}</el-descriptions-item>
        <el-descriptions-item label="下次检测时间:">{{ formData.enterpriseFacilityTankInfoDto.nextTestDate }}</el-descriptions-item>
        <el-descriptions-item label="安全负责人（联系人）姓名:">{{ formData.enterpriseFacilityTankInfoDto.contactName }}</el-descriptions-item>
        <el-descriptions-item label="联系人邮箱:">{{ formData.enterpriseFacilityTankInfoDto.contactEmail }}</el-descriptions-item>
        <el-descriptions-item label="联系电话:">{{ formData.enterpriseFacilityTankInfoDto.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="港口危险货物作业附证编号:">{{ formData.enterpriseFacilityTankInfoDto.certificateNo }}</el-descriptions-item>
        <el-descriptions-item label="维修时间:">{{ formData.enterpriseFacilityTankInfoDto.repairTime }}</el-descriptions-item>
        <el-descriptions-item label="维修部位:">{{ formData.enterpriseFacilityTankInfoDto.repairPosition }}</el-descriptions-item>
        <el-descriptions-item label="维修方式:">{{ formData.enterpriseFacilityTankInfoDto.repairMode }}</el-descriptions-item>
        <el-descriptions-item label="备注:">{{ formData.enterpriseFacilityTankInfoDto.remark }}</el-descriptions-item>
      </template>
       <template v-if="facilityCategory === '4'">
        <el-descriptions-item label="仓库名称或编号:">{{ formData.enterpriseFacilityWarehouseInfoDto.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="主要货种:">{{ formData.enterpriseFacilityWarehouseInfoDto.cargoCategory }}</el-descriptions-item>
        <el-descriptions-item label="生产火灾类别:">{{ formData.enterpriseFacilityWarehouseInfoDto.fireCategory }}</el-descriptions-item>
        <el-descriptions-item label="抗震等级:">{{ formData.enterpriseFacilityWarehouseInfoDto.seismicLevel }}</el-descriptions-item>
        <el-descriptions-item label="耐火等级:">{{ formData.enterpriseFacilityWarehouseInfoDto.refractoryLevel }}</el-descriptions-item>
        <el-descriptions-item label="占地面积:">{{ formData.enterpriseFacilityWarehouseInfoDto.coveredArea }}</el-descriptions-item>
        <el-descriptions-item label="建筑面积:">{{ formData.enterpriseFacilityWarehouseInfoDto.buildArea }}</el-descriptions-item>
        <el-descriptions-item label="仓容:">{{ formData.enterpriseFacilityWarehouseInfoDto.warehouseVolume }}</el-descriptions-item>
        <el-descriptions-item label="投用时间:">{{ formData.enterpriseFacilityWarehouseInfoDto.useDate }}</el-descriptions-item>
        <el-descriptions-item label="检测周期:">{{ ['','周','月','季', '年'][Number(formData.enterpriseFacilityWarehouseInfoDto.testPeriod)] }}</el-descriptions-item>
        <el-descriptions-item label="备注:">{{ formData.enterpriseFacilityWarehouseInfoDto.remark }}</el-descriptions-item>
      </template>
      <template v-if="facilityCategory === '3'">
        <el-descriptions-item label="堆场名称或编号:">{{ formData.enterpriseFacilityYardInfoDto.yardName }}</el-descriptions-item>
        <el-descriptions-item label="所属企业名称:">{{ formData.enterpriseFacilityYardInfoDto.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="设计存储的危险货物类别:">{{ formData.enterpriseFacilityYardInfoDto.originalCategory }}</el-descriptions-item>
        <el-descriptions-item label="许可堆存的危险货物类别:">{{ formData.enterpriseFacilityYardInfoDto.allowedCategory }}</el-descriptions-item>
        <el-descriptions-item label="堆场火灾危险性:">{{ formData.enterpriseFacilityYardInfoDto.yarFireRisk }}</el-descriptions-item>
        <el-descriptions-item label="消防许可的火灾危险性:">{{ formData.enterpriseFacilityYardInfoDto.allowedFireRisk }}</el-descriptions-item>
        <el-descriptions-item label="堆场位置类型:">{{ formData.enterpriseFacilityYardInfoDto.yardLocationType }}</el-descriptions-item>
        <el-descriptions-item label="堆场用途:">{{ formData.enterpriseFacilityYardInfoDto.yardPurpose }}</el-descriptions-item>
        <el-descriptions-item label="港口危险货物作业附证编号:">{{ formData.enterpriseFacilityYardInfoDto.certificateNo }}</el-descriptions-item>
        <el-descriptions-item label="危险货物包装方式:">{{ formData.enterpriseFacilityYardInfoDto.packingMode }}</el-descriptions-item>
        <el-descriptions-item label="堆场面积:">{{ formData.enterpriseFacilityYardInfoDto.yardArea }}</el-descriptions-item>
        <el-descriptions-item label="堆场容量:">{{ formData.enterpriseFacilityYardInfoDto.yardVolume }}</el-descriptions-item>
        <el-descriptions-item label="集装箱堆场堆存能力:">{{ formData.enterpriseFacilityYardInfoDto.containerStorage }}</el-descriptions-item>
        <el-descriptions-item label="投用时间:">{{ formData.enterpriseFacilityYardInfoDto.useDate }}</el-descriptions-item>
        <el-descriptions-item label="备注:">{{ formData.enterpriseFacilityYardInfoDto.remark }}</el-descriptions-item>
      </template>
      <template v-if="facilityCategory === '5'">
        <el-descriptions-item label="船名:">{{ formData.enterpriseFacilityPontoonInfoDto.boatName }}</el-descriptions-item>
        <el-descriptions-item label="船籍港:">{{ formData.enterpriseFacilityPontoonInfoDto.registryPort }}</el-descriptions-item>
        <el-descriptions-item label="港内/沿海:">{{ formData.enterpriseFacilityPontoonInfoDto.location }}</el-descriptions-item>
        <el-descriptions-item label="船舶种类:">{{ formData.enterpriseFacilityPontoonInfoDto.boatCategory }}</el-descriptions-item>
        <el-descriptions-item label="建造日期:">{{ formData.enterpriseFacilityPontoonInfoDto.buildDate }}</el-descriptions-item>
        <el-descriptions-item label="改造日期:">{{ formData.enterpriseFacilityPontoonInfoDto.reformDate }}</el-descriptions-item>
        <el-descriptions-item label="配员（人）:">{{ formData.enterpriseFacilityPontoonInfoDto.manning }}</el-descriptions-item>
        <el-descriptions-item label="总吨（吨）:">{{ formData.enterpriseFacilityPontoonInfoDto.totalTons }}</el-descriptions-item>
        <el-descriptions-item label="净吨（吨）:">{{ formData.enterpriseFacilityPontoonInfoDto.netTons }}</el-descriptions-item>
        <el-descriptions-item label="载重吨（吨）:">{{ formData.enterpriseFacilityPontoonInfoDto.loading }}</el-descriptions-item>
        <el-descriptions-item label="船长（米）:">{{ formData.enterpriseFacilityPontoonInfoDto.boatLength }}</el-descriptions-item>
        <el-descriptions-item label="船宽（米）:">{{ formData.enterpriseFacilityPontoonInfoDto.boatWidth }}</el-descriptions-item>
        <el-descriptions-item label="吃水（米）:">{{ formData.enterpriseFacilityPontoonInfoDto.boatDraw }}</el-descriptions-item>
        <el-descriptions-item label="主机功率（kw）:">{{ formData.enterpriseFacilityPontoonInfoDto.stopPort }}</el-descriptions-item>
        <el-descriptions-item label="适航证书下次检验时间:">{{ formData.enterpriseFacilityPontoonInfoDto.nextTime }}</el-descriptions-item>
      </template>
      <template v-if="facilityCategory === '7'">
        <el-descriptions-item label="管线数量:">{{ formData.enterpriseFacilityPipelineInfoDto.pipelineNum }}</el-descriptions-item>
        <el-descriptions-item label="管线总长度:">{{ formData.enterpriseFacilityPipelineInfoDto.totalLength }}</el-descriptions-item>
      </template>
      <template v-if="facilityCategory === '6'">
        <el-descriptions-item label="环保设施名称:">{{ formData.enterpriseFacilityEnvironmentInfoDto.environmentName }}</el-descriptions-item>
        <el-descriptions-item label="环保设施编号:">{{ formData.enterpriseFacilityEnvironmentInfoDto.environmentCode }}</el-descriptions-item>
        <el-descriptions-item label="环保设施种类:">{{ formData.enterpriseFacilityEnvironmentInfoDto.environmentCategory }}</el-descriptions-item>
        <el-descriptions-item label="建设时间:">{{ formData.enterpriseFacilityEnvironmentInfoDto.buildTime }}</el-descriptions-item>
        <el-descriptions-item label="投入时间:">{{ formData.enterpriseFacilityEnvironmentInfoDto.investTime }}</el-descriptions-item>
        <el-descriptions-item label="检测周期:">{{ ['','周','月','季', '年'][Number(formData.enterpriseFacilityEnvironmentInfoDto.testPeriod)] }}</el-descriptions-item>
        <el-descriptions-item label="上次检测时间:">{{ formData.enterpriseFacilityEnvironmentInfoDto.lastTime }}</el-descriptions-item>
      </template>
      <template v-if="facilityCategory === '1'">
        <el-descriptions-item label="泊位名称:">{{ formData.enterpriseFacilityBerthInfoDto.berthName }}</el-descriptions-item>
        <el-descriptions-item label="港区名称:">{{ formData.enterpriseFacilityBerthInfoDto.portAreaName }}</el-descriptions-item>
        <el-descriptions-item label="所属企业:">{{ formData.enterpriseFacilityBerthInfoDto.affiliatedEnterprise }}</el-descriptions-item>
        <el-descriptions-item label="使用企业:">{{ formData.enterpriseFacilityBerthInfoDto.usingEnterprise }}</el-descriptions-item>
        <el-descriptions-item label="服务类型:">{{ formData.enterpriseFacilityBerthInfoDto.serviceType }}</el-descriptions-item>
        <el-descriptions-item label="结构形式:">{{ formData.enterpriseFacilityBerthInfoDto.structuralStyle }}</el-descriptions-item>
        <el-descriptions-item label="主要用途（集装箱等）:">{{ formData.enterpriseFacilityBerthInfoDto.mainUses }}</el-descriptions-item>
        <el-descriptions-item label="泊位用途:">{{ formData.enterpriseFacilityBerthInfoDto.berthUsage }}</el-descriptions-item>
        <el-descriptions-item label="前沿设计水深:">{{ formData.enterpriseFacilityBerthInfoDto.designDepth }}</el-descriptions-item>
        <el-descriptions-item label="泊位长度（米）:">{{ formData.enterpriseFacilityBerthInfoDto.berthLength }}</el-descriptions-item>
        <el-descriptions-item label="设计靠泊能力（万吨）:">{{ formData.enterpriseFacilityBerthInfoDto.berthingCapacity }}</el-descriptions-item>
        <el-descriptions-item label="散装:">{{ formData.enterpriseFacilityBerthInfoDto.bulk }}</el-descriptions-item>
        <el-descriptions-item label="件杂货物年通过能力（万吨/万标准箱/万辆/万人）:" :span="2">{{ formData.enterpriseFacilityBerthInfoDto.groceriesCarryingCapacity }}</el-descriptions-item>
        <el-descriptions-item label="旅客年通过能力:">{{ formData.enterpriseFacilityBerthInfoDto.passengersCarryingCapacity }}</el-descriptions-item>
        <el-descriptions-item label="滚装汽车年通过能力:">{{ formData.enterpriseFacilityBerthInfoDto.rollCarryingCapacity }}</el-descriptions-item>
        <el-descriptions-item label="是否装卸危险货物:">{{ getName(formData.enterpriseFacilityBerthInfoDto.isDangerous) }}</el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    facilityCategory: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getName(num) {
      return num === '1' ? '是': num === '0' ? '否' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 12%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
