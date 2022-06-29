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
          <el-form-item label="出版社" prop="bpress">
            <el-input
              v-model="ruleForm.bpress"
              placeholder="请输入出版社"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出版日期" prop="bpublicationDate">
            <el-date-picker
              v-model="ruleForm.bpublicationDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请输入出版日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保存年限(月)" prop="bshelfLife">
            <el-input-number
              v-model="ruleForm.bshelfLife"
              :min="0"
              :max="120000"
              style="width: 100%;"
              clearable
              placeholder="请输入保存年限(月)"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="档案号" prop="bfileNo">
            <el-input
              v-model="ruleForm.bfileNo"
              placeholder="请输入档案号"
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
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {},
      propertyRFArr:[
        {label:'有产权',value:1},
        {label:'无产权',value:2},
        {label:'产权待界定',value:3}
      ],
      orgList:[],
      holderArr:[
        {label:'本单位',value:1},
        {label:'非单位',value:2},
      ],
      rules:{
        bpublicationDate: [
          { required: true, message: '请选择出版日期', trigger: 'blur' },
        ],
        bshelfLife: [
          { required: true, message: '请输入保存年限', trigger: 'blur' },
        ],
        bfileNo: [
          { required: true, message: '请输入档案号', trigger: 'blur' },
        ],
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
        bpress: data && data.bpress ? data.bpress : '',// 出版社
        bpublicationDate: data && data.bpublicationDate ? data.bpublicationDate : '',// 出版日期
        bshelfLife: data && data.bshelfLife ? data.bshelfLife : 0,// 保存年限（月）
        bfileNo: data && data.bfileNo ? data.bfileNo : '',// 档案号
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
          this.ruleForm.bpublicationDate = this.ruleForm.bpublicationDate ? moment(this.ruleForm.bpublicationDate).format('YYYY-MM-DD') : ''
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
