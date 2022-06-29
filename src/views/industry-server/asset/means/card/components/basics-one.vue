<template>
  <div class="basics-other">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="oper==='info'?true:false"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产权形式" prop="propertyRF">
            <el-select
              v-model="ruleForm.propertyRF"
              clearable
              style="width: 100%;"
              placeholder="请选择产权形式"
            >
              <el-option
                v-for="(item,index) in propertyRFArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建筑面积" prop="hfloorArea">
            <el-input-number
              v-model="ruleForm.hfloorArea"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入建筑面积（m2）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="其中：取暖面积" prop="hheatingArea">
            <el-input-number
              v-model="ruleForm.hheatingArea"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入其中：取暖面积（m2）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="其中：危房面积" prop="hdangerousArea">
            <el-input-number
              v-model="ruleForm.hdangerousArea"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入其中：危房面积"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权属证明" prop="ownershipCertificate">
            <el-input
              v-model="ruleForm.ownershipCertificate"
              placeholder="请输入权属证明(默认：中华人民共和国国有土地使用证)"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权属证号" prop="ownershipCardNumber">
            <el-input
              v-model="ruleForm.ownershipCardNumber"
              placeholder="请输入权属证号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建筑结构" prop="hbuildingStructure">
            <el-input
              v-model="ruleForm.hbuildingStructure"
              placeholder="请输入建筑结构"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设计用途" prop="hdesignPurposes">
            <el-input
              v-model="ruleForm.hdesignPurposes"
              placeholder="请输入设计用途"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权分类" prop="hpropertyClassification">
            <el-input
              v-model="ruleForm.hpropertyClassification"
              placeholder="请输入产权分类"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="持证人" prop="holder">
            <el-select
              v-model="ruleForm.holder"
              clearable
              style="width: 100%;"
              placeholder="请选择持证人"
            >
              <el-option
                v-for="(item,index) in holderArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发证日期" prop="releaseDate">
            <el-date-picker
              v-model="ruleForm.releaseDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择发证日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="坐落位置" prop="seatingPosition">
            <el-input
              v-model="ruleForm.seatingPosition"
              placeholder="请输入坐落位置"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权属年限（月）" prop="tenurePeriod">
            <el-input-number
              v-model="ruleForm.tenurePeriod"
              :min="0"
              :max="1200"
              style="width: 100%;"
              clearable
              placeholder="请输入权属年限（月）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props:{
    assetsTypeData:{
      type:[Object,Array],
      default:()=>{}
    },
    infoData:{
      type:[Object,Array],
      default:()=>{}
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {
        propertyRF:'',
        holder:'',
      },
      propertyRFArr:[
        {label:'有产权',value:1},
        {label:'无产权',value:2},
        {label:'产权待界定',value:3}
      ],
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      rules:{
        propertyRF: [
          { required: true, message: '请选择产权形式', trigger: 'change' },
        ],
        hfloorArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
        ],
        hheatingArea: [
          { required: true, message: '请输入其中：取暖面积', trigger: 'blur' },
        ],
        hdangerousArea: [
          { required: true, message: '请输入其中：危房面积', trigger: 'blur' },
        ],
        ownershipCertificate: [
          { required: true, message: '请输入权属证明', trigger: 'blur' },
        ],
        ownershipCardNumber:[
          { required: true, message: '请输入权属证号', trigger: 'blur' },
        ],
        tenurePeriod: [
          { required: true, message: '请输入权属年限（月）', trigger: 'blur' },
        ],
        hbuildingStructure: [
          { required: true, message: '请输入建筑结构', trigger: 'blur' },
        ],
        hpropertyClassification: [
          { required: true, message: '请输入产权分类', trigger: 'blur' },
        ],
        holder: [
          { required: true, message: '请选择持证人', trigger: 'change' },
        ],
        releaseDate: [
          { required: true, message: '请选择发证日期', trigger: 'blur' },
        ],
        seatingPosition: [
          { required: true, message: '请输入坐落位置', trigger: 'blur' },
        ]
      }
    }
  },
  watch:{
    infoData(newV,oldV) {
      this.initData(newV)
    }
  },
  async mounted() {
    this.initData(this.infoData)
  },
  methods: {
    initData(data){
      this.ruleForm = {
        propertyRF: data && data.propertyRF ? data.propertyRF : '',// 产权形式
        hfloorArea:  data && data.hfloorArea ? data.hfloorArea : 0,// 建筑面积（m2）
        hheatingArea:  data && data.hheatingArea ? data.hheatingArea : 0,// 其中：取暖面积（m2）
        hdangerousArea:  data && data.hdangerousArea ? data.hdangerousArea : 0,// 其中：危房面积（m2）
        ownershipCertificate: data && data.ownershipCertificate ? data.ownershipCertificate : '',// 权属证明(默认：中华人民共和国国有土地使用证)
        tenurePeriod: data && data.tenurePeriod ? data.tenurePeriod : 0,// 权属年限（月）
        ownershipCardNumber: data && data.ownershipCardNumber ? data.ownershipCardNumber : '',// 权属证号
        hbuildingStructure: data && data.hbuildingStructure ? data.hbuildingStructure : '',// 建筑结构
        hdesignPurposes: data && data.hdesignPurposes ? data.hdesignPurposes : '',// 设计用途
        hpropertyClassification: data && data.hpropertyClassification ? data.hpropertyClassification : '',// 产权分类
        holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
        releaseDate: data && data.releaseDate ? data.releaseDate : '',// 发证日期
        seatingPosition:data && data.seatingPosition ? data.seatingPosition : '',// 坐落位置
      }
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.releaseDate = this.ruleForm.releaseDate ? moment(this.ruleForm.releaseDate).format('YYYY-MM-DD') : ''
          res = this.ruleForm
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.basics-other {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }
}
</style>
