<template>
  <el-form
    ref="ruleForm"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
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
        <template slot="label"><i v-if="isEdit" class="required" />所在地市港口管理部门:</template>
        <el-select
          v-if="isEdit && user_info.orgcategory === '1'"
          v-model="securityData.organizationId"
          clearable
          placeholder="请选择所在地市港口管理部门"
          style="width: 100%;"
          @change="fetchCompany"
        >
          <el-option
            v-for="item, i in deptList"
            :key="i"
            :label="item.org_NAME"
            :value="item.org_CODE"
          />
        </el-select>
        <span v-else>{{ securityData.organizationName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />港口企业:</template>
        <el-select
          v-if="isEdit"
          v-model="securityData.enterpriseId"
          clearable
          placeholder="请选择港口企业"
          style="width: 100%;"
        >
          <el-option
            v-for="item, i in companyList"
            :key="i"
            :label="item.enterpriseName"
            :value="item.id"
          />
        </el-select>
        <span v-else>{{ securityData.enterpriseName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />安全现状评价报告名称:</template>
        <el-form-item v-if="isEdit" prop="reportName">
          <el-input v-model.trim="securityData.reportName" placeholder="请输入安全现状评价报告名称" maxlength="30" />
        </el-form-item>
        <span v-else>{{ securityData.reportName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />评价日期:</template>
        <el-form-item v-if="isEdit" prop="evaluateDate">
          <el-date-picker
            v-model="securityData.evaluateDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择评价日期"
          />
        </el-form-item>
        <span v-else>{{ securityData.evaluateDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />评价机构名称:</template>
        <el-form-item v-if="isEdit" prop="evaluateOrganizationName">
          <el-input v-model.trim="securityData.evaluateOrganizationName" placeholder="请输入评价机构名称" maxlength="100" />
        </el-form-item>
        <span v-else>{{ securityData.evaluateOrganizationName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />备案日期:</template>
        <el-form-item v-if="isEdit" prop="filingDate">
          <el-date-picker
            v-model="securityData.filingDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择备案日期"
          />
        </el-form-item>
        <span v-else>{{ securityData.filingDate }}</span>
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
        <template slot="label"><i v-if="isEdit" class="required" />备案表:</template>
        <el-form-item v-if="isEdit" prop="filingTable">
          <el-input v-model.trim="securityData.filingTable" placeholder="请输入备案表" maxlength="255" />
        </el-form-item>
        <span v-else>{{ securityData.filingTable }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />安全评价报告文件
    </div>
    <upload
      file
      v-if="isEdit"
      :show-file-list="false"
      :limit="5"
      multiple
      :file-list="evaluateEnclosure"
      @fileSuccess="uploadSuccess($event, 'evaluateEnclosure')"
      @remove="uploadRemove($event, 'evaluateEnclosure')"
    />
    <common-table
      :table-data="evaluateEnclosure"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'evaluateEnclosure')"
    />
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />整改认定书
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        :file-list="rectifyEnclosure"
        multiple
        @fileSuccess="uploadSuccess($event, 'rectifyEnclosure')"
        @remove="uploadRemove($event, 'rectifyEnclosure')"
      />
    <common-table
        :table-data="rectifyEnclosure"
        show-download
        :show-delete="isEdit"
        @handleDelete="handleDelete($event, 'rectifyEnclosure')"
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
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />备案表
    </div>
    <upload
      file
      v-if="isEdit"
      :show-file-list="false"
      :limit="5"
      multiple
      :file-list="filePath"
      @fileSuccess="uploadSuccess($event, 'filePath')"
      @remove="uploadRemove($event, 'filePath')"
    />
    <common-table
      :table-data="filePath"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'filePath')"
    />
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />备注
    </div>
    <el-input
      v-model.trim="securityData.remark"
      type="textarea"
      placeholder="请输入备注"
      rows="6"
      maxlength="2000"
      show-word-limit
    />
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
import { getListById } from '@/api/general-services/enterprise-basic'
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
      filePath: [], // 备案表
      deptList: [], // 部门列表
      companyList: [], // 公司列表
      rectifyEnclosure: [], // 整改认定书
      enclosureInfo: [], // 附件
      evaluateEnclosure: [], // 安全评价报告文件
      securityData: {},
      rules: {
        reportName: [
          { required: true, message: '请输入安全现状评价报告名称', trigger: 'blur' }
        ],
        evaluateDate: [
          { required: true, message: '请输入评价日期', trigger: 'change' }
        ],
        evaluateOrganizationName: [
          { required: true, message: '请输入评价机构名称', trigger: 'blur' }
        ],
        filingDate: [
          { required: true, message: '请输入备案日期', trigger: 'change' }
        ],
        filingTable: [
          { required: true, message: '请输入备案表', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        console.log(newV)
        this.init(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.init(this.data)
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  methods: {
    init(data){
      this.securityData = {
        ...data,
        organizationId: `${data.organizationId || ''}`,
        enterpriseId: data.enterpriseId,
        filePath: JSON.parse(data?.enclosureInfo || '[]'),
        enclosureInfo: JSON.parse(data?.enclosureInfo || '[]'),
        evaluateEnclosure: JSON.parse(data?.evaluateEnclosure || '[]'),
        rectifyEnclosure: JSON.parse(data?.rectifyEnclosure || '[]'),
      }
      this.fetchOrgs()
    },
    async fetchOrgs() {
      if (this.user_info.orgcategory==='1') {
        this.deptList = (await getOrgList({ type: '2,3' }))?.data || []
      } else {
        const { orgid, orgname } = this.user_info || {}
        this.securityData.organizationName = orgname
        this.securityData.organizationId = `${orgid}`
      }
      const { organizationId } = this.securityData
      if (organizationId) this.fetchCompany(organizationId, false)
    },
    uploadSuccess(file, listName) {
      this[listName].push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    uploadRemove(file, listName) {
      this[listName].splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    handleDelete(val, itemName) {
      this[itemName].splice(val.index, 1)
    },
    async submitForm() {
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        res.filePath = JSON.stringify(this.filePath)
        res.enclosureInfo = JSON.stringify(this.enclosureInfo)
        res.rectifyEnclosure = JSON.stringify(this.rectifyEnclosure)
        res.evaluateEnclosure = JSON.stringify(this.evaluateEnclosure)
        res.organizationName = this.deptList.find(x => x?.org_CODE === this.securityData.organizationId)?.org_NAME
        res.enterpriseName = this.companyList.find(x => x?.id === this.securityData.enterpriseId)?.enterpriseName
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    },
    async fetchCompany(val, flag = true) {
      console.log(val, flag)
      if (flag) this.securityData.enterpriseId = ''
      if (!val) {
        this.companyList = []
      } else {
        this.companyList = (await getListById({ orgId: val, enterpriseType: 1 }))?.data || []
      }
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
