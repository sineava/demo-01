<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口整体分布信息管理" />
      </span>
    </div>
    <Organization
      v-if="tabs===1"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Mechanism
      v-if="tabs===2"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Port
      v-if="tabs===3"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <PortArea
      v-if="tabs===4"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Task
      v-if="tabs===5"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Pier
      v-if="tabs===6"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Moor
      v-if="tabs===7"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <ShoreLine
      v-if="tabs===8"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Anchor
      v-if="tabs===9"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Railway
      v-if="tabs===10"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <Highway
      v-if="tabs===11"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <WhirlingWaters
      v-if="tabs===12"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <PortEnterprise
      v-if="tabs===13"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <PeripheryEnterprises
      v-if="tabs===14"
      :ref="`subcomponents${tabs}`"
      @initMap="initMap"
      @back="returnBack"
    />
    <div class="icon-title">
      <span v-if="tabs===8" style="margin-right: 4px; color: red;">*</span> <span v-else class="span" /> 地理信息
    </div>
    <map-table
      ref="map"
      :isEdit="isEdit"
      @change="confirmMap"
    />
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm"
      >
        提交
      </el-button>
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
import MapTable from '@/components/Maptable/index'
import Mechanism from './mechanism/detail'
import Organization from './organization/detail'
import Port from './port/detail'
import PortArea from './port-area/detail'
import Task from './task/detail'
import Pier from './pier/detail'
import Moor from './moor/detail'
import ShoreLine from './shore-line/detail'
import Anchor from './anchor/detail'
import Railway from './railway/detail'
import Highway from './highway/detail'
import WhirlingWaters from './whirling-waters/detail'
import PortEnterprise from './port-enterprise/detail'
import PeripheryEnterprises from './periphery-enterprises/detail'
export default {
  components: {
    MapTable,
    Mechanism,
    Organization,
    Port,
    PortArea,
    Task,
    Pier,
    Moor,
    ShoreLine,
    Anchor,
    Railway,
    Highway,
    WhirlingWaters,
    PortEnterprise,
    PeripheryEnterprises
  },
  data() {
    return {
      isEdit: false,
      tabs: '',
      loading: false,
      geographyInfos: []
    }
  },
  mounted() {
    this.isEdit = this.$route.query.isEdit ? true :false
    this.tabs = Number(this.$route.query.tabs)
  },
  methods: {
    initMap(geographyInfos) {
      geographyInfos = geographyInfos && geographyInfos.length > 0 ? geographyInfos : []
      this.$refs.map.init(geographyInfos)
    },
    returnBack() {
      this.$router.push({ path: '/digital/resources/distribution', query: { tabs: this.tabs }})
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    /**
     * 保存
     */
    submitForm() {
      this.geographyInfos.forEach((item, index) => {
        delete item.id
        item.sort = index + 1
      })
      this.$refs[`subcomponents${this.tabs}`].saveData(this.geographyInfos)
    }
  }
}
</script>
