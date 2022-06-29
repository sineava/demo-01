<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>客运班轮停航备案填报</span>
    </div>
    <div>
      <PassengerTransport ref="PassengerTransport" :data="ruleForm" :isEdit="isEdit" />
      <Audit v-if="ruleForm.isStatus > 1" ref="Audit" :data="ruleForm" :isEdit="false" />
      <div
        class="backstage-edit-btn"
        style="width: 100%;"
      >
        <el-button
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
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/cruise-liner-suspend-filing'
import { getEnWaterTransportInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import PassengerTransport from '@/views/components/passenger-transport/index'
import Audit from '@/views/components/passenger-transport/audit'
export default {
  components: {
    PassengerTransport,
    Audit
  },
  data() {
    return {
      isEdit:true,
      ruleForm: {},
      loading: false,
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.ruleForm = { ...info.data }
    } else { // 查询水陆运输企业基础信息
      const waterInfo = (await getEnWaterTransportInfo()).data
      this.ruleForm = {
        enterpriseId:waterInfo.id,
        enterpriseName:waterInfo.enterpriseName,
        organizationId:waterInfo.organizationId,
        organizationName:waterInfo.organizationName,
        certificateNo:waterInfo.enterpriseBusinessInfoVo?.certificateNo
      }
    }
  },
  methods: {
    /**
     * 保存
     */
    submitForm(formName) {
      this.save()
    },
    async save() {
      let data = await this.$refs.PassengerTransport.submitForm()
      if(data===false){
        return false
      }
      this.loading = true
      let res = data.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    returnBack() {
      this.$router.push({ path: '/record/water/passenger_transport_info' })
    }
  }
}
</script>
