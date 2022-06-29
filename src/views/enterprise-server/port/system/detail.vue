<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口制度制度详情页" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />港口制度制度信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
        class="three-column-input-table"
        label-width="100px"
        :disabled="!isEdit"
      >
        <el-form-item
          label="企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="文件名称:"
          prop="fileName"
        >
          <el-input
            v-model.trim="ruleForm.fileName"
            placeholder="请输入文件名称"
            maxlength="100"
          />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="systemType"
        >
          <el-select
            v-model="ruleForm.systemType"
            clearable
            placeholder="请选择制度类型"
            style="width: 100%;"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="编制部门:"
          prop="organizationId"
        >
          <el-cascader
            v-model="ruleForm.organizationId"
            style="width: 100%;"
            :options="departmentList"
            clearable
            :props="{label: 'organizationName', value: 'id', checkStrictly: true}"
            :show-all-levels="false"
            placeholder="请选择编制部门"
          />
        </el-form-item>
        <el-form-item
          label="编制负责人"
          prop="directorName"
        >
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请输入编制负责人"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="phone"
        >
          <el-input
            v-model.trim="ruleForm.phone"
            maxlength="11"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item
          label="文件页数:"
          prop="fileTotalPages"
        >
          <el-input-number
            v-model="ruleForm.fileTotalPages"
            :min="1"
            :max="10000000"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="有效期开始:"
          prop="expiryStartDate"
        >
          <el-date-picker
            v-model="ruleForm.expiryStartDate"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            placeholder="请选择有效期开始时间"
          />
        </el-form-item>
        <el-form-item
          label="有效期截止:"
          prop="expiryEndDate"
        >
          <el-date-picker
            v-model="ruleForm.expiryEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            placeholder="请选择有效期截止时间"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" /><i class="required" /> 文件上传/下载
          </div>
        </el-form-item>
        <upload
          v-if="isEdit"
          file
          :show-file-list="false"
          :limit="5"
          multiple
          :file-list="enterpriseSystemEnclosureInfoDtoList"
          @fileSuccess="uploadSuccess"
          @error="uploadError"
          @remove="uploadRemove"
        />
      </el-form>
      <FileTable
        :show-download="true"
        :show-delete="isEdit"
        :table-data="enterpriseSystemEnclosureInfoDtoList"
        @handleDelete="handleDelete"
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium"
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
import { telephone } from '@/utils/validate'
import FileTable from '@/components/features/FileTable'
import upload from '@/components/upload'
import { findById, addSystemInfo, editSystemInfo } from '@/api/general-services/enterpriseInfo/enterpriseBasic'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
import { momentDate, downloadCodeImg } from '@/utils/index'
export default {
  components: {
    upload,
    FileTable
  },
  data() {
    return {
      enterpriseName: '',
      ruleForm: {
        id: '',
        enterpriseId: '',
        fileName: '',
        systemType: '',
        phone: '',
        organizationId: '',
        directorName: '',
        fileTotalPages: '',
        expiryEndDate: '',
        expiryStartDate: '',
      },
      isEdit:true,
      type: [
        { value: '1', label: '人力资源管理制度' },
        { value: '2', label: '安全管理制度' },
        { value: '3', label: '财务管理制度' },
        { value: '4', label: '行政管理制度' },
        { value: '5', label: '物资管理制度' },
        { value: '6', label: '生产经营管理制度' },
        { value: '7', label: '销售管理制度' },
        { value: '8', label: '质量管理制度' }
      ],
      rules: {
        fileName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        systemType: [
          { required: true, message: '请选择制度类型', trigger: 'blur' }
        ],
        organizationId: [
          { required: true, message: '请选择编制部门', trigger: 'blur' }
        ],
        /*
         * organizationId: [
         *   { required: true, message: '请选择编制部门', trigger: 'blur' }
         * ],
         * directorName: [
         *   { required: true, message: '请输入编制负责人', trigger: 'blur' }
         * ],
         * expiryStartDate: [
         *   { required: true, message: '请选择有效期开始时间', trigger: 'blur' }
         * ],
         * expiryEndDate: [
         *   { required: true, message: '请选择有效期截止时间', trigger: 'blur' }
         * ],
         */
        phone: [
          // { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
      enterpriseSystemEnclosureInfoDtoList: []
    }
  },
  async mounted() {
    // 获取当前用户关联的企业信息
    const res = await findByUserId()
    this.enterpriseName = res.data.enterpriseName
    this.ruleForm.enterpriseId = res.data.id
    // 查询企业组织机构 树结构信息
    const obj = await findByEnOrganizationList()
    this.departmentList = obj.data
    this.isEdit = this.$route.query.type === 'details' ? false : true
    if (this.$route.query && this.$route.query.id) {
      // 通过ID查询企业制度详情
      const info = await findById(this.$route.query.id)
      this.ruleForm = {
        id: this.$route.query.id,
        enterpriseId: info.data.enterpriseId,
        fileName: info.data.fileName,
        systemType: String(info.data.systemType),
        phone: info.data.phone,
        organizationId: info.data.organizationId,
        directorName: info.data.directorName,
        fileTotalPages: info.data.fileTotalPages,
        expiryStartDate:info.data.expiryStartDate,
        expiryEndDate:info.data.expiryEndDate
      }
      this.enterpriseSystemEnclosureInfoDtoList = info.data.enterpriseSystemEnclosureInfoVoList
    }
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.enterpriseSystemEnclosureInfoDtoList.push({
        path: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        date: momentDate(Date.now())
      })
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.forEach((item, index) => {
        if (item.url === file.ydz) {
          this.fileList.splice(index, 1)
        }
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    async saveSubmit() {
      if (this.enterpriseSystemEnclosureInfoDtoList.length <= 0) {
        this.$message.error('请上传文件')
        return false
      }
      const data = { ...this.ruleForm }
      data.organizationId = data.organizationId.length > 0
        ? data.organizationId[data.organizationId.length - 1]
        : (typeof data.organizationId === 'object') ? '' : data.organizationId
      data.expiryStartDate = data.expiryStartDate ? momentDate(data.expiryStartDate,'YYYY-MM-DD') : null
      data.expiryEndDate = data.expiryEndDate ? momentDate(data.expiryEndDate,'YYYY-MM-DD') : null
      data.enterpriseSystemEnclosureInfoDtoList = []
      this.enterpriseSystemEnclosureInfoDtoList.forEach(item => {
        data.enterpriseSystemEnclosureInfoDtoList.push({
          fileName: item.fileName,
          path: item.path,
          size: item.fileSize
        })
      })
      const res = this.ruleForm.id ? await editSystemInfo(data) : await addSystemInfo(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$router.push({ path: '/port/system' })
    },
    // 删除
    handleDelete(index) {
      this.enterpriseSystemEnclosureInfoDtoList.splice(index, 1)
    },
    // 下载
    handleDownload(item) {
      downloadCodeImg(item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .required {
        margin-right: 10px;
    }

    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 33.3%;
            background-color: #ffffff;

            .quill-editor /deep/ .ql-container {
                height: 200px;
            }
        }
    }
}
</style>
