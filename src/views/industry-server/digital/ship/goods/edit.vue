<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增货物分类' : type === 'edit' ? '编辑货物分类' : '货物分类详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="140px"
        size="medium"
        class="table-column two"
        :disabled="type === 'detail'"
        style="width: 80%;"
      >
        <el-form-item
          label="货物分类名称:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            maxlength="100"
            placeholder="请输入货物分类名称"
          />
        </el-form-item>
        <el-form-item
          label="计量单位:"
          prop="unit"
        >
          <el-input
            v-model.trim="ruleForm.unit"
            maxlength="20"
            placeholder="请输入计量单位"
          />
        </el-form-item>
        <el-form-item
          label="是否易燃易爆:"
          prop="isInflammableExplosive"
        >
          <el-radio-group v-model="ruleForm.isInflammableExplosive">
            <el-radio :label="1">
              易燃易爆
            </el-radio>
            <el-radio :label="0">
              非易燃易爆
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="货物国内编号:"
          prop="domesticCode"
        >
          <el-input
            v-model.trim="ruleForm.domesticCode"
            maxlength="50"
            placeholder="请输入货物国内编号"
          />
        </el-form-item>
        <el-form-item
          label="父类货物编码:"
          prop="parentDomesticCode"
        >
          <el-input v-model.trim="ruleForm.parentDomesticCode" placeholder="请输入父类货物编码" />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="分类描述:"
          prop="remark"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入分类描述"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { timePeriod } from '@/utils/public-fields'
import { saveInfo, updateInfo } from '@/api/channel-services/ship/goods'
export default {
  mixins: [timePeriod],
  data() {
    return {
      loading: false,
      ruleForm: {
        domesticCode: '',
        id: null,
        isInflammableExplosive: '',
        name: '',
        parentDomesticCode: '',
        remark: '',
        unit: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入货物分类名称', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' }
        ],
        isInflammableExplosive: [
          { required: true, message: '请选择是否易燃易爆', trigger: 'blur' }
        ],
        domesticCode: [
          { required: true, message: '请输入货物国内编号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type, item } = this.$route.query
    this.type = type
    if (id) {
      this.ruleForm = { ...item }
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      this.loading = true
      const dto = { ...this.ruleForm }
      const res = this.ruleForm.id ? await updateInfo(dto) : await saveInfo(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/ship/goods' })
    }
  }
}
</script>
