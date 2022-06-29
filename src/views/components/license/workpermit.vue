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
        <template slot="label"><i v-if="isEdit" class="required" />港口危险货物作业附证的编号:</template>
        <el-form-item v-if="isEdit" prop="certificateNumber">
          <el-input v-model.trim="license.certificateNumber" placeholder="请输入港口危险货物作业附证的编号" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.certificateNumber }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />危险货物作业区域的类型代码:</template>
        <el-form-item v-if="isEdit" prop="areaType">
          <el-input v-model.trim="license.areaType" placeholder="请输入危险货物作业区域的类型代码" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.areaType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />公司名称:</template>
        {{ license.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />允许作业的危险货物名称:</template>
        <el-form-item v-if="isEdit" prop="goodsName">
          <el-input v-model.trim="license.goodsName" placeholder="请输入允许作业的危险货物名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.goodsName }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />危险货物作业方式:</template>
        <el-form-item v-if="isEdit" prop="jobType">
          <el-input v-model.trim="license.jobType" placeholder="请输入危险货物作业方式" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.jobType }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />港口经营人名称:</template>
        <el-form-item v-if="isEdit" prop="operator">
          <el-input v-model.trim="license.operator" placeholder="请输入港口经营人名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ license.operator }}</span>
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
              style="width: 100%;"
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
        <!-- <span v-else>{{ license.maturityDate }}</span> -->
        <span v-else>{{ license.maturityDate ? license.maturityDate : '永久' }}</span>
      </el-descriptions-item>

      <el-descriptions-item :span="3">
        <template slot="label">危险货物作业区域的范围描述:</template>
        <el-form-item v-if="isEdit" prop="areaScope">
          <el-input
            v-model.trim="license.areaScope"
            type="textarea"
            placeholder="请输入危险货物作业区域的范围描述"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ license.areaScope }}</span>
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
      isYj:'日期',
      rules: {
        certificateNumber: [
          { required: true, message: '请输入港口危险货物作业附证的编号', trigger: 'blur' }
        ],
        areaType: [
          { required: true, message: '请输入危险货物作业区域的类型代码', trigger: 'blur' }
        ],
        operator: [
          { required: true, message: '请输入港口经营人名称', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入允许作业的危险货物名称', trigger: 'blur' }
        ],
        jobType: [
          { required: true, message: '请输入危险货物作业方式', trigger: 'blur' }
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
        areaType: data?.areaType,
        enterpriseName: data?.enterpriseName,
        goodsName: data?.goodsName,
        jobType: data?.jobType,
        operator: data?.operator,
        areaScope: data?.areaScope,
        maturityDate: data && data.maturityDate ?moment(data.maturityDate).format('YYYY-MM-DD') : '',
        enterpriseId: data?.enterpriseId,
        releaseDate: data && data.releaseDate ? moment(data.releaseDate).format('YYYY-MM-DD') : '',
      }
      this.fileList = data && data.filePath ? JSON.parse(data.filePath) : []
      // this.isYj = this.license.maturityDate===''?'永久':'日期'
      this.isYj = '日期'
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
