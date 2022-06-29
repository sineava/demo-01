<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>初始运力信息</span>
    </div>
    <div class="app-container transport-info">
      <InitTransport
        ref="initTransport"
        :data="ruleForm"
        :isEdit="isEdit"
        @clickEdit="clickEdit"
      />
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
          type="primary"
          size="medium "
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          保存
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getEnCapacityInfo,updateCapacity } from '@/api/water-transportation-services/information/initial-capacity'
import InitTransport from '@/views/components/transport/init'
export default {
  components:{
    InitTransport
  },
  data() {
    return {
      loading:false,
      isEdit:false,
      ruleForm: {}
    }
  },
  async mounted() {
    const res = await getEnCapacityInfo()
    this.ruleForm = res.data || {}
  },
  methods: {
    clickEdit(isEdit){
      this.isEdit = isEdit
    },
    async submitForm() {
      const res = await this.$refs.initTransport.submitForm()
      if (res===false){
        return false
      }
      this.ruleForm = res
      this.loading = true
      updateCapacity(res).then(res=>{
        this.loading = false
        if (res.code==='0'){
          this.$message.success('修改成功')
          this.isEdit = false
        }
      })
      return false
    },
  }
}
</script>
