<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'detail' ? '管理部门制度详情页' : '编辑管理部门制度'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />制度基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="medium"
        :disabled="type === 'detail'"
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
              <el-input
                v-if="type === 'detail'"
                v-model="ruleForm.applicableAgenciesName"
              />
              <el-cascader
                v-else
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
              <el-input v-model.trim="ruleForm.compile" placeholder="请输入编制部门" />
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
                placeholder="请输入文件页数"
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
            type="textarea"
            :rows="6"
            placeholder="请输入备注"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />文件附件
          </div>
        </el-form-item>
        <el-form-item
          v-if="type !== 'detail'"
          label-width="0"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            multiple
            :limit="5"
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
import FileTable from '@/components/features/FileTable'
import upload from '@/components/upload'
import { getManagementDepartmentLikeName } from '@/api/general-services/supervisory-capability/management-department'
import { managementRegimeQuery, updateRegime } from '@/api/general-services/supervisory-capability/management-regime'
import { momentDate, downloadCodeImg, toTreeData } from '@/utils/index'
import { telephone } from '@/utils/validate'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    return {
      loading:false,
      type: '',
      ruleForm: {},
      options: [],
      fileList: [],
      rules: {
        applicableAgenciesId: [
          { required: true, message: '请选择适用机构', trigger: 'change' }
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
  async created() {
    const { type, id } = this.$route.query
    this.type = type
    await this.fetchDepts()
    await this.getDetail(id)
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      const res = await getManagementDepartmentLikeName({ departmentName: '', flag: this.type === 'detail' })
      this.options = toTreeData(res.data)
    },
    // 查询详情
    async getDetail(detailId) {
      const res = await managementRegimeQuery({ id: detailId })
      if (!res.data) return
      const {
        // applicableAgenciesId,
        applicableAgenciesIds,
        applicableAgenciesName,
        compile,
        filePath,
        id,
        pages,
        principal,
        principalPhone,
        regimeName,
        regimeType,
        remark,
        validityTime
      } = res.data
      this.ruleForm = {
        applicableAgenciesId: typeof applicableAgenciesIds === 'number' ? applicableAgenciesIds : (applicableAgenciesIds ? JSON.parse(applicableAgenciesIds) : []),
        applicableAgenciesName,
        compile: compile,
        filePath: filePath ? JSON.parse(filePath) : [],
        id,
        pages,
        principal,
        principalPhone,
        regimeName,
        regimeType,
        remark,
        validityTime
      }
      this.fileList = this.ruleForm.filePath
    },
    /**
     * 下载
     */
    handleDownload(item) {
      downloadCodeImg(item.filePath)
    },
    // 提交
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
          this.loading = false
        } else {
          this.loading = false

          return false
        }
      })
      this.loading = false
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
    // 保存
    async saveData() {
      const regimeInfoDto = {
        ...this.ruleForm,
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      const applicableAgenciesIds = this.unique2(regimeInfoDto.applicableAgenciesId ? regimeInfoDto.applicableAgenciesId.join(',').split(',') : [])
      regimeInfoDto.validityTime = momentDate(this.ruleForm.validityTime,'YYYY-MM-DD')
      regimeInfoDto.applicableAgenciesIds = regimeInfoDto.applicableAgenciesId ? JSON.stringify(regimeInfoDto.applicableAgenciesId) : ''
      regimeInfoDto.applicableAgenciesId = applicableAgenciesIds.join(',')
      const res = await updateRegime(regimeInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/supervise/system' })
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize:parseInt(file.size / 1024),
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
