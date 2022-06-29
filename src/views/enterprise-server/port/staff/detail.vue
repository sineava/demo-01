<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="!isEdit ? '人员详情' : (type==='add' ? '新增': '编辑')+'人员'" />
      </span>
    </div>
    <div class="manager-detail">
      <Staff ref="Staff" :data="staff" :isEdit="isEdit" />
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
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
export default {
  components: {
    Staff
  },
  data() {
    return {
      staff:{
        enterpriseId:'',
        enterpriseName:''
      },
      personType:'',
      isEdit:false,
    }
  },
  async mounted() {
    const res = await findByUserId()
    this.staff.enterpriseId = res.data.id
    this.staff.enterpriseName = res.data.enterpriseName
    this.isEdit = this.$route.query.type === 'info' ? false : true
    this.type = this.$route.query.type
    if (this.$route.query && this.$route.query.id) {
      // 通过ID查询企业制度详情
      const info = await getPersonInfo(this.$route.query.id)
      this.staff = info.data
    }
  },
  methods: {
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
      this.$router.push({ path: `/port/staff` })
    }
  }
}
</script>
