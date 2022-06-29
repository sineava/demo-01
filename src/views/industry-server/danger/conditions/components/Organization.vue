<template>
  <div class="list-column-wrap">
    <div class="info-list">
      <div class="label">
        统一社会信用代码:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.certificateNo }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        名称:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.name }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        类型:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.type }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        住所:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.officeAddress }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        法定代表人:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.legalPersonName }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        注册资本:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.registeredCapital }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        成立时间:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.issuingDate }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        营业期限:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.expiryDate }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        经营范围:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.allowedBusiness }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">
        登记机关:
      </div><div class="content">
        {{ info.enterpriseBusinessInfoVo.issuingUnit }}
      </div>
    </div>
    <div class="info-list">
      <div class="label">时间</div>
      <div class="content">{{ info.enterpriseBusinessInfoVo.timeInfo }}</div>
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
