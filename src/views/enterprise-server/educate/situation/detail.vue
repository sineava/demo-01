<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增培训情况' : type === 'detail' ? '培训情况详情' : '编辑培训情况'" />
      </span>
    </div>
    <Situation
      ref="situation"
      :data="data"
      :isEdit="isEdit"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
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
  </el-card>
</template>

<script>
import { trainingSituationQuery, trainingSituationSave, updateSituation } from '@/api/general-services/educateTrain/educationSituation'
import Situation from '@/views/components/education/situation'
import { mapGetters } from 'vuex'
export default {
  components: {
    Situation
  },
  data() {
    return {
      isEdit:false,
      data:{},
      loading: false,
      fileList: [],
      imgList: [],
      type: '',
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  mounted() {
    this.isEdit = this.$route.query.type === 'detail' ? false : true
    this.type = this.$route.query.type
    const id = parseInt(this.$route.query.id)
    if (id > 0) {
      trainingSituationQuery({ id }).then(res => {
        this.data = res.data
        this.data.enterpriseName = this.user_info.orgname
      })
    } else {
      this.data.enterpriseName = this.user_info.orgname
    }
  },
  methods: {
    // 提交
    submitForm() {
      this.saveData()
    },
    // 保存
    async saveData() {
      const formData = await this.$refs.situation.submitForm()
      if (formData===false){
        return false
      }
      const res = formData.id ? await updateSituation(formData) : await trainingSituationSave(formData)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/educate/situation' })
    }
  }
}
</script>
