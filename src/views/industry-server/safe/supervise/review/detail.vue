<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="复查记录详情" />
      </span>
    </div>
    <div class="review-detail">
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
        <el-descriptions-item label="检查计划名称:" :span="3">{{ info.planningName }}</el-descriptions-item>
        <el-descriptions-item label="检查单位:" :span="3">
          <el-tag v-for="(item,index) in info.isUseUnit" :key="index" style="margin: 5px;"> {{ item ? item[item.length-1] : '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="检查项目:">{{ info.itemName }}</el-descriptions-item>
        <el-descriptions-item label="检查项分类:">{{ info.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="危险等级:">{{ info.riskLevel ? (info.riskLevel === 1 ? '一般' : '重大') : '' }}</el-descriptions-item>
        <el-descriptions-item label="是否需要整改:">{{ info.isRectification ? '是' : '否' }}</el-descriptions-item>
        <el-descriptions-item label="整改时间要求:">{{ info.timeRequirement }}</el-descriptions-item>
        <el-descriptions-item label="整改截止时间:">{{ info.deadlineDate }}</el-descriptions-item>
        <el-descriptions-item label="违规行为:" :span="3">
          <p
            v-for="(item, index) in info.safetyTargetItemViolationVoList"
            :key="index"
            style="margin: 0;"
          >
            {{ index +1 }} 、 {{ item.name }}
          </p>
        </el-descriptions-item>
        <el-descriptions-item label="检查情况:" :span="3">
          {{ info.inspectSituation }}
        </el-descriptions-item>
        <el-descriptions-item label="检查图片:" :span="3">
          <div>
            <Images
              v-for="(pic, index) in info.checkPicture"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              fit="cover"
              :url="pic"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />整改情况
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
        <el-descriptions-item label="是否整改:">{{ info.isStatusImprovement === 1 ? '已整改' : '未整改' }}</el-descriptions-item>
        <el-descriptions-item label="整改时间:">
          {{ info.improvedDate }}
        </el-descriptions-item>
        <el-descriptions-item label="整改落实资金:">{{ info.fund }}</el-descriptions-item>
        <el-descriptions-item label="整改责任人:" :span="3">{{ info.directorName }}</el-descriptions-item>

        <el-descriptions-item label="整改情况:" :span="3">
          {{ info.improvementMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="应急保证措施:" :span="3">
          {{ info.emergencyMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="整改图片:" :span="3">
          <div>
            <Images
              v-for="(pic, index) in info.improvementPicture"
              :key="index"
              :ref="`zimages${index}`"
              height="100px"
              fit="cover"
              :url="pic"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />复查情况
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="isDisabled ? {} : rules"
        label-width="160px"
        size="medium"
        :disabled="isDisabled"
      >
        <el-form-item
          label="复查验收时间:"
          prop="reviewDate"
        >
          <el-date-picker
            v-model="ruleForm.reviewDate"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 100%;"
            placeholder="请选择复查验收时间"
          />
        </el-form-item>
        <el-form-item
          label="复查人:"
          prop="reviewer"
        >
          <el-input v-model.trim="ruleForm.reviewer" placeholder="请输入复查人" maxlength="20" />
        </el-form-item>
        <el-form-item
          label="复查完成情况:"
          prop="isStatus"
        >
          <el-radio-group v-model="ruleForm.isStatus">
            <el-radio :label="1">
              已完成
            </el-radio>
            <el-radio :label="2">
              未完成
            </el-radio>
            <el-radio :label="3">
              整改中
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="复查情况:"
          prop="reviewDesc"
        >
          <el-input
            v-model.trim="ruleForm.reviewDesc"
            type="textarea"
            rows="6"
            placeholder="这是复查单位填写的复查情况"
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="复查照片:"
          prop="fileList"
          style="width: 100%;"
        >
          <upload
            :file-list="ruleForm.fileList"
            :limit="9"
            multiple
            :disabled="isDisabled ? true : false"
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
      </el-form>
      <div class="backstage-edit-btn">
        <el-button
          v-if="!isDisabled"
          type="primary"
          size="medium "
          :loading="saveLoading"
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
    </div>
  </el-card>
</template>

<script>
import { findById, updateRecord } from '@/api/general-services/safety-supervision-and-inspection/reviewRecord'
import upload from '@/components/upload'
import Images from '@/components/images'
export default {
  components: {
    upload,
    Images
  },
  data() {
    return {
      ruleForm: {
        id: '',
        reviewDate: '',
        reviewer: '',
        isStatus: '',
        reviewDesc: '',
        fileList: []
      },
      saveLoading:false,
      info: {},
      rules: {
        reviewDate: [
          { required: true, message: '请选择复查验收时间', trigger: 'change' }
        ],
        reviewer: [
          { required: true, message: '请输入复查人', trigger: 'blur' }
        ],
        isStatus: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        fileList: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        reviewDesc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      isDisabled: false
    }
  },
  async mounted() {
    if (this.$route.query.disabled) {
      this.isDisabled = true
    }
    if (this.$route.query.id) {
      const res = await findById(this.$route.query.id)
      res.data.checkPicture = res.data.checkPicture ? JSON.parse(res.data.checkPicture) : []
      res.data.reviewPicture = res.data.reviewPicture ? JSON.parse(res.data.reviewPicture) : []
      res.data.improvementPicture = res.data.improvementPicture ? JSON.parse(res.data.improvementPicture) : []
      this.info = res.data
      this.info.isUseUnit = JSON.parse(this.info.isUseUnit)
      this.ruleForm = {
        id: res.data.id,
        reviewDate: res.data.reviewDate,
        reviewer: res.data.reviewer,
        isStatus: res.data.isStatus,
        reviewDesc: res.data.reviewDesc,
        fileList: []
      }
      res.data.reviewPicture.forEach(element => {
        this.ruleForm.fileList.push({ url: element })
      })
    }
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.ruleForm.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.ruleForm.fileList.splice(this.ruleForm.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    /**
     * 保存
     */
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
      this.saveLoading = true
      const data = { ...this.ruleForm }
      const picture = []
      this.ruleForm.fileList.forEach(item => {
        picture.push(item.url)
      })
      data.reviewPicture = JSON.stringify(picture)
      delete data.fileList
      updateRecord(data).then(res => {
        this.saveLoading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.review-detail {
    .three-column-input-table {
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
            margin-bottom: 20px;
            width: 33.3%;
            background-color: #ffffff;

            .el-input--medium .el-input__inner {
                border: none;
            }
        }
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
        width: 20%;
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
