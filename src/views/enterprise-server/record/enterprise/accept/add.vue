<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="信息填报" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
        size="medium"
      >
        <div class="icon-title">
          <span class="span" />基本信息
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
        <el-descriptions-item label="港口企业名称:" :span="2">{{ userInfo.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="法定代表人姓名:">{{ userInfo.legalPersonName }}</el-descriptions-item>
        <el-descriptions-item label="经营场所:" :span="3">
          <el-input
            v-model.trim="ruleForm.premises"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入经营场所"
            show-word-limit
          />
        </el-descriptions-item>
        <el-descriptions-item label="经营范围:" :span="3">
          <el-input
            v-model.trim="ruleForm.businessScope"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入经营范围"
            show-word-limit
          />
        </el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">
          <el-input
            v-model.trim="ruleForm.remarks"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入备注"
            show-word-limit
          />
        </el-descriptions-item>
      </el-descriptions>
      <template v-if="ruleForm.filingForm === '3'">
        <div class="icon-title">
          <span class="span" />注销申请
        </div>
        <el-descriptions
            class="descriptions-one"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="business-title"
            contentClassName="business-text"
            border
          >
          <el-descriptions-item label="注销原因:" :span="3">
            <el-input
              v-model="ruleForm.cancellationReason"
              type="textarea"
              rows="6"
              maxlength="200"
              placeholder="请输入注销原因"
              show-word-limit
            />
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <div class="icon-title">
        <span class="span" />附件信息
      </div>
      <upload
        file
        :show-file-list="false"
        :limit="9"
        multiple
        @fileSuccess="uploadSuccess"
        @remove="uploadRemove"
      />
      <common-table
        :table-data="fileList"
        show-download
        show-delete
        @handleDelete="handleDelete"
      />
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        type="primary"
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
  </el-card>
</template>

<script>
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import { add, update, findById } from '@/api/port-services/record-management/service-en-filing'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        premises: '',
        remarks: '',
        businessScope: '',
        id: '',
        filingForm: 1,
        cancellationReason: ''
      },
      loading: false,
      fileList: [],
      userInfo: {},
      isStatus: 0,
      rules: {
        /*
         * enterpriseName: [
         *   { required: true, message: '请输入港口企业名称', trigger: 'blur' }
         * ]
         */
      }
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      this.ruleForm.filingForm = this.$route.query.filingForm
      let info = await findById(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
      } catch (err) {
        console.log()
      }
      this.fileList = info.data.enclosureInfo
      this.ruleForm.premises = info.data.premises
      this.ruleForm.remarks = info.data.remarks
      this.ruleForm.businessScope = info.data.businessScope
      this.ruleForm.cancellationReason = info.data.cancellationReason
      this.isStatus = info.data.isStatus // 当前状态
    }
    const res = await findByUserId()
    this.userInfo = res.data
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val) {
      this.fileList.splice(val.index, 1)
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
      const data = { ...this.ruleForm }
      data.enterpriseId = this.userInfo.id
      data.enterpriseName = this.userInfo.enterpriseName
      data.enclosureInfo = JSON.stringify(this.fileList)
      this.loading = true
      const res = this.ruleForm.id && this.isStatus !== 4 ? await update(data) : await add(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回列表
    returnBack() {
      this.$router.push({ path: `/record/enterprise/accept` })
    }
  }
}
</script>
<style lang="scss" scoped>
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
.descriptions-one{
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
</style>