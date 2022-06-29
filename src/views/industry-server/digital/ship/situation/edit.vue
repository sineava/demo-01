<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'add' ? '新增通航情况统计' : type === 'edit' ? '编辑通航情况统计' : '通航情况统计详情' }}</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />运行天数
          </div>
        </el-form-item>
        <el-form-item
          label="选择时间:"
          prop="date"
        >
          <el-date-picker
            v-model="ruleForm.timeInfo"
            type="month"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            :picker-options="timeOption"
            placeholder="请选择时间"
            @change="change"
          />
        </el-form-item>
        <el-form-item
          label="通航天数:"
          prop="workingDays"
        >
          <el-input-number
            v-model="ruleForm.workingDays"
            :min="0"
            :max="999999"
            placeholder="请输入通航天数"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="停航天数:"
          prop="restDays"
        >
          <el-input-number
            v-model="ruleForm.restDays"
            placeholder="请输入停航天数"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="日历天数:"
          prop="calendarDays"
        >
          {{ ruleForm.calendarDays }}
        </el-form-item>
        <el-form-item
          label="通航合计:"
          prop="workingCount"
        >
          {{ workingCount }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />停航情况分类统计
          </div>
        </el-form-item>
        <el-form-item
          label="运行维保(次):"
          prop="restMaintainNumber"
        >
          <el-input-number
            v-model="ruleForm.restMaintainNumber"
            :min="0"
            :max="999999"
            placeholder="请输入运行维保(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="设备故障(次):"
          prop="restFaultNumber"
        >
          <el-input-number
            v-model="ruleForm.restFaultNumber"
            :min="0"
            :max="999999"
            placeholder="请输入设备故障(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="通航水位(次):"
          prop="restWaterNumber"
        >
          <el-input-number
            v-model="ruleForm.restWaterNumber"
            :min="0"
            :max="999999"
            placeholder="请输入通航水位(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="合计:"
          prop="restCount"
        >
          {{ restCount }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />闸次统计
          </div>
        </el-form-item>
        <el-form-item
          label="上行总计(次):"
          prop="brakeUpNumber"
        >
          <el-input-number
            v-model="ruleForm.brakeUpNumber"
            :min="0"
            :max="999999"
            placeholder="请输入上行总计(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="下行总计(次):"
          prop="brakeDownNumber"
        >
          <el-input-number
            v-model="ruleForm.brakeDownNumber"
            :min="0"
            :max="999999"
            placeholder="请输入下行总计(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="倒空闸(次):"
          prop="brakeEmptyNumber"
        >
          <el-input-number
            v-model="ruleForm.brakeEmptyNumber"
            :min="0"
            :max="999999"
            placeholder="请输入倒空闸(次)"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="闸次合计:"
          prop="brakeCount"
        >
          {{ brakeCount }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />艘次统计
          </div>
        </el-form-item>
        <el-form-item
          label="上行总计:"
          prop="shipsUpNumber"
        >
          <el-input-number
            v-model="ruleForm.shipsUpNumber"
            :min="0"
            :max="999999"
            placeholder="请输入上行总计"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="下行总计:"
          prop="shipsDownNumber"
        >
          <el-input-number
            v-model="ruleForm.shipsDownNumber"
            :min="0"
            :max="999999"
            placeholder="请输入下行总计"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="艘次合计:"
          prop="shipsCount"
        >
          {{ shipsCount }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />通过量统计（吨）
          </div>
        </el-form-item>
        <el-form-item
          label="上行参考载货量:"
          prop="amountUpCargoCapacity"
        >
          <el-input-number
            v-model="ruleForm.amountUpCargoCapacity"
            :min="0"
            :max="999999"
            placeholder="请输入上行参考载货量"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="下行参考载货量:"
          prop="amountDownCargoCapacity"
        >
          <el-input-number
            v-model="ruleForm.amountDownCargoCapacity"
            :min="0"
            :max="999999"
            placeholder="请输入下行参考载货量"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="吨位合计:"
          prop="amountCargoCapacity"
        >
          {{ amountCargoCapacity }}
        </el-form-item>
        <el-form-item
          label="上行实载吨:"
          prop="amountUpActualCargo"
        >
          <el-input-number
            v-model="ruleForm.amountUpActualCargo"
            :min="0"
            :max="999999"
            placeholder="请输入上行实载吨"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="下行实载吨:"
          prop="amountDownActualCargo"
        >
          <el-input-number
            v-model="ruleForm.amountDownActualCargo"
            :min="0"
            :max="999999"
            placeholder="请输入下行实载吨"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="实载吨合计:"
          prop="amountActualCargo"
        >
          {{ amountActualCargo }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />货物分类统计（吨）
          </div>
        </el-form-item>
        <el-form-item
          label="建筑材料:"
          prop="goodsBuildingMaterials"
        >
          <el-input-number
            v-model="ruleForm.goodsBuildingMaterials"
            :min="0"
            :max="999999"
            placeholder="请输入建筑材料"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="煤炭:"
          prop="goodsCoal"
        >
          <el-input-number
            v-model="ruleForm.goodsCoal"
            :min="0"
            :max="999999"
            placeholder="请输入煤炭"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="化工原料及制品:"
          prop="goodsChemicalMaterials"
        >
          <el-input-number
            v-model="ruleForm.goodsChemicalMaterials"
            :min="0"
            :max="999999"
            placeholder="请输入化工原料及制品"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="集装箱:"
          prop="goodsContainer"
        >
          <el-input-number
            v-model="ruleForm.goodsContainer"
            :min="0"
            :max="999999"
            placeholder="请输入集装箱"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="其他:"
          prop="goodsOthers"
        >
          <el-input-number
            v-model="ruleForm.goodsOthers"
            :min="0"
            :max="999999"
            placeholder="请输入其他"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="其他:"
          prop="goodsCount"
        >
          {{ goodsCount }}
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />备注信息
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
          prop="remark"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            :rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
import { saveInfo, updateInfo, getMonthInfo } from '@/api/channel-services/ship/year-statistical'
export default {
  data() {
    return {
      loading: false,
      timeOption: {
        disabledDate(date) {
          return date.getTime() >= Date.parse(moment().subtract(1, 'months').format('YYYY-MM'))
        }
      },
      ruleForm: {
        amountActualCargo: undefined,
        amountCargoCapacity: undefined,
        amountDownActualCargo: undefined,
        amountDownCargoCapacity: undefined,
        amountUpActualCargo: undefined,
        amountUpCargoCapacity: undefined,
        brakeCount: undefined,
        brakeDownNumber: undefined,
        brakeEmptyNumber: undefined,
        brakeUpNumber: undefined,
        calendarDays: undefined,
        goodsBuildingMaterials: undefined,
        goodsChemicalMaterials: undefined,
        goodsCoal: undefined,
        goodsContainer: undefined,
        goodsCount: undefined,
        goodsOthers: undefined,
        id: null,
        remark: '',
        restCount: undefined,
        restDays: undefined,
        restFaultNumber: undefined,
        restMaintainNumber: undefined,
        restWaterNumber: undefined,
        shipsCount: undefined,
        shipsDownNumber: undefined,
        shipsUpNumber: undefined,
        timeInfo: '',
        workingCount: undefined,
        workingDays: undefined
      },
      fileList: [],
      rules: {}
    }
  },
  computed: {
    // 合计项
    workingCount() {
      const {
        workingDays = 0,
        restDays = 0
      } = { ...this.ruleForm }
      return workingDays + restDays
    },
    restCount() {
      const {
        restMaintainNumber = 0,
        restFaultNumber = 0,
        restWaterNumber = 0
      } = { ...this.ruleForm }
      return restMaintainNumber + restFaultNumber + restWaterNumber
    },
    brakeCount() {
      const {
        brakeUpNumber = 0,
        brakeDownNumber = 0,
        brakeEmptyNumber = 0
      } = { ...this.ruleForm }
      return brakeUpNumber + brakeDownNumber + brakeEmptyNumber
    },
    shipsCount() {
      const {
        shipsUpNumber = 0,
        shipsDownNumber = 0
      } = { ...this.ruleForm }
      return shipsUpNumber + shipsDownNumber
    },
    amountCargoCapacity() {
      const {
        amountUpCargoCapacity = 0,
        amountDownCargoCapacity = 0
      } = { ...this.ruleForm }
      return amountUpCargoCapacity + amountDownCargoCapacity
    },
    amountActualCargo() {
      const {
        amountUpActualCargo = 0,
        amountDownActualCargo = 0
      } = { ...this.ruleForm }
      return amountUpActualCargo + amountDownActualCargo
    },
    goodsCount() {
      const {
        goodsBuildingMaterials = 0,
        goodsCoal = 0,
        goodsChemicalMaterials = 0,
        goodsContainer = 0,
        goodsOthers = 0,
        goodsCount = 0
      } = { ...this.ruleForm }
      return goodsBuildingMaterials + goodsCoal + goodsChemicalMaterials + goodsContainer + goodsOthers + goodsCount
    }
  },
  created() {
    const { dateType, id, type } = this.$route.query
    this.type = type
    if (id && dateType === 'month') this.fetchMonthDetail(id)
  },
  methods: {
    // 查询详情
    async fetchMonthDetail(id) {
      getMonthInfo({ id }).then(res => {
        this.ruleForm = {
          ...res.data
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      const { workingDays, restDays, calendarDays } = { ...this.ruleForm }
      if (workingDays + restDays !== calendarDays) {
        this.$message.warning('通航天数+停航天数应等于日历天数')
        return
      }
      const dto = {
        ...this.ruleForm,
        workingCount: this.workingCount,
        restCount: this.restCount,
        brakeCount: this.brakeCount,
        shipsCount: this.shipsCount,
        amountCargoCapacity: this.amountCargoCapacity,
        amountActualCargo: this.amountActualCargo,
        goodsCount: this.goodsCount
      }
      delete dto.departmentId
      delete dto.departmentName
      this.loading = true
      const res = dto.id ? await updateInfo(dto) : await saveInfo(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 时间改变
    change(val) {
      if (!val) {
        this.ruleForm.calendarDays = ''
        return
      }
      this.ruleForm.calendarDays = moment(val, 'YYYY-MM').daysInMonth()
    }
  }
}
</script>
