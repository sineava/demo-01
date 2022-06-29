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
    >
      <el-table-column
        label="编号"
        width="65"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="河名"
        prop="riverName"
        min-width="180"
      >
        <template v-slot="scope">
          <div v-if="!scope.row.saved" class="table-flex">
            <span>*</span>
            <el-input v-model="scope.row.riverName" />
          </div>
          <span v-else>{{ scope.row.riverName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="起讫地点"
        prop="origin"
        min-width="180"
      >
        <template v-slot="scope">
          <div v-if="!scope.row.saved" class="table-flex">
            <span>*</span>
            <el-input v-model="scope.row.origin" />
          </div>
          <span v-else>{{ scope.row.origin }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="维护航道（km）"
        prop="seaLanes"
        min-width="180"
      >
        <template v-slot="scope">
          <div v-if="!scope.row.saved" class="table-flex">
            <span>*</span>
            <el-input-number
              v-model="scope.row.seaLanes"
              :precision="2"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
          </div>
          <span v-else>{{ scope.row.seaLanes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="维护疏浚（m3）"
        prop="maintenanceDredging"
        min-width="180"
      >
        <template v-slot="scope">
          <div v-if="!scope.row.saved" class="table-flex">
            <span>*</span>
            <el-input-number
              v-model="scope.row.maintenanceDredging"
              :precision="2"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
          </div>
          <span v-else>{{ scope.row.maintenanceDredging }}</span>
        </template>
      </el-table-column>
      <el-table-column label="整治建筑物养护">
        <el-table-column
          label="筑坝（m3）"
          prop="damming"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.damming"
              :precision="2"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.damming }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="补坝（m3）"
          prop="fillDam"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.fillDam"
              :precision="2"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.fillDam }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="一等航标">
        <el-table-column
          label="设标数（座）"
          prop="firstClass"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.firstClass"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.firstClass }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="维护数（座）"
          prop="firstClassMaintain"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.firstClassMaintain"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.firstClassMaintain }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="维护标（天）"
          prop="firstClassMaintainDay"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.firstClassMaintainDay"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.firstClassMaintainDay }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="二等航标">
        <el-table-column
          label="设标数（座）"
          prop="secondClass"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.secondClass"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.secondClass }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="维护数（座）"
          prop="secondClassMaintain"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.secondClassMaintain"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.secondClassMaintain }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="维护标（天）"
          prop="secondClassMaintainDay"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.secondClassMaintainDay"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.secondClassMaintainDay }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="通航建筑物维护">
        <el-table-column
          label="维修（项）"
          prop="repairItem"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.repairItem"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.repairItem }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="监测（项）"
          prop="testItem"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.testItem"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.testItem }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保养（项）"
          prop="maintenanceItem"
          min-width="180"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="!scope.row.saved"
              v-model="scope.row.maintenanceItem"
              :min="0"
              :max="999999"
              style="width: 100%;"
            />
            <span v-else>{{ scope.row.maintenanceItem }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="工作船舶维护（艘）"
        prop="workingShipMaintenance"
        min-width="180"
      >
        <template v-slot="scope">
          <el-input-number
            v-if="!scope.row.saved"
            v-model="scope.row.workingShipMaintenance"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
          <span v-else>{{ scope.row.workingShipMaintenance }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="维护水深达标天数（天）"
        prop="standardDays"
        min-width="180"
      >
        <template v-slot="scope">
          <el-input-number
            v-if="!scope.row.saved"
            v-model="scope.row.standardDays"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
          <span v-else>{{ scope.row.standardDays }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="巡航里程（km）"
        prop="cruiseRange"
        min-width="180"
      >
        <template v-slot="scope">
          <el-input-number
            v-if="!scope.row.saved"
            v-model="scope.row.cruiseRange"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
          <span v-else>{{ scope.row.cruiseRange }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark"
        min-width="240"
      >
        <template v-slot="scope">
          <el-input
            v-if="!scope.row.saved"
            v-model="scope.row.remark"
            type="textarea"
            rows="2"
            maxlength="200"
            show-word-limit
          />
          <div v-else>
            {{ scope.row.remark }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showOption"
        label="操作"
        min-width="120"
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
      v-if="showAdd"
      class="add-btn"
    >
      <el-button
        icon="el-icon-circle-plus-outline"
        style="display: flex; justify-content: center; align-items: center;"
        type="text"
        @click="add"
      >
        添加河道
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
      this.initData()
    }
  },
  created() {
    this.table = []
    this.initData()
  },
  methods: {
    initData(){
      this.dataTable.forEach(item=>{
        this.table.push(
          {
            cruiseRange: item.cruiseRange,
            damming: item.damming,
            fillDam: item.fillDam,
            firstClass: item.firstClass,
            firstClassMaintain: item.firstClassMaintain,
            firstClassMaintainDay: item.firstClassMaintainDay,
            id: item.id,
            maintenanceDredging: item.maintenanceDredging,
            maintenanceItem: item.maintenanceItem,
            origin: item.origin,
            remark: item.remark,
            repairItem: item.repairItem,
            riverName: item.riverName,
            seaLanes: item.seaLanes,
            secondClass: item.secondClass,
            secondClassMaintain: item.secondClassMaintain,
            secondClassMaintainDay: item.secondClassMaintainDay,
            standardDays: item.standardDays,
            testItem: item.testItem,
            workingShipMaintenance: item.workingShipMaintenance,
          }
        )
      })
    },
    getTableData() {
      return this.table
    },
    edit(index) {
      this.table[index].saved = false
    },
    save(index) {
      const isOk = this.table.some(x => x.riverName&&x.origin&&x.seaLanes&&x.maintenanceDredging)
      if (!isOk&&this.table.length) {
        this.$message.error('请将河名、起讫地点、维护航道、维护疏浚信息填写完整');
        return false
      }
      this.table[index].saved = true
    },
    remove(index) {
      this.table.splice(index, 1)
    },
    add() {
      const isOk = this.table.some(x => x.riverName&&x.origin&&x.seaLanes&&x.maintenanceDredging)
      if (!isOk&&this.table.length) {
        this.$message.error('请将河名、起讫地点、维护航道、维护疏浚信息填写完整');
        return false
      }
      this.table.push({
        cruiseRange: 0,
        damming: 0,
        fillDam: 0,
        firstClass: 0,
        firstClassMaintain: 0,
        firstClassMaintainDay: 0,
        id: null,
        maintenanceDredging: undefined,
        maintenanceItem: 0,
        origin: '',
        remark: '',
        repairItem: 0,
        riverName: '',
        seaLanes: undefined,
        secondClass: 0,
        secondClassMaintain: 0,
        secondClassMaintainDay: 0,
        standardDays: 0,
        testItem: 0,
        workingShipMaintenance: 0,
        saved: false
      })
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
.table-flex {
  display: flex;

  span {
    color: red;
    margin-right: 5px;
  }
}
</style>
