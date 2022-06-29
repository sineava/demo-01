<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ dateType ? '船闸通航统计年报详情' : '船闸通航统计月报详情' }}</span>
    </div>
    <div
      class="icon-title"
      style="width: 100%;"
    >
      <span class="span" />{{ dateType ? '年' : '月' }}报信息
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="Loading"
      :data="tableData"
      :header-cell-style="() => 'text-align:center'"
      :cell-style="changeCellStyle"
      :span-method="mergeTable"
    >
      <el-table-column :label="`重庆市合川航道管理处草街船闸通航统计报表\n（${dateType || currentMonth}）`">
        <el-table-column
          prop="column1"
        />
        <el-table-column label="运行天数">
          <el-table-column
            prop="columnA1"
            label="项目"
          />
          <el-table-column
            prop="columnA2"
            label="天数"
          />
        </el-table-column>
        <el-table-column label="停航情况分类统计">
          <el-table-column
            prop="columnB1"
            label="停航原因"
          />
          <el-table-column
            prop="columnB2"
            label="总计"
          />
        </el-table-column>
        <el-table-column label="闸次统计">
          <el-table-column
            prop="columnC1"
            label="过闸方向"
          />
          <el-table-column
            prop="columnC2"
            label="总计"
          />
        </el-table-column>
        <el-table-column label="艘次统计">
          <el-table-column
            prop="columnD1"
            label="过闸方向"
          />
          <el-table-column
            prop="columnD2"
            label="总计"
          />
        </el-table-column>
        <el-table-column label="通过量统计（吨）">
          <el-table-column
            prop="columnE1"
            label="项目"
          />
          <el-table-column
            prop="columnE2"
            label="参考载货量"
          />
          <el-table-column
            prop="columnE3"
            label="实载吨"
          />
        </el-table-column>
        <el-table-column label="货物分类统计（吨）">
          <el-table-column
            prop="columnF1"
            label="项目"
          />
          <el-table-column
            prop="columnF2"
            label="总计"
          />
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getMonthInfo, getYearInfo } from '@/api/channel-services/ship/year-statistical'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      dateType: '',
      date: ''
    }
  },
  computed: {
    currentMonth() {
      if (!this.date) return ''
      return `${momentDate(this.date, 'YYYY')}年${momentDate(this.date, 'M')}月`
    }
  },
  created() {
    const { year, id, date } = this.$route.query
    this.date = date
    this.dateType = year
    if (id) this.fetchDetail(id)
    if (year) this.fetchDetail(Number(year))
  },
  methods: {
    async fetchDetail(val) {
      this.loading = true
      const res = this.dateType ? await getYearInfo({ year: val }) : await getMonthInfo({ id: val })
      this.loading = false
      if (res.code === '0') {
        const data = res.data
        const tableData = []
        tableData.push({
          column1: '通航情况统计',
          columnA1: '日历天数',
          columnA2: data.calendarDays,
          columnB1: '设备故障',
          columnB2: data.restFaultNumber,
          columnC1: '上行',
          columnC2: data.brakeUpNumber,
          columnD1: '上行',
          columnD2: data.shipsUpNumber,
          columnE1: '上行',
          columnE2: data.amountUpCargoCapacity,
          columnE3: data.amountUpActualCargo,
          columnF1: '建筑材料',
          columnF2: data.goodsBuildingMaterials
        })
        tableData.push({
          column1: '通航情况统计',
          columnA1: '停航天数',
          columnA2: data.restDays,
          columnB1: '运行维保',
          columnB2: data.restMaintainNumber,
          columnC1: '下行',
          columnC2: data.brakeDownNumber,
          columnD1: '下行',
          columnD2: data.shipsDownNumber,
          columnE1: '下行',
          columnE2: data.amountDownCargoCapacity,
          columnE3: data.amountDownActualCargo,
          columnF1: '煤炭',
          columnF2: data.goodsCoal
        })
        tableData.push({
          column1: '通航情况统计',
          columnA1: '通航天数',
          columnA2: data.workingDays,
          columnB1: '通航水位',
          columnB2: data.restWaterNumber,
          columnC1: '倒空闸',
          columnC2: data.brakeEmptyNumber,
          columnF1: '化工原料及制品',
          columnF2: data.goodsChemicalMaterials
        })
        tableData.push({
          column1: '通航情况统计',
          columnF1: '集装箱',
          columnF2: data.goodsContainer
        })
        tableData.push({
          column1: '通航情况统计',
          columnA1: '通航总计',
          columnB1: '合计',
          columnB2: data.restCount,
          columnC1: '闸次合计',
          columnC2: data.brakeCount,
          columnD1: '艘次合计',
          columnD2: data.shipsCount,
          columnE1: '吨位合计',
          columnE2: data.amountCargoCapacity,
          columnE3: data.amountActualCargo,
          columnF1: '其他',
          columnF2: data.goodsOthers
        })
        tableData.push({
          column1: '说明',
          columnA1: data.remark
        })
        this.tableData = [...tableData]
      } else {
        this.tableData = []
      }
    },
    mergeTable({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex === 5) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }

      }
      if (rowIndex === 5) {
        return {
          rowspan: 1,
          colspan: 13
        }
      }

    },
    changeCellStyle({ columnIndex, rowIndex }) {
      if (columnIndex === 0) {
        return { backgroundColor: '#F5F7FA', textAlign: 'center', fontWeight: 'bold' }
      }
      if (rowIndex === 5) return { height: '110px' }
      return { textAlign: 'center' }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table .cell {
    white-space: pre-line;
}

/deep/ .el-table thead tr:nth-child(1) {
    font-size: 18px;
    font-weight: 700;
    color: #02a7f0;
}
</style>
