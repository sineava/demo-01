<template>
  <div class="list-column-wrap">
    <div class="info-list info-list-two">
      <div class="label">
        项目名称:
      </div><div class="content">
        {{ info.projectName }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        负责人:
      </div><div class="content">
        {{ info.head }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        项目类别:
      </div><div class="content">
        {{ info.projectType }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        联系人:
      </div><div class="content">
        {{ info.contact }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        申请单位:
      </div><div class="content">
        {{ info.enterpriseName }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        联系电话:
      </div><div class="content">
        {{ info.phone }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        传真:
      </div><div class="content">
        {{ info.fax }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        申请事项:
      </div><div class="content">
        {{ info.applyItems }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        单位地址:
      </div><div class="content">
        {{ info.unitAddress }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        工程地址:
      </div><div class="content">
        {{ info.projectAddress }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        工程开始时间:
      </div><div class="content">
        {{ info.startTime }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        工程结束时间:
      </div><div class="content">
        {{ info.endTime }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        建设规模:
      </div><div class="content">
        {{ info.constructionScale }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        储罐容量:
      </div><div class="content">
        {{ info.tankCapacity }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        所在水域:
      </div><div class="content">
        {{ info.inWaters }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        评估机构名称:
      </div><div class="content">
        {{ info.assessmentAgencyName }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        资质证书编号:
      </div><div class="content">
        {{ info.qualificationCertificateNo }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        资质等级:
      </div><div class="content">
        {{ info.qualificationLevel }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        安全评估报告名称:
      </div><div class="content">
        {{ info.safetyAssessmentReportName }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        规划选址文件名称:
      </div><div class="content">
        {{ info.siteSelectionDocumentName }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        规划选址文件文号:
      </div><div class="content">
        {{ info.siteSelectionDocumentTitanic }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        规划选址文件发文机构:
      </div><div class="content">
        {{ info.siteSelectionDocumentOrg }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        岸线批复文件名称:
      </div><div class="content">
        {{ info.shorelineApprovalDocument }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        岸线批复文件文号:
      </div><div class="content">
        {{ info.shorelineApprovalDocumentTitanic }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        岸线批复文件发文机构:
      </div><div class="content">
        {{ info.shorelineApprovalDocumentOrg }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        安全预评价报告是否存在缺漏:
      </div><div class="content">
        {{ info.isOmissions }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        安全预评价报告对策是否合法:
      </div><div class="content">
        {{ info.documentIsLegal }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        选址条件是否合法:
      </div><div class="content">
        {{ info.addressIsLegal }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        主要技术工艺是否合法:
      </div><div class="content">
        {{ info.isProcessLegal }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        是否依法进行安全论证与评估:
      </div><div class="content">
        {{ info.isAssessment }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        是否隐瞒或提交虚假文件:
      </div><div class="content">
        {{ info.isHide }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        港口建设项目概况:
      </div><div class="content">
        {{ info.overview }}
      </div>
    </div>
    <div class="info-list info-list-two">
      <div class="label">
        装卸储主要存危险货物名称:
      </div><div class="content">
        {{ info.dangerousGoodsName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
}
</script>
