<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全设施设计审查受理</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本信息
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
        <el-descriptions-item label="申请单位名称：">
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="项目名称：">
          {{ ruleForm.projectName }}
        </el-descriptions-item>
        <el-descriptions-item label="负责人：">
          {{ ruleForm.declarePrincipal }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人：">
          {{ ruleForm.declareContact }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.declarePhone }}
        </el-descriptions-item>
        <el-descriptions-item label="审查申请时间：">
          {{ ruleForm.applyTime }}
        </el-descriptions-item>
        <el-descriptions-item label="申请原因：">
          {{ ruleForm.applyReason }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="建设项目安全设施设计专篇文件附件:"
          prop="filePathE"
          label-width="200"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathE"
            payload="file1"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="选址意见书附件:"
          prop="filePathC"
          label-width="400"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathC"
            payload="file2"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="当地公安机关消防机构的消防设计审查文件附件:"
          prop="filePathD"
          label-width="400"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathD"
            payload="file3"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="安全设施设计审查意见书附件:"
          prop="filePathA"
          label-width="400"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathA"
            payload="file4"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />受理意见
          </div>
        </el-form-item>
        <el-form-item
          label="受理意见:"
          prop="acceptOpinion"
        >
          {{ ruleForm.acceptOpinion }}
        </el-form-item>
        <el-form-item label="" />
        <el-form-item
          label="审批状态:"
          prop="reviewState"
        >
          <span v-if="ruleForm.reviewState === 3">审核通过</span>
          <span v-if="ruleForm.reviewState === 4">退回</span>
        </el-form-item>
        <el-form-item
          label="审批意见:"
          prop="auditOpinion"
        >
          {{ ruleForm.auditOpinion }}
        </el-form-item>
        <el-form-item
          v-if="type !== 'detail'"
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />办理意见
          </div>
        </el-form-item>
        <el-form-item
          v-if="type !== 'detail'"
          label="业务办理:"
          prop="isPass"
        >
          <el-select
            v-model="ruleForm.isPass"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in isPass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type !== 'detail'"
          label="办理意见:"
          prop="auditOpinion"
          style="width: 100%;"
          :rules="{ required: true, message: '请输入办理意见', trigger: 'blur' }"
        >
          <el-input
            v-model.trim="ruleForm.auditOpinion"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
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
import { queryDetail } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
import { portSafetyFacilityDesignReview } from '@/utils/public-fields'
export default {
  components: {
    commonTable
  },
  mixins: [portSafetyFacilityDesignReview],
  data() {
    return {
      type: '',
      ruleForm: {}
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            filePathA: res.data.filePathA ? JSON.parse(res.data.filePathA) : [],
            filePathB: res.data.filePathB ? JSON.parse(res.data.filePathB) : [],
            filePathC: res.data.filePathC ? JSON.parse(res.data.filePathC) : [],
            filePathD: res.data.filePathD ? JSON.parse(res.data.filePathD) : [],
            filePathE: res.data.filePathE ? JSON.parse(res.data.filePathE) : []
          }
        }
      })
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
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
