<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="enterpriseName" />
      </span>
    </div>
    <div class="tab-wrap" style="margin: 0 0 40px 0;">
      <el-button
        :type="tabActive === 1 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 1"
      >
        水路运输企业基本信息
      </el-button>
      <el-button
        :type="tabActive === 3 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 3"
      >
        专职管理人员信息
      </el-button>
      <el-button
        :type="tabActive === 4 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 4"
      >
        初始运力信息
      </el-button>
      <el-button
        :type="tabActive === 5 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 5"
      >
        经营许可证信息
      </el-button>
      <el-button
        :type="tabActive === 6 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 6"
      >
        船舶重大责任事故信息
      </el-button>
      <el-button
        :type="tabActive === 7 ? 'primary' : ''"
        size="mini"
        @click="tabActive = 7"
      >
        经营船舶信息
      </el-button>
    </div>
    <basic-info v-if="tabActive === 1" />
    <personnel-info v-if="tabActive === 3" />
    <transport-info v-if="tabActive === 4" />
    <licence-info v-if="tabActive === 5" />
    <accident-info v-if="tabActive === 6" />
    <management-info v-if="tabActive === 7" />
  </el-card>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
import PersonnelInfo from './components/personnelInfo/index.vue'
import TransportInfo from './components/transportInfo.vue'
import LicenceInfo from './components/licenceInfo/index.vue'
import AccidentInfo from './components/accidentInfo/index.vue'
import ManagementInfo from './components/managementInfo/index.vue'
export default {
  components: {
    BasicInfo,
    PersonnelInfo,
    TransportInfo,
    LicenceInfo,
    AccidentInfo,
    ManagementInfo
  },
  data() {
    return {
      tabActive: 1,
      enterpriseName: '',
      certificateNo:''
    }
  },
  mounted() {
    this.tabActive = this.$store.state.app.basicTabActive
    this.enterpriseName = this.$route.query.enterpriseName
    this.certificateNo = this.$route.query.certificateNo
  },
  methods: {
  }
}
</script>
