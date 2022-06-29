<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="安全设施设计审查受理" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="申请单位名称:"
          prop="enterpriseId"
        >
          <el-select
            v-model="ruleForm.enterpriseId"
            clearable
            placeholder="请选择申请单位名称"
            style="width: 100%;"
            filterable
            remote
            reserve-keyword
            :remote-method="fetchRemote"
            @change="handleChange"
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.value"
              :label="item.enterpriseName"
              :value="item.enterpriseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目名称:"
          prop="projectName"
        >
          <el-input v-model.trim="ruleForm.projectName" maxlength="100" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="declarePrincipal"
        >
          <el-input v-model.trim="ruleForm.declarePrincipal" maxlength="20" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="declareContact"
        >
          <el-input v-model.trim="ruleForm.declareContact" maxlength="20" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="declarePhone"
        >
          <el-input v-model.trim="ruleForm.declarePhone" maxlength="11" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item
          label="审查申请时间:"
          prop="applyTime"
        >
          <el-date-picker
            v-model="ruleForm.applyTime"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择审查申请时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="申请原因:"
          prop="applyReason"
        >
          <el-input v-model.trim="ruleForm.applyReason" maxlength="200" placeholder="请输入申请原因" />
        </el-form-item>
        <el-form-item
          label="建设项目安全设施设计专篇文件附件:"
          prop="filePathE"
          label-width="200"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.filePathE"
            :limit="1"
            payload="file1"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove('file1')"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathE"
            payload="file1"
            :show-delete="true"
            @handleDelete="handleDelete('file1')"
          />
        </el-form-item>
        <el-form-item
          label="选址意见书附件:"
          prop="filePathC"
          label-width="400"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.filePathC"
            :limit="1"
            payload="file2"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove('file2')"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathC"
            payload="file2"
            :show-delete="true"
            @handleDelete="handleDelete('file2')"
          />
        </el-form-item>
        <el-form-item
          label="当地公安机关消防机构的消防设计审查文件附件:"
          prop="filePathD"
          label-width="400"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.filePathD"
            :limit="1"
            payload="file3"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove('file3')"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathD"
            payload="file3"
            :show-delete="true"
            @handleDelete="handleDelete('file3')"
          />
        </el-form-item>'
        <el-form-item
          label="安全设施设计审查意见书附件:"
          prop="filePathA"
          label-width="400"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.filePathA"
            :limit="1"
            payload="file4"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove('file4')"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathA"
            payload="file4"
            :show-delete="true"
            @handleDelete="handleDelete('file4')"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />受理意见
          </div>
        </el-form-item>
        <el-form-item
          label="受理意见"
          style="width: 100%;"
          prop="acceptOpinion"
        >
          <el-input
            v-model.trim="ruleForm.acceptOpinion"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入受理意见"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
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
  </el-card>
</template>

<script>
import { getList } from '@/api/general-services/enterpriseInfo/external'
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import commonTable from '@/components/features/FileTable'
import { telephone } from '@/utils/validate'
import { saveReview } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
export default {
  components: {
    upload,
    commonTable
  },
  data() {
    return {
      loading:false,
      id:'',
      ruleForm: {
        isPass: '',
        acceptOpinion: '',
        applyReason: '',
        applyTime: '',
        declareContact: '',
        declarePhone: '',
        declarePrincipal: '',
        filePathA: [], // 安全设施设计审查意见书扫描件
        filePathB: [], // 建设项目核准文件扫描件
        filePathC: [], // 选址意见书扫描件
        filePathD: [], // 当地公安机关消防机构的消防设计审查文件扫描件
        filePathE: [], // 建设项目安全设施设计专篇文件附件
        projectName: '',
        enterpriseId: '',
        enterpriseName: ''
      },
      enterpriseList: [],
      rules: {
        enterpriseId: [
          { required: true, message: '请选择申请单位', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', triggger: 'blur' }
        ],
        declarePrincipal: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        declareContact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        declarePhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        applyTime: [
          { required: true, message: '请选择审查申请时间', trigger: 'blur' }
        ],
        applyReason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ],
        filePathE: [
          { required: true, message: '请选择附件', trigger: 'blur' }
        ],
        filePathC: [
          { required: true, message: '请选择附件', trigger: 'blur' }
        ],
        filePathD: [
          { required: true, message: '请选择附件', trigger: 'blur' }
        ],
        filePathA: [
          { required: true, message: '请选择附件', trigger: 'blur' }
        ],
        isPass: [
          { required: true, message: '请选择受理状态', trigger: 'blur' }
        ],
        acceptOpinion: [
          { required: true, message: '请填写受理意见', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchEnterprise('')
  },
  methods: {
    // 查询企业信息
    fetchEnterprise(enterpriseName) {
      getList({ enterpriseName }).then(res => {
        this.enterpriseList = res.data ? res.data : []
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
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/facilities' })
    },
    // 保存
    async saveData() {
      this.loading = true
      const {
        applyTime,
        filePathA,
        filePathB,
        filePathC,
        filePathD,
        filePathE
      } = this.ruleForm
      const safetyFacilityDesignReviewInfoDto = {
        ...this.ruleForm,
        applyTime: momentDate(applyTime, 'YYYY-MM-DD'),
        filePathA: JSON.stringify(filePathA),
        filePathB: JSON.stringify(filePathB),
        filePathC: JSON.stringify(filePathC),
        filePathD: JSON.stringify(filePathD),
        filePathE: JSON.stringify(filePathE)
      }
      saveReview(safetyFacilityDesignReviewInfoDto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 文件上传成功时的钩子
    uploadSuccess(file, payload) {
      let list = null
      if (payload === 'file1') list = this.ruleForm.filePathE
      if (payload === 'file2') list = this.ruleForm.filePathC
      if (payload === 'file3') list = this.ruleForm.filePathD
      if (payload === 'file4') list = this.ruleForm.filePathA
      list.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(payload) {
      // 只能上传单个文件
      if (payload === 'file1') this.ruleForm.filePathE = []
      if (payload === 'file2') this.ruleForm.filePathC = []
      if (payload === 'file3') this.ruleForm.filePathD = []
      if (payload === 'file4') this.ruleForm.filePathA = []
    },
    // 移除表格数据
    handleDelete(payload) {
      if (payload === 'file1') this.ruleForm.filePathE = []
      if (payload === 'file2') this.ruleForm.filePathC = []
      if (payload === 'file3') this.ruleForm.filePathD = []
      if (payload === 'file4') this.ruleForm.filePathA = []
    },
    // 下拉框改变
    handleChange(val) {
      const { enterpriseId, enterpriseName } = this.enterpriseList.find(en => en.enterpriseId === val)
      this.ruleForm.enterpriseId = enterpriseId
      this.ruleForm.enterpriseName = enterpriseName
    },
    // 远程查询
    fetchRemote(val = '') {
      this.fetchEnterprise(val)
    }
  }
}
</script>
