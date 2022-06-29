<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑应急物资' : type === 'add' ? '新增应急物资' : '应急物资详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <Goods ref="Goods" :isEdit="isEdit" :data="ruleForm" />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium "
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
import { mapGetters } from 'vuex'
import { saveEntity, selectInfo, updateInfo } from '@/api/emergency-services/material'
import { emergencyGoods } from '@/utils/public-fields'
import Goods from '@/views/components/emergency-data/goods'
export default {
  components: {
    Goods
  },
  mixins: [emergencyGoods],
  data() {
    return {
      isEdit:true,
      loading: false,
      ruleForm: {},
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async created() {
    const { id, type,storageId } = this.$route.query
    this.isEdit = type !== 'detail' ? true : false
    this.type = type
    this.ruleForm = {
      enterpriseName:this.user_info.orgname
    }
    if (id){
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    fetchDetail(id) {
      selectInfo({ id }).then(res => {
        this.ruleForm = {
          ...this.ruleForm,
          ...res.data
        }
      })
    },
    // 提交
    submitForm() {
      this.saveData()
    },
    // 保存数据
    async saveData() {
      const data = await this.$refs.Goods.submitForm()
      if(data === false){
        return false
      }
      this.loading = true
      const res = data.id ? await updateInfo(data) : await saveEntity(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
  }
}
</script>