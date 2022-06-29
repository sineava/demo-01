<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 港口信息
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="200px"
      :model="ruleForm"
      :rules="rules"
      :disabled="isEdit?false:true"
    >
      <el-form-item
        label="港口名称:"
        class="top-form-item"
        prop="portName"
      >
        <el-input v-model.trim="ruleForm.portName" maxlength="100" placeholder="请输入港口名称" />
      </el-form-item>
      <el-form-item
        label="概述:"
        class="top-form-item"
        prop="summary"
      >
        <el-input
          v-model="ruleForm.summary"
          type="textarea"
          :rows="6"
          maxlength="200"
          show-word-limit
          placeholder="请输入概述"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, addData, updateData } from '@/api/data-management/overall-distribution/port'
export default {
  data() {
    return {
      isEdit: false,
      ruleForm: {
        id: '',
        coordinatesInfos: []
      },
      rules: {
        portName: [
          { required: true, message: '请输入港口名称', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入概述', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    if (this.$route.query.id) {
      this.ruleForm = (await getInfo(this.$route.query.id)).data
      this.$emit('initMap', this.ruleForm.coordinatesInfos)
    }
  },
  methods: {
    /**
     * 保存
     */
    saveData(geographyInfos) {
      geographyInfos.forEach((element,index) => {
        element.pointer = index
        delete element.sort
      })
      this.ruleForm.coordinatesInfos = geographyInfos
      this.submitForm('ruleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
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
