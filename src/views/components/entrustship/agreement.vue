<template>
  <el-form
    ref="ruleForm"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <el-descriptions
      class="descriptions"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />委托协议名称:</template>
        <el-form-item v-if="isEdit" prop="entrustAgreementName">
          <el-input v-model.trim="securityData.entrustAgreementName" placeholder="请输入委托协议名称" maxlength="200" />
        </el-form-item>
        <span v-else>{{ securityData.entrustAgreementName || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />委托协议编号:</template>
        <el-form-item v-if="isEdit" prop="entrustAgreementNo">
          <el-input v-model.trim="securityData.entrustAgreementNo" placeholder="请输入委托协议编号" maxlength="100" />
        </el-form-item>
        <span v-else>{{ securityData.entrustAgreementNo || '-' }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="line-height: 40px;">
        <span class="span" />{{title}}协议附件
        <span style="margin-left:30px;">
            <upload
                file
                v-if="isEdit"
                :show-file-list="false"
                :limit="5"
                multiple
                :fileBtn="{
                    name: '点击上传',
                    type: 'primary',
                    size: 'mini',
                    icon: 'el-icon-upload'
                }"
                :isTips="false"
                :file-list="enclosureInfo"
                @fileSuccess="uploadSuccess($event, 'enclosureInfo')"
                @remove="uploadRemove($event, 'enclosureInfo')"
            />
        </span>
    </div>
    <common-table
      :table-data="enclosureInfo"
      show-download
      :height="height"
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'enclosureInfo')"
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
    title:{
        type:String,
        default:''
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    height:{
      type:[String,Number],
      default:''
    }
  },
  data() {
    return {
      rectifyEnclosure: [], // 整改认定书
      enclosureInfo: [], // 附件
      evaluateEnclosure: [], // 安全评价报告文件
      securityData: {},
      rules: {
        entrustAgreementName: [
          { required: true, message: '请输入委托协议名称', trigger: 'blur' }
        ],
        entrustAgreementNo: [
          { required: true, message: '请输入委托协议编号', trigger: 'blur' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(data){
      this.securityData = {
        entrustAgreementName:data?.entrustAgreementName,
        entrustAgreementNo:data?.entrustAgreementNo
      }
      this.enclosureInfo = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []
    },
    // 文件上传成功钩子
    uploadSuccess(file, listName) {
      this[listName].push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file, listName) {
      this[listName].splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val, itemName) {
      this[itemName].splice(val.index, 1)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        res.enclosureInfo = JSON.stringify(this.enclosureInfo)
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

        /deep/ .securityData-title {
            width: 25%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
            height: 62px;
        }

        /deep/ .securityData-text {
            width: 75%;
            line-height: 30px;
            height: 62px;
        }
    }
}
</style>
