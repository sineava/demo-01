<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="填写整改记录" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />检查记录
      </div>
      <el-form
        label-width="160px"
        size="medium"
        hide-required-asterisk
        class="three-column-input-table"
      >
        <el-form-item label="检查项目:">
          <el-input
            :value="info.itemName"
            disabled
          />
        </el-form-item>
        <el-form-item label="检查项分类:">
          <el-input
            :value="info.categoryName"
            disabled
          />
        </el-form-item>
        <el-form-item label="危险等级:">
          <el-input
            :value="info.riskLevel === 1 ? '一般' : '重大'"
            disabled
          />
        </el-form-item>
        <el-form-item label="违规行为:">
          <span
            v-for="(item, index) in info.safetyTargetItemViolationVoList"
            :key="index"
          >{{ index + 1 }} 、{{ item.name }}</span>
        </el-form-item>
        <el-form-item label="整改时间要求:">
          <el-input
            :value="info.timeRequirement"
            disabled
          />
        </el-form-item>
        <el-form-item label="整改截止时间:">
          <el-input
            :value="info.deadlineDate"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="检查情况:"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="info.inspectSituation"
            type="textarea"
            rows="5"
            placeholder="这是检查人员填写的检查情况"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="检查图片:"
          style="width: 100%;"
        >
          <div>
            <Images
              v-for="(pic, index) in info.checkPicture"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              width="100px"
              fit="cover"
              :url="item"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="整改要求:"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="info.rectificationRequirement"
            type="textarea"
            rows="5"
            placeholder="这是检查人员填写的检查情况"
            disabled
          />
        </el-form-item>
      </el-form>
      <el-form
        ref="ruleForm"
        label-width="160px"
        size="medium"
        style="width: 800px;"
        :rules="rules"
        :model="ruleForm"
      >
        <el-form-item
          label="是否整改:"
          prop="isStatus"
        >
          <el-radio-group v-model="ruleForm.isStatus">
            <el-radio :label="1">
              是
            </el-radio>
            <el-radio :label="0">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="整改时间:"
          prop="improvedDate"
        >
          <el-date-picker
            v-model="ruleForm.improvedDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择整改时间"
          />
        </el-form-item>
        <el-form-item
          label="整改落实资金:"
          prop="fund"
        >
          <el-input-number
            v-model="ruleForm.fund"
            :precision="2"
            :max="9999999999"
            :min="0"
            placeholder="请输入整改落实资金"
          />
        </el-form-item>
        <el-form-item
          label="整改责任人:"
          prop="directorName"
        >
          <el-input v-model.trim="ruleForm.directorName" placeholder="请输入整改责任人" maxlength="30" />
        </el-form-item>
        <el-form-item
          label="整改措施:"
          prop="improvementMeasure"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.improvementMeasure"
            type="textarea"
            rows="7"
            placeholder="请输入整改措施"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="应急保证措施:"
          prop="emergencyMeasure"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.emergencyMeasure"
            type="textarea"
            rows="7"
            placeholder="请输入应急保证措施"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="上传整改图片:"
          props="check_pics"
          style="width: 100%;"
        >
          <upload
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
        <div class="backstage-edit-btn">
          <el-button
            size="medium"
            @click="returnBack"
          >
            返回
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="submitForm('ruleForm')"
          >
            保存
          </el-button>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import upload from '@/components/upload'
import { findById, updateRecord } from '@/api/general-services/safety-supervision-and-inspection/improvementRecord'
import Images from '@/components/images'
export default {
  components: {
    upload,
    Images
  },
  data() {
    return {
      ruleForm: {
        'directorName': '',
        'emergencyMeasure': '',
        'fund': '',
        'id': '',
        'improvedDate': '',
        'improvementMeasure': '',
        'improvementPicture': '',
        'isStatus': ''
      },
      rules: {
        directorName: [
          { required: true, message: '请输入整改责任人', trigger: 'blur' }
        ],
        emergencyMeasure: [
          { required: true, message: '请输入应急保证措施', trigger: 'blur' }
        ],
        fund: [
          { required: true, message: '请输入整改落实资金', trigger: 'blur' }
        ],
        improvedDate: [
          { required: true, message: '请选择整改时间', trigger: 'change' }
        ],
        improvementMeasure: [
          { required: true, message: '请输入整改措施', trigger: 'blur' }
        ],
        improvementPicture: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isStatus: [
          { required: true, message: '请选择是否整改', trigger: 'change' }
        ]
      },
      fileList: [],
      info: {}
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    res.data.checkPicture = res.data.checkPicture ? JSON.parse(res.data.checkPicture) : []
    this.info = res.data
    this.ruleForm = {
      'directorName': res.data.directorName,
      'emergencyMeasure': res.data.emergencyMeasure,
      'fund': res.data.fund,
      'id': this.$route.query.id,
      'improvedDate': res.data.improvedDate,
      'improvementMeasure': res.data.improvementMeasure,
      'improvementPicture': res.data.improvementPicture,
      'isStatus': res.data.isStatus
    }
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
      this.fileList.forEach((item, index) => {
        if (item.url === file.ydz) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    async saveSubmit() {
      const data = { ...this.ruleForm }
      data.improvementPicture = []
      this.fileList.forEach(item => {
        data.improvementPicture.push(item.url)
      })
      data.improvementPicture = JSON.stringify(data.improvementPicture)
      const res = await updateRecord(data)
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        flex-wrap: wrap;

        .el-form-item {
            padding: 10px 0;
            width: 33.3%;
            background-color: #ffffff;

            .el-input--medium .el-input__inner {
                border: none;
            }
        }
    }
}
</style>
