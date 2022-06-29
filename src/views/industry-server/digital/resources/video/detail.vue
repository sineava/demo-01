<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="isEdit ? '修改视频监控':'视频监控详情'" />
      </span>
    </div>
    <el-row :gutter="20">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="90px"
        :disabled="isEdit?false:true"
      >
        <el-col :span="12">
          <el-form-item
            label="设备名称:"
            class="top-form-item"
            prop="name"
          >
            <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入设备名称" />
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
              style="width: 100%;"
              placeholder="请选择所属港区"
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
        <el-col :span="12">
          <!-- 视频监控 -->
          <el-form-item
            label="设备型号:"
            prop="unitType"
          >
            <el-input v-model.trim="ruleForm.unitType" placeholder="请输入设备型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="投入时间:"
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
            label="所属码头:"
            prop="wharfId"
          >
            <el-select
              v-model="ruleForm.wharfId"
              filterable
              style="width: 100%;"
              placeholder="请选择所属码头"
              @change="getWharfName"
            >
              <el-option
                v-for="item in wharfList"
                :key="item.id"
                :label="item.wharfName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="描述:"
            prop="remark"
            style="width: 100%;"
          >
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              :rows="6"
              show-word-limit
              maxlength="1000"
              placeholder="请输入描述"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="icon-title">
      <span class="span" /> 地理信息
    </div>
    <Maptable
      ref="map"
      :tool="['spot']"
      :isEdit="isEdit"
      :isManual="true"
      @change="confirmMap"
    />
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
        { label: '视频监控点', value: 9 }
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
        videoLink:'',
        cameraRegion:[],
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
        /*
         * harbourDistrictId: [
         *   { required: true, message: '请选择所属港区', trigger: 'change' }
         * ],
         * orgId: [
         *   { required: true, message: '请选择所属单位', trigger: 'change' }
         * ],
         * companyId: [
         *   { required: true, message: '请选择所属企业', trigger: 'change' }
         * ],
         */
        unitType: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        cameraRegion:[
          { required: true, message: '请选择视频区域', trigger: 'blur' }
        ]
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
