/* eslint-disable no-undef */
<template>
  <div
    :id="mapId"
    class="map"
    :style="'height:' +height+ 'px;'"
  />
</template>

<script>
import MapInit from './MapInit.js'
export default {
  name: 'Tianditu',
  props: {
    // 地图高度
    height: {
      type: Number,
      default: 800
    },
    // 天地图KEY
    tk: {
      type: String,
      default: process.env.VUE_APP_TIANDIT_TK
    },
    // 地图类型 TMAP_NORMAL_MAP - 经纬度直投图  TMAP_SATELLITE_MAP - 卫星图
    mapType: {
      type: String,
      default: 'TMAP_NORMAL_MAP'
    },
    // 地图对象ID
    mapId: {
      type: String,
      default: 'yzsMap'
    },
    // 经度【默认重庆市】
    lng: {
      type: Number,
      default: 106.550464
    },
    // 纬度【默认重庆市】
    lat: {
      type: Number,
      default: 29.563761
    },
    // 地图缩放级别
    zomm: {
      type: Number,
      default: 5
    },
    // 地图小缩放级别
    minZoom: {
      type: Number,
      default: 4
    },
    // 地图最大缩放级别
    maxZoom: {
      type: Number,
      default: 18
    },
    // 是否禁止地图拖动
    disableDrag: {
      type: Boolean,
      default: false
    },
    // 是否禁止地图缩放
    disableZoom: {
      type: Boolean,
      default: false
    },
    /*
     * 缩放控件显示位置
     * TOP_LEFT - 左上
     * TOP_RIGHT - 右上
     * BOTTOM_LEFT - 左下
     * BOTTOM_RIGHT - 右下
     */
    zoomPosition: {
      type: String,
      default: 'TOP_LEFT'
    },
    // 鹰眼控件大小
    miniMap: {
      type: Array,
      default: () => [100, 100]
    }
  },
  data() {
    return {
      map: null,
      T: null,
      wmsLayer: null,
      marker: null,
      markerTool: null
    }
  },
  watch: {
    T(val) {
      if (val) this.$emit('success')
    }
  },
  mounted: function() {
    this.roadMap()
  },
  methods: {

    roadMap() {
      MapInit.init().then(
        T => {
          this.T = T
          this.map = new this.T.Map(this.mapId)
          this.map.centerAndZoom(new this.T.LngLat(this.lng, this.lat), this.zomm) // 设置地图中心点
          this.map.setMinZoom(this.minZoom) // 设置地图最小缩放等级
          this.map.setMaxZoom(this.maxZoom) // 设置地图最大缩放等级
          this.miniMap ? this.setAddMiniMap(this.miniMap) : '' // 地图添加鹰眼控件
          this.disableDrag ? this.mapDisableDrag() : '' //禁止拖拽
          this.disableZoom ? this.mapDisableZoom() : '' //禁止缩放
          // eslint-disable-next-line no-undef
          this.setZoomPosition(T_ANCHOR_BOTTOM_LEFT)
          this.setMapType(this.mapType)
          this.watchMap()
          this.$emit('success', this.map)
        }).catch()
    },
    setMapType(type) {
      switch (type) {
      case 'TMAP_NORMAL_MAP': // 经纬度直投图
        this.map.setMapType(window.TMAP_NORMAL_MAP)
        break
      case 'TMAP_SATELLITE_MAP': // 卫星图
        this.map.setMapType(window.TMAP_SATELLITE_MAP)
        break
      case 'TMAP_HYBRID_MAP': // 卫星混合图
        this.map.setMapType(window.TMAP_HYBRID_MAP)
        break
      case 'TMAP_TERRAIN_MAP': // 地形图
        this.map.setMapType(window.TMAP_TERRAIN_MAP)
        break
      case 'TMAP_TERRAIN_HYBRID_MAP': // 地形混合
        this.map.setMapType(window.TMAP_TERRAIN_HYBRID_MAP)
        break
      }
    },
    /**
     * 地图添加鹰眼控件
     * @param minMapConfig 鹰眼控件大小 eg:[150,150]
     */
    setAddMiniMap(minMapConfig) {
      if (!this.T.Control?.OverviewMap) return
      const miniMap = new this.T.Control.OverviewMap({
        isOpen: true,
        size: new this.T.Point(minMapConfig[0] || 100, minMapConfig[1] || 100)
      })
      this.map.addControl(miniMap)
    },
    // 设置地图样式
    setStyle(style) {
      if (style) {
        this.map.setStyle(style)
      } else {
        this.map.removeStyle()
      }
    },
    /**
     * 设置地图中心点
     * @param lng 经度
     * @param lat 纬度
     * @param zoom 缩放级别
     */
    mapSetCenter(lng, lat, zoom) {
      this.map.centerAndZoom(new this.T.LngLat(lng, lat), zoom || (this.mapGetZoom || this.zomm))
    },
    /**
     * 帧听地图变化
     */
    watchMap() {
      // 地图缩放
      this.map.addEventListener('zoomend', (e) => {
        this.$emit('watchGis', e)
      })
      // 地图拖拽
      this.map.addEventListener('moveend', (e) => {
        this.$emit('watchGis', e)
      })
    },
    /**
     * 禁止拖拽
     */
    mapDisableDrag() {
      this.map.disableDrag()
    },
    /**
     * 允许拖拽
     */
    mapEnableDrag() {
      this.map.enableDrag()
    },
    /**
     * 禁止地图缩放
     */
    mapDisableZoom() {
      this.map.disableDoubleClickZoom()
      this.map.disableScrollWheelZoom()
    },
    /**
     * 允许地图缩放
     */
    mapEnableZoom() {
      this.map.enableDoubleClickZoom()
      this.map.enableScrollWheelZoom()
    },
    /**
     * 获取地图可视区域
     * lower_left: 可视区域左下角
     * top_right: 可视区域右上角
     */
    mapGetBounds() {
      const bs = this.map.getBounds()
      return { lower_left: bs.getSouthWest(), top_right: bs.getNorthEast() }
    },
    /**
     * 设置地图显示范围
     * @param lower_left 左下角经纬度 eg:[116.21235,39.84677]
     * @param top_right 右上角经纬度 eg:[116.60305,39.95212]
     */
    mapSetMaxBounds(lower_left, top_right) {
      this.map.setMaxBounds(new this.T.LngLatBounds(new this.T.LngLat(lower_left[0], lower_left[1]), new this.T.LngLat(top_right[0], top_right[1])))
    },
    /**
     * 获取地图中心点坐标
     * lng: 经度
     * lat: 纬度
     */
    mapGetCenter() {
      return { lng: this.map.getCenter().getLng(), lat: this.map.getCenter().getLat() }
    },
    /**
     * 获取地图当前缩放级别
     */
    mapGetZoom() {
      return this.map.getZoom()
    },
    /**
     * 添加自定义图层
     * @param imageURL 图层地址必须
     * 可参考：天地图-地图服务列表 http://lbs.tianditu.gov.cn/server/MapService.html (注意：图层地址全连接 "您的密钥"如果不修改会自动替换成初始化地图所用秘钥)
     * 如：http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=您的密钥
     * @param minZoom 图层缩放最小 默认当前地图缩放级别
     * @param maxZoom 图层缩放最大 默认当前地图缩放级别
     */
    mapAddLayer(imageURL, minZoom, maxZoom) {
      if (imageURL) {
        // 创建自定义图层对象
        const lay = new this.T.TileLayer(imageURL.replace('您的密钥', this.tk), { minZoom: minZoom || this.minZoom, maxZoom: maxZoom || this.maxZoom })
        // 将图层增加到地图上
        this.map.addLayer(lay)
      }
    },
    /**
     * 删除WMS图层
     */
    mapRemoveWmsLayer(objWmsLayer) {
      this.map.removeLayer(objWmsLayer)
    },
    /**
     * 设置缩放控件
     * @param zoomPosition 控件位置
     * TOP_LEFT - 左上
     * TOP_RIGHT - 右上
     * BOTTOM_LEFT - 左下
     * BOTTOM_RIGHT - 右下
     */
    mapControlsetPosition(zoomPosition) {
      if (zoomPosition) {
        switch (zoomPosition) { // 左上
        case 'TOP_LEFT':
          // eslint-disable-next-line no-undef
          this.setZoomPosition(T_ANCHOR_TOP_LEFT)
          break
        case 'TOP_RIGHT': // 右上
          // eslint-disable-next-line no-undef
          this.setZoomPosition(T_ANCHOR_TOP_RIGHT)
          break
        case 'BOTTOM_LEFT': // 左下
          // eslint-disable-next-line no-undef
          this.setZoomPosition(T_ANCHOR_BOTTOM_LEFT)
          break
        case 'BOTTOM_RIGHT':
          // eslint-disable-next-line no-undef
          this.setZoomPosition(T_ANCHOR_BOTTOM_RIGHT)
          break
        }
      }
    },
    setZoomPosition(position) {
      if (!this.T){
        return
      }
      const control = new this.T.Control.Zoom()
      this.map.addControl(control)
      control.setPosition(position)
    },
    /**
     * 地图添加鹰眼控件
     * @param minMapConfig 鹰眼控件大小 eg:[150,150]
     */
    mapAddMiniMap(minMapConfig) {
      if (!this.T){
        return
      }
      const miniMap = new this.T.Control.OverviewMap({
        isOpen: true,
        size: new this.T.Point(minMapConfig[0], minMapConfig[1])
      })
      this.map.addControl(miniMap)
    },
    /*
     * 标注工具
     */
    addPointTool(markerTool,callback) {
      if (!this.T){
        return
      }
      markerTool = new this.T.MarkTool(this.map, { follow: true })
      markerTool.open()
      markerTool.addEventListener('mouseup', (e)=>{
        markerTool.clear()
        callback(e)
      })
    },
    /**
     * 开始绘制圆形
     * @param circleToolObj 圆形统计对象
     * @param callback 绘制完成后的回调函数
     */
    mapOpenCircleTool(circleToolObj, callback) {
      if (!this.T){
        return
      }
      this.mapClearOverLays()
      circleToolObj = new this.T.CircleTool(this.map, { color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true })
      circleToolObj.open()
      // 绘制完成时触发
      circleToolObj.addEventListener('drawend', (e) => {
        circleToolObj.clear()
        callback(e)
      })
    },
    /**
     * 绘制圆形
     * @param lng 经度
     * @param lat 纬度
     * @param radius 半径
     */
    mapDrawCircle(circleObj, lng, lat, radius, callback) {
      if (!this.T){
        return
      }
      // 定义该矩形的显示区域
      circleObj = new this.T.Circle(new this.T.LngLat(lng, lat), radius, { color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true })
      // 单击开始编辑
      circleObj.addEventListener('click', (e) => {
        circleObj.enableEdit()
      })
      // 双击取消编辑
      circleObj.addEventListener('dblclick', (e) => {
        circleObj.disableEdit()
        callback({
          currentCenter: circleObj.getCenter(),
          currentRadius: circleObj.getRadius()
        })
      })
      // 向地图上添加圆
      this.map.addOverLay(circleObj)
    },

    /**
     * 开始绘制多边形
     */
    openPolygonTool(polygonToolObj, callback, disabled = false) {
      if (!this.T){
        return
      }
      this.mapClearOverLays()
      polygonToolObj = new this.T.PolygonTool(this.map, { color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true })
      if (!disabled) {
        polygonToolObj.open()
        // 绘制完成时触发
        polygonToolObj.addEventListener('draw', (e) => {
          polygonToolObj.clear()
          callback(e)
        })
      }
    },
    /**
     * 绘制多边形
     */
    mapDrawPolygon(polygonObj, arr, callback) {
      if (!this.T){
        return
      }
      let points = []
      arr.forEach(item => {
        points.push(new this.T.LngLat(item.lng, item.lat))
      })
      // 创建面对象
      polygonObj = new this.T.Polygon(points, {
        color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true
      })
      // 单击开始编辑
      polygonObj.addEventListener('click', (e) => {
        polygonObj.enableEdit()
      })
      // 双击取消编辑
      polygonObj.addEventListener('dblclick', (e) => {
        polygonObj.disableEdit()
        callback({ currentLnglats: polygonObj.getLngLats()[0] })
      })
      // 向地图上添加面
      this.map.addOverLay(polygonObj)
    },
    /**
     * 开始绘制矩形
     */
    openRectangleTool(rectangleToolObj, callback) {
      if (!this.T){
        return
      }
      this.mapClearOverLays()
      rectangleToolObj = new this.T.RectangleTool(this.map, { color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true })
      rectangleToolObj.open()
      // 绘制完成时触发
      rectangleToolObj.addEventListener('draw', (e) => {
        rectangleToolObj.clear()
        callback(e)
      })
    },
    /**
     * 绘制矩形
     */
    mapRectangle(rectangleObj, topLeft, lowerRight, callback) {
      if (!this.T){
        return
      }
      const rectangle = new this.T.LngLatBounds(new this.T.LngLat(topLeft.lng, topLeft.lat), new this.T.LngLat(lowerRight.lng, lowerRight.lat))
      // 创建面对象
      rectangleObj = new this.T.Rectangle(rectangle, {
        color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0.5, lineStyle: 'solid', follow: true
      })
      // 单击开始编辑
      rectangleObj.addEventListener('click', (e) => {
        rectangleObj.enableEdit()
      })
      // 双击取消编辑
      rectangleObj.addEventListener('dblclick', (e) => {
        rectangleObj.disableEdit()
        callback({ currentBounds: rectangleObj.getBounds() })
      })
      this.map.addOverLay(rectangleObj)
    },
    /**
     * 设置标注
     * @param lng 经度
     * @param lat 纬度
     * @isDragging 是否允许编辑
     * @param mouseupMarker 回调
     */
    mapSetMarker(lng, lat, isDragging, mouseupMarker) {
      if (!this.T){
        return
      }
      this.marker = new this.T.Marker(new this.T.LngLat(lng, lat))// 创建标注
      this.map.addOverLay(this.marker) // 将标注添加到地图中
      if (isDragging) {
        this.marker.enableDragging()
      }
      const zoom = this.mapGetZoom() || this.zomm
      /*
       *  使所有标注居中
       */
      this.map.setViewport([new this.T.LngLat(lng, lat)])
      this.map.setZoom(zoom)
      this.marker.addEventListener('mouseup', (e) => {
        mouseupMarker(e)
      })
    },
    searchMaker(lng,lat){
      if (!this.T){
        return
      }
      const startMarker = new this.T.Marker(new this.T.LngLat(lng, lat), {
        icon: new this.T.Icon({
          iconUrl: require('@/assets/icon/location.png'), // 'http://lbs.tianditu.gov.cn/images/bus/start.png',
          iconSize: new this.T.Point(48, 48),
          iconAnchor: new this.T.Point(48, 48)
        })
      })
      this.map.addOverLay(startMarker)
    },
    // 测距工具
    addLineTool(showLabel, callback) {
      if (!this.T){
        return
      }
      const lineTool = new this.T.PolylineTool(this.map, { showLabel })
      lineTool.open()
      lineTool.addEventListener('draw', (e) => {
        lineTool.clear()
        callback(e)
      })
    },
    /**
     * 设置线
     */
    mapSetLine(pointsList) {
      if (!this.T){
        return
      }
      let points = []
      pointsList.forEach(item => {
        points.push(new this.T.LngLat(item.longitude, item.latitude))
      })
      this.marker = new this.T.Polyline(points)
      this.map.addOverLay(this.marker)
      /*
       *  使所有标注居中
       */
      const zoom = this.mapGetZoom() || this.zomm
      this.map.setViewport(points)
      this.map.setZoom(zoom)
    },
    /**
     * 设置多边形
     */
    mapSetPolygon(pointsList) {
      if (!this.T){
        return
      }
      let points = []
      pointsList.forEach(item => {
        points.push(new this.T.LngLat(item.longitude, item.latitude))
      })
      // 创建面对象
      this.marker = new this.T.Polygon(points, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5
      })
      // 向地图上添加面
      this.map.addOverLay(this.marker)
      const zoom = this.mapGetZoom() || this.zomm
      this.map.setViewport(points)
      this.map.setZoom(zoom)

    },
    /**
     * 添加聚合Marker
     * @param array maker信息 {lng:'经度',lat:'纬度',name:'名称'...[其他信息]...}
     * @param icon 标准图标地址 默认 http://api.tianditu.gov.cn/img/map/markerA.png 参考天地图自定义标注图片
     * @param iconSize 图标可视区域的大小。数组格式 [宽,高] 默认 [19,27] 参考天地图自定义标注图片
     * @param iconAnchor 图标的定位锚点。数组格式 [左,上] 默认[10,25] 参考天地图自定义标注图片
     */
    addMarkerClusterer(array, icon, iconSize, iconAnchor) {
      if (!this.T) return
      let arrayObj = []
      // 创建图片对象
      let icons = new this.T.Icon({
        iconUrl: icon || '/styletianditu/img/map/markerA.png',
        iconSize: new this.T.Point(iconSize ? iconSize[0] : 19, iconSize ? iconSize[1] : 27),
        iconAnchor: new this.T.Point(iconAnchor ? iconAnchor[0] : 10, iconAnchor ? iconAnchor[1] : 25)
      })
      array.forEach((item, index) => {
        let mk = new this.T.Marker(new this.T.LngLat(item.lng, item.lat), { title: item.name, icon: icons })
        mk.addEventListener('click', (e) => {
          let point = e.lnglat
          this.marker = new this.T.Marker(point)// 创建标注
          let markerInfoWin = new this.T.InfoWindow(item.name, { offset: new this.T.Point(0, -10) }) // 创建信息窗口对象
          this.map.openInfoWindow(markerInfoWin, point) // 开启信息窗口
        })
        arrayObj.push(mk)
      })
      return new this.T.MarkerClusterer(this.map, { markers: arrayObj })
    },
    addPoints(array, icon, iconSize, iconAnchor) {
      if (!this.T) return
      let icons = new this.T.Icon({
        iconUrl: icon || '/styletianditu/img/map/markerA.png',
        iconSize: new this.T.Point(iconSize ? iconSize[0] : 19, iconSize ? iconSize[1] : 27),
        iconAnchor: new this.T.Point(iconAnchor ? iconAnchor[0] : 10, iconAnchor ? iconAnchor[1] : 25)
      })
      array.forEach(item => {
        let mk = new this.T.Marker(new this.T.LngLat(item.lng, item.lat), { title: item.name, icon: icons })
        mk.addEventListener('click', (e) => {
          let point = e.lnglat
          this.marker = new this.T.Marker(point)// 创建标注
          let markerInfoWin = new this.T.InfoWindow(item.name, { offset: new this.T.Point(0, -10) }) // 创建信息窗口对象
          this.map.openInfoWindow(markerInfoWin, point) // 开启信息窗口
        })
        this.map.addOverLay(mk)
      })
    },
    /**
     * 清楚所有覆盖物
     */
    mapClearOverLays() {
      this.map ? this.map.clearOverLays() : ''
    },
    /**
     * 坐标拾取器
     */
    getLngLat(callback) {
      if (!this.T){
        return
      }
      const cp = new this.T.CoordinatePickup(this.map, { callback: callback })
      cp.addEvent()
    },
    /**
     * 添加WMS图层 具体信息请参考：天地图官方
     * @param layers 图层名称多个用","分隔
     * @param url 图层地址
     * @param version 请求服务的版本 默认1.1.1
     */
    addWmsLayer(layers, url, version) {
      let config = {
        version: version || '1.3.0', // 请求服务的版本
        layers: layers,
        transparent: true, // 输出图像背景是否透明
        styles: '', // 每个请求图层的用","分隔的描述样式
        format: 'image/png', // 输出图像的类型
        crs: 'EPSG:4326',
        srs: 'EPSG:4326',
        IW: 'EPSG:4326'
      }
      if (this.wmsLayer) {
        this.map.removeLayer(this.wmsLayer)
      }
      this.wmsLayer = new this.T.TileLayer.WMS(url, config)
      this.map.addLayer(this.wmsLayer)
    },
    /**
     * 删除WMS图层
     */
    removeWmsLayer() {
      if (this.wmsLayer) {
        this.map.removeLayer(this.wmsLayer)
      }
    },
    /**
     * 删除Marker图层
     */
    removeMarker(markerObj) {
      if (markerObj) {
        this.map.removeLayer(markerObj)
      } else {
        if (this.marker) {
          this.map.removeLayer(this.marker)
        }
      }
    }
  }

}

</script>

<style lang="scss" scoped>
.map {
    position: relative !important;
    width: 100%;
}

.mapboxgl-canvas {
    position: relative !important;
}
</style>
