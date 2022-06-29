<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="气象信息详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />气象信息详情
      </div>
      <div style="background: #f9f9f9;">
        <div style="padding: 0 3% 0 3%; height: 60px; font-size: 16px; font-weight: 600; line-height: 60px;">
          <span
            style="font-size: 28px;"
          >{{ info.name }}</span>
          <span
            style="margin-left: 40px;"
          >{{ info.date }}</span>
          <span
            style="margin-left: 140px;"
          >日出:{{ info.sunrise }}</span>
          <span
            style="margin-left: 20px;"
          >日落:{{ info.sunset }}</span>
          <span
            style="margin-left: 20px;"
          >降水量:{{ info.precipitation }}</span>
        </div>
        <Charts :option="rankOpt" style="height: 400px;" />
      </div>
      <div class="icon-title">
        <span class="span" />小时气象信息
      </div>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="info.weatherHourlyListVoList"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column label="时间（h）">
          <template v-slot="scope">
            <span>{{ gmomentDate(scope.row.hourlyTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="温度（℃）">
          <template v-slot="scope">
            <span>{{ scope.row.temp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="天气状况">
          <template v-slot="scope">
            <span>{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="风向">
          <template v-slot="scope">
            <span>{{ scope.row.wind360 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="风力（级）">
          <template v-slot="scope">
            <span>{{ scope.row.windScale }}</span>
          </template>
        </el-table-column>
        <el-table-column label="风速（km/h）">
          <template v-slot="scope">
            <span>{{ scope.row.windSpeed }}</span>
          </template>
        </el-table-column>
        <el-table-column label="相对湿度（%）">
          <template v-slot="scope">
            <span>{{ scope.row.humidity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="降水量（mm）">
          <template v-slot="scope">
            <span>{{ scope.row.precipitation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大气压强（百帕）">
          <template v-slot="scope">
            <span>{{ scope.row.pressure }}</span>
          </template>
        </el-table-column>
      </el-table>
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
import { getInfo } from '@/api/meteorological/index'
import Charts from "@/components/Charts/index"
import { momentDate } from '@/utils/index'
export default {
  components: {
    Charts
  },
  data() {
    return {
      info: {},
      rankOpt: {},
      listLoading:false,
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async mounted() {
    const { id } = this.$route.query
    if (id) {
      this.info = (await getInfo(id)).data
      const xAxis = []
      const series= []
      this.info.weatherHourlyListVoList.forEach(item => {
        xAxis.push(momentDate(item.hourlyTime,'HH'))
        series.push(item.temp)
      })
      this.rankOpt = {
        title: {
          text: '',
          subtext: ''
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '当前气温',
            type: 'line',
            data: series,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    // 初始化天地图
    initMap() {
    },
    gmomentDate(hourlyTime){
      return momentDate(hourlyTime ,'HH')
    }
  }
}
</script>
