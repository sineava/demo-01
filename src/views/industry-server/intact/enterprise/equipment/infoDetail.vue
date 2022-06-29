<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="设备维护详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />设备基础信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="设备名称:">{{facilityName }}</el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.facilityCategory" label="设备类型:">{{ type[Number(ruleForm.facilityCategory) - 1].label }}</el-descriptions-item>
        <el-descriptions-item label="填报时间:">{{ruleForm.fillingTime }}</el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />维修/检测信息填写
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="作业类型:">{{ ruleForm.jobType===1?'维修':'检测' }}</el-descriptions-item>
        <el-descriptions-item label="维修/检测人:">{{ruleForm.repair }}</el-descriptions-item>
        <el-descriptions-item label="维修/检测时间:">{{ruleForm.repairTime }}</el-descriptions-item>
        <el-descriptions-item label="维修/检测内容:">{{ruleForm.repairContent }}</el-descriptions-item>
      </el-descriptions>
      <FileTable
        :show-download="true"
        :show-delete="false"
        :table-data="enterpriseFacilityMaintainEnclosureDtoList"
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
import { findById } from '@/api/general-services/enterpriseInfo/enterpriseFacilityMaintain'
import { downloadCodeImg } from '@/utils/index'
import FileTable from '@/components/features/FileTable'
export default {
  components: {
    FileTable
  },
  data() {
    return {
      facilityName: '',
      ruleForm: {},
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ],
      enterpriseFacilityMaintainEnclosureDtoList: []
    }
  },
  async mounted() {
    let { id, name } = this.$route.query
    this.facilityName = name
    if (id) {
      // 通过ID查询企业制度详情
      const info = await findById(id)
      this.ruleForm = {
        facilityCategory: String(info.data.facilityCategory),
        fillingTime: info.data.fillingTime,
        jobType: info.data.jobType,
        repair: info.data.repair,
        repairTime: info.data.repairTime,
        repairContent: info.data.repairContent
      }
      this.enterpriseFacilityMaintainEnclosureDtoList = info.data.enterpriseFacilityMaintainEnclosureVoList
    }
  },
  methods: {
    /**
     * 下载
     */
    handleDownload(item) {
      downloadCodeImg(item.filePath)
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
</style>
