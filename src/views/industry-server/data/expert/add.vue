<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增专家资料' : '编辑专家资料'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-row :gutter="20">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="type === 'detail' ? {} : rules"
          label-width="125px"
          size="medium"
          :disabled="type === 'detail'"
        >
          <el-col :span="12">
            <el-form-item
              label="专家姓名:"
              prop="name"
            >
              <el-input v-model.trim="ruleForm.name" placeholder="请输入专家姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出生年月:"
              prop="dateBirth"
            >
              <el-date-picker
                v-model="ruleForm.dateBirth"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择出生年月"
                style="width: 100%;"
                :picker-options="timeOption"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="专家类别:"
              prop="category"
            >
              <el-input v-model.trim="ruleForm.category" placeholder="请输入专家类别" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="职务:"
              prop="post"
            >
              <el-input v-model.trim="ruleForm.post" placeholder="请输入职务" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工作单位及部门:"
              prop="departmentName"
            >
              <el-input v-model.trim="ruleForm.departmentName" placeholder="请输入工作单位及部门" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="技术职称:"
              prop="technicalTitle"
            >
              <el-input v-model.trim="ruleForm.technicalTitle" placeholder="请输入技术职称" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所学专业:"
              prop="major"
            >
              <el-input v-model.trim="ruleForm.major" placeholder="请输入所学专业" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="现从事岗位:"
              prop="currentPosition"
            >
              <el-input v-model.trim="ruleForm.currentPosition" placeholder="请输入现从事岗位" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="固定电话:"
              prop="fixedPhone"
            >
              <el-input v-model.trim="ruleForm.fixedPhone" placeholder="请输入固定电话" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="移动电话:"
              prop="mobilePhone"
            >
              <el-input v-model.trim="ruleForm.mobilePhone" placeholder="请输入移动电话" :maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="E-mail:"
              prop="email"
            >
              <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱地址" :maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="照片:"
              prop="photo"
              style="width: 100%;"
            >
              <upload
                v-if="type !== 'detail'"
                :file-list="ruleForm.photo"
                :limit="1"
                multiple
                @fileSuccess="uploadSuccess"
                @remove="uploadRemove"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="主要安全工作业绩:"
              prop="mainAchievements"
              style="width: 100%;"
            >
              <Editor v-model="ruleForm.mainAchievements" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
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
  </el-card>
</template>

<script>
import { telephone, phone } from '@/utils/validate'
import { getExpertById, saveExpert, updateExpert } from '@/api/general-services/public-information/expert'
import { momentDate,replaceImg } from '@/utils/index'
import upload from '@/components/upload'
import Editor from '@/components/QuillEditor'
export default {
  components: {
    upload,
    Editor
  },
  data() {
    return {
      fileList: [],
      loading: false,
      ruleForm: {
        category: '',
        currentPosition: '',
        dateBirth: '',
        departmentName: '',
        email: '',
        fixedPhone: '',
        id: null,
        mainAchievements: '',
        major: '',
        mobilePhone: '',
        name: '',
        photo: [],
        post: '',
        technicalTitle: ''
      },
      options: [],
      timeOption: {
        disabledDate(date) {
          return date.getTime() >= Date.now()
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入专家姓名', trigger: 'blur' }
        ],
        dateBirth: [
          { required: true, message: '请选择出生年月', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入专家类别', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入工作单位及部门', trigger: 'blur' }
        ],
        technicalTitle: [
          { required: true, message: '请输入技术职称', trigger: 'blur' }
        ],
        fixedPhone: [
          { required: true, message: '请输入固定电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入移动电话', trigger: 'blur' },
          { validator: phone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入有效邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入有效邮箱地址', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入所学专业', trigger: 'blur' }
        ],
        currentPosition: [
          { required: true, message: '请输入现从事岗位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.getDetail(id)
  },
  methods: {
    // 查询详情
    async getDetail(id) {
      const res = await getExpertById({ id })
      if (res.data) {
        this.ruleForm = {
          ...res.data,
          photo: res.data.photo ? JSON.parse(res.data.photo) : []
        }
        this.ruleForm.mainAchievements = await replaceImg(res.data.mainAchievements)
        this.fileList = this.ruleForm.photo
      }
    },
    // 保存
    async saveData() {
      this.loading = true
      const lawRegulationDto = {
        ...this.ruleForm,
        photo: JSON.stringify(this.fileList)
      }
      lawRegulationDto.dateBirth = momentDate(this.ruleForm.dateBirth, 'YYYY-MM-DD')
      const res = lawRegulationDto.id ? await updateExpert(lawRegulationDto) : await saveExpert(lawRegulationDto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    onEditorFocus(event) {
      if (this.type === 'detail') event.enable(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.quill-editor /deep/ .ql-container {
    height: 200px;
}
</style>
