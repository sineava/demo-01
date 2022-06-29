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
          <el-form-item label="来源地" prop="crSource">
            <el-input
              v-model="ruleForm.crSource"
              placeholder="请输入来源地"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="藏品年代" prop="crCollection">
            <el-input
              v-model="ruleForm.crCollection"
              placeholder="请输入藏品年代"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文物等级" prop="crLevelOCR">
            <el-input
              v-model="ruleForm.crLevelOCR"
              placeholder="请输入文物等级"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
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
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      rules:{
        crSource: [
          { required: true, message: '请输入来源地', trigger: 'blur' },
        ],
        crCollection: [
          { required: true, message: '请输入藏品年代', trigger: 'blur' },
        ],
        crLevelOCR: [
          { required: true, message: '请输入文物等级', trigger: 'blur' },
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
        crSource: data && data.crSource ? data.crSource : '',// 来源地
        crCollection:  data && data.crCollection ? data.crCollection : '',// 藏品年代
        crLevelOCR:  data && data.crLevelOCR ? data.crLevelOCR : '',// 文物等级
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
