<template>
  <div>
    <div class="basic-detail add-yjyljh">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
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
          <el-descriptions-item label="单位名称:">
            {{ user_info.orgname }}
          </el-descriptions-item>
          <el-descriptions-item>
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
            <span v-else>{{ ['应急演练','综合演练'][ruleForm.planType-1] }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练名称:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="name">
              <el-input v-model.trim="ruleForm.name" placeholder="请输入演练名称" />
            </el-form-item>
            <span v-else>{{ ruleForm.name }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练类型:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="actingType">
              <el-input v-model.trim="ruleForm.actingType" placeholder="请输入演练类型" />
            </el-form-item>
            <span v-else>{{ ruleForm.actingType }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练类型细类:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="actingTypeDetailed">
              <el-input v-model.trim="ruleForm.actingTypeDetailed" placeholder="请输入演练类型细类" />
            </el-form-item>
            <span v-else>{{ ruleForm.actingTypeDetailed }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />演练牵头单位:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planOriginator">
              <el-input v-model.trim="ruleForm.planOriginator" placeholder="请输入演练牵头单位" />
            </el-form-item>
            <span v-else>{{ ruleForm.planOriginator }}</span>
          </el-descriptions-item>
          <!-- 新增字段 -->
          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />主办单位:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="organizer">
              <el-input v-model.trim="ruleForm.organizer" placeholder="请输入主办单位" />
            </el-form-item>
            <span v-else>{{ ruleForm.organizer }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />参演人数:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planPersons">
              <el-input-number
                v-model="ruleForm.planPersons"
                :min="0"
                :max="10000000"
                :controls="false"
                placeholder="请输入参演人数"
                class="table-number"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planPersons }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />参演单位:</template>
            <el-tag
              v-for="(item,index) in planOrganization"
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
              @click="addPlanPersons"
            />
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />计划开始演练时间:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planStartTime">
              <el-date-picker
                v-model="ruleForm.planStartTime"
                type="datetime"
                placeholder="选择计划开始演练时间"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planStartTime }}</span>
          </el-descriptions-item>

          <!-- 新增字段 -->
          <el-descriptions-item>
            <template slot="label"><i v-if="oper==='add' || oper==='edit' || oper==='change'" class="required" />计划结束演练时间:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planEndTime">
              <el-date-picker
                v-model="ruleForm.planEndTime"
                type="datetime"
                placeholder="选择计划结束演练时间"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planEndTime }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">演练时长（h）:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planDays">
              <el-input-number
                v-model="ruleForm.planDays"
                :min="0"
                :max="10000000"
                :precision="1"
                :controls="false"
                placeholder="请输入演练时长（h）"
                class="table-number"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planDays }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">演练地点:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planAddress">
              <el-input
                v-model="ruleForm.planAddress"
                type="textarea"
                rows="6"
                placeholder="请输入演练地点"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planAddress }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">演练流程及内容简要描述:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planDescribe">
              <el-input
                v-model="ruleForm.planDescribe"
                type="textarea"
                rows="6"
                placeholder="请输入演练流程及内容简要描述"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planDescribe }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">填报人:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planInformant">
              <el-input v-model.trim="ruleForm.planInformant" placeholder="请输入填报人" />
            </el-form-item>
            <span v-else>{{ ruleForm.planInformant }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">填报人联系电话:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planInformantPhone">
              <el-input v-model.trim="ruleForm.planInformantPhone" maxlength="11" placeholder="请输入填报人联系电话" />
            </el-form-item>
            <span v-else>{{ ruleForm.planInformantPhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">填报时间:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planFillInTime">
              <el-date-picker
                v-model="ruleForm.planFillInTime"
                type="datetime"
                placeholder="选择填报时间"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planFillInTime }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template slot="label">备注:</template>
            <el-form-item v-if="oper==='add' || oper==='edit' || oper==='change'" prop="planRemark">
              <el-input
                v-model="ruleForm.planRemark"
                type="textarea"
                rows="6"
                placeholder="请输入备注"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.planRemark }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <el-form-item
          label="附件"
          style="width: 100%;"
        >
          <upload
            v-if="oper==='add' || oper==='edit' || oper==='change'"
            file
            :show-file-list="false"
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <FileTable
            :table-data="fileList"
            show-download
            :show-delete="(oper==='add' || oper==='edit' || oper==='change') ? true : false"
            @handleDelete="handleDelete"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="(oper==='add' || oper==='edit' || oper==='change')"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { telephone } from '@/utils/validate'
import { emergencyTrain } from '@/utils/public-fields'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { saveEntity, queryDetail, updateById,changeEntity } from '@/api/emergency-services/exercise-plan'
export default {
  components: {
    FileTable,
    upload
  },
  mixins: [emergencyTrain],
  props:{
    id:{
      type:[Number,String],
      default:0
    },
    oper:{
      type:String,
      default:'add'
    }
  },
  data() {
    let isRepeat = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入参演单位名称'))
      } else {
        if (this.planOrganization.indexOf(value)!==-1){
          callback(new Error('参演单位已存在'))
        } else {
          callback()
        }
      }
    }
    return {
      fileList: [],
      loading: false,
      dialogVisible:false,
      ruleForm: {
        actingType: '',
        actingTypeDetailed: '',
        id: null,
        name: '',
        planAddress: '',
        planDays: undefined,
        planDescribe: '',
        planFilePath: [],
        planFillInTime: '',
        planInformant: '',
        planInformantPhone: '',
        planOrganization: '',
        planOriginator: '',
        planPersons: undefined,
        planRemark: '',
        planStartTime: '',
        planType: '',
        planEndTime: '',
        organizer: '',
        postStatus: 1 // 默认未发布状态
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
      planOrganization:[],// 参演单位
      rules: {
        name: [
          { required: true, message: '请输入演练名称', trigger: 'blur' }
        ],
        planType: [
          { required: true, message: '请选择年度计划类型', trigger: 'change' }
        ],
        planPersons:[
          { required: true, message: '请输入参演人数', trigger: 'blur' }
        ],
        planInformantPhone: [
          { validator: telephone, trigger: 'blur' }
        ],
        planOriginator: [
          { required: true, message: '请输入演练牵头单位', trigger: 'blur' }
        ],
        organizer: [
          { required: true, message: '请输入主办单位', trigger: 'blur' }
        ],
        actingType:[
          { required: true, message: '请输入演练类型', trigger: 'blur' }
        ],
        actingTypeDetailed:[
          { required: true, message: '请输入演练类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    id(newV,e){
      this.queryDetail(newV)
    }
  },
  created() {
    if (this.id) { // 编辑
      this.fetchDetail(this.id)
    }
  },
  methods: {
    addPlanPersons(){
      this.personsForm.name = ''
      this.dialogVisible = true
    },
    handleClose(index){
      this.planOrganization.splice(index,1)
    },
    // 保存
    personsSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.planOrganization.push(this.personsForm.name)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            planFilePath: res.data.planFilePath ? JSON.parse(res.data.planFilePath) : []
          }
          this.fileList = this.ruleForm.planFilePath
          this.planOrganization = res.data.planOrganization ? res.data.planOrganization.split(',') : []
        }
      })
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 提交
    submitForm(formName) {
      if (this.planOrganization.length < 1){
        this.$message.error('请填写参演单位')
        return false
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存
    async saveData() {
      this.loading = true
      const dto = {
        ...this.ruleForm,
        planFillInTime: momentDate(this.ruleForm.planFillInTime),
        planStartTime: momentDate(this.ruleForm.planStartTime),
        planEndTime:momentDate(this.ruleForm.planEndTime),
        planFilePath: JSON.stringify(this.fileList)
      }
      dto.planOrganization = this.planOrganization ? this.planOrganization.join(',') : ''
      delete dto.enterpriseId
      delete dto.enterpriseName
      let res
      if (this.oper==='add'){
        res = await saveEntity(dto)
      } else if (this.oper==='edit'){
        res = await updateById(dto)
      } else {
        res = await changeEntity(dto)
      }
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/drillplan' })
    }
  }
}
</script>
<style lang="scss">
.add-company {
    .el-dialog__body {
        min-height: 100px;
    }
}
</style>
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
}

.add-yjyljh {
    .el-form-item {
        margin: 0;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
