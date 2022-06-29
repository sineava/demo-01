<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>提交安全现状评价报告备案</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="200px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="所在地市港口管理部门:"
          prop="organizationName"
        >
          <el-input
            v-model.trim="ruleForm.organizationName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="港口企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="安全现状评价报告名称:"
          prop="reportName"
        >
          <el-input
            v-model.trim="ruleForm.reportName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="评价日期:"
          prop="evaluateDate"
        >
          <el-date-picker
            v-model="ruleForm.evaluateDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="评价机构名称:"
          prop="evaluateOrganizationName"
        >
          <el-input
            v-model.trim="ruleForm.evaluateOrganizationName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="备案日期:"
          prop="filingDate"
        >
          <el-date-picker
            v-model="ruleForm.filingDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="备案表:"
          prop="filingTable"
        >
          <el-input
            v-model.trim="ruleForm.filingTable"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contactsName"
        >
          <el-input
            v-model.trim="ruleForm.contactsName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="contactsPhone"
        >
          <el-input
            v-model.trim="ruleForm.contactsPhone"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="安全评价报告文件"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.evaluateEnclosure"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="整改认定书"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.rectifyEnclosure"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="附件"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.enclosureInfo"
            :show-download="true"
          />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import commonTable from '../../commonTable'
import { findById } from '@/api/port-services/port-enterprise-charge-management/report-filing'
export default {
  components: {
    commonTable
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
    async fetchDetail(id) {
      findById({ id }).then(res => {
        // console.log(res)
      })
    }
  }
}
</script>
