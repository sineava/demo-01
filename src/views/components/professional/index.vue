<template>
  <el-form
    ref="professional"
    :model="professional"
    :rules="rules"
    label-width="0"
    class="base-professional"
  >
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="professional-title"
      contentClassName="professional-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />姓名:</template>
        <el-form-item v-if="isEdit" prop="fullName">
          <el-input v-model.trim="professional.fullName" placeholder="请输入姓名" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.fullName }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />性别:</template>
        <el-form-item v-if="isEdit" prop="sex">
          <el-select v-model="professional.sex" style="width: 100%;" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <span v-else>{{ professional.sex }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />身份证号:</template>
        <el-form-item v-if="isEdit" prop="identificationNumber">
          <el-input v-model.trim="professional.identificationNumber" placeholder="请输入身份证号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.identificationNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">职务:</template>
        <el-form-item v-if="isEdit" prop="post">
          <el-input v-model.trim="professional.post" placeholder="请输入职务" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.post }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">所在部门:</template>
        <el-form-item v-if="isEdit" prop="departmentName">
          <el-input v-model.trim="professional.departmentName" placeholder="请输入所在部门" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.departmentName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />适任证书类型:</template>
        <el-form-item v-if="isEdit" prop="certificateType">
          <el-input v-model.trim="professional.certificateType" placeholder="请输入适任证书类型" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.certificateType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />适任证书编号:</template>
        <el-form-item v-if="isEdit" prop="certificateCode">
          <el-input v-model.trim="professional.certificateCode" placeholder="请输入适任证书编号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.certificateCode }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">联系地址:</template>
        <el-form-item v-if="isEdit" prop="contactAddress">
          <el-input v-model.trim="professional.contactAddress" placeholder="请输入联系地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.contactAddress }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactNumber">
          <el-input v-model.trim="professional.contactNumber" placeholder="请输入联系电话" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.contactNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">电子邮件:</template>
        <el-form-item v-if="isEdit" prop="email">
          <el-input v-model.trim="professional.email" placeholder="请输入电子邮件" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ professional.email }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />聘用合同起:</template>
        <el-form-item v-if="isEdit" prop="contractStartDate">
          <el-date-picker
            v-model="professional.contractStartDate"
            type="date"
            placeholder="选择聘用合同起"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ professional.contractStartDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />聘用合同至:</template>
        <el-form-item v-if="isEdit" :prop="isYj==='日期' ? 'contractEndDate' : ''">
          <!-- style="margin-right: 10px;" -->
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
        <span v-else>{{ professional.contractEndDate || '永久' }}</span>
      </el-descriptions-item>

      <el-descriptions-item :span="3">
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
import moment from 'moment'
import { telephone,email,identity } from '@/utils/validate'
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
  },
  data() {
    return {
      professional: {
        sex:'',
        endDate:'',
        startDate:''
      },
      startDate:[],
      isYj:'日期',
      rules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone,message: '联系电话格式错误', trigger: 'blur' }
        ],
        identificationNumber: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { validator: identity,message: '身份证格式错误', trigger: 'blur' }
        ],
        certificateType:[
          { required: true, message: '请输入适任证书类型', trigger: 'blur' },
        ],
        certificateCode:[
          { required: true, message: '请输入适任证书编号', trigger: 'blur' },
        ],
        contractStartDate:[
          { required: true, message: '请选择聘用合同开始时间', trigger: 'blur' },
        ],
        contractEndDate:[
          { required: true, message: '请选择聘用合同截止时间', trigger: 'blur' },
        ],
        email: [
          { validator: email,message: '邮箱格式错误', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    changeRadio(value){
      this.professional.contractEndDate = value === '永久' ? '' : ''
    },
    initIicense(data){
      this.professional = {
        id: data?.id,
        fullName:data?.fullName,
        sex:data?.sex,
        identificationNumber:data?.identificationNumber,
        post:data?.post,
        departmentName:data?.departmentName,
        certificateCode:data?.certificateCode,
        contactAddress:data?.contactAddress,
        contactNumber:data?.contactNumber,
        email:data?.email,
        certificateType:data?.certificateType,
        contractStartDate:data && data.contractStartDate ? moment(data.contractStartDate).format('YYYY-MM-DD') : '',
        contractEndDate:data && data.contractEndDate ? moment(data.contractEndDate).format('YYYY-MM-DD') : '',
        remark:data?.remark
      }
      // this.professional.contractEndDate = data && data.contractEndDate ? (data.contractEndDate!=='永久'?moment(data.contractEndDate).format('YYYY-MM-DD'):'永久') : ''

      this.isYj = this.professional.contractEndDate ? '日期' : '永久'
    },
    // 输入框变更
    inputChange(){
      this.initIicense(this.professional)
      this.$emit('changeIicense',this.professional)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs['professional'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.professional))
          // res.contractEndDate = res.contractEndDate ? (res.contractEndDate!=='永久'?moment(res.contractEndDate).format('YYYY-MM-DD'):'永久') : ''
          res.contractStartDate = res.contractStartDate ? moment(res.contractStartDate).format('YYYY-MM-DD') : ''
          res.contractEndDate = this.isYj === '日期' ? (res.contractEndDate ? moment(res.contractEndDate).format('YYYY-MM-DD') : '') : null
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.base-professional {
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
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .professional-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .professional-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
