<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>制度详情</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />制度基础信息
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
        <el-descriptions-item label="文件名：">
          {{ ruleForm.regimeName }}
        </el-descriptions-item>
        <el-descriptions-item label="制度类型：">
          {{ ruleForm.regimeType }}
        </el-descriptions-item>
        <el-descriptions-item label="适用机构：">
          {{ ruleForm.applicableAgenciesId
            ? options.filter(x => ruleForm.applicableAgenciesId.split(',').map(x => Number(x)).includes(x.value)).map(x => x.label).join(',')
            : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="编制部门：">
          {{ ruleForm.compile }}
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
      <div class="icon-title">
        <span class="span" />文件附件
      </div>
      <FileTable
        show-download
        :table-data="fileList"
      />
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
import FileTable from '@/components/features/FileTable'
import { getManagementDepartmentLikeName } from '@/api/general-services/supervisory-capability/management-department'
import { managementRegimeQuery } from '@/api/general-services/supervisory-capability/management-regime'
export default {
  components: {
    FileTable
  },
  data() {
    return {
      ruleForm: {},
      options: [],
      fileList: []
    }
  },
  created() {
    const { id } = this.$route.query
    this.fetchDepts()
    this.getDetail(id)
    console.log(this.ruleForm, this.options)
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      // 传''查询全部
      const res = await getManagementDepartmentLikeName({ departmentName: '' })
      this.options = res.data?.map(dept => {
        return {
          label: dept.departmentName,
          value: dept.id,
          enterpriseId: dept.enterpriseId
        }
      })
    },
    // 查询详情
    async getDetail(detailId) {
      const data = (await managementRegimeQuery({ id: detailId }))?.data
      if (!data) return
      this.ruleForm = {
        ...data,
        departmentId: Number(data?.departmentId),
        filePath: JSON.parse(data?.filePath || '[]')
      }
      this.fileList = this.ruleForm?.filePath
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
