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
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="name"
        label="水文站"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="waterLevel"
        label="水位(米)"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span v-if="payload === 'detail'">{{ tableData[scope.$index].waterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].waterLevel"
            :min="0"
            :precision="2"
            @blur="handleBlur(scope.$index, scope.row.waterLevel)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="yesterday"
        label="较昨日"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <!-- 用amplitude字段 -->
          <span
            v-if="scope.row.amplitude >= 0"
            class="text-red"
          >涨</span>
          <span
            v-else
            class="text-green"
          >落</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amplitude"
        label="幅度（米）"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template v-slot="scope">
          <span
            v-if="scope.row.amplitude && scope.row.amplitude < 0"
            class="text-green"
          >{{ scope.row.amplitude }}</span>
          <span
            v-else
            class="text-red"
          >{{ scope.row.amplitude || 0.00 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="prev"
        label="昨日水位（米）"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.prev.waterLevel || '无水位数据' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { prevDay } from '@/utils/index'
import { selectWatersList, queryInfoByTime } from '@/api/emergency-services/hydrological'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    payload: {
      type: String,
      default: () => ''
    },
    date: {
      type: String,
      required: true
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
    date() {
      this.fetchPrevDay()
    }
  },
  created() {
    // 查询选择时间前一天数据与水文信息
    if (this.payload === 'add') {
      this.fetchPrevDay()
    }
  },
  methods: {
    // 查询水文站信息
    async fetchPrevDay(table = []) {
      queryInfoByTime({ time: prevDay(this.date) }).then(res => {
        // 27为表格条数(固定表格)
        this.prevData = (res.data && res.data.watersDateVoList.length) ? res.data.watersDateVoList : Array(27).fill({ waterLevel: null })
        return selectWatersList()
      }).then(res => {
        this.tableData = res.data.length ? res.data.map((item, index) => ({
          ...item,
          id: table.length ? table[index].id : null,
          watersId: table.length ? table[index].watersId : item.id,
          waterLevel: table.length ? table[index].waterLevel ? table[index].waterLevel : undefined : undefined,
          yesterday: null,
          amplitude: (table.length && this.prevData[index].waterLevel && table[index].waterLevel) ? Number((table[index].waterLevel - this.prevData[index].waterLevel).toFixed(2)) : null,
          prev: this.prevData[index]
        })) : []
      })
    },
    // 数字输入框失去焦点事件
    handleBlur(index, val) {
      if (val) {
        const amplitude = this.prevData[index].waterLevel
        this.tableData[index].amplitude = amplitude === null ? null : Number((val - amplitude).toFixed(2))
      } else {
        this.tableData[index].amplitude = 0.00
      }
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
        } // 此处有坑
        return {
          rowspan: 0,
          colspan: 0
        }

      }
    },
    // 组装数据
    getTableData() {
      return this.tableData.map((item) => ({ id: item.id, waterLevel: item.waterLevel || 0, watersId: item.watersId }))
    },
    // 更新table数据
    async updateTable(table) {
      this.table = table
      this.fetchPrevDay(table)
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

