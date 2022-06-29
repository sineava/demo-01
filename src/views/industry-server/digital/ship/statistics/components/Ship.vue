<template>
  <div>
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="medium"
    >
      <el-form-item
        label="枢纽大坝:"
        prop="damId"
      >
        <el-select
          v-model="searchForm.damId"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dams"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间:">
        <el-date-picker
          v-model="screenTime"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="submitForm('searchForm')"
        >
          查询
        </el-button>
        <el-button
          size="small"
          icon="el-icon-refresh-left"
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="show">
      <Charts
        v-if="show"
        :option="option"
      />
      <el-table
        v-if="show || loading"
        v-loading="loading"
        :data="table"
        stripe
        style="width: 100%;"
        :header-cell-style="{ backgroundColor: '#F2F2F2' }"
      >
        <el-table-column
          v-for="item in headers"
          :key="item.id"
          :prop="`${item.id}`"
          :label="item.name"
        />
      </el-table>
    </div>
    <div v-else style="width: 100%;">
      <el-card style="margin: 0 10px; width: 100%;">
        <el-empty description="暂无统计信息" />
      </el-card>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Charts/index'
import { momentDate } from '@/utils/index'
import { queryStatisticalList } from '@/api/channel-services/ship/ship-type-statistical'
import { selectLikeShipCategory } from '@/api/channel-services/ship/ship-type'
export default {
  components: {
    Charts
  },
  props: {
    dams: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchForm: {
        damId: ''
      },
      screenTime: [],
      headers: [], // 表头信息
      table: [],
      loading: false,
      option: {},
      show: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询数据
    async fetchData(name = '') {
      this.loading = true
      const res = await selectLikeShipCategory({ name })
      if (res.code === '0') {
        const arr = [...res.data].map(x => ({ id: x.id, name: x.name }))
        arr.unshift({ id: 'localDate', name: '统计日期' })
        this.headers = arr
        const [screenStartTime, screenEndTime] = this.screenTime || []
        const otherRes = await queryStatisticalList({
          ...this.searchForm,
          screenStartTime: momentDate(screenStartTime, 'YYYY-MM-DD'),
          screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD')
        })
        if (otherRes.code === '0') {
          const data = otherRes.data ? otherRes.data : []
          this.table = this.handleData(data)
          this.handleCharts()
          this.loading = false
          this.show = true
        }
      }
    },
    // 处理表格所需数据
    handleData(data) {
      const arr = []
      data.forEach(x => {
        const item = arr.find(y => y.localDate === x.localDate)
        if (item) { // 存在数据,则在该数据上添加属性
          item[x.typeId] = x.number
        } else {
          arr.push({
            localDate: x.localDate,
            [x.typeId]: x.number
          })
        }
      })
      return arr
    },
    // 处理图表所需数据
    handleCharts() {
      const headers = this.headers.slice(1) // 去除头部unshift进去的日期
      const xAxisData = this.table.map(x => x.localDate)
      const legendData = headers.map(x => x.name)
      const series = []
      headers.forEach(x => {
        const data = []
        this.table.forEach(y => {
          data.push(y[x.id])
        })
        series.push({
          name: x.name,
          type: 'line',
          data
        })
      })
      this.option = {
        title: { text: '过闸船舶分类统计' },
        tooltip: { trigger: 'axis' },
        legend: { data: legendData },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: { type: 'value' },
        series
      }
    },
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fetchData()
        } else {
          return false
        }
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.headers = []
      this.table = []
      this.loading = false
      this.fetchData()
    }
  }
}
</script>
