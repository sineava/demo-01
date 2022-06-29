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
          <el-form-item label="竣工日期" prop="scompletionDate">
            <el-date-picker
              v-model="ruleForm.scompletionDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择竣工日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权属性质" prop="lownershipNature">
            <el-input
              v-model="ruleForm.lownershipNature"
              placeholder="请输入权属性质"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="构筑物计量" prop="lmeasurementStructures">
            <el-input
              v-model="ruleForm.lmeasurementStructures"
              placeholder="请输入构筑物计量"
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
      rules:{
        scompletionDate: [
          { required: true, message: '请选择竣工日期', trigger: 'blur' },
        ],
        lownershipNature: [
          { required: true, message: '请输入权属性质', trigger: 'blur' },
        ],
        lmeasurementStructures: [
          { required: true, message: '请输入构筑物计量', trigger: 'blur' },
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
        scompletionDate: data && data.scompletionDate ? data.scompletionDate : '',// 竣工日期
        lownershipNature: data && data.lownershipNature ? data.lownershipNature : '',// 权属性质
        lmeasurementStructures: data && data.lmeasurementStructures ? data.lmeasurementStructures : '',// 构筑物计量
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
          this.ruleForm.scompletionDate = this.ruleForm.scompletionDate ? moment(this.ruleForm.scompletionDate).format('YYYY-MM-DD') : ''
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
