<template>
  <el-form
    ref="mapForm"
    :model="mapForm"
    :rules="disabled ? {} : rules"
    label-width="140px"
    size="medium"
    class="table-column three"
    :disabled="disabled"
  >
    <el-form-item
      v-if="showAddress"
      label="地理位置信息:"
      prop="address"
    >
      <el-select
        v-model="mapForm.address"
        remote
        filterable
        reserve-keyword
        placeholder="请输入地理位置信息"
        :remote-method="searchAddress"
        style="width: 100%;"
        @change="selectAddress"
      >
        <el-option
          v-for="(item, index) in addressOpt"
          :key="index"
          :label="item.label"
          :value="{ value: item.value, label: item.label }"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="showLonLat"
      label="经纬度:"
      prop="longitude"
      style="width: 50%;"
    >
      <el-row :span="24">
        <el-col :span="10">
          <el-input
            v-model.trim="mapForm.longitude"
            prop="longitude"
            placeholder="经度"
          />
        </el-col>
        <el-col
          :span="10"
          :offset="1"
        >
          <el-input
            v-model.trim="mapForm.latitude"
            placeholder="纬度"
          />
        </el-col>
        <el-col
          v-if="!disabled"
          :span="1"
          :offset="1"
        >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="searchLonLat"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      label-width="0"
      style="width: 100%;"
    >
      <Tianditu
        ref="Tianditu"
        zoom-position="BOTTOM_LEFT"
        :zomm="13"
        :height="600"
        @success="handleLoadingSuccess"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { TIANDITU_KEY } from '@/utils/map-keys'
import Tianditu from '@/components/Tianditu'
import { getAddress, geocoder } from '@/api/tianditu'
export default {
  components: {
    Tianditu
  },
  props: {
    showAddress: {
      type: Boolean,
      default: () => true
    },
    showLonLat: {
      type: Boolean,
      default: () => true
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      mapForm: {
        address: '',
        longitude: '',
        latitude: ''
      },
      addressOpt: [],
      rules: {
        address: [
          { required: true, message: '请输入地理位置信息', trigger: 'blur' }
        ],
        longitude: [
          {
            required: true,
            validator: (_, value, cb) => {
              const { latitude } = this.mapForm
              if (!value || !latitude) {
                return cb(new Error('请输入或点选地图获取坐标'))
              }
              return cb()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 地图加载完成
    handleLoadingSuccess() {
      this.drawMap()
    },
    // 地图绘制
    drawMap() {
      this.$refs.Tianditu.removeMarker()
      let { longitude, latitude } = this.mapForm
      if (this.disabled!==true && (!longitude || !latitude)) {
        // 默认重庆
        longitude = 106.550464
        latitude = 29.563761
      }
      if (longitude && latitude){
        this.$refs.Tianditu.mapSetMarker(parseFloat(longitude), parseFloat(latitude), !this.disabled, e => {
          // 地址逆向
          geocoder({
            postStr: `{'lon':${e.lnglat.lng},'lat':${e.lnglat.lat},'ver':1}`,
            type: 'geocode',
            tk: TIANDITU_KEY
          }).then(res => {
            if (res.status === '0') {
              const { addressComponent, location } = res.result
              this.addressOpt = []
              this.mapForm.address = `${addressComponent.province === addressComponent.city ? addressComponent.city : addressComponent.province + addressComponent.city}${addressComponent.county}${addressComponent.poi}`
              this.mapForm.longitude = location.lon
              this.mapForm.latitude = location.lat
            }
          })
        })
        this.$refs.Tianditu.mapSetCenter(parseFloat(longitude), parseFloat(latitude),13)
      }
    },
    // 地址搜索
    searchAddress(keyword) {
      if (!keyword) return
      getAddress({
        postStr: `{"keyWord":"${keyword}","level":12,"specify":"重庆","mapBound":"116.02524,39.83833,116.65592,39.99185","queryType":7,"start":0,"count":10}`,
        type: 'query',
        tk: TIANDITU_KEY
      }).then(res => {
        this.addressOpt = res ? res.pois.map(({ address, lonlat }) => ({ label: address, value: lonlat })) : []
      })
    },
    // 选择地址
    selectAddress({ label, value }) {
      if (!value) return
      const [longitude, latitude] = value.split(' ')
      this.mapForm.longitude = longitude
      this.mapForm.latitude = latitude
      this.mapForm.address = label
      this.drawMap()
    },
    // 经纬度查询
    searchLonLat() {
      this.drawMap()
    },
    // 验证表单
    validForm() {
      let flag = null
      this.$refs.mapForm.validate(valid => {
        flag = valid
      })
      return flag
    },
    // 获取表单数据
    getFormData() {
      return {
        mapForm: this.mapForm
      }
    },
    // 设置表单数据
    setFormData(formData) {
      this.mapForm = { ...formData }
      this.$nextTick(() => {
        this.drawMap()
      })
    }
  }
}
</script>
