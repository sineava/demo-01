<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="addType === 1 ? '添加现场检查情况' : '填写现场检查记录'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="title-content" style="margin-bottom: 5px;">
        <div class="icon-title" style="justify-content: space-between;align-content: center;margin:0">
          <div class="icon-title" style="margin:0"><span class="span" />基本资料</div>
          <el-button
            v-if="addType === 1"
            style="margin-left: 50px;"
            type="primary"
            size="small"
            @click="dialogVisible = true"
          >
            添加检查项
          </el-button>
        </div>
      </div>
      <el-form
        ref="ruleForm"
        :model="info"
        :rules="rules"
        size="medium"
        class="table-column three"
        style="margin-top: 0;"
      >
        <el-table
          :data="['']"
          class="table-border"
        >
          <el-table-column label="检查项" :show-overflow-tooltip="true">
            <template>
              {{ info.name || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="检查项分类" :show-overflow-tooltip="true">
            <template>
              {{ info.categoryName || '-' }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="危险等级">
            <template>
              {{ info.riskLevel === 1 ? '一般' : (info.riskLevel === 2 ?'重大' : '') }}
            </template>
          </el-table-column> -->
        </el-table>
        <div style="margin:20px 0 0 0" class="icon-title">
          <span class="span" />检查情况
        </div>
        <el-form-item
          label="是否存在问题:"
          prop="isProblem"
          style="width: 100%;"
        >
          <div v-if="isDisabled">{{ info.isProblem===0?'检查正常':(info.isProblem===1?'存在问题':'存在隐患') }} </div>
          <el-radio-group v-else v-model="info.isProblem">
            <el-radio :label="0">
              检查正常
            </el-radio>
            <el-radio :label="1">
              存在问题
            </el-radio>
            <el-radio :label="2">
              存在隐患
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="info.isProblem>0"
          label="危险等级:"
          prop="riskLevel"
          style="width: 100%;"
        >
          <div v-if="isDisabled">{{ info.riskLevel===1?'一般':'重大' }} </div>
          <el-radio-group v-else v-model="info.riskLevel">
            <el-radio :label="1">
              一般
            </el-radio>
            <el-radio :label="2">
              重大
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!isDisabled" label="添加违规行为:" style="width: 100%;">
          <span style="margin-left: 10px;color: #999;">违规行为可多选</span>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="violationsDialog = true"
          >
           添加违规行为
          </el-button>
        </el-form-item>
        <el-table
          style="width: 100%;margin: 0;"
          :data="info.safetyTargetItemViolationVoList"
          element-loading-text="Loading"
          class="table-border"
          fit
          highlight-current-row
        >
          <el-table-column
            label="违规行为"
            prop="name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="违规行为分类"
            prop="categoryName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="法律依据"
            prop="legalBasis"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="!isDisabled"
            width="95"
            align="center"
            label="操作"
          >
            <template v-slot="scope">
              <el-button
                size="mini"
                type="danger"
                plain
                @click="info.safetyTargetItemViolationVoList.splice(scope.$index, 1)"
              >
                <em class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-descriptions
          :column="2"
          class="descriptions"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
          style="margin-top: 20px;"
        >
          <el-descriptions-item :span="2">
            <template slot="label"><i class="required" />检查情况:</template>
            <span v-if="isDisabled">{{ info.inspectSituation }}</span>
            <el-form-item v-else prop="inspectSituation" style="width: 100%;">
              <el-input
                v-model.trim="info.inspectSituation"
                type="textarea"
                placeholder="请输入检查情况"
                rows="4"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">备注:</template>
            <span v-if="isDisabled">{{ info.remark }}</span>
            <el-form-item v-else prop="remark" style="width: 100%;">
              <el-input
                v-model.trim="info.remark"
                type="textarea"
                placeholder="请输入备注"
                rows="4"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">检查图片:</template>
            <div v-if="isDisabled" style="display: flex; flex-wrap: wrap;">
              <Images
                v-for="({ url }, idx) in fileList"
                :key="idx"
                height="100px"
                style="margin: 10px 10px 0 0;"
                fit="cover"
                :url="url"
              />
            </div>
            <el-form-item v-else prop="fileList" style="width: 100%;">
              <upload
                :file-list="fileList"
                :limit="9"
                multiple
                @fileSuccess="uploadSuccess"
                @error="uploadError"
                @remove="uploadRemove"
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">检查确认单:</template>
            <div v-if="isDisabled" style="display: flex; flex-wrap: wrap;">
              <Images
                v-for="({ url }, idx) in signaturePathfileList"
                :key="idx"
                height="100px"
                style="margin: 10px 10px 0 0;"
                fit="cover"
                :url="url"
              />
            </div>
            <el-form-item v-else prop="signaturePathfileList" style="width: 100%;">
              <upload
                :file-list="signaturePathfileList"
                :limit="1"
                multiple
                @fileSuccess="signaturePathSuccess"
                @error="signaturePathError"
                @remove="signaturePathRemove"
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"><i class="required" />是否需要整改:</template>
            <span v-if="isDisabled">{{ info.isRectification?'是':'否' }}</span>
            <el-form-item v-else prop="isRectification" style="width: 100%;">
              <el-radio-group v-model="info.isRectification">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item v-if="info.isRectification">
            <template slot="label"><i class="required" />整改时间要求:</template>
            <span v-if="isDisabled">{{ info.timeRequirement }}</span>
            <el-form-item v-else prop="timeRequirement" style="width: 100%;">
              <el-select
                v-model="info.timeRequirement"
                clearable
                placeholder="请选择整改时间要求"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in date_claim"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item v-if="info.isRectification">
            <template slot="label"><i class="required" />整改截止时间:</template>
            <span v-if="isDisabled">{{ info.deadlineDate }}</span>
            <el-form-item v-else prop="deadlineDate" style="width: 100%;">
              <el-date-picker
                v-model="info.deadlineDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择整改截止时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item v-if="info.isRectification" :span="2">
            <template slot="label"><i class="required" />整改要求:</template>
            <span v-if="isDisabled">{{ info.rectificationRequirement }}</span>
            <el-form-item v-else prop="rectificationRequirement" style="width: 100%;">
              <el-input
                v-model.trim="info.rectificationRequirement"
                type="textarea"
                placeholder="请输入整改要求"
                rows="4"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-descriptions-item>
          <!-- <div class="icon-title">
            <span class="span" />复查信息
          </div> -->
          <el-descriptions-item>
            <template slot="label"><i class="required" />是否需要复查:</template>
            <span v-if="isDisabled">{{ info.isReview?'是':'否' }}</span>
            <el-form-item v-else prop="isReview" style="width: 100%;">
              <el-radio-group v-model="info.isReview">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item />
          <el-descriptions-item v-if="info.isReview">
            <template slot="label"><i class="required" />选择复查机构:</template>
            <span v-if="isDisabled">
            {{
              user_info.orgcategory === '1'
                ? (managementDepartmentList.find(x => x.orgId === info.organizationId) || {}).orgName
                : info.organizationName
            }}</span>
            <el-form-item v-else prop="organizationId" style="width: 100%;">
              <el-select
                v-if="user_info.orgcategory === '1'"
                v-model="info.organizationId"
                clearable
                filterable
                placeholder="请选择复查机构"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in managementDepartmentList"
                  :key="item.value"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
              <span v-else>{{ info.organizationName }}</span>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item v-if="info.isReview">
            <template slot="label"><i class="required" />复查时间:</template>
            <span v-if="isDisabled">{{ info.reviewTime }}</span>
            <el-form-item v-else prop="reviewTime" style="width: 100%;">
              <el-date-picker
                v-model="info.reviewTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="检查项管理"
      width="80%"
    >
      <check-items
        :check-id-list="checkIdList"
        @getCheckItems="getCheckItems"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="violationsDialog"
      title="违规行为管理"
      width="80%"
    >
      <violations :listData="info.safetyTargetItemViolationVoList" @getViolations="getViolations" />
    </el-dialog>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        v-if="!isDisabled"
        type="primary"
        size="medium"
        :loading="saveLoading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import upload from '@/components/upload'
import CheckItems from './components/CheckItems'
import Violations from './components/Violations'
import { getOrgList } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import Images from '@/components/images'
export default {
  components: {
    upload,
    CheckItems,
    Violations,
    Images
  },
  data() {
    return {
      fileList: [],
      signaturePathfileList:[],
      saveLoading:false,
      dialogVisible: false,
      violationsDialog: false,
      date_claim: [
        { value: '停业整改', label: '停业整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '立即整改', label: '立即整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ],
      managementDepartmentList: [],
      addType: '',
      info: {
        isProblem: 0,
        inspectSituation: '',
        isRectification: 0,
        isReview: 0,
        riskLevel:0,
        safetyTargetItemViolationVoList:[]
      },
      id: '',
      rules: {
        isProblem: [
          { required: true, message: '请选择是否存在问题', trigger: 'change' }
        ],
        riskLevel: [
          { required: true, message: '请选择危险等级', trigger: 'change' }
        ],
        inspectSituation: [
          { required: true, message: '请输入检查情况', trigger: 'blur' }
        ],
        isRectification: [
          { required: true, message: '请选择是否需要整改', trigger: 'change' }
        ],
        timeRequirement: [
          { required: true, message: '请选择整改事件要求', trigger: 'change' }
        ],
        deadlineDate: [
          { required: true, message: '请选择整改截止时间', trigger: 'blur' }
        ],
        rectificationRequirement: [
          { required: true, message: '请输入整改要求', trigger: 'blur' }
        ],
        isReview: [
          { required: true, message: '请选择是否需要复查', trigger: 'change' }
        ],
        organizationId: [
          { required: true, message: '请选择复查机构', trigger: 'change' }
        ],
        reviewTime: [
          { required: true, message: '请选择复查时间', trigger: 'change' }
        ]
      },
      isDisabled: false,
      checkIdList: []
    }
  },
  computed: {
    ...mapGetters(['token_str', 'user_info'])
  },
  async mounted() {
    const { checkIdList, disabled, id, addType } = this.$route.query || {}
    this.isDisabled = !!disabled
    const item = JSON.parse(localStorage.getItem('checkrecordCheckAddInfo') || '{}')
    this.checkIdList = checkIdList
    this.id = id
    this.info = { ...this.info, ...item }
    this.info.isProblem = this.info.isProblem || 0
    this.info.isRectification = this.info.isRectification || 0
    this.info.isReview = this.info.isReview || 0
    this.info.riskLevel = this.info.riskLevel || 0
    this.addType = addType
    // 复查机构
    if (this.user_info?.orgcategory === '1') { // 中心
      const res = await getOrgList({ tokenStr: this.token_str })
      this.managementDepartmentList = res.data
    } else { // 区县
      const { orgid, orgname } = this.user_info
      this.info.organizationId = Number(orgid)
      this.info.organizationName = orgname
    }
    const fileList = this.info.checkPicture ? JSON.parse(this.info.checkPicture) : []
    if (this.info.signaturePath){
      this.signaturePathfileList = [{
        url: this.info.signaturePath,
        name: this.info.signaturePath
      }]
    }
    const array = []
    fileList.forEach(element => {
      array.push({url: element})
    })
    this.fileList = array
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.signaturePathfileList.forEach((item, index) => {
        if (item.url === file.url) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 文件上传成功时的钩子
    signaturePathSuccess(file) {
      this.signaturePathfileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    signaturePathError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    signaturePathRemove(file) {
      this.fileList.forEach((item, index) => {
        if (item.url === file.ydz) {
          this.signaturePathfileList.splice(index, 1)
        }
      })
    },
    departmentChange() {
      const label = this.$refs['cascader'].getCheckedNodes()[0].pathLabels
      this.info.organizationName = label[label.length - 1]
    },
    // 获取检查项数据
    getCheckItems(obj) {
      this.dialogVisible = false
      this.info = { ...this.info, ...obj }
    },
    // 获取违规行为数据
    getViolations(obj) {
      this.violationsDialog = false
      this.info.safetyTargetItemViolationVoList = this.info.safetyTargetItemViolationVoList ? this.info.safetyTargetItemViolationVoList : []
      this.info.safetyTargetItemViolationVoList.push(obj)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    saveSubmit() {
      if (!this.info.name) {
        this.$message.error('请添加检查项')
        return false
      }
      this.saveLoading = true
      const data = { ...this.info }
      const checkPicture = []
      this.fileList.forEach(item => {
        checkPicture.push(item.url)
      })
      data.riskRating = data.isProblem === 0 ? 0 : data.riskRating
      data.checkPicture = JSON.stringify(checkPicture)
      data.addType = this.addType
      if (this.user_info.orgcategory === '1') {
        data.organizationId = data.organizationId && data.organizationId.length > 0 ? data.organizationId[data.organizationId.length - 1] : data.organizationId
        data.organizationName = data.organizationId && this.managementDepartmentList.find(item => item.orgId === data.organizationId).orgName
      }
      data.signaturePath = this.signaturePathfileList && this.signaturePathfileList.length>0 ? this.signaturePathfileList[0].url : ''
      this.saveLoading = false
      this.$router.push({ path: '/safe/supervise/checkrecordCheck', query: { id: this.id, item: data }})
    },
    // 返回
    returnBack() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    padding-left: 30px;
    width: 100%;
}

.title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;

    .span {
        display: inline-block;
        margin-right: 7px;
        width: 6px;
        height: 18px;
        background-color: #409eff;
    }
}
.descriptions {
    margin-bottom: 20px;
    width: 100%;

    /deep/ .el-form-item {
        margin-bottom: 0;
    }

    /deep/ .business-title {
        width: 8%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 30%;
        line-height: 30px;
    }
}
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}
</style>

