<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="客运班轮停航备案详情页" />
      </span>
    </div>
    <div>
    <PassengerTransport ref="PassengerTransport" :data="info" :isEdit="false" />
    <Audit v-if="info.isStatus > 1 || isEdit" ref="Audit" :data="info" :isEdit="isEdit" :isHy="true" />
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
          :loading="loading"
          type="primary"
          size="medium"
          @click="submitForm('ruleForm')"
        >
          提交
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
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/cruise-liner-suspend-filing'
import PassengerTransport from '@/views/components/passenger-transport/index'
import Audit from '@/views/components/passenger-transport/audit'
export default {
  components: {
    PassengerTransport,
    Audit
  },
  data() {
    return {
      info: {},
      isEdit: false,
      loading: false
    }
  },
  async mounted() {
    let {isEdit,id} = this.$route.query
    this.isEdit = isEdit ? true : false
    if(id){
      this.id = id
      let info = await getInfo(id)
      this.info = info.data || {}
    }
  },
  methods: {
    
    /**
     * 保存
     */
    submitForm() {
      this.save()
    },
    async save() {
     let data = await this.$refs.Audit.submitForm()
      if(data === false){
        return false
      }
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 30%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
}

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
        width: 20%;
        line-height: 30px;
    }
}
</style>
