<template>
  <div class="person-group">
    <el-table
      :data="table"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
      style="max-width: 1200px;"
    >
      <el-table-column
        label="编号"
        width="55"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="维护项目"
        prop="riverName"
      >
        <template v-slot="scope">
          {{ scope.row.projectName }}
        </template>
      </el-table-column>
      <el-table-column
        label="经费（元）"
        prop="expenditure"
      >
        <template v-slot="scope">
          <el-input-number
            v-model="scope.row.expenditure"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="经费使用详情"
        prop="usingTheDetails"
      >
        <template v-slot="scope">
          <el-input v-model.trim="scope.row.usingTheDetails" />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark"
      >
        <template v-slot="scope">
          <el-input
            v-model.trim="scope.row.remark"
            type="textarea"
            rows="3"
            maxlength="200"
            show-word-limit
          />
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
    payload: {
      type: String,
      default: () => ''
    },
    dataTable:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      table: []
    }
  },
  watch: {
    dataTable(newV, oldV) {
      this.table = newV
    }
  },
  created() {
    if (this.dataTable && this.dataTable.length > 0) {
      this.table = this.dataTable
    } else {
      const column = ['航标维护', '航道维护疏浚', '日常巡航', '航道整治建筑物养护', '通航建筑物维护', '工作船舶维护', '航道专项养护工程', '航道养护科研计划', '航道应急抢通', '人员培训']
      column.forEach(x => {
        this.table.push({ expenditure: 0, id: null, projectName: x, remark: '', usingTheDetails: '' })
      })
    }
  },
  methods: {
    getTableData() {
      return this.table
    }
  }
}
</script>
