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
  </el-card>
</template>

<script>
import Situation from '@/views/components/education/situation'
import { trainingSituationQuery, trainingSituationSave, updateSituation } from '@/api/general-services/educateTrain/educationSituation'
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
  mounted() {
    const { type, id, enterpriseName } = this.$route.query
    this.type = type
    this.isEdit = type === 'detail' ? false : true
    if (id) {
      trainingSituationQuery({ id }).then(res => {
        this.data = res.data || {}
        // this.data.enterpriseName = enterpriseName
      })
    } else {
      this.data.enterpriseName = enterpriseName
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.saveData()
    },
    // 保存
    async saveData() {
      const formData = await this.$refs.situation.submitForm()
      if (formData===false){
        return false
      }
      const res = this.ruleForm.id ? await updateSituation(formData) : await trainingSituationSave(formData)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>
