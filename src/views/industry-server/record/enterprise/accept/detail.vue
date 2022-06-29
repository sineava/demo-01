<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="备案受理详情页" />
      </span>
    </div>
    <div class="basic-detail">
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="港口企业名称:">{{ info.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="法定代表人姓名:">{{ info.legalPerson }}</el-descriptions-item>
        <el-descriptions-item label="经营场所:">{{ info.premises }}</el-descriptions-item>
        <el-descriptions-item label="经营范围:">{{ info.businessScope }}</el-descriptions-item>
        <el-descriptions-item label="备注:">{{ info.remarks }}</el-descriptions-item>
      </el-descriptions>
      <common-table
        :table-data="info.enclosureInfo"
        show-download
        :show-delete="isEdit"
      />

      <el-descriptions
        class="descriptions-one"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item v-if="info.cancellationReason" label="注销原因:">{{ info.cancellationReason }}</el-descriptions-item>
      </el-descriptions>

      <div
        v-if="info.isStatus > 1 || isEdit"
        style="margin-top: 20px;"
      >
        <div class="icon-title">
          <span class="span" />备案受理
        </div>
        <el-descriptions
          :class="isEdit ? 'edit-descriptions': 'descriptions'"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item v-if="!isEdit || info.isStatus > 2" label="受理状态:">{{ info.isStatus===1?'受理中':(info.isStatus===2?'受理退回':'已受理') }}</el-descriptions-item>
          <el-descriptions-item v-if="!isEdit || info.isStatus > 2" label="受理人:">{{ info.acceptBy }}</el-descriptions-item>
          <el-descriptions-item v-if="!isEdit || info.isStatus > 2" label="受理时间:">{{ info.acceptDate }}</el-descriptions-item>
          <el-descriptions-item
            v-if="isEdit && info.isStatus === 1"
            :span="3"
            label="受理:"
            class="el-width"
            style="width: 100px;"
          >
            <el-radio-group v-model="ruleForm.isStatus">
              <el-radio :label="3">
                业务办理
              </el-radio>
              <el-radio :label="2">
                退回
              </el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item label="受理意见:" :span="3">
            <div v-if="isEdit && info.isStatus === 1">
              <el-input
                v-model="ruleForm.acceptOpinion"
                type="textarea"
                placeholder="请输入受理意见"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </div>
            <span v-else>{{ ruleForm.acceptOpinion }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div v-if="isAcceptance && info.isStatus > 2">
        <div
          v-if="isEdit || info.isStatus > 3"
          class="icon-title"
        >
          <span class="span" />备案审核
        </div>
        <el-descriptions
          :class="isEdit ? 'edit-descriptions': 'descriptions-one'"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item v-if="!isEdit && info.isStatus > 3" label="审核状态:">{{ info.isStatus===4?'已审核':'审核退回' }}</el-descriptions-item>
          <el-descriptions-item v-if="!isEdit && info.isStatus > 3" label="审核人:">{{ info.reviewedBy }}</el-descriptions-item>
          <el-descriptions-item v-if="!isEdit && info.isStatus > 3" label="审核时间:">{{ info.reviewedDate }}</el-descriptions-item>
          <el-descriptions-item v-if="isEdit" :span="3" label="审核:">
            <el-radio-group v-model="ruleForm.isStatus">
              <el-radio :label="4">
                业务办理
              </el-radio>
              <el-radio :label="5">
                退回
              </el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item v-if="info.isStatus === 3 ||info.isStatus > 3" :span="3" label="审核意见:">
            <div v-if="isEdit && info.isStatus===3">
              <el-input
                v-model="ruleForm.reviewedOpinion"
                type="textarea"
                placeholder="请输入审核意见"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </div>
            <span v-else>{{ ruleForm.reviewedOpinion }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
        size="medium"
      >
        <!-- 备案受理 -->
        <!-- 备案审核 -->
        <div v-if="isAcceptance && info.isStatus > 2">
          <div
            v-if="isEdit || info.isStatus > 3"
            class="icon-title"
          >
            <span class="span" />附件
          </div>
          <common-table
            v-if="isEdit || info.isStatus > 3"
            :table-data="fileList"
            show-download
            show-delete
            @handleDelete="handleDelete"
          />
        </div>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        size="medium"
        type="primary"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
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
import { momentDate } from '@/utils/index'
import { findById, recordAcceptance, recordReview } from '@/api/port-services/record-management/service-en-filing'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        acceptBy: '',
        acceptFile: '',
        isStatus: '',
        acceptOpinion: '',
        reviewedOpinion: '',
        id: ''
      },
      isEdit: false,
      loading: false,
      isAcceptance: false,
      id: '',
      info: {},
      fileList: [],
      tabActive: 1,
      rules: {
        isStatus: [
          { required: true, message: '请选择受理状态', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit === 'true'
    this.isAcceptance = this.$route.query.isAcceptance === 'true'
    this.tabActive = this.$route.query.tabActive
    this.id = this.$route.query.id
    const info = await findById(this.$route.query.id)
    try {
      info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
      info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
    } catch (err) {
      console.log()
    }
    this.info = info.data
    this.ruleForm.acceptOpinion = this.info.acceptOpinion
    this.ruleForm.reviewedOpinion = this.info.reviewedOpinion
    this.ruleForm.id = this.info.id
    this.fileList = info.data.reviewedFile || []
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.uid)
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val) {
      this.fileList.splice(val.index, 1)
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
    async save() {
      let data = { }
      if (this.info.isStatus === 1) {
        data = { ...this.ruleForm }
        delete data.reviewedOpinion
      } else {
        data.reviewedFile = JSON.stringify(this.fileList)
        data.id = this.ruleForm.id
        data.reviewedBy = ''
        data.isStatus = this.ruleForm.isStatus
        data.reviewedOpinion = this.ruleForm.reviewedOpinion
      }
      this.loading = true
      const res = this.info.isStatus === 1 ? await recordAcceptance(data) : await recordReview(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    /**
     * 返回
     */
    returnBack() {
      this.$router.push({ path: `/record/enterprise/accept?tabActive=${this.tabActive}` })
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
        width: 23.3333%;
        line-height: 30px;
    }
}

.edit-descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}

.descriptions-one {
    margin: 20px 0;

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

.acceptance {
    display: flex;
    margin-bottom: 20px;
    padding: 0 80px;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
}

.detail-info {
    div {
        display: flex;
        overflow: hidden;
        margin-right: 10px;
        padding: 0 8px;
        height: 100%;
        background-color: #eeeeee;
        flex: 2;
        align-items: center;
        justify-content: center;
    }

    span {
        display: flex;
        height: 100%;
        flex: 5;
        align-items: center;
    }
}
</style>
