<template>
  <div class="detail-wrapper">
    <el-card class="body-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{ ruleForm.name }}-专家详情</span>
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
        <el-descriptions-item label="头像" :span="3">
          <Images
            ref="images"
            fit="cover"
            :url="ruleForm.photo ? ruleForm.photo.url : circleUrl"
          />
        </el-descriptions-item>
        <el-descriptions-item label="专家名称">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="所属部门">
          {{ ruleForm.departmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="出生年月">
          {{ ruleForm.dateBirth }}
        </el-descriptions-item>
        <el-descriptions-item label="专家类别">
          {{ ruleForm.category }}
        </el-descriptions-item>
        <el-descriptions-item label="职务">
          {{ ruleForm.post }}
        </el-descriptions-item>
        <el-descriptions-item label="技术职称">
          {{ ruleForm.technicalTitle }}
        </el-descriptions-item>
        <el-descriptions-item label="工作单位位及部门">
          {{ ruleForm.departmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="现从事岗位">
          {{ ruleForm.currentPosition }}
        </el-descriptions-item>
        <el-descriptions-item label="所学专业">
          {{ ruleForm.major }}
        </el-descriptions-item>
        <el-descriptions-item label="固定电话">
          {{ ruleForm.fixedPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="移动电话">
          {{ ruleForm.mobilePhone }}
        </el-descriptions-item>
        <el-descriptions-item label="E-mail">
          {{ ruleForm.email }}
        </el-descriptions-item>
        <el-descriptions-item label="主要安全工作业绩" :span="3">
          <div v-html="ruleForm.mainAchievements" />
        </el-descriptions-item>
      </el-descriptions>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      ruleForm: {}
    }
  },
  created() {
    const item = this.$route.query.item
    if (item) {
      item.photo = item.photo ? JSON.parse(item.photo)[0] : ''
      const {
        name,
        category,
        post,
        technicalTitle,
        departmentName,
        currentPosition,
        major,
        fixedPhone,
        mobilePhone,
        email,
        photo,
        dateBirth,
        mainAchievements
      } = item
      this.ruleForm = {
        name,
        category,
        post,
        technicalTitle,
        departmentName,
        currentPosition,
        major,
        fixedPhone,
        mobilePhone,
        email,
        photo,
        dateBirth,
        mainAchievements
      }
    }
  },
  methods: {
    returnBack() {
      this.$router.back(-1)
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
        padding-bottom: 0;
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
