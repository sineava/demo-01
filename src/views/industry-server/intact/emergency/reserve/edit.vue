<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急物资储备点详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="160px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          label="应急物资储备点名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item label="所属企业/部门:">
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="所属港区:"
          prop="harbourDistrictId"
        >
          <el-select
            v-model="ruleForm.harbourDistrictId"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in portAreaVoList"
              :key="item.id"
              :label="item.portAreaName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contact"
        >
          <el-input v-model.trim="ruleForm.contact" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="contactPhone"
        >
          <el-input v-model.trim="ruleForm.contactPhone" />
        </el-form-item>
        <el-form-item
          label="储备点位置:"
          prop="address"
        >
          <el-input v-model.trim="ruleForm.address" />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <MapPoint
            ref="map"
            disabled
          />
        </el-form-item>
      </el-form>
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
import MapPoint from '@/components/features/MapPoint'
import { queryDetail } from '@/api/emergency-services/material-storage'
import { getPortArea } from '@/api/port-services/coastline/coastline-planning'
export default {
  components: {
    MapPoint
  },
  data() {
    return {
      type: '',
      portAreaVoList: [],
      ruleForm: {}
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.fetchPortArea()
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    // 查询港区信息
    fetchPortArea() {
      getPortArea().then(res => {
        if (res.data) {
          this.portAreaVoList = res.data ? res.data[0].portAreaVoList : []
        }
      })
    },
    // 查询详情(必须同步)
    fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data
          }
          this.$refs.map.setFormData({
            address: res.data.address,
            longitude: res.data.longitude,
            latitude: res.data.latitude
          })
        }
      })
    }
  }
}
</script>
