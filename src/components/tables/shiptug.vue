<template>
  <div
    slot="header"
    class="fee_card clearfix"
  >
    <div class="icon-title">
      <span class="span" />航行内河航线船舶拖轮费
    </div>
    <h3 class="center">
      <span class="span" />航行内河航线船舶拖轮费
    </h3>
    <el-table
      :data="tabledata"
      border
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="编号"
        width="55"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="billingUnitA"
        label="船长（米）"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="disabled">{{ tabledata[scope.$index].billingUnitA }}</span>
          <el-input-number
            v-else
            v-model="tableAddData[scope.$index].billingUnitA"
            style="margin-left: 5px; width: 100px;"
            controls-position="right"
            :min="0"
            :max="999999.99"
            :precision="2"
            :disabled="true"
          />
        </template>
      </el-table-column>
      <!-- 一般情况显示(查询自己,不附带企业标准时显示) -->
      <template v-if="payload === ''">
        <el-table-column
          label="船舶类型"
          align="center"
        >
          <el-table-column
            prop="ratePriceA"
            label="集装箱船、滚装船、客船"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="disabled">{{ tabledata[scope.$index].ratePriceA }}</span>
              <el-input-number
                v-else
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
            label="油船、化学品船、液化气体船"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="disabled">{{ tabledata[scope.$index].ratePriceB }}</span>
              <el-input-number
                v-else
                v-model="tableAddData[scope.$index].ratePriceB"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="ratePriceC"
            label="散货船、杂货船及其他"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="disabled">{{ tabledata[scope.$index].ratePriceC }}</span>
              <el-input-number
                v-else
                v-model="tableAddData[scope.$index].ratePriceC"
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
          label="船舶类型(港口标准)"
          align="center"
        >
          <el-table-column
            prop="standardRatePriceA"
            label="集装箱船、滚装船、客船"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceB"
            label="油船、化学品船、液化气体船"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceB }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceC"
            label="散货船、杂货船及其他"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceC }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="船舶类型"
          align="center"
        >
          <el-table-column
            prop="ratePriceA"
            label="集装箱船、滚装船、客船"
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
          <el-table-column
            prop="ratePriceB"
            label="油船、化学品船、液化气体船"
            align="center"
          >
            <template v-slot="scope">
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
          <el-table-column
            prop="ratePriceC"
            label="散货船、杂货船及其他"
            align="center"
          >
            <template v-slot="scope">
              <el-input-number
                v-model="tableAddData[scope.$index].ratePriceC"
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
      <!-- 企业查看/分析标准时显示 -->
      <template v-if="payload === 'enterpriseDetail' || payload === 'enterpriseAnalysis' || payload === 'enterpriseUpdate'">
        <el-table-column
          label="船舶类型(港口标准)"
          align="center"
        >
          <el-table-column
            prop="standardRatePriceA"
            label="集装箱船、滚装船、客船"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceA }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceB"
            label="油船、化学品船、液化气体船"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceB }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="standardRatePriceC"
            label="散货船、杂货船及其他"
            align="center"
          >
            <template v-slot="scope">
              <span>{{ tabledata[scope.$index].standardRatePriceC }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="船舶类型"
          align="center"
        >
          <el-table-column
            prop="ratePriceA"
            label="集装箱船、滚装船、客船"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="payload === 'enterpriseDetail'">{{ tabledata[scope.$index].ratePriceA }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tableAddData[scope.$index].ratePriceA"
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
          <el-table-column
            prop="ratePriceB"
            label="油船、化学品船、液化气体船"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="payload === 'enterpriseDetail'">{{ tabledata[scope.$index].ratePriceB }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tableAddData[scope.$index].ratePriceB"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
              <span
                v-if="payload === 'enterpriseAnalysis'"
                :class="[tabledata[scope.$index].ratePriceB > tabledata[scope.$index].standardRatePriceB ? 'text-red' : tabledata[scope.$index].ratePriceB < tabledata[scope.$index].standardRatePriceB ? 'text-green' : 'normal']"
              >
                {{ tabledata[scope.$index].ratePriceB }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ratePriceC"
            label="散货船、杂货船及其他"
            align="center"
          >
            <template v-slot="scope">
              <span v-if="payload === 'enterpriseDetail'">{{ tabledata[scope.$index].ratePriceC }}</span>
              <el-input-number
                v-if="payload === 'enterpriseUpdate'"
                v-model="tableAddData[scope.$index].ratePriceC"
                style="margin-left: 5px; width: 100px;"
                controls-position="right"
                :min="0"
                :max="999999.99"
                :precision="2"
              />
              <span
                v-if="payload === 'enterpriseAnalysis'"
                :class="[tabledata[scope.$index].ratePriceC > tabledata[scope.$index].standardRatePriceC ? 'text-red' : tabledata[scope.$index].ratePriceC < tabledata[scope.$index].standardRatePriceC ? 'text-green' : 'normal']"
              >
                {{ tabledata[scope.$index].ratePriceC }}
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
      tabledata.forEach(table => {
        this.tableAddData.push({
          id: table.id,
          parentId: table.parentId,
          ratePriceA: table.ratePriceA,
          ratePriceB: table.ratePriceB,
          ratePriceC: table.ratePriceC
        })
      })
    },
    // 拿取数据
    getTableData() {
      return this.tableAddData
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
}

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
</style>
