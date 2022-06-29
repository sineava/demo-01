<template>
  <div class="body-card">
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>救援情况
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
      >
      <el-descriptions
          class="descriptions-one"
          :column="1"
          :colon="true"
          size="medium"
          labelClassName="ruleForm-title"
          contentClassName="ruleForm-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />救援结束时间:</template>
          <el-form-item v-if="isEdit" prop="rescueTime">
            <el-date-picker
              v-model="ruleForm.rescueTime"
              type="date"
              placeholder="选择时间"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ ruleForm.rescueTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />人员疏散情况:</template>
          <el-form-item v-if="isEdit" prop="evacuationSituation">
            <el-input
              v-model.trim="ruleForm.evacuationSituation"
              type="textarea"
              rows="8"
              maxlength="200"
              placeholder="请输入人员疏散情况"
              show-word-limit
            />
          </el-form-item>
          <span v-else>{{ ruleForm.evacuationSituation }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />救援结果描述:</template>
          <el-form-item v-if="isEdit" prop="rescueDescription">
            <el-input
              v-model.trim="ruleForm.rescueDescription"
              type="textarea"
              rows="8"
              maxlength="200"
              placeholder="请输入救援结果描述"
              show-word-limit
            />
          </el-form-item>
          <span v-else>{{ ruleForm.rescueDescription }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />附件
      </div>
      <upload
          file
          :show-file-list="false"
          :file-list="fileList"
          :limit="5"
          multiple
          @fileSuccess="uploadSuccess"
        />
        <FileTable
          :show-delete="tabType === 'add'"
          show-download
          :table-data="fileList"
          @handleDelete="handleDelete"
        />
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="tabType === 'add'"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        提交终止响应
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { termination,queryDetail } from '@/api/emergency-services/disposal-record'
export default {
  components: {
    upload,
    FileTable
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      isEdit: true,
      fileList: [],
      ruleForm: {
        evacuationSituation: '',
        rescueDescription: '',
        rescueTime: '',
        terminationFilePath: ''
      },
      rules: {
        rescueTime: [
          { required: true, message: '请选择救援结束时间', trigger: 'blur' }
        ],
        evacuationSituation: [
          { required: true, message: '请输入人员疏散情况', trigger: 'blur' }
        ],
        rescueDescription: [
          { required: true, message: '请输入救援结果描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isEdit = this.tabType === 'add' ? true : false
    this.fetchDetail()
  },
  methods: {
    // 查询详情
    async fetchDetail() {
      queryDetail({ id: this.id }).then(res => {
        if (res) {
          this.ruleForm = {
            evacuationSituation: res.data.evacuationSituation,
            rescueDescription: res.data.rescueDescription,
            rescueTime: res.data.rescueTime,
            terminationFilePath: res.data.terminationFilePath
          },
          this.fileList = res.data.terminationFilePath ? JSON.parse(res.data.terminationFilePath) : []
        }
      })
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
      this.loading = true
      const dto = {
        ...this.ruleForm,
        disposalId: this.id,
        rescueTime: momentDate(this.ruleForm.rescueTime),
        terminationFilePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      termination(dto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
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
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/handle/handle' })
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
    .descriptions-one{
      margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>