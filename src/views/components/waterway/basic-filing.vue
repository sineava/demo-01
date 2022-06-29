<template>
  <el-form
    ref="ruleForm"
    size="medium"
    label-position="top"
    :model="after"
    :rules="rules"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" />水路运输企业基本信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item labelClassName="table-title" contentClassName="table-text" label="变更前" />
      <el-descriptions-item labelClassName="table-title" contentClassName="table-text" label="变更后" />

      <el-descriptions-item label="企业中文名称">
        {{ before.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />企业中文名称</template>
        <el-form-item v-if="isEdit" prop="changeEnterpriseName">
          <el-input v-model.trim="after.changeEnterpriseName" placeholder="请输入企业中文名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeEnterpriseName }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="行政区划">
        {{ before.administrativeDivision }}
      </el-descriptions-item>
      <el-descriptions-item label="行政区划">
        <el-form-item v-if="isEdit" prop="changeAdministrativeDivision">
          <el-input v-model.trim="after.changeAdministrativeDivision" placeholder="请输入行政区划" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeAdministrativeDivision }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="注册地址">
        {{ before.officeAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />注册地址</template>
        <el-form-item v-if="isEdit" prop="changeOfficeAddress">
          <el-input v-model.trim="after.changeOfficeAddress" placeholder="请输入注册地址" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeOfficeAddress }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="法定代表人">
        {{ before.legalPersonName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法定代表人</template>
        <el-form-item v-if="isEdit" prop="changeLegalPersonName">
          <el-input v-model.trim="after.changeLegalPersonName" placeholder="请输入法定代表人" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeLegalPersonName }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="法人身份证号码">
        {{ before.legalPersonCardNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />法人身份证号码</template>
        <el-form-item v-if="isEdit" prop="changeLegalPersonCardNo">
          <el-input v-model.trim="after.changeLegalPersonCardNo" placeholder="请输入法人身份证号码" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeLegalPersonCardNo }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="经济类型">
        {{ before.economicType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />经济类型</template>
        <el-form-item v-if="isEdit" prop="changeEconomicType">
          <el-input v-model.trim="after.changeEconomicType" placeholder="请输入经济类型" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeEconomicType }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="资金币种">
        {{ before.currencyCategory }}
      </el-descriptions-item>
      <el-descriptions-item label="资金币种">
        <el-form-item v-if="isEdit" prop="changeCurrencyCategory">
          <el-input v-model.trim="after.changeCurrencyCategory" placeholder="请输入经济类型" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeCurrencyCategory }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="注册资本（万元）">
        {{ before.registeredCapital }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />注册资本（万元）</template>
        <el-form-item v-if="isEdit" prop="changeRegisteredCapital">
          <el-input-number
            v-model="after.changeRegisteredCapital"
            :min="0"
            :precision="4"
            :max="1000000"
            label="注册资本（万元）"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入注册资本（万元）"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ after.changeRegisteredCapital }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="联系人姓名">
        {{ before.contactName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人姓名</template>
        <el-form-item v-if="isEdit" prop="changeContactName">
          <el-input v-model.trim="after.changeContactName" placeholder="请输入联系人姓名" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeContactName }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="联系电话">
        {{ before.contactPhone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话</template>
        <el-form-item v-if="isEdit" prop="changeContactPhone">
          <el-input v-model.trim="after.changeContactPhone" placeholder="请输入联系电话" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ after.changeContactPhone }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="申请经营范围（客运）">
        {{ before.passengerBusinessScope }}
      </el-descriptions-item>
      <el-descriptions-item label="申请经营范围（客运）">
        <el-form-item v-if="isEdit" prop="changePassengerBusinessScope">
          <el-input
            v-model.trim="after.changePassengerBusinessScope"
            type="textarea"
            :rows="5"
            placeholder="请输入申请经营范围（客运）"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ after.changePassengerBusinessScope }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="申请经营范围（货运）">
        {{ before.freightBusinessScope }}
      </el-descriptions-item>
      <el-descriptions-item label="申请经营范围（货运）">
        <el-form-item v-if="isEdit" prop="changeFreightBusinessScope">
          <el-input
            v-model.trim="after.changeFreightBusinessScope"
            type="textarea"
            :rows="5"
            placeholder="请输入申请经营范围（货运）"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ after.changeFreightBusinessScope }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="是否集装箱班轮内支线运输">
        {{ before.isContainerTransport }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />是否集装箱班轮内支线运输</template>
        <el-form-item v-if="isEdit" prop="changeIsContainerTransport">
          <el-radio v-model="after.changeIsContainerTransport" label="是">是</el-radio>
          <el-radio v-model="after.changeIsContainerTransport" label="否">否</el-radio>
        </el-form-item>
        <span v-else>{{ after.changeIsContainerTransport }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="沿海内河">
        {{ before.coastalInland }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />沿海内河</template>
        <el-form-item v-if="isEdit" prop="changeCoastalInland">
          <el-radio v-model="after.changeCoastalInland" label="沿海">沿海</el-radio>
          <el-radio v-model="after.changeCoastalInland" label="内河">内河</el-radio>
        </el-form-item>
        <span v-else>{{ after.changeCoastalInland }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="运输主水系类型">
        {{ before.transportBasinType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />运输主水系类型</template>
        <el-form-item v-if="isEdit" prop="changeTransportBasinType">
          <el-select
            v-model="after.changeTransportBasinType"
            clearable
            style="width: 100%;"
            placeholder="请选择运输主水系类型"
            @change="inputChange"
            @clear="inputChange"
          >
            <el-option label="长江" value="长江" />
            <el-option label="封闭水域" value="封闭水域" />
          </el-select>
        </el-form-item>
        <span v-else>{{ after.changeTransportBasinType }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="运输区域">
        {{ before.transportArea }}
      </el-descriptions-item>
      <el-descriptions-item label="运输区域">
        <el-form-item v-if="isEdit" prop="changeTransportArea">
          <el-input
            v-model.trim="after.changeTransportArea"
            placeholder="请输入运输区域"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ after.changeTransportArea }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="运输货物类型">
        <el-tag style="margin:0 5px 5px 0;" v-for="(item,index) in before.transportGoodsType" :key="index">{{ item }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />运输货物类型</template>
        <el-form-item v-if="isEdit" prop="changeTransportGoodsType">
          <el-select
            v-model="after.changeTransportGoodsType"
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
          <el-tag v-for="(item,index) in before.changeTransportGoodsType" :key="index">{{ item }}</el-tag>
        </span>
      </el-descriptions-item>

      <el-descriptions-item label="是否个体">
        {{ before.isIndividual }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />是否个体</template>
        <el-form-item v-if="isEdit" prop="changeIsIndividual">
          <el-radio v-model="after.changeIsIndividual" label="是">是</el-radio>
          <el-radio v-model="after.changeIsIndividual" label="否">否</el-radio>
        </el-form-item>
        <span v-else>{{ after.changeIsIndividual }}</span>
      </el-descriptions-item>

      <el-descriptions-item label="备注">
        {{ before.remark }}
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-form-item v-if="isEdit" prop="changeRemark">
          <el-input
            v-model.trim="after.changeRemark"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ after.changeRemark }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="filePath"
        @fileSuccess="uploadSuccess($event, 'filePath')"
        @remove="uploadRemove($event, 'filePath')"
      />
    <common-table
      :table-data="filePath"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'filePath')"
    />

  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable'
import { identity,telephone } from '@/utils/validate'
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
      before:{},
      after:{},
      filePath:[],
      rules: {
        changeEnterpriseName:[
          { required: true, message: '请输入企业中文名称', trigger: 'blur' }
        ],
        changeOfficeAddress:[
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        changeLegalPersonName:[
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        changeLegalPersonCardNo:[
          { required: true, message: '请输入法人身份证号码', trigger: 'blur' },
          { validator: identity, message: '请输入有效15或18位身份证号码', trigger: 'blur' }
        ],
        changeEconomicType:[
          { required: true, message: '请输入经济类型', trigger: 'blur' }
        ],
        changeRegisteredCapital:[
          { required: true, message: '请输入注册资本（万元）', trigger: 'blur' }
        ],
        changeContactName:[
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        changeContactPhone:[
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, message: '请输入有效联系电话', trigger: 'blur' }
        ],
        changeIsContainerTransport:[
          { required: true, message: '请选择是否集装箱班轮内支线运输', trigger: 'change' }
        ],
        changeCoastalInland:[
          { required: true, message: '请选择沿海内河', trigger: 'change' }
        ],
        changeTransportBasinType:[
          { required: true, message: '请选择运输主水系类型', trigger: 'change' }
        ],
        changeIsIndividual:[
          { required: true, message: '请选择是否个体', trigger: 'change' }
        ],
        changeTransportGoodsType:[
          { required: true, message: '请选择运输货物类型', trigger: 'change' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        const res = this.initData(newV)
        this.before = res[0]
        this.after = res[1]
      },
      deep:true
    },
  },
  mounted() {
    const res = this.initData(this.data)
    this.before = res[0]
    this.after = res[1]
  },
  methods: {
    clickEdit(){
      this.$emit('clickEdit',!this.isEdit)
    },
    inputChageNumber(val){
    },
    inputChange(val){

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
    initData(data){
      const Before = {
        enterpriseName:data?.enterpriseName,
        administrativeDivision:data?.administrativeDivision,
        officeAddress:data?.officeAddress,
        legalPersonName:data?.legalPersonName,
        legalPersonCardNo:data?.legalPersonCardNo,
        economicType:data?.economicType,
        currencyCategory:data?.currencyCategory,
        registeredCapital:data?.registeredCapital,
        contactName:data?.contactName,
        contactPhone:data?.contactPhone,
        passengerBusinessScope:data?.passengerBusinessScope,
        freightBusinessScope:data?.freightBusinessScope,
        // enterpriseType:data?.enterpriseType,
        isContainerTransport:data?.isContainerTransport,
        coastalInland:data?.coastalInland,
        transportBasinType:data?.transportBasinType,
        transportArea:data?.transportArea,
        transportGoodsType:data?.transportGoodsType || [],
        isIndividual:data?.isIndividual,
        remark:data?.remark
      }
      if (Before.transportGoodsType && typeof Before.transportGoodsType === 'string'){
        Before.transportGoodsType = JSON.parse(Before.transportGoodsType)
      }
      if (typeof Before.transportGoodsType !== 'object'){
        Before.transportGoodsType = []
      }
      const After = {
        changeEnterpriseName:data?.changeEnterpriseName, // 企业中文名称
        changeAdministrativeDivision:data?.changeAdministrativeDivision,// 行政区划
        changeOfficeAddress:data?.changeOfficeAddress,// 注册地址
        changeLegalPersonName:data?.changeLegalPersonName, // 法定代表人
        changeLegalPersonCardNo:data?.changeLegalPersonCardNo,// 法人身份证号码
        changeEconomicType:data?.changeEconomicType,// 经济类型
        changeCurrencyCategory:data?.changeCurrencyCategory,
        changeRegisteredCapital:data?.changeRegisteredCapital,// 注册资本（万元）
        changeContactName:data?.changeContactName,// 联系人姓名
        changeContactPhone:data?.changeContactPhone,// 联系电话
        changePassengerBusinessScope:data?.changePassengerBusinessScope,// 申请经营范围（客运）
        changeFreightBusinessScope:data?.changeFreightBusinessScope,// 申请经营范围（货运）
        // changeEnterpriseType:data?.changeEnterpriseType,//企业类型
        changeIsContainerTransport:data?.changeIsContainerTransport,// 是否集装箱班轮内支线运输
        changeCoastalInland:data?.changeCoastalInland,
        changeTransportBasinType:data?.changeTransportBasinType || '',// 运输主水系类型
        changeTransportArea:data?.changeTransportArea,// 运输区域
        changeTransportGoodsType:data?.changeTransportGoodsType || [],// 运输货物类型
        changeIsIndividual:data?.changeIsIndividual,// 是否个体
        changeRemark:data?.changeRemark,// 备注
      }
      if (After.changeTransportGoodsType && typeof After.changeTransportGoodsType === 'string'){
        After.changeTransportGoodsType = JSON.parse(After.changeTransportGoodsType)
      }
      if (typeof After.changeTransportGoodsType !== 'object'){
        After.changeTransportGoodsType = []
      }
      this.filePath = data && data.filePath ? JSON.parse(data.filePath) : [] 
      return [Before,After]
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          res = [this.before,this.after]
          res[0].transportGoodsType = res[0].transportGoodsType ? JSON.stringify(res[0].transportGoodsType) : ''
          res[1].changeTransportGoodsType = res[1].changeTransportGoodsType ? JSON.stringify(res[1].changeTransportGoodsType) : ''
          res[2] = JSON.stringify(this.filePath)
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
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.base-ruleForm {
    .descriptions {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 15%;
            font-weight: 700;
            line-height: 30px;
            color: #606266;
        }

        /deep/ .business-text {
            width: 35%;
            line-height: 30px;
        }

        /deep/ .table-title {
            width: 15%;
            font-weight: 700;
            line-height: 30px;
            color: #ffffff;
            background: #409eff;
        }

        /deep/ .table-text {
            width: 35%;
            line-height: 30px;
            background: #409eff;
        }
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
}
</style>
