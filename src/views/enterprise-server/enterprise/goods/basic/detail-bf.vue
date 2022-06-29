<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="建设项目信息详情页" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="160px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />建设项目建设单位基本情况信息
          </div>
        </el-form-item>
        <el-form-item
          label="建设单位名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="统一社会信用代码:"
          prop="certificateNo"
        >
          <el-input
            v-model.trim="ruleForm.certificateNo"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="单位地址:"
          prop="officeAddress"
        >
          <el-input
            v-model.trim="ruleForm.officeAddress"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="法定代表人:"
          prop="legalPersonName"
        >
          <el-input
            v-model.trim="ruleForm.legalPersonName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contactName"
        >
          <el-input
            v-model.trim="ruleForm.contactName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="contactPhone"
        >
          <el-input
            v-model.trim="ruleForm.contactPhone"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="电子邮箱:"
          prop="email"
        >
          <el-input
            v-model.trim="ruleForm.email"
            disabled
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />建设项目基本信息
          </div>
        </el-form-item>
        <el-form-item
          label="项目名称:"
          prop="projectName"
        >
          <el-input v-model.trim="ruleForm.projectName" />
        </el-form-item>
        <el-form-item
          label="建设类别:"
          prop="type"
        >
          <el-select
            v-model="ruleForm.type"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="建设性质:"
          prop="nature"
        >
          <el-select
            v-model="ruleForm.nature"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in nature"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所在港口名称:"
          prop="portName"
        >
          <el-input v-model.trim="ruleForm.portName" />
        </el-form-item>
        <el-form-item
          label="工程地址:"
          prop="address"
        >
          <el-input v-model.trim="ruleForm.address" />
        </el-form-item>
        <el-form-item
          label="项目级别:"
          prop="projectLevel"
        >
          <el-select
            v-model="ruleForm.projectLevel"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in projectLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="投资来源:"
          prop="investmentSource"
        >
          <el-select
            v-model="ruleForm.investmentSource"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in investmentSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="立项部门级别:"
          prop="departmentLevel"
        >
          <el-select
            v-model="ruleForm.departmentLevel"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in departmentLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="计划总投资:"
          prop="totalPlannedInvestment"
        >
          <el-input-number
            v-model="ruleForm.totalPlannedInvestment"
            :precision="2"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="计划总工期:"
          prop="planTotalDate"
        >
          <el-input-number
            v-model="ruleForm.planTotalDate"
            :precision="2"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="计划开工年月:"
          prop="planStartDate"
        >
          <el-date-picker
            v-model="ruleForm.planStartDate"
            type="date"
            format="yyyy-MM"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="计划完工年月:"
          prop="planEndDate"
        >
          <el-date-picker
            v-model="ruleForm.planEndDate"
            type="date"
            format="yyyy-MM"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="实际开工年月:"
          prop="actualStartDate"
        >
          <el-date-picker
            v-model="ruleForm.actualStartDate"
            type="date"
            format="yyyy-MM"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="实际完工年月:"
          prop="actualEndDate"
        >
          <el-date-picker
            v-model="ruleForm.actualEndDate"
            type="date"
            format="yyyy-MM"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="装卸/储存主要危险货物品名:"
          prop="mainArticleName"
        >
          <el-input v-model.trim="ruleForm.mainArticleName" />
        </el-form-item>
        <el-form-item
          label="建设项目概况:"
          prop="generalSituation"
        >
          <el-input v-model.trim="ruleForm.generalSituation" />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/port-services/construction-dangerous-goods/construction-project'
import { constructionProject } from '@/utils/public-fields'
export default {
  mixins: [constructionProject],
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const { id } = this.$route.query
    this.fetchData(id)
  },
  methods: {
    // 查询详情
    async fetchData(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = { ...res.data }
      })
    },
    returnBack() {
      this.$router.push({ path: '/enterprise/goods/basic' })
    }
  }
}
</script>

