<template>
  <div class="ship-group">
    <el-table
      :data="longTable"
      :header-cell-style="{color:'black',borderColor:'#333744'}"
      :cell-style="cellStyle"
      border
      style="margin-top: 10px;"
    >
      <!-- <el-table-column
        align="center"
        prop="station"
        label="站点"
      >
        <template v-slot="scope">
          <span v-if="type === 'detail'">{{ scope.row.station }}</span>
          <el-input
            v-else
            v-model="scope.row.station"
            maxlength="30"
            size="small"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        label="出口客船（艘次）"
      >
        <el-table-column
          align="center"
          prop="exitShipNumber"
          label="当日发送"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitShipNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitShipNumber"
              :min="0"
              :max="99999999"
              :controls="false"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="exitAccurateLoad"
          label="客位数"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitAccurateLoad }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitAccurateLoad"
              :min="0"
              :max="99999999"
              :controls="false"
              size="small"
              :class="CTExitAccurateLoadError"
              @change="CTExitAccurateLoad"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="出口旅客（人次）"
      >
        <el-table-column
          align="center"
          prop="exitGuestNumber"
          label="当日发送"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitGuestNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitGuestNumber"
              :min="0"
              :max="999999"
              :controls="false"
              size="small"
              :class="CTExitGuestNumberError"
              @change="CTExitGuestNumber"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="进口客船（艘次）"
      >
        <el-table-column
          align="center"
          prop="importShipNumber"
          label="当日抵达"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importShipNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importShipNumber"
              :min="0"
              :max="99999999"
              :controls="false"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="importAccurateLoad"
          label="客位数"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importAccurateLoad }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importAccurateLoad"
              :min="0"
              :max="99999999"
              :controls="false"
              size="small"
              :class="CTImportAccurateLoadError"
              @change="CTImportAccurateLoad"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="进口旅客（人次）"
      >
        <el-table-column
          align="center"
          prop="importGuestNumber"
          label="当日抵达"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importGuestNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importGuestNumber"
              :min="0"
              :max="999999"
              size="small"
              :controls="false"
              :class="CTImportGuestNumberError"
              @change="CTImportGuestNumber"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column
        v-if="type !== 'detail'"
        align="center"
        label="操作"
      >
        <template v-slot="scope">
          <el-button
            size="small"
            type="danger"
            @click="remove(scope.$index)"
          >
            <em class="el-icon-delete" /> 移除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div v-if="type !== 'detail'" class="add-btn">
      <el-button
        icon="el-icon-circle-plus-outline"
        style="display: flex;justify-content: center;align-items:center;"
        type="text"
        @click="add"
      >
        {{ title }}
      </el-button>
    </div> -->
    <el-form-item
      label-width="0"
      style="width: 100%;"
    >
      <div class="icon-title">
        <span class="span" />短途信息
      </div>
    </el-form-item>
    <el-table
      :data="shortTable"
      border
      :header-cell-style="{color:'black',borderColor:'black'}"
      :cell-style="cellStyle"
      style="margin-top: 10px;"
    >
      <!-- <el-table-column
        align="center"
        prop="station"
        label="站点"
      >
        <template v-slot="scope">
          <span>{{ longTable[scope.$index].station }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        label="出口客船（艘次）"
      >
        <el-table-column
          align="center"
          prop="exitShipNumber"
          label="当日发送"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitShipNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitShipNumber"
              :min="0"
              :max="99999999"
              size="small"
              :controls="false"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="exitAccurateLoad"
          label="客位数"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitAccurateLoad }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitAccurateLoad"
              :min="0"
              :max="99999999"
              size="small"
              :controls="false"
              :class="DTExitAccurateLoadError"
              @change="DTExitAccurateLoad"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="出口旅客（人次）"
      >
        <el-table-column
          align="center"
          prop="exitGuestNumber"
          label="当日发送"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.exitGuestNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.exitGuestNumber"
              :min="0"
              :max="99999999"
              :controls="false"
              size="small"
              :class="DTExitGuestNumberError"
              @change="DTExitGuestNumber"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="进口客船（艘次）"
      >
        <el-table-column
          align="center"
          prop="importShipNumber"
          label="当日抵达"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importShipNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importShipNumber"
              :min="0"
              :max="99999999"
              size="small"
              :controls="false"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="importAccurateLoad"
          label="客位数"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importAccurateLoad }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importAccurateLoad"
              :min="0"
              :max="99999999"
              size="small"
              :controls="false"
              :class="DTImportAccurateLoadError"
              @change="DTImportAccurateLoad"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="进口旅客（人次）"
      >
        <el-table-column
          align="center"
          prop="importGuestNumber"
          label="当日抵达"
        >
          <template v-slot="scope">
            <span v-if="type === 'detail'">{{ scope.row.importGuestNumber }}</span>
            <el-input-number
              v-else
              v-model="scope.row.importGuestNumber"
              :min="0"
              :max="99999999"
              size="small"
              :controls="false"
              :class="DTImportGuestNumberError"
              @change="DTImportGuestNumber"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column
        v-if="type !== 'detail'"
        align="center"
        label="操作"
      >
        <template v-slot="scope">
          <el-button
            size="small"
            type="danger"
            @click="remove(scope.$index)"
          >
            <em class="el-icon-delete" /> 移除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-form ref="ruleForm">
      <el-form-item
        label="备注"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.importantRemark"
          type="textarea"
          rows="6"
          style="width: 100%;"
          maxlength="200"
          show-word-limit
          :disabled="type === 'detail'"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      ruleForm: {
        importantRemark: '',
        periodId: null
      },
      longTable: [{
        exitShipNumber: 0,
        exitAccurateLoad: 0,
        exitGuestNumber: 0,
        importShipNumber: 0,
        importAccurateLoad: 0,
        importGuestNumber: 0,
        id: null,
        station: ''
      }],
      CTExitAccurateLoadError:'',
      CTExitGuestNumberError: '',
      CTImportAccurateLoadError:'',
      CTImportGuestNumberError:'',
      DTExitAccurateLoadError:'',
      DTExitGuestNumberError: '',
      DTImportAccurateLoadError:'',
      DTImportGuestNumberError:'',
      shortTable: [{
        exitShipNumber: 0,
        exitAccurateLoad: 0,
        exitGuestNumber: 0,
        importShipNumber: 0,
        importAccurateLoad: 0,
        importGuestNumber: 0,
        id: null,
        station: ''
      }]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.longTable[0].station = this.user.user_info[0].orgname
    this.shortTable[0].station = this.user.user_info[0].orgname
  },
  methods: {
    isSubmit(){
      if ([
        this.CTExitAccurateLoadError,
        this.CTExitGuestNumberError,
        this.CTImportAccurateLoadError,
        this.CTImportGuestNumberError,
        this.DTExitAccurateLoadError,
        this.DTExitGuestNumberError,
        this.DTImportAccurateLoadError,
        this.DTImportGuestNumberError
      ].indexOf('error')!==-1){
        this.$emit('isSubmit',true)
      } else {
        this.$emit('isSubmit',false)
      }
    },
    // 长途客位数-变化
    CTExitAccurateLoad(val){
      if (this.longTable[0].exitGuestNumber!==0){
        if (val < this.longTable[0].exitGuestNumber){
          this.CTExitAccurateLoadError = 'error'
          this.$message.error('客位数为当日发送全部艘次的客位数之和，须大于或等于当日发送人数。')
          this.isSubmit()
          return false
        }
      }
      this.CTExitAccurateLoadError = ''
      this.CTExitGuestNumberError = ''
      this.isSubmit()
    },
    // 长途当日发送
    CTExitGuestNumber(val){
      if (val > this.longTable[0].exitAccurateLoad){
        this.CTExitGuestNumberError = 'error'
        this.$message.error('客位数为当日发送全部艘次的客位数之和，须大于或等于当日发送人数。')
        this.isSubmit()
        return false
      }
      this.CTExitGuestNumberError = ''
      this.CTExitAccurateLoadError = ''
      this.isSubmit()
    },
    CTImportAccurateLoad(val){
      if (this.longTable[0].importGuestNumber!==0){
        if (val < this.longTable[0].importGuestNumber){
          this.CTImportAccurateLoadError = 'error'
          this.$message.error('客位数为当日抵达全部艘次的客位数之和，须大于或等于当日抵达人数。')
          this.isSubmit()
          return false
        }
      }
      this.CTImportAccurateLoadError = ''
      this.CTImportGuestNumberError = ''
      this.isSubmit()
    },
    CTImportGuestNumber(val){
      if (val > this.longTable[0].importAccurateLoad){
        this.CTImportGuestNumberError = 'error'
        this.$message.error('客位数为当日抵达全部艘次的客位数之和，须大于或等于当日抵达人数。')
        this.isSubmit()
        return false
      }
      this.CTImportGuestNumberError = ''
      this.CTImportAccurateLoadError = ''
      this.isSubmit()
    },

    // 短途客位数-变化
    DTExitAccurateLoad(val){
      if (this.shortTable[0].exitGuestNumber!==0){
        if (val < this.shortTable[0].exitGuestNumber){
          this.DTExitAccurateLoadError = 'error'
          this.$message.error('客位数为当日发送全部艘次的客位数之和，须大于或等于当日发送人数。')
          this.isSubmit()
          return false
        }
      }
      this.DTExitAccurateLoadError = ''
      this.DTExitGuestNumberError = ''
      this.isSubmit()
    },
    // 短途当日发送
    DTExitGuestNumber(val){
      if (val > this.shortTable[0].exitAccurateLoad){
        this.DTExitGuestNumberError = 'error'
        this.$message.error('客位数为当日发送全部艘次的客位数之和，须大于或等于当日发送人数。')
        this.isSubmit()
        return false
      }
      this.DTExitGuestNumberError = ''
      this.DTExitAccurateLoadError = ''
      this.isSubmit()
    },
    DTImportAccurateLoad(val){
      if (this.shortTable[0].importGuestNumber!==0){
        if (val < this.shortTable[0].importGuestNumber){
          this.DTImportAccurateLoadError = 'error'
          this.$message.error('客位数为当日抵达全部艘次的客位数之和，须大于或等于当日抵达人数。')
          this.isSubmit()
          return false
        }
      }
      this.DTImportAccurateLoadError = ''
      this.DTImportGuestNumberError = ''
      this.isSubmit()
    },
    DTImportGuestNumber(val){
      if (val > this.shortTable[0].importAccurateLoad){
        this.DTImportGuestNumberError = 'error'
        this.$message.error('客位数为当日抵达全部艘次的客位数之和，须大于或等于当日抵达人数。')
        this.isSubmit()
        return false
      }
      this.DTImportGuestNumberError = ''
      this.DTImportAccurateLoadError = ''
      this.isSubmit()
    },

    // 设置单元格背景
    cellStyle({row, column, rowIndex, columnIndex}) {
      return 'height:35px!important; border-color:black!important; color:#000000!important; padding:0px!important; height:40px!important'
    },
    add() {
      const info = {
        exitShipNumber: 0,
        exitAccurateLoad: 0,
        exitGuestNumber: 0,
        importShipNumber: 0,
        importAccurateLoad: 0,
        importGuestNumber: 0,
        id: null
      }
      this.longTable.push({ ...info, station: '' })
      this.shortTable.push(info)
    },
    remove(index) {
      this.$confirm('此操作将同时移除该站点长途及短途相关信息, 是否继续?', '操作确认').then(() => {
        this.longTable.splice(index, 1)
        this.shortTable.splice(index, 1)
      }).catch(err => err)
    },
    getTableData() {
      const dtoList = [
        ...this.shortTable.map((item, index) => ({ ...item, station: this.longTable[index].station, type: 1 })).map(obj => this.resetObj(obj)),
        ...this.longTable.map(item => ({ ...item, type: 2 })).map(obj => this.resetObj(obj))
      ]
      return {
        ...this.ruleForm,
        dtoList
      }
    },
    setTableData(tableData) {
      if (tableData.reportInfoVoList.length>0){
        this.longTable = [
          ...tableData.reportInfoVoList.filter(x => x.type === 2).map(x => ({
            exitAccurateLoad: x.exitAccurateLoad,
            exitGuestNumber: x.exitGuestNumber,
            exitShipNumber: x.exitShipNumber,
            id: x.id,
            importAccurateLoad: x.importAccurateLoad,
            importGuestNumber: x.importGuestNumber,
            importShipNumber: x.importShipNumber,
            station: x.station,
            type: x.type
          }))
        ]
        this.shortTable = [
          ...tableData.reportInfoVoList.filter(x => x.type === 1).map(x => ({
            exitAccurateLoad: x.exitAccurateLoad,
            exitGuestNumber: x.exitGuestNumber,
            exitShipNumber: x.exitShipNumber,
            id: x.id,
            importAccurateLoad: x.importAccurateLoad,
            importGuestNumber: x.importGuestNumber,
            importShipNumber: x.importShipNumber,
            station: x.station,
            type: x.type
          }))
        ]
        this.ruleForm = {
          importantRemark: tableData.importantRemark
        }
      }
    },
    // 遍历对象值,为undefined改为0
    resetObj(obj) {
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) obj[key] = 0
      })
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
    /deep/ .el-input__inner {
        border-style: solid;
        border-color: #f40303;
    }
}

.add-btn {
    display: flex;
    margin-top: 20px;
    border: 1px dashed #e4e4e4;
    padding: 10px;
    justify-content: center;
    align-items: center;
}

.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group {
    border-color: black;
}

.el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: black;
}
</style>
