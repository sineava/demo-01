<template>
  <el-dialog
    title="批量导入房屋类资产数据"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
      height="500"
      @expand-change="expandChange"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-card class="box-card">
            <Basics
              :ref="`Basics_${props.$index}`"
              :assetsTypeData="props.row.assetsTypes || {}"
              :infoData="props.row || {}"
              :oper="oper"
            />
            <BasicsLand
              :ref="`BasicsOther_${props.$index}`"
              :assetsTypeData="props.row.assetsTypes || {}"
              :infoData="props.row || {}"
              :oper="oper"
            />
            <Finance :ref="`Finance_${props.$index}`" :financeData="props.row || {}" :oper="oper" />
            <Other
              :ref="`Other_${props.$index}`"
              :assetsTypeData="props.row.assetsTypes || {}"
              :infoData="props.row || {}"
              :oper="oper"
            />
            <div style="text-align: center;"><el-button size="mini" type="success" @click="handeUpdate(props.$index)">更新数据</el-button></div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="80">
        <template v-slot="props">
          {{ props.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="资产名称"
        prop="name"
      />
      <el-table-column
        label="资产大类"
        prop="type"
      />
      <el-table-column
        label="国标编码"
        prop="code"
      />
      <el-table-column
        label="取得方式"
        prop="makeWay"
      />
      <el-table-column
        label="取得日期"
        prop="makeDate"
      />
      <el-table-column
        label="数量"
        prop="number"
      />
      <el-table-column
        label="当前状态"
      >
        <template v-slot="scope">
          <el-tag :type="scope.row.submit ? 'success':'danger'">{{ scope.row.submit ? '数据完整':'数据不完整' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button
        :type="submitNum>0?'info':'success'"
        size="mini"
        :disabled="submitNum>0?true:false"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import { queryAssetsType,excelImport } from '@/api/light-means/card'
import Basics from '../components/basics'// 通用基础信息
import Finance from '../components/finance'// 财务
import BasicsLand from '../components/basics-land'// 房屋
import Other from '../components/other' // 其他信息
import moment from 'moment'
import { mapGetters } from 'vuex'
import {basics,finance,use,others} from './ver-submit-from-data'
export default {
  components: {
    Basics,
    Finance,
    BasicsLand,
    Other
  },
  data() {
    return {
      loading:false, // 加载动画
      dialogVisible:false,
      oper:'add',
      tableData: [],
      excelData: [],
      assetsTypeList:[],
      orgList:[],
      submitNum:1,
      field:[
        // 基础信息 - 通用

        // { label:'原资产编号', prop:'onlyCode' },
        { label:'资产名称', prop:'name' },
        { label:'资产大类', prop:'type' }, // 1-房屋/2-设备/3-文物/4-图书/5-家具/6-动植物/7-物资/101-构筑物/102-土地/201-车辆
        { label:'国标编码', prop:'code' },
        { label:'采购组织形式', prop:'organizationalFOP' },
        { label:'取得方式', prop:'makeWay' },
        { label:'取得日期', prop:'makeDate' },
        { label:'投入使用日期', prop:'useDate' },
        { label:'自定义编号', prop:'customNumber' },
        { label:'数量', prop:'number'},
        { label:'预算项目编号', prop:'budgetIN'},
        // 财务信息 - 通用
        { label:'价值类型', prop:'valueType' },
        { label:'价值', prop:'cost' },
        { label:'账面净值', prop:'bookValue' },
        { label:'财政拨款', prop:'funding' },
        { label:'非财政拨款', prop:'noFunding' },
        { label:'财务入账日期', prop:'dateOfFinancialEntry' },
        { label:'财务入账状态', prop:'accountingStatus' },
        { label:'会计凭证号', prop:'accountingCN' },
        { label:'折旧状态', prop:'stateDepreciation' },
        // 其他信息 - 通用
        { label:'管理部门名称', prop:'deptName' },
        { label:'备用字段', prop:'standby' },
        { label:'备注', prop:'remark' },
        /*
         * { label:'照片', prop:'filePath' }, // 照片
         * 1-房屋
         */
        { label:'使用权面积（m2）', prop:'lareaOUR' },
        { label:'其中：独用面积（m2）', prop:'laloneWTA' },
        { label:'产权形式', prop:'propertyRF' },// (1)有产权、(2)无产权、(3)产权待界定
        { label:'权属证明', prop:'ownershipCertificate' }, // 权属证明(默认：中华人民共和国国有土地使用证)
        { label:'权属性质', prop:'lOwnershipNature' }, // 权属性质(1)国有、(2)集体
        { label:'权属证号', prop:'ownershipCardNumber' }, // 权属证号
        { label:'权属年限（月）', prop:'tenurePeriod' }, // 权属年限（月）
        { label:'持证人', prop:'holder' }, // 持证人:(1)本单位、(2)非单位
        { label:'发证日期', prop:'releaseDate' }, // 发证日期
        { label:'使用权性质', prop:'lnatureOUR' }, // 使用权性质:(1)出让、(2)划拨、(3)租赁、(4)其他
        { label:'分摊面积（m2）', prop:'lsharingArea' }, // 分摊面积（m2）
        { label:'土地级次', prop:'llandGrades' }, // 土地级次
        { label:'坐落位置', prop:'seatingPosition' }, // 坐落位置
        { label:'自用面积（m2）', prop:'selfUseArea' }, // 自用面积（m2）
        { label:'自用价值（元）', prop:'selfUseValue' }, // 自用价值（元）
        { label:'出借面积（m2）', prop:'loanedArea' }, // 出借面积（m2）
        { label:'出借价值（元）', prop:'loanedValue' }, // 出借价值（元）
        { label:'出租价值（元）', prop:'leasedArea' }, // 出租面积（m2）
        { label:'出租价值（元）', prop:'leasedValue' }, // 出租价值（元）
        { label:'闲置面积（m2）', prop:'idleArea' }, // 闲置面积（m2）
        { label:'闲置价值（元）', prop:'idleValue' }, // 闲置价值（元）
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {

  },
  methods: {
    async opens(excelData){
      this.dialogVisible = true
      this.excelData = excelData
      this.loading = true
      await this.queryAssetsTypeTree()
      await this.fetchOrgs()
      this.assembleTable()
      this.loading = false
    },
    // 点击展开
    expandChange(row){

    },
    submit(){
      if (this.submitNum>0){
        return false
      }
      const data = []
      this.tableData.forEach(item=>{
        data.push({landInfoDto:item.submit,typeInfoId:item.submit.typeId})
      })
      excelImport(data).then(res=>{
        if (res.code==='0'){
          this.dialogVisible = false
        }
      })
    },
    // 删除
    handleDelete(index,item){
      if (item.submit===false){
        this.submitNum--
      }
      this.tableData.splice(index,1)
    },
    getFieldProp(key){
      if (key>=this.field.length){
        return ''
      }
      return this.field[key].prop
    },
    getSubmitForm(index){
      const basics = this.$refs[`Basics_${index}`].submitForm('ruleForm')
      const info = this.$refs[`BasicsOther_${index}`].submitForm('ruleForm')
      const finance = this.$refs[`Finance_${index}`].submitForm('ruleForm')
      const other = this.$refs[`Other_${index}`].submitForm('ruleForm')
      if (basics===false || info===false || finance===false ||other===false){
        return false
      }
      return Object.assign(basics, info,finance,other)
    },
    // 更新数据
    handeUpdate(index){
      const res = this.getSubmitForm(index)
      if (res!==false){
        this.tableData[index] = Object.assign(this.tableData[index], res)
        this.tableData[index].submit = res
        this.submitNum--
      }
    },
    // 验证提交表单
    verSubmitFrom(data){
      const basics_data = basics(data,101)
      const finance_data = finance(data,101)
      const use_data = use(data,101)
      const others_data = others(data,101)
      if (basics_data===false || use_data===false || finance_data===false ||others_data===false){
        return false
      }
      return Object.assign(basics_data, finance_data,use_data,others_data)
    },
    // 查询国标分类
    async queryAssetsTypeTree(){
      const res = await queryAssetsType()
      this.assetsTypeList = res.data || []
    },
    async fetchOrgs() {
      const res = await getAllOrgList()
      this.orgList = res.data || []
    },
    assembleTable(){
      this.submitNum = 0
      let newTable = this.excelData.map(item=>{
        let row = {}
        this.field.forEach((val,key)=>{
          const prop = val['prop']
          if (prop){
            switch (prop) {
            case 'deptName':
              row[prop] = item[key]
              row['deptId'] = this.getValue('deptId',item[key])
              break
            case 'code':
              row['assetsTypes'] = this.assetsType(item[key])
              row['typeId'] = row['assetsTypes'] && row['assetsTypes'].id ? row['assetsTypes'].id : ''
              row['code'] = row['assetsTypes'] && row['assetsTypes'].id ? item[key] : ''
              break
            default:
              row[prop] = this.getValue(prop,item[key])
              break
            }
          }
        })
        const submit = this.verSubmitFrom(row)
        row.submit = submit
        if (submit===false){
          this.submitNum++
        }
        return row
      })
      this.tableData = newTable
    },
    format(value,format){
      let date = moment(value).format(format || 'YYYY-MM-DD')
      if (date!=='Invalid date'){
        return date
      }
      return ''
    },
    getValue(prop,val){
      let value = ''
      switch (prop) {
      case 'holder':
        value = this.holder(val)
        break
      case 'propertyRF':
        value = this.propertyRF(val)
        break
      case 'deptId': // 管理部门ID
        value = this.deptId(val)
        break
      case 'makeDate':
        value = val ? this.format(val) : ''
        break
      case 'useDate':
        value = val ? this.format(val) : ''
        break
      case 'dateOfFinancialEntry':
        value = val ? this.format(val) : ''
        break
      case 'releaseDate':
        value = val ? this.format(val) : ''
        break
      case 'lnatureOUR':
        value = val ? this.lnatureOUR(val) : ''
        break
      case 'lOwnershipNature':
        value = val ? this.lOwnershipNature(val) : ''
        break
      default:
        value = val
        break
      }
      return value
    },
    assetsType(value){
      let assetsType = {
        type:101
      }
      for (let i=0;i<this.assetsTypeList.length;i++){
        if (this.assetsTypeList[i].code===value){
          this.assetsTypeList[i].label = `${this.assetsTypeList[i].code} - ${this.assetsTypeList[i].alias ? this.assetsTypeList[i].alias : this.assetsTypeList[i].name}`
          assetsType = this.assetsTypeList[i]
          return false
        }
      }
      return assetsType
    },
    deptId(value){
      let deptId = ''
      if (this.user_info.orgid!=='1375'){
        deptId = Number(this.user_info.orgid)
      } else {
        for (let i=0;i<this.orgList.length;i++){
          if (this.orgList[i].orgName===value){
            deptId = this.orgList[i].orgId
            return true
          }
        }
      }
      return deptId
    },
    // 权属性质(1)国有、(2)集体
    lOwnershipNature(val){
      let value = ''
      switch (val) {
      case '国有':
        value = 1
        break
      case '集体':
        value = 2
        break
      default:
        break
      }
      return value
    },
    // 使用权性质:(1)出让、(2)划拨、(3)租赁、(4)其他
    lnatureOUR(val){
      let value = ''
      switch (val) {
      case '出让':
        value = 1
        break
      case '划拨':
        value = 2
        break
      case '租赁':
        value = 3
        break
      case '其他':
        value = 4
        break
      default:
        break
      }
      return value
    },
    // 持证人
    holder(val){
      let value = ''
      switch (val) {
      case '本单位':
        value = 1
        break
      case '非单位':
        value = 2
        break
      default:
        break
      }
      return value
    },
    // 产权形式
    propertyRF(val){
      let value = ''
      switch (val) {
      case '有产权':
        value = 1
        break
      case '无产权':
        value = 2
        break
      case '产权待界定':
        value = 3
        break
      default:
        break
      }
      return value
    }
  }
}
</script>
<style lang="scss">

.popper-tools {
    overflow-y: auto;
    height: 300px;
}
</style>
