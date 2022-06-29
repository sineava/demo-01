<template>
  <div class="login-container">
    <div class="login-head">
      <div class="head-title">
        重庆市港口综合管理系统
      </div>
      <div class="head-desc">
        CHONGQING PORT INTEGRATED MANAGEMENT SYSTEM
      </div>
    </div>
    <div class="login-frame">
      <img
        class="login-banner"
        src="@/assets/loginBanner.png"
      >
      <el-form
        ref="loginForm"
        class="login-form"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
        label-position="left"
      >
        <div class="form-title">
          用户登录
          <span class="title-en">USER LOGIN</span>
        </div>
        <el-form-item prop="username">
          <img
            class="form-icon"
            src="../../assets/login-icon1.png"
          >
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名/手机号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="new-password"
            clearable
            @focus="inputACtive = 1"
            @blur="inputACtive = -1"
          />
        </el-form-item>

        <el-form-item prop="password">
          <img
            class="form-icon"
            src="../../assets/login-icon2.png"
          >
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入登录密码"
            name="password"
            tabindex="2"
            autocomplete="new-password"
            clearable
            @focus="inputACtive = 2"
            @blur="inputACtive = -1"
          />
        </el-form-item>
        <div class="code-container">
          <el-form-item prop="verificationCode">
            <img
              class="form-icon"
              src="../../assets/login-icon3.png"
            >
            <el-input
              ref="verificationCode"
              v-model="loginForm.verificationCode"
              placeholder="请输入右侧校验码"
              name="verificationCode"
              type="text"
              tabindex="3"
              autocomplete="new-password"
              clearable
              @focus="inputACtive = 3"
              @blur="inputACtive = -1"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <div class="code-border">
            <div
              v-if="loginType === 1"
              class="code-img-container"
            >
              <valid-code
                :value="validCode"
                class="code-img"
              />
            </div>
            <el-button
              v-else
              type="primary"
              class="code-button"
            >
              获取验证码
            </el-button>
          </div>
        </div>

        <div class="tips">
          <el-checkbox v-model="loginForm.checked">
            记住密码
          </el-checkbox>
          <el-tooltip
            class="item"
            effect="dark"
            placement="top"
          >
            <div slot="content">
              请联系客服重置登录密码<br>电话：400-888-8888
            </div>
            <!-- <a href="/#/forget" class="tips-span">忘记密码?</a> -->
          </el-tooltip>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          style="margin-bottom: 20px; width: 100%;"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
        <!-- <div class="other-login">
          <a @click="loginTypeChange">{{ loginType === 1 ? '验证码登录' : '密码登录' }} </a>
          <a href="/#/register">注册新用户</a>
        </div> -->
      </el-form>
    </div>
    <div class="login-bottom">
      Copyright © 重庆港航海事事务中心, All Rights Reserved.版权所有
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import ValidCode from '@/components/ValidCode/index.vue'
import { getToken } from '@/utils/auth'
export default {
  name: 'Login',
  components: {
    ValidCode
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      if (!value) {
        callback(new Error('请输入用户名称'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入登录密码'))
      } else {
        callback()
      }
    }
    /*
     * const validateVerificationCode = (rule, value, callback) => {
     *   if (value !== this.validCode) {
     *     callback(new Error('校验码输入错误'))
     *   } else {
     *     callback()
     *   }
     * }
     */
    return {
      loginForm: {
        username: '',
        password: '',
        verificationCode: '',
        checked: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        /*
         * 先注释
         * verificationCode: [{ required: true, trigger: 'blur', validator: validateVerificationCode }]
         */
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      inputACtive: '-1',
      loginType: 1,
      validCode: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    if (getToken('userInfo')) {
      this.loginForm = JSON.parse(getToken('userInfo'))
    }
  },
  methods: {
    loginTypeChange() {
      this.loginType = this.loginType === 1 ? 2 : 1
    },
    /**
     * 登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            if (res.code === '0') {
              const { data } = res
              this.$router.push({ path: `/?userAccount=${this.loginForm.username}&tokenStr=${data.token}&systemCode=ghnwmh` })
            } else {
              this.$message.error(res.message)
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#333333;
$cursor: #222222;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        height: 48px;

        input {
            border: 0;
            border-radius: 0;
            padding: 0 5px;
            height: 48px;
            color: $light_gray;
            background: transparent;
            -webkit-appearance: none;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0 1000px #ffffff inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        margin-bottom: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        color: #333333;
        background: #ffffff;

        &:hover {
            border-color: #409eff;
        }
    }

    .el-form-item__content {
        display: flex;
        align-items: center;
    }

    .code-container {
        .el-form-item__content {
            width: 271px;
        }
    }
}
</style>

<style lang="scss" scoped>
$bg:#ffffff;

.login-container {
    display: flex;
    overflow: hidden;
    padding: 148px 0 52px 0;
    width: 100%;
    min-width: 1060px;
    min-height: 100%;
    background-color: $bg;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .login-head {
        text-align: center;

        .head-title {
            font-size: 42px;
            font-weight: 800;
            line-height: 42px;
            color: #243541;
        }

        .head-desc {
            margin-top: 10px;
            font-size: 14px;
            letter-spacing: 1.6px;
            color: #bcbcbc;
        }
    }

    .login-frame {
        display: flex;
        overflow: hidden;
        position: relative;
        border-radius: 20px;
        width: 1060px;
        height: 547px;
        background: #ffffff;
        box-shadow: 0 11px 32px 0 rgba(79, 135, 181, 0.2);

        .login-banner {
            margin: 47px 54px 0 108px;
            width: 454px;
            height: 470px;
        }

        .login-form {
            width: 380px;

            .form-title {
                margin: 77px 0 36px 0;
                font-size: 20px;
                font-weight: bold;
                color: #5b5b5b;

                .title-en {
                    font-size: 14px;
                    font-weight: 400;
                    color: #8c8c8c;
                }
            }

            .form-icon {
                margin: 0 13px;
                height: 21px;
            }
        }

        .code-container {
            display: flex;
            justify-content: space-between;

            .code-border {
                width: 100px;
                height: 48px;

                .code-img-container {
                    display: flex;
                    border: 1px solid rgba(228, 228, 228, 1);
                    border-radius: 5px;
                    width: 100%;
                    height: 100%;
                    background-color: $bg;
                    align-items: center;
                    justify-content: center;

                    .code-img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .code-button {
                    padding: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .tips {
            display: flex;
            margin: 0 0 20px 0;
            font-size: 14px;
            align-items: center;
            justify-content: space-between;

            .tips-span {
                color: #409eff;
            }
        }

        .other-login {
            display: flex;
            font-size: 14px;
            color: #409eff;
            align-items: center;
            justify-content: space-between;
        }
    }

    .login-bottom {
        width: 325px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #c5c5c5;
    }
}
</style>
