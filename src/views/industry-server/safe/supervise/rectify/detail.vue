<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="整改记录详情" />
      </span>
    </div>
    <!-- <p
      v-if="info.reviewTime"
      style="font-size: 14px;"
    >
      复查时间: {{ info.reviewTime }}
    </p> -->
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />检查记录
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
        <el-descriptions-item label="检查项目:">
          {{ info.itemName }}
        </el-descriptions-item>
        <el-descriptions-item label="检查项分类:">
          {{ info.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="危险等级:">
          {{ info.riskLevel ? (info.riskLevel === 1 ? '一般' : '重大') : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="违规行为:">
          <span
            v-for="(item, index) in info.safetyTargetItemViolationVoList"
            :key="index"
          >{{ index + 1 }} 、{{ item.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="整改时间要求:">
          {{ info.timeRequirement }}
        </el-descriptions-item>
        <el-descriptions-item label="整改截止时间:">
          {{ info.deadlineDate }}
        </el-descriptions-item>
        <el-descriptions-item label="检查情况:">
          {{ info.inspectSituation }}
        </el-descriptions-item>
        <el-descriptions-item label="检查图片:" :span="3">
          <div style="display: flex; flex-wrap: wrap;">
            <Images
              v-for="(pic, index) in info.checkPicture"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              fit="cover"
              :url="pic"
              style="margin: 0 10px 10px 0"
            />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="整改要求:" :span="3">
          {{ info.rectificationRequirement }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />整改情况
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
        <el-descriptions-item label="是否整改:">
          {{ info.isStatus===0?'未整改':'已整改' }}
        </el-descriptions-item>
        <el-descriptions-item label="整改时间:">
          {{ info.improvedDate }}
        </el-descriptions-item>
        <el-descriptions-item label="整改落实资金:">
          {{ info.fund }}
        </el-descriptions-item>
        <el-descriptions-item label="整改责任人:" :span="3">
          {{ info.directorName }}
        </el-descriptions-item>
        <el-descriptions-item label="整改措施:" :span="3">
          {{ info.improvementMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="应急保证措施:" :span="3">
          {{ info.emergencyMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="整改图片:" :span="3">
          <div style="display: flex; flex-wrap: wrap;">
            <Images
              v-for="(pic, index) in info.improvementPicture"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              fit="contain"
              :url="pic"
              style="margin: 0 10px 10px 0"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script>
import Images from '@/components/images'
import { findById } from '@/api/general-services/safety-supervision-and-inspection/improvementRecord'
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
    res.data.improvementPicture = res.data.improvementPicture ? JSON.parse(res.data.improvementPicture) : []
    this.info = res.data
  },
  methods: {
    // 返回
    returnBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
// .basic-detail {
//     .three-column-input-table {
//         display: flex;
//         margin: 20px 0;
//         flex-wrap: wrap;

//         .el-form-item {
//             padding: 10px 0;
//             width: 33.3%;
//             background-color: #ffffff;

//             .el-input--medium .el-input__inner {
//                 border: none;
//             }
//         }
//     }
// }
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
</style>
