<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增应急演练情况' : type === 'edit' ? '编辑应急演练情况' : '应急演练情况详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        v-if="type !== 'edit'"
        ref="detailForm"
        :model="detailForm"
        label-width="80px"
        size="medium"
      >
        <div class="icon-title">
          <span class="span" />演练计划信息
        </div>
        <el-form-item v-if="oper==='add'" label="计划名称:" style="margin: 0 0 10px 0;">
          <el-select
            v-model="planName"
            clearable
            placeholder="请选择计划名称"
            style="width: 100%;"
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <template v-if="planName !== ''">
          <Plan ref="plan" :dataObj="detailForm" />
        </template>
      </el-form>
      <div class="icon-title">
        <span class="span" />演练情况信息
      </div>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
        class="add-yjylqk"
      >
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item v-if="!planName" :span="2">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />单位名称:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              :prop="planName ? 'enterpriseName' : ''"
            >
              <el-input
                v-model="ruleForm.enterpriseName"
                :disabled="planName !== '' || type === 'edit'"
                maxlength="100"
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <span v-else>{{ detailForm.enterpriseName }}</span>
          </el-descriptions-item>

          <el-descriptions-item v-if="!planName">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演习类型:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              :prop="planName ? 'actingType' : ''"
            >
              <el-input
                v-model="ruleForm.actingType"
                :disabled="planName !== '' || type === 'edit'"
                maxlength="30"
                placeholder="请输入演习类型"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actingType }}</span>
          </el-descriptions-item>
          <el-descriptions-item v-if="!planName">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />年度计划:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planType">
              <el-radio-group v-model="ruleForm.planType">
                <el-radio :label="1">
                  应急演练
                </el-radio>
                <el-radio :label="2">
                  综合演练
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <span v-else>{{ ['应急演练','综合演练'][detailForm.planType-1] }}</span>
          </el-descriptions-item>
          <el-descriptions-item v-if="!planName">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演习名称:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              :prop="planName ? 'name' : ''"
            >
              <el-input
                v-model="ruleForm.name"
                :disabled="planName !== '' || type === 'edit'"
                maxlength="100"
                placeholder="请输入演习名称"
              />
            </el-form-item>
            <span v-else>{{ detailForm.name }}</span>
          </el-descriptions-item>

          <el-descriptions-item v-if="!planName">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演习类型细类:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              :prop="planName ? 'actingTypeDetailed' : ''"
            >
              <el-input
                v-model="ruleForm.actingTypeDetailed"
                :disabled="planName !== '' || type === 'edit'"
                maxlength="30"
                placeholder="请输入演习类型细类"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actingType }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练牵头单位:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualOriginator"
            >
              <el-input v-model.trim="ruleForm.actualOriginator" maxlength="100" placeholder="请输入演练牵头单位" />
            </el-form-item>
            <span v-else>{{ detailForm.actualOriginator }}</span>
          </el-descriptions-item>

          <!-- 新增字段 -->
          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />主办单位:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualOrganizer"
            >
              <el-input v-model.trim="ruleForm.actualOrganizer" maxlength="100" placeholder="请输入主办单位" />
            </el-form-item>
            <span v-else>{{ detailForm.actualOrganizer }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />参演人数:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="actualPersons">
              <el-input-number
                v-model="ruleForm.actualPersons"
                :min="0"
                :max="10000000"
                :controls="false"
                placeholder="请输入参演人数"
                class="table-number"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.actualPersons }}</span>
          </el-descriptions-item>

          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />参演单位:</template>
            <el-tag
              v-for="(item,index) in actualOrganization"
              :key="index"
              closable
              :disable-transitions="false"
              style="margin: 5px;"
              @close="handleClose(index)"
            >
              {{ item }}
            </el-tag>
            <el-button
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="addActualOrganization"
            />
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />开始演练时间:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualStartTime"
            >
              <el-date-picker
                v-model="ruleForm.actualStartTime"
                type="datetime"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actualStartTime }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />结束演练时间:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualEndTime"
            >
              <el-date-picker
                v-model="ruleForm.actualEndTime"
                type="datetime"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actualEndTime }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练时长（h）:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="actualDays">
              <el-input-number
                v-model="ruleForm.actualDays"
                :min="0"
                :max="10000000"
                :precision="1"
                :controls="false"
                placeholder="请输入演练时长（h）"
                class="table-number"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.actualDays }}</span>
          </el-descriptions-item>

          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练地点:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualAddress"
            >
              <el-input v-model.trim="ruleForm.actualAddress" placeholder="请输入演练地点" />
            </el-form-item>
            <span v-else>{{ detailForm.actualAddress }}</span>
          </el-descriptions-item>

          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练流程及内容描述:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualDescribe"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.actualDescribe"
                type="textarea"
                rows="6"
                placeholder="请输入演练流程及内容描述"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actualDescribe }}</span>
          </el-descriptions-item>
          <!-- 新增字段 -->
          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练总结与评定:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="practiceSummary"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.practiceSummary"
                type="textarea"
                rows="6"
                placeholder="请输入演练总结与评定"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ detailForm.practiceSummary }}</span>
          </el-descriptions-item>

          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练方案:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualProject"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.actualProject"
                type="textarea"
                rows="6"
                placeholder="请输入演练方案"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actualProject }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />填报人:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualInformant"
            >
              <el-input v-model.trim="ruleForm.actualInformant" maxlength="20" placeholder="请输入填报人" />
            </el-form-item>
            <span v-else>{{ detailForm.actualInformant }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />填报人联系电话:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualInformantPhone"
            >
              <el-input v-model.trim="ruleForm.actualInformantPhone" maxlength="11" placeholder="请输入填报人联系电话" />
            </el-form-item>
            <span v-else>{{ detailForm.actualInformantPhone }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />填报时间:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualFillInTime"
            >
              <el-date-picker
                v-model="ruleForm.actualFillInTime"
                type="datetime"
                style="width: 100%;"
                placeholder="请选择填报时间"
              />
            </el-form-item>
            <span v-else>{{ detailForm.actualFillInTime }}</span>
          </el-descriptions-item>

          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练情况图片:</template>
            <el-form-item
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              prop="actualPicture"
            >
              <upload
                :file-list="imgList"
                :limit="5"
                multiple
                :show-download="true"
                @success="uploadImgSuccess"
                @remove="uploadRemove"
              />
            </el-form-item>
          </el-descriptions-item>
          <!-- 新增字段 -->
          <el-descriptions-item :span="3">
            <template slot="label">演练情况视频:</template>
            <span
              v-if="oper==='add' || oper==='edit' || oper==='change'"
              style="display: inline-block; float: left; margin: 0 10px 0 0;"
            >
              <el-form-item style="margin: 50px 0;">
                <upload
                  :limit="1"
                  :file="true"
                  :multiple="false"
                  fileAccept=".mp4"
                  tips="仅可上传mp4的视频文件，上传文件大小不得超过500m"
                  :size="500"
                  @success="uploadVideoSuccess"
                  @remove="uploadVideoRemove"
                />
              </el-form-item>
            </span>
            <video
              v-if="videoPath"
              style="display: inline-block;"
              height="200"
              controls
            >
              <source :src="videoPath" type="video/mp4">
              您的浏览器不支持 video 标签。
            </video>
          </el-descriptions-item>
        </el-descriptions>
        <!-- 选择计划自动填充 -->

        <el-form-item
          label="附件"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.detailsFilePath"
            multiple
            :size="500"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          prop="detailsFilePath"
          style="width: 100%;"
        >
          <FileTable
            :show-download="true"
            :table-data="fileList"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="oper==='add' || oper==='edit'"
        type="primary"
        size="medium "
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
    <el-dialog
      title="添加参演单位"
      :visible.sync="dialogVisible"
      width="500px"
      top="250px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      custom-class="add-company"
    >
      <el-form
        ref="personsForm"
        :model="personsForm"
        :rules="personsRules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="单位名称" prop="name">
          <el-input v-model.trim="personsForm.name" placeholder="请输入参演单位名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="personsSubmitForm('personsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { momentDate,fileUrlAssemble } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { findNoDrills, queryDetail, saveCaseNoExistEntity, saveCaseExistEntity, updateById } from '@/api/emergency-services/exercise-case'
import { telephone } from '@/utils/validate'
import Plan from './plan'
export default {
  components: {
    upload,
    FileTable,
    Plan
  },
  data() {
    let isRepeat = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入参演单位名称'))
      } else {
        if (this.actualOrganization.indexOf(value)!==-1){
          callback(new Error('参演单位已存在'))
        } else {
          callback()
        }
      }
    }
    return {
      type: '',
      planName: '',
      loading:false,
      options: [],
      videoPath:'',
      oper:'add',
      dialogVisible:false,
      planId:'',
      detailForm: {}, // 详情表单(不可编辑)
      actualOrganization:[],
      ruleForm: { // 演练情况信息(可编辑)
        actualPersons: undefined,
        actualDays: undefined,
        actualPicture:[]
      },
      personsForm:{
        name:''
      },
      personsRules:{
        name: [
          { required: true, message: '请输入参演单位名称', trigger: 'blur' },
          { validator: isRepeat, trigger: 'blur' }
        ],
      },
      imgList: [], // 图片列表
      fileList: [], // 附件列表
      rules: {
        enterpriseName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入演习名称', trigger: 'blur' }
        ],
        actingType: [
          { required: true, message: '请输入演习类型', trigger: 'blur' }
        ],
        actingTypeDetailed: [
          { required: true, message: '请输入演戏类型细类', trigger: 'blur' }
        ],
        actualOrganizer:[
          { required: true, message: '请输入主办单位', trigger: 'blur' }
        ],
        actualStartTime: [
          { required: true, message: '请选择演习开始时间', trigger: 'blur' }
        ],
        actualDays: [
          { required: true, message: '请输入演练时长', trigger: 'blur' }
        ],
        actualAddress: [
          { required: true, message: '请输入演习地点', trigger: 'blur' }
        ],
        actualOriginator: [
          { required: true, message: '请输入演习组织机构', trigger: 'blur' }
        ],
        actualOrganization: [
          { required: true, message: '请输入参演单位', trigger: 'blur' }
        ],
        actualPersons: [
          { required: true, message: '请输入参演人数', trigger: 'blur' }
        ],
        actualDescribe: [
          { required: true, message: '请输入演练流程及内容描述', trigger: 'blur' }
        ],
        actualProject: [
          { required: true, message: '请输入演练方案', trigger: 'blur' }
        ],
        actualInformant: [
          { required: true, message: '请输入填报人', trigger: 'blur' }
        ],
        actualInformantPhone: [
          { required: true, message: '请输入填报人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        actualFillInTime: [
          { required: true, message: '请输入填报时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, oper } = this.$route.query
    this.oper = oper
    if (id) {
      this.fetchDetail(id)
    }
    this.fetchPlans('')
  },
  methods: {
    addActualOrganization(){
      this.personsForm.name = ''
      this.dialogVisible = true
    },
    handleClose(index){
      this.actualOrganization.splice(index,1)
    },
    // 保存
    personsSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.actualOrganization.push(this.personsForm.name)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    async fetchDetail(id) {
      queryDetail({ id }).then(async res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            actualPicture: JSON.parse(res.data.actualPicture) || [],
            detailsFilePath: JSON.parse(res.data.detailsFilePath) || [],
            planFilePath: JSON.parse(res.data.planFilePath) || []
          }
          this.imgList = this.ruleForm.actualPicture
          this.actualOrganization = this.ruleForm.actualOrganization ? this.ruleForm.actualOrganization.split(',') : []
          this.detailForm = { ...res.data }
          this.planName = res.data.name || ''
          this.fileList = this.ruleForm.detailsFilePath
          this.initVideo(this.ruleForm.videoPath)
        }
      })
    },
    // 查询应急演练计划
    async fetchPlans(val) {
      findNoDrills({ name: val }).then(res => {
        this.options = res.data ? res.data.map(({ id, name }) => ({ value: id, label: name })) : []
      })
    },
    async initVideo(url){
      if (url){
        this.videoPath = await fileUrlAssemble(url)
      }
    },
    // 计划名称改变
    handleChange(val) {
      if (val) {
        queryDetail({ id: val }).then(res => {
          this.planId = ''
          this.detailForm = { ...res.data }
        })
      } else {
        this.detailForm = {}
      }
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
    // 保存数据
    async saveData() {
      if (this.actualOrganization.length===0){
        this.$message.error('请填写参演单位')
        return false
      }
      if (this.imgList.length===0){
        this.$message.error('请上传演练情况图片')
        return false
      }
      this.loading = true
      const dto = {
        actualAddress:this.ruleForm.actualAddress,
        actualDays:this.ruleForm.actualDays,
        actualDescribe:this.ruleForm.actualDescribe,
        actualEndTime:momentDate(this.ruleForm.actualEndTime),
        actualFillInTime:momentDate(this.ruleForm.actualFillInTime),
        actualInformant:this.ruleForm.actualInformant,
        actualInformantPhone:this.ruleForm.actualInformantPhone,
        actualOrganization:this.actualOrganization ? this.actualOrganization.join(',') : '',
        actualOriginator:this.ruleForm.actualOriginator,
        actualPersons:this.ruleForm.actualPersons,
        actualPicture:this.imgList ? JSON.stringify(this.imgList) : '',
        actualProject:this.ruleForm.actualProject,
        actualStartTime:momentDate(this.ruleForm.actualStartTime),
        detailsFilePath:this.fileList ? JSON.stringify(this.fileList) : '',
        id:this.ruleForm.id,
        actualOrganizer:this.ruleForm.actualOrganizer,
        videoPath:this.ruleForm.videoPath,
        practiceSummary:this.ruleForm.practiceSummary
      }
      if (this.oper === 'add') {
        if (this.planName === '') { // 未选择计划
          dto.actingType = this.ruleForm.actingType
          dto.actingTypeDetailed = this.ruleForm.actingTypeDetailed
          dto.name = this.ruleForm.name
          dto.planType = this.ruleForm.planType
          saveCaseNoExistEntity(dto).then(res => {
            this.loading = false
            if (res.code === '0') {
              this.returnBack()
            } else {
              this.$message.error(res.message)
            }
          })
        } else { // 选择了计划
          dto.id = this.detailForm.id
          dto.organizer = this.detailForm.organizer
          saveCaseExistEntity(dto).then(res => {
            this.loading = false
            if (res.code === '0') {
              this.returnBack()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      } else {
        updateById(dto).then(res => {
          this.loading = false
          if (res.code === '0') {
            this.returnBack()
          }
        })
      }
      this.loading = false
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/situation' })
    },
    // 图片上传成功
    uploadImgSuccess(res) {
      this.imgList.push({ url: res.data })
    },
    // 文件上传成功时的钩子
    uploadSuccess(res) {
      this.fileList.push({
        filePath: res.response.data,
        fileName: res.name,
        fileSize: (res.size / 1024 / 1024).toFixed(2),
        createTime: momentDate(res.raw.lastModifiedDate)
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      for (let i=0;i<this.imgList.length;i++){
        if (this.imgList[i].url===file.ydz){
          this.imgList.splice(i,1)
          return false
        }
      }
    },
    uploadVideoRemove(){
      this.ruleForm.videoPath = ''
      this.videoPath = ''
    },
    // 上传视频
    async uploadVideoSuccess(res){
      this.ruleForm.videoPath = res.data
      this.videoPath = ''
      this.videoPath = await fileUrlAssemble(res.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}

.add-yjylqk {
    .el-form-item {
        margin: 0;
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }
}
</style>
