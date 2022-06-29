<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水路运输企业重大事件备案详情页</span>
    </div>

    <div class="icon-title">
      <span class="span" />基础信息
    </div>
    <AccidentBasic
      ref="AccidentBasic"
      :data="info"
      :isEdit="isEdit"
      :enterpriseId="enterpriseId"
    />
    <div v-if="oper!=='add' && info.isStatus>1">
      <div
        class="icon-title"
        style="margin-top: 20px;"
      >
        <span class="span" /> 审核信息
      </div>
      <AccidentAudit
        ref="AccidentAudit"
        :data="info"
        :isEdit="false"
        :isHy="false"
      />
    </div>

    <div style="margin-top: 20px;">
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
    </div>
  </el-card>
</template>

<script>
import { addData, findById, updateData } from '@/api/water-transportation-services/information/water-transport-en-major-events-filing'
import AccidentBasic from '@/views/components/accident'
import AccidentAudit from '@/views/components/accident/audit'
export default {
  components: {
    AccidentBasic,
    AccidentAudit
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      info: {},
      oper: 'add',
      loading: false,
      isEdit: false,
      enterpriseId:'',
      enterprise:{}
    }
  },
  async mounted() {
    this.enterprise = this.$store.getters.enterprise
    this.enterpriseId = this.enterprise.id
    this.isEdit = this.$route.query.oper === 'info' ? false : true
    this.oper = this.$route.query.oper || 'add'
    // 查询详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await findById(this.$route.query.id)
      this.info = info.data || {}
    }
  },
  methods: {
    // 获取编号
    shipChange(id) {
      this.shipList.forEach(item => {
        if (item.id === id) {
          this.shipLicenseNo = item.shipLicenseNo
        }
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.save()
    },
    async save() {
      let data = await this.$refs.AccidentBasic.submitForm()
      if (data===false){
        return false
      }
      data.enterpriseId = this.enterprise.id
      data.enterpriseName = this.enterprise.enterpriseName
      data.organizationName = this.enterprise.organizationName
      this.loading = true
      let res = data.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    returnBack() {
      this.$router.push({ path: '/record/water/waterway_accident_info' })
    }
  }
}
</script>
