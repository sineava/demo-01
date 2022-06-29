<template>
  <el-card class="body-card port-enterprise">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="`经营企业:${enterpriseName}`" />
      </span>
      <span style="margin-left: 30px;color: #303133;font-size: 18px;">港口码头:{{wharfName}}</span>
    </div>
    <div>
      <div class="tab-wrap">
        <span style="float:left;">
          <h1>经营企业信息</h1>
          <el-radio-group
            v-model="activeName"
            size="small"
          >
            <el-radio-button label="基本信息" />
            <el-radio-button label="投资人信息" />
            <el-radio-button label="组织机构信息" />
          </el-radio-group>
        </span>
        <span style="float:left;margin-left:20px;">
          <h1>港口码头信息</h1>
          <el-radio-group
            v-model="activeName"
            size="small"
          >
            <el-radio-button label="港口基本信息" />
            <el-radio-button label="人员信息" />
            <el-radio-button label="制度信息" />
            <el-radio-button label="设施设备信息" />
            <el-radio-button label="港口经营许可证" />
            <el-radio-button label="港口危险货物作业附证" />
            <el-radio-button label="泊位信息" />
          </el-radio-group>
        </span>
      </div>
      <enterprise-info v-if="activeName === '基本信息'" />
      <port-info v-if="activeName === '港口基本信息'" @join="join" />
      <basic-staff
        v-if="activeName === '人员信息'"
        :obj-data="joinData"
        @join="join"
      />
      <staff-detail
        v-if="activeName === '人员详情'"
        :obj-data="joinData"
        @join="join"
      />
      <basic-organize
        v-if="activeName === '组织机构信息'"
        @join="join"
      />
      <organize-detail
        v-if="activeName === '组织机构详情'"
        :obj-data="joinData"
        @join="join"
      />
      <basic-system
        v-if="activeName === '制度信息'"
        @join="join"
      />
      <system-detail
        v-if="activeName === '制度详情'"
        :obj-data="joinData"
        @join="join"
      />
      <basic-equipment
        v-if="activeName === '设施设备信息'"
        @join="join"
      />
      <investor
        v-if="activeName === '投资人信息'"
        @join="join"
      />
      <berth v-if="activeName === '泊位信息'" @join="join" />
      <berthDetail
        v-if="activeName === '泊位详情'"
        :obj-data="joinData"
        @join="join"
      />
      <License
        v-if="activeName === '港口经营许可证'"
        @join="join"
      />
      <LicenseDetail
        v-if="activeName === '港口经营许可证详情'"
        :obj-data="joinData"
        @join="join"
      />
      <LicenseHistory
        v-if="activeName === '港口经营许可证历史资质'"
        :obj-data="joinData"
        @join="join"
      />
      <Certificate
        v-if="activeName === '港口危险货物作业附证'"
        @join="join"
      />
      <CertificateDetail
        v-if="activeName === '港口危险货物作业附证详情'"
        :obj-data="joinData"
        @join="join"
      />
      <CertificateHistory
        v-if="activeName === '港口危险货物作业附证历史资质'"
        :obj-data="joinData"
        @join="join"
      />
      <equipment-detail
        v-if="activeName === '设施设备详情'"
        :obj-data="joinData"
        @join="join"
      />
      <equipment-maintain
        v-if="activeName === '检测维护信息'"
        :obj-data="joinData"
        @join="join"
      />
      <maintain-detail
        v-if="activeName === '检测维护详情'"
        :obj-data="joinData"
        @join="join"
      />
    </div>
  </el-card>
</template>

<script>
import EnterpriseInfo from './components/enterpriseInfo.vue'
import PortInfo from './components/portInfo.vue'
import BasicStaff from './components/staff/index'
import StaffDetail from './components/staff/detail'
import BasicOrganize from './components/organize/index'
import OrganizeDetail from './components/organize/detail'
import BasicSystem from './components/system/index'
import SystemDetail from './components/system/detail'
import BasicEquipment from './components/equipment/index'
import EquipmentDetail from './components/equipment/detail'
import EquipmentMaintain from './components/equipment/info'
import MaintainDetail from './components/equipment/infoDetail'
import License from './components/license/index'
import LicenseDetail from './components/license/detail'
import LicenseHistory from './components/license/history'
import Certificate from './components/certificate/index'
import CertificateDetail from './components/certificate/detail'
import CertificateHistory from './components/certificate/history'
import investor from './components/investor'
import berth from './components/berth'
import berthDetail from './components/berth/detail'
import { getWharf } from '@/api/port-services/coastline/berth'
export default {
  components: {
    EnterpriseInfo,
    PortInfo,
    BasicStaff,
    StaffDetail,
    BasicOrganize,
    OrganizeDetail,
    BasicSystem,
    SystemDetail,
    BasicEquipment,
    EquipmentDetail,
    EquipmentMaintain,
    MaintainDetail,
    License,
    LicenseDetail,
    LicenseHistory,
    Certificate,
    CertificateDetail,
    CertificateHistory,
    investor,
    berth,
    berthDetail
  },
  data() {
    return {
      enterpriseName: '',
      activeName: '基本信息',
      joinData: {},
      enterpriseId:'',
      wharfName:''
    }
  },
  mounted() {
    let {name,tabs,id} = this.$route.query
    this.enterpriseName = name
    this.activeName = tabs || '基本信息'
    if(id){
      this.enterpriseId = id
      this.fetchOrgs()
    }
  },
  methods: {
    fetchOrgs() {
      this.orgLoading = true
      getWharf({enterpriseId:this.enterpriseId}).then(res => {
        if(res.data){
          let wharfName = []
          res.data.forEach(item => {
            wharfName.push(item.wharfName)
          });
          this.wharfName = wharfName.join(' / ')
        }
      })
    },
    join(obj) {
      this.activeName = obj.name
      this.joinData = obj.data || {}
    }
  }
}
</script>
<style lang="scss" scoped>
.port-enterprise{ 
  /deep/ .el-card__body{
    padding: 0 10px;
  }
  .tab-wrap{
    margin: 10px 0 20px 0;
    h1{
      font-size: 14px;
    }
    span{
      border: 1px solid #ffdba4;
      background: #ffdba4;
      padding: 5px 10px;
      border-radius: 5px;
    }
    &:after {
      content:"";
      display:block;
      height:0;
      clear:both;
      visibility:hidden
    }
  }
}
</style>
