<template>
  <div class="user-container">
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
    <el-card class="body-card user-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>注册协议</span>
      </div>
      <div class="content">
        一、【目的意义】
        <br>
        为保证网上政务服务用户信息的真实性、合法性和有效性，自然人、法人用户注册、验证应采用实名制。统一用户注册和验证是开展互联网+政务服务、建立行政机关和行政相对人线上服务法律关系的前提，是今后全国政务服务实现网上“一地注册，各地互认”的基础。在您成为“互联网+政务服务”实名注册用户（简称“注册用户”）之前，请确认您已充分阅读、理解并接受本协议的全部内容，同意遵循本协议之所有约定。
        <br>
        二、【协议适用主体范围】
        <br>
        政务服务门户的运营管理权归政务服务机构所有。本协议是您和**省（市）政务服务管理机构（简称“政务服务机构”），明确双方通过**省（市）政务服务门户和平台办理政务服务事项过程中的权利义务所订立的协议。订立本协议的用户，应当是具备完全民事权利能力和完全民事行为能力的自然人。
        <br>
        三、【服务内容】
        <br>
        注册用户能够访问互联网政务服务门户网站、检索静态信息、进行在线咨询、申办政务服务事项，可在专属用户空间查询所办事项的过程信息和历史信息，储存信息资料，并自行维护用户空间信息。
        <br>
        四、【用户承诺与授权】
        <br>
        用户在政务服务门户进行注册和使用本政务服务平台时承诺和确认：
        <br>
        （1）提供及时、详尽及准确的个人资料；
        <br>
        （2）运用本人手机号码、社保帐号、银行卡帐号、公积金帐号、驾照号码等个人信息进行实名验证；
        <br>
        （3）及时更新注册资料；
        <br>
        （4）同意接收来自政务服务机构推送的信息；
        <br>
        （5）在提请政务服务事项办理过程中，按服务内容要求提供真实、准确的要件材料，并及时对上传本平台的要件材料做好更新维护；
        <br>
        （6）自愿选择物流快递、网上支付等第三方服务时，及时提供真实姓名、联系地址、联系方式、账户等相关个人信息；
        <br>
        （7）不存放与政务服务申办无关的信息内容。
        <br>
        五、【用户信息保障】
        <br>
        政务服务机构依法保护个人隐私，不违法违规向与政务服务无关的第三方提供用户注册资料。
        <br>
        六、【用户的密码和安全性】
        <br>
        考虑到注册用户是特定的行政相对人，以其帐号操作的行为由注册用户承担相应法律责任。因此，注册用户应妥善保管密码，不得将帐号、密码提供给他人使用。建议定期修改密码，以确保帐号安全。
        <br>
        七、【禁止条款】
        <br>
        注册用户有违反法律法规行为的，政务服务机构有权终止为用户提供服务，并保留追责的权利。
        <br>
        八、【结束服务】
        <br>
        注册用户若反对任何服务条款或对后来的条款修改有异议，或不需要接受相关政务服务，可自行注销帐号，如之后需要使用相关服务，需重新进行注册认证。
        <br>
        九、【注意事项】
        <br>
        政务服务机构将加强网络安全和风险防控，因技术原因和网络中断等因素，可能会造成注册用户的实时操作无效和暂停，请注意备份相关资料。
        <br>
        十、【其他规定】
        <br>
        政务服务机构依照本服务条款及后期依法发布的补充规则，均为本协议不可分割的组成部分，原则上不再重复另行签约。
      </div>
      <el-button
        type="primary"
        style="margin-bottom: 30px; width: 400px;"
        @click.native.prevent="back"
      >
        我同意遵守协议
      </el-button>
    </el-card>
    <system-statement />
  </div>
</template>

<script>
import SystemStatement from '@/components/SystemStatement/index'

export default {
  name: 'UserAgreement',
  components: { SystemStatement },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    back() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
    /deep/ .el-card__header {
        display: flex;
        height: 80px;
        line-height: 80px;
        color: #000000;
        align-items: center;
        justify-content: center;
    }

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
    }

    .user-card {
        margin: 0 auto;
        width: 1520px;
        text-align: center;

        .content {
            margin: 30px auto;
            width: 965px;
            line-height: 30px;
            text-align: left;
        }
    }
}
</style>
