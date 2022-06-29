<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'add' ? '新增危险货物存量' : type === 'edit' ? '编辑危险货物存量' : '危险货物存量详情' }}</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item label="所属企业:">
          <el-input
            :value="user_info.orgname"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="所属区域:"
          prop="coastlineId"
        >
          <el-cascader
            ref="cascader"
            v-model="ruleForm.coastlineId"
            :options="portAreaVoList"
            :show-all-levels="false"
            clearable
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'coastlineName', value: 'id', children: 'businessDistrictVoList' }"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />基础信息
          </div>
        </el-form-item>
        <el-form-item
          label="存储类型:"
          prop="storageType"
        >
          <el-select
            v-model="ruleForm.storageType"
            clearable
            placeholder="请选择"
            style="width: 100%;"
            disabled
          >
            <el-option
              v-for="item in storageType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="存储设备:"
          prop="equipmentName"
        >
          <el-input v-model.trim="ruleForm.equipmentName" />
        </el-form-item>
        <el-form-item
          label="记录人:"
          prop="recorderBy"
        >
          <el-input v-model.trim="ruleForm.recorderBy" />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <MapPoint
            ref="map"
            :show-address="false"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import MapPoint from '@/components/features/MapPoint'
import { disposalRecord } from '@/utils/public-fields'
import { getArea } from '@/api/port-services/coastline/wharf'
import { getDetail } from '@/api/port-services/danger-goods/stock-equipment'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
export default {
  components: {
    MapPoint
  },
  mixins: [disposalRecord],
  data() {
    return {
      ruleForm: {
        coastlineId: '',
        enterpriseId: '',
        enterpriseName: '',
        equipmentName: '',
        id: null,
        latitude: '',
        longitude: '',
        recorderBy: '',
        storageType: 1
      },
      storageType: [
        { value: 1, label: '储罐' }
      ],
      portAreaVoList: []
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    this.fetchPortArea()
    const { type, id } = this.$route.query
    this.type = type
    // 查询关联企业信息
    findByUserId().then(res => {
      this.ruleForm.enterpriseName = res.data ? res.data.enterpriseName : ''
      this.ruleForm.enterpriseId = res.data ? res.data.id : ''
    })
    if (id) this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = { ...res.data }
        this.$refs.map.setFormData({
          longitude: res.data.longitude,
          latitude: res.data.latitude
        })
      })
    },
    // 查询区域列表
    async fetchPortArea() {
      getArea().then(res => {
        this.portAreaVoList = res.data ? res.data[0].portAreaVoList.map(item => ({ ...item, coastlineName: item.portAreaName, disabled: true })) : []
      })
    }
  }
}
</script>
