<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输企业专职管理人员变更备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="data.isStatus === 1 || data.isStatus === 2"
          :type="isEdit ? 'primary' : 'warning'"
          size="small"
          @click="isEdit=!isEdit"
        >
          {{ isEdit ? '取消编辑' : '重新提交' }}
        </el-button>
      </span>
    </div>
    <KeepProfessional
      ref="KeepProfessional"
      :data="data"
      :isEdit="isEdit"
    />
    <div style="margin-top: 20px;" />
    <KeepProfessionalAuth
      v-if="data.isStatus > 1"
      ref="keepProfessionalAuth"
      :data="data"
      :isEdit="isEdit"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="save"
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
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/wt-manage-person-filing'
import KeepProfessional from '@/views/components/keep/professional'
import KeepProfessionalAuth from '@/views/components/keep/auth'
export default {
  components: {
    KeepProfessional,
    KeepProfessionalAuth
  },
  data() {
    return {
      data:{},
      isEdit:false,
      loading: false,
      enterpriseInfo: false,
    }
  },
  async mounted() {
    this.enterpriseInfo = this.$store.getters.enterprise
    this.enterpriseId = this.enterpriseInfo.id
    this.isEdit = this.$route.query.oper !== 'info' ? true : false
    // 查询详情
    if (this.$route.query.id) {
      const res = await getInfo(this.$route.query.id)
      this.data = res.data || {}
    } else {
      this.data = {
        enterpriseId:this.enterpriseInfo.id,
        enterpriseName:this.enterpriseInfo.enterpriseName,
        organizationName:this.enterpriseInfo.organizationName
      }
    }
  },
  methods: {
    /**
     * 保存
     */
    async save() {
      const data = await this.$refs.KeepProfessional.submitForm()
      if (data===false){
        return false
      }
      this.loading = true
      let res = this.$route.query.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
