<template>
  <el-card class="body-card digital-month">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增水路运输月报' : type === 'edit' ? '编辑水路运输月报' : '水路运输月报详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-card class="box-card">
        <Step
          :active="current"
        />
      </el-card>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="medium"
        :disabled="type === 'detail'"
      >
        <el-card v-show="current===1" class="box-card">
          <div slot="header" class="clearfix">
            <span>基础信息</span>
          </div>
          <el-form-item label="单位名称:">
            <span>{{ user_info.orgname }}</span>
          </el-form-item>
          <el-form-item
            label="单位负责人:"
            prop="monthly.principal"
          >
            <el-input v-model.trim="ruleForm.monthly.principal" placeholder="请输入单位负责人" />
          </el-form-item>
          <el-form-item
            label="月报日期:"
            prop="monthly.timeInfo"
          >
            <el-date-picker
              v-model="ruleForm.monthly.timeInfo"
              type="month"
              style="width: 100%;"
              :disabled="type !== 'add'"
              placeholder="请选择月报日期"
              @change="change"
            />
          </el-form-item>
          <el-form-item
            label="填报人:"
            prop="monthly.informant"
          >
            <el-input v-model.trim="ruleForm.monthly.informant" placeholder="请输入填报人" />
          </el-form-item>
          <el-form-item
            label="联系电话:"
            prop="monthly.informantPhone"
          >
            <el-input v-model.trim="ruleForm.monthly.informantPhone" placeholder="请选择联系电话" />
          </el-form-item>
          <el-form-item
            label="填写日期:"
            prop="monthly.fillInTheDate"
          >
            <el-date-picker
              v-model="ruleForm.monthly.fillInTheDate"
              type="datetime"
              style="width: 100%;"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="备注"
            style="width: 100%;"
          >
            <el-input
              v-model="ruleForm.monthly[['mainRemark', 'changeRemark', 'freightRemark'][current - 1]]"
              type="textarea"
              rows="6"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-card>
        <el-card v-show="current===2" class="box-card">
          <div slot="header" class="clearfix">
            <span>重庆市水路运输主要指标电讯月报</span>
          </div>
          <Despatch
            v-if="current === 2"
            ref="despatch"
            :table="mainData"
            :loading="loading"
            :date="ruleForm.monthly.timeInfo"
            :disabled="type === 'detail'"
          />
        </el-card>
        <el-card v-show="current===3" class="box-card">
          <div slot="header" class="clearfix">
            <span>运力情况增减变动</span>
          </div>
          <Capacity
            v-if="current === 3"
            ref="capacity"
            :data="changeDataDto"
            :loading="loading"
            :date="ruleForm.monthly.timeInfo"
            :disabled="type === 'detail'"
          />
        </el-card>
        <el-card v-show="current===4" class="box-card">
          <div slot="header" class="clearfix">
            <span>内河货运月报</span>
          </div>
          <Inland
            v-if="current === 4"
            ref="inland"
            :table="inlandDataA"
            :date="ruleForm.monthly.timeInfo"
            :loading="loading"
          />
          <Transport
            v-if="current === 4"
            ref="transport"
            :table="inlandDataB"
            :loading="loading"
            :date="ruleForm.monthly.timeInfo"
            :disabled="type === 'detail'"
          />
        </el-card>
        <el-card v-show="current===5" class="box-card">
          <div slot="header" class="clearfix">
            <span>港口月报</span>
          </div>
          <Month ref="month" :table="portMonthlyReportData" :loading="loading" :disabled="type === 'detail'" />
        </el-card>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="current && current !== 1"
        type="primary"
        size="medium "
        @click="prev"
      >
        上一步
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        v-if="current && current !== 5"
        type="primary"
        size="medium "
        :disabled="ruleForm.monthly.timeInfo ? false :true"
        @click="next"
      >
        下一步
      </el-button>
      <el-button
        v-if="current === 5 && type !== 'detail'"
        type="primary"
        size="medium "
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { telephone } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
import { saveInfo, updateInfo, getInfo, queryJSON } from '@/api/channel-services/month/water-report'
import Step from '../components/Step'
import Despatch from '../components/Despatch'
import Capacity from '../components/Capacity'
import Inland from '../components/Inland'
import Transport from '../components/Transport'
import Month from '../components/Month'
export default {
  components: {
    Step,
    Despatch,
    Capacity,
    Inland,
    Transport,
    Month
  },
  data() {
    return {
      type: '',
      current: 1,
      table: [],
      loading: false,
      ruleForm: {
        monthly: { // 水运月报基础信息
          changeRemark: '',
          fillInTheDate: '',
          freightRemark: '',
          id: null,
          informant: '',
          informantPhone: '',
          mainRemark: '',
          principal: '',
          timeInfo: ''
        },
        main: [] // 电讯月报
      },
      rules: {
        'monthly.principal': [
          { required: true, message: '请输入单位负责人', trigger: 'blur' }
        ],
        'monthly.timeInfo': [
          { required: true, message: '请选择月报日期', trigger: 'blur' }
        ],
        'monthly.informant': [
          { required: true, message: '请输入填报人', trigger: 'blur' }
        ],
        'monthly.informantPhone': [
          { validator: telephone, trigger: 'blur' },
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        'monthly.fillInTheDate': [
          { required: true, message: '请输入填写日期', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    mainData() {
      return this.table.mainIndicatorsDataDtoList
    },
    changeDataDto() {
      return this.table.changeDataDto
    },
    inlandDataA() {
      return this.table.inlandDataDto.oneDtoList
    },
    inlandDataB() {
      return this.table.inlandDataDto.twoDtoList
    },
    portMonthlyReportData() {
      return this.table.portMonthlyReportDataList
    },
    ...mapGetters(['user_info'])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.ruleForm.monthly.fillInTheDate = new Date()
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchJSON() {
      this.loading = true
      const res = await queryJSON({
        time: momentDate(this.ruleForm.monthly.timeInfo, 'YYYY-MM')
      })
      if (res.code !== '0') {
        this.current = 0
        this.loading = false
        return
      }
      this.current = 1
      this.loading = false
      this.table = res.data ? res.data : []
    },
    // 查询详情
    async fetchDetail(id) {
      getInfo({ id }).then(res => {
        if (res.data) {
          this.table = {
            monthlyTelecomReportDto: res.data.monthlyTelecomReportDto,
            changeDataDto: res.data.changeDataVo,
            inlandDataDto: {
              oneDtoList: res.data.inlandDataVo.dataOneVos,
              twoDtoList: res.data.inlandDataVo.dataTwoVos
            },
            mainIndicatorsDataDtoList: res.data.mainIndicatorsDataVoList,
            portMonthlyReportDataList: res.data.portInfoVos
          }
          this.ruleForm.monthly = { ...res.data.monthlyTelecomReportVo }
          this.current = 1
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存
    async saveData() {
      const dto = {
        monthlyTelecomReportDto: {
          ...this.ruleForm.monthly,
          fillInTheDate: momentDate(this.ruleForm.monthly.fillInTheDate),
          timeInfo: momentDate(this.ruleForm.monthly.timeInfo, 'YYYY-MM-DD')
        },
        mainIndicatorsDataDtoList: this.table.mainIndicatorsDataDtoList,
        changeDataDto: this.table.changeDataDto,
        inlandDataDto: this.table.inlandDataDto,
        portMonthlyReportDataList: this.table.portMonthlyReportDataList
      }
      delete dto.changeDataDto.reportId
      delete dto.monthlyTelecomReportDto.enterpriseId
      delete dto.monthlyTelecomReportDto.enterpriseName
      const res = dto.monthlyTelecomReportDto.id ? await updateInfo(dto) : await saveInfo(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 日期改变
    change(val) {
      if (!val) {
        this.current = 0
        return
      }
      this.ruleForm.monthly.timeInfo = momentDate(val, 'YYYY-MM')
      if (val) this.fetchJSON()
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 上一步
    prev() {
      this.current -= 1
    },
    next() {
      if (this.current===1){
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.current += 1
          }
        })
      } else if (this.current === 2){
        this.current += 1
      } else if (this.current === 3){
        this.table.changeDataDto = this.$refs.capacity.getWrapperTable()
        const capacity = this.table.changeDataDto
        // 生成表三所需数据
        const oneList = this.table.inlandDataDto.oneDtoList
        const mainIndicatorsDataDtoList = this.table.mainIndicatorsDataDtoList
        oneList[0].total = capacity.cargoShipCurrentData // 获取：运力表---货船艘数
        oneList[1].total = capacity.cargoShipTonnageCurrentData // 获取：运力表---货船吨位数
        oneList[2].total = mainIndicatorsDataDtoList[8].month // 获取：电讯表--货运量合计
        oneList[3].total = mainIndicatorsDataDtoList[13].month // 获取：电讯表--货运周转量合计
        oneList[2].totalIndividual = mainIndicatorsDataDtoList[10].month + mainIndicatorsDataDtoList[12].month // 电讯表，货运量机动船个体+驳船个体
        oneList[3].totalIndividual = mainIndicatorsDataDtoList[15].month + mainIndicatorsDataDtoList[17].month // 电讯表，货运周转量机动船个体+驳船个体
        oneList[2].inlandRiver = mainIndicatorsDataDtoList[8].month - mainIndicatorsDataDtoList[8].ocean // 电讯表-货运量合计（本月）-货运量合计（远洋）
        oneList[3].inlandRiver = mainIndicatorsDataDtoList[13].month - mainIndicatorsDataDtoList[13].ocean // 电讯表-货运周转量合计（本月）-货运周转量合计（远洋）
        oneList[2].inlandRiverIndividual = oneList[2].totalIndividual - (mainIndicatorsDataDtoList[10].ocean + mainIndicatorsDataDtoList[12].ocean) // 总计个体-远洋的货运量机动船个体+驳船个体
        oneList[3].inlandRiverIndividual = oneList[3].totalIndividual - (mainIndicatorsDataDtoList[15].ocean + mainIndicatorsDataDtoList[17].ocean) // 总计个体-远洋的货运周转量机动船个体+驳船个体
        this.current += 1
      } else if (this.current === 4) {
        console.log(this.portMonthlyReportData)
        const data = JSON.parse(JSON.stringify(this.portMonthlyReportData.map(x => ({
          ...x,
          cumulativeValue: x?.value ? ((x?.value || 0) + (x?.cumulativeValue || 0)) : x?.cumulativeValue
        }))))
        this.table.portMonthlyReportDataList = data
        this.current += 1
      } else {
        this.current += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-month {
    .box-card {
        margin-bottom: 10px;

        /deep/ .el-card__body {
            padding: 10px 20px;
        }
    }
}

/deep/ .el-table .pre-line {
    display: inline-block;
    padding-left: 20px;
}
</style>
