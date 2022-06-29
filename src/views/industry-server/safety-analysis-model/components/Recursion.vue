<template>
  <div class="item">
    <el-table
      v-if="arr.length"
      :data="arr"
      :header-cell-style="{ textAlign: 'center', backgroundColor: '#F2F2F2' }"
      :cell-style="{textAlign: 'center'}"
      border
      style="margin-top: 10px;"
    >
      <el-table-column label="指标名称" prop="indicatorName" />
      <el-table-column label="计算取值" prop="calculatedValue" />
      <el-table-column label="采集频率" prop="collectionFrequency" />
      <el-table-column label="采集数据值">
        <template v-slot="scope">
          <!-- 接口获取 -->
          <div v-if="scope.row.collectedDataType === 0">
            {{ scope.row.collectedDataValue || '--' }}
          </div>
          <!-- 量化层 -->
          <div v-if="scope.row.collectedDataType === 1">
            <el-input
              v-model="arr[scope.$index].collectedDataValue"
              placeholder="请输入采集数据值"
              maxlength="10"
              @input="arr[scope.$index].collectedDataValue = arr[scope.$index].collectedDataValue.replace(/[^\d.]/g,'')"
            />
          </div>
          <!-- 指标层 -->
          <div v-if="scope.row.collectedDataType === 2">
            <el-select
              v-model="arr[scope.$index].collectedDataValue"
              clearable
              style="width: 100%;"
              placeholder="请选择采集数据值"
            >
              <el-option
                v-for="item in arr[scope.$index].tags"
                :key="item.id"
                :label="item.tagName"
                :value="item.id"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    arr: {
      type: Array,
      required: true
    }
  }
}
</script>
