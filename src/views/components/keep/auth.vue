<template>
  <el-form
    ref="ruleForm"
    :model="auth"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" /> 审核信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="auth-title"
      contentClassName="auth-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />审核状态:</template>
        <el-form-item v-if="isEdit" prop="isStatus">
          <el-radio-group v-model="auth.isStatus">
            <el-radio :label="3">
              业务办理
            </el-radio>
            <el-radio :label="2">
              退回
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>
          <el-tag v-if="auth.isStatus === 2" type="danger">已退回</el-tag>
          <el-tag v-else-if="auth.isStatus === 3" type="success">审核通过</el-tag>
          <el-tag v-else>待审核</el-tag>
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">审核人:</template>
        {{ auth.reviewedBy }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">审核时间:</template>
        {{ auth.reviewedDate }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />审核意见:</template>
        <el-form-item v-if="isEdit" prop="reviewedOpinion">
          <el-input
            v-model.trim="auth.reviewedOpinion"
            type="textarea"
            placeholder="请输入审核意见"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ auth.reviewedOpinion }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />审核附件
    </div>
    <upload
      v-if="isEdit"
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
      :show-delete="isEdit?true:false"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
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
  },
  data() {
    return {
      reviewedFile:[],
      auth: {
        isStatus:'',// 姓名
      },
      rules: {
        isStatus: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        reviewedOpinion: [
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initAuth(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.initAuth(this.data)
  },
  methods: {
    initAuth(data){
      this.auth = {
        id:data?.id,
        isStatus:data?.isStatus,
        reviewedDate:data && data.reviewedDate ? momentDate(data.reviewedDate,'YYYY-MM-DD HH:mm') : '',
        reviewedBy:data?.reviewedBy,
        reviewedOpinion:data?.reviewedOpinion
      }
      this.reviewedFile = data && data.reviewedFile ? JSON.parse(data.reviewedFile) : []
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
    // 输入框变更
    inputChange(){
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        res = {
          id:this.auth.id,
          isStatus:this.auth.isStatus,
          reviewedOpinion:this.auth.reviewedOpinion,
          reviewedBy:this.auth.reviewedBy,
          reviewedFile:JSON.stringify(this.reviewedFile)
        }
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.base-ruleForm {
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

        /deep/ .auth-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .auth-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
