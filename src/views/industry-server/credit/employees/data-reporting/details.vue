<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="从业人员信用数据信息" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="practice"
        :rules="rules"
        label-width="0"
        class="base-ruleForm"
      >
        <div class="icon-title">
          <span class="span" />个人信息
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="practice-title"
          contentClassName="practice-text"
          border
        >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />姓名:</template>
            <el-form-item v-if="isEdit" prop="name">
              <el-input
                v-model="practice.name"
                filterable
                clearable
                placeholder="请输入姓名"
              />
            </el-form-item>
            <span v-else>{{ practice.name }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />性别:</template>
            <el-form-item v-if="isEdit" prop="sex">
              <el-radio-group v-model="practice.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <span v-else>{{ practice.sex === '1' ? '男' : '女' }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件类型:</template>
            <el-form-item v-if="isEdit" prop="idCardType">
              <el-select
                v-model="practice.idCardType"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择证件类型"
              >
                <el-option
                  v-for="item in documentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.idCardType,documentTypeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件号码:</template>
            <el-form-item v-if="isEdit" prop="idCardNo">
              <el-input
                v-model="practice.idCardNo"
                filterable
                clearable
                placeholder="请输入证件号码"
              />
            </el-form-item>
            <span v-else>{{ practice.idCardNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />出生日期:</template>
            <el-form-item v-if="isEdit" prop="birthDate">
              <el-date-picker
                v-model="practice.birthDate"
                type="date"
                filterable
                clearable
                style="width: 100%;"
                placeholder="选择出生日期"
              />
            </el-form-item>
            <span v-else>{{ practice.birthDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />国籍:</template>
            <el-form-item v-if="isEdit" prop="nationality">
              <el-input
                v-model="practice.nationality"
                filterable
                clearable
                placeholder="请输入国籍"
              />
            </el-form-item>
            <span v-else>{{ practice.nationality }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />单位名称:</template>
            <el-form-item v-if="isEdit" prop="unitName">
              <el-input
                v-model="practice.unitName"
                filterable
                clearable
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <span v-else>{{ practice.unitName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />单位统一社会信用代码:</template>
            <el-form-item v-if="isEdit" prop="certificateUnitNo">
              <el-input
                v-model="practice.certificateUnitNo"
                filterable
                clearable
                placeholder="请输入单位统一社会信用代码"
              />
            </el-form-item>
            <span v-else>{{ practice.certificateUnitNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />职务:</template>
            <el-form-item v-if="isEdit" prop="job">
              <el-input
                v-model="practice.job"
                filterable
                clearable
                placeholder="请输入职务"
              />
            </el-form-item>
            <span v-else>{{ practice.job }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">从事本专业起始日期:</template>
            <el-form-item v-if="isEdit" prop="startDate">
              <el-date-picker
                v-model="practice.startDate"
                filterable
                clearable
                style="width: 100%;"
                type="date"
                placeholder="选择从事本专业起始日期"
              />
            </el-form-item>
            <span v-else>{{ practice.startDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
            <el-form-item v-if="isEdit" prop="phone">
              <el-input
                v-model="practice.phone"
                filterable
                clearable
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <span v-else>{{ practice.phone }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />状态:</template>
            <el-form-item v-if="isEdit" prop="state">
              <el-select
                v-model="practice.state"
                filterable
                disabled
                clearable
                style="width: 100%;"
                placeholder="请选择状态"
              >
                <el-option label="有效" value="1" />
                <el-option label="失效" value="2" />
              </el-select>
            </el-form-item>
            <span v-else>{{ practice.state === '1' ? '有效' : '失效' }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div class="icon-title">
          <span class="span" />职业信息
        </div>

        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="practice-title"
          contentClassName="practice-text"
          border
        >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证书名称:</template>
            <el-form-item v-if="isEdit" prop="certificateName">
              <el-input
                v-model="practice.certificateName"
                filterable
                clearable
                placeholder="请输入证书名称"
              />
            </el-form-item>
            <span v-else>{{ practice.certificateName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证书编号:</template>
            <el-form-item v-if="isEdit" prop="certificateNo">
              <el-input
                v-model="practice.certificateNo"
                filterable
                clearable
                placeholder="请输入证书编号"
              />
            </el-form-item>
            <span v-else>{{ practice.certificateNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />发证单位:</template>
            <el-form-item v-if="isEdit" prop="issueUnit">
              <el-input
                v-model="practice.issueUnit"
                filterable
                clearable
                placeholder="请输入发证单位"
              />
            </el-form-item>
            <span v-else>{{ practice.issueUnit }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">签发日期:</template>
            <el-form-item v-if="isEdit" prop="issueDate">
              <el-date-picker
                v-model="practice.issueDate"
                filterable
                clearable
                style="width: 100%;"
                type="date"
                placeholder="选择签发日期"
              />
            </el-form-item>
            <span v-else>{{ practice.issueDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">证书有效期:</template>
            <div v-if="isEdit">
              <span style="display: inline-block; margin-right: 10px;">
                <el-form-item v-if="expiryDate!=='永久'" prop="validityOfCertificate">
                  <el-date-picker
                    v-model="practice.validityOfCertificate"
                    type="date"
                    placeholder="选择证书有效期"
                  />
                </el-form-item>
              </span>
              <span style="display: inline-block;">
                <el-radio-group v-model="expiryDate" size="mini" @change="expiryDateChange">
                  <el-radio-button label="永久" />
                  <el-radio-button label="日期" />
                </el-radio-group>
              </span>
            </div>
            <span v-else>{{ expiryDate === '永久' ? '永久' : practice.validityOfCertificate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">证照状态:</template>
            <el-form-item v-if="isEdit" prop="certificationStatus">
              <el-select
                v-model="practice.certificationStatus"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择证照状态"
              >
                <el-option
                  v-for="item in certificateStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.certificationStatus,certificateStatusOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">从业范围:</template>
            <el-form-item v-if="isEdit" prop="workingRange">
              <el-input
                v-model="practice.workingRange"
                type="textarea"
                placeholder="请输入从业范围"
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </el-form-item>
            <span v-else>{{ practice.workingRange }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">船员职务:</template>
            <el-form-item v-if="isEdit" prop="crewDutyCode">
              <el-select
                v-model="practice.crewDutyCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择船员职务"
              >
                <el-option
                  v-for="item in postOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.crewDutyCode,postOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船员职务代码:</template>
            {{ practice.crewDutyCode }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">船员适任证书等级:</template>
            <el-form-item v-if="isEdit" prop="seamanCertificateCode">
              <el-select
                v-model="practice.seamanCertificateCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择船员适任证书等级"
              >
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.seamanCertificateCode,gradeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船员适任证书等级代码:</template>
            {{ practice.seamanCertificateCode }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">船员适任证书种类:</template>
            <el-form-item v-if="isEdit" prop="typeCodeOfCrewCertificate">
              <el-select
                v-model="practice.typeCodeOfCrewCertificate"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择船员适任证书种类"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.typeCodeOfCrewCertificate,typeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船员适任证书种类代码:</template>
            {{ practice.typeCodeOfCrewCertificate }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">危险化学品水路运输从业资格类型:</template>
            <el-form-item v-if="isEdit" prop="waterTransportQualificationTypeCode">
              <el-select
                v-model="practice.waterTransportQualificationTypeCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择危险化学品水路运输从业资格类型"
              >
                <el-option
                  v-for="item in chemistryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.waterTransportQualificationTypeCode,chemistryOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">危险化学品水路运输从业资格类型代码:</template>
            {{ practice.waterTransportQualificationTypeCode }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">危险化学品水路运输作业类型:</template>
            <el-form-item v-if="isEdit" prop="waterTransportOperationTypeCode">
              <el-select
                v-model="practice.waterTransportOperationTypeCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择危险化学品水路运输作业类型"
              >
                <el-option
                  v-for="item in waterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.waterTransportOperationTypeCode,waterOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">危险化学品水路运输作业类型代码:</template>
            {{ practice.waterTransportOperationTypeCode }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="backstage-edit-btn">
          <el-button
            v-if="isEdit"
            type="primary"
            size="medium "
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
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getInfo, updateData,addData } from '@/api/credit/employees/data-reporting'
import { momentDate } from '@/utils/index'
import { getDocumentTypeOptions,getCertificateStatusOptions,getPostOptions,getGradeOptions,getwaterOptions,getCertificateTypeOptions,getChemistryOptions,getLabelName} from '@/utils/config'
export default {
  data() {
    return {
      practice: {
        name:'',
        sex:'',
        idCardType:'',
        idCardNo:'',
        birthDate:'',
        nationality:'',
        unitName:'',
        certificateUnitNo:'',
        job:'',
        startDate:'',
        phone:'',
        state:'1',
        certificateName:'',
        certificateNo:'',
        issueUnit:'',
        issueDate:'',
        validityOfCertificate:'',
        certificationStatus:'',
        workingRange:'',
        crewDutyCode:'',
        seamanCertificateCode:'',
        typeCodeOfCrewCertificate:'',
        waterTransportQualificationTypeCode:'',
        waterTransportOperationTypeCode:'',
      },
      isEdit:true,
      expiryDate: '日期',
      documentTypeOptions: getDocumentTypeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      postOptions:getPostOptions(),
      gradeOptions:getGradeOptions(),
      waterOptions:getwaterOptions(),
      typeOptions:getCertificateTypeOptions(),
      chemistryOptions:getChemistryOptions(),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        idCardType: [
          { required: true, message: '请输入证件类型', trigger: 'blur' }
        ],
        idCardNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        nationality: [
          { required: true, message: '请输入国籍', trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        certificateUnitNo: [
          { required: true, message: '请输入单位统一社会信用代码', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        certificateName: [
          { required: true, message: '请输入证书名称', trigger: 'blur' }
        ],
        certificateNo: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ],
        issueUnit: [
          { required: true, message: '请输入发证单位', trigger: 'blur' }
        ],
        /*
         * issueDate: [
         *   { required: true, message: '请选择签发日期', trigger: 'blur' }
         * ],
         * validityOfCertificate: [
         *   { required: true, message: '请选择证书有效期', trigger: 'blur' }
         * ],
         * certificationStatus: [
         *   { required: true, message: '请选择证照状态', trigger: 'change' }
         * ]
         */
      },
    }
  },
  mounted() {
    const { id, type } = this.$route.query
    this.isEdit = type === 'detail' ? false : true
    if (id){
      this.init(id)
    }
  },
  methods: {
    init(id){
      getInfo(id).then(res=>{
        this.practice = res.data
        this.expiryDate = this.practice.validityOfCertificate === '永久' ? '永久' : '日期'
        this.expiryDate = this.practice.validityOfCertificate === '永久' ? '永久' : '日期'
        this.practice.validityOfCertificate = this.practice.validityOfCertificate === '永久' ? '' : this.practice.validityOfCertificate
      })
    },
    getLabelName,
    // 日期选择
    expiryDateChange(e){
      this.expiryDate = e
      this.practice.validityOfCertificate = ''
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.practice.validityOfCertificate = this.expiryDate === '永久' ? '永久' : momentDate(this.practice.validityOfCertificate,'YYYY-MM-DD')
          this.practice.birthDate = momentDate(this.practice.birthDate,'YYYY-MM-DD')
          this.practice.issueDate = momentDate(this.practice.issueDate,'YYYY-MM-DD')
          this.practice.startDate = momentDate(this.practice.startDate,'YYYY-MM-DD')
          this.save()
        } else {
          console.log('')
        }
      })
    },
    async save(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let res = this.practice.id ? await updateData(this.practice) : await addData(this.practice)
      loading.close()
      if (res.code==='0'){
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      window.history.go(-1)
    },
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

        /deep/ .practice-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .practice-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
