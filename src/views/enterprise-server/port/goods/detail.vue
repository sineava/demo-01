<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'details' ? '港口危险货物作业附证详情' : (type === 'add' ? '添加港口危险货物作业附证' : '编辑港口危险货物作业附证') }}</span>
    </div>
    <Workpermit ref="Workpermit" :data="ruleForm" :isEdit="isEdit" />
    <div class="basic-detail">
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
          v-loading="loading"
          type="primary"
          size="small"
          @click="submitForm"
        >
          修改保存
        </el-button>
        <el-button
          size="small"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { findGoods,putLicense,postLicense } from '@/api/general-services/enterprise-qualification/business-license'
import Workpermit from '@/views/components/license/workpermit'
import { mapGetters } from 'vuex'
export default {
  components: {
    Workpermit
  },
  data() {
    return {
      ruleForm: {},
      isEdit:false,
      loading:false,
      type:'details'
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id,type } = this.$route.query
    this.isEdit = type==='details' ? false : true
    this.type = type
    if (id){
      this.fetchData(id)
    } else {
      this.ruleForm = {
        enterpriseName:this.user_info.orgname
      }
    }
  },
  methods: {
    // 查询详情
    async fetchData(id) {
      findGoods({ id }).then(res => {
        this.ruleForm = res.data || {}
      })
    },
    async submitForm(){
      if (this.loading){
        return false
      }
      this.loading = true
      let data = await this.$refs.Workpermit.submitForm()
      this.loading = false
      if (data !== false){
        let res = data.id ? await putLicense(data) : await postLicense(data)
        if (res.code==='0'){
          this.$message.success(data.id ? '修改成功' : '添加成功')
          this.returnBack()
        }
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100px;
}

.el-input.is-disabled /deep/ .el-input__inner {
    border: none;
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 5%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
