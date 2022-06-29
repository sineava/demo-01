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
    <div class="icon-title">
      <span class="span" /> 基本信息
    </div>
    <div class="list-column-wrap">
      <div class="info-list" style="width: 100%;">
        <div class="label">
          企业名称 :
        </div><div class="content">
          {{ info.targetName }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          检查项目 :
        </div><div class="content">
          {{ info.itemName }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          移交部门 :
        </div><div class="content">
          {{ info.transferUnit }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          移交时间 :
        </div><div class="content">
          {{ info.transferTime }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          移交说明 :
        </div><div class="content">
          {{ info.remark }}
        </div>
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /> 检查情况
    </div>
    <div class="list-column-wrap">
      <div class="info-list" style="width: 100%;">
        <div class="label">
          检查项目 :
        </div><div class="content">
          {{ info.itemName }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          检查项分类 :
        </div><div class="content">
          {{ info.categoryName }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          危险等级 :
        </div><div class="content">
          {{ !info.riskLevel ? '' : info.riskLevel===1?'一般':'重大' }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          是否存在问题 :
        </div><div class="content">
          {{ info.isProblem===0?'检查正常':(info.isProblem===1?'存在问题':'存在隐患') }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          检查图片文件 :
        </div><div class="content" style="display: flex;">
          <!-- <img
            v-for="(item,index) in info.checkPicture"
            :key="index"
            style="width:40px;height:40px;margin-left:5px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          > -->
          <Images
            v-for="(item,index) in info.checkPicture"
            :key="index"
            ref="images"
            height="50px"
            width="50px"
            fit="contain"
            :url="item"
          />
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          违规行为 :
        </div><div class="content">
          <div
            v-for="(item,index) in info.safetyTargetItemViolationVoList"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          是否需要整改 :
        </div><div class="content">
          {{ info.isRectification?'是':'否' }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          整改时间要求 :
        </div><div class="content">
          {{ info.timeRequirement }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          整改截止时间 :
        </div><div class="content">
          {{ info.deadlineDate }}
        </div>
      </div>
      <div class="info-list" style="width: 100%;">
        <div class="label">
          整改要求 :
        </div><div class="content">
          {{ info.rectificationRequirement }}
        </div>
      </div>
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
import Images from '@/components/images'
import { getDetails } from '@/api/general-services/enterprise-self-ledger/dangertransfer'
export default {
  components: {
    Images
  },
  data() {
    return {
      info: {},
    }
  },
  async mounted() {
    this.info = (await getDetails(this.$route.query.id)).data
    try {
      this.info.checkPicture = JSON.parse(this.info.checkPicture) || []
    } catch (e) {
      console.log()
    }
  }
}
</script>
