<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑应急物资储备点' : type === 'add' ? '新增应急物资储备点' : '应急物资储备点详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <ReservePoint ref="ReservePoint" :isEdit="isEdit" :data="ruleForm"/>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium"
        :loading="loading"
        @click="handlePost"
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
import { mapGetters } from 'vuex'
import { saveEntity, queryDetail, updateById } from '@/api/emergency-services/material-storage'
import ReservePoint from '@/views/components/emergency-data/reserve-point'
export default {
  components: {
    ReservePoint
  },
  data() {
    return {
      isEdit:true,
      loading:false,
      ruleForm: {}
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
    this.isEdit = type !== 'detail' ? true : false 
    this.ruleForm = {
      enterpriseName:this.user_info.orgname
    }
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情(必须同步)
    fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...this.ruleForm,
          ...res.data
        }
      })
    },
    // 提交
    handlePost() {
      this.saveData()
    },
    // 保存
    async saveData() {
      const data = await this.$refs.ReservePoint.submitForm()
      if(data === false){
        return false
      }
      this.loading = true
      const res = this.ruleForm.id ? await updateById(data) : await saveEntity(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/reserve' })
    }
  }
}
</script>