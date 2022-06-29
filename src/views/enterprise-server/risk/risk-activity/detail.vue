<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业风险作业单元划分详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 风险作业单元信息
    </div>
    <el-row :gutter="20">
      <el-form
        ref="ruleForm"
        size="medium"
        label-width="120px"
        :model="ruleForm"
        :rules="rules"
        :disabled="!isEdit"
      >
        <el-col :span="8">
          <el-form-item
            label="风险辨识范围:"
            prop="scopeId"
          >
            <el-select
              v-model="ruleForm.scopeId"
              style="width: 100%;"
              placeholder="请选择风险辨识范围"
            >
              <el-option
                v-for="item in scopeList"
                :key="item.id"
                :label="item.scopeName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="风险作业单元:"
            prop="scopeId"
          >
            <el-select
              v-model="ruleForm.activityId"
              style="width: 100%;"
              placeholder="请选择风险作业单元"
            >
              <el-option
                v-for="item in activityList"
                :key="item.id"
                :label="item.activityName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="排序:"
            prop="sortNum"
          >
            <el-input-number
              v-model="ruleForm.sortNum"
              :min="1"
              :max="99999"
              placeholder="请输入排序序号"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="所属企业名称:"
            prop="enterpriseName"
          >
            <el-input
              v-model="ruleForm.enterpriseName"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="企业类型:"
            prop="enterpriseType"
          >
            <el-input
              :value="getEnterpriseTypeName(ruleForm.enterpriseType)"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="作业区域:"
            prop="taskArea"
          >
            <el-input
              v-model="ruleForm.taskArea"
              type="textarea"
              placeholder="请输入作业区域"
              maxlength="200"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="作业场所:"
            prop="taskPlace"
          >
            <el-input
              v-model="ruleForm.taskPlace"
              type="textarea"
              placeholder="请输入作业场所"
              maxlength="200"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="作业活动:"
            prop="taskActivity"
          >
            <el-input
              v-model="ruleForm.taskActivity"
              type="textarea"
              placeholder="请输入作业活动"
              maxlength="200"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <Maptable
      ref="businessBaseMap"
      :is-edit="isEdit"
      :tool="['spot']"
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
import { addData, getInfo, updateData, findEnByUserId, getScopeList, findActivityList } from '@/api/port-services/risk-identification/risk-activity'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    Maptable
  },
  data() {
    return {
      ruleForm: {
        id: '',
        scopeId: '',
        activityId: ''
      },
      isEdit: false,
      geographyInfos:[],
      rules: {
        scopeId: [
          { required: true, message: '请选择风险辨识范围', trigger: 'change' }
        ],
        activityId: [
          { required: true, message: '请选择风险作业单元', trigger: 'change' }
        ],
        taskArea: [
          { required: true, message: '请输入作业区域', trigger: 'blur' }
        ],
        taskPlace: [
          { required: true, message: '请输入作业场所', trigger: 'blur' }
        ],
        taskActivity: [
          { required: true, message: '请输入作业活动', trigger: 'blur' }
        ],
        sortNum: [
          { required: true, message: '请输入排序序号', trigger: 'blur' }
        ],
        /*
         * longitude: [
         *   { required: true, message: '请输入经度', trigger: 'blur' }
         * ],
         * latitude: [
         *   { required: true, message: '请输入纬度', trigger: 'blur' }
         * ]
         */
      },
      loading: false,
      scopeList: [],
      activityList: ''
    }
  },
  watch: {
    'ruleForm.scopeId'(val) {
      this.getActivityList()
    }
  },
  // 返回
  returnBack() {
    this.$router.push({ path: '/risk/risk-activity' })
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit || false
    // 查询风险范围列表
    this.scopeList = (await getScopeList()).data
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.ruleForm = { ...info.data }
      if (info.data && info.data.latitude && info.data.longitude){
        this.geographyInfos = [
          {latitude:info.data.latitude,longitude:info.data.longitude}
        ]
      }
      delete this.ruleForm.isEnable
    } else {
      // 获取当前用户关联的企业信息(风险辨识使用)
      const userInfo = (await findEnByUserId()).data
      this.ruleForm = {
        enterpriseId:userInfo.id,
        enterpriseName:userInfo.enterpriseName,
        enterpriseType:userInfo.enterpriseType,
        sortNum:undefined,
        scopeId: '',
        activityId: '',
      }
    }
    this.initMap()
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 通过风险范围查询风险单元列表
    async getActivityList() {
      this.activityList = (await findActivityList({ scopeId: this.ruleForm.scopeId })).data
    },
    // 通过企业类型获取类别名称
    getEnterpriseTypeName(key) {
      const list = [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
      return list.filter(item => item.key === key)[0].val
    },
    // 初始化天地图
    initMap() {
      this.$nextTick(() => {
        if (this.$refs.businessBaseMap){
          this.$refs.businessBaseMap.init(this.geographyInfos)
        }
      })
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
    async save() {
      if (this.geographyInfos.length===0){
        this.$message.error('请标记地图位置')
        return false
      }
      let data = { ...this.ruleForm }
      data.latitude = this.geographyInfos[0].latitude
      data.longitude = this.geographyInfos[0].longitude
      delete data.scopeName
      delete data.activityName
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
