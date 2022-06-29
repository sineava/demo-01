<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业重大事件备案详情页" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <el-form
      size="medium"
      label-position="top"
      class="table-top-column-there"
      disabled
    >
      <el-form-item label="企业名称:">
        <el-input v-model.trim="info.enterpriseName" />
      </el-form-item>
      <el-form-item
        label="船舶名称:"
        prop="shipId"
      >
        <el-input :value="info.shipName" />
      </el-form-item>
      <el-form-item label="船舶营运证编号:">
        <el-input :value="info.shipLicenseNo" />
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 事故信息
      </div>
      <el-form-item
        label="事故等级:"
        prop="accidentLevel"
      >
        <el-input :value="getoptions(info.accidentLevel)" />
      </el-form-item>
      <el-form-item
        label="事故描述:"
        style="width: 100%;"
        prop="accidentDesc"
      >
        <el-input
          v-model="info.accidentDesc"
          type="textarea"
          :rows="6"
        />
      </el-form-item>
      <el-form-item
        label="事故原因:"
        style="width: 100%;"
        prop="accidentReason"
      >
        <el-input
          v-model="info.accidentReason"
          type="textarea"
          :rows="6"
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        style="width: 100%;"
        prop="remarks"
      >
        <el-input
          v-model="info.remarks"
          type="textarea"
          :rows="6"
        />
      </el-form-item>
    </el-form>
    <div class="icon-title">
      <span class="span" />附件信息
    </div>
    <common-table
      style="margin-bottom: 20px;"
      :table-data="info.enclosureInfo"
      show-download
    />

    <div v-if="isEdit">
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
    <div v-if="info.isStatus >= 2">
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
        <el-descriptions-item label="审核意见" :span="3">{{ info.reviewedOpinion }}</el-descriptions-item>
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
        type="primary"
        :loading="loading"
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
import { findById, reviewData } from '@/api/water-transportation-services/information/ship-en-major-events-filing'
import { momentDate } from '@/utils/index'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      info: {},
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
      loading: false,
      reviewedFile: [],
      isEdit: false,
      options: [{
        value: 1,
        label: '特别重大'
      }, {
        value: 2,
        label: '重大'
      }, {
        value: 3,
        label: '较大'
      }, {
        value: 4,
        label: '一般'
      }]
    }
  },
  async mounted() {
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    // 查询详情
    if (this.$route.query.id) {
      let info = await findById(this.$route.query.id)
      if (info.code!=='0'){
        this.$message.error('网络异常')
        this.returnBack()
        return false
      }
      if (info.data){
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
      }

      this.info = info.data
    }
  },
  methods: {
    getoptions(value){
      if (!value){
        return ''
      }
      let label = ''
      this.options.forEach(item=>{
        if (value===item.value){
          label = item.label
          return false
        }
      })
      return label
    },
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

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 13%;
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
