<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="100px"
    class="dataForm"
  >
    <el-row>
      <div class="form-title">
        基础信息
      </div>
      <el-col :span="12">
        <el-form-item
          label="登录账号："
          prop="loginaccount"
        >
          {{ userInfo.loginaccount }}
        </el-form-item>
        <el-form-item
          label="所属单位："
          prop="orgname"
        >
          {{ userInfo.orgname }}
        </el-form-item>
        <el-form-item
          label="职位："
          prop="position"
        >
          {{ getPosition(userInfo.login_OR) }}
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="username"
        >
          <el-input
            :value="userInfo.username"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="身份证号："
          prop="useridentity"
        >
          <el-input
            :value="userInfo.useridentity"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="手机号码："
          prop="mobliephone"
        >
          <el-input
            :value="userInfo.mobliephone"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="邮箱地址："
          prop="emall"
        >
          <el-input
            :value="userInfo.email"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="通讯地址："
          prop="address"
        >
          <el-input
            :value="userInfo.address"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="性别："
          prop="sex"
          class="form-sex"
        >
          <el-radio-group
            :value="userInfo.usersex"
            size="small"
          >
            <el-radio
              label="1"
              border
            >
              男性
            </el-radio>
            <el-radio
              label="2"
              border
            >
              女性
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label=""
          prop="head"
          style="margin: 0 0 0 8px;"
        >
          <span style="border-radius: 5px;">
            <Images
              ref="images"
              height="120px"
              width="120px"
              fit="contain"
              :url="head"
            />
          </span>
        </el-form-item>
        <el-form-item
          label=""
          prop="head"
        >
          <el-upload
            action="/upload/v1/open/file/upload"
            multiple
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <el-button
              class="edit-btn"
              size="mini"
            >
              <img src="../../../../assets/new-system/camera.png"> {{ loading ? '文件上传中...' : '修改头像' }}
            </el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <div class="form-title">
        更多信息
      </div>
      <el-col :span="12">
        <el-form-item
          label="籍贯："
          prop="nativePlace"
        >
          <el-input v-model.trim="ruleForm.nativePlace" placeholder="请输入籍贯" />
        </el-form-item>
        <el-form-item
          label="学历："
          prop="education"
        >
          <el-select
            v-model="ruleForm.education"
            style="width: 100%;"
            placeholder="请选择学历"
          >
            <el-option
              v-for="item in education"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="出生日期："
          prop="birthDate"
        >
          <el-date-picker
            v-model="ruleForm.birthDate"
            type="date"
            placeholder="请选择出生日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="专业："
          prop="major"
        >
          <el-input v-model.trim="ruleForm.major" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item
          label="毕业院校："
          prop="school"
        >
          <el-input v-model.trim="ruleForm.school" placeholder="请输入毕业院校" />
        </el-form-item>
        <el-form-item
          label="毕业时间："
          prop="graduationTime"
        >
          <el-date-picker
            v-model="ruleForm.graduationTime"
            type="date"
            placeholder="请选择毕业时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            v-model.trim="ruleForm.personalProfile"
            type="textarea"
            rows="5"
            show-word-limit
            maxlength="100"
            placeholder="请输入个人简介"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="submitForm('ruleForm')"
      >
        保存内容
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import { phone } from '@/utils/validate'
import { getUserOtherInfo, updateUserOtherInfo } from '@/api/system-portal/user-other-info'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      education: [
        {
          value: '1',
          label: '小学'
        },
        {
          value: '2',
          label: '初中'
        },
        {
          value: '3',
          label: '高中'
        },
        {
          value: '4',
          label: '中专'
        },
        {
          value: '5',
          label: '大专'
        },
        {
          value: '6',
          label: '本科'
        },
        {
          value: '7',
          label: '硕士'
        },
        {
          value: '8',
          label: '博士'
        }
      ],
      head: '',
      ruleForm: {},
      imgList: [],
      loading: false,
      btnLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
          { validator: phone, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.userInfo = { ...this.$store.state.user.user_info[0] }
    this.fetchDetail()
  },
  methods: {
    getPosition(position){
      let name = ''
      switch (position){
      case '1':
        name = '副局长'
        break
      case '2':
        name = '处长'
        break
      case '3':
        name = '副处长'
        break
      case '4':
        name = '科员'
        break
      default:
        name = '局长'
        break
      }
      return name
    },
    // 查询详情
    async fetchDetail() {
      const id = this.userInfo.userid
      getUserOtherInfo({ id }).then(res => {
        if (res.code === '0') {
          this.ruleForm = { ...res.data }
          this.head = (res.data&&res.data.headImg) || ''
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      const userOtherInfoDto = {
        ...this.ruleForm,
        birthDate: momentDate(this.ruleForm.birthDate, 'YYYY-MM-DD'),
        graduationTime: momentDate(this.ruleForm.graduationTime, 'YYYY-MM-DD'),
        headImg: this.head,
        userId: this.userInfo.userid
      }
      userOtherInfoDto.wxNumber = ''
      delete userOtherInfoDto.id
      this.btnLoading = true
      updateUserOtherInfo(userOtherInfoDto).then(res => {
        this.btnLoading = false
        if (res.code === '0') {
          this.$message.success('保存成功!')
          this.fetchDetail()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      const beyond = this.handleSize(file)
      if (!beyond) {
        this.loading = true
      } else {
        return false
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file) {
      this.loading = false
      this.head = response.data
    },
    // 文件上传失败时的钩子
    handleError(err) {
      this.loading = false
      this.$message.error(err)
    },
    // 文件超出个数限制时的钩子
    onExceed(files, fileList) {
      this.$message.error(`最多只能上传${this.limit}个文件，请删除后再上传`)
    },
    // 文件大小限制(单个不超过20M)
    handleSize(file) {
      if ((file.size / 1024 / 1024) > 20) {
        this.$message.warning('超出20M上传限制')
        this.action = ''
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.dataForm {
    .form-title {
        margin: 36px 0 18px 0;
        font-size: 16px;
        font-weight: 600;
        color: #5b5b5b;
    }

    .form-sex {
        margin: 0;

        /deep/ .el-radio__input {
            display: none;
        }

        /deep/ .el-radio--small {
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            width: 124px;
            height: 40px;
            font-size: 14x;
            line-height: 1.8;
            text-align: center;
            background: #ffffff;

            &.is-checked {
                border: 0;
                background-color: #3e95fc;

                .el-radio__label {
                    color: #ffffff;
                }
            }
        }
    }

    /deep/ .el-button--primary {
        width: 150px;
        height: 42px;
    }

    /deep/ .edit-btn {
        display: flex;
        border: 1px solid #bbbbbb;
        border-radius: 17px;
        width: 140px;
        height: 34px;
        background: rgba(0, 129, 255, 0);
        align-items: center;
        justify-content: center;

        span {
            display: flex;
            align-items: center;
        }

        img {
            margin: 0 5px 0 0;
            width: 16px;
            height: 14px;
        }
    }

    /deep/ .el-image__inner {
        border-radius: 10px;
    }
}
</style>
