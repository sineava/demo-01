<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增大坝信息' : type === 'edit' ? '编辑大坝信息' : '大坝信息详情'" />
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
      >
        <el-form-item
          label="大坝名称:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            maxlength="100"
            placeholder="请输入大坝名称"
          />
        </el-form-item>
        <el-form-item
          label="大坝编码全称:"
          prop="coding"
        >
          <el-input
            v-model.trim="ruleForm.coding"
            maxlength="100"
            placeholder="请输入大坝编码全称"
          />
        </el-form-item>
        <el-form-item
          label="大江编码:"
          prop="greatRiverCoding"
        >
          <el-input
            v-model.trim="ruleForm.greatRiverCoding"
            maxlength="100"
            placeholder="请输入大江编码"
          />
        </el-form-item>
        <el-form-item
          label="大江名称:"
          prop="greatRiverName"
        >
          <el-input
            v-model.trim="ruleForm.greatRiverName"
            maxlength="100"
            placeholder="请输入大江名称"
          />
        </el-form-item>
        <el-form-item
          label="干流名称:"
          prop="mainStreamName"
        >
          <el-input
            v-model.trim="ruleForm.mainStreamName"
            maxlength="100"
            placeholder="请输入干流名称"
          />
        </el-form-item>
        <el-form-item
          label="干流编码:"
          prop="mainStreamCoding"
        >
          <el-input
            v-model.trim="ruleForm.mainStreamCoding"
            maxlength="100"
            placeholder="请输入干流编码"
          />
        </el-form-item>
        <el-form-item
          label="支流名称:"
          prop="tributaryName"
        >
          <el-input
            v-model.trim="ruleForm.tributaryName"
            maxlength="100"
            placeholder="请输入支流名称"
          />
        </el-form-item>
        <el-form-item
          label="支流编码:"
          prop="tributaryCoding"
        >
          <el-input
            v-model.trim="ruleForm.tributaryCoding"
            maxlength="100"
            placeholder="请输入支流编码"
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
        @click="loading || submitForm('ruleForm')"
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
import { saveInfo, updateInfo } from '@/api/channel-services/ship/dam'
export default {
  mixins: [timePeriod],
  data() {
    return {
      loading: false,
      ruleForm: {
        id: null,
        coding: '',
        greatRiverCoding: '',
        greatRiverName: '',
        mainStreamCoding: '',
        mainStreamName: '',
        name: '',
        tributaryCoding: '',
        tributaryName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入大坝名称', trigger: 'blur' }
        ],
        coding: [
          { required: true, message: '请输入大坝编码全称', trigger: 'blur' }
        ],
        greatRiverCoding: [
          { required: true, message: '请输入大江编码', trigger: 'blur' }
        ],
        greatRiverName: [
          { required: true, message: '请输入大江名称', trigger: 'blur' }
        ],
        mainStreamName: [
          { required: true, message: '请输入干流名称', trigger: 'blur' }
        ],
        mainStreamCoding: [
          { required: true, message: '请输入干流编码', trigger: 'blur' }
        ],
        tributaryName: [
          { required: true, message: '请输入支流名称', trigger: 'blur' }
        ],
        tributaryCoding: [
          { required: true, message: '请输入支流编码', trigger: 'blur'}
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
      const dto = {
        ...this.ruleForm
      }
      this.loading = true
      const res = dto.id ? await updateInfo(dto) : await saveInfo(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/ship/dam' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
    max-width: 600px;
}
</style>
