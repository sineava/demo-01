<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="tabType === 'add' ? '新增建设项目信息' : tabType === 'detail' ? '建设项目信息详情页' : '编辑建设项目信息'" />
      </span>
    </div>
    <div class="basic-detail add-form-vue">
      <el-form
        ref="enForm"
        :model="enForm"
        label-position="top"
        size="medium"
        :hide-required-asterisk="tabType === 'detail'"
        :disabled="tabType === 'detail'"
        :rules="enFormRules"
      >
        <div class="icon-title">
          <span class="span" />建设项目建设单位基本情况信息
        </div>
        <el-descriptions
            :class="enForm.enterpriseId ? 'descriptions' : 'descriptions-one'"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="business-title"
            contentClassName="business-text"
            border
          >
          <el-descriptions-item :span="3">
            <template slot="label"><i class="required" />建设单位名称:</template>
            <el-form-item prop="enterpriseId">
              <el-select
                v-model="enForm.enterpriseId"
                clearable
                placeholder="请选择建设单位名称"
                style="width: 100%;"
                filterable
                :remote-method="fetchRemote"
                @change="handleChange"
              >
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.value"
                  :label="item.enterpriseName"
                  :value="item.enterpriseId"
                />
              </el-select>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="统一社会信用代码：">{{enForm.certificateNo}}</el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="单位地址：">{{enForm.officeAddress}}</el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="法定代表人：">{{enForm.legalPersonName}}</el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="联系人：">{{enForm.contactName}}</el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="联系电话：">{{enForm.contactPhone}}</el-descriptions-item>
          <el-descriptions-item v-if="enForm.enterpriseId" label="电子邮箱：">{{enForm.email}}</el-descriptions-item>
        </el-descriptions>
      </el-form>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-position="top"
        size="medium"
        :hide-required-asterisk="tabType === 'detail'"
        :disabled="tabType === 'detail'"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <div class="icon-title">
              <span class="span" />建设项目基本信息
            </div>
          </el-form-item>
          <el-col :span="8">
            <el-form-item
              label="邮政编码:"
              prop="postalCode"
            >
              <el-input
                v-model="ruleForm.postalCode"
                :disabled="type === 'detail'"
                maxlength="6"
                placeholder="请输入邮政编码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目名称:"
              prop="projectName"
            >
              <el-input
                v-model="ruleForm.projectName"
                :disabled="type === 'detail'"
                maxlength="100"
                placeholder="请输入项目名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="建设类别:"
              prop="type"
            >
              <el-select
                v-model="ruleForm.type"
                clearable
                placeholder="请选择建设类别"
                style="width: 100%;"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="建设性质:"
              prop="nature"
            >
              <el-select
                v-model="ruleForm.nature"
                clearable
                placeholder="请选择建设性质"
                style="width: 100%;"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in nature"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="所在港口名称:"
              prop="portName"
            >
              <el-input
                v-model="ruleForm.portName"
                :disabled="type === 'detail'"
                maxlength="100"
                placeholder="请输入所在港口名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="工程地址:"
              prop="address"
            >
              <el-input
                v-model="ruleForm.address"
                :disabled="type === 'detail'"
                maxlength="100"
                placeholder="请输入工程地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目级别:"
              prop="projectLevel"
            >
              <el-select
                v-model="ruleForm.projectLevel"
                clearable
                placeholder="请选择项目级别"
                style="width: 100%;"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in projectLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="投资来源:"
              prop="investmentSource"
            >
              <el-select
                v-model="ruleForm.investmentSource"
                clearable
                placeholder="请选择投资来源"
                style="width: 100%;"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in investmentSource"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="立项部门级别:"
              prop="departmentLevel"
            >
              <el-select
                v-model="ruleForm.departmentLevel"
                clearable
                placeholder="请选择立项部门级别"
                style="width: 100%;"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in departmentLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="计划总投资(万元):"
              prop="totalPlannedInvestment"
            >
              <el-input-number
                v-model="ruleForm.totalPlannedInvestment"
                :precision="2"
                :min="0"
                :max="99999999.99"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入计划总投资(万元)"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="计划总工期(月):"
              prop="planTotalDate"
            >
              <el-input-number
                v-model="ruleForm.planTotalDate"
                :min="0"
                :max="20000"
                :controls="false"
                placeholder="请输入计划总工期(月)"
                style="width: 100%;"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="计划开工年月:"
              prop="planStartDate"
            >
              <el-date-picker
                v-model="ruleForm.planStartDate"
                type="month"
                format="yyyy-MM"
                placeholder="选择计划开工年月"
                style="width: 100%;"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="计划完工年月:"
              prop="planEndDate"
            >
              <el-date-picker
                v-model="ruleForm.planEndDate"
                type="month"
                format="yyyy-MM"
                placeholder="选择计划完工年月"
                style="width: 100%;"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="实际开工年月:"
              prop="actualStartDate"
            >
              <el-date-picker
                v-model="ruleForm.actualStartDate"
                type="month"
                format="yyyy-MM"
                placeholder="选择实际开工年月"
                style="width: 100%;"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="实际完工年月:"
              prop="actualEndDate"
            >
              <el-date-picker
                v-model="ruleForm.actualEndDate"
                type="month"
                format="yyyy-MM"
                placeholder="选择实际完工年月"
                style="width: 100%;"
                :disabled="type === 'detail'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="装卸/储存主要危险货物品名:"
              prop="mainArticleName"
            >
              <el-input
                v-model="ruleForm.mainArticleName"
                :disabled="type === 'detail'"
                maxlength="200"
                type="textarea"
                rows="4"
                placeholder="请输入装卸/储存主要危险货物品名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="建设项目概况:"
              prop="generalSituation"
            >
              <el-input
                v-model="ruleForm.generalSituation"
                :disabled="type === 'detail'"
                maxlength="500"
                type="textarea"
                rows="4"
                placeholder="建设项目概况"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="tabType !== 'detail'"
        type="primary"
        size="medium"
        :loading="loading"
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
  </el-card>
