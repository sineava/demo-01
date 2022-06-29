<template>
  <el-card class="body-card body-menu">
    <div
      slot="header"
    >
      <span>港口整体分布信息管理</span>
    </div>
    <div class="tab-wrap" style="margin: 0 0 20px 0;">
      <el-button-group>
        <el-button
          v-if="button_roles.harborOrg"
          size="small"
          :type="tabs===1?'primary':''"
          @click="tabs=1"
        >
          港航机构
        </el-button>
        <el-button
          v-if="button_roles.administrationOrg"
          size="small"
          :type="tabs===2?'primary':''"
          @click="tabs=2"
        >
          行政机关
        </el-button>
        <el-button
          v-if="button_roles.prot"
          size="small"
          :type="tabs===3?'primary':''"
          @click="tabs=3"
        >
          港口
        </el-button>
        <el-button
          v-if="button_roles.harbourDistrict"
          size="small"
          :type="tabs===4?'primary':''"
          @click="tabs=4"
        >
          港区
        </el-button>
        <el-button
          v-if="button_roles.workZone"
          size="small"
          :type="tabs===5?'primary':''"
          @click="tabs=5"
        >
          作业区
        </el-button>
        <el-button
          v-if="button_roles.wharf"
          size="small"
          :type="tabs===6?'primary':''"
          @click="tabs=6"
        >
          码头
        </el-button>
        <el-button
          v-if="button_roles.berth"
          size="small"
          :type="tabs===7?'primary':''"
          @click="tabs=7"
        >
          泊位
        </el-button>
        <el-button
          v-if="button_roles.shoreline"
          size="small"
          :type="tabs===8?'primary':''"
          @click="tabs=8"
        >
          岸线
        </el-button>
        <el-button
          v-if="button_roles.anchorageGround"
          size="small"
          :type="tabs===9?'primary':''"
          @click="tabs=9"
        >
          锚地
        </el-button>
        <el-button
          v-if="button_roles.railway"
          size="small"
          :type="tabs===10?'primary':''"
          @click="tabs=10"
        >
          铁路
        </el-button>
        <el-button
          v-if="button_roles.highway"
          size="small"
          :type="tabs===11?'primary':''"
          @click="tabs=11"
        >
          公路
        </el-button>
        <el-button
          v-if="button_roles.turningBasin"
          size="small"
          :type="tabs===12?'primary':''"
          @click="tabs=12"
        >
          回旋水域
        </el-button>
        <el-button
          v-if="button_roles.portEnterprise"
          size="small"
          :type="tabs===13?'primary':''"
          @click="tabs=13"
        >
          港口企业
        </el-button>
        <el-button
          v-if="button_roles.businessesAround"
          size="small"
          :type="tabs===14?'primary':''"
          @click="tabs=14"
        >
          周边企业
        </el-button>
        <el-button
          v-if="button_roles.enterprises"
          size="small"
          :type="tabs===15?'primary':''"
          @click="tabs=15"
        >
          监管企业
        </el-button>
      </el-button-group>
    </div>
    <div style="padding: 0 10px 20px 10px;">
      <Organization v-if="tabs===1" :tabs="1" />
      <Mechanism v-if="tabs===2" :tabs="2" />
      <Port v-if="tabs===3" :tabs="3" />
      <PortArea v-if="tabs===4" :tabs="4" />
      <Task v-if="tabs===5" :tabs="5" />
      <Pier v-if="tabs===6" :tabs="6" />
      <Moor v-if="tabs===7" :tabs="7" />
      <ShoreLine v-if="tabs===8" :tabs="8" />
      <Anchor v-if="tabs===9" :tabs="9" />
      <Railway v-if="tabs===10" :tabs="10" />
      <Highway v-if="tabs===11" :tabs="11" />
      <WhirlingWaters v-if="tabs===12" :tabs="12" />
      <PortEnterprise v-if="tabs===13" :tabs="13" />
      <PeripheryEnterprises v-if="tabs===14" :tabs="14" />
      <Enterprises v-if="tabs===15" :tabs="15" />
    </div>
  </el-card>
</template>

<script>
import Mechanism from './mechanism'
import Organization from './organization'
import Port from './port'
import PortArea from './port-area'
import Task from './task'
import Pier from './pier'
import Moor from './moor'
import ShoreLine from './shore-line'
import Anchor from './anchor'
import Railway from './railway'
import Highway from './highway'
import WhirlingWaters from './whirling-waters'
import PortEnterprise from './port-enterprise'
import PeripheryEnterprises from './periphery-enterprises'
import Enterprises from './enterprises'

import { mapGetters } from 'vuex'
export default {
  components: {
    Mechanism,
    Organization,
    Port,
    PortArea,
    Task,
    Pier,
    ShoreLine,
    Anchor,
    Railway,
    Highway,
    WhirlingWaters,
    PortEnterprise,
    PeripheryEnterprises,
    Moor,
    Enterprises
  },
  data() {
    return {
      tabs: 1
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  mounted() {
    this.tabs = Number(this.$route.query.tabs) || 1
  }
}
</script>
<style lang="scss" scoped>
/deep/ .clearfix {
    display: flex;

    span {
        width: 200px;
    }
}

.body-menu {
    /deep/ .el-card__body {
        padding: 0 5px;
    }
}

.tab-wrap {
    display: flex;
    flex-wrap: wrap;

    /deep/ .el-button {
        margin-top: 15px;
    }
}
</style>

