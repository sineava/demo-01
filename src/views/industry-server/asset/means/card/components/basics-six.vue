<template>
  <div class="basics-other">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="预计寿命/年龄" prop="paLife">
            <el-input
              v-model="ruleForm.paLife"
              placeholder="请输入预计寿命/栽种年龄"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生/栽种年份" prop="paYearBirth">
            <el-date-picker
              v-model="ruleForm.paYearBirth"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择出生/栽种年份"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纲属科" prop="paClassesBTF">
            <el-input
              v-model="ruleForm.paClassesBTF"
              placeholder="请输入纲属科"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产地" prop="paPlaceOrigin">
            <el-input
              v-model="ruleForm.paPlaceOrigin"
              placeholder="请输入产地"
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
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
export default {
  props:{
    assetsTypeData:{
      type:Object,
      default:()=>{}
    },
    infoData:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      ruleForm: {
        paYearBirth:'',
        paClassesBTF:'',
      },
      orgList:[],
      rules:{
        paLife: [
          { required: true, message: '请输入预计寿命/栽种年龄', trigger: 'blur' },
        ],
        paYearBirth: [
          { required: true, message: '请选择出生/栽种年份', trigger: 'change' },
        ],
        paClassesBTF: [
          { required: true, message: '请选择纲属科', trigger: 'change' },
        ],
        paPlaceOrigin: [
          { required: true, message: '请输入产地', trigger: 'blur' },
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
    this.fetchOrgs()
  },
  methods: {
    initData(data){
      this.ruleForm = {
        paLife: data && data.paLife ? data.paLife : '',// 预计寿命/栽种年龄
        paYearBirth: data && data.paYearBirth ? data.paYearBirth : '',// 出生/栽种年份
        paClassesBTF: data && data.paClassesBTF ? data.paClassesBTF : '',// 纲属科
        paPlaceOrigin: data && data.paPlaceOrigin ? data.paPlaceOrigin : '',// 产地
      }
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList({}).then(res => {
        this.orgList = res.data || []
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.paYearBirth = this.ruleForm.paYearBirth ? moment(this.ruleForm.paYearBirth).format('YYYY-MM-DD') : ''
          if (this.ruleForm.useDeptId){
            this.orgList.forEach(item=>{
              if (item.orgId===this.ruleForm.useDeptId){
                this.ruleForm.useDeptName = item.orgName
                return false
              }
            })
          }
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
