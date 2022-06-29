<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="违规行为信息详情" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="two-column-input-table"
        disabled
      >
        <el-form-item
          label="违规行为名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="检查项目类别:"
          prop="categoryId"
        >
          <el-select
            v-model="ruleForm.categoryId"
            clearable
            placeholder="请选择"
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
            rows="5"
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
            rows="5"
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
            rows="5"
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
            rows="5"
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
import { nameExist, addViolation, updateViolation } from '@/api/general-services/safety-supervision-and-inspection/safetyViolation'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
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
      rules: {
        name: [
          { required: true, message: '请输入检查项目', trigger: 'blur' },
          { trigger: 'blur', validator: nameExistFun }
        ],
        categoryId: [
          { required: true, message: '请选择检查项目类别', trigger: 'change' }
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
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
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
      const res = this.ruleForm.id ? await updateViolation(data) : await addViolation(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    getLegislation(item) {
      this.ruleForm.legislationId = item.id
      this.legislation = item
      this.dialogVisible = false
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
