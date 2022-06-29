<template>
  <div class="detail-wrapper">
    <el-card class="body-card">
      <div
        slot="header"
        class="clearfix"
      >
        <em
          class="el-icon-back icon-back"
          @click="returnBack"
        /><span>危险品详情-柴油</span>
      </div>
      <div class="basic-detail">
        <el-form
          ref="ruleForm"
          label-width="180px"
          size="medium"
          hide-required-asterisk
          class="one-column-input-table"
        >
          <el-form-item label="联合国编号（UN编号）:">
            <el-input
              v-model="ruleForm.unNumber"
              disabled
            />
          </el-form-item>
          <el-form-item label="名称/说明:">
            <el-input
              v-model="ruleForm.name"
              disabled
            />
          </el-form-item>
          <el-form-item label="英文名称:">
            <el-input
              v-model="ruleForm.ename"
              disabled
            />
          </el-form-item>
          <el-form-item label="类别/项别:">
            <el-input
              v-model="ruleForm.category"
              disabled
            />
          </el-form-item>
          <el-form-item label="次要危险性:">
            <el-input
              v-model="ruleForm.subRisk"
              disabled
            />
          </el-form-item>
          <el-form-item label="包装类别:">
            <el-input
              v-model="ruleForm.packagingCategory"
              disabled
            />
          </el-form-item>
          <el-form-item label="特殊规定:">
            <el-input
              v-model="ruleForm.stipulate"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              disabled
            />
          </el-form-item>
          <el-form-item label="更新时间:">
            <el-input
              v-model="ruleForm.updateTime"
              disabled
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        unNumber: '',
        name: '',
        ename: '',
        category: '',
        subRisk: '',
        packagingCategory: '',
        stipulate: ''
      }
    }
  },
  created() {
    if (this.$route.query) {
      const {
        unNumber,
        name,
        ename,
        category,
        subRisk,
        packagingCategory,
        stipulate,
        updateTime
      } = this.$route.query.item
      this.ruleForm = {
        unNumber,
        name,
        ename,
        category,
        subRisk,
        packagingCategory,
        stipulate,
        updateTime
      }
    }
  }
}
</script>
