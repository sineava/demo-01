<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="上传船舶档案" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 电子档案
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="120px"
      label-position="right"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item
        label="文件名称:"
        prop="fileName"
      >
        <el-input
          v-model="ruleForm.fileName"
          maxlength="100"
          placeholder="请输入文件名称"
        />
      </el-form-item>
      <el-form-item
        label="文件编号:"
        prop="fileSerialNumber"
      >
        <el-input
          v-model="ruleForm.fileSerialNumber"
          maxlength="30"
          placeholder="请输入文件编号"
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          :rows="6"
          type="textarea"
          maxlength="200"
          placeholder="请输入备注"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="电子文件:"
        prop="fileList"
      >
        <upload
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
      </el-form-item>
      <common-table
        :table-data="ruleForm.fileList"
        show-download
        show-delete
        @handleDelete="handleDelete"
      />
    </el-form>
    <div class="backstage-edit-btn">
      <el-button
        :loading="loading"
        type="primary"
        size="medium"
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
import { editData, addData } from '@/api/ship-inspection/electronic-archives/electronic-archives'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        fileName: '',
        fileSerialNumber: '',
        remark: '',
        fileList: [],
        id: '',
        shipInfoId: ''
      },
      rules: {
        fileName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        fileSerialNumber: [
          { required: true, message: '请输入文件编号', trigger: 'blur' }
        ],
        fileList: [
          { required: true, message: '请添加文件', trigger: 'change' }
        ]
      },
      loading: false,
      item: {}
    }
  },
  async mounted() {
    this.item = this.$route.params || {}
    this.ruleForm = { ...this.item}
    this.ruleForm.fileList = this.ruleForm.fileList || []
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.ruleForm.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.ruleForm.fileList.splice(val.index, 1)
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
      let data = { ...this.ruleForm }
      data.fileList = JSON.stringify(this.ruleForm.fileList)
      delete data.updateBy
      delete data.updateTime
      this.loading = true
      const res = this.item.id ? await editData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
