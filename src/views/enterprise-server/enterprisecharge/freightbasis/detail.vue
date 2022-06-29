<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口收费计费标准详情" />
      </span>
    </div>
    <div class="fee-detail">
      <tradeportfee
        v-if="tableName === 'FOREIGN_TRADE_GOODS'"
        ref="tradeportfee"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <shiproute
        v-if="tableName === 'SHIPS_SAILING_DOMESTIC_ROUTES'"
        ref="shiproute"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <pilot
        v-if="tableName === 'PILOT'"
        ref="pilot"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <specialgoods
        v-if="tableName === 'CONVERSION_WEIGHT'"
        ref="specialgoods"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <domesticegoods
        v-if="tableName === 'DOMESTIC_TRADE_GOODS'"
        ref="domesticegoods"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <facilitysecurity
        v-if="tableName === 'FACILITY_SECURITY'"
        ref="facilitysecurity"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
      <shiptug
        v-if="tableName === 'SHIP_TUG'"
        ref="shiptug"
        :tabledata="tabledata"
        :disabled="disabled"
        :standard="standard"
        @returnBack="returnBack"
      />
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="120px"
      size="medium"
      class="two-column-input-table"
      style="margin-top: 20px;"
      :disabled="disabled"
    >
      <el-form-item
        label="说明:"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          rows="6"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
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
import { queryDetail } from '@/api/port-services/port-enterprise-charge-management/charge-industry'
import tradeportfee from '@/components/tables/tradeportfee'
import shiproute from '@/components/tables/shiproute'
import pilot from '@/components/tables/pilot'
import specialgoods from '@/components/tables/specialgoods'
import domesticegoods from '@/components/tables/domesticegoods'
import facilitysecurity from '@/components/tables/facilitysecurity'
import shiptug from '@/components/tables/shiptug'
export default {
  components: {
    tradeportfee,
    shiproute,
    pilot,
    specialgoods,
    domesticegoods,
    facilitysecurity,
    shiptug
  },
  data() {
    return {
      disabled: '',
      ruleForm: {},
      tabledata: [],
      standard: 'port' // 港口标准
    }
  },
  created() {
    const { tableName } = this.$route.query
    this.tableName = tableName
    this.fetchDetail(this.tableName)
  },
  methods: {
    // 查询详情
    async fetchDetail(tableName) {
      queryDetail({ tableName }).then(res => {
        const { remark, remarkId } = res.data
        this.ruleForm = {
          remark,
          remarkId
        }
        if (tableName === 'FOREIGN_TRADE_GOODS') { // 外贸货物港务信息表
          this.tabledata = res.data.chargeForeignTradeGoodsVo
        }
        if (tableName === 'SHIPS_SAILING_DOMESTIC_ROUTES') { // 航行国内航线船舶港口收费标准
          this.tabledata = res.data.chargeShipsSailingDomesticRoutesVo
        }
        if (tableName === 'PILOT') { // 航行国内航线船舶长江或嘉陵江水系引航费表
          this.tabledata = res.data.chargePilotVo
        }
        if (tableName === 'CONVERSION_WEIGHT') { // 特殊货物重量换算表
          this.tabledata = res.data.chargeConversionWeightVos
        }
        if (tableName === 'DOMESTIC_TRADE_GOODS') { // 内贸货物港务信息表
          this.tabledata = res.data.chargeDomesticTradeGoodsVo
        }
        if (tableName === 'FACILITY_SECURITY') { // 港口设施安保费信息表
          this.tabledata = res.data.chargeFacilitySecurityVo
        }
        if (tableName === 'SHIP_TUG') { // 航行内河航线船舶拖轮费
          this.tabledata = res.data.chargeShipTugVo
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/enterprisecharge/freightbasis' })
    }
  }
}
</script>
