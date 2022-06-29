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
        :key="item.value"
        :prop="`${item.value}`"
        :label="item.label"
      />
    </el-table>
  </div>
</template>

<script>
import Charts from '@/components/Charts/index'
import { momentDate } from '@/utils/index'
import { queryUpDownList } from '@/api/channel-services/ship/ship-type-statistical'
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
        timeType: 2,
        damId: '',
        screenStartTime: '',
        screenEndTime: ''
      },
      screenTime: [],
      headers: [],
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
    async fetchData() {
      this.loading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const res = await queryUpDownList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime, 'YYYY-MM'),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM')
      })
      this.loading = false
      this.headers = [
        { value: 'time', label: '时间' },
        { value: 'upNumber', label: '上行船舶总数量' },
        { value: 'downNumber', label: '下行船舶总数量' },
        { value: 'upNuclearLoadTons', label: '上行核载总吨位' },
        { value: 'upRealLoadTons', label: '上行实载总吨位' },
        { value: 'downNuclearLoadTons', label: '下行核载总吨位' },
        { value: 'downRealLoadTons', label: '下行实载总吨位' }
      ]
      if (res.code === '0') {
        this.table = res.data
        this.handleCharts()
        this.show = true
      }
    },
    // 处理图表所需数据
    handleCharts() {
      const headers = this.headers.slice(1)
      const xAxisData = this.table.map(x => x.time)
      const legendData = headers.map(x => x.label)
      const series = []
      headers.forEach(x => {
        const data = []
        this.table.forEach(y => {
          data.push(y[x.value])
        })
        series.push({
          name: x.label,
          type: 'line',
          data
        })
      })
      this.option = {
        title: { text: '上下行统计' },
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
      this.show = false
      this.fetchData()
    }
  }
}
</script>
