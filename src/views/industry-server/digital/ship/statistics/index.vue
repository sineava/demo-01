<template>
  <el-card class="body-card" style="min-height: 90vh;">
    <div
      slot="header"
      class="clearfix"
    >
      <span>过闸船舶分类统计</span>
      <div class="btn-wrapper" style="display: inline-block; margin-left: 10px;">
        <el-button :type="current === 'ship' ? 'primary' : ''" size="small" @click="current = 'ship'">过闸船舶分类统计</el-button>
        <el-button :type="current === 'goods' ? 'primary' : ''" size="small" @click="current = 'goods'">过闸船舶货物分类统计</el-button>
        <el-button :type="current === 'tonnage' ? 'primary' : ''" size="small" @click="current = 'tonnage'">船舶核载吨位统计</el-button>
        <el-button :type="current === 'updown' ? 'primary' : ''" size="small" @click="current = 'updown'">上下行统计</el-button>
        <el-button :type="current === 'up' ? 'primary' : ''" size="small" @click="current = 'up'">上行明细</el-button>
        <el-button :type="current === 'down' ? 'primary' : ''" size="small" @click="current = 'down'">下行明细</el-button>
      </div>
    </div>
    <component
      :is="current"
      :dams="dams"
    />
  </el-card>
</template>

<script>
import { selectLike } from '@/api/channel-services/ship/dam'
import Ship from './components/Ship'
import Goods from './components/Goods'
import Tonnage from './components/Tonnage'
import UpDown from './components/UpDown'
import Down from './components/Down'
import Up from './components/Up'
export default {
  components: {
    ship: Ship,
    goods: Goods,
    tonnage: Tonnage,
    updown: UpDown,
    down: Down,
    up: Up
  },
  data() {
    return {
      dams: [],
      current: 'ship'
    }
  },
  created() {
    this.fetchDams()
  },
  methods: {
    // 查询大坝信息
    async fetchDams(name = '') {
      selectLike({ name }).then(res => {
        this.dams = res.data ? res.data.map(x => ({ id: x.id, name: x.name })) : []
      })
    }
  }
}
</script>
