<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="检查计划详情" />
      </span>
    </div>
    <div class="cert-basic-detail">
      <div class="icon-title">
        <span class="span" />基本资料
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
        <el-descriptions-item label="计划名称:" :span="3">{{ ruleForm.planningName }}</el-descriptions-item>
        <el-descriptions-item label="计划类型:" :span="3">{{ ruleForm.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="计划检查时间:" :span="3">{{ ruleForm.planningTime }}</el-descriptions-item>
        <el-descriptions-item label="检查单位:" :span="3">
          <el-tag v-for="(item,index) in ruleForm.isUseUnit" :key="index" style="margin: 5px;"> {{ item ? item[item.length-1] : '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="检查项:" :span="3">
          <el-table
            :data="safetyTargetInfoDtoList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              label="检查项"
              align="center"
              prop="name"
            />
            <el-table-column
              label="检查项分类"
              align="center"
              prop="categoryName"
            />
            <el-table-column
              label="检查内容"
              align="center"
              prop="content"
            />
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="检查人员:" :span="3">
          <el-table
            :data="tableInspectorList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              label="姓名"
              prop="name"
            />
            <el-table-column
              label="手机号码"
              prop="mobilePhone"
            />
            <el-table-column
              label="职务"
              prop="post"
            >
              <template v-slot="scope">
                {{ scope.row.post }}
              </template>
            </el-table-column>
            <el-table-column
              label="所属单位"
              prop="departmentName"
            />
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="是否邀请专家:" :span="3">{{ ruleForm.isExpertInvited?'是':'否' }}</el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.isExpertInvited" label="专家人员:" :span="3">
          <el-table
            :data="tableExpertSelectList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              label="姓名"
              prop="name"
            />
            <el-table-column
              label="手机号码"
              prop="mobilePhone"
            />
            <el-table-column
              label="职务"
              prop="post"
            />
            <el-table-column
              label="工作单位及部门"
              prop="departmentName"
            />
            <el-table-column
              label="技术职称"
              prop="technicalTitle"
            />
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="检查备注:" :span="3">{{ ruleForm.remark }}</el-descriptions-item>
      </el-descriptions>
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
import { findEnById } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
export default {
  data() {
    return {
      ruleForm: {
        categoryName: '',
        planningName: '',
        planningTime: '',
        inspectionTarget: 1,
        isUseUnit: '重庆市港航中心',
        isExpertInvited: 1,
        remark: ''
      },
      categoryList: [],
      safetyTargetInfoDtoList: [],
      tableInspectorList: [],
      tableExpertSelectList: []
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query && this.$route.query.id) {
      const data = await findEnById(this.$route.query.id)
      this.ruleForm = {
        categoryName: data.data.categoryName,
        planningName: data.data.planningName,
        planningTime: data.data.planningTime,
        inspectionTarget: data.data.inspectionTarget,
        isUseUnit: JSON.parse(data.data.isUseUnit),
        isExpertInvited: data.data.isExpertInvited,
        remark: data.data.remark
      }
      this.tableExpertSelectList = data.data.safetyExpertInfoVoList
      this.tableInspectorList = data.data.safetyInspectorInfoVoList
      this.safetyTargetInfoDtoList = data.data.safetyTargetItemInfoVOList
    }
  }
}
</script>

<style lang="scss" scoped>
.cert-basic-detail {
    /deep/ .el-table {
        margin-top: 10px;
    }

    .table-head {
        display: flex;
        margin-bottom: - 10px;
        border: 1px solid #ebeef5;
        padding: 10px 20px;
        background-color: rgba(240, 242, 245, 1);
        align-items: center;
        justify-content: space-between;

        .text-wrapper {
            font-weight: bold;
        }
    }

    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        padding-right: 50px;
        flex-wrap: wrap;

        /deep/ .el-form-item {
            width: 50%;
            background-color: #ffffff;

            .el-image {
                width: 100px;
                height: 100px;
            }
        }
    }
}

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
        width: 90%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
