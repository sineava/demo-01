<template>
  <div class="detail-wrapper">
    <el-card class="body-card info-card">
      <Images
        ref="images"
        height="60px"
        width="60px"
        fit="cover"
        :url="ruleForm.photo"
        type="avatar"
      />
      <div class="info">
        <div class="name">
          {{ ruleForm.name }}
        </div>
        <div class="detail">
          <span>{{ ruleForm.post }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="body-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>基础信息</span>
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
        <el-descriptions-item label="姓名:">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="所属机构:">
          {{ ruleForm.departmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="职务:">
          {{ ruleForm.post }}
        </el-descriptions-item>
        <el-descriptions-item label="手机:">
          {{ ruleForm.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="电话/分机:">
          {{ ruleForm.fax }}
        </el-descriptions-item>
        <el-descriptions-item label="电子邮箱:">
          {{ ruleForm.email }}
        </el-descriptions-item>
        <el-descriptions-item label="职责信息:">
          {{ ruleForm.obligation }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="basic-detail">
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
  </div>
</template>

<script>
import { getDetail } from '@/api/general-services/supervisory-capability/management-person'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      ruleForm: {},
      departmentName: ''
    }
  },
  created() {
    const detailId = this.$route.query.id
    this.departmentName = this.$route.query.departmentName
    if (detailId !== 0) this.fetchData(detailId)
  },
  methods: {
    async fetchData(detailId) {
      const res = await getDetail({ id: detailId })
      if (!res) return
      this.ruleForm = {
        ...res.data,
        photo: res.data.photo ? (JSON.parse(res.data.photo) ? JSON.parse(res.data.photo)[0].url : '') : ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-avatar {
    float: left;
}

.info {
    display: flex;
    margin-left: 20px;
    height: 60px;
    flex-direction: column;
    justify-content: space-evenly;

    .name {
        font-size: 18px;
        font-weight: bold;
    }

    .detail {
        font-size: 14px;
        color: #999999;
    }
}

.info-card {
    /deep/ .el-card__body {
        display: flex;
        align-items: center;
    }
}

.basic-detail {
    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 33.3%;
            background-color: #ffffff;

            .el-input--medium .el-input__inner {
                border: none;
            }

            .el-input.is-disabled /deep/ .el-input__inner {
                border: none;
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
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
