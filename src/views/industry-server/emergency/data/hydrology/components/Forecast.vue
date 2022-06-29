<template>
  <div class="person-group">
    <el-table
      :data="tableData"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        prop="watersId"
        label="水文站"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved">{{ getWatersName(scope.row.watersId) }}</span>
          <el-select
            v-else
            v-model="scope.row.watersId"
            clearable
            placeholder="请选择水文站"
            style="width: 100%;"
          >
            <el-option
              v-for="item in list"
              :key="item.watersId"
              :label="`${item.waters} - ${item.watersName}`"
              :value="item.watersId"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="floodPeakTime"
        label="洪峰时间"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved">{{ scope.row.floodPeakTime }}</span>
          <el-date-picker
            v-else
            v-model="scope.row.floodPeakTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择洪峰时间"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="estimatedWaterLevelFlow"
        label="预报水位/流量(米)"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved"> {{ scope.row.estimatedWaterLevelFlow  }} </span>
          <div style="display: flex;align-items: center;" v-else>
            <el-input-number
              v-model="scope.row.estimatedWaterLevelFlow1"
              style="width: 100%;"
              :min="-100000"
              :controls="false"
              placeholder="请输入预报水位"
              :precision="2"
            />
            <div style="margin: 0 5px;font-size: 25px;">/</div>
            <el-input-number
              v-model="scope.row.estimatedWaterLevelFlow2"
              style="width: 100%;"
              :min="-100000"
              :controls="false"
              placeholder="请输入流量(米)"
              :precision="2"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="isExpectedToRise"
        label="预计涨幅（米）"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved">{{ scope.row.isExpectedToRise }}</span>
          <el-input-number
            v-else
            v-model="scope.row.isExpectedToRise"
            :min="-100000"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入预计涨幅（米）"
            :precision="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="warningWaterLevel"
        label="警戒水位/保证水位(米)"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved">{{ scope.row.warningWaterLevel }}</span>
          <div style="display: flex;align-items: center;" v-else>
            <el-input-number
              v-model="scope.row.warningWaterLevel1"
              style="width: 100%;"
              :min="-100000"
              :controls="false"
              placeholder="请输入警戒水位"
              :precision="2"
            />
            <div style="margin: 0 5px;font-size: 25px;">/</div>
            <el-input-number
              v-model="scope.row.warningWaterLevel2"
              style="width: 100%;"
              :min="-100000"
              :controls="false"
              placeholder="请输入保证水位(米)"
              :precision="2"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!disabled"
        label="操作"
        width="120"
        align="center"
      >
        <template v-slot="scope">
          <el-button
            v-if="scope.row.saved"
            size="mini"
            type="text"
            @click="edit(scope.$index)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            v-else
            size="mini"
            type="text"
            @click="save(scope.$index)"
          >
            <em class="el-icon-success" /> 保存
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="remove(scope.$index)"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="!disabled"
      class="add-btn"
    >
      <el-button
        icon="el-icon-circle-plus-outline"
        style="display: flex; justify-content: center; align-items: center;"
        type="text"
        @click="add"
      >
        添加洪峰预报
      </el-button>
    </div>
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
    },
    forecastData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      selectedArr: [],
      list: [],
      tableData: []
    }
  },
  watch: {
    hyTableData(newV) {
      this.list = newV
    },
    forecastData(newV){
      this.tableData = newV
    }
  },
  created() {
    this.list = this.hyTableData
    this.tableData = this.forecastData
  },
  methods: {
    getWatersName(watersId){
      let name = ''
      for (let i=0;i<this.list.length;i++){
        if (this.list[i].watersId === watersId){
          name = `${this.list[i].waters} - ${this.list[i].watersName}`
          return name
        }
      }
      return name
    },
    edit(index) {
      const obj = this.tableData[index]
      obj.saved = false
      const [estimatedWaterLevelFlow1, estimatedWaterLevelFlow2] = obj.estimatedWaterLevelFlow.split('/') || []
      const [warningWaterLevel1, warningWaterLevel2] = obj.warningWaterLevel.split('/') || []
      obj.estimatedWaterLevelFlow1 = estimatedWaterLevelFlow1
      obj.estimatedWaterLevelFlow2 = estimatedWaterLevelFlow2
      obj.warningWaterLevel1 = warningWaterLevel1
      obj.warningWaterLevel2 = warningWaterLevel2
      this.$set(this.tableData, index, obj)
    },
    save(index) {
      const obj = this.tableData[index]
      obj.saved = true
      obj.estimatedWaterLevelFlow = [obj.estimatedWaterLevelFlow1, obj.estimatedWaterLevelFlow2].join('/')
      obj.warningWaterLevel = [obj.warningWaterLevel1, obj.warningWaterLevel2].join('/')
      this.$set(this.tableData, index, obj)
    },
    remove(index) {
      this.tableData.splice(index, 1)
    },
    add() {
      this.tableData.push({
        id: null,
        watersId: null,
        warningWaterLeve1: undefined,
        warningWaterLeve2: undefined,
        isExpectedToRise: undefined,
        floodPeakTime: undefined,
        estimatedWaterLevelFlow1: undefined,
        estimatedWaterLevelFlow2: undefined,
        saved: false
      })
    },
    // 组装数据
    getTableData() {
      return this.tableData.filter(item => item.saved).map(({ saved, ...item }) => ({ ...item }))
    },
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
    display: flex;
    margin-top: 20px;
    border: 1px dashed #e4e4e4;
    padding: 10px;
    justify-content: center;
    align-items: center;
}
</style>
