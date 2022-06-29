<!--
 * @Author: your name
 * @Date: 2021-04-20 10:44:39
 * @LastEditTime: 2021-04-20 10:44:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cocp-frontend-scaffold\src\views\login\forget.vue
-->
<template>
  <div class="forget-container">
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
    </div>
    <el-card class="body-card forget-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>忘记密码</span>
      </div>
      <div class="forget-wrapper">
        <el-steps
          :space="200"
          :active="current"
          finish-status="success"
          align-center
        >
          <el-step title="确认账号" />
          <el-step title="验证方式" />
          <el-step title="安全验证" />
          <el-step title="重置密码" />
          <el-step title="完成" />
        </el-steps>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          size="medium"
        >
          <template v-if="current === 0">
            <el-form-item
              label="用户账号:"
              prop="accountNum"
            >
              <el-input
                v-model="ruleForm.accountNum"
                placeholder="用户名/手机号码/身份证号/邮箱"
              />
            </el-form-item>
            <el-form-item
              label="校验码:"
              prop="checkCode"
            >
              <el-col :span="18">
                <el-input
                  v-model="ruleForm.checkCode"
                  placeholder="输入内容"
                />
              </el-col>
              <el-col
                :span="5"
                :offset="1"
              >
                <el-image />
              </el-col>
            </el-form-item>
          </template>
          <template v-if="current === 1">
            <p class="content">
              您正在为【<span class="account">{{ ruleForm.accountNum }}</span>】找回密码，请选择验证方式
            </p>
            <div class="find-wrapper">
              <Images
                ref="images"
                height="100px"
                fit="fill"
                :url="url"
              />
              <div class="center-wrapper">
                <h4>通过手机找回</h4>
                <p>如果您的手机155****1203还在正常使用请选择此方式</p>
              </div>
              <el-button
                class="btn"
                type="primary"
                size="medium"
              >
                手机找回
              </el-button>
            </div>
            <div class="find-wrapper">
              <Images
                ref="images"
                height="100px"
                fit="fill"
                :url="url"
              />
              <div class="center-wrapper">
                <h4>通过邮箱找回</h4>
                <p>如果您的邮箱1711****@163.com还在正常使用请选择此方式</p>
              </div>
              <el-button
                class="btn"
                type="primary"
                size="medium"
              >
                邮箱找回
              </el-button>
            </div>
            <div class="artificial">
              没有绑定手机号和邮箱？ <span style="font-size: 14px; color: #409eff;">通过人工找回>></span>
            </div>
          </template>
          <template v-if="current === 2">
            <p style="font-weight: bold; text-align: center; color: #f59a23;">
              您正在使用手机进行校验
            </p>
            <el-form-item
              label="手机号:"
              class="disable"
            >
              <el-input
                value="155****1234"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="校验码:"
              prop="code"
            >
              <el-col :span="18">
                <el-input v-model.trim="ruleForm.code" />
              </el-col>
              <el-col
                :span="5"
                :offset="1"
              >
                <el-image style="height: 36px;" />
              </el-col>
            </el-form-item>
            <el-form-item
              label="短信验证码:"
              prop="sms"
            >
              <el-col :span="18">
                <el-input v-model.trim="ruleForm.sms" />
              </el-col>
              <el-col
                :span="5"
                :offset="1"
              >
                <el-button
                  type="primary"
                  size="medium"
                >
                  获取验证码
                </el-button>
              </el-col>
            </el-form-item>
          </template>
          <template v-if="current === 3">
            <el-form-item
              label="登录密码:"
              prop="password"
            >
              <el-input
                v-model="ruleForm.password"
                show-password
                placeholder="输入8-20位,大写字母、小写字母、数字、特殊符号中至少三项"
                @change="validStrong"
              />
            </el-form-item>
            <el-form-item label="">
              <div class="level">
                <div :class="{ 'current-level': modes === 1 }">
                  低
                </div>
                <div :class="{ 'current-level': modes === 2 }">
                  中
                </div>
                <div :class="{ 'current-level': modes === 3 }">
                  较高
                </div>
                <div :class="{ 'current-level': modes === 4 }">
                  高
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="确认密码:"
              prop="passwordSure"
            >
              <el-input
                v-model="ruleForm.passwordSure"
                show-password
              />
            </el-form-item>
          </template>
          <template v-if="current === 4">
            <div class="remember">
              <em class="el-icon-success" />
              <span style="line-height: 24px; vertical-align: middle;">设置成功，请牢记您的登录密码!</span>
            </div>
            <div class="login">
              <a href="/">立即登录>></a>
            </div>
          </template>
        </el-form>
      </div>
      <div
        v-if="current !== 4"
        class="backstage-edit-btn"
      >
        <el-button
          type="primary"
          size="medium"
          @click="handleNext"
        >
          下一步
        </el-button>
      </div>
    </el-card>
    <system-statement />
  </div>
