<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>节假日客运统计</span>
      <span style="float: right;">
        <el-button
          type="primary"
          size="small"
          :plain="current !== 'qb'"
          @click="current = 'qb'"
        >
          全部
        </el-button>
        <el-button
          type="primary"
          size="small"
          :plain="current !== 'long'"
          @click="current = 'long'"
        >
          长途统计
        </el-button>
        <el-button
          type="primary"
          size="small"
          :plain="current !== 'short'"
          @click="current = 'short'"
        >
          短途统计
        </el-button>
        <el-button
          type="primary"
          size="small"
          :plain="current !== 'all'"
          @click="current = 'all'"
        >
          同比统计
        </el-button>
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        size="medium"
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="选择统计时间">
          <el-date-picker
            v-model="ruleForm.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="部门选择">
          <el-select
            v-model="ruleForm.orgCode"
            filterable
            clearable
            placeholder="请选择"
            style="width: 300px;"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in orgs"
              :key="item.orgCode"
              :label="item.orgName"
              :value="item.orgCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            :disabled="ruleForm.date&&ruleForm.date.length > 0 ? false : true"
            type="primary"
            size="small"
            style="margin-left: 20px;"
            @click="fetchTableList"
          >
            查询
          </el-button>
          <el-button
            v-if="button_roles.export"
            type="primary"
            size="small"
            style="margin-left: 20px;"
            @click="exportExcel"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-empty v-if="!isdefault" description="请选择查询条件" />
    <ShipAnalysis
      v-if="!loading"
      id="shipAnalysis"
      :table="tableData"
      :options="current === 'qb' ? qbOptions : current === 'long' ? longOptions : current === 'short' ? shortOptions : allOptions"
    />
  </el-card>
</template>

