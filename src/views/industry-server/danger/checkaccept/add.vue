<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="专项验收信息受理" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />基本信息
          </div>
        </el-form-item>
        <el-form-item
          label="申请单位名称:"
          prop="enterpriseId"
        >
          <el-select
            v-model="ruleForm.enterpriseId"
            clearable
            placeholder="请选择"
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
          prop="applyProjectName"
        >
          <el-input v-model.trim="ruleForm.applyProjectName" />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="applyContact"
        >
          <el-input v-model.trim="ruleForm.applyContact" />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="applyPrincipal"
        >
          <el-input v-model.trim="ruleForm.applyPrincipal" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="applyPhone"
        >
          <el-input v-model.trim="ruleForm.applyPhone" />
        </el-form-item>
        <el-form-item
          label="工程起止时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="ruleForm.screenTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="单位地址:"
          prop="applyAddress"
        >
          <el-input v-model.trim="ruleForm.applyAddress" />
        </el-form-item>
        <el-form-item
          label="邮编:"
          prop="applyPostcode"
        >
          <el-input v-model.trim="ruleForm.applyPostcode" />
        </el-form-item>
        <el-form-item
          label="港口项目建设概况:"
          prop="generalize"
        >
          <el-input v-model.trim="ruleForm.generalize" />
        </el-form-item>
        <el-form-item
          label="装卸/储存主要危险货物品名:"
          prop="goodsName"
        >
          <el-input v-model.trim="ruleForm.goodsName" />
        </el-form-item>
        <el-form-item
          label="安全条件审查意见书附件:"
          prop="filePathB"
          label-width="200"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="ruleForm.filePathB"
            :limit="1"
            payload="file1"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathB"
            payload="file1"
            :show-delete="true"
            @handleDelete="handleDelete"
          />
        </el-form-item>
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
            payload="file2"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathA"
            payload="file2"
            :show-delete="true"
            @handleDelete="handleDelete"
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
        <el-form-item label="业务受理">
          <el-select
            v-model="ruleForm.isPass"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in isPass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="受理意见"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.acceptOpinion"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
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
import { saveAcceptance } from '@/api/port-services/construction-dangerous-goods/safety-facility-acceptance'
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import commonTable from '@/components/features/FileTable'
import { telephone } from '@/utils/validate'
export default {
  components: {
    upload,
    commonTable
  },
  data() {
    return {
      ruleForm: {
        screenTime: [],
        enterpriseId: '',
        enterpriseName: '',
        acceptOpinion: '',
        applyAddress: '',
        applyContact: '',
        applyPhone: '',
        applyPostcode: '',
        applyPrincipal: '',
        applyProjectName: '',
        filePathA: [], // 安全设施设计审查意见书附件
        filePathB: [], // 安全条件审查意见书附件
        filePathC: [], // 其他附件
        generalize: '',
        goodsName: '',
        isPass: ''
      },
      isPass: [
        { value: 3, label: '通过' },
        { value: 4, label: '退回' }
      ],
      enterpriseList: [],
      rules: {
        enterpriseId: [
          { required: true, message: '请输入申请单位名称', trigger: 'blur' }
        ],
        applyProjectName: [
          { required: true, message: '请输入项目名称', triggger: 'blur' }
        ],
        applyPrincipal: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        applyContact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        applyPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        screenTime: [
          { required: true, message: '请选择工程起止时间', trigger: 'blur' }
        ],
        applyAddress: [
          { required: true, message: '请选择单位地址', trigger: 'blur' }
        ],
        applyPostcode: [
          { required: true, message: '请选择邮编', trigger: 'blur' }
        ],
        generalize: [
          { required: true, message: '请输入港口项目建设概况', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入装卸/储存主要危险货物品名', trigger: 'blur' }
        ],
        filePathA: [
          { required: true, message: '请选择附件', trigger: 'blur' }
        ],
        filePathB: [
          { required: true, message: '请选择附件', trigger: 'blur' }
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
        if (!valid) return false
        this.saveData()
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/checkaccept' })
    },
    // 保存
    async saveData() {
      const {
        filePathA,
        filePathB,
        filePathC
      } = this.ruleForm
      const [projectStartTime, projectEndTime] = this.ruleForm.screenTime || []
      const safetyFacilityDesignReviewInfoDto = {
        ...this.ruleForm,
        projectStartTime: momentDate(projectStartTime, 'YYYY-MM-DD'),
        projectEndTime: momentDate(projectEndTime, 'YYYY-MM-DD'),
        filePathA: JSON.stringify(filePathA),
        filePathB: JSON.stringify(filePathB),
        filePathC: JSON.stringify(filePathC)
      }
      saveAcceptance(safetyFacilityDesignReviewInfoDto).then(res => {
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
      if (payload === 'file1') list = this.ruleForm.filePathB
      if (payload === 'file2') list = this.ruleForm.filePathA
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
    uploadRemove(file, payload) {
      // 只能上传单个文件
      if (payload === 'file1') this.ruleForm.filePathB = []
      if (payload === 'file2') this.ruleForm.filePathA = []
    },
    // 移除表格数据
    handleDelete(payload) {
      if (payload === 'file1') this.ruleForm.filePathB = []
      if (payload === 'file2') this.ruleForm.filePathA = []
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
