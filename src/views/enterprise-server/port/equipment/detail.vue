<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="isEdit ? (ruleForm.id ? '编辑企业设施设备信息' : '添加企业设施设备信息') : '企业设施设备详情页'" />
      </span>
    </div>
    <div class="basic-detail">
      <Equipment ref="Equipment" :isEdit="isEdit" :data="ruleForm"/>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
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
import typeCard from './typeCard'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { findById, addFacility, updateFacility } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
import Equipment from '@/views/components/equipment'
export default {
  components: {
    typeCard,
    Equipment
  },
  data() {
    return {
      enterpriseName: '',
      ruleForm: {},
      isEdit:true,
      loading: false,
      isDisabled: false,
    }
  },
  async mounted() {
    let {isDisabled,id} = this.$route.query
    this.isEdit = isDisabled ? false : true
    this.isDisabled = isDisabled ? true : false
    // 获取当前用户关联的企业信息
    const res = await findByUserId()
    this.ruleForm = {
      enterpriseName:res.data.enterpriseName,
      enterpriseId:res.data.id
    }
    if (id) {
      // 通过ID查询企业制度详情
      const info = await findById(this.$route.query.id)
      this.ruleForm = {
        ...this.ruleForm,
        ...info.data
      }
    }
  },
  methods: {
    /**
     * 保存
     */
    submitForm(formName) {
      this.saveSubmit()
    },
    async saveSubmit() {
      const data = await this.$refs.Equipment.submitForm()
      if(data === false){
        return false
      }
      this.loading = true
      const res = data.id ? await updateFacility(data) : await addFacility(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$router.push({ path: '/port/equipment' })
    }
  }
}
</script>