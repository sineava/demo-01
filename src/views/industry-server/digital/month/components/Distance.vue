<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    :cell-style="{'text-align': 'center'}"
    :header-style="{'text-align': 'center'}"
    fit
    max-height="650"
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
    }
  },
  created() {
    this.tableData = this.table.length
      ? [{
        columnA: this.table[0].currentData,
        columnB: this.table[1].currentData,
        columnC: this.table[2].currentData,
        columnD: this.table[3].currentData,
        columnE: this.table[4].currentData,
        columnF: this.table[5].currentData
      }] : []
  },
  methods: {
    resetTable() {
      this.tableData[0].columnA = this.table[0].currentData
      this.tableData[0].columnB = this.table[1].currentData
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .strong {
    font-size: 18px;
    color: #2b85e4;
}
</style>
