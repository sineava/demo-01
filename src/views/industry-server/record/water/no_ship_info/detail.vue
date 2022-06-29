<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>无船承运业务备案详情页</span>
    </div>
    <div>
      <Noship ref="Noship"  :data="info" :isEdit="false"/>
      <Audit  ref="Audit" :data="info" :isEdit="isEdit" :isHy="true" />
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
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/non-ship-carriage-filing'
import Noship from '@/views/components/noship/index'
import Audit from '@/views/components/noship/audit'
export default {
  components: {
    Noship,
    Audit
  },
  data() {
    return {
      info: {},
      ruleForm: {},
      reviewedFile: [],
      isEdit: false,
      loading: false
    }
  },
  async mounted() {
    let {id,isEdit} = this.$route.query
    this.isEdit = isEdit
    this.id = id
    if(id){
      let info = await getInfo(id)
      this.info = info.data || {}
    }

    // this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    // this.ruleForm.reviewedCode = `WC${Date.now()}`
  },
  methods: {
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
      let data = await this.$refs.Audit.submitForm()
      if(data === false){
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