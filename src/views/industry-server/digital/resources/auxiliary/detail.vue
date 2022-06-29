<template>
  <el-card class="body-card base-ruleForm">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="添加详情" />
      </span>
    </div>
    <el-row :gutter="20">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        :disabled="isEdit?false:true"
      >
        <el-col :span="12">
          <el-form-item
            :label="`${ruleForm.type === 5 ? '泵房' : '设备'}名称:`"
            prop="name"
          >
            <el-input v-model.trim="ruleForm.name" maxlength="100" :placeholder="`请输入${ruleForm.type === 5 ? '泵房' : '设备'}名称`" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="分类:"
            prop="type"
          >
            <el-select
              v-model="ruleForm.type"
              class="top-form-item"
              style="width: 100%;"
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所属港区:"
            prop="harbourDistrictId"
          >
            <el-select
              v-model="ruleForm.harbourDistrictId"
              filterable
              class="top-form-item"
              placeholder="请选择所属港区"
              style="width: 100%;"
              @change="getHarbourDistrictName"
            >
              <el-option
                v-for="item in portAreaList"
                :key="item.id"
                :label="item.portAreaName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所属单位:"
            prop="orgId"
          >
            <el-select
              v-model="ruleForm.orgId"
              filterable
              style="width: 100%;"
              class="top-form-item"
              placeholder="请选择所属单位"
              @change="getOrgName"
            >
              <el-option
                v-for="item in orgList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <div
          v-if="ruleForm.type"
          class="icon-title"
        >
          <span class="span" /> 辅助设施设备信息
        </div>
        <template
          v-if="ruleForm.type&&ruleForm.type<8&&ruleForm.type!==5"
        >
          <el-col :span="12">
            <el-form-item
              label="所属企业:"
              prop="companyId"
            >
              <el-select
                v-model="ruleForm.companyId"
                filterable
                style="width: 100%;"
                placeholder="请选择所属企业"
                @change="getCompanyName"
              >
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.enterpriseId"
                  :label="item.enterpriseName"
                  :value="item.enterpriseId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="ruleForm.type<3"
              label="常住人数:"
              prop="residentPeople"
            >
              <el-input-number
                v-model="ruleForm.residentPeople"
                :min="1"
                :controls="false"
                :max="99999999"
                placeholder="请输入常住人数"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </template>
        <!-- 变电室/配电室 -->
        <template
          v-if="ruleForm.type === 3 || ruleForm.type === 4"
        >
          <el-col :span="12">
            <el-form-item
              label="配电电压(V):"
              prop="distributionVoltage"
            >
              <el-input-number
                v-model="ruleForm.distributionVoltage"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入配电电压(V)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="电力负荷(KV):"
              prop="powerLoad"
            >
              <el-input-number
                v-model="ruleForm.powerLoad"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入电力负荷(KV)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="总装机容量(kW):"
              prop="installedCapacity"
            >
              <el-input-number
                v-model="ruleForm.installedCapacity"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入总装机容量(千瓦)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="供电范围(㎡):"
              prop="supplyDistrict"
            >
              <el-input-number
                v-model="ruleForm.supplyDistrict"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入供电范围(平方米)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="用途:"
              prop="purpose"
            >
              <el-input v-model.trim="ruleForm.purpose" maxlength="100" placeholder="请输入用途" />
            </el-form-item>
          </el-col>
        </template>
        <!-- 生产泵房 -->
        <template
          v-if="ruleForm.type === 5"
        >
          <el-col :span="12">
            <el-form-item
              label="泵序号:"
              prop="pumpSerialNumber"
            >
              <el-input-number
                v-model="ruleForm.pumpSerialNumber"
                :min="1"
                :controls="false"
                :max="99999999"
                style="width: 100%;"
                placeholder="请输入泵序号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵名称或编号:"
              prop="pumpName"
            >
              <el-input v-model.trim="ruleForm.pumpName" maxlength="30" placeholder="请输入泵名称或编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所属企业:"
              prop="companyId"
            >
              <el-select
                v-model="ruleForm.companyId"
                filterable
                class="top-form-item"
                placeholder="请选择所属企业"
                style="width: 100%;"
                @change="getCompanyName"
              >
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.enterpriseId"
                  :label="item.enterpriseName"
                  :value="item.enterpriseId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵房类型:"
              prop="pumpRoomType"
            >
              <el-input v-model.trim="ruleForm.pumpRoomType" maxlength="50" placeholder="请输入泵房类型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵种类:"
              prop="pumpType"
            >
              <el-input v-model.trim="ruleForm.pumpType" maxlength="30" placeholder="请输入泵种类" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵数量:"
              prop="pumpNumber"
            >
              <el-input-number
                v-model="ruleForm.pumpNumber"
                :min="0"
                :max="99999999"
                :controls="false"
                style="width: 100%;"
                placeholder="请输入泵序号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵功率:"
              prop="pumpPower"
            >
              <el-input-number
                v-model="ruleForm.pumpPower"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入泵功率"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="泵扬程:"
              prop="pumpLift"
            >
              <el-input v-model.trim="ruleForm.pumpLift" maxlength="50" placeholder="请输入泵扬程" />
            </el-form-item>
          </el-col>
        </template>
        <!-- 防火堤 -->
        <template
          v-if="ruleForm.type === 7"
        >
          <el-col :span="12">
            <el-form-item
              label="高度(m):"
              prop="altitude"
            >
              <el-input-number
                v-model="ruleForm.altitude"
                :precision="2"
                :min="1"
                :controls="false"
                :max="999999999.99"
                style="width: 100%;"
                placeholder="请输入高度"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="长度(m):"
              prop="extent"
            >
              <el-input-number
                v-model="ruleForm.extent"
                :precision="2"
                :min="1"
                :controls="false"
                :max="999999999.99"
                style="width: 100%;"
                placeholder="请输入长度"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="容积(m³):"
              prop="cubage"
            >
              <el-input-number
                v-model="ruleForm.cubage"
                :precision="3"
                :min="1"
                :controls="false"
                :max="999999999.999"
                style="width: 100%;"
                placeholder="请输入容积(m³)"
              />
            </el-form-item>
          </el-col>
        </template>
        <template
          v-if="(ruleForm.type>2&&ruleForm.type<6)||ruleForm.type===7"
        >
          <el-col :span="12">
            <el-form-item
              v-if="ruleForm.type !== 2&&ruleForm.type !== 7"
              label="投用时间:"
              prop="putIntoUseTime"
            >
              <el-date-picker
                v-model="ruleForm.putIntoUseTime"
                type="date"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系人:"
              prop="linkman"
            >
              <el-input v-model.trim="ruleForm.linkman" maxlength="20" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话:"
              prop="phone"
            >
              <el-input v-model.trim="ruleForm.phone" maxlength="11" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </template>
        <!-- 客运站(候船大厅) -->
        <template
          v-if="ruleForm.type === 8"
        >
          <el-col :span="12">
            <el-form-item
              label="主要航线:"
              prop="mainRoutes"
            >
              <el-input v-model.trim="ruleForm.mainRoutes" maxlength="100" placeholder="请输入主要航线" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="人员通道:"
              prop="staffPassage"
            >
              <el-input v-model.trim="ruleForm.staffPassage" maxlength="100" placeholder="请输入人员通道" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="车辆通道:"
              prop="vehicleAccessRoad"
            >
              <el-input v-model.trim="ruleForm.vehicleAccessRoad" maxlength="100" placeholder="请输入车辆通道" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="值班电话:"
              prop="dutyPhone"
            >
              <el-input v-model.trim="ruleForm.dutyPhone" maxlength="11" placeholder="请输入值班电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联络人:"
              prop="linkman"
            >
              <el-input v-model.trim="ruleForm.linkman" maxlength="20" placeholder="请输入联络人" />
            </el-form-item>
          </el-col>
        </template>
      </el-form>
      <div class="icon-title">
        <span class="span" /> 地理信息
      </div>
      <Maptable
        ref="map"
        :isEdit="isEdit"
        @change="confirmMap"
      />
    </el-row>
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
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
import { addData, getInfo, updateData } from '@/api/data-management/resources/auxiliary-facilities'
import { getOrgList, queryEnterprise, getPortAreaList, getWharfList } from '@/api/data-management/resources/other'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    Maptable
  },
  data() {
    return {
      typeList:[
        { label: '办公楼', value: 1 },
        { label: '控制室', value: 2 },
        { label: '变电室', value: 3 },
        { label: '配电室', value: 4 },
        { label: '生产泵房', value: 5 },
        { label: '排河口', value: 6 },
        { label: '防火堤', value: 7 },
        { label: '客运站(侯船大厅)', value: 8 },
        // { label: '视频监控点', value: 9 }
      ],
      videoList:[],
      currentpage:1,
      pageSize:20,
      total:0,
      regionIndexCode:'',
      auxiliary:[],
      ruleForm: {
        id: '',
        type: '',
        name: '',
        harbourDistrictId: '',
        harbourDistrict: '',
        orgId: '',
        orgName: '',
        companyId: '',
        companyName: '',
        wharfId: '',
        wharf: '',
        geographyInfos: [
          {
            longitude: '',
            latitude: ''
          }
        ]
      },
      isEdit: true,
      rules: {
        type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        harbourDistrictId: [
          { required: true, message: '请选择所属港区', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择所属单位', trigger: 'change' }
        ],
        companyId: [
          { required: true, message: '请选择所属企业', trigger: 'change' }
        ],
        pumpSerialNumber: [
          { required: true, message: '请输入泵序号', trigger: 'blur' }
        ],
        pumpName: [
          { required: true, message: '请输入泵名称或编号', trigger: 'blur' }
        ],
        putIntoUseTime: [
          { required: true, message: '请选择投用时间', trigger: 'change' }
        ],
        mainRoutes: [
          { required: true, message: '请输入主要航线', trigger: 'blur' }
        ],
        unitType: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        /*
         * wharfId: [
         *   { required: true, message: '请选择所属码头', trigger: 'change' }
         * ]
         */
      },
      loading: false,
      enterpriseList: [],
      orgList: [],
      portAreaList: [],
      wharfList: []
    }
  },
  computed: {
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    // 获取单位列表
    this.orgList = (await getOrgList()).data
    // 获取企业列表
    this.enterpriseList = (await queryEnterprise({ enterpriseName: '' })).data
    // 港区列表
    this.portAreaList = (await getPortAreaList()).data
    // 码头列表
    this.wharfList = (await getWharfList()).data
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.ruleForm = { ...info.data }
      this.$refs.map.init(info.data.geographyInfos)
    }
  },
  methods: {
    // 获取港区名称
    getHarbourDistrictName() {
      this.ruleForm.harbourDistrict = this.portAreaList.filter(item => item.id === this.ruleForm.harbourDistrictId)[0].portAreaName
    },
    // 获取单位名称
    getOrgName() {
      this.ruleForm.orgName = this.orgList.filter(item => item.orgId === this.ruleForm.orgId)[0].orgName
    },
    // 获取所属企业名称
    getCompanyName() {
      this.ruleForm.companyName = this.enterpriseList.filter(item => item.enterpriseId === this.ruleForm.companyId)[0].enterpriseName
    },
    // 获取所属码头名称
    getWharfName() {
      this.ruleForm.wharf = this.wharfList.filter(item => item.id === this.ruleForm.wharfId)[0].wharfName
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.ruleForm.geographyInfos = val
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    handleCurrentChange(val){
      this.currentpage = val
      this.getVideo()
    },
    getCameraName(cameraIndexCode){
      let cameraName = ''
      this.videoList.forEach(item=>{
        if (item.cameraIndexCode===cameraIndexCode){
          cameraName = item.cameraName
          return false
        }
      })
      return cameraName
    },
    async save() {
      this.ruleForm.geographyInfos.forEach((item, index) => {
        delete item.id
        item.sort = index + 1
      })
      let data = { ...this.ruleForm }
      delete data.deviceName
      delete data.harborId
      delete data.harbor
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-ruleForm {
    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}

/deep/ .table-top-column-there {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
        padding: 0 10px;
        width: 33.33%;

        &.top-form-item {
            width: 50%;
        }

        .el-select {
            width: 100%;
        }
    }
}
</style>
