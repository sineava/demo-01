<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增水路运输月报' : type === 'edit' ? '编辑水路运输月报' : '水路运输月报详情'" />
      </span>
      <span v-if="type === 'auth'" class="detail-header-button">
        <el-button
          type="success"
          :disabled="auditState < 2 ? false :true"
          size="small"
          @click="handleReview"
        >
          审核通过
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="handleReback"
        >
          审核退回
        </el-button>
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="140px"
        size="medium"
        class="table-column two"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />基础信息
          </div>
        </el-form-item>
        <el-form-item label="单位名称:">
          <el-input
            :value="user_info.orgname"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="单位负责人:"
          prop="monthly.principal"
        >
          <el-input
            v-model.trim="ruleForm.monthly.principal"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="月报日期:"
          prop="monthly.timeInfo"
        >
          <el-date-picker
            v-model="ruleForm.monthly.timeInfo"
            type="date"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="填报人:"
          prop="monthly.informant"
        >
          <el-input
            v-model.trim="ruleForm.monthly.informant"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="monthly.informantPhone"
        >
          <el-input
            v-model.trim="ruleForm.monthly.informantPhone"
            disabled
          />
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
        <el-form-item label="审核状态:">
          <el-tag :type="auditState && ['', 'success', 'danger'][auditState - 1]">{{ auditState && ['未审核', '审核已通过', '审核已退回'][auditState - 1] }}</el-tag>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />月报信息
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-radio-group v-model="current">
            <el-radio-button :label="1">
              水路运输主要指标电讯月报
            </el-radio-button>
            <el-radio-button :label="2">
              运力情况增减变动月报表
            </el-radio-button>
            <el-radio-button :label="3">
              内河货运月报
            </el-radio-button>
            <el-radio-button :label="4">
              港口月报
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <Despatch
            v-if="current === 1"
            ref="despatch"
            :table="mainData"
            :loading="loading"
            disabled
          />
          <Capacity
            v-if="current === 2"
            ref="capacity"
            :data="changeDataDto"
            :loading="loading"
            disabled
          />
          <Inland
            v-if="current === 3"
            ref="inland"
            :table="inlandDataA"
            :loading="loading"
          />
          <Transport
            v-if="current === 3"
            ref="transport"
            :table="inlandDataB"
            :loading="loading"
            disabled
          />
          <Month
            v-if="current === 4"
            ref="month"
            :table="portMonthlyReportData"
            :loading="loading"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="current && !loading"
          label="备注"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.monthly[['mainRemark', 'changeRemark', 'freightRemark'][current - 1]]"
            type="textarea"
            rows="6"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="操作确认"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <el-form
        ref="sureForm"
        :model="sureForm"
        size="medium"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-alert
            title="是否确定退回操作?"
            type="warning"
            :closable="false"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          prop="auditRemark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="sureForm.auditRemark"
            type="textarea"
            rows="6"
            placeholder="请输入退回原因"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { telephone } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getInfo, auditInfo } from '@/api/channel-services/month/water-report'
import Despatch from '../components/Despatch'
import Capacity from '../components/Capacity'
import Inland from '../components/Inland'
import Transport from '../components/Transport'
import Month from '../components/Month'
export default {
  components: {
    Despatch,
    Capacity,
    Inland,
    Transport,
    Month
  },
  data() {
    return {
      id: '', // !审核使用
      dialogVisible: false,
      type: '',
      current: 0,
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
      sureForm: {
        auditRemark: ''
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
    const { id, type, auditState } = this.$route.query
    this.id = id
    this.type = type
    this.auditState = auditState
    this.ruleForm.monthly.fillInTheDate = new Date()
    if (id) this.fetchDetail(id)
  },
  methods: {
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
    // 退回
    handleReback() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.sureForm.resetFields()
      })
    },
    // 确认退回
    handleSure() {
      const dto = {
        ...this.sureForm,
        id: this.id,
        auditState: 3 // 退回状态码
      }
      auditInfo(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('退回成功!')
          this.dialogVisible = false
          this.auditState = 3
          this.fetchDetail(this.id)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => err)
    },
    // 审核
    handleReview() {
      this.$confirm('是否确定审核通过？', '操作确认').then(() => {
        auditInfo({
          auditState: 2, // 审核通过
          id: this.id
        }).then(res => {
          if (res.code === '0') {
            this.$message.success('审核通过!')
            this.auditState = 2
            this.fetchDetail(this.id)
          }
        })
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table .pre-line {
    display: inline-block;
    padding-left: 20px;
}
</style>
