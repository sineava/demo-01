<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>专项验收信息审核</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />建设项目基本信息
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
          {{ ruleForm.applyProjectName }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人：">
          {{ ruleForm.applyContact }}
        </el-descriptions-item>
        <el-descriptions-item label="负责人：">
          {{ ruleForm.applyPrincipal }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.applyPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="工程起止时间：">
          {{ ruleForm.projectStartStopTime ? ruleForm.projectStartStopTime.join(' - ') : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="单位地址：">
          {{ ruleForm.applyAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="邮编：">
          {{ ruleForm.applyPostcode }}
        </el-descriptions-item>
        <el-descriptions-item label="港口建设项目概况：">
          {{ ruleForm.generalize }}
        </el-descriptions-item>
        <el-descriptions-item label="装卸/储存主要危险货物品名：">
          {{ ruleForm.goodsName }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="安全条件审查意见书附件:"
          prop="filePathB"
          label-width="200"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathB"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="安全设施设计审查意见书附件:"
          prop="filePathA"
          label-width="200"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathA"
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
        <template v-if="ruleForm.acceptanceState">
          <el-form-item
            label="审批状态:"
            prop="reviewState"
          >
            <el-select
              v-model="ruleForm.acceptanceState"
              clearable
              placeholder="请选择"
              style="width: 100%;"
              disabled
            >
              <el-option
                v-for="item in acceptanceState"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="审批意见:"
            prop="auditOpinion"
          >
            <el-input
              v-model="ruleForm.auditOpinion"
              disabled
            />
          </el-form-item>
        </template>
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
          :rules="[{ required: true, message: '请输入办理意见', trigger: 'blur' }]"
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
import { getDetail } from '@/api/port-services/construction-dangerous-goods/safety-facility-acceptance'
export default {
  components: {
    commonTable
  },
  data() {
    return {
      type: '',
      ruleForm: {},
      rules: {
        isPass: [
          { required: true, message: '请选择业务办理', trigger: 'blur' }
        ]
      },
      acceptanceState: [
        { value: 1, label: '已受理' },
        { value: 2, label: '审核中' },
        { value: 3, label: '审核通过' },
        { value: 4, label: '退回' }
      ],
      isPass: [
        { value: 3, label: '通过' },
        { value: 4, label: '退回' }
      ]
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      getDetail({ id }).then(res => {
        if (res.code === '0') {
          this.ruleForm = {
            ...res.data,
            projectStartStopTime: [res.data.projectStartTime, res.data.projectEndTime],
            filePathA: res.data.filePathA ? JSON.parse(res.data.filePathA) : [],
            filePathB: res.data.filePathB ? JSON.parse(res.data.filePathB) : []
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
