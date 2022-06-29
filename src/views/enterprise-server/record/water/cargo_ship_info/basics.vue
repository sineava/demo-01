<template>
  <div>
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      class="add-ylba"
    >
      <div v-if="oper!=='add'" class="icon-title">
        <span class="span" />备案信息
      </div>
      <el-descriptions
        v-if="oper!=='add'"
        class="descriptions"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="备案编号:">
          {{ ruleForm.onlyCode }}
        </el-descriptions-item>
        <el-descriptions-item label="备案状态:">
          <el-tag :type="['','warning','success','success'][ruleForm.isStatus-1]">{{ ['审核中','退回','受理通过','审核通过'][ruleForm.isStatus-1] }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <div class="icon-title">
        <span class="span" />基本资料
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
        <el-descriptions-item>
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />所有人:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="allPeople">
            <el-input v-model.trim="ruleForm.allPeople" placeholder="请输入所有人" />
          </el-form-item>
          <span v-else>{{ ruleForm.allPeople }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />营业执照/身份证号码:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="businessLicenseNo">
            <el-input v-model.trim="ruleForm.businessLicenseNo" placeholder="请输入营业执照（身份证号码）" />
          </el-form-item>
          <span v-else>{{ ruleForm.businessLicenseNo }}</span>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />经营人:</template>
          <span>{{ user_info.orgname }}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />许可证编号:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="licenseCode">
            <el-input v-model.trim="ruleForm.licenseCode" placeholder="请输入许可证编号" />
          </el-form-item>
          <span v-else>{{ ruleForm.licenseCode }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />联系电话:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="phone">
            <el-input v-model.trim="ruleForm.phone" placeholder="请输入联系电话" />
          </el-form-item>
          <span v-else>{{ ruleForm.phone }}</span>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />经营范围:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="allowedBusiness">
            <el-input v-model.trim="ruleForm.allowedBusiness" type="textarea" placeholder="请输入经营范围" />
          </el-form-item>
          <span v-else>{{ ruleForm.allowedBusiness }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <div class="icon-title">
        <span class="span" />备案事项相关的运力规模合计
      </div>
      <el-descriptions
        class="descriptions-one none-padding"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />艘数:</template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="shipNum">
                <el-input-number
                  v-model="ruleForm.shipNum"
                  :min="0"
                  :max="100000000000"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入艘数"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.shipNum }}</span>
              <span class="unit">艘</span>
            </el-col>
          </el-row>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />载量:</template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="loadsGrossTon">
                <el-input-number
                  v-model="ruleForm.loadsGrossTon"
                  :min="0"
                  :max="10000000000000"
                  :precision="3"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入总吨"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.loadsGrossTon }}</span>
              <span class="unit">总吨</span>
            </el-col>
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="loadsDeadWeightTon">
                <el-input-number
                  v-model="ruleForm.loadsDeadWeightTon"
                  :min="0"
                  :max="1000000000000"
                  :precision="3"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入载重吨"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.loadsDeadWeightTon }}</span>
              <span class="unit">载重吨</span>
            </el-col>
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="loadsSpace">
                <el-input-number
                  v-model="ruleForm.loadsSpace"
                  :min="0"
                  :max="1000000000"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入箱位"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.loadsSpace }}</span>
              <span class="unit">箱位</span>
            </el-col>
          </el-row>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" />功率:</template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="powerNum">
                <el-input-number
                  v-model="ruleForm.powerNum"
                  :min="0"
                  :max="10000000000"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入功率台"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.powerNum }}</span>
              <span class="unit">台</span>
            </el-col>
            <el-col :span="6">
              <el-form-item v-if="oper==='add' || oper==='edit'" class="line-row" prop="powerKw">
                <el-input-number
                  v-model="ruleForm.powerKw"
                  :min="0"
                  :max="10000000000"
                  :precision="2"
                  :controls="false"
                  class="input-number"
                  placeholder="请输入功率千瓦"
                />
              </el-form-item>
              <span v-else class="line-row line-row-span">{{ ruleForm.powerKw }}</span>
              <span class="unit">千瓦</span>
            </el-col>
          </el-row>
        </el-descriptions-item>
      </el-descriptions>

      <div class="icon-title">
        <span class="span" />新增运力情况说明
      </div>
      <el-descriptions
        class="descriptions-one-table"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="船舶类型:" :span="2">
          <el-row :gutter="20">
            <el-col class="row-title br bg"><i v-if="oper==='add' || oper==='edit'" class="required" />散货船</el-col>
            <el-col class="row-title br bg"><i v-if="oper==='add' || oper==='edit'" class="required" />自卸砂船</el-col>
            <el-col class="row-title br bg"><i v-if="oper==='add' || oper==='edit'" class="required" />集装箱船</el-col>
            <el-col class="row-title br bg"><i v-if="oper==='add' || oper==='edit'" class="required" />多用途船</el-col>
            <el-col class="row-title bg"><i v-if="oper==='add' || oper==='edit'" class="required" />其他普货船</el-col>
          </el-row>
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label">申请艘数:</template>
          <el-row :gutter="20">
            <el-col class="row-title br">
              <el-form-item v-if="oper==='add' || oper==='edit'" prop="bulkCarrier">
                <el-input-number
                  v-model="ruleForm.bulkCarrier"
                  :min="0"
                  :max="10000000000"
                  :controls="false"
                  placeholder="请输入散货船艘数"
                  class="table-number"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.bulkCarrier }}</span>
            </el-col>
            <el-col class="row-title br">
              <el-form-item v-if="oper==='add' || oper==='edit'" prop="dumpingSandBoat">
                <el-input-number
                  v-model="ruleForm.dumpingSandBoat"
                  :min="0"
                  :max="10000000000"
                  :controls="false"
                  placeholder="请输入自卸砂船艘数"
                  class="table-number"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.dumpingSandBoat }}</span>
            </el-col>
            <el-col class="row-title br">
              <el-form-item v-if="oper==='add' || oper==='edit'" prop="containerShip">
                <el-input-number
                  v-model="ruleForm.containerShip"
                  :min="0"
                  :max="10000000000"
                  :controls="false"
                  placeholder="请输入集装箱船艘数"
                  class="table-number"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.containerShip }}</span>
            </el-col>
            <el-col class="row-title br">
              <el-form-item v-if="oper==='add' || oper==='edit'" prop="multiPurposeShip">
                <el-input-number
                  v-model="ruleForm.multiPurposeShip"
                  :min="0"
                  :max="10"
                  :controls="false"
                  placeholder="请输入多用途船艘数"
                  class="table-number"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.multiPurposeShip }}</span>
            </el-col>
            <el-col class="row-title">
              <el-form-item v-if="oper==='add' || oper==='edit'" prop="otherGeneralCargoShip">
                <el-input-number
                  v-model="ruleForm.otherGeneralCargoShip"
                  :min="0"
                  :max="10"
                  :controls="false"
                  placeholder="请输入其他普货船艘数"
                  class="table-number"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.otherGeneralCargoShip }}</span>
            </el-col>
          </el-row>
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="oper==='add' || oper==='edit'" class="required" style="margin-right: 10px;" />船舶来源:</template>
          <el-form-item v-if="oper==='add' || oper==='edit'" prop="shipSource">
            <el-radio-group v-model="ruleForm.shipSource" size="small">
              <el-radio :label="1" border>新建船舶</el-radio>
              <el-radio :label="2" border>购置外国籍</el-radio>
              <el-radio :label="3" border>光租外国籍船舶</el-radio>
              <el-radio :label="4" border>中国籍国际航行船舶转入国内运输</el-radio>
              <el-radio :label="5" border>省内普通货物货船运输转省级运输</el-radio>
            </el-radio-group>
          </el-form-item>
          <span v-else>{{ ['新建船舶','购置外国籍','光租外国籍船舶','中国籍国际航行船舶转入国内运输','省内普通货物货船运输转省级运输'][ruleForm.shipSource-1] }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <div class="icon-title">
        <span class="span" /><i v-if="oper==='add' || oper==='edit'" class="required" /> 拟建船舶情况
        <el-button
          v-if="oper==='add' || oper==='edit'"
          style="margin-left: 20px;"
          type="success"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          添加
        </el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="table"
      >
        <el-table-column
          label="编号"
          width="65"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="船型"
        >
          <template v-slot="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.shipType" placeholder="请输入船型" />
            <span v-else>{{ scope.row.shipType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="总长（米）"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="scope.row.isEdit"
              v-model="scope.row.totalLength"
              :min="0"
              :max="100000000"
              :precision="2"
              :controls="false"
              placeholder="请输入总长（米）"
              class="table-number"
            />
            <span v-else>{{ scope.row.totalLength }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="总宽（米）"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="scope.row.isEdit"
              v-model="scope.row.totalWidth"
              :min="0"
              :max="100000000"
              :precision="2"
              :controls="false"
              placeholder="请输入总宽（米）"
              class="table-number"
            />
            <span v-else>{{ scope.row.totalWidth }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="船名"
        >
          <template v-slot="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.shipName" placeholder="请输入船名" />
            <span v-else>{{ scope.row.shipName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="拟投资金额（万元）"
        >
          <template v-slot="scope">
            <el-input-number
              v-if="scope.row.isEdit"
              v-model="scope.row.investmentAmount"
              :min="0"
              :max="10000000000"
              :precision="2"
              :controls="false"
              placeholder="请输入拟投资金额（万元）"
              class="table-number"
            />
            <span v-else>{{ scope.row.investmentAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="建造船厂"
        >
          <template v-slot="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.buildingShipyard" placeholder="请输入建造船厂" />
            <span v-else>{{ scope.row.buildingShipyard }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="oper==='add' || oper==='edit'"
          fixed="right"
          label="操作"
          width="100"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              v-if="scope.row.isEdit"
              type="text"
              size="small"
              @click="handleSave(scope.row,scope.$index)"
            >
              保存
            </el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="handleEdit(scope.row,scope.$index)"
            >
              编辑
            </el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="备注:" prop="remark">
        <el-input
          v-if="oper==='add' || oper==='edit'"
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入备注"
        />
        <span v-else>
          {{ ruleForm.remark }}
        </span>
      </el-form-item>
      <el-form-item
        v-if="oper==='add' || oper==='edit'"
        class="isDisclaimers"
        label="申请承诺:"
        prop="isDisclaimers"
      >
        <el-checkbox v-model="ruleForm.isDisclaimers">本备案申请人承诺上述填写内容及申请材料均真实有效，如有虚假，愿意承担一切后果及法律责任。</el-checkbox>
      </el-form-item>
      <el-form-item
        v-else
        class="isDisclaimers"
        label="申请承诺:"
      >
        <el-checkbox v-model="isDisclaimers" disabled>本备案申请人承诺上述填写内容及申请材料均真实有效，如有虚假，愿意承担一切后果及法律责任。</el-checkbox>
      </el-form-item>
      <el-form-item
        label="附件:"
        style="margin-top: 20px;"
      >
        <upload
          v-if="oper==='add' || oper==='edit'"
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
          :show-delete="(oper==='add' || oper==='edit') ? true : false"
          @handleDelete="handleDelete"
        />
      </el-form-item>
    </el-form>

    <el-form
      v-if="oper==='accept'"
      ref="acceptForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      class="add-ylba"
    >
      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" />受理信息
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
        <el-descriptions-item label="受理人:">
          {{ acceptForm.reviewedBy }}
        </el-descriptions-item>
        <el-descriptions-item label="受理日期:">
          {{ acceptForm.reviewedDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required" />业务受理:</template>
          <el-form-item prop="isStatus">
            <el-radio v-model="acceptForm.isStatus" :label="2">退回</el-radio>
            <el-radio v-model="acceptForm.isStatus" :label="3">业务受理</el-radio>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="required" />是否提交港航中心审核:</template>
          <el-form-item prop="isExamine">
            <el-radio v-model="acceptForm.isExamine" :label="0">否</el-radio>
            <el-radio v-model="acceptForm.isExamine" :label="1">是</el-radio>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label="受理意见:" :span="2">
          <el-form-item prop="reviewedOpinion">
            <el-input v-model.trim="acceptForm.reviewedOpinion" type="textarea" placeholder="请输入受理意见" />
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>

    <el-form
      v-if="oper==='audit'"
      ref="auditForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      class="add-ylba"
    >
      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" />审核信息
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
        <el-descriptions-item label="审核人:">
          {{ auditForm.reviewedByCenter }}
        </el-descriptions-item>
        <el-descriptions-item label="审核日期:">
          {{ auditForm.reviewedDateCenter }}
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label"><i class="required" />业务受理:</template>
          <el-form-item prop="isStatus">
            <el-radio v-model="auditForm.isStatus" :label="2">退回</el-radio>
            <el-radio v-model="auditForm.isStatus" :label="4">业务受理</el-radio>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label="审核意见:" :span="2">
          <el-form-item prop="reviewedOpinionCenter">
            <el-input v-model.trim="auditForm.reviewedOpinionCenter" type="textarea" placeholder="请输入审核意见" />
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="oper!=='info'"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm(`${oper==='add' || oper==='edit' ? 'rule' : oper}Form`)"
      >
        提交
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
import { addFilingData, updateFilingData,acceptFilingData,auditFilingData,getFilingInfo } from '@/api/water-transportation-services/keep-on-record/ordinary-freighter-transport-filing'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { telephone } from '@/utils/validate'
export default {
  components: {
    upload,
    CommonTable
  },
  props:{
    fid:{
      type:[Number,String],
      default:0
    },
    isEdit:{
      type:Boolean,
      default:false
    },
    oper:{
      type:String,
      default:'add'
    }
  },
  data() {
    return {
      ruleForm: { // 编辑内容
        enterpriseId: '',
        shipSource:'', // 来源
        bulkCarrier: 0,
        dumpingSandBoat:0,
        multiPurposeShip:0,
        containerShip:0,
        otherGeneralCargoShip:0,
        isDisclaimers:''
      },
      isDisclaimers:true,
      id:'',
      reviewedFile:[],
      acceptForm:{
        reviewedBy:'',// 受理人-当前企业名称
        reviewedDate:moment(new Date()).format('YYYY-MM-DD'), // 受理时间-当前时间
        isStatus: '',// 受理状态
        isExamine: '', // 是否提交港航中心审核(0 否 1是)
      }, // 受理内容
      auditForm:{
        reviewedByCenter:'',// 审核人-当前企业名称
        reviewedDateCenter:moment(new Date()).format('YYYY-MM-DD'), // 审核时间-当前时间
        isStatus: '',// 审核状态
      }, // 审核内容
      tableData: [],
      rules: {
        shipSource: [
          { required: true, message: '请选择船舶来源', trigger: 'change' }
        ],
        businessLicenseNo:[
          { required: true, message: '请输入营业执照（身份证号码）', trigger: 'blur' }
        ],
        allPeople: [
          { required: true, message: '请输入所有人', trigger: 'blur' }
        ],
        enterpriseId: [
          { required: true, message: '请选择经营人', trigger: 'change' }
        ],
        licenseCode: [
          { required: true, message: '请输入许可证编号', trigger: 'blur' }
        ],
        allowedBusiness: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        bulkCarrier:[
          { required: true, message: '请输入散货船艘数', trigger: 'blur' }
        ],
        dumpingSandBoat:[
          { required: true, message: '请输入自卸砂船艘数', trigger: 'blur' }
        ],
        containerShip:[
          { required: true, message: '请输入集装箱船艘数', trigger: 'blur' }
        ],
        multiPurposeShip:[
          { required: true, message: '请输入多用途船艘数', trigger: 'blur' }
        ],
        otherGeneralCargoShip:[
          { required: true, message: '请输入其他普货船艘数', trigger: 'blur' }
        ],
        shipNum:[
          { required: true, message: '请输入艘数', trigger: 'blur' }
        ],
        loadsGrossTon:[
          { required: true, message: '请输入载量总吨', trigger: 'blur' }
        ],
        loadsDeadWeightTon:[
          { required: true, message: '请输入载量载重吨', trigger: 'blur' }
        ],
        loadsSpace:[
          { required: true, message: '请输入载量箱位', trigger: 'blur' }
        ],
        powerNum:[
          { required: true, message: '请输入功率台', trigger: 'blur' }
        ],
        powerKw:[
          { required: true, message: '请输入功率千瓦', trigger: 'blur' }
        ],
        isStatus:[
          { required: true, message: '请输入业务受理状态', trigger: 'change' }
        ]
      },
      loading: false,
      info: {}
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    fid(newV,obj){
      this.id = newV
      this.init()
    }
  },
  async mounted() {
    this.id = this.fid
    this.init()
  },
  methods: {
    async init(){
      if (this.id){
        let info = await getFilingInfo(this.id)
        this.data = info.data || {}
        this.ruleForm = this.data
        let tableData = this.data.shipVoList || []
        tableData.map(item=>{
          item.isEdit = false
          return item
        })
        this.reviewedFile = this.data.filePath ? JSON.parse(this.data.filePath) : []
        this.acceptForm.reviewedBy = this.user_info.orgname
        this.auditForm.reviewedByCenter = this.user_info.orgname
        this.tableData = tableData
        this.ruleForm.isDisclaimers = true
      }
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
    handleAdd(){
      this.tableData.push({
        buildingShipyard: '', // 建造船厂
        investmentAmount: undefined, // 拟投资金额（万元）
        shipName: '', // 船名
        shipType: '', // 船型
        totalLength: undefined, // 总长（米
        totalWidth: undefined, // 总宽（米）
        isEdit:true
      })
    },
    // 表格编辑
    handleEdit(row,index){
      this.tableData[index].isEdit = true
    },
    // 表格保存
    handleSave(row,index){

      this.tableData[index].isEdit = false
    },
    // 表格删除
    handleDel(row,index){
      this.tableData.splice(index,1)
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.oper==='add' || this.oper==='edit'){
            this.addSave()
          } else if (this.oper==='audit'){
            this.auditSave()
          } else {
            this.acceptSave()
          }
        } else {
          return false
        }
      })
    },
    // 添加+修改保存
    async addSave() {
      let enterpriseName = this.user_info.orgname
      let tableData = []
      this.tableData.forEach(item=>{
        if (item.isEdit===false){
          tableData.push(
            {
              buildingShipyard: item.buildingShipyard, // 建造船厂
              investmentAmount: item.investmentAmount, // 拟投资金额（万元）
              shipName: item.shipName, // 船名
              shipType: item.shipType, // 船型
              totalLength: item.totalLength, // 总长（米
              totalWidth: item.totalWidth, // 总宽（米）
            }
          )
        }
      })
      if (tableData.length===0 || tableData.length!==this.tableData.length){
        this.$message.error('请先完善保存拟建船舶情况')
        return false
      }
      let data = {
        id:this.ruleForm.id || '',
        allPeople:this.ruleForm.allPeople,
        allowedBusiness:this.ruleForm.allowedBusiness,
        bulkCarrier:this.ruleForm.bulkCarrier,
        businessLicenseNo:this.ruleForm.businessLicenseNo,
        containerShip:this.ruleForm.containerShip,
        dumpingSandBoat:this.ruleForm.dumpingSandBoat,
        enterpriseId:this.ruleForm.enterpriseId,
        filePath:JSON.stringify(this.reviewedFile),
        licenseCode:this.ruleForm.licenseCode,
        loadsDeadWeightTon:this.ruleForm.loadsDeadWeightTon,
        loadsGrossTon:this.ruleForm.loadsGrossTon,
        loadsSpace:this.ruleForm.loadsSpace,
        managementPeople:enterpriseName,
        enterpriseName:enterpriseName,
        otherGeneralCargoShip:this.ruleForm.otherGeneralCargoShip,
        phone:this.ruleForm.phone,
        powerKw:this.ruleForm.powerKw,
        powerNum:this.ruleForm.powerNum,
        shipNum:this.ruleForm.shipNum,
        shipSource:this.ruleForm.shipSource,
        shipDtoList:tableData,
        remark:this.ruleForm.remark
      }
      this.loading = true
      let res = this.ruleForm.id ? await updateFilingData(data) : await addFilingData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 受理保存
    async acceptSave() {
      let data = {
        id:this.ruleForm.id,
        reviewedBy:this.acceptForm.reviewedBy,
        reviewedDate:this.acceptForm.reviewedDate,
        reviewedOpinion:this.acceptForm.reviewedOpinion,
        isStatus:this.acceptForm.isStatus,
        isExamine:this.acceptForm.isExamine
      }
      this.loading = true
      let res = await acceptFilingData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 审核保存
    async auditSave() {
      let data = {
        id:this.ruleForm.id,
        reviewedByCenter:this.auditForm.reviewedByCenter,
        reviewedDateCenter:this.auditForm.reviewedDateCenter,
        reviewedOpinionCenter:this.auditForm.reviewedOpinionCenter,
        isStatus:this.auditForm.isStatus
      }
      this.loading = true
      let res = await auditFilingData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    returnBack() {
      this.$router.push({ path: '/record/water/cargo_ship_info' })
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
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
        width: 40%;
        line-height: 30px;
    }
}

.descriptions-one {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 90%;
        line-height: 30px;
    }
}

.descriptions-one-table {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        padding: 0 10px;
        width: 90%;
        line-height: 30px;
    }
}

.add-ylba {
    .el-form-item {
        margin: 0;
    }

    .isDisclaimers {
        margin: 20px 0;

        /deep/ .el-form-item__label {
            font-size: 16px;
            font-weight: 600;
        }

        /deep/ .el-checkbox__label {
            font-size: 18px;
            font-weight: 600;
        }

        /deep/ .el-checkbox__inner {
            width: 18px;
            height: 18px;
        }

        /deep/ .el-checkbox__inner::after {
            top: 3px;
            left: 6px;
        }

        /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
            color: #409eff;
        }

        /deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
            border-color: #409eff;
            background-color: #409eff;
        }
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }

    .table {
        /deep/ .el-input__inner {
            text-align: left;
        }
    }

    .line-row {
        display: inline-block;
        width: 80%;
    }

    .unit {
        display: inline-block;
        width: 20%;
        text-align: center;
    }

    .row-title {
        display: inline-block;
        padding: 0;
        width: 20%;
        line-height: 50px;
        text-align: center;
    }

    .bg {
        background: #fafafa;
    }

    .table-number {
        width: 100%;
    }

    .el-radio {
        margin: 10px 10px 10px 0;
    }

    .br {
        border-right: 1px solid #f2f2f2;
    }
}
</style>
