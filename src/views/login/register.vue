<template>
  <div class="register-container">
    <div class="head">
      <div class="head-title">
        <div class="logo">
          <el-image
            class="icon"
            :src="require('@/assets/logo.svg')"
            fit="cover"
          />
        </div>
        重庆市港航综合管理平台统一认证中心
      </div>
      <a
        href="/#/login"
        class="text"
      >登录</a>
    </div>
    <el-card class="body-card register-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>新用户注册<p class="supplement">本账号是您重庆市港航综合的网上通行证，请确保账号的唯一性及资料的准确性</p> </span>
      </div>
      <el-form
        ref="registerForm"
        :model="ruleForm"
        :rules="rules"
        label-width="110px"
        size="medium"
        class="register-form"
      >
        <el-form-item
          label="用户账号:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="登录密码:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="确认密码:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="用户姓名:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="身份证号:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.idCard" />
        </el-form-item>
        <el-form-item
          label="所属企业:"
          prop="job"
        >
          <el-select
            v-model="ruleForm.job"
            clearable
            placeholder="请选择所属企业"
          >
            <el-option
              v-for="item in job"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="职务:"
          prop="job"
        >
          <el-select
            v-model="ruleForm.job"
            clearable
            placeholder="请选择职务"
          >
            <el-option
              v-for="item in job"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="手机号:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="验证码:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label=" 短信验证码:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" />
        </el-form-item>
        <div class="tips">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
          </el-checkbox>
          <a href="#/userAgreement">《重庆市政务服务网统一认证中心注册协议》</a>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          style="margin: 60px 0 30px 0;"
          @click.native.prevent="handleLogin"
        >
          注册
        </el-button>
      </el-form>
    </el-card>
    <system-statement />
  </div>
</template>

<script>

import { identity } from '@/utils/validate'
import SystemStatement from '@/components/SystemStatement/index'
export default {
  name: 'Register',
  components: { SystemStatement },
  data() {
    return {
      ruleForm: {
        name: '',
        idCard: '',
        job: '',
        checked: false
      },
      loading: false,
      job: [
        {
          value: 1,
          label: '选项1'
        }, {
          value: 2,
          label: '选项2'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10个字符姓名', trigger: 'blur' }
        ],
        idCard: [
          { validator: identity, message: '请输入15/18位身份证号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
        //   this.loading = true
        } else {

          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-card {
    margin: 0 auto;
    width: 1520px;

    .el-card__header {
        display: flex;
        height: 80px;
        line-height: 20px;
        align-items: center;

        .supplement {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
        }
    }

    .register-form {
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-input--medium .el-input__inner, .el-button--primary {
            width: 400px;
        }
    }
}
</style>

<style lang="scss" scoped>
.register-container {
    .head {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        padding-right: 20px;
        height: 60px;
        align-items: center;
        justify-content: space-between;

        .head-title {
            display: flex;
            height: 60px;
            font-size: 20px;
            font-weight: bold;
            align-items: center;

            .logo {
                display: flex;
                margin-right: 20px;
                width: 100px;
                height: 60px;
                background-color: rgba(64, 158, 255, 1);
                align-items: center;
                justify-content: center;

                .icon {
                    width: 30px;
                    height: 30px;
                }
            }
        }

        .text {
            font-size: 14px;
            color: #409eff;
        }
    }

    .tips {
        display: flex;
        font-size: 14px;
        color: #409eff;
    }
}
</style>
