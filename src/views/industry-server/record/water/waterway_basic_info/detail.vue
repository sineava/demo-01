<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输企业基础信息变更" />
      </span>
    </div>

    <BasicFiling ref="BasicFiling" :data="info" :isEdit="false" />
    <Investor
      ref="BeforeInvestor"
      :data="beforeTable"
      :isEdit="false"
      title="水路运输企业投资人变更前信息"
    />
    <Investor
      ref="AfterInvestor"
      :data="afterTable"
      :isEdit="false"
      title="水路运输企业投资人变更后信息"
    />
    <Auth ref="Auth" :data="info" :isEdit="isEdit"  :isHy="true" />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
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
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/wt-en-base-filing'
import { momentDate } from '@/utils/index'
import BasicFiling from '@/views/components/waterway/basic-filing'
import Investor from '@/views/components/waterway/investor'
import Auth from '@/views/components/waterway/auth'
export default {
  components: {
    BasicFiling,
    Investor,
    Auth
  },
  data() {
    return {
      isEdit:false,
      loading:false,
      data:{},
      afterTable:[], // 变更后
      beforeTable:[], // 变更前
      reviewedFile:[],
      ruleForm: {
        id: '',
        isStatus: '',
        reviewedBy: '',
        reviewedOpinion: ''
      },
      rules: {
        isStatus: [
          { required: true, message: '请选择备案审核', trigger: 'change' }
        ]
      },
      info: {}
    }
  },
  // 展示未删除的数据
  computed: {
    afterTableList: function() {
      return this.afterChangeInfoDtoList.filter(item => item.isStatus !== 3)
    }
  },
  async mounted() {
    // 查询页面详情
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.info = info.data
      this.info.reviewedBy = this.info.reviewedBy ? this.info.reviewedBy : (this.isEdit ? this.$store.getters.user_info.username : '')
      this.info.reviewedDate = this.info.reviewedDate ? momentDate(this.info.reviewedDate,'YYYY-MM-DD HH:mm') : (this.isEdit ? momentDate(new Date(),'YYYY-MM-DD HH:mm') : '')
      /*
       * 组装展示数据
       * 投资人信息
       */
      this.beforeTable = info.data.beforeChangeInfoVoList
      this.afterTable = info.data.afterChangeInfoVoList
    }
  },
  methods: {
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
      let data = await this.$refs.Auth.submitForm()
      if (data===false){
        return false
      }
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .clearfix {
    display: flex;
    align-items: center;

    .tab-wrap {
        margin-left: 50px;
    }
}

.basic_title {
    display: inline-flex;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 0 20px;
    height: 35px;
    font-size: 14px;
    font-weight: 700;
    line-height: 35px;
    color: #ffffff;
    background-color: rgba(64, 158, 255, 1);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
}

/deep/ .table-border {
    margin-bottom: 20px;

    th {
        height: 40px;
        color: #ffffff;
        background-color: #409eff;
    }

    .is-disabled {
        .el-input__inner, .el-textarea__inner {
            background-color: #ffffff;
        }
    }
}

.table-title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #409eff;
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
