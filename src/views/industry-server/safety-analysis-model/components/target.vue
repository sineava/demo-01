<template>
  <div>
    <div class="icon-title">
      <span class="span" />安全形式分析指标
    </div>
    <el-table
      :data="indicatorDataList"
      :header-cell-style="{ textAlign: 'center', backgroundColor: '#F2F2F2' }"
      :cell-style="{textAlign: 'center'}"
      border
    >
      <el-table-column label="指标名称" prop="indicatorName" />
      <el-table-column label="计算取值" prop="calculatedValue" />
      <el-table-column label="采集频率" prop="collectionFrequency" />
      <el-table-column label="采集数据值">
        <template v-slot="scope">
          {{ scope.row.collectedDataValue || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="风险值">
        <template v-slot="scope">
          {{ scope.row.riskValue!==null ||scope.row.riskValue!==undefined ? scope.row.riskValue : '--' }}
        </template>
      </el-table-column>
      <el-table-column label="安全等级">
        <template v-slot="scope">
          {{ scope.row.gradeName ? scope.row.gradeName :(scope.row.riskGrade && ['一级','二级','三级','四级','五级'][scope.row.riskGrade - 1]) || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="权重计分">
        <template v-slot="scope">
          {{ scope.row.weightedScoring || '--' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      indicatorDataList:[]
    }
  },
  watch:{
    data:{
      handler(newV){
        this.indicatorDataList = newV
      },
      deep:true
    }
  },
  mounted() {
    this.indicatorDataList = this.data
  },
  methods: {
    /**
     * 保存
     */
    async submitForm() {
      return this.indicatorDataList
    }
  }
}
</script>
