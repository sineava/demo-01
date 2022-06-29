<template>
  <div class="body-card">
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />组织机构信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        size="medium"
        disabled
        class="three-column-input-table"
        label-width="140px"
      >
        <el-form-item
          label="企业名称:"
        >
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="机构名称:"
          prop="organizationName"
        >
          <el-input v-model.trim="ruleForm.organizationName" />
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
          />
        </el-form-item>
        <el-form-item
          label="负责人姓名:"
          prop="directorName"
        >
          <el-input v-model.trim="ruleForm.directorName" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="directorPhone"
        >
          <el-input
            v-model.trim="ruleForm.directorPhone"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item
          label="机构排序:"
          prop="serialNumber"
        >
          <el-input
            v-model.trim="ruleForm.serialNumber"
          />
        </el-form-item>
        <el-form-item
          label="是否启用:"
          prop="isStatus"
        >
          <el-input
            :value="ruleForm.isStatus===1 ? '启用' : '未启用'"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="部门职责:"
          prop="departmentDuty"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.departmentDuty"
            type="textarea"
            rows="6"
            show-word-limit
            maxlength="200"
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
            rows="6"
            show-word-limit
            maxlength="200"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { addEnterpriseOrganization, updateEnterpriseOrganization, findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
export default {
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
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
    }
  },
  async mounted() {
    const obj = await findByEnOrganizationList()
    this.departmentList = obj.data
    // 初始化数据
    if (this.objData) {
      const item = this.objData
      this.ruleForm.enterpriseName = item.enterpriseName
      this.ruleForm.id = item.id
      this.ruleForm.organizationName = item.organizationName
      this.ruleForm.parentId = item.parentId ? item.parentId : 0
      this.ruleForm.directorPhone = item.directorPhone
      this.ruleForm.directorName = item.directorName
      this.ruleForm.departmentDuty = item.departmentDuty
      this.ruleForm.remark = item.remark
      this.ruleForm.serialNumber = item.serialNumber ? item.serialNumber : 1
      this.ruleForm.isStatus = item.isStatus
    }
  },
  methods: {
    // 保存
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
      const data = { ...this.ruleForm }
      data.parentId = data.parentId.length > 0 ? data.parentId[data.parentId.length - 1] : data.parentId
      const res = this.ruleForm.id ? await updateEnterpriseOrganization(data) : await addEnterpriseOrganization(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$emit('join', { name: '组织机构信息', data: { }})
    }
  }
}
</script>

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

            .quill-editor /deep/ .ql-container {
                height: 200px;
            }
        }
    }
}
</style>
