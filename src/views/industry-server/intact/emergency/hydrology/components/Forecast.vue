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
          <span v-if="scope.row.saved">{{ scope.row.watersId && list.length && list.find(item => item.id === scope.row.watersId).name }}</span>
          <el-select
            v-else
            v-model="scope.row.watersId"
            clearable
            placeholder="请选择"
            style="width: 80%;"
          >
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.name"
              :value="item.id"
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
            placeholder="选择时间"
            style="width: 80%;"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="estimatedWaterLevelFlow"
        label="预报水位/流量(米)"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.saved">{{ scope.row.estimatedWaterLevelFlow }}</span>
          <el-input-number
            v-else
            v-model="scope.row.estimatedWaterLevelFlow"
            :min="0"
            :precision="2"
          />
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
            :min="0"
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
          <el-input-number
            v-else
            v-model="scope.row.warningWaterLevel"
            :min="0"
            :precision="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showOption"
        label="操作"
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
            @click="delete(scope.$index)"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="showAdd"
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
import { selectWatersList } from '@/api/emergency-services/hydrological'
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
    },
    showAdd: {
      type: Boolean,
      default: () => false
    },
    showOption: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      selectedArr: [],
      list: [],
      tableData: []
    }
  },
  created() {
    this.fetchStation()
  },
  methods: {
    // 查询水文站信息(需要同步)
    fetchStation() {
      selectWatersList().then(res => {
        this.list = res.data ? res.data : []
      })
    },
    edit(index) {
      this.tableData[index].saved = false
    },
    save(index) {
      this.tableData[index].saved = true
    },
    remove(index) {
      this.tableData.splice(index, 1)
    },
    add() {
      this.tableData.push({
        id: null,
        watersId: null,
        warningWaterLevel: undefined,
        isExpectedToRise: undefined,
        floodPeakTime: undefined,
        estimatedWaterLevelFlow: undefined,
        saved: false
      })
    },
    // 组装数据
    getTableData() {
      return this.tableData.filter(item => item.saved).map(({ saved, ...item }) => ({ ...item }))
    },
    // 更新table数据
    updateTable(table) {
      this.tableData = table.map(({ watersName, ...item }) => ({ ...item, saved: true }))
    }
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
