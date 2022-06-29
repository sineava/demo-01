<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 国籍证书编号
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      label-class-name="business-title"
      content-class-name="business-text"
      border
    >
      <el-descriptions-item label="证书编号" :span="2">{{ info.certPrintNo }}</el-descriptions-item>

      <el-descriptions-item label="船名">{{ info.shipNameCn }}</el-descriptions-item>
      <el-descriptions-item label="曾用名">{{ info.origShipNameCn }}</el-descriptions-item>

      <el-descriptions-item label="船籍港">{{ info.regPortCode }}</el-descriptions-item>
      <el-descriptions-item label="船舶种类">{{ info.shipType }}</el-descriptions-item>

      <el-descriptions-item label="船舶呼号">{{ info.shipCallSign }}</el-descriptions-item>
      <el-descriptions-item label="IMO编号">{{ info.shipImo }}</el-descriptions-item>

      <el-descriptions-item label="船体材料">{{ info.hullMaterial }}</el-descriptions-item>
      <el-descriptions-item />

      <el-descriptions-item label="造船厂">{{ info.shipYardCn }}</el-descriptions-item>
      <el-descriptions-item label="造船地点">{{ info.shipBuiltAddrCn }}</el-descriptions-item>

      <el-descriptions-item label="建成日期">{{ info.completionDate }}</el-descriptions-item>
      <el-descriptions-item />

      <el-descriptions-item label="改建船厂">{{ info.conversionShipyard }}</el-descriptions-item>
      <el-descriptions-item label="改建日期">{{ info.rebuildDate }}</el-descriptions-item>

      <el-descriptions-item label="船舶总长">{{ info.totalLength }}</el-descriptions-item>
      <el-descriptions-item label="船舶型宽">{{ info.width }}</el-descriptions-item>

      <el-descriptions-item label="船舶型深">{{ info.depth }}</el-descriptions-item>
      <el-descriptions-item label="船舶总吨">{{ info.shipTotalTons }}</el-descriptions-item>

      <el-descriptions-item label="净吨位">{{ info.netTons }}</el-descriptions-item>
      <el-descriptions-item label="参考载货量">{{ info.referenceCapacity }}</el-descriptions-item>

      <el-descriptions-item label="主机种类">{{ info.shipEngineType }}</el-descriptions-item>
      <el-descriptions-item label="主机数量（台）">{{ info.hostNum }}</el-descriptions-item>

      <el-descriptions-item label="主机功率（千瓦）">{{ info.hostPower }}</el-descriptions-item>
      <el-descriptions-item label="推进器种类">{{ info.shipPropellerKind }}</el-descriptions-item>

      <el-descriptions-item label="推进器数量">{{ info.shipRebuiltAddrCn }}</el-descriptions-item>
      <el-descriptions-item />

      <el-descriptions-item label="船舶所有人">{{ info.shipOwnerCn }}</el-descriptions-item>
      <el-descriptions-item label="船舶所有人地址">{{ info.shipOwnerAddrCn }}</el-descriptions-item>

      <el-descriptions-item label="船长">{{ info.captain }}</el-descriptions-item>
      <el-descriptions-item label="发证日期">{{ info.certObtainDate }}</el-descriptions-item>

      <el-descriptions-item label="证书起始有效期">{{ info.effectiveDate }}</el-descriptions-item>
      <el-descriptions-item label="证书截至有效期">{{ info.expireDate }}</el-descriptions-item>

      <el-descriptions-item label="MMSI编号">{{ info.mmsi }}</el-descriptions-item>

      <el-descriptions-item label="载重吨（吨）">{{ info.netWeightTons }}</el-descriptions-item>
      <el-descriptions-item label="发证机关及其编号">{{ info.orgCode }}</el-descriptions-item>

      <el-descriptions-item label="船舶状态">{{ info.shipStatus }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { getCertificate } from '@/api/ship-inspection/electronic-archives/ship-basic'
export default {
  data() {
    return {
      info: {}
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  async mounted() {
    this.info = (await getCertificate(this.id)).data
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
        width: 40%;
        line-height: 30px;
    }
}
</style>
