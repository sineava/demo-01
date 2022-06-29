<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    fit
    max-height="650"
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
          v-model="tableData[scope.$index].columnB"
          :precision="2"
          :min="0"
          :max="99999999999"
          :controls="false"
          style="width: 100%;"
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
          v-model="tableData[scope.$index].columnD"
          :precision="2"
          :min="0"
          :controls="false"
          :max="99999999999"
          style="width: 100%;"
          @change="handleChange(scope.$index)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.tableData = this.table.length
      ? [{
        columnA: this.table[0].name,
        columnB: this.table[0].currentData,
        columnC: this.table[1].name,
        columnD: this.table[1].currentData
      }, {
        columnA: this.table[2].name,
        columnB: this.table[2].currentData,
        columnC: this.table[3].name,
        columnD: this.table[3].currentData
      }]
      : []
  },
  methods: {
    // !监听数据改变,操作另外一个表的数据同步改变
    handleChange(index) {
      if (index === 0) {
        if (this.tableData[0].columnB && this.tableData[0].columnD) {
          this.$emit('changeDistance', { type: 'passenger', data: this.tableData[0].columnD / this.tableData[0].columnB.toFixed(2) })
        } else {
          this.$emit('changeDistance', { type: 'passenger', data: 0 })
        }
      }
      if (index === 1) {
        if (this.tableData[1].columnB && this.tableData[1].columnD) {
          this.$emit('changeDistance', { type: 'goods', data: this.tableData[1].columnD / this.tableData[1].columnB.toFixed(2) })
        } else {
          this.$emit('changeDistance', { type: 'goods', data: 0 })
        }
      }
    },
    // 获取处理后的表格数据
    getWrapperTable() {
      return this.table.map((x, index) => {
        if (index === 0) {
          return { ...x, currentData: this.tableData[0].columnB }
        }
        if (index === 1) {
          return { ...x, currentData: this.tableData[0].columnD }
        }
        if (index === 2) {
          return { ...x, currentData: this.tableData[1].columnB }
        }
        if (index === 3) {
          return { ...x, currentData: this.tableData[1].columnD }
        }
        return false
      })
    }
  }
}
</script>
