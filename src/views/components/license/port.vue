<template>
  <el-form
    ref="license"
    :model="license"
    :rules="rules"
    label-width="0"
    class="base-license"
  >
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="license-title"
      contentClassName="license-text"
      border
    >
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />公司名称:</template>
        {{ license.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />证书编号:</template>
        <el-form-item v-if="isEdit" prop="certificateNumber">
          <el-input v-model.trim="license.certificateNumber" placeholder="请输入证书编号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.certificateNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法人姓名:</template>
        <el-form-item v-if="isEdit" prop="principal">
          <el-input v-model.trim="license.principal" placeholder="请输入法人姓名" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.principal }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />办公地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model.trim="license.address" placeholder="请输入办公地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.address }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">经营地域:</template>
        <el-form-item v-if="isEdit" prop="geographical">
          <el-input v-model.trim="license.geographical" placeholder="请输入经营地域" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.geographical }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">管理部门:</template>
        {{ license.departmentName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />发证日期:</template>
        <el-form-item v-if="isEdit" prop="releaseDate">
          <el-date-picker
            v-model="license.releaseDate"
            type="date"
            placeholder="选择发证日期"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ license.releaseDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />有效期至:</template>
        <el-form-item v-if="isEdit" :prop="isYj==='日期'?'maturityDate':''">
          <span v-show="isYj==='日期'" style="margin-right: 10px;">
            <el-date-picker
              v-model="license.maturityDate"
              type="date"
              placeholder="选择有效期至"
            />
          </span>
          <span>
            <el-radio-group v-model="isYj" size="mini" @change="changeRadio">
              <el-radio-button label="永久" />
              <el-radio-button label="日期" />
            </el-radio-group>
          </span>
        </el-form-item>
        <span v-else>{{ license.maturityDate ? license.maturityDate : '永久' }}</span>
      </el-descriptions-item>

      <el-descriptions-item v-if="license.id && isEdit" :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />是否版本变更:</template>
        <el-form-item v-if="isEdit" prop="issueDate">
          <el-radio v-model="license.ischange" :label="0">否</el-radio>
          <el-radio v-model="license.ischange" :label="1">是</el-radio>
        </el-form-item>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />港口经营业务的种类及范围:</template>
        <el-form-item v-if="isEdit" prop="businessScope">
          <el-input
            v-model.trim="license.businessScope"
            type="textarea"
            placeholder="请输入港口经营业务的种类及范围"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ license.businessScope }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">照片:</template>
        <span v-if="!isEdit && fileList.length>0">
          <Images
            v-for="(item,index) in fileList"
            ref="images"
            :key="index"
            height="100px"
            fit="contain"
            :url="item.url"
          />
        </span>
        <upload
          v-if="isEdit"
          :file-list="fileList"
          :limit="1"
          multiple
          @fileSuccess="uploadSuccess"
          @remove="uploadRemove"
        />
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
import moment from 'moment'
import upload from '@/components/upload'
import Images from '@/components/images'
export default {
  components: {
    upload,
    Images
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
      license: {
        enterpriseName:'',
        maturityDate:'',
        releaseDate:'',
        ischange:0,
      },
      releaseDate:[],
      fileList:[],
      isYj:'永久',
      rules: {
        certificateNumber: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ],
        businessScope: [
          { required: true, message: '请输入港口经营业务的种类及范围', trigger: 'blur' }
        ],
        operator: [
          { required: true, message: '请输入港口经营人（营业执照上名称）', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入办公地址', trigger: 'blur' }
        ],
        maturityDate: [
          { required: true, message: '请输选择有效期至', trigger: 'change' }
        ],
        releaseDate: [
          { required: true, message: '请输选择发证日期', trigger: 'change' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    changeRadio(value){
      this.license.maturityDate = ''
    },
    initIicense(data){
      this.license = {
        id: data?.id,
        certificateNumber: data?.certificateNumber,
        businessScope: data?.businessScope,
        enterpriseName: data?.enterpriseName,
        principal: data?.principal,
        address: data?.address,
        geographical: data?.geographical,
        departmentName: data?.departmentName,
        maturityDate: data && data.maturityDate ?moment(data.maturityDate).format('YYYY-MM-DD') : '',
        enterpriseId: data?.enterpriseId,
        releaseDate: data && data.releaseDate ? moment(data.releaseDate).format('YYYY-MM-DD') : '',
        ischange:0
      }
      this.fileList = data && data.filePath ? JSON.parse(data.filePath) : []
      this.isYj = this.license.maturityDate===''?'永久':'日期'
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 输入框变更
    inputChange(){
      /*
       * this.initIicense(this.license)
       * this.$emit('changeIicense',this.license)
       */
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['license'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.license))
          res.maturityDate = res.maturityDate ? (res.maturityDate!=='永久'?moment(res.maturityDate).format('YYYY-MM-DD'):'永久') : ''
          res.releaseDate = res.releaseDate ? moment(res.releaseDate).format('YYYY-MM-DD') : ''
          res.filePath = this.fileList.length > 0 ? JSON.stringify(this.fileList) : ''
          res.operator = res.enterpriseName
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
.base-license {
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

        /deep/ .license-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .license-text {
            width: 23.33%;
            line-height: 30px;
        }
    }
}
</style>
