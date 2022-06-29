<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增危险货物存量' : type === 'edit' ? '编辑危险货物存量' : '危险货物存量详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
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
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'name', value: 'id', children: 'businessDistrictVoList' }"
            style="width: 100%;"
            placeholder="请选择所属区域"
            @change="handleChange"
          />
        </el-form-item>
        <div class="icon-title">
          <span class="span" />基础信息
        </div>
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
          <el-input v-model.trim="ruleForm.equipmentName" placeholder="请输入存储设备" maxlength="100" />
        </el-form-item>
        <el-form-item
          label="存储设备容积"
          prop="volume"
        >
          <el-input-number
            v-model="ruleForm.volume"
            :precision="2"
            :min="0"
            :max="999999"
            style="width: 100%;"
            placeholder="请输入存储设备容积"
          />
        </el-form-item>
        <el-form-item
          label="单位:"
          prop="company"
        >
          <el-input v-model.trim="ruleForm.company" placeholder="请输入单位" maxlength="100" />
        </el-form-item>
        <el-form-item
          label="记录人:"
          prop="recorderBy"
        >
          <el-input v-model.trim="ruleForm.recorderBy" placeholder="请输入记录人" maxlength="50" />
        </el-form-item>
        <div class="icon-title">
          <span class="span" /><i class="required" style="margin-right: 10px;" />地理信息
        </div>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <Maptable
            ref="map"
            :is-edit="type === 'detail' ? false :true"
            :tool="['spot']"
            :isManual="false"
            :isTable="false"
            @change="confirmMap"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
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
import { getArea } from '@/api/port-services/coastline/wharf'
import { addEquipment, getDetail } from '@/api/port-services/danger-goods/stock-equipment'
import Maptable from '@/components/Maptable/index'
import { disposalRecord } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
export default {
  components: {
    Maptable
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
        storageType: 1,
        volume: undefined,
        company: ''
      },
      geographyInfos:[],
      loading:false,
      storageType: [
        { value: 1, label: '储罐' }
      ],
      rules: {
        coastlineId: [
          { required: true, message: '请选择所属区域', trigger: 'blur' }
        ],
        equipmentName: [
          { required: true, message: '请输入存储设备', trigger: 'blur' }
        ],
        recorderBy: [
          { required: true, message: '请输入记录人', trigger: 'blur' }
        ],
        volume: [
          { required: true, message: '请输入存储设备容积', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ]
      },
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
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    }
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = { ...res.data }
        this.geographyInfos = [{
          longitude: res.data.longitude,
          latitude: res.data.latitude
        }]
        this.$nextTick(() => {
          this.$refs.map.init(this.geographyInfos)
        })
      })
    },
    // 查询区域列表
    async fetchPortArea() {
      getArea().then(res => {
        this.portAreaVoList = res.data ? res.data[0].portAreaVoList.map(item => ({
          ...item,
          disabled: true,
          name: item.portAreaName,
          businessDistrictVoList: item.businessDistrictVoList.map(x => ({ ...x }))
        })) : []
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/portdangerousgoods/situation' })
    },
    // 保存数据
    saveData() {
      if (!this.geographyInfos || this.geographyInfos.length===0){
        this.$message.error('请标记地理位置')
        return false
      }
      // 拿取表单组件数据
      const mapForm = {
        longitude:this.geographyInfos[0].longitude,
        latitude:this.geographyInfos[0].latitude
      }
      const dangerousGoodsStockEquipmentDto = {
        ...this.ruleForm,
        ...mapForm,
        coastlineId: this.ruleForm.coastlineId[this.ruleForm.coastlineId.length - 1]
      }
      delete dangerousGoodsStockEquipmentDto.address
      this.loading = true
      addEquipment(dangerousGoodsStockEquipmentDto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 级联改变
    handleChange(val) {
      if (val.length) {
        this.channelId = this.$refs.cascader.getCheckedNodes()[0].data.channel
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }
}
</style>
