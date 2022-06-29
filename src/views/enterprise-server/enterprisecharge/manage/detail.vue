<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业港口收费计费标准详情" />
      </span>
    </div>
    <div class="fee-detail">
      <tradeportfee
        v-if="tableName === 'FOREIGN_TRADE_GOODS'"
        ref="tradeportfee"
        :tabledata="tabledata"
        :standard="standard"
        :disabled="oper==='details'"
        :payload="payload"
        @returnBack="returnBack"
      />
      <shiproute
        v-if="tableName === 'SHIPS_SAILING_DOMESTIC_ROUTES'"
        ref="shiproute"
        :tabledata="tabledata"
        :standard="standard"
        :payload="payload"
        :disabled="oper==='details'"
        @returnBack="returnBack"
      />
      <pilot
        v-if="tableName === 'PILOT'"
        ref="pilot"
        :tabledata="tabledata"
        :standard="standard"
        :payload="payload"
        :disabled="oper==='details'"
        @returnBack="returnBack"
      />
      <specialgoods
        v-if="tableName === 'CONVERSION_WEIGHT'"
        ref="specialgoods"
        :tabledata="tabledata"
        :standard="standard"
        :disabled="oper==='details'"
        :payload="payload"
        @returnBack="returnBack"
      />
      <domesticegoods
        v-if="tableName === 'DOMESTIC_TRADE_GOODS'"
        ref="domesticegoods"
        :tabledata="tabledata"
        :standard="standard"
        :disabled="oper==='details'"
        :payload="payload"
        @returnBack="returnBack"
      />
      <facilitysecurity
        v-if="tableName === 'FACILITY_SECURITY'"
        ref="facilitysecurity"
        :tabledata="tabledata"
        :standard="standard"
        :payload="payload"
        :disabled="oper==='details'"
        @returnBack="returnBack"
      />
      <shiptug
        v-if="tableName === 'SHIP_TUG'"
        ref="shiptug"
        :tabledata="tabledata"
        :standard="standard"
        :payload="payload"
        :disabled="oper==='details' ? false : true"
        @returnBack="returnBack"
      />
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="50px"
      size="medium"
      style="margin-top: 20px;"
    >
      <el-form-item
        label="说明:"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          rows="6"
          :disabled="oper==='details'"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div class="backstage-edit-btn">
      <el-button
        v-if="oper!=='details'"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
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
import { queryEnterpriseDetail } from '@/api/port-services/port-enterprise-charge-management/charge-industry'
import { updateCharge } from '@/api/port-services/port-enterprise-charge-management/charge-enterprise'
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
      ruleForm: {},
      tabledata: [],
      oper:'add',
      standard: 'port', // 港口标准
      payload: 'enterpriseUpdate',
      loading: false,
    }
  },
  created() {
    const { tableType, enterpriseId,oper } = this.$route.query
    this.tableName = tableType
    this.enterpriseId = enterpriseId
    this.oper = oper
    this.fetchDetail(this.tableName, this.enterpriseId)
  },
  methods: {
    // 查询详情
    async fetchDetail(tableName, enterpriseId) {
      queryEnterpriseDetail({ tableName, enterpriseId }).then(res => {
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
    // 修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 必须传null
          const chargeEnterpriseDto = {
            chargeForeignTradeGoodsDtoList: null,
            chargeConversionWeightDtoList: null,
            chargeDomesticTradeGoodsDtoList: null,
            chargeFacilitySecurityDtoList: null,
            chargePilotDtoList: null,
            chargeShipTugDtoList: null,
            chargeShipsSailingDomesticRoutesDtoList: null
          }
          if (this.tableName === 'FOREIGN_TRADE_GOODS') {
            chargeEnterpriseDto.chargeForeignTradeGoodsDtoList = this.$refs['tradeportfee'].getTableData().map(({
              id,
              parentId,
              ratePriceA,
              ratePriceB,
              ratePriceC,
              ratePriceD
            }) => ({ id, parentId, ratePriceA, ratePriceB, ratePriceC, ratePriceD }))
          }
          if (this.tableName === 'SHIPS_SAILING_DOMESTIC_ROUTES') {
            chargeEnterpriseDto.chargeShipsSailingDomesticRoutesDtoList = this.$refs['shiproute'].getTableData().map(({
              id,
              parentId,
              ratePriceA
            }) => ({ id, parentId, ratePriceA }))
          }
          if (this.tableName === 'PILOT') {
            chargeEnterpriseDto.chargePilotDtoList = this.$refs['pilot'].getTableData().map(({
              id,
              parentId,
              ratePriceA,
              ratePriceB
            }) => ({ id, parentId, ratePriceA, ratePriceB }))
          }
          if (this.tableName === 'CONVERSION_WEIGHT') {
            chargeEnterpriseDto.chargeConversionWeightDtoList = this.$refs['specialgoods'].getTableData().map(({
              id,
              parentId,
              ratePriceA
            }) => ({ id, parentId, ratePriceA }))
          }
          if (this.tableName === 'DOMESTIC_TRADE_GOODS') {
            chargeEnterpriseDto.chargeDomesticTradeGoodsDtoList = this.$refs['domesticegoods'].getTableData().map(({
              id,
              parentId,
              ratePriceA
            }) => ({ id, parentId, ratePriceA }))
          }
          if (this.tableName === 'FACILITY_SECURITY') {
            chargeEnterpriseDto.chargeFacilitySecurityDtoList = this.$refs['facilitysecurity'].getTableData().map(({
              id,
              parentId,
              ratePriceA
            }) => ({ id, parentId, ratePriceA }))
          }
          if (this.tableName === 'SHIP_TUG') {
            chargeEnterpriseDto.chargeShipTugDtoList = this.$refs['shiptug'].tableAddData.map(({
              id,
              parentId,
              ratePriceA,
              ratePriceB,
              ratePriceC
            }) => ({ id, parentId, ratePriceA, ratePriceB, ratePriceC }))
          }
          chargeEnterpriseDto.tableName = this.tableName
          chargeEnterpriseDto.remark = this.ruleForm.remark
          chargeEnterpriseDto.remarkId = this.ruleForm.remarkId
          this.saveData(chargeEnterpriseDto)
        } else {
          return false
        }
      })
    },
    // 修改数据
    async saveData(chargeEnterpriseDto) {
      this.loading = true
      updateCharge(chargeEnterpriseDto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/enterprisecharge/manage' })
    }
  }
}
</script>
