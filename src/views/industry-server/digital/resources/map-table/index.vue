<template>
  <div>
    <el-table
      :data="geographyInfos"
      class="table-border"
      style="margin-bottom: 20px;"
    >
      <el-table-column label="点位序号" width="120" align="center">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center">
        <template v-slot="scope">
          <el-input-number
            v-if="isEdit"
            v-model="scope.row.longitude"
            :min="73.40"
            :max="135.23"
            :precision="6"
            @input="initMap"
          />
          <div v-else>
            {{ scope.row.longitude }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center">
        <template v-slot="scope">
          <el-input-number
            v-if="isEdit"
            v-model="scope.row.latitude"
            :min="3.52"
            :max="53.33"
            :precision="6"
            @input="initMap"
          />
          <div v-else>
            {{ scope.row.latitude }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isEdit"
        width="100"
        align="center"
      >
        <template slot="header">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleAdd"
          >
            <em class="el-icon-circle-plus" /> 添加
          </el-button>
        </template>
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            :disabled="geographyInfos.length > 1 ? false : true"
            @click="(geographyInfos.splice(scope.$index, 1))"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="container">
      <div id="map">
        <tianditu
          ref="Tianditu"
          zoom-position="BOTTOM_LEFT"
          :zomm="15"
          :height="600"
        />
      </div>
      <div class="oper-search">
        <div v-if="isEdit" class="search-input">
          <el-input
            v-model.trim="keyword"
            placeholder="输入关键字"
            @input="searchSubmit"
          >
            <i slot="suffix" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
        <div v-if="searchList.length>0" class="search-list">
          <div
            v-for="(item ,index) in searchList"
            :key="index"
            class="item"
            @click="pointClick(item)"
          >
            <el-tag size="mini" type="success">{{ item.address }}</el-tag>

            <!-- <el-tag size="mini" type="success">{{ item.type==='pois' ? ((item.province===item.city ? '' : item.province+'/')+item.city+'/'+item.county) : (item.province+`(${item.count})`) }}</el-tag> -->
            <p v-html="replaceKey(item.label)" />
          </div>
        </div>
      </div>

      <div v-if="isEdit" class="tab-wrap">
        <div class="tab-item" @click="tabChange(1)"><i class="el-icon-location-information" /> 点</div>
        <div class="tab-item" @click="tabChange(2)"><i class="el-icon-paperclip" /> 线</div>
        <div class="tab-item" @click="tabChange(3)"><i class="el-icon-s-grid" /> 面</div>
        <div class="tab-item" @click="tabChange(4)"><i class="el-icon-delete" /> 清除</div>
      </div>
    </div>
  </div>
</template>

<script>
import Tianditu from '@/components/Tianditu'
import { getAddress } from '@/api/tianditu'
export default {
  components: {
    Tianditu
  },
  data() {
    return {
      isEdit: true,
      keyword: '',
      searchList: [],
      geographyInfos: [],
      rectangleToolObj: null
    }
  },
  watch: {
    'geographyInfos'() {
      this.initMap()
    },
    deep: true
  },
  mounted() {
    this.isEdit = this.$route.query.isEdit
  },
  methods: {
    replaceKey(keyword) {
      return keyword ? keyword.replace(this.keyword, '<span style="color: #f73131;">' + this.keyword + '</span>') : ''
    },
    /**
     * 点击搜索列表，地图定位到点击的点
     */
    pointClick(item) {
      this.searchList = []
      this.keyword = ''
      const lonlat = item.lonlat.split(' ')
      this.$refs.Tianditu.mapSetCenter(lonlat[0],lonlat[1],12)
    },
    /**
     * 输入框搜索
     */
    searchSubmit(val) {
      getAddress({
        postStr:{
          keyWord:val,
          mapBound:'-180,-90,180,90',
          level:15,
          queryType:1,
          start:0,
          count:20,
          resultType:1,
          show:2
        },
        type:'query',
        tk:process.env.VUE_APP_TIANDIT_TK
      }).then(res=>{
        const searchList = []
        if (res.pois && res.pois.length>0){
          res.pois.forEach(item=>{
            searchList.push({
              label:item.name,
              address:item.address,
              lonlat:item.lonlat,
              ename:item.ename,
              /*
               * province:item.province,
               * county:item.county,
               * city:item.city,
               */
              type:'pois'
            })
          })
        }
        this.searchList = searchList
      })
    },
    /**
     * 标记
     */
    tabChange(tab){
      switch (tab) {
      case 1:
        this.$refs.Tianditu.addPointTool(this.drawMarker,(e)=>{
          this.geographyInfos = [
            {longitude: e.currentLnglat.lng, latitude: e.currentLnglat.lat}
          ]
        })
        break
      case 2:
        this.$refs.Tianditu.addLineTool(this.drawLine, (e) => {
          this.geographyInfos = [
            {longitude: e.currentLnglats[0].lng, latitude: e.currentLnglats[0].lat},
            {longitude: e.currentLnglats[1].lng, latitude: e.currentLnglats[1].lat}
          ]
        })
        break
      case 3:
        this.$refs.Tianditu.openPolygonTool(this.drawPoly, (e) => {
          this.polygonAssemble(e.currentLnglats)
        })
        break
      default:
        this.geographyInfos = []
        break
      }
    },
    /**
     * 多边形数据组装
     */
    polygonAssemble(data){
      this.geographyInfos = []
      data.forEach(item=>{
        this.geographyInfos.push({
          longitude: item.lng, latitude: item.lat
        })
      })
    },
    // 添加经纬度
    handleAdd() {
      this.geographyInfos.splice(this.geographyInfos.length + 1, 0, { longitude: undefined, latitude: undefined })
    },
    // 接受父页面数据初始化
    init(info) {
      this.geographyInfos = info
    },
    // 初始化天地图
    initMap() {
      this.isEdit = this.$route.query.isEdit
      this.$refs.Tianditu.mapClearOverLays()
      let isError = false
      this.geographyInfos.forEach(element => {
        if (!element.longitude || !element.latitude) {
          isError = true
        }
      })
      if (isError) {
        return
      }
      if (this.geographyInfos.length === 1) {
        this.$refs.Tianditu.mapSetMarker(this.geographyInfos[0].longitude,this.geographyInfos[0].latitude, this.$route.query.isEdit, e => {
          const { lng, lat } = e.lnglat
          this.geographyInfos[0].longitude = lng
          this.geographyInfos[0].latitude = lat
        })
      } else if (this.geographyInfos.length === 2) {
        // 画线
        this.$refs.Tianditu.mapSetLine(this.geographyInfos)
      } else {
        // 画多边形
        this.$refs.Tianditu.mapSetPolygon(this.geographyInfos)
      }
      if (!this.$route.query.isEdit) {
        this.$refs.Tianditu.mapDisableDrag()
      }
      this.$emit('change', this.geographyInfos)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
    position: relative;

    ::-webkit-scrollbar {
        /* 滚动条整体样式 */
        width: 10px;  /* 高宽分别对应横竖滚动条的尺寸 */
        height: 10px;
    }

    ::-webkit-scrollbar-thumb {
        /* 滚动条里面小方块 */
        border-radius: 10px;
        background-color: skyblue;
        background-image:
            -webkit-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent
            );
    }

    ::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #ededed;

        /* 滚动条里面轨道 */
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .oper-search {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 999;
        width: 400px;

        .search-input {
            display: flex;
        }

        .search-list {
            overflow-y: auto;
            margin-top: 10px;
            border-radius: 5px;
            border-radius: 6px;
            max-height: 40vh;
            font-size: 12px;
            background: #ffffff;

            .item {
                border-bottom: 1px solid rgba(242, 242, 242, 1);
                padding: 10px 10px 0 10px;
                cursor: pointer;
            }
        }
    }

    .tab-wrap {
        display: flex;
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 999;
        border-radius: 5px;
        height: 40px;
        font-size: 12px;
        background-color: #ffffff;
        align-items: center;

        .tab-item {
            border-right: 1px dashed #cccccc;
            padding: 0 15px;
            cursor: pointer;

            &.active {
                color: #007aff;
            }
        }
    }

    ::v-deep .tdt-label1 {
        height: 22px;
    }
}
</style>
