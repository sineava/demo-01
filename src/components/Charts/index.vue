<template>
  <v-chart
    :class="['chart', Object.keys(option).length ? 'show' : 'hidden']"
    :option="option"
    autoresize
  />
</template>

<script>
import { use, registerMap, } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts'
// 引入legend
import 'echarts/lib/component/legend'
// 引入dataZoom
import 'echarts/lib/component/dataZoom'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  VisualMapComponent
])

export default {
  components: {
    VChart
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    autoresize: { // 默认自适应宽度
      type: Boolean,
      default: () => true
    },
    loading: { // 默认loading
      type: Boolean,
      default: () => true
    },
    map: { // 地图
      type: Object,
      require: true
    }
  },
  mounted() {
    if (this.map) {
      registerMap('Chongqing', this.map)
    }
  },
}
</script>

<style lang="scss" scoped>
.chart {
    height: 400px;
}

.show {
    opacity: 1;
}

.hidden {
    opacity: 0;
}
</style>
