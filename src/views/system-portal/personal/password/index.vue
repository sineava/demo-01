<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="dataForm"
  >
    <el-row>
      <h3 class="form-title">
        修改密码
      </h3>
      <el-col :span="12">
        <el-form-item
          label="原密码："
          prop="ypassword"
        >
          <el-input
            v-model.trim="ruleForm.ypassword"
            type="password"
            placeholder="输入原密码"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="新密码："
          prop="password"
        >
          <el-input
            v-model.trim="ruleForm.password"
            type="password"
            placeholder="输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认新密码："
          prop="npassword"
        >
          <el-input
            v-model.trim="ruleForm.npassword"
            type="password"
            placeholder="输入确认新密码"
            show-password
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        确认修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { modifyPwd } from '@/api/user'
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        ypassword: '',
        password: '',
        npassword: ''
      },
      rules: {
        ypassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        npassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        if (this.ruleForm.ypassword === this.ruleForm.password) {
          this.$message.warning('新密码与旧密码相同,请重新输入')
          return false
        }
        this.updatePsd()
      })
    },
    // 更新密码
    async updatePsd() {
      const { ypassword, npassword } = this.ruleForm
      this.loading = true
      const res = await modifyPwd({
        loginAccount: this.$store.state.user.userAccount,
        oldPwd: ypassword,
        newPwd: npassword,
        tokenStr: this.$store.state.user.tokenStr
      })
      this.loading = false
      if (res.code === '0') this.$message.success('密码修改成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.dataForm {
    padding-left: 50px;

    .form-title {
        margin: 36px 0 18px 0;
        font-size: 16px;
        font-weight: 600;
        color: #5b5b5b;
    }

    /deep/ .el-form-item__label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
    }

    /deep/ .el-button--primary {
        width: 150px;
        height: 42px;
    }
}
</style>
