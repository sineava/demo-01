<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>制度详情</span>
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="文件名：">
        {{ ruleForm.regimeName }}
      </el-descriptions-item>
      <el-descriptions-item label="制度类型：">
        {{ ruleForm.regimeType }}
      </el-descriptions-item>
      <el-descriptions-item label="适用机构：">
        {{ ruleForm.applicableAgenciesName }}
      </el-descriptions-item>
      <el-descriptions-item label="编制时间：">
        {{ ruleForm.createTime }}
      </el-descriptions-item>
      <el-descriptions-item label="编制部门：">
        {{ ruleForm.departmentName }}
      </el-descriptions-item>
      <el-descriptions-item label="编制负责人：">
        {{ ruleForm.principal }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话：">
        {{ ruleForm.principalPhone }}
      </el-descriptions-item>
      <el-descriptions-item label="有效期至：">
        {{ ruleForm.validityTime }}
      </el-descriptions-item>
      <el-descriptions-item label="文件页数：">
        {{ ruleForm.pages }}
      </el-descriptions-item>
      <el-descriptions-item label="备注：">
        {{ ruleForm.remark }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />附件下载
      </div>
      <FileTable
        :show-download="true"
        :table-data="ruleForm.filePath"
      />
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
import { managementRegimeQuery } from '@/api/general-services/supervisory-capability/management-regime'
import { downloadCodeImg } from '@/utils/index'
import FileTable from '@/components/features/FileTable'
export default {
  components: {
    FileTable,
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    const { id } = this.$route.query
    managementRegimeQuery({ id }).then(res => {
      if (res.code === '0') {
        const {
          regimeName,
          regimeType,
          createTime,
          managementId,
          principal,
          principalPhone,
          validityTime,
          pages,
          remark,
          filePath
        } = res.data
        this.ruleForm = {
          regimeName,
          regimeType,
          createTime,
          managementId,
          principal,
          principalPhone,
          validityTime,
          pages,
          remark,
          filePath: JSON.parse(filePath),
          applicableAgenciesName: this.$route.query.applicableAgenciesName,
          departmentName: this.$route.query.departmentName
        }
      }
    })
  },
  methods: {
    // 下载
    handleDownload(item) {
      downloadCodeImg(item.filePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;

            .el-input--medium /deep/ .el-input__inner {
                border: none;
            }
        }
    }
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 5%;
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
