<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="单兵信息详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <div class="list-column-wrap">
        <div class="info-list" style="width: 100%;">
          <div class="label">
            单兵名称:
          </div><div class="content">
            {{ info.individualName }}
          </div>
        </div>
        <div class="info-list" style="width: 100%;">
          <div class="label">
            所属单位:
          </div><div class="content">
            {{ info.affiliatedUnitName }}
          </div>
        </div>
        <div class="info-list" style="width: 100%;">
          <div class="label">
            单兵类型:
          </div><div class="content">
            {{ info.individualType }}
          </div>
        </div>
        <div class="info-list" style="width: 100%;">
          <div class="label">
            关联数据串:
          </div><div class="content">
            {{ info.individualDeviceId }}
          </div>
        </div>
        <div class="info-list" style="width: 100%;">
          <div class="label">
            联系电话:
          </div><div class="content">
            {{ info.linkPhone }}
          </div>
        </div>
        <div class="info-list" style="width: 100%;">
          <div class="label">
            备注:
          </div><div class="content">
            {{ info.remark }}
          </div>
        </div>
      </div>
      <Maptable
        ref="berthMap"
        :is-edit="false"
        :is-table="false"
        :is-manual="false"
        :tool="['spot']"
        @change="confirmMap"
      />
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
import Maptable from '@/components/Maptable/index'
import { getInfo } from '@/api/individual-soldier/single-pawn/single-pawn'
export default {
  components: {
    Maptable
  },
  data() {
    return {
      info: {},
      geographyInfos:[]
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
    }
    if (this.info.longitude && this.info.latitude) {
      this.initMap()
    }
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 初始化天地图
    initMap() {
      this.geographyInfos = [{
        longitude: this.info.longitude,
        latitude: this.info.latitude
      }]
      this.$nextTick(() => {
        this.$refs.berthMap.init(this.geographyInfos)
      })
    }
  }
}
</script>
