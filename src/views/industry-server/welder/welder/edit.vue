<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增焊工证书' : type === 'edit' ? '编辑焊工证书' : '焊工证书详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="medium"
        class="table-column two"
        :disabled="type === 'detail'"
        style="max-width: 1200px;"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />人员基本信息
          </div>
        </el-form-item>
        <el-form-item
          label="企业名称:"
          prop="inEnterpriseId"
        >
          <el-select
            v-model="ruleForm.inEnterpriseId"
            filterable
            :loading="eloading"
            remote
            reserve-keyword
            placeholder="请输入企业名称"
            :remote-method="remoteMethod"
            style="width: 100%;"
            clearable
            @change="selected"
          >
            <el-option
              v-for="item in enterprise"
              :key="item.id"
              :label="item.enterpriseName"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model.trim="ruleForm.inEnterpriseName" maxlength="100" placeholder="请输入企业名称" /> -->
        </el-form-item>
        <el-form-item
          label="员工姓名:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" maxlength="20" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item
          label="性别:"
          prop="sex"
        >
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">
              男
            </el-radio>
            <el-radio :label="2">
              女
            </el-radio>
            <!-- <el-radio :label="3">
              保密
            </el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="出生日期:"
          prop="birthday"
        >
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            style="width: 100%;"
            placeholder="请选择出生日期"
            :picker-options="timeOption"
          />
        </el-form-item>
        <el-form-item
          label="身份证号:"
          prop="idCard"
        >
          <el-input v-model.trim="ruleForm.idCard" maxlength="18" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item
          label="职务:"
          prop="post"
        >
          <el-input v-model.trim="ruleForm.post" maxlength="20" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item
          label="岗位:"
          prop="job"
        >
          <el-input v-model.trim="ruleForm.job" maxlength="30" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item
          label="学历:"
          prop="educationBackground"
        >
          <el-select
            v-model="ruleForm.educationBackground"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in educationBackground"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="专业:"
          prop="professional"
        >
          <el-input v-model.trim="ruleForm.professional" maxlength="30" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item
          label="职称:"
          prop="title"
        >
          <el-input v-model.trim="ruleForm.title" maxlength="50" placeholder="请输入职称" />
        </el-form-item>
        <el-form-item
          label="专业方向:"
          prop="majorField"
        >
          <el-input v-model.trim="ruleForm.majorField" maxlength="100" placeholder="请输入专业方向" />
        </el-form-item>
        <el-form-item
          label="办公电话:"
          prop="phone"
        >
          <el-input v-model.trim="ruleForm.phone" maxlength="20" placeholder="请输入办公电话" />
        </el-form-item>
        <el-form-item
          label="移动电话:"
          prop="mobilePhone"
        >
          <el-input v-model.trim="ruleForm.mobilePhone" maxlength="11" placeholder="请输入移动电话" />
        </el-form-item>
        <el-form-item
          label="电子邮箱:"
          prop="email"
        >
          <el-input v-model.trim="ruleForm.email" maxlength="30" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            placeholder="请输入备注"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="员工图片:"
          prop="personFile"
          style="width: 100%;"
        >
          <upload
            payload="person"
            :file-list="ruleForm.personFile"
            :limit="5"
            @success="success"
            @remove="remove"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />证书信息
          </div>
        </el-form-item>
        <el-form-item
          label="证书名称:"
          prop="certificateName"
        >
          <el-input v-model.trim="ruleForm.certificateName" maxlength="100" placeholder="请输入证书名称" />
        </el-form-item>
        <el-form-item
          label="证书类型:"
          prop="certificateType"
        >
          <el-input v-model.trim="ruleForm.certificateType" maxlength="50" placeholder="请输入证书类型" />
        </el-form-item>
        <el-form-item
          label="证书颁发机构:"
          prop="certificateIssuingAuthority"
        >
          <el-input v-model.trim="ruleForm.certificateIssuingAuthority" maxlength="100" placeholder="请输入证书颁发机构" />
        </el-form-item>
        <el-form-item
          label="证书编号:"
          prop="certificateNumber"
        >
          <el-input v-model.trim="ruleForm.certificateNumber" maxlength="30" placeholder="请输入证书编号" />
        </el-form-item>
        <el-form-item
          label="颁发日期:"
          prop="startDate"
        >
          <el-date-picker
            v-model="ruleForm.startDate"
            type="date"
            style="width: 100%;"
            placeholder="请选择颁发日期"
          />
        </el-form-item>
        <el-form-item
          label="有效期至:"
          prop="endDate"
        >
          <el-date-picker
            v-model="ruleForm.endDate"
            type="date"
            style="width: 100%;"
            placeholder="请选择有效期至"
          />
        </el-form-item>
        <el-form-item
          label="证书图片:"
          prop="certificateFile"
        >
          <upload
            payload="cert"
            :file-list="ruleForm.certificateFile"
            :limit="5"
            @success="success"
            @remove="remove"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
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
import { momentDate } from '@/utils/index'
import { identity, telephone, phone } from '@/utils/validate'
import upload from '@/components/upload'
import {
  addData,
  updateData,
  getInfo,
  queryEnterprise
} from '@/api/ship-inspection/welder/welder'
export default {
  components: {
    upload
  },
  data() {
    return {
      type: '',
      options: [],
      eloading:false,
      loading: false,
      enterprise: [],
      ruleForm: {
        birthday: '',
        certificateFile: [],
        certificateIssuingAuthority: '',
        certificateName: '',
        certificateNumber: '',
        certificateType: '',
        educationBackground: '',
        email: '',
        endDate: '',
        id: null,
        idCard: '',
        inEnterpriseName: '',
        inEnterpriseId:'',
        job: '',
        majorField: '',
        mobilePhone: '',
        name: '',
        personFile: [],
        phone: '',
        post: '',
        professional: '',
        remark: '',
        sex: null,
        startDate: '',
        title: ''
      },
      personList: [], // *人员图片
      certList: [], // *证书图片
      educationBackground: [
        { value: 1, label: '初中及以下' },
        { value: 2, label: '中专' },
        { value: 3, label: '高中' },
        { value: 4, label: '大专' },
        { value: 5, label: '本科' },
        { value: 6, label: '硕士' },
        { value: 7, label: '博士' },
        { value: 8, label: '其他' }
      ],
      timeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now()
        }
      },
      rules: {
        inEnterpriseId: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: identity, trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入岗位', trigger: 'blur' }
        ],
        educationBackground: [
          { required: true, message: '请输入学历', trigger: 'blur' }
        ],
        professional: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入职称', trigger: 'blur' }
        ],
        majorField: [
          { required: true, message: '请输入专业方向', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入办公电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入移动电话', trigger: 'blur' },
          { validator: phone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确电子邮箱', trigger: 'blur' }
        ],
        certificateName: [
          { required: true, message: '请输入证书名称', trigger: 'blur' }
        ],
        certificateType: [
          { required: true, message: '请输入证书类型', trigger: 'blur' }
        ],
        certificateIssuingAuthority: [
          { required: true, message: '请输入证书颁发机构', trigger: 'blur' }
        ],
        certificateNumber: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择颁发日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择有效期至', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      getInfo({id}).then(res => {
        this.ruleForm = {
          ...res.data,
          personFile: res.data.personFile ? JSON.parse(res.data.personFile) : [],
          certificateFile: res.data.certificateFile ? JSON.parse(res.data.certificateFile) : []
        }
        if (res.data.inEnterpriseName){
          this.queryEnter(res.data.inEnterpriseName)
        }
        this.personList = [...this.ruleForm.personFile]
        this.certList = [...this.ruleForm.certificateFile]
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    selected(value){
      if (!value){
        this.inEnterpriseName = ''
        return
      }
      this.enterprise.forEach(item=>{
        if (item.id===value){
          this.ruleForm.inEnterpriseName = item.enterpriseName
          return true
        }
      })
    },
    // 下拉选项搜索
    remoteMethod(query){
      if (query){
        this.queryEnter(query)
      } else {
        this.enterprise = []
      }
    },
    // 查询企业
    queryEnter(value){
      this.eloading = true
      queryEnterprise({enterpriseName:value}).then(res => {
        this.enterprise = res.data || []
        this.eloading = false
      })
    },
    async saveData() {
      this.loading = true
      const dto = {
        ...this.ruleForm,
        personFile: this.personList.length ? JSON.stringify(this.personList) : '',
        certificateFile: this.certList.length ? JSON.stringify(this.certList) : '',
        birthday: momentDate(this.ruleForm.birthday, 'YYYY-MM-DD'),
        startDate: momentDate(this.ruleForm.startDate, 'YYYY-MM-DD'),
        endDate: momentDate(this.ruleForm.endDate, 'YYYY-MM-DD')
      }
      delete dto.isOverdue
      delete dto.enterpriseId
      delete dto.enterpriseName
      const res = dto.id ? await updateData(dto) : await addData(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 图片上传成功hook
    success(file, payload) {
      if (payload === 'person') {
        this.personList.push({
          url: file.data
        })
      }
      if (payload === 'cert') {
        this.certList.push({
          url: file.data
        })
      }
    },
    // 图片移除hook
    remove(file, payload) {
      if (payload === 'person') {
        this.personList = this.personList.filter(x => x.url !== file.url)
      }
      if (payload === 'cert') {
        this.certList = this.certList.filter(x => x.url !== file.url)
      }
    }
  }
}
</script>
