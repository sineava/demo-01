<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑应急预案' : '新增应急预案'" />
      </span>
    </div>
    <div class="basic-detail">
      <Paln ref="Paln" :isEdit="isEdit" :data="ruleForm"/>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium "
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        v-if="ruleForm.state !== 2"
        type="primary"
        size="medium "
        :loading="saveLoading"
        @click="submitForm('save')"
      >
        保存
      </el-button>
      <el-button
        type="primary"
        size="medium "
        :loading="postLoading"
        @click="submitForm('post')"
      >
        {{ ruleForm.state === 2 ? '保存' : '保存并发布' }}
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveEntity, updateById, queryDetail } from '@/api/emergency-services/response-plan'
import Paln from '@/views/components/plan'
import { Message } from 'element-ui'
export default {
  components: {
    Paln
  },
  data() {
    return {
      type: '',
      isEdit:true,
      saveLoading: false,
      postLoading: false,
      ruleForm: {},
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { type, id } = this.$route.query
    this.type = type
    if (id) { // 编辑
      this.fetchDetail(id)
    }else{
      this.ruleForm = {
        enterpriseName:this.user_info.orgname
      }
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = res.data || {}
      })
    },
    // 提交
    submitForm(type) {
      this.saveData(type)
    },
    // 保存数据
    async saveData(type) {
      const dto = await this.$refs.Paln.submitForm()
      if(dto===false){
        Message({
          type: 'warning',
          message: '应急处置策略存在未保存或未填项,请检查后再保存',
          duration: 5000
        })
        return false
      }
      this.postLoading = true
      dto.state = type === 'post' ? 2 : 1
      const res = dto.id ? await updateById(dto) : await saveEntity(dto)
      if (type === 'post') {
        this.postLoading = false
      } else {
        this.saveLoading = false
      }
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/plan' })
    }
  }
}
</script>