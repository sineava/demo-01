<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="icon-title">
      <span class="span" /> 审核信息
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
        <template slot="label">所在地市港口管理部门:</template>
        {{securityData.organizationName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">港口企业名称:</template>
        {{securityData.enterpriseName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急预案名称:</template>
        <el-form-item v-if="isEdit" prop="planName">
          <el-input v-model="securityData.planName" placeholder="请输入应急预案名称" maxlength="30" />
        </el-form-item>
        <span v-else>{{ securityData.planName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contactsName">
          <el-input v-model="securityData.contactsName" placeholder="请输入联系人" maxlength="50" />
        </el-form-item>
        <span v-else>{{ securityData.contactsName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系方式:</template>
        <el-form-item v-if="isEdit" prop="contactsPhone">
          <el-input
            v-model="securityData.contactsPhone"
            maxlength="20"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactsPhone }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />备案日期:</template>
        <el-form-item v-if="isEdit" prop="filingDate">
          <el-date-picker
            v-model="securityData.filingDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择备案日期："
          />
        </el-form-item>
        <span v-else>{{ securityData.filingDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />行业类型:</template>
        <span>港口经营</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">传真:</template>
        <el-form-item v-if="isEdit">
          <el-input
            v-model="securityData.fax"
            maxlength="20"
            placeholder="请输入传真"
          />
        </el-form-item>
        <span v-else>{{ securityData.fax }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />单位地址:</template>
        <el-form-item v-if="isEdit" prop="unitAddress">
          <el-input
            v-model="securityData.unitAddress"
            maxlength="100"
            placeholder="请输入单位地址"
          />
        </el-form-item>
        <span v-else>{{ securityData.unitAddress }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />邮政编码:</template>
        <el-form-item v-if="isEdit" prop="postCode">
          <el-input
            v-model="securityData.postCode"
            maxlength="10"
            placeholder="请输入邮政编码"
          />
        </el-form-item>
        <span v-else>{{ securityData.postCode }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template slot="label"><i v-if="isEdit" class="required" />电子邮箱:</template>
        <el-form-item v-if="isEdit" prop="postCode">
          <el-input
            v-model="securityData.email"
            maxlength="50"
            placeholder="请输入电子邮箱"
          />
        </el-form-item>
        <span v-else>{{ securityData.email }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <template v-if="securityData.filingForm === 3">
      <div class="icon-title">
        <span class="span" />注销申请
      </div>
      <el-descriptions
        class="descriptions-one"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="securityData-title"
        contentClassName="securityData-text"
        border
      >
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />注销原因:</template>
          <el-form-item v-if="isEdit" prop="cancellationReason">
            <el-input
              v-model="securityData.cancellationReason"
              type="textarea"
              rows="6"
              maxlength="200"
              placeholder="请输入注销原因"
              show-word-limit
            />
          </el-form-item>
          <span v-else>{{ securityData.cancellationReason }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </template>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />应急预案文件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="reserveFile"
        @fileSuccess="uploadSuccess($event, 'reserveFile')"
        @remove="uploadRemove($event, 'reserveFile')"
      />
    <common-table
      :table-data="reserveFile"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'reserveFile')"
    />

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />预案评审或者论证意见
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="reviewFile"
        @fileSuccess="uploadSuccess($event, 'reviewFile')"
        @remove="uploadRemove($event, 'reviewFile')"
      />
    <common-table
      :table-data="reviewFile"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'reviewFile')"
    />

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />专家确认意见
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="expertConfirm"
        @fileSuccess="uploadSuccess($event, 'expertConfirm')"
        @remove="uploadRemove($event, 'expertConfirm')"
      />
    <common-table
      :table-data="expertConfirm"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'expertConfirm')"
    />

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />备案登记表
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="registerTable"
        @fileSuccess="uploadSuccess($event, 'registerTable')"
        @remove="uploadRemove($event, 'registerTable')"
      />
    <common-table
      :table-data="registerTable"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'registerTable')"
    />

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
      reserveFile:[],//应急预案文件
      reviewFile:[],//预案评审或者论证意见
      expertConfirm:[],//专家确认意见
      registerTable:[],//备案登记表
      enclosureInfo: [], // 附件
      securityData: {},
      rules: {
         planName: [
          { required: true, message: '请输入应急预案名称', trigger: 'blur' }
        ],
        filingDate: [
          { required: true, message: '请输入备案日期', trigger: 'change' }
        ],
        contactsName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        assetsTotal: [
          { required: true, message: '请输入资产总额（万）', trigger: 'blur' }
        ],
        unitAddress: [
          { required: true, message: '请输入单位地址', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' }
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
        planName:data?.planName,
        contactsName:data?.contactsName,
        contactsPhone:data?.contactsPhone,
        filingDate:data?.filingDate,
        legalPerson:data?.legalPerson,
        assetsTotal:data?.assetsTotal,
        industryType:data?.industryType,
        fax:data?.fax,
        unitAddress:data?.unitAddress,
        postCode:data?.postCode,
        email:data?.email,
        cancellationReason:data?.cancellationReason,
        enterpriseId:data?.enterpriseId,
        filingForm:data?.filingForm,
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
        res.industryType = '港口经营' // 固定为港口经营(bug:#3415)
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
    .descriptions-one{
      margin-bottom: 20px;

        /deep/ .securityData-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
