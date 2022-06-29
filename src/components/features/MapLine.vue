<template>
  <el-form
    ref="mapForm"
    :model="mapForm"
    label-width="140px"
    size="medium"
    class="table-column three"
  >
    <el-form-item
      label-width="0"
      style="width: 100%;"
    >
      <Tianditu
        ref="Tianditu"
        zoom-position="BOTTOM_LEFT"
        :zomm="15"
        :height="600"
        @success="handleLoadingSuccess"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import Tianditu from '@/components/Tianditu'
export default {
  components: {
    Tianditu
  },
  props: {
    points: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      mapForm: {}
    }
  },
  methods: {
    // 地图加载完成
    handleLoadingSuccess() {
      this.command()
    },
    command() {
      let polygonToolObj = null // 创建多边形画图工具对象
      this.$refs.Tianditu.openPolygonTool(polygonToolObj, (e) => {
        let polygonObj = null // 创建多边形覆盖物对象
        this.$emit('update', e.currentLnglats)
        this.$refs.Tianditu.mapDrawPolygon(polygonObj, e.currentLnglats, (polygon) => {
          this.$emit('update', polygon.currentLnglats)
        })
      }, this.disabled)
    },
    drawMap(points) {
      points = points.map(({ longitude, latitude }) => ({ lng: longitude, lat: latitude }))
      this.$refs.Tianditu.mapDrawPolygon({}, points, () => {})
    }
  }
}
</script>
