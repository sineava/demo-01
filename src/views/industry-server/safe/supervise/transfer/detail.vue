<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="移交记录详情" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        label-width="160px"
        size="medium"
        hide-required-asterisk
        class="one-column-input-table"
        style="width: 60%;"
        disabled
      >
        <div class="icon-title">
          <span class="span" />基本信息
        </div>
        <el-form-item label="企业名称:">
          <el-input :value="info.targetName" />
        </el-form-item>
        <el-form-item label="检查项目:">
          <el-input :value="info.itemName" />
        </el-form-item>
        <el-form-item label="移交部门:">
          <el-input :value="info.transferUnit" />
        </el-form-item>
        <el-form-item label="移交时间:">
          <el-input :value="info.transferTime" />
        </el-form-item>
        <el-form-item label="移交说明:">
          <el-input :value="info.remark" />
        </el-form-item>
        <div class="icon-title">
          <span class="span" />检查情况
        </div>
        <el-form-item label="检查项目:">
          <el-input :value="info.itemName" />
        </el-form-item>
        <el-form-item label="检查项分类:">
          <el-input :value="info.categoryName" />
        </el-form-item>
        <el-form-item label="危险等级:">
          <el-input :value="info.riskLevel===null ? '' : Number(info.riskLevel) === 1 ? '危险' : '重大'" />
        </el-form-item>
        <el-form-item label="是否存在问题:">
          <el-input :value="Number(info.isProblem) === 1 ? '存在问题' : (Number(info.isProblem) === 2 ? '存在隐患' : '检查正常')" />
        </el-form-item>
        <el-form-item label="检查图片文件 :">
          <Images
            v-for="(item, index) in info.checkPicture"
            :key="index"
            :ref="`images${index}`"
            height="100px"
            fit="contain"
            :url="item"
          />
        </el-form-item>
        <el-form-item label="违规行为:">
          <span
            v-for="(item, index) in info.safetyTargetItemViolationVoList"
            :key="index"
          >{{ index + 1 }}、{{ item.categoryName }}</span>
        </el-form-item>
        <el-form-item label="检查情况:">
          <el-input :value="info.inspectSituation" />
        </el-form-item>
        <el-form-item label="是否需要整改:">
          <el-input :value="Number(info.isRectification) === 1 ? '是' : '否'" />
        </el-form-item>
        <el-form-item label="整改时间要求:">
          <el-input :value="info.timeRequirement" />
        </el-form-item>
        <el-form-item label="整改截止时间:">
          <el-input :value="info.deadlineDate" />
        </el-form-item>
        <el-form-item label="整改要求:">
          <el-input :value="info.rectificationRequirement" />
        </el-form-item>
      </el-form>
      <div class="backstage-edit-btn">
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
import Images from '@/components/images'
import { findById } from '@/api/general-services/safety-supervision-and-inspection/transferRecord'
export default {
  components: {
    Images
  },
  data() {
    return {
      info: {}
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    res.data.checkPicture = res.data.checkPicture ? JSON.parse(res.data.checkPicture) : []
    this.info = res.data
  },
  methods: {
    /**
     * 下载
     */
    handleDownload(index, item) {
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .one-column-input-table {
        display: flex;
        margin: 20px 0;
        padding-left: 20px;
        flex-wrap: wrap;

        .el-form-item {
            width: 100%;
            background-color: #ffffff;
        }
    }
}
</style>
