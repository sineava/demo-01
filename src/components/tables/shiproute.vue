<template>
  <div
    slot="header"
    class="fee_card clearfix"
  >
    <div class="icon-title">
      <span class="span" />航行国内航线船舶港口收费标准
    </div>
    <h3 class="center">
      <span class="span" />航行国内航线船舶港口收费标准
    </h3>
    <el-table
      :data="tabledata"
      :span-method="objectSpanMethod"
      border
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="编号"
        align="center"
      />
      <el-table-column
        prop="name"
        label="项目"
        align="center"
      />
      <el-table-column
        prop="billingUnitA"
        label="计费单位"
        align="center"
      />
      <!-- 一般情况显示(查询自己,不附带企业标准时显示) -->
      <template v-if="payload === ''">
        <el-table-column
          label="费率（元）"
          align="center"
        >
          <el-table-column
            prop="billingUnitB"
            align="center"
          />
          <el-table-column
            prop="ratePriceA"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="disabled">{{ tabledata[scope.$index].ratePriceA }}</span>
              <el-input-number
                v-else
                v-model="tabledata[scope.$index].ratePriceA"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </template>
      <!-- 企业新增标准时显示(同时展示港口标准与企业标准) -->
      <template v-if="payload === 'enterpriseAdd'">
        <el-table-column
          label="费率（元）港口标准"
          align="center"
        >
          <el-table-column
            prop="billingUnitB"
            align="center"
          />
          <el-table-column
            prop="standardRatePriceA"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="费率（元）"
          align="center"
        >
          <el-table-column
            prop="billingUnitB"
            align="center"
          />
          <el-table-column
            prop="ratePriceA"
            align="center"
          >
            <template v-slot="scope">
              <el-input-number
                v-model="tableAddData[scope.$index].ratePriceA"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </template>
      <!-- 企业查看标准时显示 -->
      <template v-if="payload === 'enterpriseDetail' || payload === 'enterpriseAnalysis' || payload === 'enterpriseUpdate'">
        <el-table-column
          label="费率（元）港口标准"
          align="center"
        >
          <el-table-column
            prop="billingUnitB"
            align="center"
          />
          <el-table-column
            prop="standardRatePriceA"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="费率（元）"
          align="center"
        >
          <el-table-column
            prop="billingUnitB"
            align="center"
          />
          <el-table-column
            prop="ratePriceA"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="payload === 'enterpriseDetail'">{{ tabledata[scope.$index].ratePriceA }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tabledata[scope.$index].ratePriceA"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
              <span
                v-if="payload === 'enterpriseAnalysis'"
                :class="[tabledata[scope.$index].ratePriceA > tabledata[scope.$index].standardRatePriceA ? 'text-red' : tabledata[scope.$index].ratePriceA < tabledata[scope.$index] ? 'text-green' : 'normal']"
              >
                {{ tabledata[scope.$index].ratePriceA }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    payload: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      ruleForm: {
        range: ''
      },
      tableAddData: []
    }
  },
  watch: {
    tabledata: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.wrapperTableData(val)
        }
      }
    }
  },
  methods: {
    // 数据处理-处理成表格需要数据
    wrapperTableData(tabledata) {
      this.tabledata.forEach(table => {
        this.tableAddData.push({
          id: table.id,
          parentId: table.parentId,
          ratePriceA: 0
        })
      })
    },
    // 拿取数据
    getTableData() {
      return this.tabledata
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 4) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 6) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      if (columnIndex === 2) {
        if (rowIndex === 0 || rowIndex === 1) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (rowIndex === 2) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 4 || rowIndex === 5) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (rowIndex === 6) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table /deep/ .cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text-red {
    color: #ff0000;
}

.text-green {
    color: #1abc9c;
}

.center {
    text-align: center;
}
</style>
