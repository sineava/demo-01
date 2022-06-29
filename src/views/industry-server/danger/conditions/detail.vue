<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix" style="display: flex;align-items:center">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="安全条件审查信息详情页" />
      </span>
      <span class="detail-header-button" style="margin-left:10px">
        <el-button :type="tabIndex===1?'primary':''" size="medium" @click="tabIndex=1">基本信息</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="medium" @click="tabIndex=2">组织机构</el-button>
        <el-button :type="tabIndex===3?'primary':''" size="medium" @click="tabIndex=3">材料列表</el-button>
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />{{ tabIndex===1?'基本信息':(tabIndex===2?'组织机构信息':'材料信息') }}
      </div>
      <Organization v-if="tabIndex === 2" :info="info" />
      <BasicInfo v-if="tabIndex === 1" :info="info" />
      <MaterialList v-if="tabIndex===3" :info="info" />
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
import Organization from './components/Organization.vue'
import BasicInfo from './components/BasicInfo.vue'
import MaterialList from './components/MaterialList.vue'
import { getInfo } from '@/api/port-services/construction-dangerous-goods/safety-condition-review'
export default {
  components: {
    Organization,
    BasicInfo,
    MaterialList
  },
  data() {
    return {
      tabIndex: 1,
      info: {}
    }
  },
  async mounted() {
    const { id } = this.$route.query
    this.info = (await getInfo({id:id})).data
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>
