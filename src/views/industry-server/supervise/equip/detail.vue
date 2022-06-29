<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="监管装备详情" />
      </span>
    </div>
    <div class="basic-detail-2">
      <el-form
        ref="ruleForm"
        label-width="160px"
        size="medium"
        hide-required-asterisk
        class="one-column-input-table"
        disabled
      >
        <el-form-item
          label="装备名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" placeholder="请输入装备名称" />
        </el-form-item>
        <el-form-item
          label="装备类型:"
          prop="type"
        >
          <el-input v-model.trim="ruleForm.type" placeholder="请输入装备类型" />
        </el-form-item>
        <el-form-item
          label="所属部门:"
          prop="key"
        >
          <el-input v-model.trim="ruleForm.managementName" placeholder="请输入所属部门" />
        </el-form-item>
        <!-- <el-form-item
          label="管理人:"
          prop="personName"
        >
          <el-input v-model.trim="ruleForm.personName" placeholder="请输入管理人" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="personPhone"
        >
          <el-input v-model.trim="ruleForm.personPhone" placeholder="请输入联系电话" />
        </el-form-item> -->
        <el-form-item
          label="装备数量:"
          prop="amount"
        >
          {{ ruleForm.amount }}
        </el-form-item>
        <el-form-item
          label="装备图片:"
          prop="filePath"
        >
          <Images
            v-for="(img, index) in ruleForm.filePath"
            :key="index"
            :ref="`images${index}`"
            height="100px"
            fit="contain"
            :url="img"
          />
        </el-form-item>
      </el-form>
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
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {

          return false
        }
      })
    },
    /**
     * 下载
     */
    handleDownload(index, item) {
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail-2 {
    .one-column-input-table {
        display: flex;
        margin: 20px 0;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 100%;
            background-color: #ffffff;
        }
    }

    .progress-wrapper {
        display: flex;
        padding: 60px;
        font-size: 14px;

        .info-wrapper {
            display: flex;

            .avatar {
                padding: 10px;
            }

            .info {
                display: flex;
                margin-left: 10px;
                height: 100px;
                flex-direction: column;
                justify-content: space-evenly;

                .company {
                    font-weight: bold;
                }
            }
        }

        .type {
            margin: 10px auto;
            font-weight: bold;
        }

        .datetime {
            padding-top: 10px;
            font-size: 12px;
            color: #999999;
        }
    }
}
</style>