<script>
import htmlToExcel from '@/utils/htmlToExcel'
import { getList, getCompareList,getAllList } from '@/api/channel-services/period/statistical'
import { queryInfo } from '@/api/channel-services/period/report'
import ShipAnalysis from './components/ShipAnalysis'
import { mapGetters } from 'vuex'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
export default {
  components: {
    ShipAnalysis
  },
  data() {
    return {
      ruleForm: {
        date: ''
      },
      year: 0,
      loading: true,
      current: 'qb', // qb,long,short,all
      tableData: [],
      qbOptions:[
        { id: 1, value: 'departmentName', label: '区县名称', children: [], minWidth: 210 },
        { id: 2, value: 'importantTime', label: '上报日期', children: [], minWidth: 140 },
        { id: 3, value: 'time', label: '统计日期', children: [], minWidth: 140 },
        // { id: 4, value: 'total', label: '长途小计', children: [], minWidth: 140 }, // 自己计算
        {
          id: 5,
          value: '',
          label: '出口客船（艘次）',
          children: [
            { id: 6, value: 'shortExitShipNumber', label: '短途当日发送', minWidth: 130, children: [] },
            { id: 7, value: 'shortExitAccurateLoad', label: '短途客位数', minWidth: 130, children: [] },
            { id: 8, value: 'longExitShipNumber', label: '长途当日发送', minWidth: 130, children: [] },
            { id: 9, value: 'longExitAccurateLoad', label: '长途客位数', minWidth: 130, children: [] }
          ]
        },
        {
          id: 10,
          value: '',
          label: '出口旅客（人次）',
          children: [
            { id: 11, value: 'shortExitGuestNumber', label: '短途当日发送', minWidth: 130, children: [] },
            { id: 12, value: 'longExitGuestNumber', label: '长途当日发送', minWidth: 130, children: [] },
          ]
        },
        {
          id: 13,
          value: '',
          label: '进口客船（艘次）',
          children: [
            { id: 14, value: 'shortImportShipNumber', label: '短途当日抵达', minWidth: 130, children: [] },
            { id: 15, value: 'shortImportAccurateLoad', label: '短途客位数', minWidth: 130, children: [] },
            { id: 16, value: 'longImportShipNumber', label: '长途当日抵达', minWidth: 130, children: [] },
            { id: 17, value: 'shortExitAccurateLoad', label: '长途客位数', minWidth: 130, children: [] }
          ]
        },
        {
          id: 18,
          value: '',
          label: '进口旅客（人次）',
          children: [
            { id: 19,value: 'shortImportGuestNumber', label: '短途当日抵达', minWidth: 130, children: [] },
            { id: 20,value: 'longImportShipNumber', label: '长途当日抵达', minWidth: 130, children: [] },
          ]
        },
        { id: 21, value: 'importantStatus', label: '长途上报状态', children: [] },
      ],
      longOptions: [ // 长途统计表头自定义
        { id: 1, value: 'departmentName', label: '区县名称', children: [], minWidth: 210 },
        { id: 2, value: 'importantTime', label: '上报日期', children: [], minWidth: 140 },
        { id: 3, value: 'time', label: '统计日期', children: [], minWidth: 140 },
        // { id: 4, value: 'total', label: '长途小计', children: [], minWidth: 140 }, // 自己计算
        {
          id: 5,
          value: '',
          label: '出口客船（艘次）',
          children: [
            { id: 6, value: 'exitShipNumber', label: '长途当日发送', children: [] },
            { id: 7, value: 'exitAccurateLoad', label: '当日发送客位数', children: [] }
          ]
        },
        {
          id: 8,
          value: '',
          label: '出口旅客（人次）',
          children: [
            { id: 9, value: 'exitGuestNumber', label: '长途当日发送', children: [] }
          ]
        },
        {
          id: 10,
          value: '',
          label: '进口客船（艘次）',
          children: [
            { id: 11, value: 'importShipNumber', label: '长途当日抵达', children: [] },
            { id: 12, value: 'importAccurateLoad', label: '当日抵达客位数', children: [] }
          ]
        },
        {
          id: 13,
          value: '',
          label: '进口旅客（人次）',
          children: [
            { value: 'importGuestNumber', label: '长途当日抵达', children: [] }
          ]
        },
        { id: 14, value: 'importantStatus', label: '上报状态', children: [] }
      ],
      shortOptions: [ // 短途统计表头自定义
        { id: 1, value: 'departmentName', label: '区县名称', children: [], minWidth: 200 },
        { id: 2, value: 'importantTime', label: '上报日期', children: [] },
        { id: 3, value: 'time', label: '统计日期', children: [] },
        { id: 4, value: 'total', label: '短途小计', children: [] }, // 自己计算
        {
          id: 5,
          value: '',
          label: '出口客船（艘次）',
          children: [
            { id: 6, value: 'exitShipNumber', label: '短途当日发送', children: [] },
            { id: 7, value: 'exitAccurateLoad', label: '当日发送客位数', children: [] }
          ]
        },
        {
          id: 8,
          value: '',
          label: '出口旅客（人次）',
          children: [
            { id: 9, value: 'exitGuestNumber', label: '短途当日发送', children: [] }
          ]
        },
        {
          id: 10,
          value: '',
          label: '进口客船（艘次）',
          children: [
            { id: 11, value: 'importShipNumber', label: '短途当日抵达', children: [] },
            { id: 12, value: 'importAccurateLoad', label: '当日抵达客位数', children: [] }
          ]
        },
        {
          id: 13,
          value: '',
          label: '进口旅客（人次）',
          children: [
            { value: 'importGuestNumber', label: '短途当日抵达', children: [] }
          ]
        },
        { id: 14, value: 'importantStatus', label: '上报状态' }
      ],
      options: [],
      allOptions: [],
      orgs: [],
      isdefault:0,
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  watch: {
    current() {
      if (this.ruleForm.date) this.fetchTableList()
    }
  },
  mounted() {
    this.fetchOrgs()
  },
  methods: {
    async fetchOrgs() {
      // *type:2 -> 区县机构
      getOrgList({ type: 2 }).then(res => {
        this.orgs = res.data ? res.data.map(x => ({ orgCode: Number(x.org_CODE), orgName: x.org_NAME })) : []
      })
    },
    // 导出
    exportExcel() {
      if (this.loading) {
        this.$message.warning('请选择统计时间')
        return
      }
      htmlToExcel.getExcel('#shipAnalysis', '节假日上报统计')
    },
    // 数据查询
    async fetchTableList() {
      if (!this.ruleForm.date) {
        this.tableData = []
        this.loading = true
        return
      }
      this.isdefault = 1
      const [screenStartTime = '', screenEndTime = ''] = this.ruleForm.date
      this.year = new Date(screenStartTime).getFullYear()
      const queryInfo = {
        screenStartTime,
        screenEndTime,
        departmentId: this.ruleForm.orgCode ? this.ruleForm.orgCode.join(',') : ''
      }
      const current = this.current
      if (['long', 'short','qb'].includes(current)) {
        queryInfo.type = current === 'qb' ? '' :(current === 'short' ? 1 : 2)
      }
      if (current === 'all') {
        this.allOptions = [ // 长短途同比表自定义表头(必须放这儿,不然年份(this.year)会出问题)
          { id: 1, value: 'departmentName', label: '区县名称', children: [], minWidth: 220,fixed:'left'},
          { id: 2, value: 'importantTime', label: '上报日期', children: [], minWidth: 160 },
          { id: 3, value: 'time', label: '统计日期', children: [], minWidth: 140 },
          // { id: 4, value: 'theTotal', label: '长短途小计', children: [], minWidth: 140 },
          {
            id: 5,
            value: '',
            label: '出口客船（艘次）',
            children: [
              {
                id: 6,
                value: '',
                label: '短途当日发出',
                children: [
                  { id: 7, value: 'lastExitShipNumber', label: `${this.year - 1}` },
                  { id: 8, value: 'theExitShipNumber', label: `${this.year}` },
                  { id: 9, value: 'percent1', label: '同比' }
                ]
              },
              {
                id: 10,
                value: '',
                label: '短途客位数',
                children: [
                  { id: 11, value: 'lastExitAccurateLoad', label: `${this.year - 1}` },
                  { id: 12, value: 'theExitAccurateLoad', label: `${this.year}` },
                  { id: 13, value: 'percent2', label: '同比' }
                ]
              },
              {
                id: 14,
                value: '',
                label: '长途当日发出',
                children: [
                  { id: 15, value: 'lastExitShipNumberB', label: `${this.year - 1}` },
                  { id: 16, value: 'theExitShipNumberB', label: `${this.year}` },
                  { id: 17, value: 'percent3', label: '同比' }
                ]
              },
              {
                id: 18,
                value: '',
                label: '长途客位数',
                children: [
                  { id: 19, value: 'lastExitAccurateLoadB', label: `${this.year - 1}` },
                  { id: 20, value: 'theExitAccurateLoadB', label: `${this.year}` },
                  { id: 21, value: 'percent4', label: '同比' }
                ]
              }
            ]
          },
          {
            id: 22,
            value: '',
            label: '出口旅客（人次）',
            children: [
              {
                id: 23,
                value: '',
                label: '短途当日发送',
                children: [
                  { id: 24, value: 'lastExitGuestNumber', label: `${this.year - 1}` },
                  { id: 25, value: 'theExitGuestNumber', label: `${this.year}` },
                  { id: 26, value: 'percent5', label: '同比' }
                ]
              },
              {
                id: 27,
                value: '',
                label: '长途当日发送',
                children: [
                  { id: 28, value: 'lastExitGuestNumberB', label: `${this.year - 1}` },
                  { id: 29, value: 'theExitGuestNumberB', label: `${this.year}` },
                  { id: 30, value: 'percent6', label: '同比' }
                ]
              }
            ]
          },
          {
            id: 31,
            value: '',
            label: '进口客船（艘次）',
            children: [
              {
                id: 32,
                value: '',
                label: '短途当日抵达',
                children: [
                  { id: 33, value: 'lastImportShipNumber', label: `${this.year - 1}` },
                  { id: 34, value: 'theImportShipNumber', label: `${this.year}` },
                  { id: 35, value: 'percent7', label: '同比' }
                ]
              },
              {
                id: 36,
                value: '',
                label: '短途客位数',
                children: [
                  { id: 37, value: 'lastImportAccurateLoad', label: `${this.year - 1}` },
                  { id: 38, value: 'theImportAccurateLoad', label: `${this.year}` },
                  { id: 39, value: 'percent8', label: '同比' }
                ]
              },
              {
                id: 40,
                value: '',
                label: '长途当日抵达',
                children: [
                  { id: 41, value: 'lastImportShipNumberB', label: `${this.year - 1}` },
                  { id: 42, value: 'theImportShipNumberB', label: `${this.year}` },
                  { id: 43, value: 'percent9', label: '同比' }
                ]
              },
              {
                id: 44,
                value: '',
                label: '长途客位数',
                children: [
                  { id: 45, value: 'lastImportAccurateLoadB', label: `${this.year - 1}` },
                  { id: 46, value: 'theImportAccurateLoadB', label: `${this.year}` },
                  { id: 47, value: 'percent10', label: '同比' }
                ]
              }
            ]
          },
          {
            id: 45,
            value: '',
            label: '进口旅客（人次）',
            children: [
              {
                id: 46,
                value: '',
                label: '短途当日发送',
                children: [
                  { id: 47, value: 'lastImportGuestNumber', label: `${this.year - 1}` },
                  { id: 48, value: 'theImportGuestNumber', label: `${this.year}` },
                  { id: 49, value: 'percent11', label: '同比' }
                ]
              },
              {
                id: 50,
                value: '',
                label: '长途当日发送',
                children: [
                  { id: 51, value: 'lastImportGuestNumberB', label: `${this.year - 1}` },
                  { id: 52, value: 'theImportGuestNumberB', label: `${this.year}` },
                  { id: 53, value: 'percent12', label: '同比' }
                ]
              }
            ]
          },
          { id: 54, value: 'importantStatus', label: '上报状态' }
        ]
      }
      this.loading = true
      const status = ['未上报', '正常上报', '延期未上报', '延期上报']
      const res = current === 'qb' ? await getAllList(queryInfo) : current === 'all' ? await getCompareList(queryInfo) : await getList(queryInfo)
      if (current === 'all') {
        this.tableData = res.data ? res.data.map(x => ({ ...x, importantStatus: status[x.importantStatus - 1] })).map(x => ({
          ...x,
          // 同比计算
          percent1: x.theExitShipNumber && x.lastExitShipNumber && `${parseFloat((x.theExitShipNumber - x.lastExitShipNumber / x.theExitShipNumber).toFixed(2))}%`,
          percent2: x.theExitAccurateLoad && x.lastExitAccurateLoad && `${parseFloat((x.theExitAccurateLoad - x.lastExitAccurateLoad / x.theExitAccurateLoad).toFixed(2))}%`,
          percent3: x.theExitShipNumberB && x.lastExitShipNumberB && `${parseFloat((x.theExitShipNumberB - x.lastExitShipNumberB / x.theExitShipNumberB).toFixed(2))}%`,
          percent4: x.theExitAccurateLoadB && x.lastExitAccurateLoadB && `${parseFloat((x.theExitAccurateLoadB - x.lastExitAccurateLoadB / x.theExitAccurateLoadB).toFixed(2))}%`,
          percent5: x.theExitGuestNumber && x.lastExitGuestNumber && `${parseFloat((x.theExitGuestNumber - x.lastExitGuestNumber / x.theExitGuestNumber).toFixed(2))}%`,
          percent6: x.theExitGuestNumberB && x.lastExitGuestNumberB && `${parseFloat((x.theExitGuestNumberB - x.lastExitGuestNumberB / x.theExitGuestNumberB).toFixed(2))}%`,
          percent7: x.theImportShipNumber && x.lastImportShipNumber && `${parseFloat((x.theImportShipNumber - x.lastImportShipNumber / x.theImportShipNumber).toFixed(2))}%`,
          percent8: x.theImportAccurateLoad && x.lastImportAccurateLoad && `${parseFloat((x.theImportAccurateLoad - x.lastImportAccurateLoad / x.theImportAccurateLoad).toFixed(2))}%`,
          percent9: x.theImportShipNumberB && x.lastImportShipNumberB && `${parseFloat((x.theImportShipNumberB - x.lastImportShipNumberB / x.theImportShipNumberB).toFixed(2))}%`,
          percent10: x.theImportAccurateLoadB && x.lastImportAccurateLoadB && `${parseFloat((x.theImportAccurateLoadB - x.lastImportAccurateLoadB / x.theImportAccurateLoadB).toFixed(2))}%`,
          percent11: x.theImportGuestNumber && x.lastImportGuestNumber && `${parseFloat((x.theImportGuestNumber - x.lastImportGuestNumber / x.theImportGuestNumber).toFixed(2))}%`,
          percent12: x.theImportGuestNumberB && x.lastImportGuestNumberB && `${parseFloat((x.theImportGuestNumberB - x.lastImportGuestNumberB / x.theImportGuestNumberB).toFixed(2))}%`
        })) : []
      } else {
        this.tableData = res.data ? res.data.map(x => ({ ...x, importantStatus: status[x.importantStatus - 1] })) : []
      }
      this.loading = false
    },
    async fetchDetail() {
      queryInfo({ id: this.ruleForm.periodId }).then(res => {
        this.detailForm = { ...res.data }
        this.$refs.shiptable.setTableData(res.data)
      })
    },
    returnBack() {
      this.$router.push({ path: '/digital/transport/statistics' })
    }
  }
}
</script>
