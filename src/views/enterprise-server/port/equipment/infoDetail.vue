<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="!isEdit?'检测/维修详情':ruleForm.id?'编辑检测/维修记录': '新增检测/维修记录'" />
      </span>
    </div>
    <div class="basic-detail">
      <Repair ref="Repair" :isEdit="isEdit" :data="ruleForm" />
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
import { findById, addMaintain, updateMaintain } from '@/api/general-services/enterpriseInfo/enterpriseFacilityMaintain'
import { momentDate } from '@/utils/index'
import Repair from '@/views/components/equipment/repair'
export default {
  components: {
    Repair
  },
  data() {
    return {
      loading:false,
      ruleForm: {},
      isEdit:true,
    }
  },
  async mounted() {
    let {facilityName,facilityCategory,facilityId,id,type} = this.$route.query
    this.ruleForm = {
      ...this.ruleForm,
      facilityName,
      facilityId,
      facilityCategory,
      fillingTime: momentDate(new Date())
    }
    this.isEdit = type === 'details' ? false : true
    if (id) {
      const info = await findById(id)
      this.ruleForm = {
        ...this.ruleForm,
        ...info.data
      }
    }
  },
  methods: {
    // 保存
    submitForm() {
      this.saveSubmit()
    },
    async saveSubmit() {
      const data = await this.$refs.Repair.submitForm()
      if(data===false){
        return false
      }
      this.loading = true
      const res = data.id ? await updateMaintain(data) : await addMaintain(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$router.push({ path: '/enterprise/basic/equipmentInfo', query: { id: this.ruleForm.facilityId, facilityName: this.ruleForm.facilityName, facilityCategory: this.ruleForm.facilityCategory }})
    }
  }
}
</script>