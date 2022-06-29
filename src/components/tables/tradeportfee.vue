<template>
  <div
    slot="header"
    class="fee_card clearfix"
  >
    <div class="icon-title">
      <span class="span" />外贸货物港务费
    </div>
    <h3 class="center">
      <span class="span" />外贸货物港务费
    </h3>
    <el-table
      :data="tableNeedData"
      :span-method="objectSpanMethod"
      border
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        prop="type"
        label="分类"
        width="150"
        align="center"
      />
      <el-table-column
        prop="id"
        label="编号"
        align="center"
      />
      <el-table-column
        prop="name"
        label="货物及集装箱名称"
        align="center"
      />
      <el-table-column
        prop="unit"
        label="计费单位"
        align="center"
      />
      <!-- 一般情况显示(查询自己,不附带企业标准时显示) -->
      <el-table-column
        v-if="payload === ''"
        :label="standard === 'port' ? '费率（元）港口标准' : '费率（元）'"
        align="center"
      >
        <el-table-column
          prop="ratePriceA"
          label="进口"
          width="200"
          style="display: flex;"
          align="center"
        >
          <template v-slot="scope">
            <span class="dollar">¥</span>
            <span v-if="disabled">{{ tableNeedData[scope.$index].ratePriceA }}</span>
            <el-input-number
              v-else
              v-model="tableNeedData[scope.$index].ratePriceA"
              style="margin-left: 5px; width: 100px;"
              controls-position="right"
              :min="0"
              :max="999999.99"
              :precision="2"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="ratePriceB"
          label="出口"
          width="200"
          align="center"
        >
          <template v-slot="scope">
            <span class="dollar">¥</span>
            <span v-if="disabled">{{ tableNeedData[scope.$index].ratePriceB }}</span>
            <el-input-number
              v-else
              v-model="tableNeedData[scope.$index].ratePriceB"
              style="margin-left: 5px; width: 100px;"
              controls-position="right"
              :min="0"
              :max="999999.99"
              :precision="2"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <!-- 企业新增标准时显示 -->
      <template v-if="payload === 'enterpriseAdd'">
        <el-table-column
          label="费率（元）港口标准"
          align="center"
        >
          <el-table-column
            prop="standardRatePriceA"
            label="进口"
            width="200"
            style="display: flex;"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span>{{ tableNeedData[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceB"
            label="出口"
            width="200"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span>{{ tableNeedData[scope.$index].standardRatePriceB }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="费率（元）"
          align="center"
        >
          <el-table-column
            prop="ratePriceA"
            label="进口"
            width="200"
            style="display: flex;"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
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
          <el-table-column
            prop="ratePriceB"
            label="出口"
            width="200"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <el-input-number
                v-model="tableAddData[scope.$index].ratePriceB"
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
            prop="standardRatePriceA"
            label="进口"
            width="200"
            style="display: flex;"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span>{{ tableNeedData[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceB"
            label="出口"
            width="200"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span>{{ tableNeedData[scope.$index].standardRatePriceB }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="费率（元）"
          align="center"
        >
          <el-table-column
            prop="ratePriceA"
            label="进口"
            width="200"
            style="display: flex;"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span v-if="payload === 'enterpriseDetail'">{{ tableNeedData[scope.$index].ratePriceA }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tableNeedData[scope.$index].ratePriceA"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
              <span
                v-if="payload === 'enterpriseAnalysis'"
                :class="tableNeedData[scope.$index].ratePriceA > tableNeedData[scope.$index].standardRatePriceA ? 'text-red' : tableNeedData[scope.$index].ratePriceA < tableNeedData[scope.$index].standardRatePriceA ? 'text-green' : 'normal'"
              >
                {{ tableNeedData[scope.$index].ratePriceA }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ratePriceB"
            label="出口"
            width="200"
            align="center"
          >
            <template v-slot="scope">
              <span class="dollar">¥</span>
              <span v-if="payload === 'enterpriseDetail'">{{ tableNeedData[scope.$index].ratePriceB }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tableNeedData[scope.$index].ratePriceB"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
              <span
                v-if="payload === 'enterpriseAnalysis'"
                :class="tableNeedData[scope.$index].ratePriceB > tableNeedData[scope.$index].standardRatePriceB ? 'text-red' : tableNeedData[scope.$index].ratePriceB < tableNeedData[scope.$index].standardRatePriceB ? 'text-green' : 'normal'"
              >
                {{ tableNeedData[scope.$index].ratePriceB }}
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
    standard: {
      type: String,
      required: true
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
      tableNeedData: [], // 表格需要数据
      tableRevertData: [], // 表格还原需要数据(对应后端)
      tableAddData: [] // 企业端新增数据
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
      tabledata.forEach(({
        id,
        parentId,
        type,
        name,
        billingUnitA,
        billingUnitB,
        ratePriceA,
        ratePriceB,
        ratePriceC,
        ratePriceD,
        standardRatePriceA,
        standardRatePriceB,
        standardRatePriceC,
        standardRatePriceD,
        remark
      }, index) => {
        const line1 = {
          id,
          parentId,
          type,
          name,
          unit: billingUnitA,
          ratePriceA: ratePriceA,
          ratePriceB: ratePriceB,
          standardRatePriceA: standardRatePriceA,
          standardRatePriceB: standardRatePriceB,
          remark,
          mark: index // 后期合并回去需要
        }
        const line2 = {
          id,
          parentId,
          type,
          name,
          unit: billingUnitB,
          ratePriceA: ratePriceC,
          ratePriceB: ratePriceD,
          standardRatePriceA: standardRatePriceC,
          standardRatePriceB: standardRatePriceD,
          remark,
          mark: index
        }
        this.tableNeedData.push(line1)
        this.tableNeedData.push(line2)
        // 企业端新建收费标准
        this.tableAddData = []
        if (this.payload === 'enterpriseAdd') {
          this.tableNeedData.forEach(table => {
            this.tableAddData.push({
              id: table.id,
              parentId: table.parentId,
              ratePriceA: 0,
              ratePriceB: 0
            })
          })
        }
      })
    },
    // 新增/修改数据
    getTableData() {
      this.tableRevertData = []
      if (this.payload === 'enterpriseAdd') {
        const arr = this.tableAddData
        for (let i = 0; i < arr.length; i++) {
          const current = arr[i]
          const next = arr[i + 1]
          if (current.mark === next.mark) {
            const obj = {
              id: null,
              parentId: current.parentId,
              ratePriceA: current.ratePriceA,
              ratePriceB: current.ratePriceB,
              ratePriceC: next.ratePriceA,
              ratePriceD: next.ratePriceB
            }
            this.tableRevertData.push(obj)
            i++ // 直接跳过下一个
          }
        }
      } else {
        this.revertData() // 还原成需要格式
      }
      return this.tableRevertData
    },
    // 还原成后端需要数据
    revertData() {
      const arr = this.tableNeedData
      for (let i = 0; i < arr.length; i++) {
        const current = arr[i]
        const next = arr[i + 1]
        if (current.mark === next.mark) {
          const obj = {
            id: current.id,
            parentId: current.parentId,
            type: current.type,
            name: current.name,
            billingUnitA: current.unit,
            billingUnitB: next.unit,
            ratePriceA: current.ratePriceA,
            ratePriceB: current.ratePriceB,
            ratePriceC: next.ratePriceA,
            ratePriceD: next.ratePriceB,
            remark: current.remark
          }
          this.tableRevertData.push(obj)
          i++ // 直接跳过下一个
        }
      }
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 数据处理逻辑还未写
      if (columnIndex === 0) {
        if (rowIndex % 6 === 0) {
          return {
            rowspan: 6,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }

      }
      if (columnIndex === 1 || columnIndex === 2) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
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
.fee_card {
    .center {
        margin: 20px 0;
        width: 100%;
        text-align: center;
    }

    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;
        }
    }

    .label {
        font-size: 14px;
        color: #d9001b;
    }

    .text-red {
        color: #d9001b;
    }

    .text-green {
        color: #1abc9c;
    }
}

.el-table /deep/ .cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