</template>

<script>
import { getList } from '@/api/general-services/enterpriseInfo/external'
import { postal, telephone } from '@/utils/validate'
import { momentDate } from '@/utils/index'
import { getDetail, saveProject, updateProject } from '@/api/port-services/construction-dangerous-goods/construction-project'
import { constructionProject } from '@/utils/public-fields'
export default {
  mixins: [constructionProject],
  data() {
    return {
      tabType: '',
      ruleForm: {},
      loading:false,
      enForm: {},
      enterpriseList: [],
      enFormRules: {
        enterpriseId: [
          { required: true, message: '请选择企业', trigger: 'blur' }
        ],
        // certificateNo: [
        //   { required: true, message: '请输入证书编号', trigger: 'blur' }
        // ],
        // contactName: [
        //   { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        // ],
        // contactPhone: [
        //   { validator: telephone, trigger: 'blur' },
        //   { required: true, message: '请输入联系人电话', trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '请输入电子邮箱', trigger: 'blur' }
        // ],
        // legalPersonName: [
        //   { required: true, message: '请输入法定代表人', trigger: 'blur' }
        // ],
        // officeAddress: [
        //   { required: true, message: '请输入办公地址/住所', trigger: 'blur' }
        // ]
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择建设类别', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '请选择建设性质', trigger: 'blur' }
        ],
        portName: [
          { required: true, message: '请输入所在港口名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入工程地址', trigger: 'blur' }
        ],
        projectLevel: [
          { required: true, message: '请选择项目级别', trigger: 'blur' }
        ],
        investmentSource: [
          { required: true, message: '请选择投资来源', trigger: 'blur' }
        ],
        departmentLevel: [
          { required: true, message: '请选择立项部门级别', trigger: 'blur' }
        ],
        totalPlannedInvestment: [
          { required: true, message: '请输入计划总投资金额', trigger: 'blur' }
        ],
        planTotalDate: [
          { required: true, message: '请输入计划总工期', trigger: 'blur' }
        ],
        planStartDate: [
          { required: true, message: '请选择计划开工年月', trigger: 'blur' }
        ],
        planEndDate: [
          { required: true, message: '请选择计划完工年月', trigger: 'blur' }
        ],
        actualStartDate: [
          { required: true, message: '请选择计实际开工年月', trigger: 'blur' }
        ],
        actualEndDate: [
          { required: true, message: '请选择实际完工年月', trigger: 'blur' }
        ],
        mainArticleName: [
          { required: true, message: '请输入装卸/储存主要危险货物品名', trigger: 'blur' }
        ],
        generalSituation: [
          { required: true, message: '请输入建设项目概况', trigger: 'blur' }
        ],
        postalCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { validator: postal, trigger: 'blur' }
        ]
      },
      types: [
        { value: 1, label: '港口' },
        { value: 2, label: '航道' },
        { value: 3, label: '防波堤' },
        { value: 4, label: '码头' },
        { value: 5, label: '其他' }
      ]
    }
  },
  created() {
    // 查询企业列表
    this.fetchEnterprise('')
    const id = this.$route.query.id
    this.tabType = this.$route.query.type
    if (!id) { // 新增
      this.ruleForm = {
        actualEndDate: '',
        actualStartDate: '',
        address: '',
        departmentLevel: '',
        generalSituation: '',
        investmentSource: '',
        mainArticleName: '',
        nature: '',
        planEndDate: '',
        planStartDate: '',
        planTotalDate: undefined,
        portName: '',
        projectLevel: '',
        projectName: '',
        totalPlannedInvestment: undefined,
        type: ''
      }
      this.enForm = {
        enterpriseId: '',
        certificateNo: '',
        officeAddress: '',
        legalPersonName: '',
        contactName: '',
        contactPhone: '',
        email: ''
      }
    } else { // 详情
      this.fetchData(id)
    }
  },
  methods: {
    // 查询企业列表
    async fetchEnterprise(enterpriseName) {
      // 查询所有
      getList({ enterpriseName }).then(res => {
        this.enterpriseList = res.data ? res.data : []
      })
    },
    // 查询详情
    async fetchData(id) {
      getDetail({ id }).then(res => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.enForm = { ...res.data }
            this.ruleForm = { ...res.data }
          }, 1000)
        })
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.saveData()
          this.loading = false
        } else {
          return false
        }
      })
    },
    // 新增
    async saveData() {
      const {
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate
      } = this.ruleForm
      const constructionProjectInfoDto = {
        ...this.enForm,
        ...this.ruleForm,
        actualEndDate: momentDate(actualEndDate, 'YYYY-MM-DD'),
        actualStartDate: momentDate(actualStartDate, 'YYYY-MM-DD'),
        planEndDate: momentDate(planEndDate, 'YYYY-MM-DD'),
        planStartDate: momentDate(planStartDate, 'YYYY-MM-DD')
      }
      const res = this.ruleForm.id ? await updateProject(constructionProjectInfoDto) : await saveProject(constructionProjectInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/build' })
    },
    // 下拉框改变
    handleChange(val) {
      if (!val) {
        this.enForm = {
          enterpriseId: '',
          certificateNo: '',
          officeAddress: '',
          legalPersonName: '',
          contactName: '',
          contactPhone: '',
          email: ''
        }
      }
      if (val) {
        const formData = this.enterpriseList.filter(en => en.enterpriseId === val)[0]
        this.enForm = {
          enterpriseId: this.enForm.enterpriseId,
          ...formData
        }
      }
    },
    // 远程搜索
    fetchRemote(val) {
      this.fetchEnterprise(val || '')
    }
  }
}
</script>
<style lang="scss" scoped>
.add-form-vue {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }
    .descriptions {
        margin-bottom: 20px;
        /deep/ .el-form-item {
            margin-bottom: 0;
        }
        /deep/ .business-title {
            width: 10%;
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
    .descriptions-one{
        margin-bottom: 20px;
        /deep/ .el-form-item {
            margin-bottom: 0;
        }
        /deep/ .business-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            width: 90%;
            line-height: 30px;
        }
    }
    /deep/ .el-input-number .el-input__inner {
        text-align: left;
    }
}
</style>
