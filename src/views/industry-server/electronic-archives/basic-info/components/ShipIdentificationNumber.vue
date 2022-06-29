<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 船舶识别号基本信息
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
      <el-descriptions-item label="船名">{{ info.shipName }}</el-descriptions-item>
      <el-descriptions-item label="船舶识别号">{{ info.shipIdentifyNo }}</el-descriptions-item>
      <el-descriptions-item label="受理人单位">{{ info.orgCode }}</el-descriptions-item>
      <el-descriptions-item label="授号日期">{{ info.awardNoDate }}</el-descriptions-item>
      <el-descriptions-item label="申请船舶类型">{{ info.applyShipType }}</el-descriptions-item>
      <el-descriptions-item label="申请受理时间">{{ info.applyProcessDate }}</el-descriptions-item>

      <el-descriptions-item label="拟申请中文船名">{{ info.applyShipNameCn }}</el-descriptions-item>
      <el-descriptions-item label="拟申请英文船名">{{ info.applyShipNameEn }}</el-descriptions-item>
      <el-descriptions-item label="船舶总长（米）">{{ info.totalLength }}</el-descriptions-item>
      <el-descriptions-item label="船舶型宽（米）">{{ info.width }}</el-descriptions-item>
      <el-descriptions-item label="船舶型深（米）">{{ info.depth }}</el-descriptions-item>
      <el-descriptions-item label="船舶总吨">{{ info.shipTotalTons }}</el-descriptions-item>
      <el-descriptions-item label="船舶净吨位">{{ info.netTons }}</el-descriptions-item>
      <el-descriptions-item label="参考载货量">{{ info.referenceCapacity }}</el-descriptions-item>
      <el-descriptions-item label="主机型号">{{ info.hostModel }}</el-descriptions-item>
      <el-descriptions-item label="主机编号">{{ info.hostNo }}</el-descriptions-item>
      <el-descriptions-item label="主机功率（千瓦）">{{ info.hostPower }}</el-descriptions-item>
      <el-descriptions-item label="主机制造商">{{ info.engineBuilder }}</el-descriptions-item>
      <el-descriptions-item label="船舶类型">{{ info.shipType }}</el-descriptions-item>
      <el-descriptions-item label="船体材料">{{ info.hullMaterial }}</el-descriptions-item>
      <el-descriptions-item label="按放龙骨日期">{{ info.securityKeelDate }}</el-descriptions-item>
      <el-descriptions-item label="IMO编号">{{ info.shipImo }}</el-descriptions-item>
      <el-descriptions-item label="检验编号">{{ info.checkoutNo }}</el-descriptions-item>
      <el-descriptions-item label="船体号">{{ info.hullNo }}</el-descriptions-item>
      <el-descriptions-item label="船舶检验机构">{{ info.checkoutOrg }}</el-descriptions-item>
      <el-descriptions-item label="图纸批准单位">{{ info.blueprintRatify }}</el-descriptions-item>
      <el-descriptions-item label="审图批准号">{{ info.approvalNo }}</el-descriptions-item>
    </el-descriptions>

    <div class="icon-title">
      <span class="span" /> 船舶建造船厂信息
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
      <el-descriptions-item label="船舶建造厂中文名称">{{ info.shipYardCn }}</el-descriptions-item>
      <el-descriptions-item label="船舶建造厂英文名称">{{ info.shipYardEn }}</el-descriptions-item>
      <el-descriptions-item label="合同号">{{ info.contractNo }}</el-descriptions-item>
      <el-descriptions-item label="同一合同订造船数">{{ info.sameContractBuildNumber }}</el-descriptions-item>
      <el-descriptions-item label="本川合同中排序">{{ info.contractSort }}</el-descriptions-item>
      <el-descriptions-item label="详细建造地点">{{ info.shipBuiltAddrCn }}</el-descriptions-item>
    </el-descriptions>

    <div class="icon-title">
      <span class="span" /> 船舶定造人信息
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
      <el-descriptions-item label="定造人中文">{{ info.startingPeopleCn }}</el-descriptions-item>
      <el-descriptions-item label="定造人英文">{{ info.startingPeopleEn }}</el-descriptions-item>
      <el-descriptions-item label="" />
    </el-descriptions>
    <div class="icon-title">
      <span class="span" /> 申请人信息
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
      <el-descriptions-item label="申请人">{{ info.applyPeople }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ info.linkPhone }}</el-descriptions-item>
      <el-descriptions-item label="邮政编码">{{ info.postalCode }}</el-descriptions-item>
      <el-descriptions-item label="申请人地址" :span="3">{{ info.applyPeopleAddr }}</el-descriptions-item>
    </el-descriptions>

    <div class="icon-title">
      <span class="span" /> 经办人信息
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
      <el-descriptions-item label="证件名称">{{ info.agentCertificateName }}</el-descriptions-item>
      <el-descriptions-item label="证件号码">{{ info.agentCertificateNo }}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{ info.agentName }}</el-descriptions-item>
      <el-descriptions-item label="联系电话" :span="3">{{ info.agentLinkPhone }}</el-descriptions-item>
      <el-descriptions-item label="邮箱" :span="3">{{ info.agentLinkPhone }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { getIdentify } from '@/api/ship-inspection/electronic-archives/ship-basic'
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
    this.info = (await getIdentify(this.id)).data
  },
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
