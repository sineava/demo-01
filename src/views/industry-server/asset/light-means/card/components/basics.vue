<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="oper==='info'?true:false"
    >
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="资产名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入资产名称"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资产数量" prop="number">
            <el-input-number
              v-model="ruleForm.number"
              :precision="2"
              :min="0"
              :max="100000000000"
              style="width: 100%;"
              clearable
              placeholder="请输入资产数量"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="oper==='info'" :span="12">
          <el-form-item label="所属分类">
            <el-input
              v-model="assetsType.label"
              placeholder="请输入选择"
              :show-all-levels="false"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col v-else :span="12">
          <el-form-item label="所属分类" prop="typeId">
            <el-select
              v-model="ruleForm.typeId"
              filterable
              placeholder="请选择"
              style="width: 100%;"
              @change="handleChange"
            >
              <el-option
                v-for="item in treeData"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="采购组织形式" prop="organizationalFOP">
            <el-select
              v-model="ruleForm.organizationalFOP"
              clearable
              style="width: 100%;"
              placeholder="请选择采购组织形式"
            >
              <el-option
                v-for="(item,index) in organizationalFOPArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预算项目编号" prop="budgetIN">
            <el-input
              v-model="ruleForm.budgetIN"
              placeholder="请输入预算项目编号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="取得方式" prop="makeWay">
            <el-select
              v-model="ruleForm.makeWay"
              clearable
              style="width: 100%;"
              placeholder="请选择取得方式"
            >
              <el-option
                v-for="(item,index) in makeWayArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="取得日期" prop="makeDate">
            <el-date-picker
              v-model="ruleForm.makeDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请选择取得日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="自定义编号" prop="customNumber">
            <el-input
              v-model="ruleForm.customNumber"
              placeholder="请输入自定义编号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投入使用日期" prop="useDate">
            <el-date-picker
              v-model="ruleForm.useDate"
              type="date"
              style="width: 100%;"
              clearable
              placeholder="请输入投入使用日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { queryAssetsType } from '@/api/light-means/card'
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
        organizationalFOP:'',
        makeWay:''
      },
      treeData:[],
      assetsType:{},
      organizationalFOPArr:[
        {label:'政府集中采购',value:'政府集中采购'},
        {label:'部门集中采购',value:'部门集中采购'},
        {label:'分散采购',value:'分散采购'},
        {label:'其他',value:'其他'}
      ],
      makeWayArr:[
        {label:'新购',value:'新购'},
        {label:'调拨',value:'调拨'},
        {label:'接受捐赠',value:'接受捐赠'},
        {label:'置换',value:'置换'},
        {label:'盘盈',value:'盘盈'},
        {label:'其他',value:'其他'}
      ],
      rules:{
        name: [
          { required: true, message: '请输入资产名称', trigger: 'blur' },
        ],
        organizationalFOP: [
          { required: true, message: '请选择采购组织形式', trigger: 'change' }
        ],
        makeWay: [
          { required: true, message: '请选择取得方式', trigger: 'change' }
        ],
        makeDate: [
          { required: true, message: '请选择取得日期', trigger: 'blur' }
        ],
        number:[
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        typeId:[
          { required: true, message: '请选中所属分类', trigger: 'change' }
        ]
      }
    }
  },
  watch:{
    infoData(newV,oldV) {
      this.initData(newV)
    },
    assetsTypeData(newV,oldv){
      this.ruleForm.typeId = newV.id
      if (this.assetsType.type!==newV.type){
        this.assetsType = newV
        this.queryAssetsTypeTree()
      } else {
        this.assetsType = newV
      }
    }
  },
  async mounted() {
    this.assetsType = this.assetsTypeData
    this.initData(this.infoData)
    this.queryAssetsTypeTree()
  },
  methods: {
    // 查询国标分类
    async queryAssetsTypeTree(){
      this.loading = true
      const res = await queryAssetsType({type:this.assetsType.type})
      this.loading = false
      const tree = this.toTreeData(res.data,0)
      this.treeData = this.getChildrenTree(tree,[])
    },
    getChildrenTree(data,arr){
      data.forEach(item=>{
        if (item.children && item.children.length>0){
          this.getChildrenTree(item.children,arr)
        } else {
          arr.push(item)
        }
      })
      return arr
    },
    /**
     * 递归树
     */
    toTreeData(data){
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },
    tree(data){
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.id] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.pid]
        it.label = `${it.code} - ${it.alias || it.name}`
        it.value = it.id
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    },
    // 变化
    handleChange(e){
      let assetsType = {}
      for (let i=0;i<this.treeData.length;i++){
        if (this.treeData[i].id===e){
          assetsType = this.treeData[i]
          return false
        }
      }
      this.$emit('typeData',assetsType)
    },
    initData(data){
      this.ruleForm = {
        id: data && data.id ? data.id : '',// 主键
        versionNumber: data && data.versionNumber ? data.versionNumber : '', // 版本号
        typeId:  data && data.typeId ? data.typeId : this.assetsType.id,// 国标分类编号
        name:  data && data.name ? data.name : '',// 资产名称
        organizationalFOP:  data && data.organizationalFOP ? data.organizationalFOP : '',// 采购组织形式
        budgetIN:  data && data.budgetIN ? data.budgetIN : '',// 预算项目编号
        makeWay: data && data.makeWay ? data.makeWay : '',// 取得方式
        makeDate:  data && data.makeDate ? data.makeDate : '',// 取得日期
        useDate: data && data.useDate ? data.useDate : '',// 投入使用日期
        customNumber: data && data.customNumber ? data.customNumber : '',// 自定义编号
        number: data && data.number ? data.number : undefined,// 数量
      }
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.makeDate = this.ruleForm.makeDate ? moment(this.ruleForm.makeDate).format('YYYY-MM-DD') : ''
          this.ruleForm.useDate = this.ruleForm.useDate ? moment(this.ruleForm.useDate).format('YYYY-MM-DD') : ''
          // this.ruleForm.typeId = this.assetsTypeData.id
          delete this.ruleForm.codeId
          res = this.ruleForm
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }
}
</style>
