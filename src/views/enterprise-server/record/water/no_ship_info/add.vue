<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>无船承运业务备案信息填报</span>
    </div>
    <div>
      <Noship ref="Noship" :data="ruleForm" :isEdit="isEdit"/>
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
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/non-ship-carriage-filing'
// import { getEnWaterTransportInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Noship from '@/views/components/noship/index'
import Audit from '@/views/components/noship/audit'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
export default {
  components: {
    Noship,
    Audit
  },
  data() {
    return {
      ruleForm: {},
      isEdit:true,
      enterpriseInfo: {},
      loading: false,
      info: {},
      enclosureInfo: []
    }
  },
  async mounted() {
    let {id} = this.$route.query
    if(id){
      this.id = id
      let res = await getInfo(id)
      this.ruleForm = res.data
    }else{
      // let res = await getEnWaterTransportInfo()
      // this.ruleForm = res.data
      // delete this.ruleForm.id
    }
    const user = await findByUserId()
    this.userInfo = user.data
    this.ruleForm = {
      ...this.ruleForm,
      organizationName:user.data.organizationName,
      enterpriseName:user.data.enterpriseName,
      enterpriseId:user.data.id,
      organizationId:user.data.organizationId,
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
      let data = await this.$refs.Noship.submitForm()
      if(data === false){
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
      this.$router.push({ path: '/record/water/no_ship_info' })
    }
  }
}
</script>
