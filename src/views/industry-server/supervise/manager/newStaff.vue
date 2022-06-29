<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增人员' : type === 'edit' ? '编辑人员' : '人员详情'" />
      </span>
    </div>
    <div class="app-container">
      <div class="icon-title">
        <span class="span" />人员基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="姓名:"
              prop="name"
            >
              <el-input
                v-model="ruleForm.name"
                maxlength="50"
                placeholder="请输入姓名"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话:"
              prop="phone"
            >
              <el-input
                v-model="ruleForm.phone"
                maxlength="11"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item
              label="性别:"
              prop="sex"
            >
              <el-radio-group v-model="ruleForm.sex" disabled>
                <el-radio label="男">
                  男
                </el-radio>
                <el-radio label="女">
                  女
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="身份证号:"
              prop="idCard"
            >
              <el-input
                v-model="ruleForm.idCard"
                maxlength="18"
                placeholder="请输入身份证号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出生年月日:"
              prop="birthDate"
            >
              <el-date-picker
                v-model="ruleForm.birthDate"
                type="date"
                placeholder="请选择出生年月日"
                :picker-options="timeOption"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="职务:"
              prop="post"
            >
              <el-input
                v-model="ruleForm.post"
                maxlength="50"
                placeholder="请输入职务"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="职称:"
              prop="position"
            >
              <el-input
                v-model="ruleForm.position"
                maxlength="50"
                placeholder="请输入职称"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <!-- <el-col :span="12">
            <el-form-item
              label="所属机构:"
              prop="departmentId"
            >
              <el-cascader
                v-model="ruleForm.departmentId"
                placeholder="请选择所属机构"
                style="width: 100%;"
                clearable
                :options="departmentList"
                :props="{ checkStrictly: true, expandTrigger: 'hover' }"
                :show-all-levels="false"
              />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item
              label="联系电话:"
              prop="phone"
            >
              <el-input
                v-model="ruleForm.phone"
                maxlength="11"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="联系地址:"
              prop="address"
            >
              <el-input
                v-model="ruleForm.address"
                maxlength="100"
                placeholder="请输入联系地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="电子邮件:"
              prop="email"
            >
              <el-input
                v-model="ruleForm.email"
                maxlength="50"
                placeholder="请输入电子邮件"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="传真:"
              prop="fax"
            >
              <el-input
                v-model="ruleForm.fax"
                maxlength="20"
                placeholder="请输入传真号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否党员:"
              prop="isPartyMember"
            >
              <el-select v-model="ruleForm.isPartyMember" placeholder="请选择" style="width:100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="职责:"
          prop="obligation"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.obligation"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入职责"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入备注"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="照片:"
          prop="photo"
        >
          <upload
            :file-list="photoList"
            :limit="1"
            multiple
            @fileSuccess="uploadPhotoSuccess"
            @remove="uploadPhotoRemove"
          />
        </el-form-item>
        <div class="icon-title">
          <span class="span" />人员持证信息
        </div>
        <el-form-item
          label="适任证书类型:"
          prop="certificateType"
        >
          <el-input
            v-model.trim="ruleForm.certificateType"
            maxlength="30"
            placeholder="请输入适任证书类型"
          />
        </el-form-item>
        <el-form-item
          label="适任证书编号:"
          prop="certificateCode"
        >
          <el-input
            v-model.trim="ruleForm.certificateCode"
            maxlength="30"
            placeholder="请输入适任证书编号"
          />
        </el-form-item>
        <el-form-item
          label="上传附件:"
          prop="filePath"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadFileSuccess"
          />
        </el-form-item>
      </el-form>
      <FileTable
        :show-download="type !== 'add'"
        :show-delete="type !== 'detail'"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium "
        :loading="loading"
        @click="submitForm"
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
import FileTable from '@/components/features/FileTable'
import { identity, telephone, fax } from '@/utils/validate'
import { saveManagementPerson, updatePerson, getDetail } from '@/api/general-services/supervisory-capability/management-person'
import getDepts from '@/utils/getDepts'
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    // *级联如果clear后会导致[],此时验证会通过(垃圾element)
    let validDept = (_, val, cb) => {
      if (val instanceof Array && val.length === 0) {
        cb(new Error('请选择所属机构'))
      } else {
        cb()
      }
    }
    return {
      type: '',
      photoList: [], // 图片列表
      loading:false,
      fileList: [], // 附件列表
      ruleForm: {
        address: '',
        birthDate: '',
        certificateCode: '',
        certificateType: '',
        departmentId: '',
        email: '',
        fax: '',
        filePath: [],
        id: null,
        name: '',
        obligation: '',
        phone: '',
        photo: [],
        position: '',
        post: '',
        remark: '',
        sex: '',
        isPartyMember: 0
      },
      timeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now()
        }
      },
      departmentList: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入2~30个字符姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: identity, message: '请输入15/18位身份证号码', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '请选择出生年月', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' },
          { validator: validDept, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入联系地址', trigger: 'blur' },
          { min: 2, max: 100, message: '请输入2~100个字符地址', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入有效邮箱地址', trigger: 'blur' }
        ],
        fax: [
          { validator: fax, message: '请输入传真号码', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职称', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.getDepartment()
    if (id) {
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      const res = await getDetail({ id })
      if (!res.data) return
      this.ruleForm = {
        ...res.data,
        photo: res.data.photo ? JSON.parse(res.data.photo) : [],
        filePath: res.data.filePath ? JSON.parse(res.data.filePath) : []
      }
      this.photoList = JSON.parse(JSON.stringify(this.ruleForm.photo))
      this.fileList = JSON.parse(JSON.stringify(this.ruleForm.filePath))
      this.ruleForm.departmentName = this.$route.query.departmentName
    },
    // 查询部门树信息
    async getDepartment() {
      const res = await getDepts()
      this.departmentList = res
    },
    // 提交
    submitForm() {
      this.loading = true
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        this.saveData()
        this.loading = false
      })
      this.loading = false
    },
    // 保存数据
    async saveData() {
      const departmentId = this.ruleForm.departmentId
      if (departmentId instanceof Array) this.ruleForm.departmentId = departmentId[departmentId.length - 1]
      const managementPersonInfoDto = {
        ...this.ruleForm,
        birthDate: momentDate(this.ruleForm.birthDate, 'YYYY-MM-DD'),
        photo: this.photoList ? JSON.stringify(this.photoList) : '',
        filePath: this.fileList ? JSON.stringify(this.fileList) : ''
      }
      const res = this.ruleForm.id ? await updatePerson(managementPersonInfoDto) : await saveManagementPerson(managementPersonInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 图片上传成功钩子
    uploadPhotoSuccess(file) {
      this.photoList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 图片列表移除图片时的钩子
    uploadPhotoRemove(file) {
      this.photoList.splice(this.photoList.findIndex(item => item.uid === file.uid), 1)
    },
    // 文件上传成功钩子
    uploadFileSuccess(file) {
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
      this.$router.push({ path: '/supervise/manager' })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
    display: flex;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;

    .span {
        display: inline-block;
        margin-right: 7px;
        width: 6px;
        height: 18px;
        background-color: #409eff;
    }
}
</style>
