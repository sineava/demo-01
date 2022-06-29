<template>
  <div class="body-card">
    <div class="basic-detail">
      <div>
        <Equipment ref="Equipment" :isEdit="isEdit" :data="ruleForm"/>
      </div>
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
import typeCard from './typeCard'
import { findById, addFacility, updateFacility } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
import Equipment from '@/views/components/equipment'
export default {
  components: {
    typeCard,
    Equipment
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      enterpriseName: '',
      ruleForm: {}
    }
  },
  async mounted() {
    // 获取当前用户关联的企业信息
    if (this.objData && this.objData.id) {
      // 通过ID查询企业制度详情
      const info = await findById(this.objData.id)
      this.ruleForm = info.data || {}
    }
  },
  methods: {
    /**
     * 保存
     */
    submitForm() {
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
      this.$emit('join', { name: '设施设备信息', data: { }})
    }
  }
}
</script>