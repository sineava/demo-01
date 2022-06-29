<template>
  <div class="body-card">
    <div class="basic-detail">
        <Repair ref="Repair" :isEdit="false" :data="ruleForm" />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { findById, addMaintain, updateMaintain } from '@/api/general-services/enterpriseInfo/enterpriseFacilityMaintain'
import { downloadCodeImg, momentDate } from '@/utils/index'
import Repair from '@/views/components/equipment/repair'
export default {
  components: {
    Repair
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading:false,
      ruleForm: {},
      isEdit:false,
    }
  },
  async mounted() {
    let {facilityName,facilityCategory,facilityId,id,type} = this.objData
    this.ruleForm = {
      ...this.ruleForm,
      facilityName,
      facilityId,
      facilityCategory,
      fillingTime: momentDate(new Date())
    }
    if (id) {
      // 通过ID查询企业制度详情
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
      this.$emit('join', { name: '检测维护信息', data: { id: this.ruleForm.facilityId, facilityName: this.ruleForm.facilityName, facilityCategory: this.ruleForm.facilityCategory }})
    }
  }
}
</script>