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
          placeholder="请输入说明"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div
      class="backstage-edit-btn"
    >
      <el-button
        v-if="!disabled"
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
import { queryDetail, updateStandard } from '@/api/port-services/port-enterprise-charge-management/charge-industry'
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
      loading: false,
      ruleForm: {},
      tabledata: [],
      standard: 'port' // 港口标准
    }
  },
  created() {
    const { tableName, type } = this.$route.query
    this.tableName = tableName
    if (type === 'detail') this.disabled = true
    if (type === 'edit') this.disabled = false
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
    /**
     * 修改
     */
    submitForm(formName) {
      this.loading = true
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
              ratePriceA,
              ratePriceB,
              ratePriceC,
              ratePriceD
            }) => ({ id, ratePriceA, ratePriceB, ratePriceC, ratePriceD }))
          }
          if (this.tableName === 'SHIPS_SAILING_DOMESTIC_ROUTES') {
            chargeEnterpriseDto.chargeShipsSailingDomesticRoutesDtoList = this.$refs['shiproute'].getTableData().map(({
              id,
              ratePriceA
            }) => ({ id, ratePriceA }))
          }
          if (this.tableName === 'PILOT') {
            chargeEnterpriseDto.chargePilotDtoList = this.$refs['pilot'].getTableData().map(({
              id,
              billingUnitA,
              ratePriceA,
              ratePriceB
            }) => ({ id, billingUnitA, ratePriceA, ratePriceB }))
          }
          if (this.tableName === 'CONVERSION_WEIGHT') {
            chargeEnterpriseDto.chargeConversionWeightDtoList = this.$refs['specialgoods'].getTableData().map(({
              id,
              ratePriceA
            }) => ({ id, ratePriceA }))
          }
          if (this.tableName === 'DOMESTIC_TRADE_GOODS') {
            chargeEnterpriseDto.chargeDomesticTradeGoodsDtoList = this.$refs['domesticegoods'].getTableData().map(({
              id,
              ratePriceA
            }) => ({ id, ratePriceA }))
          }
          if (this.tableName === 'FACILITY_SECURITY') {
            chargeEnterpriseDto.chargeFacilitySecurityDtoList = this.$refs['facilitysecurity'].getTableData().map(({
              id,
              ratePriceA
            }) => ({ id, ratePriceA }))
          }
          if (this.tableName === 'SHIP_TUG') {
            const chargeShipTugDtoList = []
            this.$refs['shiptug'].getTableData().forEach(element => {
              chargeShipTugDtoList.push({
                id: element.id,
                billingUnitA: element.billingUnitA,
                ratePriceA: element.ratePriceA,
                ratePriceB: element.ratePriceB,
                ratePriceC: element.ratePriceC
              })
            })
            chargeEnterpriseDto.chargeShipTugDtoList = chargeShipTugDtoList.length ? chargeShipTugDtoList : null
          }
          chargeEnterpriseDto.tableName = this.tableName
          chargeEnterpriseDto.remark = this.ruleForm.remark
          chargeEnterpriseDto.remarkId = this.ruleForm.remarkId
          this.saveData(chargeEnterpriseDto)
          this.loading = false
        } else {

          this.loading = false
          return false
        }
      })
      this.loading = false
    },
    // 保存数据
    async saveData(chargeEnterpriseDto) {
      updateStandard(chargeEnterpriseDto).then(res => {
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>
