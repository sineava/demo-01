<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="现场检查记录详情" />
      </span>
      <span class="detail-header-button">
        <el-radio-group v-model="detailType">
            <el-radio-button label="基础情况" />
            <el-radio-button label="检查情况" />
        </el-radio-group>
      </span>
    </div>
    <div
      v-if="detailType === '基础情况'"
      class="basic-detail"
    >
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-form
        ref="ruleForm"
        label-width="160px"
        size="medium"
        hide-required-asterisk
        class="one-column-input-table"
        style="width: 50%;"
        disabled
      >
        <el-form-item label="检查企业:">
          <el-input :value="info.targetName" />
        </el-form-item>
        <el-form-item label="检查时间:">
          <el-input :value="info.planningTime" />
        </el-form-item>
        <el-form-item label="检查人员:">
          <el-input :value="info.personnel" />
        </el-form-item>
        <el-form-item label="是否邀请专家:">
          <el-input
            :value="info.isExpertInvited ? '是' : '否'"
            disabled
          />
        </el-form-item>
        <el-form-item label="专家人员:">
          <el-input
            :value="info.expertPersonnel"
            disabled
          />
        </el-form-item>
        <el-form-item label="负责单位:">
          <el-input
            :value="info.isUseUnit"
            disabled
          />
        </el-form-item>
        <el-form-item label="发布人:">
          <el-input
            :value="info.createBy"
            disabled
          />
        </el-form-item>
        <el-form-item label="检查备注:">
          <el-input
            :value="info.remark"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
    <div
      v-if="detailType === '检查情况' && info.safetyTargetItemInfoVoList.length > 0"
      class="basic-detail"
    >
      <div
        class="record"
        style="margin-top: 10px;"
      >
        <el-tabs v-model="activeIndex">
          <el-tab-pane
            v-for="(item, index) in info.safetyTargetItemInfoVoList"
            :key="item.id"
            :label="item.name"
            :name="index+''"
          />
        </el-tabs>
      </div>
      <div
        style="margin-top: 30px;"
        class="icon-title"
      >
        <span class="span" />检查情况
      </div>
      <div class="basic-detail">
        <el-form
          ref="recordForm"
          label-width="160px"
          size="medium"
          hide-required-asterisk
          class="table-column"
          style="width: 50%;"
          disabled
        >
          <el-form-item label="检查项目:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].name" />
          </el-form-item>
          <el-form-item label="检查项分类:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].categoryName" />
          </el-form-item>
          <el-form-item label="危险等级:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].riskLevel === 1 ? '一般' : '重大'" />
          </el-form-item>
          <el-form-item label="是否存在问题:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].isProblem === 0 ? '无' : (info.safetyTargetItemInfoVoList[activeIndex].isProblem === 1 ? '存在问题' : '存在隐患')" />
          </el-form-item>
          <el-form-item label="检查图片文件:">
            <Images
              v-for="(item, index) in info.safetyTargetItemInfoVoList[activeIndex].checkPicture"
              :key="index"
              :ref="`images${index}`"
              height="50px"
              width="50px"
              fit="cover"
              :url="item"
            />
          </el-form-item>
          <el-form-item label="违规行为:">
            <span
              v-for="(item, index) in info.safetyTargetItemInfoVoList[activeIndex].safetyTargetItemViolationVoList"
              :key="index"
            >
              {{ index + 1 }}、 {{ item.name }}
            </span>
          </el-form-item>
          <el-form-item label="检查情况:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].inspectSituation" />
          </el-form-item>
          <el-form-item label="是否需要整改:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].isRectification === 1 ? '是' : '否'" />
          </el-form-item>
          <el-form-item label="整改时间要求:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].timeRequirement" />
          </el-form-item>
          <el-form-item label="整改截止时间:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].deadlineDate" />
          </el-form-item>
          <el-form-item label="整改要求:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].rectificationRequirement" />
          </el-form-item>
          <el-form-item label="是否需要复查:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].isReview === 1 ? '是' : '否'" />
          </el-form-item>
          <el-form-item label="复查机构:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].organizationName" />
          </el-form-item>
          <el-form-item label="复查时间:">
            <el-input :value="info.safetyTargetItemInfoVoList[activeIndex].reviewTime" />
          </el-form-item>
        </el-form>
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
import { findById } from '@/api/general-services/safety-supervision-and-inspection/safetyInspectRecord'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      detailType: '基础情况',
      activeIndex: 0,
      info: {}
    }
  },
  async mounted() {
    const res = await findById(this.$route.query.id)
    const personnel = []
    res.data.safetyInspectorInfoVoList.forEach(element => {
      personnel.push(element.name)
    })
    res.data.personnel = personnel.join('、')
    const expertPersonnel = []
    res.data.safetyExpertInfoVoList.forEach(element => {
      expertPersonnel.push(element.name)
    })
    res.data.expertPersonnel = expertPersonnel.join('、')
    if (res.data.safetyTargetItemInfoVoList.length > 0) {
      res.data.safetyTargetItemInfoVoList.forEach(item => {
        item.checkPicture = item.checkPicture ? JSON.parse(item.checkPicture) : []
      })
    }
    this.info = res.data
  }
}
</script>
