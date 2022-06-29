<template>
  <div class="map">
    <el-table
      v-if="isTable"
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
            :controls="false"
            :disabled="isEdit && isManual?false:true"
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
            :controls="false"
            :disabled="isEdit && isManual?false:true"
            @input="initMap"
          />
          <div v-else>
            {{ scope.row.latitude }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isEdit && isManual"
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
        <template>
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
          :mapId="name"
          :ref="name"
          zoom-position="BOTTOM_LEFT"
          :disableDrag="isEdit?false:true"
          :disableZoom="isEdit?false:true"
          :zomm="15"
          :map-type="mapType"
          :height="height"
          @success="initSuccess"
          @watchGis="watchGis"
        />
        <Gis-Type
          :name="`${name}Type`"
          :map-type="mapType"
          @setMapType="setMapType"
          @setStyle="setStyle"
        />
      </div>
      <div class="map-oper-search">
        <div v-if="isEdit" class="search-input">
          <el-select
            v-model="specify"
            filterable
            clearable
            placeholder="请选择"
            style="margin-right: 5px; width: 150px;"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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

      <div v-if="isEdit" class="map-tab-wrap">
        <div v-if="tool.indexOf('spot')!==-1" class="map-utilis-tab-item" @click="tabChange(1)"><i class="el-icon-location-information" /> 点</div>
        <div v-if="tool.indexOf('line')!==-1" class="map-utilis-tab-item" @click="tabChange(2)"><i class="el-icon-paperclip" /> 线</div>
        <div v-if="tool.indexOf('face')!==-1" class="map-utilis-tab-item" @click="tabChange(3)"><i class="el-icon-s-grid" /> 面</div>
        <div class="map-utilis-tab-item" style="border-right:none;" @click="tabChange(4)"><i class="el-icon-delete" /> 清除</div>
      </div>
      <div v-else class="map-tab-wrap">
        <div class="map-utilis-tab-item" style="border-right:none;" @click="move"><i class="el-icon-coordinate" /> {{ isMove ? '移动地图' : '固定地图'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Tianditu from '@/components/Tianditu'
import { getAddress } from '@/api/tianditu'
import GisType from '@/components/maptype'
import { getPoints } from '@/api/individual-soldier/single-pawn/single-pawn'
export default {
  components: {
    Tianditu,
    GisType
  },
  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'TiandituMap'
    },
    isEdit: {
      type: [String,Boolean] ,
      default: true
    },
    isTable: {
      type: Boolean ,
      default: true
    },
    tool: { // 标注工具
      type: Array,
      default: () => ['spot','line','face']
    },
    isManual:{ // 是否允许手动添加
      type: Boolean ,
      default: true
    },
    height:{
      type:Number | String,
      default:600
    }
  },
  data() {
    return {
      mapRef: '',
      keyword: '',
      searchList: [],
      isMove:false,
      geographyInfos: [],
      rectangleToolObj: null,
      mapType: 'TMAP_SATELLITE_MAP', // 地图类型
      initMaps:false,
      specify:'156500000',
      cities: [{
        value: '156110000',
        label: '北京市'
      }, {
        value: '156120000',
        label: '天津市'
      }, {
        value: '156130000',
        label: '河北省'
      }, {
        value: '156140000',
        label: '山西省'
      },{
        value: '156150000',
        label: '内蒙古自治区'
      },{
        value: '156210000',
        label: '辽宁省'
      },{
        value: '156220000',
        label: '吉林省'
      },{
        value: '156230000',
        label: '黑龙江省'
      },{
        value: '156310000',
        label: '上海市'
      },{
        value: '156320000',
        label: '江苏省'
      },{
        value: '156330000',
        label: '浙江省'
      },{
        value: '156340000',
        label: '安徽省'
      },{
        value: '156350000',
        label: '福建省'
      },{
        value: '156360000',
        label: '江西省'
      },{
        value: '156370000',
        label: '山东省'
      },{
        value: '156410000',
        label: '河南省'
      },{
        value: '156420000',
        label: '湖北省'
      },{
        value: '156430000',
        label: '湖南省'
      },{
        value: '156440000',
        label: '广东省'
      },{
        value: '156450000',
        label: '广西壮族自治区'
      },{
        value: '156460000',
        label: '海南省'
      },{
        value: '156500000',
        label: '重庆市'
      },{
        value: '156510000',
        label: '四川省'
      },{
        value: '156520000',
        label: '贵州省'
      },{
        value: '156530000',
        label: '云南省'
      },{
        value: '156540000',
        label: '西藏自治区'
      },{
        value: '156610000',
        label: '陕西省'
      },{
        value: '156620000',
        label: '甘肃省'
      },{
        value: '156630000',
        label: '青海省'
      },{
        value: '156640000',
        label: '宁夏回族自治区'
      },{
        value: '156650000',
        label: '新疆维吾尔自治区'
      },{
        value: '156710000',
        label: '台湾省'
      },{
        value: '156810000',
        label: '香港特别行政区'
      },{
        value: '156820000',
        label: '澳门特别行政区'
      }],
    }
  },
  watch: {
    'geographyInfos'() {
      if(this.initMaps){
        this.initMap()
      }
    },
    'initMaps'(val){
      this.initMap()
    },
    isEdit(newV){
      if (this.initMaps){
        if (newV){
          this.mapRef.mapEnableZoom()
          this.mapRef.mapEnableDrag()
        } else {
          this.mapRef.mapDisableDrag()
          this.mapRef.mapDisableZoom()
        }
      }
    },
    deep: true
  },
  mounted() {
    this.mapRef = this.$refs[this.name]
  },
  methods: {
    // 地图改变
    async watchGis({ target }) {
      if (target && this.isFull) {
        const { Lq, kq } = target?.getBounds()
        const data = (await getPoints({ lon: `${Lq?.lng},${kq?.lng}`, lat: `${Lq.lat},${kq?.lat}` }))?.data
        this.mapRef.addPoints(data.map(x => ({ lng: x.longitude, lat: x.latitude, name: x.individualName })), '/danbing.png', [34, 34])
      }
    },
    // 地图初始化完成
    initSuccess(){
      this.initMaps = true
    },
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
      this.mapRef.mapSetCenter(lonlat[0],lonlat[1],12)
      this.mapRef.searchMaker(lonlat[0],lonlat[1])
    },
    // 设置地图颜色
    setStyle(e){
      this.mapRef.setStyle(e)
    },
    // 设置地图类型
    setMapType(type){
      this.mapRef.setMapType(type)
    },
    move(){
      this.isMove = !this.isMove
      if(this.isMove){
        this.mapRef.mapEnableZoom()
        this.mapRef.mapEnableDrag()
      }else{
        this.mapRef.mapDisableDrag()
        this.mapRef.mapDisableZoom()
      }
    },
    /**
     * 输入框搜索
     */
    searchSubmit(val) {
      getAddress({
        postStr:JSON.stringify({
          keyWord:val,
          mapBound:'-180,-90,180,90',
          specifyAdminCode:this.specify,
          level:15,
          queryType:1,
          start:0,
          count:20,
          resultType:1,
          show:2
        }),
        type:'query',
        tk:process.env.VUE_APP_TIANDIT_TK,
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
        this.mapRef.addPointTool(this.drawMarker,(e)=>{
          this.geographyInfos = [
            {longitude: e.currentLnglat.lng, latitude: e.currentLnglat.lat}
          ]
        })
        break
      case 2:
        this.mapRef.addLineTool(this.drawLine, (e) => {
          this.geographyInfos = [
            {longitude: e.currentLnglats[0].lng, latitude: e.currentLnglats[0].lat},
            {longitude: e.currentLnglats[1].lng, latitude: e.currentLnglats[1].lat}
          ]
        })
        break
      case 3:
        this.mapRef.openPolygonTool(this.drawPoly, (e) => {
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
      // this.isEdit = this.$route.query.isEdit
      this.mapRef.mapClearOverLays()
      let isError = false
      this.geographyInfos.forEach(element => {
        if (!element.longitude || !element.latitude) {
          isError = true
        }
      })
      if (isError) return
      if (this.geographyInfos.length === 1) {
        this.mapRef.mapSetMarker(this.geographyInfos[0].longitude,this.geographyInfos[0].latitude, this.$route.query.isEdit, e => {
          const { lng, lat } = e.lnglat
          this.geographyInfos[0].longitude = lng
          this.geographyInfos[0].latitude = lat
        })
      } else if (this.geographyInfos.length === 2) {
        // 画线
        this.mapRef.mapSetLine(this.geographyInfos)
      } else {
        // 画多边形
        this.mapRef.mapSetPolygon(this.geographyInfos)
      }
      this.$emit('change', this.geographyInfos)
    }
  }
}
</script>
<style lang="scss" scoped>
.map {
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

        .map-oper-search {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 900;
            width: 400px;

            .search-input {
                display: flex;
            }

            .search-list {
                overflow-y: auto;
                margin-top: 10px;
                border-radius: 5px;
                border-radius: 6px;
                padding: 10px 0;
                max-height: 40vh;
                font-size: 12px;
                background: #ffffff;

                .item {
                    margin: 0;
                    border-bottom: 1px solid rgba(242, 242, 242, 1);
                    padding: 0 10px;
                    cursor: pointer;

                    p {
                        margin: 0;
                        line-height: 25px;
                    }
                }
            }
        }

        .map-tab-wrap {
            display: flex;
            position: absolute;
            top: 10px;
            right: 5px;
            z-index: 900;
            border-radius: 5px;
            font-size: 12px;
            background-color: #ffffff;
            align-items: center;

            .map-utilis-tab-item {
                border-right: 1px dashed #cccccc;
                padding: 0 15px;
                line-height: 35px;
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
}
</style>
