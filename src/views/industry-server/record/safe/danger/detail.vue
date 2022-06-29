<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="备案信息详情" />
      </span>
    </div>
    <div class="basic-detail">
      <Danger ref="Danger" :data="info" :isEdit="false" />
      <Acceptance ref="Acceptance" :data="info" :isEdit="(isEdit && info.isStatus===1)" :isHy="true" />
      <Audit v-if="(info.isStatus > 3) || (info.isStatus === 3 && isEdit)" ref="Audit" :data="info" :isEdit="isEdit" :isHy="true" />
      <div class="backstage-edit-btn">
        <el-button
          v-if="isEdit"
          size="medium"
          type="primary"
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
    </div>
  </el-card>
</template>

<script>
import { findById, recordAcceptance, recordReview } from '@/api/port-services/record-management/major-hazard-filing'
import Danger from '@/views/components/keeponrecord/danger'
import Acceptance from '@/views/components/keeponrecord/acceptance'
import Audit from '@/views/components/keeponrecord/audit'
export default {
  components: {
    Danger,
    Acceptance,
    Audit
  },
  data() {
    return {
      ruleForm: {},
      isEdit: false,
      isAcceptance: false,
      id: '',
      info: {},
      tabActive: 1,
      loading: false,
    }
  },
  async mounted() {
    let {id,isEdit,isAcceptance,tabActive} = this.$route.query
    this.isEdit = isEdit === 'true'
    this.isAcceptance = isAcceptance === 'true'
    this.id = id
    this.tabActive = tabActive
    let info = await findById(id)
    this.info = info.data || {}
  },
  methods: {
    /**
     * 保存
     */
    submitForm(formName) {
      this.save()
    },
    async save() {
      let data = false
      if (this.info.isStatus === 1) {
        data = await this.$refs.Acceptance.submitForm()
      } else {
        data = await this.$refs.Audit.submitForm()
      }
      if(data===false){
        return false
      }
      this.loading = true
      const res = this.info.isStatus === 1 ? await recordAcceptance(data) : await recordReview(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    /**
     * 返回
     */
    returnBack() {
      this.$router.push({ path: `/record/safe/danger?tabActive=${this.tabActive}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.acceptance {
    display: flex;
    margin-bottom: 20px;
    padding: 0 60px;
    font-size: 14px;
    font-weight: 700;
    color: #666666;
    align-items: center;
    justify-content: space-between;
}

.detail-info {
    display: flex;
    margin-bottom: 20px;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    font-size: 14px;
    flex-wrap: wrap;

    .info-list {
        display: flex;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        width: 33.3%;
        min-height: 55px;
        line-height: 20px;

        div {
            display: flex;
            overflow: hidden;
            margin-right: 10px;
            padding: 5px 8px;
            height: 100%;
            background-color: #eeeeee;
            flex: 3;
            align-items: center;
            justify-content: center;
        }

        span {
            display: flex;
            height: 100%;
            flex: 5;
            align-items: center;
        }
    }
}
</style>
