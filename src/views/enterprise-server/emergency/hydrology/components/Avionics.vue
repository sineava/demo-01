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
        prop="name"
        label="电站"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="upstreamWaterLevel"
        label="上游水位"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span v-if="payload === 'detail'">{{ tableData[scope.$index].upstreamWaterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].upstreamWaterLevel"
            :min="0"
            :precision="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="downstreamWaterLevel"
        label="下游水位"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span v-if="payload === 'detail'">{{ tableData[scope.$index].downstreamWaterLevel }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].downstreamWaterLevel"
            :min="0"
            :precision="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="scheduledReceipt"
        label="入库流量"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span v-if="payload === 'detail'">{{ tableData[scope.$index].scheduledReceipt }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].scheduledReceipt"
            :min="0"
            :precision="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="outboundTraffic"
        label="出库流量"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="payload === 'detail'">{{ tableData[scope.$index].outboundTraffic }}</span>
          <el-input-number
            v-else
            v-model="tableData[scope.$index].outboundTraffic"
            :min="0"
            :precision="2"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectNavigationList } from '@/api/emergency-services/hydrological'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    date: {
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
      tableData: []
    }
  },
  created() {
    if (this.payload === 'add') {
      this.fetchData()
    }
  },
  methods: {
    // 查询电站信息
    async fetchData(table = []) {
      selectNavigationList().then(res => {
        this.tableData = res.data ? res.data.map((item, index) => ({
          id: table.length ? table[index].id : null,
          name: item.name,
          hubId: item.id,
          downstreamWaterLevel: table.length ? table[index].downstreamWaterLevel ? table[index].downstreamWaterLevel : undefined : undefined,
          outboundTraffic: table.length ? table[index].outboundTraffic ? table[index].outboundTraffic : undefined : undefined,
          scheduledReceipt: table.length ? table[index].scheduledReceipt ? table[index].scheduledReceipt : undefined : undefined,
          upstreamWaterLevel: table.length ? table[index].upstreamWaterLevel ? table[index].upstreamWaterLevel : undefined : undefined
        })) : []
      })
    },
    // 组装数据
    getTableData() {
      return this.tableData.map(item => ({ id: item.id, hubId: item.hubId, downstreamWaterLevel: item.downstreamWaterLevel || 0.00, outboundTraffic: item.outboundTraffic || 0.00, scheduledReceipt: item.scheduledReceipt || 0.00, upstreamWaterLevel: item.upstreamWaterLevel || 0.00 }))
    },
    // 更新table数据
    updateTable(table) {
      this.fetchData(table)
    }
  }
}
</script>

