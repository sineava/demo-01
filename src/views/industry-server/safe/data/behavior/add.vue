<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="ruleForm.id ? (isDisabled ? '违规行为详情' : '编辑违规行为') : '新增违规行为'" />
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
        :disabled="isDisabled ? true : false"
      >
        <el-form-item
          label="违规行为名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" placeholder="请输入违规行为名称" maxlength="30" />
        </el-form-item>
        <el-form-item
          label="违规行为类别:"
          prop="categoryId"
        >
          <el-select
            v-model="ruleForm.categoryId"
            clearable
            placeholder="请选择违规行为类别"
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
          label="违规行为描述:"
          prop="explanation"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.explanation"
            type="textarea"
            rows="7"
            placeholder="请输入违规行为描述"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="法律依据:"
          prop="legalBasis"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.legalBasis"
            type="textarea"
            rows="7"
            placeholder="请输入法律依据"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="管理依据:"
          prop="manageBasis"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.manageBasis"
            type="textarea"
            rows="7"
            placeholder="请输入管理依据"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="处罚依据:"
          prop="punishBasis"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.punishBasis"
            type="textarea"
            rows="7"
            placeholder="请输入处罚依据"
            maxlength="200"
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
          {{ ruleForm.legislationId ? `已关联${legislation.fileName}` : '' }}
        </el-form-item>
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
import { nameExist, addViolation, updateViolation } from '@/api/general-services/safety-supervision-and-inspection/safetyViolation'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import LawsAndRegulations from '../manage/components/LawsAndRegulations'
export default {
  components: {
    LawsAndRegulations
  },
  data() {
    const nameExistFun = async(rule, value, callback) => {
      const res = await nameExist(value)
      if (res.data && this.detailName !== value) {
        callback(new Error('违规行为名称重复'))
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
        categoryId: '',
        explanation: '',
        legalBasis: '',
        manageBasis: '',
        punishBasis: '',
        legislationId: ''
      },
      categoryList: [],
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入违规行为名称', trigger: 'blur' },
          { trigger: 'blur', validator: nameExistFun }
        ],
        categoryId: [
          { required: true, message: '请选择违规行为类别', trigger: 'change' }
        ]
      },
      isDisabled: false
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 2 })
    this.categoryList = res.data
    this.legislation.fileName = ''
    if (this.$route.query && this.$route.query.item && this.$route.query.item.id) {
      this.isDisabled = this.$route.query.disabled
      const item = this.$route.query.item
      this.detailName = item.name
      this.ruleForm = {
        id: item.id,
        name: item.name,
        categoryId: item.categoryId,
        explanation: item.explanation,
        legalBasis: item.legalBasis,
        manageBasis: item.manageBasis,
        punishBasis: item.punishBasis,
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
      const res = this.ruleForm.id ? await updateViolation(data) : await addViolation(data)
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
      this.$router.push({ path: '/safe/data/behavior' })
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
