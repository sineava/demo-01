<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>监管装备详情</span>
    </div>
    <div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="装备名称:">{{ ruleForm.name }}</el-descriptions-item>
        <el-descriptions-item label="装备类型:">{{ ruleForm.type }}</el-descriptions-item>
        <el-descriptions-item label="所属部门:">{{ ruleForm.managementName }}</el-descriptions-item>
        <el-descriptions-item label="管理人:">{{ ruleForm.personName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话:">{{ ruleForm.personPhone }}</el-descriptions-item>
        <el-descriptions-item label="装备数量:">{{ ruleForm.amount }}</el-descriptions-item>
        <el-descriptions-item label="装备图片:" style="width: 100%;">
          <div style="display: flex; flex-wrap: wrap;">
            <Images
              v-for="(img, index) in ruleForm.filePath"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              style="margin: 0 10px 10px 0"
              fit="cover"
              :url="img"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/general-services/supervisory-capability/equipment'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const detailId = this.$route.query.id
    this.fetchData(detailId)
  },
  methods: {
    async fetchData(detailId) {
      getDetail({ id: detailId }).then(res => {
        if (res.data) {
          const {
            name,
            type,
            managementName,
            personName,
            personPhone,
            amount,
            filePath
          } = res.data
          this.ruleForm = {
            name,
            type,
            managementName,
            personName,
            personPhone,
            amount,
            filePath: filePath ? JSON.parse(filePath) : []
          }
        }
      })
    }
  }
}
</script>
