<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="icon-title">
      <span class="span" /> 基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">所在地市管理部门:</template>
        {{securityData.organizationName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">企业名称:</template>
        {{securityData.enterpriseName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />公司注册地:</template>
        <el-form-item v-if="isEdit" prop="officeAddress">
          <el-input v-model="securityData.officeAddress" placeholder="请输入公司注册地" maxlength="50" />
        </el-form-item>
        <span v-else>{{ securityData.officeAddress }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法定代表人:</template>
        <el-form-item v-if="isEdit" prop="legalPersonName">
          <el-input
            v-model="securityData.legalPersonName"
            maxlength="20"
            placeholder="请输入法定代表人"
          />
        </el-form-item>
        <span v-else>{{ securityData.legalPersonName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法人身份证号:</template>
        <el-form-item v-if="isEdit" prop="legalPersonCardNo">
          <el-input
            v-model="securityData.legalPersonCardNo"
            maxlength="20"
            placeholder="请输入法人身份证号"
          />
        </el-form-item>
        <span v-else>{{ securityData.legalPersonCardNo }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contactName">
          <el-input
            v-model="securityData.contactName"
            maxlength="20"
            placeholder="请输入联系人"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactPhone">
          <el-input
            v-model="securityData.contactPhone"
            maxlength="20"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactPhone }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />传真:</template>
        <el-form-item v-if="isEdit" prop="faxNumber">
          <el-input
            v-model="securityData.faxNumber"
            maxlength="20"
            placeholder="请输入传真"
          />
        </el-form-item>
        <span v-else>{{ securityData.faxNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />经济类型:</template>
        <el-form-item v-if="isEdit" prop="economicType">
          <el-input
            v-model="securityData.economicType"
            maxlength="100"
            placeholder="请输入经济类型"
          />
        </el-form-item>
        <span v-else>{{ securityData.economicType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />资金币种:</template>
        <el-form-item v-if="isEdit" prop="currencyCategory">
          <el-input
            v-model="securityData.currencyCategory"
            maxlength="100"
            placeholder="请输入资金币种"
          />
        </el-form-item>
        <span v-else>{{ securityData.currencyCategory }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />注册资本（万元）:</template>
        <el-form-item v-if="isEdit" prop="registeredCapital">
          <el-input-number
            v-model="securityData.registeredCapital"
            style="width: 100%;"
            :precision="2"
            :min="1"
            :controls="false"
            :max="99999999"
            placeholder="请输入资产总额（万元）"
            />
        </el-form-item>
        <span v-else>{{ securityData.registeredCapital }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />备案机关:</template>
        <el-form-item v-if="isEdit" prop="officeType">
          <el-select v-model="securityData.officeType" style="width:100%;" placeholder="请选择备案机关">
          <el-option label="重庆市港航海事中心" :value="1"/>
          <el-option label="区县机构" :value="2" />
        </el-select>
        </el-form-item>
        <span v-else>{{ securityData.officeType === 1 ? '重庆市港航海事中心' : '区县机构' }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">备案日期:</template>
        {{securityData.filingDate || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">有效期至:</template>
        {{securityData.validityDate || '-'}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="enclosureInfo"
        @fileSuccess="uploadSuccess($event, 'enclosureInfo')"
        @remove="uploadRemove($event, 'enclosureInfo')"
      />
    <common-table
      :table-data="enclosureInfo"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'enclosureInfo')"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { telephone, identity, fax } from '@/utils/validate'
export default {
  components: {
    upload,
    CommonTable
  },
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
      enclosureInfo: [], // 附件
      securityData: {},
      rules: {
         enterpriseName: [
          { required: true, message: '请输入无船承运人中文名称', trigger: 'blur' }
        ],
        officeAddress: [
          { required: true, message: '请输入公司注册地', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        contactName:[
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur', validator: telephone }
        ],
        legalPersonCardNo: [
          { required: true, message: '请输入法人身份证号码', trigger: 'blur', validator: identity }
        ],
        faxNumber: [
          { required: true, message: '请输入传真号码', trigger: 'blur', validator: fax }
        ],
        economicType: [
          { required: true, message: '请输入经济类型', trigger: 'blur' }
        ],
        registeredCapital: [
          { required: true, message: '请输入注册资本', trigger: 'blur' }
        ],
        currencyCategory: [
          { required: true, message: '请输入资金币种', trigger: 'blur' }
        ],
        officeType: [
          { required: true, message: '请选择备案机关', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(data){
      this.securityData = {
        id:data?.id,
        organizationName:data?.organizationName,
        enterpriseName:data?.enterpriseName,
        contactName:data?.contactName,
        officeAddress:data?.officeAddress,
        legalPersonName:data?.legalPersonName,
        faxNumber:data?.faxNumber,
        legalPersonCardNo:data?.legalPersonCardNo,
        economicType:data?.economicType,
        contactPhone:data?.contactPhone,
        currencyCategory:data?.currencyCategory,
        registeredCapital:data?.registeredCapital,
        officeType:data?.officeType,
        filingDate:data?.filingDate,
        validityDate:data?.validityDate,
        enterpriseId:data?.enterpriseId,
        organizationName:data?.organizationName,
        organizationId:data?.organizationId
      }
      this.reserveFile = data && data.reserveFile ? JSON.parse(data.reserveFile) : []//应急预案文件
      this.reviewFile = data && data.reviewFile ? JSON.parse(data.reviewFile) : []//预案评审或者论证意见
      this.expertConfirm = data && data.expertConfirm ? JSON.parse(data.expertConfirm) : []//专家确认意见
      this.registerTable = data && data.registerTable ? JSON.parse(data.registerTable) : []//备案登记表
      this.enclosureInfo = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []// 附件
    },
    // 文件上传成功钩子
    uploadSuccess(file, listName) {
      this[listName].push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file, listName) {
      this[listName].splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val, itemName) {
      this[itemName].splice(val.index, 1)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['securityData'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        res.reserveFile = JSON.stringify(this.reserveFile)
        res.reviewFile = JSON.stringify(this.reviewFile)
        res.expertConfirm = JSON.stringify(this.expertConfirm)
        res.registerTable = JSON.stringify(this.registerTable)
        res.enclosureInfo = JSON.stringify(this.enclosureInfo)
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.base-securityData {
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

        /deep/ .securityData-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
