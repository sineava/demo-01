<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="tabName" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="fee-detail">
        <tradeportfee
          v-if="tableType === 'FOREIGN_TRADE_GOODS'"
          ref="tradeportfee"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <shiproute
          v-if="tableType === 'SHIPS_SAILING_DOMESTIC_ROUTES'"
          ref="shiproute"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <pilot
          v-if="tableType === 'PILOT'"
          ref="pilot"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <specialgoods
          v-if="tableType === 'CONVERSION_WEIGHT'"
          ref="specialgoods"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <domesticegoods
          v-if="tableType === 'DOMESTIC_TRADE_GOODS'"
          ref="domesticegoods"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <facilitysecurity
          v-if="tableType === 'FACILITY_SECURITY'"
          ref="facilitysecurity"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
        <shiptug
          v-if="tableType === 'SHIP_TUG'"
          ref="shiptug"
          :tabledata="tabledata"
          :standard="standard"
          :payload="payload"
          @returnBack="returnBack"
        />
      </div>
      <div class="remark">
        注：红色标记代表企业收费标准高于国家标准。绿色代表企业收费标准低于国家标准。
      </div>
      <div class="standard">
        <div class="wrapper">
          <div class="box bg-red" />
          <span>{{ above }}项高于国家标准</span>
        </div>
        <div class="wrapper">
          <div class="box bg-green" />
          <span>{{ below }}项低于国家标准</span>
        </div>
      </div>
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
import { queryEnterpriseDetail } from '@/api/port-services/port-enterprise-charge-management/charge-industry'
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
      tabledata: [],
      standard: 'port', // 港口标准
      payload: 'enterpriseAnalysis',
      above: 0,
      below: 0,
      tabName: '',
      tableType: '',
      enterpriseId: ''
    }
  },
  created() {
    const { tabName, tableType, enterpriseId, above, below } = this.$route.query
    this.tabName = tabName
    this.tableType = tableType
    this.enterpriseId = enterpriseId
    this.above = above
    this.below = below
    this.fetchDetail(this.tableType, this.enterpriseId)
  },
  methods: {
    /**
     * 国家标准情况
     */
    standardTotal() {
      this.tabledata.forEach(data => {
        if (data.import > data.country_import || data.export > data.country_export) {
          this.hightTotal++
        }
        if (data.import < data.country_import || data.export < data.country_export) {
          this.lowTotal++
        }
      })
    },
    /**
     * 查询详情
     */
    async fetchDetail(tableType, enterpriseId) {
      queryEnterpriseDetail({ tableName: tableType, enterpriseId }).then(res => {
        const { remark, remarkId } = res.data
        this.ruleForm = {
          remark,
          remarkId
        }
        if (tableType === 'FOREIGN_TRADE_GOODS') { // 外贸货物港务信息表
          this.tabledata = res.data.chargeForeignTradeGoodsVo
        }
        if (tableType === 'SHIPS_SAILING_DOMESTIC_ROUTES') { // 航行国内航线船舶港口收费标准
          this.tabledata = res.data.chargeShipsSailingDomesticRoutesVo
        }
        if (tableType === 'PILOT') { // 航行国内航线船舶长江或嘉陵江水系引航费表
          this.tabledata = res.data.chargePilotVo
        }
        if (tableType === 'CONVERSION_WEIGHT') { // 特殊货物重量换算表
          this.tabledata = res.data.chargeConversionWeightVos
        }
        if (tableType === 'DOMESTIC_TRADE_GOODS') { // 内贸货物港务信息表
          this.tabledata = res.data.chargeDomesticTradeGoodsVo
        }
        if (tableType === 'FACILITY_SECURITY') { // 港口设施安保费信息表
          this.tabledata = res.data.chargeFacilitySecurityVo
        }
        if (tableType === 'SHIP_TUG') { // 航行内河航线船舶拖轮费
          this.tabledata = res.data.chargeShipTugVo
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/enterprisecharges/analysis' })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .text-red {
        color: #ff0000;
    }

    .text-green {
        color: #1abc9c;
    }

    .bg-red {
        background-color: #ff0000;
    }

    .bg-green {
        background-color: #1abc9c;
    }

    .remark {
        margin: 20px 0;
        font-size: 14px;
        color: #666666;
    }

    .standard {
        .wrapper {
            display: flex;
            align-items: center;
            margin: 20px 0;

            .box {
                margin-right: 10px;
                width: 50px;
                height: 30px;
            }
        }
    }
}
</style>
