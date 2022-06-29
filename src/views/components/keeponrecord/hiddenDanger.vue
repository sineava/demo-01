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
        <template slot="label"><i v-if="isEdit" class="required" />重大隐患名称:</template>
        <el-form-item v-if="isEdit" prop="threatName">
          <el-input v-model.trim="securityData.threatName" placeholder="请输入重大隐患名称" maxlength="30" />
        </el-form-item>
        <span v-else>{{ securityData.threatName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contactsName">
          <el-input v-model.trim="securityData.contactsName" placeholder="请输入联系人" maxlength="50" />
        </el-form-item>
        <span v-else>{{ securityData.contactsName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系方式:</template>
        <el-form-item v-if="isEdit" prop="contactsPhone">
          <el-input
            v-model.trim="securityData.contactsPhone"
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
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />隐患现状描述:</template>
        <el-form-item v-if="isEdit" prop="threatPresent">
          <el-input
              v-model="securityData.threatPresent"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入隐患现状描述"
            />
        </el-form-item>
        <span v-else>{{ securityData.threatPresent }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />隐患产生原因:</template>
        <el-form-item v-if="isEdit" prop="threatCauses">
          <el-input
              v-model="securityData.threatCauses"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入隐患产生原因"
            />
        </el-form-item>
        <span v-else>{{ securityData.threatCauses }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />可能导致发生的安全生产事故及后果:</template>
        <el-form-item v-if="isEdit" prop="threatConsequences">
          <el-input
              v-model="securityData.threatConsequences"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入可能导致发生的安全生产事故及后果"
            />
        </el-form-item>
        <span v-else>{{ securityData.threatConsequences }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />整改方案或已经采取的治理措施:</template>
        <el-form-item v-if="isEdit" prop="measures">
          <el-input
              v-model="securityData.measures"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入整改方案或已经采取的治理措施"
            />
        </el-form-item>
        <span v-else>{{ securityData.measures }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />治理效果和可能存在的遗留问题:</template>
        <el-form-item v-if="isEdit" prop="remainingProblems">
          <el-input
              v-model="securityData.remainingProblems"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入治理效果和可能存在的遗留问题"
            />
        </el-form-item>
        <span v-else>{{ securityData.remainingProblems }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />隐患整改验收情况:</template>
        <el-form-item v-if="isEdit" prop="acceptSituation">
          <el-input
              v-model="securityData.acceptSituation"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入隐患整改验收情况"
            />
        </el-form-item>
        <span v-else>{{ securityData.acceptSituation }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />责任人处理结果:</template>
        <el-form-item v-if="isEdit" prop="treatmentResults">
          <el-input
              v-model="securityData.treatmentResults"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入责任人处理结果"
            />
        </el-form-item>
        <span v-else>{{ securityData.treatmentResults }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />是否发生安全生产事故:</template>
        <el-form-item v-if="isEdit" prop="isAccident">
          <el-radio-group v-model="securityData.isAccident">
              <el-radio :label="1">
                是
              </el-radio>
              <el-radio :label="0">
                否
              </el-radio>
            </el-radio-group>
        </el-form-item>
        <span v-else>{{ securityData.isAccident ? '是' : '否' }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <template v-if="securityData.filingForm === 3">
      <div class="icon-title">
        <span class="span" />注销申请
      </div>
      <el-descriptions
        class="descriptions-one"
        :column="1"
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
      <span class="span" />附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="filingFile"
        @fileSuccess="uploadSuccess($event, 'filingFile')"
        @remove="uploadRemove($event, 'filingFile')"
      />
    <common-table
      :table-data="filingFile"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'filingFile')"
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
      filingFile: [], // 附件
      securityData: {},
      rules: {
        threatName: [
          { required: true, message: '请输入重大隐患名称', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        filingDate: [
          { required: true, message: '请输入备案日期', trigger: 'change' }
        ],
        threatPresent: [
          { required: true, message: '请输入隐患现状描述', trigger: 'blur' }
        ],
        threatCauses: [
          { required: true, message: '请输入隐患产生原因', trigger: 'blur' }
        ],
        threatConsequences: [
          { required: true, message: '请输入可能导致发生的安全生产事故及后果', trigger: 'blur' }
        ],
        measures: [
          { required: true, message: '请输入整改方案或已经采取的治理措施', trigger: 'blur' }
        ],
        remainingProblems: [
          { required: true, message: '请输入治理效果和可能存在的遗留问题', trigger: 'blur' }
        ],
        acceptSituation: [
          { required: true, message: '请输入隐患整改验收情况', trigger: 'blur' }
        ],
        treatmentResults: [
          { required: true, message: '请输入责任人处理结果', trigger: 'blur' }
        ],
        isAccident: [
          { required: true, message: '请选择是否发生安全生产事故', trigger: 'change' }
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
        threatName:data?.threatName,
        contactsName:data?.contactsName,
        contactsPhone:data?.contactsPhone,
        filingDate:data?.filingDate,
        threatPresent:data?.threatPresent,
        threatCauses:data?.threatCauses,
        threatConsequences:data?.threatConsequences,
        measures:data?.measures,
        remainingProblems:data?.remainingProblems,
        acceptSituation:data?.acceptSituation,
        treatmentResults:data?.treatmentResults,
        isAccident:data?.isAccident,
        cancellationReason:data?.cancellationReason,
        filingForm:data?.filingForm,
        enterpriseId:data?.enterpriseId,
        organizationId:data?.organizationId
      }
      this.filingFile = data && data.filingFile ? JSON.parse(data.filingFile) : []
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
        res.filingFile = JSON.stringify(this.filingFile)
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
