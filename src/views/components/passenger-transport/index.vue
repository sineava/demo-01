<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">企业名称:</template>
        {{securityData.enterpriseName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">营业执照编号:</template>
        {{securityData.certificateNo}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top:20px;">
      <span class="span" /> 经营许可证信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    > 
      <el-descriptions-item :span="2">
        <template slot="label">经营许可证编号:</template>
        <el-form-item v-if="isEdit" prop="licenseNo">
          <el-select
            v-model="securityData.licenseNo"
            placeholder="请选择经营许可证编号"
            style="width:100%;"
            @change="getLicenseInfo"
            >
            <el-option
                v-for="item in licenseList"
                :key="item.id"
                :label="`${item.licenseNo} [${item.enterpriseName}]`"
                :value="item.licenseNo"
            />
            </el-select>
        </el-form-item>
        <span v-else>{{ securityData.licenseNo }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">企业名称:</template>
        {{securityData.licenseEnterpriseName || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">法定代表人:</template>
        {{securityData.licenseEnterpriseName || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">注册地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model="securityData.address" placeholder="请输入注册地址" maxlength="100" />
        </el-form-item>
        <span v-else>{{ securityData.address || '-'}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">经济类型:</template>
        <el-form-item v-if="isEdit" prop="economicType">
          <el-input
            v-model="securityData.economicType"
            maxlength="50"
            placeholder="请输入经济类型"
          />
        </el-form-item>
        <span v-else>{{ securityData.economicType || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">经营期限:</template>
        <el-form-item v-if="isEdit" prop="operationTerm">
          <el-input
            v-model="securityData.operationTerm"
            maxlength="20"
            placeholder="请输入经营期限"
          />
        </el-form-item>
        <span v-else>{{ securityData.operationTerm || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">开始时间:</template>
        <el-form-item v-if="isEdit" prop="startDate">
          <el-date-picker
            v-model="securityData.startDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间："
          />
        </el-form-item>
        <span v-else>{{ securityData.startDate || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">结束时间:</template>
        <div v-if="isEdit">
            <span style="display: inline-block; margin-right: 10px;">
                <el-form-item v-if="expiryDate!=='永久'" prop="endDate">
                    <el-date-picker
                        v-model="securityData.endDate"
                        type="date"
                        placeholder="选择营业期限"
                    />
                </el-form-item>
            </span>
            <span style="display: inline-block;">
                <el-radio-group v-model="expiryDate" size="mini">
                    <el-radio-button label="永久" />
                    <el-radio-button label="日期" />
                </el-radio-group>
            </span>
        </div>
        <span v-else>{{ securityData.endDate || '永久' }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">批准机关:</template>
        <el-form-item v-if="isEdit" prop="approvalAuthority">
          <el-input
            v-model="securityData.approvalAuthority"
            maxlength="20"
            placeholder="请输入批准机关"
          />
        </el-form-item>
        <span v-else>{{ securityData.approvalAuthority || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">文号:</template>
        <el-form-item v-if="isEdit" prop="documentNo">
          <el-input
            v-model="securityData.documentNo"
            maxlength="20"
            placeholder="请输入文号"
          />
        </el-form-item>
        <span v-else>{{ securityData.documentNo || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">发证日期:</template>
        <el-form-item v-if="isEdit" prop="issueDate">
          <el-date-picker
            v-model="securityData.issueDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发证日期："
          />
        </el-form-item>
        <span v-else>{{ securityData.issueDate || '-' }}</span>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <template slot="label">货物运输:</template>
        <el-form-item v-if="isEdit" prop="goodsTransport">
        <el-input
            v-model="securityData.goodsTransport"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入货物运输信息"
            show-word-limit
        />
        </el-form-item>
        <span v-else>{{ securityData.goodsTransport || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">旅客运输:</template>
        <el-form-item v-if="isEdit" prop="passengerTransport">
        <el-input
            v-model="securityData.passengerTransport"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入旅客运输信息"
            show-word-limit
        />
        </el-form-item>
        <span v-else>{{ securityData.passengerTransport || '-' }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">兼营:</template>
        <el-form-item v-if="isEdit" prop="sideline">
        <el-input
            v-model="securityData.sideline"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入兼营信息"
            show-word-limit
        />
        </el-form-item>
        <span v-else>{{ securityData.sideline || '-' }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top:20px;">
      <span class="span" /> 停航班轮备案申请信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    > 
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />停航船舶名称:</template>
        <el-form-item v-if="isEdit" prop="shipId">
          <el-select
            v-model="securityData.shipId"
            style="width: 100%;"
            placeholder="请选择停航船舶名称"
            @change="getShipName"
            >
            <el-option
                v-for="item in shipList"
                :key="item.id"
                :label="`${item.shipName} [${item.shipLicenseNo}]`"
                :value="item.id"
            />
            </el-select>
        </el-form-item>
        <span v-else>{{ securityData.shipName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contactPeople">
          <el-input
            v-model="securityData.contactPeople"
            maxlength="20"
            placeholder="请输入联系人"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactPeople }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactMode">
          <el-input
            v-model="securityData.contactMode"
            maxlength="20"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactMode }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />申请时间:</template>
        <el-form-item v-if="isEdit" prop="applyDate">
          <el-date-picker
            v-model="securityData.applyDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发证日期："
          />
        </el-form-item>
        <span v-else>{{ securityData.applyDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />申请理由:</template>
        <el-form-item v-if="isEdit" prop="applyReason">
        <el-input
            v-model="securityData.applyReason"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入兼营信息"
            show-word-limit
        />
        </el-form-item>
        <span v-else>{{ securityData.applyReason }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <!--  -->

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="enclosureInfo"
        @fileSuccess="uploadSuccess($event, 'enclosureInfo')"
        @remove="uploadRemove($event, 'enclosureInfo')"
      />
    <common-table
      :table-data="enclosureInfo"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'enclosureInfo')"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { businessLicenseList, getWtEnShipList } from '@/api/water-transportation-services/keep-on-record/cruise-liner-suspend-filing'
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
      licenseList:[],//经营许可证编号
      shipList:[],//船舶
      enclosureInfo: [], // 附件
      securityData: {},
      expiryDate:'日期',
      rules: {
        shipId: [
          { required: true, message: '请选择船舶名称', trigger: 'change' }
        ],
        applyReason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' }
        ],
        contactPeople: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactMode: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        applyDate: [
          { required: true, message: '请选择联系时间', trigger: 'change' }
        ]
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
    // 经营许可证信息列表
    getLicenseList(enterpriseId){
        if(!enterpriseId){
            return false
        }
        businessLicenseList({ enterpriseId: enterpriseId }).then(res=>{
            this.licenseList = res.data || []
        })
    },
    // 船舶列表
    getShipList(enterpriseId){
        if(!enterpriseId){
            return false
        }
        getWtEnShipList(enterpriseId).then(res=>{
            this.shipList = res.data || {}
        })
    },
    // 获取营业证中的数据
    getLicenseInfo(e) {
      for(let i=0;i<this.licenseList.length;i++){
          if(e===this.licenseList[i].licenseNo){
              let row = JSON.parse(JSON.stringify(this.licenseList[i]))
              delete row.enterpriseName
              delete row.id
              this.securityData = {
                  ...this.securityData,
                  ...row,
                  licenseEnterpriseName:this.licenseList[i].enterpriseName
              }
              this.expiryDate = this.securityData.endDate === '永久' || this.securityData.endDate === '' ? '永久' : '日期'
              this.securityData.endDate = this.expiryDate === '永久' ? '' : this.securityData.endDate
              return false
          }
      }
    },
    // 通过id获取船舶名称
    getShipName(e) {
        for(let i=0;i<this.shipList.length;i++){
            if(e===this.shipList[i].id){
                this.securityData.shipName = this.shipList[i].shipName
                return false
            }
        }
    },
    init(data){
      this.securityData = {
        id:data?.id,
        organizationName:data?.organizationName,
        enterpriseName:data?.enterpriseName,
        certificateNo:data?.certificateNo,
        enterpriseId:data?.enterpriseId,
        organizationId:data?.organizationId,
        licenseNo:data?.licenseNo,
        licenseEnterpriseName:data?.licenseEnterpriseName,
        legalPerson:data?.legalPerson,
        address:data?.address,
        economicType:data?.economicType,
        operationTerm:data?.operationTerm,
        startDate:data?.startDate,
        endDate:data?.endDate,
        approvalAuthority:data?.approvalAuthority,
        documentNo:data?.documentNo,
        issueDate:data?.issueDate,
        goodsTransport:data?.goodsTransport,
        passengerTransport:data?.passengerTransport,
        sideline:data?.sideline,
        shipId:data?.shipId,
        shipName:data?.shipName,
        applyReason:data?.applyReason,
        contactPeople:data?.contactPeople,
        contactMode:data?.contactMode,
        applyDate:data?.applyDate

        // filingForm:data?.filingForm
      }
      this.expiryDate = this.securityData.endDate === '永久' || this.securityData.endDate === '' ? '永久' : '日期'
      this.securityData.endDate = this.expiryDate === '永久' ? '' : this.securityData.endDate
      this.enclosureInfo = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []// 附件
      this.getLicenseList(data?.enterpriseId)
      this.getShipList(data?.enterpriseId)
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
      const valid = await this.$refs['securityData'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        res.endDate = this.expiryDate === '永久' ? '' : res.endDate
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
.base-securityData {
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
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
