<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑应急机构' : type === 'add' ? '新增应急机构' : '应急机构详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <Agency ref="Agency" :data="ruleForm" :isEdit="isEdit" />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        :loading="loading"
        size="medium "
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
import { saveOrgan, queryDetail, updateOrgan } from '@/api/emergency-services/organization'
import { mapGetters } from 'vuex'
import Agency from '@/views/components/emergency-data/agency'
export default {
  components: {
    Agency
  },
  data() {
    return {
      type: '',
      loading:false,
      isEdit:true,
      ruleForm: {},
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.isEdit = type==='edit' || type === 'add' ? true : false
    if (id) { // 编辑
      this.fetchDetail(id)
    }else{
      this.ruleForm = {
        enterpriseName:this.user_info.orgname
      }
    }
  },
  methods: {
    // 经纬度变化
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = res.data
      })
    },
    // 提交
    submitForm() {
      this.saveData()
    },
    // 保存数据
    async saveData() {
      const data = await this.$refs.Agency.submitForm()
      if(data === false){
        return false
      }
      this.loading = true
      const res = data.id ? await updateOrgan(data) : await saveOrgan(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/agency' })
    }
  }
}
</script>