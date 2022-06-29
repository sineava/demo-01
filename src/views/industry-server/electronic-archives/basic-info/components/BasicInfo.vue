<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 船舶基本信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      label-class-name="business-title"
      content-class-name="business-text"
      border
    >
      <el-descriptions-item label="船舶中文名称" :span="2">{{ info.shipName }}</el-descriptions-item>
      <el-descriptions-item label="协助船舶">{{ info.assistShip }}</el-descriptions-item>
      <el-descriptions-item label="船长">{{ info.captain }}</el-descriptions-item>
      <el-descriptions-item label="沿海内河">{{ info.coastalInland }}</el-descriptions-item>

      <el-descriptions-item label="建成日期">{{ info.completionDate }}</el-descriptions-item>
      <el-descriptions-item label="改建船厂名称">{{ info.conversionShipyard }}</el-descriptions-item>
      <el-descriptions-item label="改建船厂英文名称">{{ info.conversionShipyardEn }}</el-descriptions-item>

      <el-descriptions-item label="型深">{{ info.depth }}</el-descriptions-item>
      <el-descriptions-item label="融资租赁标志">{{ info.financialLeaseFlag }}</el-descriptions-item>
      <el-descriptions-item label="休眠标志">{{ info.hibernateFlag }}</el-descriptions-item>

      <el-descriptions-item label="主机数量（台）">{{ info.hostNum }}</el-descriptions-item>
      <el-descriptions-item label="主机功率（千瓦）">{{ info.hostPower }}</el-descriptions-item>
      <el-descriptions-item label="船体材料">{{ info.hullMaterial }}</el-descriptions-item>

      <el-descriptions-item label="载重吨（吨）">{{ info.loadingCapacity }}</el-descriptions-item>
      <el-descriptions-item label="原注销日期">{{ info.origDeletionDate }}</el-descriptions-item>
      <el-descriptions-item label="原籍港名称">{{ info.origRegPortName }}</el-descriptions-item>

      <el-descriptions-item label="原船英文名">{{ info.origShipNameEn }}</el-descriptions-item>
      <el-descriptions-item label="原船舶登记号">{{ info.origShipRegNo }}</el-descriptions-item>
      <el-descriptions-item label="载客定额（客位）">{{ info.passengerQuota }}</el-descriptions-item>

      <el-descriptions-item label="载箱量（TEU）">{{ info.netWeightTons }}</el-descriptions-item>
      <el-descriptions-item label="MMSI编号">{{ info.mmsi }}</el-descriptions-item>
      <el-descriptions-item label="净吨位">{{ info.netTons }}</el-descriptions-item>

      <el-descriptions-item label="改建日期">{{ info.rebuildDate }}</el-descriptions-item>
      <el-descriptions-item label="参考载货量">{{ info.referenceCapacity }}</el-descriptions-item>
      <el-descriptions-item label="船籍港">{{ info.registryPort }}</el-descriptions-item>

      <el-descriptions-item label="造船地点中文名">{{ info.shipBuiltAddrCn }}</el-descriptions-item>
      <el-descriptions-item label="造船地点英文名">{{ info.shipBuiltAddrEn }}</el-descriptions-item>
      <el-descriptions-item label="船舶呼号">{{ info.shipCallSign }}</el-descriptions-item>

      <el-descriptions-item label="主机种类">{{ info.shipEngineType }}</el-descriptions-item>
      <el-descriptions-item label="船舶英文名称">{{ info.shipEnglishName }}</el-descriptions-item>
      <el-descriptions-item label="船舶初次登记号">{{ info.shipFirstRegisterNo }}</el-descriptions-item>

      <el-descriptions-item label="船舶识别号">{{ info.shipIdentifyNo }}</el-descriptions-item>
      <el-descriptions-item label="IMO编号">{{ info.shipImo }}</el-descriptions-item>

      <el-descriptions-item label="船舶经营人地址">{{ info.shipOperatorAddr }}</el-descriptions-item>
      <el-descriptions-item label="船舶所有人地址">{{ info.shipOwnerAddr }}</el-descriptions-item>
      <el-descriptions-item label="推进器种类">{{ info.shipPropellerKind }}</el-descriptions-item>

      <el-descriptions-item label="推进器数量">{{ info.shipPropellerNum }}</el-descriptions-item>
      <el-descriptions-item label="改建地点">{{ info.shipRebuiltAddrCn }}</el-descriptions-item>
      <el-descriptions-item label="改建地点英文名">{{ info.shipRebuiltAddrEn }}</el-descriptions-item>

      <el-descriptions-item label="航海内河船标志">{{ info.shipRegionType }}</el-descriptions-item>
      <el-descriptions-item label="船舶登记号">{{ info.shipRegisterNo }}</el-descriptions-item>
      <el-descriptions-item label="船线">{{ info.shipRoute }}</el-descriptions-item>

      <el-descriptions-item label="船舶状态">{{ info.shipStatus }}</el-descriptions-item>
      <el-descriptions-item label="船舶总吨">{{ info.shipTotalTons }}</el-descriptions-item>
      <el-descriptions-item label="船舶类型">{{ info.shipType }}</el-descriptions-item>

      <el-descriptions-item label="船舶价值">{{ info.shipValue }}</el-descriptions-item>
      <el-descriptions-item label="造船厂名称">{{ info.shipYardCn }}</el-descriptions-item>
      <el-descriptions-item label="造船厂英文名称">{{ info.shipYardEn }}</el-descriptions-item>

      <el-descriptions-item label="总长">{{ info.totalLength }}</el-descriptions-item>
      <el-descriptions-item label="运输区域">{{ info.transportArea }}</el-descriptions-item>
      <el-descriptions-item label="曾用名">{{ info.usedName }}</el-descriptions-item>

      <el-descriptions-item label="载车量（车位">{{ info.vehicleCapacity }}</el-descriptions-item>
      <el-descriptions-item label="型宽">{{ info.width }}</el-descriptions-item>

      <el-descriptions-item label="备注" :span="3">{{ info.remark }}</el-descriptions-item>
      <el-descriptions-item label="休眠理由" :span="3">{{ info.hibernateRemark }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    ::v-deep .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    ::v-deep .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
