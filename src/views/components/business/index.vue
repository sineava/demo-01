<template>
  <el-form
    ref="ruleForm"
    :model="business"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="统一社会信用代码：" :span="2">
        <el-input v-if="isEdit" v-model="business.certificateNo" placeholder="请输入统一社会信用代码">
          <el-tooltip
            slot="append"
            v-model="tooltip"
            :manual="true"
            popper-class="tooltip"
            content="输入统一社会信用代码后点击“查询”按钮"
            placement="top"
            effect="dark"
          >
            <el-button icon="el-icon-search" @click="query">查询</el-button>
          </el-tooltip>
        </el-input>
        <span v-else>{{ business.certificateNo }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="名称:">{{ business.name }}</el-descriptions-item>
      <template v-if="isShow">
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />类型:</template>
          <el-form-item v-if="isEdit" prop="type">
            <el-input v-model.trim="business.type" placeholder="请输入类型" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ business.type }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />住所:</template>
          <el-form-item v-if="isEdit" prop="officeAddress">
            <el-input v-model.trim="business.officeAddress" placeholder="请输入住所" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ business.officeAddress }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />法定代表人:</template>
          <el-form-item v-if="isEdit" prop="legalPersonName">
            <el-input v-model.trim="business.legalPersonName" placeholder="请输入法定代表人" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ business.legalPersonName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />注册资本（万元）:</template>
          <el-form-item v-if="isEdit" prop="registeredCapital">
            <el-input-number
              v-model="business.registeredCapital"
              :min="0"
              :max="10000000000"
              :precision="4"
              placeholder="请输入注册资本（万元）"
              :controls="false"
              style="width: 100%;"
              @change="inputChange"
            />
          </el-form-item>
          <span v-else>{{ business.registeredCapital }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />成立时间:</template>
          <el-form-item v-if="isEdit" prop="legalPersonName">
            <el-date-picker
              v-model="business.issuingDate"
              type="date"
              style="width: 100%;"
              placeholder="选择成立时间"
              @change="inputChange"
            />
          </el-form-item>
          <span v-else>{{ business.issuingDate }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required-noe" />营业期限至:</template>
          <div v-if="isEdit">
            <span style="display: inline-block; margin-right: 10px;">
              <el-form-item v-if="expiryDate!=='永久'" prop="expiryDate">
                <el-date-picker
                  v-model="business.expiryDate"
                  type="date"
                  placeholder="选择营业期限"
                  @change="inputChange"
                />
              </el-form-item>
            </span>
            <span style="display: inline-block;">
              <el-radio-group v-model="expiryDate" size="mini" @change="expiryDateChange">
                <el-radio-button label="永久" />
                <el-radio-button label="日期" />
              </el-radio-group>
            </span>
          </div>
          <span v-else>{{ business.expiryDate }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label"><i class="required-noe" />登记机关:</template>
          <el-form-item v-if="isEdit" prop="issuingUnit">
            <el-input v-model.trim="business.issuingUnit" placeholder="请输入登记机关" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ business.issuingUnit }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="更新时间:">
          <!-- <el-form-item v-if="isEdit" prop="timeInfo">
            <el-date-picker
              v-model="business.timeInfo"
              type="date"
              style="width:100%;"
              placeholder="选择更新时间"
              @change="inputChange"
            />
          </el-form-item>
          <span v-else>{{ business.timeInfo }}</span> -->
          {{ business.timeInfo }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label"><i class="required-noe" />经营范围:</template>
          <el-form-item v-if="isEdit" prop="allowedBusiness">
            <el-input
              v-model="business.allowedBusiness"
              type="textarea"
              placeholder="请输入经营范围"
              :autosize="{ minRows: 4, maxRows: 6 }"
              @change="inputChange"
            />
          </el-form-item>
          <span v-else>{{ business.allowedBusiness }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="证书图片:" :span="3">
          <Images
            v-if="!isEdit && business.certificatePicturePath"
            ref="images"
            height="100px"
            fit="contain"
            :url="business.certificatePicturePath"
          />
          <upload
            v-if="isEdit"
            :file-list="photoList"
            :limit="1"
            multiple
            @fileSuccess="uploadPhotoSuccess"
            @remove="uploadPhotoRemove"
          />
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </el-form>
</template>

<script>
import { findLicense } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { momentDate } from '@/utils/index'
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
    isUpdata:{
      type: Boolean ,
      default: true
    }
  },
  data() {
    return {
      business: {
        certificateNo:'',// 统一社会信用代码
        name:'',// 名称
        type:'',// 类型
        officeAddress:'',// 住所
        legalPersonName:'',// 法定代表人
        registeredCapital:'',// 注册资本
        issuingDate:'',// 成立时间
        expiryDate:'',// 营业期限
        allowedBusiness:'',// 经营范围
        issuingUnit:'',// 登记机关
        timeInfo:'',// 时间
        certificatePicturePath:'',// 证书图片
      },
      tooltip:true,
      isShow:false,
      expiryDate: '日期',
      photoList: [], // 图片列表
      rules: {},
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initBusiness(newV)
      },
      deep:true
    },
    isEdit:{
      handler(newV){
        if (this.isUpdata===false || newV){
          this.tooltip = true
          setTimeout(() => {
            this.tooltip = false
          }, 5000)
        }
      },
      deep:true
    },
    isUpdata:{
      handler(newV){
        this.isShow = newV
      },
      deep:true
    },
  },
  mounted() {
    this.isShow = this.isUpdata
    this.initBusiness(this.data)
  },
  methods: {
    query(){
      this.tooltip = false
      if (this.business.certificateNo){
        const loading = this.$loading({
          lock: true,
          text: '正在查询工商信息，请耐心等待...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        findLicense({code:this.business.certificateNo}).then(res=>{
          loading.close()
          if (res.data){
            this.business = {
              certificateNo:res.data.uniscid,// 统一社会信用代码
              name:res.data.entname,// 名称
              type:res.data.enttype_CN,// 类型
              officeAddress:res.data.dom,// 住所
              legalPersonName:res.data.name,// 法定代表人
              registeredCapital:res.data.regcap,// 注册资本
              issuingDate:res.data.estdate ? momentDate(res.data.estdate,'YYYY-MM-DD') : '',// 成立时间
              expiryDate:res.data.opto ? (res.data.opfrom === '永久' ? '永久' : momentDate(res.data.opto,'YYYY-MM-DD') ) : '永久',// 营业期限
              allowedBusiness:res.data.opscope,// 经营范围
              issuingUnit:res.data.regorg_CN,// 登记机关
              timeInfo:res.data.s_EXT_DATATIME ? momentDate(res.data.s_EXT_DATATIME,'YYYY-MM-DD') : '',// 时间
              certificatePicturePath:this.business.certificatePicturePath,// 证书图片
            }
            this.expiryDate = this.business.expiryDate === '永久' ? '永久' : '日期'
            this.isShow = true
          }
          this.$emit('changeBusiness',this.business)
        })
      } else {
        this.$message.error('请输入统一社会信用代码')
      }
    },
    initBusiness(data){
      if (data && data.certificatePicturePath && data.certificatePicturePath!==this.business.certificatePicturePath){
        this.photoList = [{
          url: data.certificatePicturePath,
          name: '营业执照图片'
        }]
      }
      this.business = {
        certificateNo:data && data.certificateNo || '',// 统一社会信用代码
        name:data && data.name || '',// 名称
        type:data && data.type || '',// 类型
        officeAddress:data && data.officeAddress || '',// 住所
        legalPersonName:data && data.legalPersonName || '',// 法定代表人
        registeredCapital:data && data.registeredCapital || '',// 注册资本
        issuingDate:data && data.issuingDate ? momentDate(data.issuingDate,'YYYY-MM-DD') : '',// 成立时间
        expiryDate:data && data.expiryDate ? (data.expiryDate === '永久' ? '永久' : momentDate(data.expiryDate,'YYYY-MM-DD') ) : '',// 营业期限
        allowedBusiness:data && data.allowedBusiness || '',// 经营范围
        issuingUnit:data && data.issuingUnit || '',// 登记机关
        timeInfo:data && data.timeInfo ? momentDate(data.timeInfo,'YYYY-MM-DD') : '',// 时间
        certificatePicturePath:data && data.certificatePicturePath || '',// 证书图片
      }
      this.expiryDate = this.business.expiryDate === '永久' ? '永久' : '日期'
    },
    // 日期选择
    expiryDateChange(e){
      this.business.expiryDate = e === '永久' ? '永久' : ''
    },
    // 输入框变更
    inputChange(){
      this.initBusiness(this.business)
      this.$emit('changeBusiness',this.business)
    },
    // 图片上传成功钩子
    uploadPhotoSuccess(file) {
      this.business.certificatePicturePath = file.response.data
      this.photoList.push({
        url: file.response.data,
        name: file.name
      })
      this.$emit('changeBusiness',this.business)
    },
    // 图片列表移除图片时的钩子
    uploadPhotoRemove(file) {
      this.photoList = []
      this.business.certificatePicturePath = ''
      this.$emit('changeBusiness',this.business)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          res = {
            allowedBusiness:this.business.allowedBusiness,
            businessArea:this.business.businessArea,
            certificateNo:this.business.certificateNo,
            certificatePicturePath:this.business.certificatePicturePath,
            certificateStatus:1,
            expiryDate:this.business.expiryDate ? (this.expiryDate==='永久' ? '永久': momentDate(this.business.expiryDate,'YYYY-MM-DD')) : '',
            issuingDate:this.business.issuingDate ? momentDate(this.business.issuingDate,'YYYY-MM-DD') : '',
            issuingUnit:this.business.issuingUnit,
            legalPersonName:this.business.legalPersonName,
            officeAddress:this.business.officeAddress,
            registeredCapital:this.business.registeredCapital,
            timeInfo:this.business.timeInfo ? momentDate(this.business.timeInfo,'YYYY-MM-DD') : '',
            type:this.business.type,
            name:this.business.name
          }
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>
<style lang="scss">
.tooltip {
    background: #f56c6c !important;

    .popper__arrow {
        border-top-color: #f56c6c !important;
    }

    .popper__arrow::after {
        border-top-color: #f56c6c !important;
    }
}
</style>
<style lang="scss" scoped>
.base-ruleForm {
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
}
</style>
