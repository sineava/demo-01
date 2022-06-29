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
          <el-form-item label="品牌" prop="brand">
            <el-input
              v-model="ruleForm.brand"
              placeholder="请输入品牌"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号" prop="specifications">
            <el-input
              v-model="ruleForm.specifications"
              placeholder="请输入规格型号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="经销商" prop="dealer">
            <el-input
              v-model="ruleForm.dealer"
              placeholder="请输入经销商"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保修截止日期" prop="warrantyED">
            <el-date-picker
              v-model="ruleForm.warrantyED"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请输入保修截止日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="折旧年限(月)" prop="depreciationLife">
            <el-input-number
              v-model="ruleForm.depreciationLife"
              :min="0"
              :max="120000"
              style="width: 100%;"
              clearable
              placeholder="请输入折旧年限(月)"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="使用人" prop="userThe">
            <el-input
              v-model="ruleForm.userThe"
              placeholder="请输入使用人"
              clearable
            />
          </el-form-item>
        </el-col> -->
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="使用部门" prop="useDeptId">
            <el-select
              v-model="ruleForm.useDeptId"
              clearable
              filterable
              style="width:100%;"
              placeholder="请选择使用部门"
            >
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="存放地点" prop="storagePlace">
            <el-input
              v-model="ruleForm.storagePlace"
              placeholder="请输入存放地点"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row> -->
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
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {},
      orgList:[],
      rules:{
        specifications: [
          { required: true, message: '请输入规格型号', trigger: 'blur' },
        ],
        warrantyED: [
          { required: true, message: '请输入保修截止日期', trigger: 'blur' },
        ],
        depreciationLife: [
          { required: true, message: '请输入折旧年限', trigger: 'blur' },
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
        brand: data && data.brand ? data.brand : '',// 品牌
        specifications: data && data.specifications ? data.specifications : '',// 规格型号
        dealer: data && data.dealer ? data.dealer : '',// 经销商
        warrantyED: data && data.warrantyED ? data.warrantyED : '',// 保修截止日期
        depreciationLife:data && data.depreciationLife ? data.depreciationLife : 0,// 折旧年限（月）
        useDeptId:data && data.useDeptId ? data.useDeptId : '',
        storagePlace:data && data.storagePlace ? data.storagePlace : '',
        userThe:data && data.userThe ? data.userThe : ''
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
          this.ruleForm.warrantyED = this.ruleForm.warrantyED ? moment(this.ruleForm.warrantyED).format('YYYY-MM-DD') : ''
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
