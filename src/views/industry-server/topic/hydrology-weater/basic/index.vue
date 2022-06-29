<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix" style="display: flex;">
      <span>水文气象数据</span>
      <div class="btns" style="margin-left: 20px;">
        <el-button :type="current === 1 ? 'primary' : 'plain'" @click="active(1)">
          通航水域
        </el-button>
        <el-button :type="current === 2 ? 'primary' : 'plain'" @click="active(2)">
          航道枢纽
        </el-button>
        <el-button :type="current === 3 ? 'primary' : 'plain'" @click="active(3)">
          主洪峰预报
        </el-button>
        <el-button :type="current === 4 ? 'primary' : 'plain'" @click="active(4)">
          气象信息
        </el-button>
      </div>
    </div>
    <div class="container">
      <component :is="currentComp" />
    </div>
  </el-card>
</template>

<script>
import AvionicsHub from './components/avionics-hub'
import Forecast from './components/forecast'
import Meteorology from './components/meteorology'
import NavigableWaters from './components/navigable-waters'
export default {
  components: {
    AvionicsHub,
    Forecast,
    Meteorology,
    NavigableWaters
  },
  data () {
    return {
      current: 1,
      currentComp: 'NavigableWaters'
    }
  },
  methods: {
    active(num) {
      this.current = num
      this.currentComp = ['NavigableWaters','AvionicsHub','Forecast','Meteorology'][num - 1]
    }
  }
}
</script>
