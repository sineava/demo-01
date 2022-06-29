<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="代理企业开业备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus === 2"
          type="primary"
          @click="reSubmit"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">企业名称:</template>
        {{ info.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">营业执照编号:</template>
        {{ info.businessLicenseNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">行政区划:</template>
        {{ info.administrativeDivision }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">企业类型:</template>
        {{ info.enterpriseType ? shipTypeList[info.enterpriseType - 1].val : '' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">固定办公场所:</template>
        {{ info.officeAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">法定代表人名称:</template>
        {{ info.legalPersonName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">电话号码:</template>
        {{ info.contactPhone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">法人身份证号:</template>
        {{ info.legalPersonCardNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">传真:</template>
        {{ info.faxNumber }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">经济类型:</template>
        {{ info.economicType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">注册资本:</template>
        {{ info.registeredCapital }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">企业注册地址:</template>
        {{ info.fixedOfficeSpace }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">电子邮箱:</template>
        {{ info.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">联系人:</template>
        {{ info.contactName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">经营范围:</template>
        {{ info.allowedBusiness }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 备案申请信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="business-title other-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">申请业务种类:</template>
        {{ info.appliedBusinessType === 1?'水路旅客运输代理':(info.appliedBusinessType === 2?'水路货物运输代理':'船舶代理') }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">申请理由:</template>
        {{ info.appliedReasons }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">联系人:</template>
        {{ info.contactPerson }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">联系电话:</template>
        {{ info.contactMode }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">申请时间:</template>
        {{ info.appliedDate }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 附件信息
    </div>
    <common-table
      :table-data="info.enclosureInfo"
      show-download
    />
    <div
      v-if="info.isStatus >= 2"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
      </div>
      <div class="list-column-wrap">
        <div class="info-list">
          <div class="label">
            审核状态：
          </div><div class="content">
            {{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核人：
          </div><div class="content">
            {{ info.reviewedBy }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核时间：
          </div><div class="content">
            {{ info.reviewedDate }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核编号：
          </div><div class="content">
            {{ info.reviewedCode }}
          </div>
        </div>
        <div class="info-list">
          <div class="label" /><div class="content" />
        </div>
        <div class="info-list">
          <div class="label" /><div class="content" />
        </div>
        <div
          class="info-list"
          style="width: 100%;"
        >
          <div class="label">
            审核意见：
          </div><div class="content">
            {{ info.reviewedOpinion }}
          </div>
        </div>
      </div>
      <div class="icon-title">
        <span class="span" />审核附件
      </div>
      <common-table
        :table-data="info.reviewedFile"
        show-download
      />
    </div>
    <div class="backstage-edit-btn">
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
import { getInfo } from '@/api/water-transportation-services/keep-on-record/wt-auxiliary-opening-filing'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      info: {},
      shipTypeList: [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
    }
  },
  methods: {
    reSubmit() {
      this.$router.push({ path: '/record/water/other/addAgentInfo', query: { id: this.$route.query.id }})
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

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
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

        &.other-title {
            width: 4.1%;
        }
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
