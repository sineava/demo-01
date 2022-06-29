<template>
  <el-card id="means-check-details" class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="盘点计划" />
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
          <el-descriptions-item :span="2">
            <template slot="label"><i class="required" />盘点计划标题:</template>
            <span v-if="oper==='info'">{{ ruleForm.title }}</span>
            <el-form-item v-else prop="title">
              <el-input v-model.trim="ruleForm.title" placeholder="请输入盘点计划标题" />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="required" />盘点部门:</template>
            <span v-if="oper==='info'">{{ ruleForm.deptName }}</span>
            <el-form-item v-else prop="deptId">
              <el-select
                v-model="ruleForm.deptId"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择盘点部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="required" />盘点人:</template>
            <span v-if="oper==='info'">{{ ruleForm.principal }}</span>
            <el-form-item v-else prop="principal">
              <el-input v-model.trim="ruleForm.principal" placeholder="请输入盘点人" />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="required" />记账日期:</template>
            <span v-if="oper==='info'">{{ ruleForm.billingDate }}</span>
            <el-form-item v-else prop="billingDate">
              <el-date-picker
                v-model="ruleForm.billingDate"
                type="date"
                style="width: 100%;"
                clearable
                placeholder="请选择记账日期"
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="required" />计划盘点日期:</template>
            <span v-if="oper==='info'">{{ ruleForm.planDate }}</span>
            <el-form-item v-else prop="planDate">
              <el-date-picker
                v-model="ruleForm.planDate"
                type="date"
                style="width: 100%;"
                clearable
                placeholder="请选择计划盘点日期"
              />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item label="说明">
            <span v-if="oper==='info'">{{ ruleForm.remark }}</span>
            <el-form-item v-else prop="remark">
              <el-input v-model.trim="ruleForm.remark" type="textarea" />
            </el-form-item>
          </el-descriptions-item>
        </el-descriptions>
        <div class="icon-title">
          <span class="span" /><i class="required" style="margin-right: 10px;" />盘点明细
          <el-button
            v-if="oper!=='info'"
            style="margin-left: 10px;"
            type="success"
            size="small"
            icon="el-icon-circle-plus"
            @click="addDetailed"
          >
            添加盘点明细
          </el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          element-loading-text="Loading"
          stripe
          fit
          highlight-current-row
          height="500"
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
            v-if="oper!=='info'"
            label="操作"
            align="center"
            :width="95"
          >
            <template v-slot="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="oper!=='info'" class="submit">
          <el-button
            v-loading="load"
            icon="el-icon-success"
            type="primary"
            @click="submitForm('ruleForm')"
          >
            立即保存
          </el-button>
        </div>
      </el-form>
    </div>
    <ToolCard ref="toolCard" @selected="selected" />
  </el-card>
</template>

<script>
import { getInventory,addInventory,putInventory } from '@/api/light-means/check'
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import ToolCard from './components/tool-card'
import moment from 'moment'
export default {
  components: {
    ToolCard
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
      id:''
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
      this.$router.push({ path: '/asset/light-means/check' })
    },
    // 添加明细
    addDetailed(){
      this.$refs.toolCard.open(this.tableData)
    },
    async submitForm(formName) {
      if (this.tableData.length===0){
        this.$message.error('请添加盘点明细')
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.billingDate = this.ruleForm.billingDate ? moment(this.ruleForm.billingDate).format('YYYY-MM-DD') : ''
          this.ruleForm.planDate = this.ruleForm.planDate ? moment(this.ruleForm.planDate).format('YYYY-MM-DD') : ''
          if (this.ruleForm.deptId){
            this.orgList.forEach(item=>{
              if (item.orgId===this.ruleForm.deptId){
                this.ruleForm.deptName = item.orgName
                return false
              }
            })
          }
          let cardIds = []
          this.tableData.forEach(item=>{
            cardIds.push(item.id)
          })
          this.ruleForm.cardIds = cardIds
          this.savePost(this.ruleForm)
        } else {
          return false
        }
      })
    },
    async savePost(data){
      this.load = true
      const res = data.id ? await putInventory(data) : await addInventory(data)
      this.load = false
      if (res.code==='0'){
        this.returnBack()
      }
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList().then(res => {
        this.orgList = res.data || []
      })
    },
    getTypeLable(type){
      if (!type){
        return ''
      }
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
    // 移除
    handleDelete(index,item){
      this.tableData.splice(index,1)
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
            remark:res.data.remark
          }
          this.tableData = res.data.cardInfoVoList || []
        }
      })
    },
    selected(data){
      data.forEach(item=>{
        this.tableData.push(item)
      })
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
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

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
