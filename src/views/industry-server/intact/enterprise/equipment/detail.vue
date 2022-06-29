<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="设施设备详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />基础信息
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
      <el-descriptions-item label="设备名称:">{{ info.facilityName }}</el-descriptions-item>
      <el-descriptions-item label="所在企业:">{{ info.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="所属港航机构:">{{ departmentName }}</el-descriptions-item>
      <el-descriptions-item v-if="info.facilityCategory" label="设备类型:">{{ type[info.facilityCategory - 1].label }}</el-descriptions-item>
      <el-descriptions-item label="负责人姓名:">{{ info.directorName }}</el-descriptions-item>
      <el-descriptions-item label="手机号码:">{{ info.contactNumber }}</el-descriptions-item>
      <el-descriptions-item label="备注:">{{ info.remark }}</el-descriptions-item>
    </el-descriptions>
    <type-card
      :facilityCategory="info.facilityCategory + ''"
      :formData="childData"
    />
  </el-card>
</template>

<script>
import { findById } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
import typeCard from './typeCard'
export default {
  components: {
    typeCard
  },
  data() {
    return {
      info: {},
      departmentName: '',
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ],
      childData: { // 子页面数据
        enterpriseFacilityTankInfoDto: {}, // 设施设备储罐信息
        enterpriseFacilityWarehouseInfoDto: {}, // 企业设施设备仓库信息
        enterpriseFacilityYardInfoDto: {}, // 企业设施设备堆场信息
        enterpriseFacilityPontoonInfoDto: {}, // 企业设施设备趸船信息
        enterpriseFacilityPipelineInfoDto: {}, // 企业设施设备管线信息
        enterpriseFacilityEnvironmentInfoDto: {}, // 企业设施设备环保设信息
        enterpriseFacilityBerthInfoDto: {} // 企业设施设备泊位信息
      },
    }
  },
  async created() {
    let { id, name } = this.$route.query
    this.departmentName = name
    const info = await findById(id)
    this.info = info?.data || {}
    this.childData = { // 子页面数据
        enterpriseFacilityTankInfoDto: info?.data?.enterpriseFacilityTankInfoVo || {}, // 设施设备储罐信息
        enterpriseFacilityWarehouseInfoDto: info?.data?.enterpriseFacilityWarehouseInfoVo ||  {}, // 企业设施设备仓库信息
        enterpriseFacilityYardInfoDto: info?.data?.enterpriseFacilityYardInfoVo || {}, // 企业设施设备堆场信息
        enterpriseFacilityPontoonInfoDto: info?.data?.enterpriseFacilityPontoonInfoVo || {}, // 企业设施设备趸船信息
        enterpriseFacilityPipelineInfoDto: info?.data?.enterpriseFacilityPipelineInfoVo || {}, // 企业设施设备管线信息
        enterpriseFacilityEnvironmentInfoDto: info?.data?.enterpriseFacilityEnvironmentInfoVo || {}, // 企业设施设备环保设信息
        enterpriseFacilityBerthInfoDto: info?.data?.enterpriseFacilityBerthInfoVo || {} // 企业设施设备泊位信息
      }
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
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
