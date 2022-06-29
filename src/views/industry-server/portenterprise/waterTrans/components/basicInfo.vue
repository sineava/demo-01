<template>
  <div class="water-detail">
    <el-form
      ref="ruleForm"
      :model="info"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
    >
      <div class="icon-title">
        <span class="span" />市场监管信息
        <!-- <span class="oper-button" style="margin-left: 20px;"> -->
        <span v-if="type!=='details'" class="oper-button" style="position: absolute; right: 32px;">
          <el-button
            v-if="isEdit"
            type="primary"
            size="mini"
            @click="clickEdit"
          >
            取消编辑
          </el-button>
          <el-button
            v-if="!isEdit"
            type="primary"
            size="mini"
            @click="clickEdit"
          >
            编辑
          </el-button>
        </span>
      </div>
      <div v-if="!isEdit" class="supervise-oper">
        <span>
          <el-radio-group v-model="supervise" size="small">
            <el-radio-button label="工商信息" />
            <el-radio-button label="投资人信息" />
          </el-radio-group>
        </span>
        <span v-if="isUpdata" style="float: right;">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-refresh-left"
            @click="updateBatch"
          >
            更新企业信息
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-c-scale-to-original"
            @click="changeRecord"
          >
            变更记录
          </el-button>
        </span>
      </div>
      <div v-show="supervise==='工商信息'">
        <BusinessInformation
          ref="businessInformation"
          :is-edit="isEdit"
          :data="info.enterpriseBusinessInfoVo"
          :isUpdata="isUpdata"
          @changeBusiness="changeBusiness"
        />
      </div>
      <div v-show="supervise==='投资人信息'">
        <investor-info :type="type" />
      </div>

      <div class="icon-title">
        <span class="span" />基础信息
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
        <el-descriptions-item label="企业名称:" :span="3">{{ info.enterpriseName }}</el-descriptions-item>
        <el-descriptions-item label="所在地港航部门:">{{ info.organizationName }}</el-descriptions-item>
        <el-descriptions-item label="企业类型:">
          {{ enterpriseTypeList[info.enterpriseType-1] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />经济类型:</template>
          <el-form-item v-if="isEdit" prop="economicType">
            <el-input v-model.trim="info.economicType" placeholder="请输入经济类型" />
          </el-form-item>
          <span v-else>{{ info.economicType }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />法定代表人</template>
          <el-form-item v-if="isEdit" prop="legalPersonName">
            <el-input v-model.trim="info.legalPersonName" placeholder="请输入法定代表人" />
          </el-form-item>
          <span v-else>{{ info.legalPersonName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">法人联系电话:</template>
          <el-form-item v-if="isEdit" prop="legalPersonPhone">
            <el-input v-model.trim="info.legalPersonPhone" placeholder="请输入法人联系电话" />
          </el-form-item>
          <span v-else>{{ info.legalPersonPhone }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="法人身份证号:">
          <el-form-item v-if="isEdit" prop="legalPersonCardNo">
            <el-input v-model.trim="info.legalPersonCardNo" placeholder="请输入法人身份证号" />
          </el-form-item>
          <span v-else>{{ info.legalPersonCardNo }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />办公地址:</template>
          <el-form-item v-if="isEdit" prop="officeAddress">
            <el-input v-model.trim="info.officeAddress" placeholder="请输入办公地址" />
          </el-form-item>
          <span v-else>{{ info.officeAddress }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="资金币种:">
          <el-form-item v-if="isEdit" prop="currencyCategory">
            <el-input v-model.trim="info.currencyCategory" placeholder="请输入资金币种" />
          </el-form-item>
          <span v-else>{{ info.currencyCategory }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
          <el-form-item v-if="isEdit" prop="contactName">
            <el-input v-model.trim="info.contactName" placeholder="请输入联系人" />
          </el-form-item>
          <span v-else>{{ info.contactName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />联系人电话:</template>
          <el-form-item v-if="isEdit" prop="contactPhone">
            <el-input v-model.trim="info.contactPhone" placeholder="请输入联系人电话" />
          </el-form-item>
          <span v-else>{{ info.contactPhone }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />是否集装箱班轮内支线运输:</template>
          <el-form-item v-if="isEdit" prop="isContainerTransport">
            <el-select
              v-model="info.isContainerTransport"
              clearable
              style="width: 100%;"
              placeholder="请选择是否集装箱班轮内支线运输"
            >
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <span v-else>{{ info.isContainerTransport==='1' ? '是':'否' }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />运输主水系类型:</template>
          <el-form-item v-if="isEdit" prop="transportBasinType">
            <el-select
              v-model="info.transportBasinType"
              clearable
              style="width: 100%;"
              placeholder="请选择运输主水系类型"
            >
              <el-option label="长江" value="长江" />
              <el-option label="封闭水域" value="封闭水域" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <span v-else>{{ info.transportBasinType }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label"><i v-if="isEdit" class="required" />运输类型:</template>
          <el-form-item v-if="isEdit" prop="transportGoodsType">
            <el-select
              v-model="info.transportGoodsType"
              clearable
              multiple
              style="width: 100%;"
              placeholder="请选择运输类型"
            >
              <el-option label="市内普货" value="市内普货" />
              <el-option label="省际普货" value="省际普货" />
              <el-option label="省际化危品" value="省际化危品" />
              <el-option label="省际客运" value="省际客运" />
              <el-option label="载重汽车滚装" value="载重汽车滚装" />
              <el-option label="集装箱班轮" value="集装箱班轮" />
              <el-option label="省内化危品" value="省内化危品" />
              <el-option label="省内跨区县客运" value="省内跨区县客运" />
              <el-option label="区县境内客运" value="区县境内客运" />
            </el-select>
          </el-form-item>
          <span v-else>
            <el-tag v-for="(item,index) in info.transportGoodsType" :key="index" style="margin: 5px 5px 0 0;">{{ item }}</el-tag>
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />沿海内河:</template>
          <el-form-item v-if="isEdit" prop="coastalInland">
            <el-select
              v-model="info.coastalInland"
              clearable
              style="width: 100%;"
              placeholder="请选择沿海内河"
            >
              <el-option label="沿海" value="沿海" />
              <el-option label="内河" value="内河" />
            </el-select>
          </el-form-item>
          <span v-else>{{ info.coastalInland }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />是否个体:</template>
          <el-form-item v-if="isEdit" prop="isIndividual">
            <el-select v-model="info.isIndividual" style="width: 100%;" placeholder="请选择是否个体">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <span v-else>{{ info.isIndividual==='1' ? '是':'否' }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="职工总数（人）:">
          <el-form-item v-if="isEdit" prop="totalStaffNumber">
            <el-input-number
              v-model="info.totalStaffNumber"
              :min="info.seniorCrew>0 ? info.seniorCrew : 0"
              :max="10000000000"
              placeholder="请输入职工总数（人）"
              :controls="false"
              style="width: 100%;"
              @change="inputRatio"
            />
          </el-form-item>
          <span v-else>{{ info.totalStaffNumber }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="高级船员总数:">
          <el-form-item v-if="isEdit" prop="seniorCrew">
            <el-input-number
              v-model="info.seniorCrew"
              :min="0"
              :max="10000000000"
              placeholder="请输入高级船员总数"
              :controls="false"
              style="width: 100%;"
              @change="inputRatio"
            />
          </el-form-item>
          <span v-else>{{ info.seniorCrew }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="签订合同的高级船员人数:">
          <el-form-item v-if="isEdit" prop="seniorContractCrew">
            <el-input-number
              v-model="info.seniorContractCrew"
              :min="0"
              :max="10000000000"
              placeholder="请输入签订合同的高级船员人数"
              :controls="false"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ info.seniorContractCrew }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="签订合同的高级船员比例（%）:">
          <el-form-item v-if="isEdit" prop="seniorCrewRatio">
            <el-input-number
              v-model="info.seniorCrewRatio"
              :min="0"
              :max="100"
              :precision="2"
              placeholder="请输入签订合同的高级船员比例"
              :controls="false"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ info.seniorCrewRatio }}</span>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="运输区域:" :span="3">
            <el-form-item v-if="isEdit" prop="transportArea">
              <el-input v-model.trim="info.transportArea" type="textarea" placeholder="请输入运输区域" />
            </el-form-item>
            <span v-else>{{ info.transportArea }}</span>
          </el-descriptions-item> -->
        <el-descriptions-item label="经营范围（客运）:" :span="3">
          <el-form-item v-if="isEdit" prop="passengerBusinessScope">
            <el-input v-model.trim="info.passengerBusinessScope" type="textarea" placeholder="请输入经营范围（客运）" />
          </el-form-item>
          <span v-else>{{ info.passengerBusinessScope }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="经营范围（货运）:" :span="3">
          <el-form-item v-if="isEdit" prop="freightBusinessScope">
            <el-input v-model.trim="info.freightBusinessScope" type="textarea" placeholder="请输入经营范围（货运）" />
          </el-form-item>
          <span v-else>{{ info.freightBusinessScope }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="经营范围（兼营）:" :span="3">
          <el-form-item v-if="isEdit" prop="sideline">
            <el-input v-model.trim="info.sideline" type="textarea" placeholder="请输入经营范围（兼营）" />
          </el-form-item>
          <span v-else>{{ info.sideline }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="备注:" :span="3">
          <el-form-item v-if="isEdit" prop="remark">
            <el-input v-model.trim="info.remark" type="textarea" placeholder="请输入备注" />
          </el-form-item>
          <span v-else>{{ info.remark }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <div class="backstage-edit-btn">
        <el-button v-if="isEdit" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getHyWaterTransportInfo,updateBasicInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { telephone,email } from '@/utils/validate'
import BusinessInformation from '@/views/components/business'
import InvestorInfo from './investorInfo/index.vue'
import { refreshData } from '@/api/general-services/license'
export default {
  components: {
    BusinessInformation,
    InvestorInfo
  },
  data() {
    return {
      info: {
        enterpriseBusinessInfoVo:{
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
        isContainerTransport:'',
        transportBasinType:'',
        transportGoodsType:'',
        coastalInland:'',
        isIndividual:'',
      },
      supervise:'',
      isEdit:false,
      isUpdata: false,
      type:'',
      photoList:[],
      rules:{
        legalPersonName: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        legalPersonPhone: [
          { message: '请输入有效联系电话', validator: telephone, trigger: 'blur' }
        ],
        officeAddress: [
          { required: true, message: '请输入办公地址', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { message: '请输入有效联系电话', validator: telephone, trigger: 'blur' }
        ],
        email: [
          { message: '请输入有效邮箱地址', validator: email, trigger: 'blur' }
        ],
        economicType: [
          { required: true, message: '请输入经济类型', trigger: 'blur' }
        ],
        isContainerTransport:[
          { required: true, message: '请选择是否集装箱班轮内支线运输', trigger: 'change' }
        ],
        transportBasinType:[
          { required: true, message: '请选择运输主水系类型', trigger: 'change' }
        ],
        transportGoodsType:[
          { required: true, message: '请选择运输类型', trigger: 'change' }
        ],
        coastalInland:[
          { required: true, message: '请选择沿海内河', trigger: 'change' }
        ],
        isIndividual:[
          { required: true, message: '请选择是否个体', trigger: 'change' }
        ]
      },
      id: '',
      enterpriseTypeList: ['港口企业', '港口服务企业', '水路运输企业', '水路运输代理企业', '船舶管理企业', '其他企业']
    }
  },
  async mounted() {
    let { type , id ,name} = this.$route.query
    this.type = type
    this.isUpdata = type === 'details' ? false : true
    this.init()
  },
  methods: {
    clickEdit(){
      if (this.isEdit === false){
        this.supervise = '工商信息'
      }
      this.isEdit = !this.isEdit
    },
    updateBatch(){
      this.$confirm('您确定要更新企业基础信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        zIndex: 3000
      }).then(async () => {
        refreshData({code:this.info.enterpriseBusinessInfoVo.certificateNo}).then(res=>{
          if (res.code==='0'){
            this.$message.success('更新成功')
          }
        })
      }).catch(() => {
        // 几点取消的提示
      })
    },
    // 查看变更记录
    changeRecord(){
      this.$router.push({ path: '/portenterprise/changeRecord', query: {
        enterpriseId: this.id,
        enterpriseName: this.$route.query.enterpriseName
      }})
    },
    async init(){
      this.id = this.$route.query.id
      const res = await getHyWaterTransportInfo(this.id)
      this.supervise = this.$store.state.app.supervise || '工商信息'
      this.$store.state.app.supervise = ''
      this.info = res.data
      this.info.transportGoodsType = this.info.transportGoodsType ? JSON.parse(this.info.transportGoodsType) : []
      if (typeof this.info.transportGoodsType!=='object'){
        this.info.transportGoodsType = []
      }
      if (res.data.enterpriseBusinessInfoVo.certificateNo && this.type!=='details'){
        this.isUpdata = true
      }
    },
    changeBusiness(data){
      this.info.enterpriseBusinessInfoVo = data
    },
    inputRatio(){
      /*
       * if (this.info.seniorCrew>0 && this.info.totalStaffNumber){
       *   this.info.seniorCrewRatio = this.info.seniorCrew / this.info.totalStaffNumber * 100
       * } else {
       *   this.info.seniorCrewRatio = 0
       * }
       */
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let enterpriseBusinessInfoDto = await this.$refs.businessInformation.submitForm('ruleForm')
          if (!enterpriseBusinessInfoDto){
            return false
          }
          const postData = {
            enterpriseId:this.info.id,
            waterTransportationInfoDto:{
              coastalInland:this.info.coastalInland,
              contactName:this.info.contactName,
              contactPhone:this.info.contactPhone,
              currencyCategory:this.info.currencyCategory,
              economicType:this.info.economicType,
              email:this.info.email,
              id:this.info.id,
              faxNumber:this.info.faxNumber,
              freightBusinessScope:this.info.freightBusinessScope,
              isContainerTransport:this.info.isContainerTransport,
              isIndividual:this.info.isIndividual,
              legalPersonCardNo:this.info.legalPersonCardNo,
              legalPersonName:this.info.legalPersonName,
              legalPersonPhone:this.info.legalPersonPhone,
              officeAddress:this.info.officeAddress,
              passengerBusinessScope:this.info.passengerBusinessScope,
              remark:this.info.remark,
              totalStaffNumber:this.info.totalStaffNumber,
              transportArea:this.info.transportArea,
              transportBasinType:this.info.transportBasinType,
              transportGoodsType:this.info.transportGoodsType ? JSON.stringify(this.info.transportGoodsType) : '',
              seniorCrewRatio:this.info.seniorCrewRatio,
              seniorCrew:this.info.seniorCrew,
              seniorContractCrew:this.info.seniorContractCrew,
              sideline:this.info.sideline
            },
            enterpriseBusinessInfoDto:enterpriseBusinessInfoDto
          }
          updateBasicInfo(postData).then(res=>{
            if (res.code==='0'){
              this.$message.success('修改成功')
              this.isEdit = false
              this.init()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.supervise-oper {
    border: 1px solid #ebeef5;
    border-bottom: none;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
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

.base-ruleForm {
    .el-form-item {
        margin: 0;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
