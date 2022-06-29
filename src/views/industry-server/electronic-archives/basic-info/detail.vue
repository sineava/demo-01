<template>
<div>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <span v-if="searchId">船舶数据管理</span>
        <el-page-header v-else @back="returnBack" content="船舶数据管理" />
      </span>
      <span class="detail-header-button">
        <div>
          <el-button
            :type="tabActive === 1 ? 'primary' : ''"
            @click="tabActive = 1"
          >
            船舶基本信息
          </el-button>
          <el-button
            :type="tabActive === 2 ? 'primary' : ''"
            @click="tabActive = 2"
          >
            船舶识别号
          </el-button>
          <el-button
            :type="tabActive === 3 ? 'primary' : ''"
            @click="tabActive = 3"
          >
            国籍登记证书
          </el-button>
          <el-button
            :type="tabActive === 4 ? 'primary' : ''"
            @click="tabActive = 4"
          >
            所有权证书
          </el-button>
          <el-button
            :type="tabActive === 5 ? 'primary' : ''"
            @click="tabChange(5)"
          >
            船检信息
          </el-button>
        </div>
        <el-button type="success" :loading="btnLoading" @click="updateInfo">更新信息</el-button>
      </span>
    </div>
    <basic-info v-if="tabActive === 1" :info="info" />
    <ship-identification-number v-if="tabActive === 2" :id="id" />
    <nationality-registration v-if="tabActive === 3" :id="id" />
    <certificate-ownership v-if="tabActive === 4" :id="id" />
    <substituting-record
      v-if="tabActive === 5 && substitutingList.length"
      :list="substitutingList"
      @tabClick="substitutingId = $event"
    />
  </el-card>
  <record-info v-if="substitutingId" :id="substitutingId" />
</div>
</template>

<script>
import BasicInfo from "./components/BasicInfo.vue";
import ShipIdentificationNumber from "./components/ShipIdentificationNumber.vue";
import NationalityRegistration from "./components/NationalityRegistration.vue";
import CertificateOwnership from "./components/CertificateOwnership.vue";
import SubstitutingRecord from '../components/SubstitutingRecord.vue'
import RecordInfo from '../components/RecordInfo.vue'
import { updateShipInfo, shipInsRegInfo } from '@/api/ship-inspection/records/index'
import { getInfo } from '@/api/ship-inspection/electronic-archives/ship-basic'
export default {
  components: {
    BasicInfo,
    ShipIdentificationNumber,
    NationalityRegistration,
    CertificateOwnership,
    SubstitutingRecord,
    RecordInfo
  },
  props: {
    searchId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      id: 0,
      tabActive: 1,
      btnLoading: false,
      info: {},
      substitutingList: [],
      substitutingId: ''
    };
  },
  mounted() {
    this.id = Number(this.searchId || this.$route.query.id)
    this.getBaseInfo()
  },
  methods: {
    tabChange(num) {
      this.tabActive = num;
      this.updateShip()
    },
    async updateShip() {
      this.substitutingList = (await shipInsRegInfo(this.id))?.data || []
    },
    async getBaseInfo() {
      this.info = (await getInfo(this.id))?.data || {}
    },
    updateInfo() {
      this.btnLoading = true
      updateShipInfo({shipIdentifyNo: this.info.shipIdentifyNo}).then(res => {
        this.btnLoading = false
        if (res.code === '0') {
          this.$message.success('更新成功')
          this.tabActive = 1
          this.getBaseInfo()
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .clearfix {
  display: flex;
  align-items: center;

  .detail-header-button {
    margin-left: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>