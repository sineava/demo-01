<template>
  <el-card class="body-card digital-month">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输月报详情" />
      </span>
    </div>
    <div class="basic-detail">
      <el-card class="box-card">
        <span>
          <el-radio-group v-model="current" size="medium">
            <el-radio-button :label="1">基础信息</el-radio-button>
            <el-radio-button :label="2">重庆市水路运输主要指标电讯月报</el-radio-button>
            <el-radio-button :label="3">运力情况增减变动</el-radio-button>
            <el-radio-button :label="4">内河货运月报</el-radio-button>
            <el-radio-button :label="5">港口月报</el-radio-button>
          </el-radio-group>
        </span>
        <span style="float: right;">
          <el-button
            v-if="button_roles.update"
            size="small"
            type="success"
            :disabled="auditState === 2"
            @click="handleEdit"
          >
            <em class="el-icon-edit" /> 重新上报
          </el-button>
        </span>
      </el-card>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        size="medium"
        :disabled="type === 'detail'"
      >
        <el-card v-show="current===1" class="box-card">
          <div slot="header" class="clearfix">
            <span>基础信息</span>
          </div>
          <el-form-item label="单位名称:">
            <div class="input">{{ user_info.orgname }}</div>
          </el-form-item>
          <el-form-item
            label="单位负责人:"
            prop="monthly.principal"
          >
            <div class="input">{{ ruleForm.monthly.principal }}</div>
          </el-form-item>
          <el-form-item
            label="月报日期:"
            prop="monthly.timeInfo"
          >
            <div class="input">{{ ruleForm.monthly.timeInfo }}</div>
          </el-form-item>
          <el-form-item
            label="填报人:"
            prop="monthly.informant"
          >
            <div class="input">{{ ruleForm.monthly.informant }}</div>
          </el-form-item>
          <el-form-item
            label="联系电话:"
            prop="monthly.informantPhone"
          >
            <div class="input">{{ ruleForm.monthly.informantPhone }}</div>
          </el-form-item>
          <el-form-item
            label="填写日期:"
            prop="monthly.fillInTheDate"
          >
            <div class="input">{{ ruleForm.monthly.fillInTheDate }}</div>
          </el-form-item>
          <el-form-item
            label="备注"
            style="width: 100%;"
          >
            <div class="input">{{ ruleForm.monthly[['mainRemark', 'changeRemark', 'freightRemark', 'portRemark'][current - 1]] }}</div>
          </el-form-item>
          <el-form-item
            label="审批状态"
            style="width: 100%;"
          >
            <el-tag :type="auditState && ['', 'success', 'danger'][auditState - 1]">{{ auditState && ['未审核', '审核已通过', '审核已退回'][auditState - 1] }}</el-tag>
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
            :disabled="true"
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
            :disabled="true"
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
            :disabled="true"
          />
        </el-card>
        <el-card v-show="current===5" class="box-card">
          <div slot="header" class="clearfix">
            <span>内河货运月报</span>
          </div>
          <Month :table="table.portMonthlyReportDataList" :loading="loading" disabled />
        </el-card>
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
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { momentDate,getRouterButtonRole } from '@/utils/index'
import { getInfo, queryJSON } from '@/api/channel-services/month/water-report'
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
      type: '',
      current: 1,
      table: [],
      loading: false,
      auditState:'',
      button_roles:{},
      id:'',
      ruleForm: {
        monthly: { // 水运月报基础信息
          changeRemark: '',
          fillInTheDate: '',
          freightRemark: '',
          portRemark: '',
          id: null,
          informant: '',
          informantPhone: '',
          mainRemark: '',
          principal: '',
          timeInfo: ''
        },
        main: [] // 电讯月报
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
    ...mapGetters(['user_info'])
  },
  async created() {
    const { id, auditState } = this.$route.query
    this.id = id
    this.auditState = auditState ? Number(auditState) : ''
    this.ruleForm.monthly.fillInTheDate = new Date()
    this.button_roles = await getRouterButtonRole('/digital/month/report',true)
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
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    handleEdit(){
      this.$router.push({ path: '/digital/month/reportEdit', query: { type:'edit', id: this.id }})
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

    .input {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 15px;
        width: 100%;
        height: 40px;
        font-size: inherit;
        line-height: 40px;
        color: #606266;
        background-color: #ffffff;
        background-image: none;
        outline: 0;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        -webkit-appearance: none;
    }
}

/deep/ .el-table .pre-line {
    display: inline-block;
    padding-left: 20px;
}
</style>
