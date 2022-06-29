<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输船舶信息详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />船舶基础信息
    </div>
    <div class="list-column-wrap">
      <div class="info-list">
        <div class="label">
          船舶中文名称：
        </div><div class="content">
          {{ info.shipName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          曾用名：
        </div><div class="content">
          {{ info.usedName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶英文名称：
        </div><div class="content">
          {{ info.shipEnglishName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船籍港：
        </div><div class="content">
          {{ info.registryPort }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          运输区域：
        </div><div class="content">
          {{ info.transportArea }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          运输主水系类型：
        </div><div class="content">
          {{ info.transportRiverType }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          沿海内河：
        </div><div class="content">
          {{ info.coastalInland }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          运输货物类型：
        </div><div class="content">
          {{ info.transportGoodsType }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶初次登记号：
        </div><div class="content">
          {{ info.shipFirstRegisterNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶识别号：
        </div><div class="content">
          {{ info.shipIdentifyNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶登记号：
        </div><div class="content">
          {{ info.shipRegisterNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船检登记号：
        </div><div class="content">
          {{ info.shipRegisterNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          识别号生成时间：
        </div><div class="content">
          {{ info.identifyNoDate }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶所有人：
        </div><div class="content">
          {{ info.shipOwner }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          所占船舶股份：
        </div><div class="content">
          {{ info.shares }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶经营人：
        </div><div class="content">
          {{ info.shipOperator }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          经营人许可证号码：
        </div><div class="content">
          {{ info.operatorLicenceNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶管理人：
        </div><div class="content">
          {{ info.shipCustodian }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          管理人许可证号码：
        </div><div class="content">
          {{ info.custodianLicenceNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶类型：
        </div><div class="content">
          {{ info.shipType }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船体材料：
        </div><div class="content">
          {{ info.hullMaterial }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶总吨：
        </div><div class="content">
          {{ info.shipTotalTons }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          净吨位：
        </div><div class="content">
          {{ info.netTons }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          主机功率（千瓦）：
        </div><div class="content">
          {{ info.hostPower }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          主机数量（台）：
        </div><div class="content">
          {{ info.hostNum }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          建成日期：
        </div><div class="content">
          {{ info.completionDate }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          改建日期：
        </div><div class="content">
          {{ info.rebuildDate }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船长：
        </div><div class="content">
          {{ info.captain }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          总长：
        </div><div class="content">
          {{ info.totalLength }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          型宽：
        </div><div class="content">
          {{ info.width }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          型深：
        </div><div class="content">
          {{ info.depth }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          参考载货量：
        </div><div class="content">
          {{ info.referenceCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载重吨（吨）：
        </div><div class="content">
          {{ info.netWeightTons }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载箱量（TEU）：
        </div><div class="content">
          {{ info.loadingCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载气量（立方米）：
        </div><div class="content">
          {{ info.gasCarryingCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载车量（车位）：
        </div><div class="content">
          {{ info.vehicleCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载客定额（客位）：
        </div><div class="content">
          {{ info.passengerQuota }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶来历：
        </div><div class="content">
          {{ info.shipOrigin }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          满载吃水：
        </div><div class="content">
          {{ info.fullDraft }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          空载吃水：
        </div><div class="content">
          {{ info.loadDraft }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船检航区：
        </div><div class="content">
          {{ info.shipSurveyArea }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          本船是否符合内河货运船舶船型主尺度系列标准：
        </div><div class="content">
          {{ info.isConformStandard }}
        </div>
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /> 船舶营业证信息
    </div>
    <div class="list-column-wrap">
      <div class="info-list">
        <div class="label">
          船舶营运证编号：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipLicenseNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶中文名称：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          曾用名：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.usedName }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船籍港：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.registryPort }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶登记号：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipRegisterNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船检登记号：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipSurveyRegisterNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶所有人：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipOwner }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶经营人：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipOperator }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          经营人许可证号码：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.operatorLicenceNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶管理人：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipCustodian }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          管理人许可证号码：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.custodianLicenceNo }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶类型：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipType }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船体材料：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.hullMaterial }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶总吨：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.shipTotalTons }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          主机功率（千瓦）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.hostPower }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          主机数量（台）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.hostNum }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          建成日期：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.completionDate }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          改建日期：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.rebuildDate }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载重吨（吨）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.netWeightTons }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载箱量（TEU）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.loadingCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载气量（立方米）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.gasCarryingCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载车量（车位）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.vehicleCapacity }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          载客定额（客位）：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.passengerQuota }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          船舶经营人许可证核定的经营范围：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.approvedBusinessScope }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          本船核定的经营范围：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.businessScope }}
        </div>
      </div>
      <div class="info-list">
        <div class="label">
          本船是否符合内河货运船舶船型主尺度系列标准：
        </div><div class="content">
          {{ info.enterpriseShipLicenseInfoVo && info.enterpriseShipLicenseInfoVo.isConformStandard }}
        </div>
      </div>
      <div class="info-list">
        <div class="label" /><div class="content" />
      </div>
    </div>
    <div class="backstage-edit-btn">
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
import { getInfo } from '@/api/water-transportation-services/information/enterprise-ship'
export default {
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    const res = await getInfo(this.$route.query.id)
    this.info = res.data
  }
}
</script>
