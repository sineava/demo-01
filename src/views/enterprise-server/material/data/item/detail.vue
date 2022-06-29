<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="检查项目详情" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="two-column-input-table"
        style="width: 80%;"
        disabled
      >
        <el-form-item
          label="检查项目:"
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
          label="检查项目需要:"
          prop="needed"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.needed"
            type="textarea"
            rows="5"
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
            rows="5"
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
            rows="5"
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
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
export default {
  data() {
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
      level: [
        { value: '1', label: '一般' },
        { value: '2', label: '重大' }
      ],
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
      this.detailName = item.name
      this.ruleForm = {
        id: item.id,
        name: item.name,
        riskLevel: String(item.riskLevel),
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
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>
