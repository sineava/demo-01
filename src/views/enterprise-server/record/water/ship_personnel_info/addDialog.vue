<template>
  <el-form
    ref="ruleForm"
    size="medium"
    label-position="top"
    :model="ruleForm"
    :rules="rules"
    class="table-top-column-there"
  >
    <div class="icon-title">
      <span class="span" /> 新增人员信息
    </div>
    <el-form-item
      label="姓名:"
      prop="fullName"
    >
      <el-input v-model.trim="ruleForm.fullName" placeholder="请输入姓名" maxlength="100" />
    </el-form-item>
    <el-form-item
      label="性别:"
      prop="sex"
    >
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男">
          男
        </el-radio>
        <el-radio label="女">
          女
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="身份证号:"
      prop="identificationNumber"
    >
      <el-input v-model.trim="ruleForm.identificationNumber" placeholder="请输入身份证号" maxlength="18" />
    </el-form-item>
    <el-form-item
      label="职务:"
      prop="post"
    >
      <el-input v-model.trim="ruleForm.post" placeholder="请输入职务" maxlength="50" />
    </el-form-item>
    <el-form-item
      label="所在部门:"
      prop="departmentName"
    >
      <el-input v-model.trim="ruleForm.departmentName" placeholder="请输入所在部门" maxlength="100" />
    </el-form-item>
    <el-form-item
      label="适任证书类型:"
      prop="certificateType"
    >
      <el-input v-model.trim="ruleForm.certificateType" placeholder="请输入适任证书类型" maxlength="50" />
    </el-form-item>
    <el-form-item
      label="适任证书编号:"
      prop="certificateCode"
    >
      <el-input v-model.trim="ruleForm.certificateCode" placeholder="请输入适任证书编号" maxlength="50" />
    </el-form-item>
    <el-form-item
      label="联系地址:"
      prop="contactAddress"
      style="width: 100%;"
    >
      <el-input
        v-model="ruleForm.contactAddress"
        type="textarea"
        rows="3"
        placeholder="请输入联系地址"
        maxlength="120"
        show-word-limit
      />
    </el-form-item>
    <el-form-item
      label="电子邮件:"
      prop="email"
    >
      <el-input v-model.trim="ruleForm.email" placeholder="请输入电子邮件" maxlength="50" />
    </el-form-item>
    <el-form-item
      label="聘用合同起:"
      prop="contractStartDate"
    >
      <el-date-picker
        v-model="ruleForm.contractStartDate"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="请输入聘用合同起"
      />
    </el-form-item>
    <el-form-item
      label="聘用合同至:"
      prop="contractEndDate"
    >
      <el-date-picker
        v-model="ruleForm.contractEndDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择聘用合同结束日期"
      />
    </el-form-item>
    <el-form-item
      label="备注:"
      style="width: 100%;"
      prop="remark"
    >
      <el-input
        v-model="ruleForm.remark"
        type="textarea"
        :rows="6"
        maxlength="200"
        show-word-limit
        placeholder="请输入备注"
      />
    </el-form-item>
    <div class="icon-title">
      <span class="span" /> 变更人员信息
    </div>
    <el-form-item
      label="姓名:"
      prop="changePersonId"
    >
      <el-select
        v-model="ruleForm.changePersonId"
        placeholder="请选择姓名"
        @change="personChange"
      >
        <el-option
          v-for="item in personnelList"
          :key="item.fullName"
          :label="item.fullName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-table
        v-if="ruleForm.changePersonId"
        :data="propList"
        fit
        border
        :show-header="false"
      >
        <el-table-column prop="label" />
        <el-table-column>
          <template v-slot="scope">
            {{ scope.row.start ? `${personnelList[personnelIndex][scope.row.start]}-${personnelList[personnelIndex][scope.row.end]}` : personnelList[personnelIndex][scope.row.name] }}
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
import { managePersonList } from '@/api/water-transportation-services/information/manage-person'
import { isPersonExist } from '@/api/water-transportation-services/keep-on-record/ship-manage-person-filing'
import { email } from '@/utils/validate'
export default {
  props: {
    tableIndex: {
      type: Number,
      default: -1
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const personExist = async(rule, value, callback) => {
      if (value && !/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value)) {
        return callback(new Error('请输入有效15或18位身份证号码'))
      }
      const exist = await isPersonExist({ enterpriseId: this.$store.getters.enterprise.id, identificationNumber: value })
      if (exist.data) {
        callback(new Error('身份证号重复，请重新输入'))
      } else {
        callback()
      }

    }
    return {
      personnelList: [],
      personnelIndex: -1,
      propList: [
        { label: '性别', name: 'sex' },
        { label: '身份证号', name: 'identificationNumber' },
        { label: '职务', name: 'post' },
        { label: '所在部门', name: 'departmentName' },
        { label: '适任证书类型', name: 'certificateType' },
        { label: '适任证书编号', name: 'certificateCode' },
        { label: '联系地址', name: 'contactAddress' },
        { label: '电子邮件', name: 'email' },
        { label: '聘用合同起止日期', start: 'contractStartDate', end: 'contractEndDate' },
        { label: '备注', name: 'remark' }
      ],
      ruleForm: {
        fullName: '',
        sex: '',
        identificationNumber: '',
        post: '',
        departmentName: '',
        certificateType: '',
        certificateCode: '',
        contactAddress: '',
        email: '',
        contractStartDate: '',
        contractEndDate: '',
        remark: '',
        changePersonId: '' // 变更人id
      },
      rules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        identificationNumber: [
          { required: true, validator: personExist, message: '请输入有效15或18位身份证号码', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        certificateType: [
          { required: true, message: '请输入适任证书类型', trigger: 'blur' }
        ],
        certificateCode: [
          { required: true, message: '请输入适任证书编号', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: email, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        contactAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        contractStartDate: [
          { required: true, message: '请选择聘用合同起', trigger: 'change' }
        ],
        contractEndDate: [
          { required: true, message: '请选择聘用合同至', trigger: 'change' }
        ]
        /*
         * changePersonId: [
         *   { required: true, message: '请选择变更人', trigger: 'change' }
         * ]
         */
      }
    }
  },
  async mounted() {
    const res = await managePersonList({ enterpriseId: this.$store.getters.enterprise.id })
    this.personnelList = res.data
    if (this.tableIndex >= 0) {
      this.ruleForm = { ...this.tableList[this.tableIndex] }
      delete this.ruleForm.changePersonObj
    }
  },
  methods: {
    personChange(id) {
      this.personnelList.forEach((item, index) => {
        if (item.id === id) {
          this.personnelIndex = index
        }
      })
    },
    /**
     * 验证规则
     */
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 判断变更人信息是否重复
          this.tableList.forEach(item => {
            if (item.changePersonId === this.ruleForm.changePersonId) {
              this.$message.error('该变更人已被选择，请重新选择变更人')
              return true
            }
          })

          // 变更人信息
          let changePersonObj = {}
          this.personnelList.forEach(item => {
            if (item.id === this.ruleForm.changePersonId) {
              changePersonObj = item
            }
          })
          this.$emit('submit', { personObj: this.ruleForm, changePersonObj: changePersonObj })
        } else {
          return false
        }
      })
    }
  }
}
</script>
