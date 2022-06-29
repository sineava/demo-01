<template>
  <el-form
    ref="license"
    :model="license"
    :rules="rules"
    label-width="0"
    class="base-license"
  >
    <div class="icon-title">
      <span class="span" />基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="license-title"
      contentClassName="license-text"
      border
    >
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />企业名称:</template>
        {{ license.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法定代表人:</template>
        <el-form-item v-if="isEdit" prop="legalPerson">
          <el-input v-model.trim="license.legalPerson" placeholder="请输入法定代表人" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.legalPerson }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model.trim="license.address" placeholder="请输入地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.address }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />经济类型:</template>
        <el-form-item v-if="isEdit" prop="economicType">
          <el-input v-model.trim="license.economicType" placeholder="请输入经济类型" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.economicType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />许可证编号:</template>
        <el-form-item v-if="isEdit" prop="licenseNo">
          <el-input v-model.trim="license.licenseNo" placeholder="请输入水路运输经营许可证编号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.licenseNo }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />经营期限:</template>
        <el-form-item v-if="isEdit" prop="operationTerm">
          <el-input v-model.trim="license.operationTerm" placeholder="请输入经营期限" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.operationTerm }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />批准机关:</template>
        <el-form-item v-if="isEdit" prop="approvalAuthority">
          <el-input v-model.trim="license.approvalAuthority" placeholder="请输入批准机关" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.approvalAuthority }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">文号:</template>
        <el-form-item v-if="isEdit" prop="documentNo">
          <el-input v-model.trim="license.documentNo" placeholder="请输入文号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.documentNo }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />开始时间:</template>
        <el-form-item v-if="isEdit" prop="startDate">
          <el-date-picker
            v-model="license.startDate"
            type="date"
            placeholder="选择开始时间"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ license.startDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />结束时间:</template>
        <el-form-item v-if="isEdit" prop="endDate">
          <span v-show="isYj==='日期'" style="margin-right: 10px;">
            <el-date-picker
              v-model="license.endDate"
              type="date"
              placeholder="选择结束时间"
            />
          </span>
          <span>
            <el-radio-group v-model="isYj" size="mini" @change="changeRadio">
              <el-radio-button label="永久" />
              <el-radio-button label="日期" />
            </el-radio-group>
          </span>
        </el-form-item>
        <span v-else>{{ license.endDate }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />发证日期:</template>
        <el-form-item v-if="isEdit" prop="issueDate">
          <el-date-picker
            v-model="license.issueDate"
            type="date"
            placeholder="选择发证日期"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ license.issueDate }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 经营范围<span v-if="isEdit" style="font-weight: 500; color: #ff0000;">（旅客运输/货物运输至少填写一项）</span>
    </div>
    <el-descriptions
      class="descriptions-one"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="license-title"
      contentClassName="license-text"
      border
    >
      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />旅客运输:</template>
        <el-form-item v-if="isEdit" prop="passengerTransport">
          <el-input
            v-model.trim="license.passengerTransport"
            type="textarea"
            placeholder="请输入旅客运输信息"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ license.passengerTransport }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />货物运输:</template>
        <el-form-item v-if="isEdit" prop="goodsTransport">
          <el-input
            v-model.trim="license.goodsTransport"
            type="textarea"
            placeholder="请输入旅客运输信息"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ license.goodsTransport }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">兼营:</template>
        <el-form-item v-if="isEdit" prop="sideline">
          <el-input
            v-model.trim="license.sideline"
            type="textarea"
            placeholder="请输入兼营信息"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ license.sideline }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
import moment from 'moment'
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
      license: {
        enterpriseName:'',
        endDate:'',
        startDate:''
      },
      startDate:[],
      isYj:'永久',
      rules: {
        /*
         * enterpriseName: [
         *   { required: true, message: '请输入企业名称', trigger: 'blur' }
         * ],
         */
        economicType:[
          { required: true, message: '请输入经济类型', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        licenseNo:[
          { required: true, message: '请输入许可证编号', trigger: 'blur' }
        ],
        operationTerm:[
          { required: true, message: '请输入经营期限', trigger: 'blur' }
        ],
        approvalAuthority:[
          { required: true, message: '请输入批准机关', trigger: 'blur' }
        ],
        issueDate:[
          { required: true, message: '请选择发证日期', trigger: 'blur' }
        ],
        startDate:[
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endDate:[
          { required: true, message: '请选择结束时间', trigger: 'blur' }
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
    }
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    changeRadio(value){
      this.license.endDate = value === '永久' ? '永久' : ''
    },
    initIicense(data){
      this.license = {
        id: data?.id,
        address: data?.address,
        approvalAuthority: data?.approvalAuthority,
        documentNo: data?.documentNo,
        economicType: data?.economicType,
        endDate: data && data.endDate ? (data.endDate!=='永久'?moment(data.endDate).format('YYYY-MM-DD'):'永久') : '',
        enterpriseId: data?.enterpriseId,
        enterpriseName: data?.enterpriseName,
        goodsTransport: data?.goodsTransport,
        issueDate: data && data.issueDate ? moment(data.issueDate).format('YYYY-MM-DD') : '',
        legalPerson: data?.legalPerson,
        licenseNo: data?.licenseNo,
        operationTerm: data?.operationTerm,
        passengerTransport: data?.passengerTransport,
        sideline: data?.sideline,
        startDate: data && data.startDate ? moment(data.startDate).format('YYYY-MM-DD') : '',
      }
      this.isYj = this.license.endDate==='永久'?'永久':'日期'
    },
    // 输入框变更
    inputChange(){
      this.initIicense(this.license)
      this.$emit('changeIicense',this.license)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      if (!this.license.passengerTransport && !this.license.goodsTransport){
        this.$message.error('旅客运输/货物运输至少填写一项')
        return res
      }
      this.$refs['license'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.license))
          res.endDate = res.endDate ? (res.endDate!=='永久'?moment(res.endDate).format('YYYY-MM-DD'):'永久') : ''
          res.issueDate = res.issueDate ? moment(res.issueDate).format('YYYY-MM-DD') : ''
          res.startDate = res.startDate ? moment(res.startDate).format('YYYY-MM-DD') : ''
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
.base-license {
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

        /deep/ .license-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .license-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .license-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .license-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
