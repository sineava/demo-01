<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>岸线审批信息详情</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="组织机构名称：">
          {{ ruleForm.orgName }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构现状：">
          {{ ruleForm.orgState }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码：">
          {{ ruleForm.orgCode }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证日期：">
          {{ ruleForm.orgIssuingDate }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证机构：">
          {{ ruleForm.orgIssuingUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证有效期起：">
          {{ ruleForm.startDate }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证止：">
          {{ ruleForm.endDate }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构类型：">
          {{ ruleForm.orgType }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构英文名称：">
          {{ ruleForm.orgEnName }}
        </el-descriptions-item>
        <el-descriptions-item label="企业类别代码：">
          {{ ruleForm.enterpriseCategoryCode }}
        </el-descriptions-item>
        <el-descriptions-item label="企业类别名称：">
          {{ ruleForm.enterpriseCategoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="法定代表人：">
          {{ ruleForm.legalPersonName }}
        </el-descriptions-item>
        <el-descriptions-item label="法定代表人类型：">
          {{ ruleForm.legalPersonType }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证日期：">
          {{ ruleForm.orgIssuingDate }}
        </el-descriptions-item>
        <el-descriptions-item label="组织机构代码证发证机构：">
          {{ ruleForm.orgIssuingUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="法人证件名称：">
          {{ ruleForm.legalPersonCertificateName }}
        </el-descriptions-item>
        <el-descriptions-item label="法人证件号码：">
          {{ ruleForm.legalPersonCertificateNum }}
        </el-descriptions-item>
        <el-descriptions-item label="登记注册日期：">
          {{ ruleForm.registrationDate }}
        </el-descriptions-item>
        <el-descriptions-item label="单位注册地址：">
          {{ ruleForm.registrationAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="经营(生产)范围(主营)：">
          {{ ruleForm.businessScope }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />业务信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="申请单位地址：">
          {{ ruleForm.applicantAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="邮政编码：">
          {{ ruleForm.postcode }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人：">
          {{ ruleForm.contacts }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.contactsPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="建筑项目名称：">
          {{ ruleForm.constructionProjectName }}
        </el-descriptions-item>
        <el-descriptions-item label="岸线类型：">
          {{ ruleForm.coastlineCategory }}
        </el-descriptions-item>
        <el-descriptions-item label="项目审批核准部门：">
          {{ ruleForm.approvalDepartment }}
        </el-descriptions-item>
        <el-descriptions-item label="申请岸线位置：">
          {{ ruleForm.applyCoastlineLocation }}
        </el-descriptions-item>
        <el-descriptions-item label="申请岸线使用长度：">
          {{ ruleForm.applyCoastlineLength }}
        </el-descriptions-item>
        <el-descriptions-item label="岸线使用功能：">
          {{ ruleForm.useFunction }}
        </el-descriptions-item>
        <el-descriptions-item label="申请岸线试用期：">
          {{ ruleForm.probationPeriod }}
        </el-descriptions-item>
        <el-descriptions-item label="主要建设内容：">
          {{ ruleForm.projectContent }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <FileTable
            :show-download="true"
            :table-data="ruleForm.businessFile"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />批复信息
          </div>
        </el-form-item>
        <el-form-item
          label="批复文号:"
          prop="approvalNumber"
        >
          <el-input
            v-model.trim="ruleForm.approvalNumber"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="批复时间:"
          prop="approvalDate"
        >
          <el-input
            v-model.trim="ruleForm.approvalDate"
            disabled
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <FileTable
            :show-download="true"
            :table-data="ruleForm.approvalFile"
          />
        </el-form-item>
      </el-form>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import FileTable from '@/components/features/FileTable'
import { getDetail } from '@/api/port-services/coastline/coastline-approval'
export default {
  components: {
    FileTable
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const { id } = this.$route.query
    this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          businessFile: res.data.businessFile ? JSON.parse(res.data.businessFile) : [],
          approvalFile: res.data.approvalFile ? JSON.parse(res.data.approvalFile) : []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 14%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
