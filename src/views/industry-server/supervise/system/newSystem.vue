<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="新增管理部门制度" />
      </span>
    </div>
    <div class="app-container newSystem-form">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="110px"
        size="medium"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="文件名:"
              prop="regimeName"
            >
              <el-input v-model.trim="ruleForm.regimeName" maxlength="50" placeholder="请输入文件名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="制度类型:"
              prop="regimeType"
            >
              <el-input v-model.trim="ruleForm.regimeType" maxlength="50" placeholder="请输入制度类型" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="适用机构:"
              prop="applicableAgenciesId"
            >
              <el-cascader
                v-model="ruleForm.applicableAgenciesId"
                style="width: 100%;"
                :options="options"
                clearable
                collapse-tags
                :props="{'label': 'departmentName', 'value': 'id', 'checkStrictly': true,expandTrigger: 'hover', multiple: true}"
                :show-all-levels="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="编制部门:"
              prop="compile"
            >
              <!-- <el-cascader
                v-model="ruleForm.departmentId"
                style="width: 100%;"
                :options="options"
                clearable
                :props="{'label': 'departmentName', 'value': 'id', 'checkStrictly': true,expandTrigger: 'hover'}"
                :show-all-levels="false"
              /> -->
              <el-input v-model.trim="ruleForm.compile" maxlength="50" placeholder="请输入编制部门" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="编制负责人:"
              prop="principal"
            >
              <el-input v-model.trim="ruleForm.principal" maxlength="50" placeholder="请输入编制负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话:"
              prop="principalPhone"
            >
              <el-input v-model.trim="ruleForm.principalPhone" maxlength="11" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="有效期至:"
              prop="validityTime"
            >
              <el-date-picker
                v-model="ruleForm.validityTime"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="文件页数:"
              prop="pages"
            >
              <el-input-number
                v-model="ruleForm.pages"
                :min="1"
                :max="100000"
                label="请输入文件页数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="备注:"
          prop="remark"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            :rows="6"
            type="textarea"
            placeholder="请输入备注"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="文件上传:"
          prop="filePath"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
      </el-form>
      <FileTable
        :show-download="false"
        :show-delete="true"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
    </div>
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
  </el-card>
</template>
<script>
import FileTable from '@/components/features/FileTable'
import { toTreeData, momentDate } from '@/utils/index'
import { telephone } from '@/utils/validate'
import upload from '@/components/upload'
import { getManagementDepartmentLikeName } from '@/api/general-services/supervisory-capability/management-department'
import { managementRegimeSave, updateRegime } from '@/api/general-services/supervisory-capability/management-regime'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    return {
      options: [],
      loading: false,
      ruleForm: {
        applicableAgenciesId: '',
        filePath: [],
        id: null, // 新增
        departmentId: '',
        pages: '',
        principal: '',
        principalPhone: '',
        regimeName: '',
        regimeType: '',
        remark: '',
        validityTime: ''
      },
      fileList: [],
      rules: {
        applicableAgenciesId: [
          { required: true, message: '请选择适用机构', trigger: 'blur' }
        ],
        compile: [
          { required: true, message: '请选择编制部门', trigger: 'blur' }
        ],
        pages: [
          { required: true, message: '请输入文件页数', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入编制负责人', trigger: 'blur' }
        ],
        principalPhone: [
          { required: true, message: '请输入负责人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        regimeName: [
          { required: true, message: '请输入文件名', trigger: 'blur' }
        ],
        regimeType: [
          { required: true, message: '请输入制度类型', trigger: 'blur' }
        ],
        validityTime: [
          { required: true, message: '请选择有效时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchDepts()
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      const res = await getManagementDepartmentLikeName({ departmentName: '', flag: this.type === 'detail' })
      this.options = toTreeData(res.data)
    },
    // 保存数据
    async saveData() {
      const regimeInfoDto = {
        ...this.ruleForm,
        applicableAgenciesId: this.ruleForm.applicableAgenciesId,
        compile: this.ruleForm.compile,
        validityTime: momentDate(this.ruleForm.validityTime,'YYYY-MM-DD'),
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      const applicableAgenciesIds = this.unique2(regimeInfoDto.applicableAgenciesId ? regimeInfoDto.applicableAgenciesId.join(',').split(',') : [])
      regimeInfoDto.applicableAgenciesIds = regimeInfoDto.applicableAgenciesId ? JSON.stringify(regimeInfoDto.applicableAgenciesId) : ''
      regimeInfoDto.applicableAgenciesId = applicableAgenciesIds.join(',')
      const res = regimeInfoDto.id ? await updateRegime(regimeInfoDto) : await managementRegimeSave(regimeInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    unique2(arr){
      let hash=[]
      for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i])==i){
          hash.push(arr[i])
        }
      }
      return hash
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
        this.loading = false
      })
      this.loading = false
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
