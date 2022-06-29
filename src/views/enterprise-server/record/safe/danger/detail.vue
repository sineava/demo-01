<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      
      <span class="detail-back">
        <el-page-header @back="returnBack" content="备案信息详情" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus === 1 || info.isStatus === 2 || info.isStatus === 5"
          type="primary"
          size="small"
          @click="add(info.filingForm)"
        >
          重新提交
        </el-button>
        <el-button
          v-if="info.isStatus === 4"
          type="primary"
          size="small"
          @click="add(2)"
        >
          变更备案
        </el-button>
        <el-button
          v-if="info.isStatus === 4"
          type="primary"
          size="small"
          @click="add(3)"
        >
          注销备案
        </el-button>
      </span>
    </div>
    <div class="basic-detail">
      <Danger ref="Danger" :data="info" :isEdit="false" />
      <Acceptance v-if="info.isStatus > 1" ref="Acceptance" :data="info" :isEdit="false" />
      <Audit v-if="info.isStatus > 3" ref="Audit" :data="info" :isEdit="false" />
    </div>
  </el-card>
</template>

<script>
import { findById } from '@/api/port-services/record-management/major-hazard-filing'
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
      isEdit: false,
      isAcceptance: false,
      id: '',
      info: {}
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit === 'true'
    this.isAcceptance = this.$route.query.isAcceptance === 'true'
    this.id = this.$route.query.id
    const info = await findById(this.$route.query.id)
    this.info = info.data
  },
  methods: {
    /**
     * 添加
     */
    add(type) {
      this.$router.push({ path: `/record/safe/addDanger?filingForm=${type}&id=${this.id}` })
    }
  }
}
</script>