<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="dataForm table-column two"
      :disabled="type === 'detail'"
    >
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" />权限申请人信息
        </div>
      </el-form-item>
      <el-form-item
        label="姓名:"
        prop="fullName"
      >
        <el-input
          :value="userInfo.username"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="所属单位:"
        prop="organizationName"
      >
        <el-input
          :value="userInfo.orgname"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="职务:"
        prop="post"
      >
        <el-input
          v-model="ruleForm.post"
          placeholder="请输入职务"
        />
      </el-form-item>
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" />申请权限内容
        </div>
      </el-form-item>
      <el-form-item
        label="权限申请描述:"
        prop="applicationDescription"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.applicationDescription"
          type="textarea"
          rows="6"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="申请原因:"
        prop="applicationReason"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.applicationReason"
          type="textarea"
          rows="6"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remarks"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.remarks"
          type="textarea"
          rows="6"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" />申请材料
        </div>
      </el-form-item>
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <upload
          v-if="type !== 'detail'"
          file
          :file-list="fileList"
          :show-file-list="false"
          multiple
          @fileSuccess="uploadSuccess"
        />
      </el-form-item>
    </el-form>
    <FileTable
      :show-download="type !== 'add'"
      :show-delete="type !== 'detail'"
      :table-data="fileList"
      @handleDelete="handleDelete"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button @click="back">
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { mapState } from 'vuex'
import { momentDate } from '@/utils/index'
import { addAuthority, getAuthorityDetail, updateAuthority } from '@/api/system-portal/authority-application'
export default {
  components: {
    upload,
    FileTable
  },
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        applicationDescription: '',
        applicationReason: '',
        fullName: '',
        id: null,
        materials: [],
        organizationId: '',
        organizationName: '',
        post: '',
        remarks: '',
        userId: '',
        userType: ''
      },
      fileList: [],
      rules: {
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        applicationDescription: [
          { required: true, message: '请输入权限申请描述', trigger: 'blur' }
        ],
        applicationReason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.user_info[0]
    })
  },
  created() {
    const { id, type } = this.payload
    this.type = type
    if (id) { // 详情/编辑
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getAuthorityDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          materials: res.data.materials ? JSON.parse(res.data.materials) : []
        }
        this.fileList = this.ruleForm.materials
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.fileList.length) {
            this.$message.warning('请提交申请材料')
            return false
          }
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      const userInfo = this.$store.state.user.user_info[0]
      const authorityApplicationDto = {
        ...this.ruleForm,
        fullName: userInfo.username,
        organizationId: Number(userInfo.orgid),
        organizationName: userInfo.orgname,
        materials: JSON.stringify(this.fileList),
        userId: Number(userInfo.userid),
        userType: Number(userInfo.usercategory)
      }
      delete authorityApplicationDto.isStatus
      delete authorityApplicationDto.rejectReason
      delete authorityApplicationDto.acceptorBy
      delete authorityApplicationDto.acceptorDate
      delete authorityApplicationDto.createTime
      const res = this.type === 'add' ? await addAuthority(authorityApplicationDto) : await updateAuthority(authorityApplicationDto)
      if (res.code === '0') {
        this.back()
      }
    },
    // 文件上传完成钩子
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
      this.fileList.forEach((item, index) => {
        if (item.url === file.ydz) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 返回
    back() {
      this.$emit('switchOper', { payload: { tab: 'list' }})
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.dataForm {
    margin: 20px 0;
    padding-left: 50px;

    .form-title {
        margin: 36px 0 18px 0;
        font-size: 16px;
        font-weight: 600;
        color: #5b5b5b;
    }

    /deep/ .el-form-item__label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
    }

    /deep/ .el-button--primary {
        width: 150px;
        height: 42px;
    }
}
</style>
