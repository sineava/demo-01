<template>
  <el-form
    ref="ruleForm"
    :model="professional"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="professional-title"
      contentClassName="professional-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i class="required" />姓名:</template>
        <el-form-item v-if="isEdit" prop="fullName">
          <el-input v-model.trim="professional.fullName" placeholder="请输入姓名" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.fullName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />性别:</template>
        <el-form-item v-if="isEdit" prop="sex">
          <el-radio-group v-model="professional.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>{{ professional.sex }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />身份证号:</template>
        <el-form-item v-if="isEdit" prop="identificationNumber">
          <el-input v-model.trim="professional.identificationNumber" placeholder="请输入身份证号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.identificationNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />职务:</template>
        <el-form-item v-if="isEdit" prop="post">
          <el-input v-model.trim="professional.post" placeholder="请输入职务" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.post }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />所在部门:</template>
        <el-form-item v-if="isEdit" prop="departmentName">
          <el-input v-model.trim="professional.departmentName" placeholder="请输入所在部门" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.departmentName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />适任证书类型:</template>
        <el-form-item v-if="isEdit" prop="certificateType">
          <el-input v-model.trim="professional.certificateType" placeholder="请输入适任证书类型" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.certificateType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />适任证书编号:</template>
        <el-form-item v-if="isEdit" prop="certificateCode">
          <el-input v-model.trim="professional.certificateCode" placeholder="请输入适任证书编号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.certificateCode }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">电子邮件:</template>
        <el-form-item v-if="isEdit" prop="email">
          <el-input v-model.trim="professional.email" placeholder="请输入电子邮件" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.email }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />聘用合同起:</template>
        <el-form-item v-if="isEdit" prop="contractStartDate">
          <el-date-picker
            v-model="professional.contractStartDate"
            type="date"
            style="width: 100%;"
            placeholder="选择聘用合同时间（起）"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ professional.contractStartDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="required" />聘用合同至:</template>
        <el-form-item v-if="isEdit" :prop="isYj==='日期' ? 'contractEndDate' : ''">
          <span v-if="isYj==='日期'">
            <el-date-picker
              v-model="professional.contractEndDate"
              type="date"
              style="width: 100%;"
              placeholder="选择起止日期（止）"
            />
          </span>
          <span>
            <el-radio-group v-model="isYj" size="mini" @change="changeRadio">
              <el-radio-button label="永久" />
              <el-radio-button label="日期" />
            </el-radio-group>
          </span>
        </el-form-item>

        <span v-else>{{ professional.contractEndDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i class="required" />联系地址:</template>
        <el-form-item v-if="isEdit" prop="contactAddress">
          <el-input v-model.trim="professional.contactAddress" placeholder="请输入联系地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.contactAddress }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">备注:</template>
        <el-form-item v-if="isEdit" prop="remark">
          <el-input
            v-model.trim="professional.remark"
            type="textarea"
            placeholder="请输入备注"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ professional.remark }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import { isPersonExist } from '@/api/water-transportation-services/keep-on-record/ship-manage-person-filing'
import { email,identity } from '@/utils/validate'
export default {
  data() {
    const personExist = async(rule, value, callback) => {
      if (this.isExist(value)){
        callback(new Error('身份证号重复，请重新输入'))
      }
      const exist = await isPersonExist({ enterpriseId: this.enterpriseId, identificationNumber: value })
      if (exist.data) {
        callback(new Error('身份证号重复，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      data:{},
      isEdit:false,
      enterpriseId:'',
      index:-1,
      list:[],
      isYj: '日期',
      professional: {
        fullName:'',// 姓名
        sex:'',// 性别
        identificationNumber:'',
        contractStartDate:'',
        contractEndDate:'',
        post:'',
        departmentName:'',
        certificateType:'',
        certificateCode:'',
        contactAddress:'',
        email:'',
        remark:''
      },
      rules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        identificationNumber: [
          { required: true, message: '请输入有效', trigger: 'blur' },
          { validator: identity, message: '请输入有效15或18位身份证号码', trigger: 'blur' },
          { validator: personExist, message: '身份证号码已存在', trigger: 'blur' }
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
          { validator: email, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        contactAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        contractStartDate: [
          { required: true, message: '请选择聘用合同起', trigger: 'change' }
        ],
        contractEndDate: [
          { required: true, message: '请选择聘用合同至', trigger: 'change' }
        ],
        departmentName:[
          { required: true, message: '请输入所在部门', trigger: 'blur' }
        ]
      },
    }
  },
  mounted() {

  },
  methods: {
    changeRadio(value){
      this.professional.contractEndDate = value === '永久' ? '永久' : ''
    },
    isExist(identificationNumber){
      let iden = false
      for (let i=0;i<this.list.length;i++){
        if (this.list[i].identificationNumber === identificationNumber){
          iden = this.index!==i ? true : false
          return iden
        }
      }
      return iden
    },
    init(data,isEdit,enterpriseId,list,index){
      this.initProfessional(data)
      this.isEdit = isEdit
      this.enterpriseId = enterpriseId
      this.list = list || []
      this.index = index === undefined || index === null ? -1 : index
    },
    initProfessional(data){
      this.professional = {
        fullName:data?.fullName,
        sex:data?.sex || '',
        identificationNumber:data?.identificationNumber || '',
        post:data?.post,
        departmentName:data?.departmentName,
        certificateType:data?.certificateType,
        certificateCode:data?.certificateCode,
        contactAddress:data?.contactAddress,
        email:data.email,
        contractStartDate:data && data.contractStartDate ? momentDate(data.contractStartDate,'YYYY-MM-DD') : '',
        contractEndDate:data && data.contractEndDate ? momentDate(data.contractEndDate,'YYYY-MM-DD') : '',// 时间
        remark:data?.remark
      }
      this.isYj = this.professional.contractEndDate ? '日期' : '永久'
    },
    // 输入框变更
    inputChange(){
    },
    /**
     * 保存
     */
    async submitForm() {
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        let res = JSON.parse(JSON.stringify(this.professional))
        res.contractStartDate = res.contractStartDate ? momentDate(res.contractStartDate,'YYYY-MM-DD') : ''
        res.contractEndDate = this.isYj === '日期' ? (res.contractEndDate ? momentDate(res.contractEndDate,'YYYY-MM-DD') : '') : null// 时间
        res.index = this.index
        return new Promise(resolve => resolve(res))
      }
      return false

    }
  }
}
</script>

<style lang="scss" scoped>
.base-ruleForm {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .professional-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .professional-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
