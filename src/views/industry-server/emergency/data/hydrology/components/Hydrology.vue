<template>
  <div
    slot="header"
    class="water"
  >
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      :header-cell-style="{ backgroundColor: '#F2F2F2' }"
    >
      <el-table-column
        prop="waters"
        label="水域"
        align="center"
      />
      <el-table-column
        prop="watersName"
        label="水文站"
        align="center"
      />
      <el-table-column
        prop="waterLevel"
        label="水位(米)"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="!disabled">{{ tableData[scope.$index].waterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].waterLevel"
            :min="-100000"
            :precision="2"
            :controls="false"
            placeholder="请输入水位(米)"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="yesterday"
        label="较昨日"
        align="center"
      >
        <template v-slot="scope">
          <!-- 用amplitude字段 -->
          <span v-if="increase(scope.row.lastdayWaterLevel,scope.row.waterLevel) === '-'"> - </span>
          <span v-else-if="parseFloat(increase(scope.row.lastdayWaterLevel,scope.row.waterLevel)) > 0" class="text-red"> 涨 </span>
          <span v-else-if="parseFloat(increase(scope.row.lastdayWaterLevel,scope.row.waterLevel)) === 0"> 平 </span>
          <span v-else class="text-green"> 落 </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amplitude"
        label="幅度（米）"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="increase(scope.row.lastdayWaterLevel,scope.row.waterLevel) === '-'"> - </span>
          <span v-else-if="parseFloat(increase(scope.row.lastdayWaterLevel,scope.row.waterLevel)) > 0" class="text-red">{{ increase(scope.row.lastdayWaterLevel,scope.row.waterLevel) }}</span>
          <span v-else-if="parseFloat(increase(scope.row.lastdayWaterLevel,scope.row.waterLevel)) === 0">{{ increase(scope.row.lastdayWaterLevel,scope.row.waterLevel) }}</span>
          <span v-else class="text-green"> {{ increase(scope.row.lastdayWaterLevel,scope.row.waterLevel) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="昨日水位（米）"
        align="center"
      >
        <template v-slot="scope">
          {{ showLastdayWaterLevel(scope.row.lastdayWaterLevel) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    hyTableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: [],
      prevData: null,
      table: []
    }
  },
  watch: {
    hyTableData(newV) {
      this.tableData = newV
    }
  },
  created() {
    this.tableData = this.hyTableData
  },
  methods: {
    increase(lastdayWaterLevel,waterLevel){
      if (lastdayWaterLevel===undefined || waterLevel===undefined){
        return '-'
      }
      return (parseFloat(waterLevel) - parseFloat(lastdayWaterLevel)).toFixed(2)
    },
    showLastdayWaterLevel(lastdayWaterLevel){
      if (lastdayWaterLevel === undefined){
        return '-'
      }
      return lastdayWaterLevel.toFixed(2)
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex === 6) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 10 || rowIndex === 16) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if ([12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].includes(rowIndex)) {
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
    },
    // 组装数据
    getTableData() {
      let data = []
      this.tableData.forEach(element => {
        data.push({
          id:element.id || '',
          waterLevel:element.waterLevel || '',
          watersId:element.watersId || ''
        })
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.text-red {
    color: red;
}

.text-green {
    color: green;
}
</style>
