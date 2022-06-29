<template>
  <div class="wrapper">
    <el-table
      v-loading="loading"
      :data="tableA"
      fit
      max-height="650"
    >
      <el-table-column
        label="表二：运力情况增减变动月报表"
        class-name="strong"
      >
        <el-table-column prop="name" />
        <el-table-column :label="`${Number(year)}/${month}`">
          <template v-slot="scope">
            <span v-if="disabled">{{ scope.row.currentData }}</span>
            <el-input-number
              v-else
              v-model="tableA[scope.$index].currentData"
              :min="0"
              :max="999999999"
              :controls="false"
              style="width: 100%;"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="lastData"
          :label="`${Number(year)-1}/${month}`"
        >
          <template v-slot="scope">
            <span v-if="disabled">{{ scope.row.lastData }}</span>
            <el-input-number
              v-else
              v-model="tableA[scope.$index].lastData"
              :min="0"
              :max="999999999"
              :controls="false"
              style="width: 100%;"
            />
          </template>
        </el-table-column>
        <el-table-column label="增长百分比（%）">
          <template v-slot="scope">
            {{ (scope.row.currentData && scope.row.lastData) ? `${(((scope.row.currentData - scope.row.lastData) / scope.row.lastData) * 100).toFixed(2)}%`: 0 }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table
      v-loading="loading"
      :data="tableB"
      :show-header="false"
      border
      fit
    >
      <el-table-column
        align="center"
        prop="columnA"
      />
      <el-table-column>
        <template v-slot="scope">
          <span v-if="disabled">{{ scope.row.columnB }}</span>
          <el-input-number
            v-else
            v-model="tableB[scope.$index].columnB"
            :precision="scope.row.columnA==='客运量（人）' ? 0 : 2"
            :min="0"
            :max="scope.row.columnA==='客运量（人）' ? 999999999 : 9999999999999999"
            :controls="false"
            style="width: 100%;"
            :placeholder="`请输入${scope.row.columnA}`"
            @change="handleChange(scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="columnC"
      />
      <el-table-column>
        <template v-slot="scope">
          <span v-if="disabled">{{ scope.row.columnD }}</span>
          <el-input-number
            v-else
            v-model="tableB[scope.$index].columnD"
            :precision="2"
            :min="0"
            :max="9999999999999999"
            :controls="false"
            style="width: 100%;"
            :placeholder="`请输入${scope.row.columnC}`"
            @change="handleChange(scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-loading="loading"
      :data="tableC"
      fit
      border
    >
      <el-table-column
        prop="columnA"
        label="客运运距"
      />
      <el-table-column
        prop="columnB"
        label="货运运距"
      />
      <el-table-column
        prop="columnC"
        label="客船单船产量"
      />
      <el-table-column
        prop="columnD"
        label="客船单船单客位产量"
      />
      <el-table-column
        prop="columnE"
        label="货船单船产量"
      />
      <el-table-column
        prop="columnF"
        label="货船单船单吨位产量"
      />
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
// 电讯月报
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    date:{
      type: String,
      default: moment(new Date()).format('YYYY-MM')
    },
  },
  data() {
    return {
      tableA: [],
      tableB: [],
      tableC: [],
      year:moment(new Date()).format('YYYY'),
      month:moment(new Date()).format('MM'),
    }
  },
  watch: {
    date(newV) {
      this.year = moment(newV).format('YYYY')
      this.month = moment(newV).format('MM')
    }
  },
  created() {
    this.year = this.date?moment(this.date).format('YYYY'):''
    this.month = this.date?moment(this.date).format('MM'):''
    const data = this.data
    if (Object.keys(data).length) {
      this.tableA = [
        { name: '客船艘数（艘）', currentData: data.shipsCurrentData, lastData: data.shipsLastData },
        { name: '客船客位数（客位）', currentData: data.seatCurrentData, lastData: data.seatLastData },
        { name: '货船艘数（艘）', currentData: data.cargoShipCurrentData, lastData: data.cargoShipLastData },
        { name: '货船总载重吨', currentData: data.cargoShipTonnageCurrentData, lastData: data.cargoShipTonnageLastData }
      ]
      this.tableB = [
        { columnA: '客运量（人）', columnB: data.passengerTraffic, columnC: '旅客周转量（人公里）', columnD: data.passengerTurnover },
        { columnA: '货运量（吨）', columnB: data.freight, columnC: '货物周转量（吨公里）', columnD: data.cargoTurnover }
      ]
      this.tableC = [
        {
          columnA: data.passengerSpace || 0,
          columnB: data.freightSpace || 0,
          columnC: data.outputOfPassengerShipsPerVessel || 0,
          columnD: data.seatProduction || 0,
          columnE: data.cargoShipOutputPerVessel || 0,
          columnF: data.tonnageProduction || 0
        }
      ]
    }
  },
  methods: {
    // 获取处理后的表格数据
    getWrapperTable() {
      const changeDataDto = {
        ...this.data,
        shipsCurrentData: this.tableA[0].currentData || 0,
        shipsLastData: this.tableA[0].lastData || 0,
        seatCurrentData: this.tableA[1].currentData || 0,
        seatLastData: this.tableA[1].lastData || 0,
        cargoShipCurrentData: this.tableA[2].currentData || 0,
        cargoShipLastData: this.tableA[2].lastData || 0,
        cargoShipTonnageCurrentData: this.tableA[3].currentData || 0,
        cargoShipTonnageLastData: this.tableA[3].lastData || 0,
        passengerTraffic: this.tableB[0].columnB || 0,
        passengerTurnover: this.tableB[0].columnD || 0,
        freight: this.tableB[1].columnB || 0,
        cargoTurnover: this.tableB[1].columnD || 0,
        passengerSpace: this.tableC[0].columnA || 0,
        freightSpace: this.tableC[0].columnB || 0,
        outputOfPassengerShipsPerVessel: this.tableC[0].columnC || 0,
        seatProduction: this.tableC[0].columnD || 0,
        cargoShipOutputPerVessel: this.tableC[0].columnE || 0,
        tonnageProduction: this.tableC[0].columnF || 0
      }
      return changeDataDto
    },
    handleChange(index) {
      if (index === 0) {
        if (this.tableB[0].columnB && this.tableB[0].columnD) {
          this.tableC[0].columnA = Number((this.tableB[0].columnD / this.tableB[0].columnB).toFixed(2))
        } else {
          this.tableC[0].columnA = 0
        }
      }
      if (index === 1) {
        if (this.tableB[1].columnB && this.tableB[1].columnD) {
          this.tableC[0].columnB = Number((this.tableB[1].columnD / this.tableB[1].columnB).toFixed(2))
        } else {
          this.tableC[0].columnB = 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .strong {
    font-size: 18px;
    color: #2b85e4;
}

.el-table {
    margin-bottom: 20px;
}

.wrapper {
    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
