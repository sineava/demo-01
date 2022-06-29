<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="管理人员信息详情页" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title"><span class="span" />人员基础信息</div>
      <el-descriptions
        :column="3"
        class="descriptions"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="姓名:">{{ ruleForm.name }}</el-descriptions-item>
        <el-descriptions-item label="性别:">{{ ruleForm.sex === '1' ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="身份证号:">{{ ruleForm.idCard }}</el-descriptions-item>
        <el-descriptions-item label="出生年月:">{{ ruleForm.birthDate }}</el-descriptions-item>
        <el-descriptions-item label="职务:">{{ ruleForm.post }}</el-descriptions-item>
        <el-descriptions-item label="职称:">{{ ruleForm.position }}</el-descriptions-item>
        <el-descriptions-item label="所属机构:">{{ ruleForm.departmentName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话:">{{ ruleForm.phone }}</el-descriptions-item>
        <el-descriptions-item label="联系地址:" :span="3">{{ ruleForm.address }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱:">{{ ruleForm.email }}</el-descriptions-item>
        <el-descriptions-item label="传真:">{{ ruleForm.fax }}</el-descriptions-item>
        <el-descriptions-item label="是否党员:">{{ ruleForm.isPartyMember ? '是' : '否' }}</el-descriptions-item>
        <el-descriptions-item label="头像:" :span="3">
          <div class="img-wrapper">
            <Images
              v-for="(item, index) in ruleForm.photo"
              :key="index"
              :ref="`images${index}`"
              height="100px"
              fit="cover"
              type="avatar"
              :url="item.url"
            />
            <img
              v-if="ruleForm.isPartyMember"
              class="img-tip"
              src="../../../../assets/dangyuan.png"
            />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="备注:">{{ ruleForm.remark }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px;" class="icon-title"><span class="span" />人员持证信息</div>
      <el-descriptions
        :column="2"
        class="descriptions"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="适任证书类型:">{{ ruleForm.certificateType }}</el-descriptions-item>
        <el-descriptions-item label="适任证书编号:">{{ ruleForm.certificateCode }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px;" class="icon-title"><span class="span" />证书附件</div>
      <el-table
        :data="ruleForm.filePath"
        stripe
        fit
        highlight-current-row
        class="table-border"
        style="margin-top:0"
      >
        <el-table-column prop="fileName" label="文件名">
          <template v-slot="scope">
            {{ scope.row.fileName }}
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" label="大小">
          <template v-slot="scope">
            {{
              parseInt(scope.row.fileSize) / 1024 > 0.1
                ? (parseInt(scope.row.fileSize) / 1024).toFixed(2) + "MB"
                : scope.row.fileSize + "KB"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="上传时间">
          <template v-slot="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
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
    </div>
  </el-card>
</template>
<script>
import { getDetail } from "@/api/general-services/supervisory-capability/management-person";
import { downloadCodeImg } from "@/utils/index";
import Images from "@/components/images";
export default {
  components: {
    Images,
  },
  data() {
    return {
      ruleForm: {},
    };
  },
  created() {
    const { id, type } = this.$route.query;
    this.type = type;
    if (id) {
      this.fetchDetail(id);
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      const res = await getDetail({ id });
      if (!res.data) return;
      this.ruleForm = {
        ...res.data,
        photo: res.data.photo ? JSON.parse(res.data.photo) : [],
        filePath: res.data.filePath ? JSON.parse(res.data.filePath) : [],
      };
      this.ruleForm.departmentName = this.$route.query.departmentName;
    },
    /**
     * 下载
     */
    handleDownload(index, item) {
      downloadCodeImg(item.filePath);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .img-wrapper {
  position: relative;

  .img-icon {
    border-radius: 4px;
    width: 120px;
    height: 120px;
  }

  .img-tip {
    position: absolute;
    top: 86px;
    left: 87px;
    width: 46px;
    height: 48px;
  }
}
.descriptions {
  margin-bottom: 20px;

  /deep/ .business-title {
      width: 8%;
      font-weight: 700;
      line-height: 30px;
      text-align: right;
      color: #606266;
  }

  /deep/ .business-text {
      width: 25%;
      line-height: 30px;
  }
}
</style>
