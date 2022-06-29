<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ tabActive === 1?'企业自查隐患记录':(tabActive === 2?'安全监督检查记录':'移交记录') }}</span>
      <div class="tab-wrap">
        <el-button
          :type="tabActive === 1 ? 'primary' : ''"
          @click="tabActive = 1"
        >
          企业自查隐患
        </el-button>
        <el-button
          :type="tabActive === 2 ? 'primary' : ''"
          @click="tabActive = 2"
        >
          安全监督检查隐患
        </el-button>
        <el-button
          :type="tabActive === 3 ? 'primary' : ''"
          @click="tabActive = 3"
        >
          隐患信息移交
        </el-button>
      </div>
    </div>
    <self-examination v-if="tabActive === 1" />
    <security-supervise v-if="tabActive === 2" />
    <transfer-info v-if="tabActive === 3" />
  </el-card>
</template>

<script>
import SelfExamination from './components/SelfExamination.vue'
import SecuritySupervise from './components/SecuritySupervise.vue'
import TransferInfo from './components/TransferInfo.vue'
export default {
  components: {
    SelfExamination,
    SecuritySupervise,
    TransferInfo
  },
  data() {
    return {
      tabActive: 1
    }
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
