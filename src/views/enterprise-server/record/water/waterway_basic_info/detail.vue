<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输企业基础信息变更" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="data.isStatus === 2 || data.isStatus === 1"
          type="primary"
          size="small"
          @click="isEdit=true"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <BasicFiling ref="BasicFiling" :data="data" :isEdit="isEdit" />
    <Investor
      ref="BeforeInvestor"
      :data="beforeTable"
      :isEdit="false"
      title="水路运输企业投资人变更前信息"
    />
    <Investor
      ref="AfterInvestor"
      :data="afterTable"
      :isEdit="isEdit"
      title="水路运输企业投资人变更后信息"
    />
    <Auth ref="Auth" v-if="data.isStatus > 1" :data="data" :isEdit="false" />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm"
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
  </el-card>
</template>

<script>
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/wt-en-base-filing'
import { getEnWaterTransportInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { wtInvestorsList } from '@/api/water-transportation-services/information/investors'
import CommonTable from '@/components/features/FileTable.vue'
import BasicFiling from '@/views/components/waterway/basic-filing'
import Investor from '@/views/components/waterway/investor'
import Auth from '@/views/components/waterway/auth'
export default {
  components: {
    CommonTable,
    BasicFiling,
    Investor,
    Auth
  },
  data() {
    return {
      isEdit:false,
      loading:false,
      data:{},
      afterTable:[], // 变更后
      beforeTable:[], // 变更前
    }
  },
  // 展示未删除的数据
  computed: {
    afterTableList: function() {
      return this.afterChangeInfoDtoList.filter(item => item.isStatus !== 3)
    }
  },
  async mounted() {
    this.enterpriseInfo = this.$store.getters.enterprise
    this.isEdit = this.$route.query.oper === 'info' ? false : true
    // 查询页面详情
    if (this.$route.query.id) { // 详情数据展示
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.data = info.data || {}
      this.beforeTable = info.data.beforeChangeInfoVoList || []
      this.afterTable = info.data.afterChangeInfoVoList || []
      this.data.reviewedFile = this.data.reviewedFile ? JSON.parse(this.data.reviewedFile) : []
    } else { // 获取变更前数据
      // 查询变更前企业详情
      const info = await getEnWaterTransportInfo()
      this.data = info.data || {}
      /*
       * 查询变更前投资人信息
       */
      const infoData = await wtInvestorsList()
      const beforeTable = infoData.data || []
      beforeTable.forEach(infoItem => {
        infoItem.investorsId = infoItem.id
        delete infoItem.id
        delete infoItem.enterpriseId
        delete infoItem.enterpriseName
      })
      this.beforeTable = beforeTable
    }
  },
  methods: {
    /**
     * 保存
     */
    async submitForm() {
      let basic = await this.$refs.BasicFiling.submitForm()
      if (basic===false){
        return false
      }
      let before = await this.$refs.BeforeInvestor.submitForm()
      let after = await this.$refs.AfterInvestor.submitForm()
      let data = {
        ...basic[0],
        ...basic[1],
      }
      data.id = this.$route.query.id || ''
      data.afterChangeInfoDtoList = after
      data.beforeChangeInfoDtoList = before
      data.filePath = basic[2]
      data.isChange = 1
      data.organizationName = this.enterpriseInfo.organizationName
      data.organizationId = this.enterpriseInfo.organizationId
      data.enterpriseId = this.enterpriseInfo.id
      this.loading = true
      let res = this.$route.query.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
