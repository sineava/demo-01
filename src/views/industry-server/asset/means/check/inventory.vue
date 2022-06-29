<template>
  <el-card id="means-check-details" class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="资产盘点" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="ruleForm.state!==1"
          style="float: right; margin-top: 12px;"
          type="success"
          size="small"
          icon="el-icon-success"
          @click="complete"
        >
          完成盘点
        </el-button>
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <div class="icon-title">
          <span class="span" />盘点计划信息
        </div>
        <el-descriptions
          :column="2"
          class="descriptions"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="盘点计划标题" required :span="2">
            {{ ruleForm.title }}
          </el-descriptions-item>
          <el-descriptions-item label="盘点部门" required>
            {{ ruleForm.deptName }}
          </el-descriptions-item>
          <el-descriptions-item label="盘点人" required>
            {{ ruleForm.principal }}
          </el-descriptions-item>
          <el-descriptions-item label="记账日期" required>
            {{ ruleForm.billingDate }}
          </el-descriptions-item>
          <el-descriptions-item label="计划盘点日期" required>
            {{ ruleForm.planDate }}
          </el-descriptions-item>
          <el-descriptions-item label="说明">
            {{ ruleForm.remark }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="icon-title">
          <span class="span" />盘点明细
          <el-button
            v-if="ruleForm.state!==1"
            style="margin-left: 10px;"
            type="success"
            size="small"
            icon="el-icon-circle-plus"
            @click="addDetailed"
          >
            添加盘盈
          </el-button>
          <el-button
            style="margin-left: 10px;"
            type="success"
            size="small"
            icon="el-icon-folder"
            @click="excel"
          >
            导出
          </el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          element-loading-text="Loading"
          stripe
          fit
          border
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="60"
          >
            <template v-slot="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="onlyCode"
            label="资产编号"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="type"
            label="资产大类"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template v-slot="scope">
              {{ getTypeLable(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="资产分类"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="name"
            label="资产名称"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="makeDate"
            label="取得日期"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="number"
            label="数量"
            align="center"
            :show-overflow-tooltip="true"
          /><el-table-column
            prop="valueType"
            label="价值类型"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="cost"
            label="价值"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="makeWay"
            label="取得方式"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="useDeptName"
            label="使用部门"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="usingState"
            label="使用状况"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="euse"
            label="设备用途"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="盘点状态"
            align="center"
          >
            <template v-slot="scope">
              <el-tag :type="scope.row.state===0?'danger':'success'">{{ scope.row.state === 0 ?'未盘':'已盘' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="euse"
            label="盘点结果"
            align="center"
          >
            <template v-slot="scope">
              <el-tag v-if="scope.row.result===1 && scope.row.state!==0">相符</el-tag>
              <el-tag v-else-if="scope.row.result===2 && scope.row.state!==0" type="success">盘盈</el-tag>
              <el-tag v-else-if="scope.row.result===3 && scope.row.state!==0" type="danger">盘亏</el-tag>
              <span v-else>
                <el-tag v-if="!scope.row.onlyCode" type="success">盘盈</el-tag>
                <el-tag v-else type="info">
                  未盘
                </el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!ruleForm.state"
            label="操作"
            align="center"
            :width="120"
          >
            <template v-slot="scope">
              <el-dropdown>
                <el-button size="mini" type="primary">
                  更多菜单<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item v-if="scope.row.onlyCode" @click.native="handleSurplus(scope.$index, scope.row)">盘盈</el-dropdown-item> -->
                  <el-dropdown-item v-if="scope.row.onlyCode" @click.native="handleDeficit(scope.$index, scope.row)">盘亏</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.onlyCode" @click.native="handleMatch(scope.$index, scope.row)">相符</el-dropdown-item>
                  <el-dropdown-item v-if="!scope.row.onlyCode" @click.native="handleDelete(scope.$index, scope.row)">移除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <Info ref="Info" :checkId="id" @append="append" />
  </el-card>
</template>

<script>
import { getInventory,completeInventory,stateInventory } from '@/api/means/check'
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import Info from './info'
import htmlToExcel from '@/utils/htmlToExcel'
export default {
  components: {
    Info
  },
  data() {
    return {
      loading: false,
      load:false,
      tableData:[],
      ruleForm:{
        id:'',
        title:'',
        billingDate:'',
        deptId:'',
        deptName:'',
        planDate:'',
        principal:'',
        remark:''
      },
      rules:{
        title: [
          { required: true, message: '请输入盘点计划标题', trigger: 'blur' },
        ],
        deptId: [
          { required: true, message: '请选择盘点部分', trigger: 'blur' },
        ],
        billingDate: [
          { required: true, message: '请选择记账日期', trigger: 'blur' },
        ],
        planDate: [
          { required: true, message: '请选择计划盘点日期', trigger: 'blur' },
        ],
        principal:[
          { required: true, message: '请输入盘点人', trigger: 'blur' },
        ]
      },
      orgList:[],
      oper:'',
      id:0
    }
  },
  async mounted() {
    const { id, oper } = this.$route.query
    this.oper = oper || 'add'
    this.id = Number(id)
    this.fetchData()
    this.fetchOrgs()
  },
  methods: {
    // 返回
    returnBack() {
      this.$router.push({ path: '/asset/means/check' })
    },
    append(data){
      this.tableData.push(data)
    },
    // 添加明细
    addDetailed(){
      this.$refs.Info.open(this.tableData)
    },
    // 盘盈
    handleSurplus(index,item){
      stateInventory({id:item.id,result:2}).then(res=>{
        if (res.code==='0'){
          this.tableData[index].state = 1
          this.tableData[index].result = 2
        }
      })
    },
    // 盘亏
    handleDeficit(index,item){
      stateInventory({id:item.id,result:3}).then(res=>{
        if (res.code==='0'){
          this.tableData[index].state = 1
          this.tableData[index].result = 3
        }
      })
    },
    // 相符
    handleMatch(index,item){
      stateInventory({id:item.id,result:1}).then(res=>{
        if (res.code==='0'){
          this.tableData[index].state = 1
          this.tableData[index].result = 1
        }
      })
    },
    // 移除
    handleDelete(index,item){
      this.tableData.splice(index,1)
    },
    complete() {
      let data = []
      this.tableData.forEach(item=>{
        if (!item.onlyCode && item.postData){
          debugger
          data.push(item.postData)
        }
      })
      completeInventory({id:this.id,assetCardDtoList:data}).then(res=>{
        if (res.code==='0'){
          this.returnBack()
        }
      })
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList().then(res => {
        this.orgList = res.data || []
      })
    },
    getTypeLable(type){
      let name = ''
      switch (Number(type)) {
      case 1:
        name = '房屋'
        break
      case 2:
        name = '设备'
        break
      case 3:
        name = '文物'
        break
      case 4:
        name = '图书'
        break
      case 5:
        name = '家具'
        break
      case 6:
        name = '动植物'
        break
      case 7:
        name = '物资'
        break
      case 101:
        name = '构筑物'
        break
      case 102:
        name = '土地'
        break
      default:
        name = '车辆'
        break
      }
      return name
    },
    // 查询数据
    fetchData() {
      if (!this.id){
        return false
      }
      this.loading = true
      getInventory({id:this.id}).then(res=>{
        this.loading = false
        if (res.code==='0'){
          this.ruleForm = {
            id:res.data.id,
            title:res.data.title,
            billingDate:res.data.billingDate,
            deptId:res.data.deptId,
            deptName:res.data.deptName,
            planDate:res.data.planDate,
            principal:res.data.principal,
            remark:res.data.remark,
            state:res.data.state
          }
          this.tableData = res.data.cardInfoVoList || []
        }
      })
    },
    selected(data){
      this.tableData = data
    },
    excel(){
      const data = [
        ['序号','资产编号','资产大类','资产分类','资产名称','取得日期','数量','价值类型','价值','取得方式','使用部门','使用状况','设备用途','盘点状态','盘点结果']
      ]
      this.tableData.forEach((item,index)=>{
        let result = ''
        if (item.result===1 && item.state!==0){
          result = '相符'
        } else if (item.result===2 && item.state!==0){
          result = '盘盈'
        } else if (item.result===3 && item.state!==0){
          result = '盘亏'
        } else {
          if (!item.onlyCode){
            result = '盘盈'
          } else {
            result = '未盘'
          }
        }
        data.push([
          index+1,
          item.onlyCode,
          this.getTypeLable(item.type),
          item.typeName,
          item.name,
          item.makeDate,
          item.number,
          item.valueType,
          item.cost,
          item.makeWay,
          item.useDeptName,
          item.usingState,
          item.euse,
          item.state === 0 ?'未盘':'已盘',
          result
        ])
      })
      htmlToExcel.getJsonExcel(data, `${this.ruleForm.title}盘点明细-${new Date()}`)
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
<style lang="scss" scoped>
#means-check-details {
    .submit {
        margin: 20px 0 10px 0;
        text-align: center;
    }

    /deep/ .el-card__body {
        padding: 0;
    }

    /deep/ .el-divider--horizontal {
        margin: 10px 0;
    }

    /deep/ .app-container {
        padding: 10px;
    }

    .title {
        border-bottom: 2px solid #e4e7ed;
        line-height: 37px;
        color: #409eff;
    }

    .card-content {
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 5px;
        padding: 10px;
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .el-form-item {
            margin-bottom: 0;
        }

        /deep/ .business-title {
            width: 13%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            width: 37%;
            line-height: 30px;
        }
    }
}
</style>
