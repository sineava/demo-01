<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ !isEdit ? '人员详情' : (type==='add' ? '新增': '编辑')+'人员' }} </span>
    </div>
    <div class="manager-detail">
      <Staff
        ref="Staff"
        :data="staff"
        :isEdit="isEdit"
        :enterpriseId="staff.enterpriseId"
      />
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
          type="primary"
          size="medium"
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
    </div>
  </el-card>
</template>
<script>
import Staff from '@/views/components/staff'
import { getPersonInfo, addEnterprisePerson, updateEnterprisePerson } from '@/api/general-services/enterpriseInfo/enterprisePerson'
export default {
  components: {
    Staff,
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      staff:{
        enterpriseId:'',
        enterpriseName:''
      },
      personType:'',
      isEdit:false,
      type:''
    }
  },
  async created() {
    const id = this.objData.id
    this.personType = this.objData.personType
    this.isEdit = this.objData.type === 'info' ? false : true
    this.type = this.objData.type
    this.staff.enterpriseId = this.objData.enterpriseId
    this.staff.enterpriseName = this.objData.enterpriseName
    if (id) {
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询用户信息
    async fetchDetail(id) {
      const info = await getPersonInfo(id)
      this.staff = info.data
    },
    submitForm() {
      this.addEnterprisePerson()
    },
    async addEnterprisePerson() {
      let data = await this.$refs.Staff.submitForm('ruleForm')
      if (data===false){
        return false
      }
      const res = data.id ? await updateEnterprisePerson(data) : await addEnterprisePerson(data)
      if (res.code === '0') {
        this.personType = data.personType
        this.returnBack()
      }
    },
    returnBack() {
      this.$emit('join', { name: '人员信息', data: { personType: this.personType }})
    }
  }
}
</script>
