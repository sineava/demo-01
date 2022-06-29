<template>
  <div
    slot="header"
    class="water"
  >
    <el-table
      :data="tableData"
      border
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      :header-cell-style="{ backgroundColor: '#F2F2F2' }"
    >
      <el-table-column
        prop="hubName"
        label="电站"
        align="center"
      />
      <el-table-column
        prop="upstreamWaterLevel"
        label="上游水位"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="!disabled">{{ tableData[scope.$index].upstreamWaterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].upstreamWaterLevel"
            :min="-100000"
            :precision="2"
            :controls="false"
            placeholder="请输入上游水位"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="downstreamWaterLevel"
        label="下游水位"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="!disabled">{{ tableData[scope.$index].downstreamWaterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].downstreamWaterLevel"
            :min="-100000"
            placeholder="请输入下游水位"
            style="width: 100%;"
            :precision="2"
            :controls="false"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="scheduledReceipt"
        label="入库流量"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="!disabled">{{ tableData[scope.$index].scheduledReceipt }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].scheduledReceipt"
            :min="-100000"
            placeholder="请输入入库流量"
            style="width: 100%;"
            :precision="2"
            :controls="false"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="outboundTraffic"
        label="出库流量"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="!disabled">{{ tableData[scope.$index].outboundTraffic }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].outboundTraffic"
            :min="-100000"
            placeholder="请输入出库流量"
            style="width: 100%;"
            :precision="2"
            :controls="false"
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
    avTableData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    avTableData(newV) {
      this.tableData = newV
    }
  },
  created() {
    this.tableData = this.avTableData
  },
  methods: {
    // 组装数据
    getTableData() {
      let data = []
      this.tableData.forEach(element => {
        data.push({
          id:element.id || '',
          hubId:element.hubId || '',
          downstreamWaterLevel:element.downstreamWaterLevel || '',
          outboundTraffic:element.outboundTraffic || '',
          scheduledReceipt:element.scheduledReceipt || '',
          upstreamWaterLevel:element.upstreamWaterLevel || ''
        })
      })
      return data
    }
  }
}
</script>
