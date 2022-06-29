<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="ruleForm.id ? (isDisabled ? '检查项类别详情' : '编辑检查项类别') : '新增检查项类别'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-descriptions
        v-if="isDisabled"
        class="descriptions"
        :column="1"
        :colon="true"
        size="medium"
        :labelStyle="{width: '10%'}"
        border
      >
        <el-descriptions-item label="类别名称">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="类别描述">
          {{ ruleForm.explanation }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        v-else
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        :rules="rules"
        :disabled="isDisabled ? true : false"
      >
        <el-form-item
          label="类别名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" maxlength="30" placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item
          label="类别描述:"
          prop="explanation"
        >
          <el-input
            v-model.trim="ruleForm.explanation"
            type="textarea"
            rows="7"
            style="width: 100%;"
            maxlength="200"
            placeholder="请输入类别描述"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
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
import { nameExist, addCategory, updateCategory } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
export default {
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
      ruleForm: {
        id: '',
        name: '',
        explanation: '',
        type: '1'

      },
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { trigger: 'blur', validator: nameExistFun }
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        explanation: [
          { required: true, message: '请输入类别描述', trigger: 'blur' }
        ]
      },
      isDisabled: false
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.item && this.$route.query.item.id) {
      this.isDisabled = this.$route.query.disabled
      const item = this.$route.query.item
      this.detailName = item.name
      this.ruleForm = {
        id: item.id,
        name: item.name,
        explanation: item.explanation,
        type: String(item.type)
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
      const res = this.ruleForm.id ? await updateCategory(data) : await addCategory(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
