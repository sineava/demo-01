<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理人员信息详情页</span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />人员基础信息
      </div>
      <div class="img-wrapper" style="padding-left: 40px;">
        <Images
          v-for="(item, index) in ruleForm.photo"
          :key="index"
          :ref="`images${index}`"
          height="100px"
          width="100px"
          type="avatar"
          :url="item.url"
        />
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
        <el-descriptions-item label="姓名：">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="性别：">
          {{ ruleForm.sex === '1' ? '男' : (ruleForm.sex === '0' ? '女' : '') }}
        </el-descriptions-item>
        <el-descriptions-item label="身份证号：">
          {{ ruleForm.idCard }}
        </el-descriptions-item>
        <el-descriptions-item label="出生年月：">
          {{ ruleForm.birthDate }}
        </el-descriptions-item>
        <el-descriptions-item label="职务：">
          {{ ruleForm.post }}
        </el-descriptions-item>
        <el-descriptions-item label="职称：">
          {{ ruleForm.position }}
        </el-descriptions-item>
        <el-descriptions-item label="所属机构：">
          {{ ruleForm.departmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="联系地址：">
          {{ ruleForm.address }}
        </el-descriptions-item>
        <el-descriptions-item label="电子邮箱：">
          {{ ruleForm.email }}
        </el-descriptions-item>
        <el-descriptions-item label="传真：">
          {{ ruleForm.fax }}
        </el-descriptions-item>
        <el-descriptions-item label="备注：">
          {{ ruleForm.remark }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />人员持证信息
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
        <el-descriptions-item label="适任证书类型：">
          {{ ruleForm.certificateType }}
        </el-descriptions-item>
        <el-descriptions-item label="适任证书编号：">
          {{ ruleForm.certificateCode }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        size="medium"
        hide-required-asterisk
        class="table-column three"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />证书附件
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-table
            :data="ruleForm.filePath"
            stripe
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              prop="fileName"
              label="文件名"
              :show-overflow-tooltip="true"
            >
              <template v-slot="scope">
                {{ scope.row.fileName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="fileSize"
              label="大小"
              :show-overflow-tooltip="true"
              width="150"
            >
              <template v-slot="scope">
                {{ parseInt(scope.row.fileSize)/1024 > 0.1 ? (parseInt(scope.row.fileSize)/1024).toFixed(2) + 'MB' : scope.row.fileSize+'KB' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="上传时间"
              :show-overflow-tooltip="true"
              width="150"
            >
              <template v-slot="scope">
                {{ scope.row.createTime }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
            >
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleDownload(scope.$index, scope.row)"
                >
                  <em class="el-icon-download" /> 下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
import { getDetail } from '@/api/general-services/supervisory-capability/management-person'
import { downloadCodeImg } from '@/utils/index'
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
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      const res = await getDetail({ id })
      if (!res.data) return
      this.ruleForm = {
        ...res.data,
        photo: res.data.photo ? JSON.parse(res.data.photo) : [],
        filePath: res.data.filePath ? JSON.parse(res.data.filePath) : []
      }
      this.ruleForm.departmentName = this.$route.query.departmentName
    },
    /**
     * 下载
     */
    handleDownload(index, item) {
      downloadCodeImg(item.filePath)
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
