<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="ruleForm.id ? (isDisabled ? '检查结果公开信息详情' : '编辑检查结果公开信息') : '新增检查结果公开信息'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-descriptions
        v-if="isDisabled"
        class="descriptions"
        :column="2"
        colon
        size="medium"
        :labelStyle="{ width: '10%' }"
        border
      >
        <el-descriptions-item label="标题">
          {{ ruleForm.newsTitle }}
        </el-descriptions-item>
        <el-descriptions-item label="发布处室">
          {{ ruleForm.departmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="检查时间区间" :span="2">
          {{ typeof ruleForm.timeInterval === 'object' ? ruleForm.timeInterval.join(' - ') : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="详情" :span="2">
          <div v-html="ruleForm.detail" />
        </el-descriptions-item>
        <el-descriptions-item label="附件">
          <upload
            file
            :fileList="fileList"
            multiple
            disabled
          />
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        v-else
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        :rules="rules"
        :disabled="isDisabled ? true : false"
        class="two-column-input-table"
        style="width: 80%;"
      >
        <el-form-item label="标题:" prop="newsTitle">
          <el-input v-model.trim="ruleForm.newsTitle" placeholder="请输入标题"  maxlength="100"/>
        </el-form-item>
        <el-form-item label="发布处室:" prop="departmentName">
          <el-input v-model.trim="ruleForm.departmentName" disabled />
        </el-form-item>
        <el-form-item label="检查时间区间:" prop="timeInterval">
          <el-date-picker
            v-model="ruleForm.timeInterval"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="详情:" prop="detail" style="width: 100%;">
          <Editor v-if="!isDisabled" v-model="ruleForm.detail" />
        </el-form-item>
        <el-form-item label="上传附件:" prop="file">
          <upload
            file
            :fileList="fileList"
            :limit="9"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button size="medium " @click="returnBack">返回</el-button>
      <el-button v-if="!isDisabled" type="primary" size="medium " @click="submitForm('ruleForm')">保存</el-button>
    </div>
  </el-card>
</template>

<script>
import Editor from '@/components/QuillEditor'
import upload from '@/components/upload'
import {replaceImg } from '@/utils/index'
import { findByPublicInfo, addPublic, updatePublic } from '@/api/general-services/safety-supervision-and-inspection/safetyPublic'
export default {
  components: {
    upload,
    Editor
  },
  data() {
    return {
      type: '',
      ruleForm: {
        id: '',
        newsTitle: '',
        departmentId: '',
        departmentName: '',
        timeInterval: [],
        detail: ''
      },
      rules: {
        newsTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择发布处室', trigger: 'change' }
        ],
        timeInterval: [
          { required: true, message: '请选择检查时间区间', trigger: 'change' }
        ],
      },
      fileList: [],
      managementDepartmentList: [],
      isDisabled: false
    }
  },
  async mounted() {
    const userInfo = this.$store.getters.user_info
    if (this.$route.query && this.$route.query.id) {
      this.type = 'detail'
      this.isDisabled = this.$route.query.disabled
      const info = await findByPublicInfo(this.$route.query.id)
      this.ruleForm = {
        id: info.data.id,
        newsTitle: info.data.newsTitle,
        timeInterval: [info.data.startTimeInterval, info.data.endTimeInterval],
        detail: await replaceImg(info.data.detail)
      }
      this.fileList = JSON.parse(info.data.enclosureName)
    }
    this.ruleForm.departmentId = userInfo.orgid
    this.ruleForm.departmentName = userInfo.orgname
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name,
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
    async saveSubmit() {
      const data = { ...this.ruleForm }
      if (this.ruleForm.timeInterval.length > 0) {
        data.startTimeInterval = this.ruleForm.timeInterval[0]
        data.endTimeInterval = this.ruleForm.timeInterval[1]
      }
      delete data.timeInterval
      data.enclosureName = JSON.stringify(this.fileList)
      data.departmentId = data.departmentId.length > 0 ? data.departmentId[data.departmentId.length - 1] : data.departmentId
      const res = this.ruleForm.id ? await updatePublic(data) : await addPublic(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/supervise/public' })
    },
    focus(ev) {
      if (this.type === 'detail') {
        ev.enable(false) // 禁用编辑器
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;

            .quill-editor /deep/ .ql-container {
                height: 200px;
            }
        }
    }
}

/deep/ .el-form-item__content {
  div {
    h1,h2,h3,h4,h5,h6,p {
      margin-top: 0 !important;
    }
  }
}
</style>
