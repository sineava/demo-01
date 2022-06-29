<template>
  <div
    class="base-ruleForm"
  >
    <div v-if="type==='record'">
      <template>
        <div
          class="icon-title"
          style="margin: 20px 0; border-radius: 5px; height: 50px; background: #d7d4d4;"
        >
          <span class="span" />变更后
        </div>
      </template>
      <div class="supervise-oper">
        工商执照信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="thisBusiness-title"
        contentClassName="thisBusiness-text"
        border
      >
        <el-descriptions-item label="统一社会信用代码：" :span="2">
          {{ thisBusiness.certificateNo }}
        </el-descriptions-item>
        <el-descriptions-item label="名称:">{{ thisBusiness.name }}</el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">类型:</template>
          {{ thisBusiness.type }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">住所:</template>
          {{ thisBusiness.officeAddress }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">法定代表人:</template>
          {{ thisBusiness.legalPersonName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">注册资本（万元）:</template>
          {{ thisBusiness.registeredCapital }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">成立时间:</template>
          {{ thisBusiness.issuingDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">营业期限至:</template>
          {{ thisBusiness.expiryDate }}
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label">登记机关:</template>
          {{ thisBusiness.issuingUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间:">
          {{ thisBusiness.timeInfo }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">经营范围:</template>
          {{ thisBusiness.allowedBusiness }}
        </el-descriptions-item>
        <el-descriptions-item label="证书图片:" :span="3">
          <Images
            v-if="thisBusiness.certificatePicturePath"
            ref="images"
            height="100px"
            fit="contain"
            :url="thisBusiness.certificatePicturePath"
          />
        </el-descriptions-item>
      </el-descriptions>
      <div class="supervise-oper">
        投资人信息
      </div>
      <el-table
        :data="data.thisInvestorsInfo"
        :border="true"
      >
        <el-table-column
          label="编号"
          width="60"
          type="index"
          align="center"
        />
        <el-table-column
          label="投资人"
          prop="investorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="金额（万元）"
          prop="investorAmount"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="投资比例（%）"
          prop="investorScale"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="证件号"
          prop="credentialNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="备注"
          prop="remark"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </div>

    <template>
      <div v-if="type==='record'" class="icon-title" style="margin: 20px 0; border-radius: 5px; height: 50px; background: #d7d4d4;">
        <span class="span" />变更前
      </div>
      <div class="supervise-oper">
        工商执照信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="thisBusiness-title"
        contentClassName="thisBusiness-text"
        border
      >
        <el-descriptions-item label="统一社会信用代码：" :span="2">
          {{ lastBusiness.certificateNo }}
        </el-descriptions-item>
        <el-descriptions-item label="名称:">{{ lastBusiness.name }}</el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">类型:</template>
          {{ lastBusiness.type }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">住所:</template>
          {{ lastBusiness.officeAddress }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">法定代表人:</template>
          {{ lastBusiness.legalPersonName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">注册资本（万元）:</template>
          {{ lastBusiness.registeredCapital }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">成立时间:</template>
          {{ lastBusiness.issuingDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">营业期限至:</template>
          {{ lastBusiness.expiryDate }}
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label">登记机关:</template>
          {{ lastBusiness.issuingUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间:">
          {{ lastBusiness.timeInfo }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">经营范围:</template>
          {{ lastBusiness.allowedBusiness }}
        </el-descriptions-item>
        <el-descriptions-item label="证书图片:" :span="3">
          <Images
            v-if="lastBusiness.certificatePicturePath"
            ref="images"
            height="100px"
            fit="contain"
            :url="lastBusiness.certificatePicturePath"
          />
        </el-descriptions-item>
      </el-descriptions>
      <div class="supervise-oper">
        投资人信息
      </div>
      <el-table
        :data="data.lastInvestorsInfo"
        :border="true"
      >
        <el-table-column
          label="编号"
          width="60"
          type="index"
          align="center"
        />
        <el-table-column
          label="投资人"
          prop="investorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="金额（万元）"
          prop="investorAmount"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="投资比例（%）"
          prop="investorScale"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="证件号"
          prop="credentialNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="备注"
          prop="remark"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </template>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    type: {
      type: String ,
      default: ''
    },
  },
  data() {
    return {
      thisBusiness: {},
      lastBusiness: {},
      photoList: [], // 图片列表
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initBusiness(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initBusiness(this.data)
  },
  methods: {
    initBusiness(data){
      this.initThisBusiness(data.thisInfo)
      this.initLastBusiness(data.lastInfo)
    },
    initThisBusiness(data){
      if (data && data.certificatePicturePath && data.certificatePicturePath!==this.thisBusiness.certificatePicturePath){
        this.thisPhotoList = [{
          url: data.certificatePicturePath,
          name: '营业执照图片'
        }]
      }
      this.thisBusiness = {
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
    },
    initLastBusiness(data){
      if (data && data.certificatePicturePath && data.certificatePicturePath!==this.thisBusiness.certificatePicturePath){
        this.thisPhotoList = [{
          url: data.certificatePicturePath,
          name: '营业执照图片'
        }]
      }
      this.lastBusiness = {
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
    },
  }

}
</script>
<style lang="scss" scoped>
.base-ruleForm {
    .supervise-oper {
        border: 1px solid #ebeef5;
        border-bottom: none;
        padding: 0 10px;
        height: 50px;
        font-weight: 600;
        line-height: 50px;
        background: #fafafa;
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .thisBusiness-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .thisBusiness-text {
            width: 23.33%;
            line-height: 30px;
        }
    }
}
</style>
