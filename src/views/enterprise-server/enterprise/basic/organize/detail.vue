<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增部门' : type === 'edit' ? '编辑部门' : '部门详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />组织机构信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
        class="three-column-input-table"
        label-width="140px"
        :disabled="type === 'detail'"
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
          label="机构名称:"
          prop="organizationName"
        >
          <el-input v-model.trim="ruleForm.organizationName" placeholder="请输入机构名称" maxlength="100" />
        </el-form-item>
        <el-form-item
          label="上级部门:"
          prop="parentId"
        >
          <el-cascader
            v-model="ruleForm.parentId"
            style="width: 100%;"
            :options="departmentList"
            clearable
            :props="{'label': 'organizationName', 'value': 'id', 'checkStrictly': true}"
            :show-all-levels="false"
            placeholder="请选择上级部门"
          />
        </el-form-item>
        <el-form-item
          label="负责人姓名:"
          prop="directorName"
        >
          <el-input v-model.trim="ruleForm.directorName" placeholder="请输入负责人姓名" maxlength="30" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="directorPhone"
        >
          <el-input
            v-model.trim="ruleForm.directorPhone"
            placeholder="请输入联系电话"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item
          label="机构排序:"
          prop="serialNumber"
        >
          <el-input-number
            v-model="ruleForm.serialNumber"
            :min="1"
            :max="1000"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="是否启用:"
          prop="isStatus"
        >
          <el-select
            v-model="ruleForm.isStatus"
            placeholder="请选择是否启用"
            style="width: 100%;"
          >
            <el-option
              label="是"
              :value="1"
            />
            <el-option
              label="否"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门职责:"
          prop="departmentDuty"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.departmentDuty"
            type="textarea"
            rows="4"
            show-word-limit
            maxlength="200"
            placeholder="请输入部门职责"
          />
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            rows="8"
            show-word-limit
            maxlength="2000"
            placeholder="请输入备注"
          />
        </el-form-item>
        <el-form-item v-if="type !== 'detail'" label="附件:" prop="filePath" style="width: 100%;">
          <upload
            style="width: 100%;"
            file
            :limit="1"
            :show-file-list="false"
            :file-list="reviewedFile"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item label="" style="width: 100%;">
          <common-table
            :table-data="reviewedFile"
            show-download
            :show-delete="type !== 'detail'"
            @handleDelete="handleDelete"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
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
import { addEnterpriseOrganization, updateEnterpriseOrganization, findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import moment from 'moment'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      type: '',
      enterpriseName: '',
      ruleForm: {
        id: '',
        enterpriseId: '',
        organizationName: '',
        parentId: 0,
        directorPhone: '',
        directorName: '',
        departmentDuty: '',
        remark: '',
        serialNumber: 1,
        isStatus: ''
      },
      departmentList: [],
      isDisabled: false,
      reviewedFile: [],
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        isStatus: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        directorName: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        directorPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    const { item, type } = this.$route.query
    this.type = type
    // 获取当前用户关联的企业信息
    const res = await findByUserId()
    this.enterpriseName = res.data.enterpriseName
    this.ruleForm.enterpriseId = res.data.id
    // 查询企业组织机构 树结构信息
    const obj = await findByEnOrganizationList()
    this.departmentList = obj.data
    // 初始化数据
    if (item) {
      this.isDisabled = item.disabled
      this.ruleForm.id = item.id
      this.ruleForm.organizationName = item.organizationName
      this.ruleForm.parentId = item.parentId ? item.parentId : 0
      this.ruleForm.directorPhone = item.directorPhone
      this.ruleForm.directorName = item.directorName
      this.ruleForm.departmentDuty = item.departmentDuty
      this.ruleForm.remark = item.remark
      this.ruleForm.serialNumber = item.serialNumber ? item.serialNumber : 1
      this.ruleForm.isStatus = item.isStatus
      this.reviewedFile = item && item.filePath ? JSON.parse(item.filePath) : []
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveSubmit()
      })
    },
    async saveSubmit() {
      const data = { ...this.ruleForm, filePath: JSON.stringify(this.reviewedFile || [])}
      data.parentId = (typeof data.parentId === 'object' ? data.parentId[data.parentId.length - 1] : data.parentId) || 0
      const res = this.ruleForm.id ? await updateEnterpriseOrganization(data) : await addEnterpriseOrganization(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$router.push({ path: '/enterprise/basic/organize' })
    }
  }
}
</script>
<style>
.el-radio__inner {
  border-color: #80899f;
}
</style>
<style lang="scss" scoped>
.basic-detail {
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
      }
  }
}
</style>
