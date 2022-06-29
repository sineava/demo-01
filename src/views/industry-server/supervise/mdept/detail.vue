<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'add' ? '新增管理部门机构' : type === 'edit' ? '编辑管理部门机构' : '管理部门机构详情' }}</span>
    </div>
    <div class="app-container mdept-container">
      <div class="icon-title">
        <span class="span" />部门信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="115px"
        size="medium"
        class="mdept-form"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="机构名称:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="ruleForm.departmentName"
            maxlength="50"
            disabled
            placeholder="请输入机构名称"
          />
        </el-form-item>
        <el-form-item
          label="主管人员:"
          prop="directorName"
        >
          <el-input v-model.trim="ruleForm.directorName" maxlength="20" placeholder="请输入主管人员" />
        </el-form-item>
        <el-form-item
          label="所属上级部门:"
          prop="parentName"
        >
          {{ ruleForm.parentName || '重庆市港航海事事务中心' }}
        </el-form-item>
        <el-form-item
          label="通信地址:"
          prop="mailingAddress"
        >
          <el-input v-model.trim="ruleForm.mailingAddress" maxlength="100" placeholder="请输入通信地址" />
        </el-form-item>
        <el-form-item
          label="邮政编码:"
          prop="zipCode"
        >
          <el-input v-model.trim="ruleForm.zipCode" maxlength="6" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="phone"
        >
          <el-input v-model.trim="ruleForm.phone" maxlength="11" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item
          label="传真:"
          prop="fax"
        >
          <el-input v-model.trim="ruleForm.fax" maxlength="20" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="state"
        >
          <div v-if="type === 'detail'">{{ruleForm.state?'启用':'禁用'}}</div>
          <el-radio-group v-else v-model="ruleForm.state">
            <el-radio :label="0">
              禁用
            </el-radio>
            <el-radio :label="1">
              启用
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="邮箱:"
          prop="email"
        >
          <el-input
            v-model.trim="ruleForm.email"
            maxlength="30"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item
          label="管理区划范围:"
          prop="areaName"
        >
          <el-select
            v-model="ruleForm.areaName"
            multiple
            collapse-tags
            placeholder="请选择管理行政区划范围"
            clearable
          >
            <el-option
              v-for="item in city"
              :key="item.adcode"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="内设处室:"
          prop="office"
        >
          <el-input
            v-model.trim="ruleForm.office"
            maxlength="50"
            placeholder="请输入内设处室"
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="备注:"
          prop="remarks"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            maxlength="200"
            placeholder="请输入备注"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="部门描述:"
          prop="introduce"
        >
          <el-input
            v-model.trim="ruleForm.introduce"
            type="textarea"
            maxlength="200"
            placeholder="请输入部门描述"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div
        v-if="type !== 'add'"
        class="icon-title"
      >
        <span class="span" />管理队伍
      </div>
      <el-table
        v-if="type !== 'add'"
        :data="ruleForm.persons"
        border
        class="detail-table"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="post"
          align="center"
          label="职务"
        />
        <el-table-column
          prop="phone"
          align="center"
          label="手机"
        />
        <el-table-column
          prop="email"
          align="center"
          label="电子邮箱"
        />
        <el-table-column
          prop="obligation"
          align="center"
          label="职责信息"
        />
      </el-table>
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
    </div>
  </el-card>
</template>
<script>
import { postal, telephone, fax, email } from '@/utils/validate'
import { getManagementDepartmentById, addManagementDepartment, updateDept } from '@/api/general-services/supervisory-capability/management-department'
import { chongqing } from '@/utils/address'
// import { toTreeData } from '@/utils/index'
export default {
  data() {
    return {
      type: '',
      loading:false,
      city: chongqing,
      ruleForm: {
        departmentName: '',
        directorName: '',
        fax: '',
        id: null,
        introduce: '',
        mailingAddress: '',
        parentId: '',
        phone: '',
        remark: '',
        state: '',
        zipCode: '',
        email: '',
        office: '',
        areaName: ''
      },
      treeData: [],
      id: null, // *用作树局部禁用
      rules: {
        departmentName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        directorName: [
          { required: true, message: '请输入主管人员', trigger: 'blur' }
        ],
        mailingAddress: [
          { required: true, message: '请输入通信地址', trigger: 'blur' }
        ],
        zipCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { validator: postal, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        email: [
          { validator: email, 'message':'请输入邮箱地址', trigger: 'blur' }
        ],
        fax: [
          { validator: fax, trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        areaName:[
          { required: true, message: '请输入管理行政区划范围', trigger: 'blur' }
        ],
        office:[
          { required: true, message: '请输入内设处室', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    const { id, type } = this.$route.query
    await this.fetchDepts()
    if (id) this.getDetail(id)
    this.id = id
    this.type = type
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      /*
       * const res = await getManagementDepartmentLikeName({ departmentName: '', flag: this.type === 'detail' })
       * this.treeData = toTreeData(res.data)
       */
    },
    async getDetail(id) {
      const res = await getManagementDepartmentById({ id })
      res.data.areaName = JSON.parse(res.data.areaName)
      this.ruleForm = res.data
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
    async saveData() {
      const managementDepartmentInfoDto = {
        ...this.ruleForm,
        parentId: this.ruleForm.parentId[this.ruleForm.parentId.length - 1] || 0,
        areaName: typeof this.ruleForm.areaName ==='object' ? JSON.stringify(this.ruleForm.areaName) : this.ruleForm.areaName
      }
      delete managementDepartmentInfoDto.parentName
      delete managementDepartmentInfoDto.personNumbers
      delete managementDepartmentInfoDto.updateTime
      delete managementDepartmentInfoDto.attributionDepartment
      delete managementDepartmentInfoDto.persons
      const res = managementDepartmentInfoDto.id ? await updateDept(managementDepartmentInfoDto) : await addManagementDepartment(managementDepartmentInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/supervise/mdept' })
    }
  }
}
</script>
<style lang="scss" scoped>
.mdept-container {
    .mdept-form {
        display: flex;
        flex-wrap: wrap;
    }

    /deep/ .el-textarea__inner {
        width: 100%;
        height: 120px;
        resize: none;
    }

    /deep/ .el-form-item {
        margin: 0 0 0 2%;
        padding-bottom: 20px;
        width: 30%;
    }

    /deep/ .el-select {
        width: 100%;
    }
}
</style>
