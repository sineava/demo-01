<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水运企业信用数据信息" />
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
          <span class="span" />登记信息
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
          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="isEdit" class="required" />统一社会信用代码:</template>
            <el-form-item v-if="isEdit" prop="certificateUnitNo">
              <el-input
                v-model="practice.certificateUnitNo"
                filterable
                clearable
                placeholder="请输入统一社会信用代码"
              />
            </el-form-item>
            <span v-else>{{ practice.certificateUnitNo }}</span>
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
            <template slot="label">曾用名:</template>
            <el-form-item v-if="isEdit" prop="formerName">
              <el-input
                v-model="practice.formerName"
                filterable
                clearable
                placeholder="请输入曾用名"
              />
            </el-form-item>
            <span v-else>{{ practice.formerName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">简称:</template>
            <el-form-item v-if="isEdit" prop="abbreviation">
              <el-input
                v-model="practice.abbreviation"
                filterable
                clearable
                placeholder="请输入简称"
              />
            </el-form-item>
            <span v-else>{{ practice.abbreviation }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />单位类型:</template>
            <el-form-item v-if="isEdit" prop="enterpriseType">
              <el-select
                v-model="practice.enterpriseType"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择单位类型"
              >
                <el-option
                  v-for="item in enterpriseTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.enterpriseType,enterpriseTypeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">成立日期:</template>
            <el-form-item v-if="isEdit" prop="setUpTheDate">
              <el-date-picker
                v-model="practice.setUpTheDate"
                type="date"
                filterable
                clearable
                style="width: 100%;"
                placeholder="选择成立日期"
              />
            </el-form-item>
            <span v-else>{{ practice.setUpTheDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />营业执照注册日期:</template>
            <el-form-item v-if="isEdit" prop="registrationDate">
              <el-date-picker
                v-model="practice.registrationDate"
                type="date"
                filterable
                clearable
                style="width: 100%;"
                placeholder="选择营业执照注册日期"
              />
            </el-form-item>
            <span v-else>{{ practice.registrationDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />营业执照有效日期:</template>
            <el-form-item v-if="isEdit" :prop="zjIsYj==='日期'?'effectiveDate':''">
              <span v-show="zjIsYj==='日期'" style="margin-right: 10px;">
                <el-date-picker
                  v-model="practice.effectiveDate"
                  type="date"
                  placeholder="选择营业执照有效日期"
                />
              </span>
              <span>
                <el-radio-group v-model="zjIsYj" size="mini">
                  <el-radio-button label="永久" />
                  <el-radio-button label="日期" />
                </el-radio-group>
              </span>
            </el-form-item>
            <span v-else>{{ practice.effectiveDate || '永久' }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />登记机关:</template>
            <el-form-item v-if="isEdit" prop="registrationAuthority">
              <el-input
                v-model="practice.registrationAuthority"
                filterable
                clearable
                placeholder="请输入登记机关"
              />
            </el-form-item>
            <span v-else>{{ practice.registrationAuthority }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法定代表人:</template>
            <el-form-item v-if="isEdit" prop="legalRepresentative">
              <el-input
                v-model="practice.legalRepresentative"
                filterable
                clearable
                placeholder="请输入法定代表人"
              />
            </el-form-item>
            <span v-else>{{ practice.legalRepresentative }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法定代表人身份证号码:</template>
            <el-form-item v-if="isEdit" prop="legalRepresentativeId">
              <el-input
                v-model="practice.legalRepresentativeId"
                filterable
                clearable
                placeholder="请输入法定代表人身份证号码"
              />
            </el-form-item>
            <span v-else>{{ practice.legalRepresentativeId }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />法定代表人联系电话:</template>
            <el-form-item v-if="isEdit" prop="legalRepresentativePhone">
              <el-input
                v-model="practice.legalRepresentativePhone"
                filterable
                clearable
                placeholder="请输入法定代表人联系电话"
              />
            </el-form-item>
            <span v-else>{{ practice.legalRepresentativePhone }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">注册城市:</template>
            <el-form-item v-if="isEdit" prop="registeredUrban">
              <el-input
                v-model="practice.registeredUrban"
                filterable
                clearable
                placeholder="请输入注册城市"
              />
            </el-form-item>
            <span v-else>{{ practice.registeredUrban }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />注册地址:</template>
            <el-form-item v-if="isEdit" prop="address">
              <el-input
                v-model="practice.address"
                filterable
                clearable
                placeholder="请输入注册地址"
              />
            </el-form-item>
            <span v-else>{{ practice.address }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">经济类型:</template>
            <el-form-item v-if="isEdit" prop="economicTypeCode">
              <el-select
                v-model="practice.economicTypeCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择经济类型"
              >
                <el-option
                  v-for="item in economicTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.economicTypeCode,economicTypeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">经济类型代码:</template>
            {{ practice.economicTypeCode }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">邮编:</template>
            <el-form-item v-if="isEdit" prop="zipCode">
              <el-input
                v-model="practice.zipCode"
                filterable
                clearable
                placeholder="请输入邮编"
              />
            </el-form-item>
            <span v-else>{{ practice.zipCode }}</span>
          </el-descriptions-item>
          <!-- <el-descriptions-item>
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
          </el-descriptions-item> -->

          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="isEdit" class="required" />营业范围:</template>
            <el-form-item v-if="isEdit" prop="businessScope">
              <el-input
                v-model="practice.businessScope"
                type="textarea"
                placeholder="请输入营业范围"
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </el-form-item>
            <span v-else>{{ practice.businessScope }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">总公司名称:</template>
            <el-form-item v-if="isEdit" prop="companyName">
              <el-input
                v-model="practice.companyName"
                filterable
                clearable
                placeholder="请输入总公司名称"
              />
            </el-form-item>
            <span v-else>{{ practice.companyName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">总公司统一社会信用代码:</template>
            <el-form-item v-if="isEdit" prop="companyCreditCode">
              <el-input
                v-model="practice.companyCreditCode"
                filterable
                clearable
                placeholder="请输入总公司统一社会信用代码"
              />
            </el-form-item>
            <span v-else>{{ practice.companyCreditCode }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div class="icon-title">
          <span class="span" />营业资质信息
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
            <template slot="label"><i v-if="isEdit" class="required" />资质名称:</template>
            <el-form-item v-if="isEdit" prop="qualificationName">
              <el-input
                v-model="practice.qualificationName"
                filterable
                clearable
                placeholder="请输入资质名称"
              />
            </el-form-item>
            <span v-else>{{ practice.qualificationName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件类型:</template>
            <el-form-item v-if="isEdit" prop="documentTypeCode">
              <el-select
                v-model="practice.documentTypeCode"
                filterable
                clearable
                style="width: 100%;"
                placeholder="请选择证件类型"
              >
                <el-option
                  v-for="item in qyDocumentTypeCodeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ getLabelName(practice.documentTypeCode,qyDocumentTypeCodeOptions) }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">证件类型代码:</template>
            {{ practice.documentTypeCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件编号:</template>
            <el-form-item v-if="isEdit" prop="documentNo">
              <el-input
                v-model="practice.documentNo"
                filterable
                clearable
                placeholder="请输入证件编号"
              />
            </el-form-item>
            <span v-else>{{ practice.documentNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />发证机关:</template>
            <el-form-item v-if="isEdit" prop="licenseIssuingAgencies">
              <el-input
                v-model="practice.licenseIssuingAgencies"
                filterable
                clearable
                placeholder="请输入发证机关"
              />
            </el-form-item>
            <span v-else>{{ practice.licenseIssuingAgencies }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />发证日期:</template>
            <el-form-item v-if="isEdit" prop="releaseDate">
              <el-date-picker
                v-model="practice.releaseDate"
                filterable
                clearable
                style="width: 100%;"
                type="date"
                placeholder="选择发证日期"
              />
            </el-form-item>
            <span v-else>{{ practice.releaseDate }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件起始日期:</template>
            <el-form-item v-if="isEdit" prop="certificateStartDate">
              <el-date-picker
                v-model="practice.certificateStartDate"
                filterable
                clearable
                style="width: 100%;"
                type="date"
                placeholder="选择发证件起始日期"
              />
            </el-form-item>
            <span v-else>{{ practice.certificateStartDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件终止日期:</template>
            <div v-if="isEdit">
              <span style="display: inline-block; margin-right: 10px;">
                <el-form-item v-if="expiryDate!=='永久'" prop="certificateStartEnd">
                  <el-date-picker
                    v-model="practice.certificateStartEnd"
                    type="date"
                    placeholder="选择证件有效期"
                  />
                </el-form-item>
              </span>
              <span style="display: inline-block;">
                <el-radio-group v-model="expiryDate" size="mini">
                  <el-radio-button label="永久" />
                  <el-radio-button label="日期" />
                </el-radio-group>
              </span>
            </div>
            <span v-else>{{ practice.certificateStartEnd || '永久' }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证件有效期:</template>
            <el-form-item v-if="isEdit" prop="validityOfCertificate">
              <el-input
                v-model="practice.validityOfCertificate"
                filterable
                clearable
                placeholder="请输入证件有效期"
              />
            </el-form-item>
            <span v-else>{{ practice.validityOfCertificate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />证照状态:</template>
            <el-form-item v-if="isEdit" prop="state">
              <el-select
                v-model="practice.state"
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
            <span v-else>{{ getLabelName(practice.state,certificateStatusOptions) }}</span>
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
import { getInfo, updateData,addData } from '@/api/credit/waterway/data-reporting'
import { momentDate } from '@/utils/index'
import { getEnterpriseTypeOptions,getEconomicTypeOptions,getqyDocumentTypeCodeOptions,getCertificateStatusOptions,getLabelName} from '@/utils/config'
import { identity,postal,telephone} from '@/utils/validate'
export default {
  data() {
    return {
      practice: {
        state:'',
        economicTypeCode:'',
        enterpriseType:'',
        validityOfCertificate:'',
        documentTypeCode:''
      },
      isEdit:true,
      expiryDate: '永久',
      zjIsYj:'永久',
      enterpriseTypeOptions: getEnterpriseTypeOptions(),
      economicTypeOptions:getEconomicTypeOptions(),
      qyDocumentTypeCodeOptions:getqyDocumentTypeCodeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      rules: {
        certificateUnitNo: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: '请选择单位名称', trigger: 'blur' }
        ],
        enterpriseType: [
          { required: true, message: '请输入单位类型', trigger: 'blur' }
        ],
        registrationDate: [
          { required: true, message: '请选择营业执照注册日期', trigger: 'blur' }
        ],
        effectiveDate: [
          { required: true, message: '请选择营业执照有效日期', trigger: 'blur' }
        ],
        registrationAuthority: [
          { required: true, message: '请输入登记机关', trigger: 'blur' }
        ],
        legalRepresentative: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        legalRepresentativeId: [
          { required: true, message: '请输入法定代表人身份证号码', trigger: 'blur' },
          { validator: identity,message: '身份证格式错误', trigger: 'blur' }
        ],
        legalRepresentativePhone: [
          { required: true, message: '请输入法定代表人联系电话', trigger: 'blur' },
          { validator: telephone,message: '联系电话格式错误', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        qualificationName: [
          { required: true, message: '请输入资质名称', trigger: 'blur' }
        ],
        documentNo: [
          { required: true, message: '请输入证件编号', trigger: 'blur' }
        ],
        licenseIssuingAgencies: [
          { required: true, message: '请输入发证机关', trigger: 'blur' }
        ],
        releaseDate: [
          { required: true, message: '请选择发证日期', trigger: 'blur' }
        ],
        businessScope:[
          { required: true, message: '请输入营业范围', trigger: 'blur' }
        ],
        validityOfCertificate: [
          { required: true, message: '请选择证件有效期', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择证照状态', trigger: 'change' }
        ],
        certificateStartDate:[
          { required: true, message: '请选择证件起始日期', trigger: 'blur' }
        ],
        certificateStartEnd:[
          { required: true, message: '请选择证件终止日期', trigger: 'blur' }
        ],
        zipCode:[
          { validator: postal,message: '邮政编码格式错误', trigger: 'blur' }
        ],
        documentTypeCode:[
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ]
        /*
         * economicTypeCode:[
         *   { required: true, message: '请选择经济类型', trigger: 'change' }
         * ],
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
    getLabelName,
    init(id){
      getInfo(id).then(res=>{
        this.practice = res.data
        this.zjIsYj = this.practice.effectiveDate === '永久' || this.practice.effectiveDate === '' ? '永久' : '日期'
        this.practice.effectiveDate = this.practice.effectiveDate === '永久' || this.practice.effectiveDate === '' ? '' : this.practice.effectiveDate
        this.expiryDate = this.practice.certificateStartEnd === '永久' || this.practice.certificateStartEnd === '' ? '永久' : '日期'
        this.practice.certificateStartEnd = this.practice.certificateStartEnd === '永久' ? '' : this.practice.certificateStartEnd
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.practice.effectiveDate = this.zjIsYj === '永久' ? '永久' : momentDate(this.practice.effectiveDate,'YYYY-MM-DD')
          this.practice.setUpTheDate = momentDate(this.practice.setUpTheDate,'YYYY-MM-DD')
          this.practice.registrationDate = momentDate(this.practice.registrationDate,'YYYY-MM-DD')
          this.practice.certificateStartEnd = this.expiryDate === '永久' ? '永久' : momentDate(this.practice.certificateStartEnd,'YYYY-MM-DD')
          this.practice.releaseDate = momentDate(this.practice.releaseDate,'YYYY-MM-DD')
          this.practice.certificateStartDate = momentDate(this.practice.certificateStartDate,'YYYY-MM-DD')
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
