<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 回旋水域
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="140px"
      :model="ruleForm"
      :rules="rules"
      :disabled="isEdit?false:true"
      class="table-column two"
    >
      <el-form-item
        label="回旋水域名称:"
        prop="name"
      >
        <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入回旋水域名称" />
      </el-form-item>
      <el-form-item
        label="回旋圆直径(米):"
        prop="diameter"
      >
        <el-input-number
          v-model="ruleForm.diameter"
          :precision="2"
          :min="0"
          :max="9999999"
          placeholder="请输入回旋圆直径(米)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, addData, updateData } from '@/api/data-management/overall-distribution/whirling-waters'
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
          { required: true, message: '请输入回旋水域名称', trigger: 'blur' }
        ],
        diameter: [
          { required: true, message: '请输入请输入回旋圆直径(米)', trigger: 'blur' }
        ]
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
      this.ruleForm.geographyInfos = geographyInfos.map(x => ({
        ...x,
        latitude: x.latitude ? parseFloat(x.latitude) : null,
        longitude: x.longitude ? parseFloat(x.longitude) : null
      }))
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
