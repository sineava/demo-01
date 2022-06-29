<template>
  <div>
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>续报记录
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
    <div v-if="tabType === 'add'" class="basic-detail">
      <div class="icon-title">
        <span class="span" />续报处置情况
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
      >
      <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="ruleForm-title"
          contentClassName="ruleForm-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />续报标题:</template>
          <el-form-item v-if="isEdit" prop="title">
            <el-input v-model.trim="ruleForm.title" maxlength="100" placeholder="请输入续报标题" />
          </el-form-item>
          <span v-else>{{ ruleForm.title }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />发生时间:</template>
          <el-form-item v-if="isEdit" prop="occurrenceTime">
            <el-date-picker
              v-model="ruleForm.occurrenceTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择发生时间"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ ruleForm.occurrenceTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />描述:</template>
          <el-form-item v-if="isEdit" prop="continueDescribe">
            <el-input
                v-model.trim="ruleForm.continueDescribe"
                type="textarea"
                rows="6"
                maxlength="200"
                placeholder="请输入描述"
                show-word-limit
            />
          </el-form-item>
          <span v-else>{{ ruleForm.continueDescribe }}</span>
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
        :show-download="true"
        :show-delete="true"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
        <div class="backstage-edit-btn">
          <el-button
            v-if="tabType !== 'detail'"
            type="primary"
            size="medium"
            :loading="loading"
            @click="submitForm('ruleForm')"
          >
            提交
          </el-button>
          <el-button
            size="medium"
            @click="returnBack"
          >
            返回
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="icon-title">
      <span class="span" />续报记录
    </div>
    <el-timeline style="margin-left: 68px;">
      <el-timeline-item
        v-for="({continueDescribe, createBy, occurrenceTime, title,filePath}, index) in renewalData"
        :key="index"
        :icon="index===0?'el-icon-more':''"
        :color="index===0?'#67C23A':'#909399'"
        :timestamp="`${occurrenceTime}`"
        placement="top"
      >
        <div>
          <h4 class="renewal-title">{{ title }}</h4>
          <p>{{ createBy }}</p>
          <p class="renewal-content">{{ continueDescribe }}</p>
          <FileTable
            v-if="filePath.length>0"
            :show-download="true"
            :show-delete="false"
            :table-data="filePath"
            @handleDelete="handleDelete"
          />
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import { saveInfo, queryInfo } from '@/api/emergency-services/disposal-fill-record'
import FileTable from '@/components/features/FileTable'
export default {
  components: {
    upload,
    FileTable
  },
  props: {
    id: {
      type: Number,
      required: 0
    },
    state: {
      type: Number,
      required: 0
    },
    tabType: {
      type: String,
      required: ''
    }
  },
  data() {
    return {
      isEdit:true,
      ruleForm: {
        continueDescribe: '',
        occurrenceTime: '',
        title: ''
      },
      fileList:[],
      loading:false,
      renewalData: [],
      rules: {
        title: [
          { required: true, message: '请填写续保标题', trigger: 'blur' }
        ],
        occurrenceTime: [
          { required: true, message: '请选择发生时间', trigger: 'blur' }
        ],
        continueDescribe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isEdit = this.tabType === 'add' ? true : false
    this.fetchData()
  },
  methods: {
    // 查询续保记录
    async fetchData() {
      queryInfo({ disposalId: this.id }).then(res => {
        this.renewalData = res.data ? res.data : []
        this.renewalData.forEach((item,index) => {
          this.renewalData[index].filePath = item.filePath ? JSON.parse(item.filePath) : []
        })
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      this.loading = true
      const dto = {
        ...this.ruleForm,
        occurrenceTime: momentDate(this.ruleForm.occurrenceTime, 'YYYY-MM-DD'),
        disposalId: this.id,
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      saveInfo(dto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.$message.success('添加成功')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
      this.loading = false
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/handle/handle' })
    },
    // 文件上传成功时的钩子
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
    .descriptions {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>

