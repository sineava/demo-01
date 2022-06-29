<template>
  <div :id="name || 'mapType'">
    <span class="mapChange" @click="showMapType">
      <el-image
        :src="require('@/icons/map.png')"
      />
    </span>
    <div v-show="isShowMapType" class="mapType">
      <div :class="`block${type==='TMAP_TERRAIN_MAP' || type==='TMAP_TERRAIN_HYBRID_MAP' ? ' action': ''}`" @click="typeClick('TMAP_TERRAIN_MAP')">
        <div>
          <span class="checkbox"><el-checkbox v-model="TMAP_TERRAIN_MAP_CHECKED" @change="terrainMap">地名</el-checkbox></span>
          <span class="name">地形</span>
          <el-image
            :src="require('@/icons/TMAP_TERRAIN_MAP.png')"
          />
        </div>
      </div>
      <div :class="`block${type==='TMAP_SATELLITE_MAP' || type==='TMAP_HYBRID_MAP' ? ' action': ''}`" @click="typeClick('TMAP_SATELLITE_MAP')">
        <div>
          <span class="checkbox"><el-checkbox v-model="TMAP_SATELLITE_MAP_CHECKED" @change="satelliteMap">地名</el-checkbox></span>
          <span class="name">卫星</span>
          <el-image
            :src="require('@/icons/TMAP_SATELLITE_MAP.png')"
          />
        </div>
      </div>
      <div :class="`block${type==='TMAP_NORMAL_MAP' ? ' action': ''}`" @click="typeClick('TMAP_NORMAL_MAP')">
        <div>
          <span class="checkbox"><el-checkbox v-model="TMAP_SETSTYLE_MAP_CHECKED" @change="styleMap">科技</el-checkbox></span>
          <span class="name">地图</span>
          <el-image
            :src="require('@/icons/TMAP_NORMAL_MAP.png')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 地图类型 TMAP_NORMAL_MAP - 经纬度直投图 、 TMAP_SATELLITE_MAP -卫星图 、 TMAP_HYBRID_MAP - 卫星混合图、TMAP_TERRAIN_MAP-地形图、TMAP_TERRAIN_HYBRID_MAP - 地形混合
    mapType: {
      type: String,
      default: 'TMAP_NORMAL_MAP'
    },
    name: {
      type: String,
      default: 'mapType'
    }
  },
  data() {
    return {
      TMAP_SATELLITE_MAP_CHECKED: false, // 卫星地名是否选中
      TMAP_TERRAIN_MAP_CHECKED: false,
      TMAP_SETSTYLE_MAP_CHECKED: false,
      type: 'TMAP_NORMAL_MAP',
      isShowMapType: false
    }
  },
  onload() {

  },
  async mounted() {
    this.type = this.mapType
    document.addEventListener('click', (e) => {
      if (document.getElementById(this.name)?.contains(e.target) === false) {
        this.isShowMapType = false
      }
    })
  },
  methods: {
    /**
     * 选中卫星混合图
     */
    satelliteMap(e) {
      this.type = e ? 'TMAP_HYBRID_MAP' : 'TMAP_SATELLITE_MAP'
      this.handleGisType()
    },
    /**
     * 选中地形混合图
     */
    terrainMap(e) {
      this.type = e ? 'TMAP_TERRAIN_HYBRID_MAP' : 'TMAP_TERRAIN_MAP'
      this.handleGisType()
    },
    /** 地图颜色 */
    styleMap(e) {
      this.$emit('setStyle',e ? '#0066bd' : '')
    },
    /**
     * 选则地图类型
     */
    typeClick(e) {
      this.type = e
      this.handleGisType()
    },
    /** 地图类型显示控制 */
    showMapType() {
      this.isShowMapType = !this.isShowMapType
    },
    /**
     * 地图类型切换
     */
    handleGisType() {
      this.$emit('setMapType',this.type)
    }
  }
}
</script>
<style lang="scss" scoped>
.mapChange {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 137px;
    z-index: 1001;
    border-radius: 2px;
    padding: 2px;
    width: 32px;
    height: 32px;
    background: #f2f2f2;
}

.mapType {
    display: inline-block;
    position: absolute;
    right: 50px;
    bottom: 120px;
    z-index: 1001;
    background: #f2f2f2;

    .block {
        display: inline-block;
        position: relative;
        margin: 5px;
        border: 2px solid #ffffff;
        width: 68px;
        height: 63px;

        .name {
            display: inline-block;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 9999;
            border-top-right-radius: 3px;
            width: 35px;
            height: 20px;
            font-size: 12px;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
            color: #ffffff;
            background: #a5a5a5;
        }

        .checkbox {
            display: none;
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 20px;
            background: rgba(0, 0, 0, 0.5);

            .el-checkbox {
                width: 100%;
                font-size: 12px;
                text-align: center;
                color: #ffffff;

                .el-checkbox__label {
                    padding-left: 4px;
                }
            }
        }
    }

    .action {
        border: 2px solid #3485fb;

        .name {
            background: #3485fb;
        }

        .checkbox {
            display: inline;
        }
    }
}
</style>
