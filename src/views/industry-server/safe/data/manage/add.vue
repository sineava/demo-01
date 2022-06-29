<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="ruleForm.id ? (isDisabled ? '检查项详情' : '编辑检查项') : '新增检查项'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        size="medium"
        class="two-column-input-table"
        :rules="rules"
        :disabled="!!isDisabled"
      >
        <el-form-item
          label="检查项目:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" placeholder="请输入检查项目" maxlength="30" />
        </el-form-item>
        <el-form-item
          label="检查项目类别:"
          prop="categoryId"
        >
          <el-select
            v-model="ruleForm.categoryId"
            clearable
            placeholder="请选择检查项目类别"
            style="width: 100%;"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="检查项目需要:"
          prop="needed"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.needed"
            type="textarea"
            rows="7"
            maxlength="200"
            placeholder="请输入检查项目需要"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="检查方法:"
          prop="mode"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.mode"
            type="textarea"
            rows="7"
            maxlength="200"
            placeholder="请输入检查方法"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="检查依据:"
          prop="basis"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.basis"
            type="textarea"
            rows="7"
            maxlength="200"
            placeholder="请输入检查依据"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="检查内容:"
          prop="content"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.content"
            type="textarea"
            rows="7"
            maxlength="200"
            placeholder="请输入检查内容"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="关联法律法规:">
          <el-button
            type="primary"
            size="medium"
            @click="dialogVisible = true"
          >
            选择关联
          </el-button>
        </el-form-item>
        <div v-if="ruleForm.legislationId && legislation.fileName" style="margin-left: 140px; width: 100%;"><span style="font-weight: bolder; color: #409eff;">已关联：</span>{{ legislation.fileName }}</div>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="法律法规"
      width="80%"
    >
      <laws-and-regulations @getLegislation="getLegislation" />
    </el-dialog>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        v-if="!isDisabled"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { nameExist, addItem, updateItem } from '@/api/general-services/safety-supervision-and-inspection/safetyItem'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import LawsAndRegulations from './components/LawsAndRegulations'
export default {
  components: {
    LawsAndRegulations
  },
  data() {
    const nameExistFun = async(rule, value, callback) => {
      const res = await nameExist(value)
      if (res.data && this.detailName !== value) {
        callback(new Error('检查项目名称重复'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      legislation: {},
      detailName: '',
      ruleForm: {
        id: '',
        name: '',
        riskLevel: '',
        categoryId: '',
        needed: '',
        mode: '',
        basis: '',
        content: '',
        legislationId: ''
      },
      categoryList: [],
      loading: false,
      level: [
        { value: '1', label: '一般' },
        { value: '2', label: '重大' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入检查项目', trigger: 'blur' },
          { trigger: 'blur', validator: nameExistFun }
        ],
        categoryId: [
          { required: true, message: '请选择检查项目类别', trigger: 'change' }
        ],
        riskLevel: [
          { required: true, message: '请选择危险等级', trigger: 'change' }
        ],
        needed: [
          { required: true, message: '请输入检查项目需要内容', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请输入检查方法', trigger: 'blur' }
        ],
        basis: [
          { required: true, message: '请输入检查依据', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入检查内容', trigger: 'blur' }
        ]
      },
      isDisabled: false
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    this.legislation.fileName = ''
    if (this.$route.query && this.$route.query.item && this.$route.query.item.id) {
      this.isDisabled = this.$route.query.disabled
      const item = this.$route.query.item
      this.legislation.fileName = item.legislationName
      this.detailName = item.name
      this.ruleForm = {
        id: item.id,
        name: item.name,
        // riskLevel: String(item.riskLevel),
        categoryId: item.categoryId,
        needed: item.needed,
        mode: item.mode,
        basis: item.basis,
        content: item.content,
        legislationId: item.legislationId
      }
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    async saveSubmit() {
      const data = { ...this.ruleForm }
      this.loading = true
      data.riskLevel = 1
      const res = this.ruleForm.id ? await updateItem(data) : await addItem(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    getLegislation(item) {
      this.ruleForm.legislationId = item.id
      this.legislation = item
      this.dialogVisible = false
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/data/manage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;
        }
    }
}
</style>
