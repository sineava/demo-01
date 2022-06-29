<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输月报汇总</span>
      <el-radio-group
        v-model="current"
        size="medium"
        style="margin-left: 10px;"
      >
        <el-radio-button :label="2">
          水路运输主要指标电讯月报
        </el-radio-button>
        <el-radio-button :label="3">
          运力情况增减变动月报表
        </el-radio-button>
        <el-radio-button :label="1">
          内河货运月报
        </el-radio-button>
        <el-radio-button :label="4">
          港口月报
        </el-radio-button>
      </el-radio-group>
      <span style="float: right;">
        <el-button
          type="success"
          icon="el-icon-folder-opened"
          size="small"
          @click="download"
        >导出</el-button>
      </span>
    </div>
    <div class="app-container">
      <div>
        <div class="wrapper wrapper-date">
          <el-card>
            <div class="bg">
              月报时间
            </div>
            <el-form
              ref="searchForm"
              :model="searchForm"
              size="medium"
            >
              <el-form-item
                label-width="0"
                prop="time"
              >
                <el-date-picker
                  v-model="searchForm.time"
                  type="month"
                  style="position: relative; margin-top: 40px; margin-right: 15px;"
                  placeholder="请选择月报时间"
                  @change="fetchTable"
                />
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div
          v-if="user_info.orgcategory==='1'"
          v-loading="orgLoading"
          class="wrapper wrapper-data"
        >
          <el-card>
            <div
              class="bg"
              style="z-index: 1;"
            >
              月报数据
            </div>
            <ul
              v-if="orgs.length"
              class="top-wrapper"
            >
              <li
                :class="{ active: active === 'center' }"
                @click="selected('center','中心汇总数据')"
              >
                中心汇总数据
              </li>
              <!-- <li
                :class="{ active: active === 'district' }"
                @click="selected('district','区县上报数据')"
              > -->
              <!-- <li
                :class="{ active: active === 'district' }"
              >
                区县上报数据
              </li> -->
            </ul>
            <ul class="org-wrapper">
              <li
                v-for="(item, index) in orgs"
                :key="index"
                :class="{ active: active === item.orgCode }"
                :title="item.orgName"
                @click="selected(item.orgCode,item.orgName)"
              >
                {{ item.orgName }}
              </li>
            </ul>
          </el-card>
        </div>
      </div>
      <div v-if="show" class="container">
        <Despatch
          v-if="current === 2 && show"
          ref="summaryTable"
          :table="despatch"
          :loading="loading"
          disabled
        />
        <CapacityTable
          v-if="current === 3 && show && ['center','district'].includes(active)"
          ref="summaryTable"
          :table="capacitySummary"
          :loading="loading"
          :date="searchForm.time"
          disabled
        />
        <CapacitySummary
          v-if="current === 3 && show && !['center','district'].includes(active)"
          ref="summaryTable"
          :table="capacitySummary"
          :loading="loading"
          :date="searchForm.time"
          disabled
        />
        <Inland
          v-if="current === 1 && show"
          ref="summaryTable"
          :table="inland"
          :loading="loading"
          style="margin-bottom: 20px;"
        />
        <Transport
          v-if="current === 1 && show"
          ref="summaryTable"
          :table="transport"
          :loading="loading"
          disabled
        />
        <Month
          v-if="current === 4 && show"
          ref="summaryTable"
          :table="port"
          :loading="loading"
          disabled
        />
      </div>
      <div v-else style="width: 100%;">
        <el-card style="margin: 0 10px; width: 100%;">
          <el-empty :description="user_info.orgcategory==='1' ? '请选择月报查询时间与查询机构' : '请选择月报查询时间'" />
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script>
import { querySummary, querySummaryChange } from '@/api/channel-services/month/water-report'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
import { momentDate } from '@/utils/index'
import Despatch from '../components/Despatch'
import Inland from '../components/Inland'
import Transport from '../components/Transport'
import CapacitySummary from '../components/CapacitySummary'
import { mapGetters } from 'vuex'
import CapacityTable from '../components/CapacityTable'
import Month from '../components/Month'
export default {
  components: {
    Despatch,
    Inland,
    Transport,
    CapacitySummary,
    CapacityTable,
    Month
  },
  data() {
    return {
      active: '',
      current: 2,
      orgs: [],
      loading: false,
      orgLoading: true,
      searchForm: {
        time: ''
      },
      despatch: [],
      inland: [],
      transport: [],
      port: [],
      capacitySummary: [],
      enterpriseName:''
    }
  },

  computed: {
    ...mapGetters([
      'user_info'
    ]),
    show() {
      return (this.active && this.searchForm.time) ? true : false
    }
  },
  watch: {
    current() {
      this.searchForm.time = ''
      if (this.user_info.orgcategory==='1'){
        this.active = ''
      }
    }
  },
  created() {
    if (this.user_info.orgcategory==='1'){
      this.fetchOrgs()
    } else {
      this.active = this.user_info.orgid
    }
  },
  methods: {
    async fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getOrgList({ type: 2 }).then(res => {
        this.orgs = res.data ? res.data.map(x => ({ orgCode: Number(x.org_CODE), orgName: x.org_NAME })) : []
        this.orgLoading = false
      })
    },
    selected(val = '',enterpriseName='') {
      if (this.active === val) { // 双击取消
        val = ''
      }
      this.enterpriseName = enterpriseName
      this.active = val
      if (!this.active) return
      this.fetchTable()
    },
    // 查询表格数据
    async fetchTable() {
      const month = momentDate(this.searchForm.time, 'YYYY-MM')
      if (!month) {
        // this.$message.warning('请选择月报时间')
        return
      }
      if (!this.active) {
        // this.$message.warning('请选择机构')
        return
      }
      this.loading = true
      if (month && this.current) {
        if (this.active === 'center') { // 中心机构
          if (this.current === 3) { // 运力月报
            this.fetchCapacity({
              time: month,
              enterpriseId: 0 // 中心传0,区县不传该字段
            })
          } else { // 电讯/内河
            this.fetchSummary({
              time: month,
              type: this.current
            })
          }
        } else if (this.active === 'district') { // 区县汇总
          if (this.current === 3) { // 运力月报
            this.fetchCapacity({
              time: month
            })
          } else { // 电讯/内河
            this.fetchSummary({
              time: month,
              type: this.current
            })
          }
        } else {
          if (this.current === 3) { // 运力月报
            this.fetchCapacity({
              time: month,
              enterpriseId: this.active
            })
          } else { // 电讯/内河
            this.fetchSummary({
              time: month,
              type: this.current,
              enterpriseId: this.active
            })
          }
        }
      }
    },
    // 查询运力汇总数据
    async fetchCapacity(queryInfo) {
      querySummaryChange(queryInfo).then(res => {
        this.capacitySummary = res.data || []
        this.loading = false
      })
    },
    // 查询汇总数据
    async fetchSummary(queryInfo) {
      querySummary(queryInfo).then(res => {
        this.loading = false
        if (this.current === 1) { // 内河货运月报
          this.inland = res.data ? res.data.inlandDataVo.dataOneVos : []
          this.transport = res.data ? res.data.inlandDataVo.dataTwoVos : []
        }
        if (this.current === 2) { // 电讯月报
          this.despatch = res.data ? res.data.mainIndicatorsDataVoList : []
        }
        if (this.current === 4) { // 港口月报
          this.port = res?.data?.portInfoVos || []
        }
      })
    },
    async download(){
      this.$refs.summaryTable.exportExcel()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
    display: flex;
    padding: 0;

    .wrapper-data {
        overflow-y: auto;
        height: 490px;
    }

    .wrapper {
        margin-bottom: 20px;
        width: 100%;

        .el-card {
            position: relative;
            margin-right: 20px;
            box-shadow: none;

            .bg {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                padding-left: 10px;
                width: 100%;
                height: 40px;
                background-color: #f2f2f2;
                justify-content: left;
                align-items: center;
            }
        }
    }

    .container {
        flex-grow: 1;
        overflow-x: auto;
    }
}

.top-wrapper {
    list-style: none;
    position: relative;
    top: 20px;
    padding-left: 0;
    cursor: pointer;

    li {
        overflow: hidden;
        padding: 0 10px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.active {
            color: #ffffff;
            background-color: #409eff;
        }
    }
}

.org-wrapper {
    list-style: none;
    position: relative;
    top: 10px;
    padding-left: 10px;
    cursor: pointer;

    li {
        overflow: hidden;
        padding: 0 10px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.active {
            color: #ffffff;
            background-color: #409eff;
        }
    }
}

/deep/ .wrapper .el-card__body {
    overflow-y: auto;
    padding-right: 0;
    height: auto;
}
</style>
