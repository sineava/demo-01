<template>
  <div class="transport-info">
    <InitTransport
      ref="initTransport"
      :data="ruleForm"
      :isEdit="isEdit"
      :type="type"
      @clickEdit="clickEdit"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit && type!=='details'"
        type="primary"
        size="medium "
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { getHyCapacityInfo,updateCapacity } from '@/api/water-transportation-services/information/initial-capacity'
import InitTransport from '@/views/components/transport/init'
export default {
  components:{
    InitTransport
  },
  data() {
    return {
      loading:false,
      ruleForm: {},
      isEdit:false,
      enterpriseName:'',
      type:''
    }
  },
  async mounted() {
    let { type , id ,enterpriseName} = this.$route.query
    this.type = type
    this.enterpriseName = enterpriseName
    const res = await getHyCapacityInfo(id)
    this.ruleForm = res.data || {}
  },
  methods: {
    clickEdit(isEdit){
      this.isEdit = isEdit
    },
    async submitForm(formName) {
      const res = await this.$refs.initTransport.submitForm()
      if (res===false){
        return false
      }
      this.ruleForm = res
      this.loading = true
      res.enterpriseId = this.$route.query.id
      res.enterpriseName = this.enterpriseName
      updateCapacity(res).then(res=>{
        this.loading = false
        if (res.code==='0'){
          this.$message.success('修改成功')
          this.isEdit = false
        }
      })

    },
  }

}
</script>
<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.transport-info {
    .descriptions {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 10%;
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

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            padding: 0 10px;
            width: 90%;
            line-height: 30px;
        }
    }

    .el-form-item {
        margin: 0;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .row {
        display: inline-block;
        overflow: hidden;
        padding: 0;
        width: 12.5%;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .row-title {
        height: 50px;
        line-height: 50px;
    }

    .bg {
        background: #fafafa;
    }

    .br {
        border-right: 1px solid #f2f2f2;
    }
}
</style>
