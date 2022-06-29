<template>
  <div class="container" style="width: 100%;">
    <el-table
      v-loading="loading"
      :data="table"
      :header-cell-style="{textAlign:'center', backgroundColor:'#F2F2F2'}"
      :cell-style="{textAlign:'center'}"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="序号"
        width="65"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="风险等级"
        width="100"
      >
        <template v-slot="scope">
          {{ scope.row.riskGrade && ['一级', '二级', '三级', '四级', '五级'][scope.row.riskGrade - 1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="等级名称"
        prop="gradeName"
        width="100"
      />
      <el-table-column
        label="风险值"
        width="400"
      >
        <template v-slot="scope">
          <el-input-number
            v-model="table[scope.$index].riskValueMin"
            :precision="2"
            size="mini"
          />
          <span style="margin: 0 5px;">{{ `&lt; X ≤ ` }}</span>
          <el-input-number
            v-model="table[scope.$index].riskValueMax"
            :precision="2"
            size="mini"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="管控等级"
        prop="controlLevelColour"
        width="160"
      >
        <template v-slot="scope">
          <!-- <div v-if="scope.row.controlLevelColour" style="border-radius: 5px; color: #ffffff;" :class="['highlight', ['red', 'orange','yellow','blue','green'][scope.row.controlLevelColour - 1]]">
            {{ ['红色','橙色','黄色','蓝色','绿色'][scope.row.controlLevelColour-1] }}
          </div> -->
          <el-tag style="color: #ffffff;padding: 0 30px;" v-if="configType===4 || configType===6" :color="getArrKeyToVal(levelColor(),scope.row.controlLevelColour - 1)">{{ getArrKeyToVal(levelName(),scope.row.controlLevelColour-1) }}</el-tag>
          <el-tag style="color: #ffffff;padding: 0 30px;" v-else :color="getArrKeyToVal(riskColor(),scope.row.controlLevelColour - 1)">{{ getArrKeyToVal(riskName(),scope.row.controlLevelColour-1) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="管控措施"
      >
        <template v-slot="scope">
          <el-input
            v-model.trim="table[scope.$index].controlMeasures"
            style="width: 100%;"
            type="textarea"
            rows="4"
            maxlength="200"
            show-word-limit
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
        @click="saveData"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { getList, updateData } from '@/api/analysis-model/risk-threshold'
import { levelColor,riskColor,levelName,riskName } from '@/utils/config'
export default {
  inject: ['configType'],
  data() {
    return {
      loading: false,
      table: [],
      copyTable: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getArrKeyToVal(arr,key){
      let val = arr[key]
      console.log(arr,key,val,'数据')
      return val
    },
    levelColor,
    levelName,
    riskName,
    riskColor,
    async fetchData() {
      this.loading = true
      this.table = (await getList(this.configType)).data || []
      this.copyTable = JSON.parse(JSON.stringify(this.table))
      this.loading = false
    },
    async saveData() {
      const riskThresholdDto = {
        type: this.configType,
        riskThresholds: this.table.map(({ id, riskValueMin,riskValueMax, controlMeasures }) => ({ id, riskValueMin,riskValueMax,controlMeasures }))
      }
      const res = await updateData(riskThresholdDto)
      if (res.code === '0') {
        this.$message.success('数据修改成功')
        this.fetchData()
      }
    },
    blur(index, val) {
      // 数据不存在还原默认值
      if (val === undefined) {
        this.table[index].riskValueMin = this.copyTable[index].riskValueMin
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight {
    display: flex;
    margin: 0 auto;
    width: 140px;
    height: 35px;
    color: #000000;
    justify-content: center;
    align-items: center;
}

.red {
    background-color: rgb(217, 0, 27);
}

.yellow {
    background-color: rgb(230, 234, 18);
}

.orange {
    background-color: rgb(242, 115, 14);
}

.blue {
    background-color: rgb(64, 158, 255);
}

.green {
    background-color: rgb(4, 249, 29);
}
</style>
