<template>
  <el-form
    ref="audit"
    :model="audit"
    :rules="rules"
    label-width="0"
    class="base-audit"
  >
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 备案审核
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="audit-title"
      contentClassName="audit-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />审核状态:</template>
        <el-form-item v-if="isEdit" prop="shipId">
          <el-radio-group v-model="audit.isStatus">
            <el-radio :label="4">
              业务办理
            </el-radio>
            <el-radio :label="5">
              退回
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>
          <span v-if="audit.isStatus===4">已审核</span>
          <span v-else-if="audit.isStatus===5">审核退回</span>
          <span v-else>待审核</span>
        </span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">审核人:</template>
        {{ audit.reviewedBy || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">审核时间:</template>
        {{ audit.reviewedDate || '-' }}
      </el-descriptions-item>

      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />审核意见:</template>
        <el-form-item v-if="isEdit" prop="reviewedOpinion">
          <el-input
            v-model.trim="audit.reviewedOpinion"
            type="textarea"
            :rows="6"
            maxlength="500"
            placeholder="请输入审核意见"
          />
        </el-form-item>
        <span v-else>{{ audit.reviewedOpinion }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 审核附件
    </div>
    <upload
      v-if="isEdit"
      style="width: 100%;"
      file
      :show-file-list="false"
      :file-list="reviewedFile"
      :limit="9"
      multiple
      @fileSuccess="uploadSuccess"
    />
    <common-table
      :table-data="reviewedFile"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import CommonTable from '@/components/features/FileTable.vue'
import upload from '@/components/upload'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {
    upload,
    CommonTable
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    isHy:{
      type: Boolean ,
      default: false
    }
  },
  data() {
    return {
      audit: {
        isStatus:'',
        reviewedOpinion:''
      },
      reviewedFile: [],
      rules: {
        isStatus: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        reviewedOpinion:[
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    initIicense(data){
      this.audit = {
        id: data?.id,
        isStatus:data?.isStatus,
        reviewedBy:data?.reviewedBy,
        reviewedDate:data?.reviewedDate,
        reviewedOpinion:data?.reviewedOpinion,
        reviewedFile:''
      }
      this.reviewedFile = data && data.reviewedFile ? JSON.parse(data.reviewedFile) : []
      if (this.isHy){
        this.audit.reviewedBy = this.audit.reviewedBy || this.user_info.username
        this.audit.reviewedDate = this.audit.reviewedDate || moment(new Date()).format('YYYY-MM-DD HH:mm')
      }
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['audit'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.audit))
          delete res.reviewedDate
          res.reviewedFile = JSON.stringify(this.reviewedFile)
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.base-audit {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .audit-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .audit-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .audit-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .audit-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
