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
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="检查项:" :span="3">
          <el-table
            :data="['']"
            class="table-border"
          >
            <el-table-column label="检查项">
              <template>
                {{ info.name }}
              </template>
            </el-table-column>
            <el-table-column label="检查项分类">
              <template>
                {{ info.categoryName }}
              </template>
            </el-table-column>
          </el-table>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />检查情况
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="是否存在问题:" :span="3">{{ info.isProblem===0?'检查正常':(info.isProblem===1?'存在问题':'存在隐患') }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isProblem>0" label="危险等级:" :span="3">{{ info.riskLevel===1?'一般':'重大' }}</el-descriptions-item>
        <el-descriptions-item label="违规行为:" :span="3">
          <el-table
            style="width: 100%;"
            :data="info.safetyTargetItemViolationVoList"
            element-loading-text="Loading"
            class="table-border"
            fit
            highlight-current-row
          >
            <el-table-column
              label="违规行为"
              prop="name"
            />
            <el-table-column
              label="违规行为分类"
              prop="categoryName"
            />
            <el-table-column
              label="法律依据"
              prop="legalBasis"
            />
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="检查情况:" :span="3">{{ info.inspectSituation }}</el-descriptions-item>
        <el-descriptions-item label="检查图片:" :span="3">
          <upload
            :file-list="fileList"
            :disabled="true"
          />
        </el-descriptions-item>
        <el-descriptions-item label="检查确认单:" :span="3">
          <upload
            :file-list="signaturePathfileList"
            :limit="1"
            :disabled="true"
          />
        </el-descriptions-item>
        <el-descriptions-item label="是否需要整改:" :span="3">{{ info.isRectification?'是':'否' }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isRectification" label="整改时间要求:" :span="3">{{ info.timeRequirement }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isRectification" label="整改截止时间:" :span="3">{{ info.deadlineDate }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isRectification" label="整改要求:" :span="3">{{ info.rectificationRequirement }}</el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />复查信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="是否需要复查:" :span="3">{{ info.isReview?'是':'否' }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isReview" label="复查机构:" :span="3">{{ info.organizationName }}</el-descriptions-item>
        <el-descriptions-item v-if="info.isReview" label="复查时间:" :span="3">{{ info.reviewTime }}</el-descriptions-item>
      </el-descriptions>
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
import upload from '@/components/upload'
export default {
  components: {
    upload,
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      violationsDialog: false,
      signaturePathfileList:[],
      date_claim: [
        { value: '停业整改', label: '停业整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '立即整改', label: '立即整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ],
      addType: '',
      info: {
        isProblem: null,
        inspectSituation: '',
        isRectification: null,
        isReview: null
      },
      id: '',
      rules: {
      },
      isDisabled: false,
      checkIdList: []
    }
  },
  computed: {
    ...mapGetters(['token_str'])
  },
  async mounted() {
    if (this.$route.query.disabled) {
      this.isDisabled = true
    }
    this.checkIdList = this.$route.query.checkIdList
    this.id = this.$route.query.id
    this.info = { ...this.$route.query.item }
    this.info.isProblem = this.info.isProblem || 0
    this.info.isRectification = this.info.isRectification || 0
    this.info.isReview = this.info.isReview || 0
    this.info.riskLevel = this.info.riskLevel || 0
    this.info.organizationId = String(this.info.organizationId)
    this.addType = this.$route.query.addType
    const fileList = JSON.parse(this.info.checkPicture) || []
    const array = []
    fileList.forEach(element => {
      array.push({url: element})
    })
    if (this.info.signaturePath){
      this.signaturePathfileList = [{
        url: this.info.signaturePath,
        name: this.info.signaturePath
      }]
    }
    this.fileList = array
  },
  methods: {
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
    // 返回
    returnBack() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
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

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 90%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
