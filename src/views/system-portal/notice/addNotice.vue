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
        label="公告标题:"
        prop="messageTitle"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <el-input
              v-model.trim="ruleForm.messageTitle"
              placeholder="请输入公告标题"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="公告类型:"
        prop="noticeType"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <el-select v-model="ruleForm.noticeType" placeholder="请选择公告类型" style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="推送类型:"
        prop="sendType"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <el-radio-group v-model="ruleForm.sendType">
              <el-radio :label="1" border>对外公告</el-radio>
              <el-radio :label="2" border>对内公告</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="发送人:"
        prop="sendBy"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <el-input
              v-model="ruleForm.sendBy"
              disabled
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.sendType === 2"
        label="接收人:"
        prop="noticeMessageOrgDtoList"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <el-select
              v-model="ruleForm.noticeMessageOrgDtoList"
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
          </el-col>
          <el-col :span="4">
            <el-button type="success" size="mini" @click="commonlyUsed">常用联系人</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="公告详情:"
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
        返回
      </el-button>
    </div>
    <CommonlyUsed ref="CommonlyUsed" :orgList="orgList" @setNoticeMessageOrgDtoList="setNoticeMessageOrgDtoList" />
  </div>
</template>
<script>
import Editor from '@/components/QuillEditor'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { momentDate,replaceImg } from '@/utils/index'
import { setNoticeData, getOrgList } from '@/api/system-portal/new-notice'
import CommonlyUsed from './commonlyUsed'
export default {
  components: {
    upload,
    FileTable,
    Editor,
    CommonlyUsed
  },
  props:{
    roleButton:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      ruleForm: {
        messageTitle: '',
        noticeType: '',
        sendBy: '',
        sendId: '',
        sendType: '',
        messageContent: "",
        noticeMessageOrgDtoList: []
      },
      rules: {
        messageTitle: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
        ],
        noticeType: [
          { required: true, message: '请选择公告类型', trigger: 'change' },
        ],
        sendType: [
          { required: true, message: '请选择推送类型', trigger: 'change' },
        ],
        /*
         * messageContent: [
         *   { required: true, message: '请输入信息详情', trigger: 'blur' },
         * ],
         */
        noticeMessageOrgDtoList: [
          { required: true, message: '请选择接收人', trigger: 'change' },
        ],
      },
      fileList: [],
      loading: false,
      options: [],
      orgList: []
    }
  },
  async mounted() {
    this.ruleForm.sendBy = this.$store.getters.user_info.orgname
    this.getSendType()
    // 获取机构列表
    const data = (await getOrgList()).data || []
    this.ruleForm.messageContent = await replaceImg(this.ruleForm.messageContent)
    this.orgList = data.filter(x => x.orgCategory !== '4')
  },
  methods: {
    // 常用联系人
    commonlyUsed(){
      this.$refs.CommonlyUsed.handleOpen()
    },
    getSendType(){
      if (this.roleButton.inside_notice){
        this.options.push({label: '内部公告', value: 1})
      }
      if (this.roleButton.port_notice){
        this.options.push({label: '港口公告', value: 2})
      }
      if (this.roleButton.wt_notice){
        this.options.push({label: '水路运输公告', value: 3})
      }
      if (this.roleButton.channel_notice){
        this.options.push({label: '航道公告', value: 4})
      }
      if (this.roleButton.emeng_notice){
        this.options.push({label: '应急公告', value: 5})
      }
      if (this.roleButton.inspec_notice){
        this.options.push({label: '船检公告', value: 6})
      }
      if (this.roleButton.sea_notice){
        this.options.push({label: '海事公告', value: 7})
      }
      if (this.roleButton.synthesize_notice){
        this.options.push({label: '综合类公告', value: 8})
      }
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
    returnBack() {
      this.$emit('return')
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
    setNoticeMessageOrgDtoList(list){
      this.ruleForm.noticeMessageOrgDtoList = list || []
    },
    save() {
      let data = { ...this.ruleForm}
      data.enclosureInfo = JSON.stringify(this.fileList)
      let noticeMessageOrgDtoList = []
      data.noticeMessageOrgDtoList.forEach(item => {
        noticeMessageOrgDtoList.push({orgId: item})
      })
      data.noticeMessageOrgDtoList = [...noticeMessageOrgDtoList]
      this.loading = true
      setNoticeData(data).then((res) => {
        this.loading = false
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
