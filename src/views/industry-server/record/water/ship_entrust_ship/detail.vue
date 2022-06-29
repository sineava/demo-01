<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业船舶变更备案详情页" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 企业基本资料
    </div>
    <div style="margin-bottom: 20px; color: #666666;">
      船舶管理企业名称 ：{{ info.enterpriseName }}
    </div>
    <div class="icon-title">
      <span class="span" /> 变更的船舶
    </div>
    <expand-table :table-list="shipBeforeChangeInfoDtoList" />
    <div
      style="margin-top: 20px;"
      class="icon-title"
    >
      <span class="span" /> 变更后的船舶
    </div>
    <expand-table :table-list="shipAfterChangeInfoDtoList" />
    <div
      style="margin-top: 20px;"
      class="icon-title"
    >
      <span class="span" />附件
    </div>
    <common-table
      :table-data="enclosureInfo"
      show-download
    />

    <div
      v-if="isEdit"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 备案审核
      </div>
      <el-form
        ref="ruleForm"
        size="medium"
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        class="table-top-column-there"
      >
        <el-form-item
          label="备案审核:"
          prop="isStatus"
        >
          <el-radio-group v-model="ruleForm.isStatus">
            <el-radio :label="3">
              业务办理
            </el-radio>
            <el-radio :label="2">
              退回
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="审核意见:"
          style="width: 100%;"
          prop="reviewedOpinion"
        >
          <el-input
            v-model.trim="ruleForm.reviewedOpinion"
            type="textarea"
            :rows="6"
            placeholder="请输入审核意见"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <upload
          style="width: 100%;"
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
        <common-table
          :table-data="reviewedFile"
          show-download
          show-delete
          @handleDelete="handleDelete"
        />
      </el-form>
    </div>
    <div
      v-if="info.isStatus >= 2"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
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
        <el-descriptions-item label="审核状态">{{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}</el-descriptions-item>
        <el-descriptions-item label="审核人">{{ info.reviewedBy }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ info.reviewedDate }}</el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="3">
          {{ info.reviewedOpinion }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />审核附件
      </div>
      <common-table
        :table-data="info.reviewedFile"
        show-download
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
      </el-button>
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
import upload from '@/components/upload'
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/ship-manage-en-ship-change-filing'
import { momentDate } from '@/utils/index'
import CommonTable from '@/components/features/FileTable.vue'
import ExpandTable from './ExpandTable.vue'
export default {
  components: {
    upload,
    CommonTable,
    ExpandTable
  },
  data() {
    return {
      ruleForm: {
        id: '',
        isStatus: '',
        reviewedBy: '',
        reviewedOpinion: ''
      },
      rules: {
        isStatus: [
          { required: true, message: '请选择备案审核', trigger: 'change' }
        ]
      },
      reviewedFile: [],
      dialogVisible: false,
      dialogList: [],
      dialogType: 1,
      activeIndex: '',
      shipBeforeChangeInfoDtoList: [], // 变更前table数据
      shipAfterChangeInfoDtoList: [], // 变更后table数据
      info: {},
      loading: false,
      isEdit: false,
      enclosureInfo: []
    }
  },
  async mounted() {
    // 查询详情
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    if (this.$route.query.id) {
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      this.enclosureInfo = info.data.enclosureInfo
      this.shipBeforeChangeInfoDtoList = info.data.shipBeforeChangeInfoDtoList
      this.shipAfterChangeInfoDtoList = info.data.shipAfterChangeInfoDtoList
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      let data = { ...this.ruleForm }
      data.reviewedFile = JSON.stringify(this.reviewedFile)
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 30%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
}

.table-add {
    border: 1px solid #ebeef5;
    border-top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #666666;
    cursor: pointer;
}

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
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
        width: 20%;
        line-height: 30px;
    }
}
</style>
