<template>
  <div style="margin: 24px 100px 0 0; flex: 1;">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      size="medium"
      class="system-forms"
      label-width="100px"
    >
      <el-form-item
        label="信息标题:"
        prop="messageTitle"
        style="width: 500px;"
      >
        <el-input
          v-model.trim="ruleForm.messageTitle"
          placeholder="请输入信息标题"
        />
      </el-form-item>
      <el-form-item
        label="信息类型:"
        prop="noticeType"
        style="width: 500px;"
      >
        <el-select v-model="ruleForm.noticeType" placeholder="请选择信息类型" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="发送人:"
        prop="sendUnit"
        style="width: 500px;"
      >
        <el-input
          v-model="ruleForm.sendUnit"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="接收人:"
        prop="adviseMessageOrgInfoDtoList"
        style="width: 500px;"
      >
        <el-select
          v-model="ruleForm.adviseMessageOrgInfoDtoList"
          multiple
          collapse-tags
          placeholder="请选择接收人"
          style="width: 100%;"
        >
          <el-option
            v-for="item in orgList"
            :key="item.orgId"
            :label="item.orgName"
            :value="item.orgId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="信息详情:"
        prop="messageContent"
      >
        <Editor v-model="ruleForm.messageContent" />
      </el-form-item>
      <el-form-item
        label="上传附件:"
        prop="file"
      >
        <upload
          file
          :limit="5"
          multiple
          :file-list="fileList"
          :show-file-list="false"
          @fileSuccess="uploadSuccess"
        />
      </el-form-item>
    </el-form>
    <FileTable
      :table-data="fileList"
      showDelete
      @handleDelete="handleDelete"
    />
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium "
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
import Editor from '@/components/QuillEditor'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { momentDate,replaceImg } from '@/utils/index'
import { setMessageData, getOrgList } from '@/api/system-portal/new-notice'
export default {
  components: {
    Editor,
    upload,
    FileTable
  },
  data() {
    return {
      ruleForm: {
        sendUnit: '',
        messageTitle: '',
        noticeType: '',
        adviseMessageOrgInfoDtoList: []
      },
      rules: {
        messageTitle: [
          { required: true, message: '请输入信息标题', trigger: 'blur' },
        ],
        // messageContent: [
        //   { required: true, message: '请输入信息详情', trigger: 'blur' },
        // ],
        noticeType: [
          { required: true, message: '请选择信息类型', trigger: 'change' },
        ],
        adviseMessageOrgInfoDtoList: [
          { required: true, message: '请选择接收人', trigger: 'change' },
        ],
      },
      fileList: [],
      loading: false,
      orgList: [],
      options: [
        {label: '突发性性信息',value: 1},
        {label: '反馈信息',value: 2},
        {label: '综合性信息',value: 3},
        {label: '追踪性信息',value: 4},
        {label: '调研性信息',value: 5},
        {label: '会议动态信息',value: 6}
      ]
    }
  },
  async mounted() {
    this.ruleForm.sendUnit = this.$store.getters.user_info.orgname
    this.ruleForm.messageContent = await replaceImg(this.ruleForm.messageContent)
    // 获取机构列表
    this.orgList = (await getOrgList()).data || []
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
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    // 重置
    returnBack() {
      this.$refs['ruleForm'].resetFields()
      this.ruleForm.sendBy = this.$store.getters.user_info.orgname
    },
    // 发布
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      let data = { ...this.ruleForm}
      data.enclosureInfo = JSON.stringify(this.fileList)
      let adviseMessageOrgInfoDtoList = []
      data.adviseMessageOrgInfoDtoList.forEach(item => {
        adviseMessageOrgInfoDtoList.push({orgId: item, orgType: 2})
      })
      data.adviseMessageOrgInfoDtoList = [...adviseMessageOrgInfoDtoList]
      this.loading = true
      setMessageData(data).then((res) => {
        this.loading = false
        if (res.code === '0') {
          this.$emit('submit')
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
