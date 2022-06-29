<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 铁路
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
        label="铁路名称:"
        prop="name"
      >
        <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入铁路名称" />
      </el-form-item>
      <el-form-item
        label="起止点:"
        prop="startingEndingPoint"
      >
        <el-input v-model.trim="ruleForm.startingEndingPoint" maxlength="50" placeholder="请输入起止点" />
      </el-form-item>
      <el-form-item
        label="总里程（米）:"
        prop="totalMileage"
      >
        <el-input-number
          v-model="ruleForm.totalMileage"
          :precision="2"
          :min="0"
          :max="9999999"
          style="width: 100%;"
          placeholder="请输入总里程（米）"
        />
      </el-form-item>
      <el-form-item
        label="通行方向:"
        prop="trafficDirection"
      >
        <el-input v-model.trim="ruleForm.trafficDirection" maxlength="50" placeholder="请输入通行方向" />
      </el-form-item>
      <el-form-item
        label="限速限高（具体位置或线段）:"
        prop="speedLimit"
      >
        <el-input v-model.trim="ruleForm.speedLimit" maxlength="100" placeholder="请输入限速限高（具体位置或线段）" />
      </el-form-item>
      <el-form-item
        label="限制货种:"
        prop="restrictedGoods"
      >
        <el-input v-model.trim="ruleForm.restrictedGoods" maxlength="50" placeholder="请输入限制货种" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, addData, updateData } from '@/api/data-management/overall-distribution/railway'
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
          { required: true, message: '请输入铁路名称', trigger: 'blur' }
        ],
        startingEndingPoint: [
          { required: true, message: '请输入起止点', trigger: 'blur' }
        ],
        totalMileage: [
          { required: true, message: '请输入总里程（米）', trigger: 'blur' }
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
