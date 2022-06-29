<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 锚地
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="200px"
      :model="ruleForm"
      :rules="rules"
      :disabled="isEdit?false:true"
      class="table-column two"
    >
      <el-form-item
        label="锚地名称:"
        prop="name"
      >
        <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入锚地名称" />
      </el-form-item>
      <el-form-item
        label="锚地水深:"
        prop="anchorageDepth"
      >
        <el-input-number
          v-model="ruleForm.anchorageDepth"
          :precision="2"
          :min="0"
          :max="999999"
          placeholder="请输入锚地水深"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="锚地容量（锚位数）:"
        prop="anchorageNum"
      >
        <el-input-number
          v-model="ruleForm.anchorageNum"
          :precision="2"
          :min="0"
          :max="999999"
          placeholder="请输入锚地容量（锚位数）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="锚地面积（万平方米）:"
        prop="anchorageArea"
      >
        <el-input-number
          v-model="ruleForm.anchorageArea"
          :precision="2"
          :min="0"
          :max="999999999"
          placeholder="请输入锚地面积（万平方米）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="系船浮筒个数:"
        prop="pontoonsNum"
      >
        <el-input-number
          v-model="ruleForm.pontoonsNum"
          :precision="2"
          :min="0"
          :max="9999999"
          placeholder="请输入系船浮筒个数"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="锚泊能力（万吨级）:"
        prop="anchorageCapacity"
      >
        <el-input-number
          v-model="ruleForm.anchorageCapacity"
          :precision="2"
          :min="0"
          :max="9999999"
          placeholder="请输入锚泊能力（万吨级）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="锚地地质:"
        prop="anchorageGeology"
      >
        <el-input v-model.trim="ruleForm.anchorageGeology" placeholder="请输入锚地地质" />
      </el-form-item>
      <el-form-item
        label="设计水深（米）:"
        prop="designWaterDepth"
      >
        <el-input-number
          v-model="ruleForm.designWaterDepth"
          :precision="2"
          :min="0"
          :max="9999999"
          placeholder="请输入设计水深（米）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="设计底标高（米）:"
        prop="designBottomElevation"
      >
        <el-input-number
          v-model="ruleForm.designBottomElevation"
          :precision="2"
          :min="0"
          :max="9999999"
          placeholder="请输入设计底标高（米）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="避风等级:"
        prop="shelterLevel"
      >
        <el-input v-model.trim="ruleForm.shelterLevel" maxlength="30" placeholder="请输入避风等级" />
      </el-form-item>
      <el-form-item
        label="所属单位:"
        prop="affiliatedUnit"
      >
        <el-input v-model.trim="ruleForm.affiliatedUnit" maxlength="20" placeholder="请输入所属单位" />
      </el-form-item>
      <el-form-item
        label="维护单位:"
        prop="maintenanceUnit"
      >
        <el-input v-model.trim="ruleForm.maintenanceUnit" maxlength="100" placeholder="请输入维护单位" />
      </el-form-item>
      <el-form-item
        label="锚地主要用途:"
        prop="purpose"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.purpose"
          type="textarea"
          maxlength="200"
          placeholder="请输入锚地主要用途"
          show-word-limit
          :rows="6"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, addData, updateData } from '@/api/data-management/overall-distribution/anchorage'
export default {
  data() {
    return {
      isEdit: false,
      ruleForm: {
        id: '',
        geographyInfos: []
      },
      rules: {
        name: [
          { required: true, message: '请输入锚地名称', trigger: 'blur' }
        ],
      },
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    if (this.$route.query.id) {
      this.ruleForm = (await getInfo(this.$route.query.id)).data
      this.$emit('initMap', this.ruleForm.geographyInfos)
    }
  },
  methods: {
    /**
     * 保存
     */
    saveData(geographyInfos) {
      this.ruleForm.geographyInfos = geographyInfos
      this.submitForm('ruleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.save()
      })
    },
    async save() {
      let data = { ...this.ruleForm }
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.$emit('back')
      }
    }
  }
}
</script>
