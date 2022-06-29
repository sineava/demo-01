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
          <el-form-item label="使用权面积" prop="lareaOUR">
            <el-input-number
              v-model="ruleForm.lareaOUR"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入使用权面积（m2）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="其中:独用面积" prop="laloneWTA">
            <el-input-number
              v-model="ruleForm.laloneWTA"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入其中：独用面积（m2）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权形式" prop="propertyRF">
            <el-select
              v-model="ruleForm.propertyRF"
              clearable
              filterable
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
          <el-form-item label="权属证明" prop="ownershipCertificate">
            <el-input
              v-model="ruleForm.ownershipCertificate"
              placeholder="请输入权属证明"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权属性质" prop="lownershipNature">
            <el-select
              v-model="ruleForm.lownershipNature"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择权属性质"
            >
              <el-option
                v-for="(item,index) in lownershipNatureArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
          <el-form-item label="权属年限" prop="tenurePeriod">
            <el-input-number
              v-model="ruleForm.tenurePeriod"
              :min="0"
              :max="12000"
              style="width: 100%;"
              clearable
              placeholder="请输入权属年限（月）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="持证人" prop="holder">
            <el-select
              v-model="ruleForm.holder"
              clearable
              filterable
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
          <el-form-item label="使用权性质" prop="lnatureOUR">
            <el-select
              v-model="ruleForm.lnatureOUR"
              clearable
              filterable
              style="width: 100%;"
              placeholder="请选择使用权性质"
            >
              <el-option
                v-for="(item,index) in lnatureOURArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分摊面积" prop="lsharingArea">
            <el-input-number
              v-model="ruleForm.lsharingArea"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入分摊面积（m2）"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地类（用途）" prop="ltypeName">
            <el-input
              v-model="ruleForm.ltypeName"
              placeholder="请输入地类（用途）"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地级次" prop="llandGrades">
            <el-input
              v-model="ruleForm.llandGrades"
              placeholder="请输入土地级次"
              clearable
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
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props:{
    assetsTypeData:{
      type:Object,
      default:()=>{}
    },
    infoData:{
      type:Object,
      default:()=>{}
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {},
      lownershipNatureArr:[
        {label:'国有',value:1},
        {label:'集体',value:2}
      ],
      propertyRFArr:[
        {label:'有产权、',value:1},
        {label:'无产权',value:2},
        {label:'产权待界定',value:3},
      ],
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      lnatureOURArr:[
        {label:'出让',value:1},
        {label:'划拨',value:2},
        {label:'租赁',value:3},
        {label:'其他',value:4},
      ],
      rules:{
        lareaOUR: [
          { required: true, message: '请输入使用权面积', trigger: 'blur' },
        ],
        laloneWTA: [
          { required: true, message: '请输入其中:独用面积', trigger: 'blur' },
        ],
        propertyRF: [
          { required: true, message: '请输入产权形式', trigger: 'blur' },
        ],
        lownershipNature: [
          { required: true, message: '请选择权属性质', trigger: 'change' },
        ],
        tenurePeriod: [
          { required: true, message: '请输入权属年限（月）', trigger: 'blur' },
        ],
        holder: [
          { required: true, message: '请选择持证人', trigger: 'change' },
        ],
        releaseDate: [
          { required: true, message: '请选择发证日期', trigger: 'blur' },
        ],
        lnatureOUR: [
          { required: true, message: '请选择使用权性质', trigger: 'change' },
        ],
        lsharingArea: [
          { required: true, message: '请输入分摊面积（m2）', trigger: 'blur' },
        ],
        ltypeName: [
          { required: true, message: '请输入地类（用途）', trigger: 'blur' },
        ],
        llandGrades: [
          { required: true, message: '请输入土地级次', trigger: 'blur' },
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
        lareaOUR: data && data.lareaOUR ? data.lareaOUR : 0,// 使用权面积（m2）
        laloneWTA:  data && data.laloneWTA ? data.laloneWTA : 0,// 其中：独用面积（m2）
        propertyRF:  data && data.propertyRF ? data.propertyRF : '',// 产权形式:(1)有产权、(2)无产权、(3)产权待界定
        ownershipCertificate:  data && data.ownershipCertificate ? data.ownershipCertificate : '',// 权属证明(默认：中华人民共和国国有土地使用证)
        lownershipNature: data && data.lownershipNature ? data.lownershipNature : '',// 权属性质:(1)国有、(2)集体
        ownershipCardNumber: data && data.ownershipCardNumber ? data.ownershipCardNumber : '',// 权属证号
        tenurePeriod: data && data.tenurePeriod ? data.tenurePeriod : 0,// 权属年限（月）
        holder: data && data.holder ? data.holder : '',// 持证人:(1)本单位、(2)非单位
        releaseDate: data && data.releaseDate ? data.releaseDate : '',// 发证日期
        lnatureOUR: data && data.lnatureOUR ? data.lnatureOUR : '',// 使用权性质:(1)出让、(2)划拨、(3)租赁、(4)其他
        lsharingArea: data && data.lsharingArea ? data.lsharingArea : 0,// 分摊面积（m2）
        ltypeName: data && data.ltypeName ? data.ltypeName : '',// 地类（用途）国标分类名称自动带出
        llandGrades: data && data.llandGrades ? data.llandGrades : '',// 土地级次
        seatingPosition: data && data.seatingPosition ? data.seatingPosition : '',// 坐落位置
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