</template>

<script>
import { password, account } from '@/utils/validate'
import SystemStatement from '@/components/SystemStatement/index'
import Images from '@/components/images'
export default {

  components: { SystemStatement,Images },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.ruleForm.password !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      current: 0,
      modes: 0,
      ruleForm: {
        accountNum: '',
        checkCode: '',
        code: '',
        password: '',
        passwordSure: ''
      },
      rules: {
        accountNum: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { validator: account, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入校验码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入校验码', trigger: 'blur' }
        ],
        sms: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: password, trigger: 'blur' }
        ],
        passwordSure: [
          { required: true, message: '请再次输入登录密码', trigger: 'blur' },
          { validator: equalToPassword, trigger: 'blur' }
        ]
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleNext() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.current += 1
        } else {

          return false
        }
      })
    },
    validStrong(value) {
      let modes = 0
      if (!value) return modes
      if (/\d/.test(value)) modes++
      if (/[a-z]/.test(value)) modes++
      if (/[A-Z]/.test(value)) modes++
      if (/\W/.test(value)) modes++
      this.modes = modes
    }
  }
}
</script>

<style lang="scss" scoped>
.forget-card {
    margin: 0 auto;
    width: 1520px;

    .forget-wrapper {
        .el-steps {
            display: flex;
            margin-bottom: 40px;
            width: 100%;
            justify-content: center;

            & /deep/ .el-step__title {
                font-size: 14px;
            }
        }

        .el-form {
            margin: 0 auto;
            width: 50%;

            p.content {
                text-align: center;

                .account {
                    color: #f59a23;
                }
            }

            .center-wrapper {
                p {
                    font-size: 14px;
                }
            }

            .find-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .el-image {
                    width: 80px;
                    height: 80px;
                }

                .center-wrapper {
                    margin-left: 30px;
                    width: 70%;
                }

                .btn {
                    height: 36px;
                }
            }

            .artificial {
                margin: 20px 0 20px 110px;
            }

            .remember {
                display: flex;
                justify-content: center;
                align-items: center;

                .el-icon-success {
                    margin-right: 10px;
                    font-size: 24px;
                    color: #1afa29;
                }
            }

            .login {
                display: flex;
                margin: 20px 0;
                font-size: 14px;
                color: #409eff;
                justify-content: center;
            }
        }
    }

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
}

.forget-container {
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
}

.el-col {
    height: 36px;
}

.el-input.is-disabled /deep/ .el-input__inner {
    border: none;
}

.level {
    display: flex;
    width: 100%;

    div {
        display: flex;
        width: 25%;
        height: 20px;
        justify-content: center;
        align-items: center;

        &:nth-child(1) {
            background-color: #d9001b;
        }

        &:nth-child(2) {
            background-color: #d98200;
        }

        &:nth-child(3) {
            background-color: #02a7f0;
        }

        &:nth-child(4) {
            background-color: #95f204;
        }
    }
}

.current-level {
    position: relative;

    &::before {
        position: absolute;
        bottom: 25px;
        border-top: 5px solid #515151;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        width: 0;
        height: 0;
        content: '';
    }
}
</style>
