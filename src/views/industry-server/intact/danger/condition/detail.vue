<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全条件审查信息详情页</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />建设项目基本信息
          </div>
        </el-form-item>
        <el-form-item
          label="申请单位名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="审查结果:"
          prop="reviewResult"
        >
          <el-input
            v-model.trim="ruleForm.reviewResult"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="principal"
        >
          <el-input
            v-model.trim="ruleForm.principal"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contact"
        >
          <el-input
            v-model.trim="ruleForm.contact"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="phone"
        >
          <el-input
            v-model.trim="ruleForm.phone"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="审查申请时间:"
          prop="applyTime"
        >
          <el-input
            v-model.trim="ruleForm.applyTime"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="申请原因:"
          prop="applyReason"
        >
          <el-input
            v-model.trim="ruleForm.applyReason"
            disabled
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label-width="0"
        >
          <div class="icon-title">
            <span class="span" />附件下载
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePath"
            show-download
          />
        </el-form-item>
      </el-form>
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
import commonTable from '@/components/features/FileTable'
import { queryDetail } from '@/api/port-services/construction-dangerous-goods/safety-condition-review'
export default {
  components: {
    commonTable
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const { id } = this.$route.query
    this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            reviewResult: res.data.reviewResult ? '通过' : '未通过',
            applyTime: res.data.applyTime ? res.data.applyTime.replace('T', ' ') : '',
            filePath: res.data.filePath ? JSON.parse(res.data.filePath) : []
          }
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/conditions' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input.is-disabled /deep/ .el-input__inner {
    border: none;
}
</style>
