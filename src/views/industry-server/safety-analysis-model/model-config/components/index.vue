<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix" style="display: flex;">
      {{ title }}
      <div class="btns-wrapper" style="margin-left: 20px;">
        <el-button
          v-for="(item, index) in configs"
          :key="index"
          :type="current === item ? 'primary' : 'plain'"
          size="mini"
          @click="current = item"
        >
          <span v-if="item === 'indicator'">指标体系</span>
          <span v-if="item === 'threshold'">风险阈值</span>
          <span v-if="item === 'area'">辖区</span>
          <span v-if="item === 'keyEnterprise'">重点企业</span>
        </el-button>
      </div>
    </div>
    <QuotaSystem v-if="current === 'indicator'" :modules="modules" />
    <RiskThreshold v-if="current === 'threshold'" :modules="modules" />
    <Jurisdiction v-if="current === 'area'" :modules="modules" />
    <Enterprise v-if="current === 'keyEnterprise'" :modules="modules" />
  </el-card>
</template>

<script>
import QuotaSystem from './quota-system'
import RiskThreshold from './risk-threshold'
import Jurisdiction from './jurisdiction'
import Enterprise from './enterprise'
export default {
  components: {
    QuotaSystem,
    RiskThreshold,
    Jurisdiction,
    Enterprise
  },
  props: {
    title: {
      type: String,
      required: true
    },
    configs: {
      type: Array,
      required: true
    },
    modules:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      current: this.configs[0]
    }
  }
}
</script>
