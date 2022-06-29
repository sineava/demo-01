<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'add' ? '新增泊位信息' : type === 'detail' ? '泊位详情' : '编辑泊位信息' }}</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        size="medium"
        :disabled="type==='detail'?true:false"
        :rules="rules"
      >
        <table class="berth">
          <tr>
            <th class="text-right el-table-border">泊位名称：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="berthName"><el-input v-model.trim="ruleForm.berthName" placeholder="请输入泊位名称" maxlength="100" /></el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">所在码头名称：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="wharfId">
                <el-select
                  v-model="ruleForm.wharfId"
                  clearable
                  filterable
                  :disabled="true"
                  style="width: 100%;"
                  placeholder="请选择所在码头"
                >
                  <el-option
                    v-for="item in wharf"
                    :key="item.id"
                    :label="item.wharfName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">所属企业：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="enterpriseId">
                <el-select
                  v-model="ruleForm.enterpriseId"
                  clearable
                  filterable
                  style="width: 100%;"
                  placeholder="请选择所属企业"
                >
                  <el-option
                    v-for="item in enterpriseList"
                    :key="item.id"
                    :label="item.enterpriseName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">竣工验收日期或老码头监测评估时间：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="enterpriseName">
                <el-date-picker
                  v-model="ruleForm.acceptanceDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择竣工验收日期或老码头监测评估时间"
                />
              </el-form-item>
            </td>
            <th class="text-right el-table-border">泊位结构型式：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item prop="structuralStyle"><el-input v-model.trim="ruleForm.structuralStyle" placeholder="请输入泊位结构型式" maxlength="100" /></el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">备注：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="remark">
                <el-input
                  v-model="ruleForm.remark"
                  type="textarea"
                  placeholder="请输入备注"
                  maxlength="200"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  show-word-limit
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">泊位主要用途：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="mainUses"><el-input v-model.trim="ruleForm.mainUses" placeholder="请输入泊位主要用途" maxlength="100" /></el-form-item>
            </td>
          </tr>
          <!-- <tr>
            <th class="text-right el-table-border">专业化泊位分类：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="serviceType">
                <el-radio-group v-model="ruleForm.serviceType">
                  <el-radio v-for="(item, index) in classify" :key="index" :label="item.key">{{ item.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr> -->
          <tr>
            <th class="text-right el-table-border">码头前沿设计水深（米）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="frontDesignWaterDepth">
                <el-input-number
                  v-model="ruleForm.frontDesignWaterDepth"
                  :min="0"
                  :max="100000"
                  :precision="2"
                  label="码头前沿设计水深（米）"
                  placeholder="请输入码头前沿设计水深（米）"
                />
              </el-form-item>
            </td>
            <th class="text-right el-table-border">码头前沿维护水深（米）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item prop="frontDesignActualDepth">
                <el-input-number
                  v-model="ruleForm.frontDesignActualDepth"
                  :min="0"
                  :max="100000"
                  :precision="2"
                  label="码头前沿维护水深（米）"
                  placeholder="请输入码头前沿维护水深（米）"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">设计靠泊能力（万吨级）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="designBerthingCapacity">
                <el-input-number
                  v-model="ruleForm.designBerthingCapacity"
                  :min="0"
                  :max="100000000"
                  :precision="4"
                  label="设计靠泊能力（万吨级）"
                  placeholder="请输入设计靠泊能力（万吨级）"
                />
              </el-form-item>
            </td>
            <th class="text-right el-table-border">结构靠泊能力（吨级）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item prop="structuralBerthingCapacity">
                <el-input-number
                  v-model="ruleForm.structuralBerthingCapacity"
                  :min="0"
                  :max="100000000"
                  :precision="3"
                  label="结构靠泊能力（吨级）"
                  placeholder="请输入结构靠泊能力（吨级）"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">核查靠泊能力（吨级）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="checkBerthingCapability">
                <el-input-number
                  v-model="ruleForm.checkBerthingCapability"
                  :min="0"
                  :max="100000000"
                  :precision="3"
                  label="核查靠泊能力（吨级）"
                  placeholder="请输入核查靠泊能力（吨级）"
                />
              </el-form-item>
            </td>
            <th class="text-right el-table-border">泊位长度（米）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item prop="berthLength">
                <el-input-number
                  v-model="ruleForm.berthLength"
                  :min="0"
                  :max="100000000"
                  :precision="2"
                  label="泊位长度（米）"
                  placeholder="请输入泊位长度（米）"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">泊位前沿设施设备情况：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="isDangerous">
                <el-radio-group v-model="isDangerous">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
            <td class="text-left el-table-border" colspan="4">
              <el-form-item v-if="isDangerous" prop="isDangerousGoods">
                <el-input v-model.trim="ruleForm.isDangerousGoods" placeholder="请输入泊位前沿设施设备情况" maxlength="100" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">泊位有标准岸电几套：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="berthUses">
                <!-- <el-input
                  v-model="ruleForm.berthUses"
                  type="textarea"
                  placeholder="请输入泊位有标准岸电几套"
                  maxlength="200"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  show-word-limit
                /> -->
                <el-select
                  v-model="ruleForm.berthUses"
                  clearable
                  style="width: 100%;"
                  placeholder="请选择泊位有标准岸电几套"
                >
                  <el-option label="0.25" value="0.25" />
                  <el-option label="0.3" value="0.3" />
                  <el-option label="0.5" value="0.5" />
                  <el-option label="1" value="1" />
                  <el-option label="2" value="2" />
                  <el-option label="3" value="3" />
                  <el-option label="4" value="4" />
                  <el-option label="5" value="5" />
                  <el-option label="6" value="6" />
                  <el-option label="7" value="7" />
                  <el-option label="8" value="8" />
                  <el-option label="9" value="9" />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">岸电情况说明：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item prop="belongingEnterprise"><el-input v-model.trim="ruleForm.belongingEnterprise" placeholder="请输入岸电情况说明" maxlength="100" /></el-form-item>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">通过能力</th>
            <th class="text-center el-table-border">散装（万吨）</th>
            <th class="text-center el-table-border">件杂（万吨）</th>
            <th class="text-center el-table-border">集装箱（万TEU）</th>
            <th class="text-center el-table-border">滚装（万辆）</th>
            <th class="text-center el-table-border">旅客（万人）</th>
            <th class="text-center el-table-border">液货（万吨）</th>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">设计年综合通过能力</th>
            <th class="text-center el-table-border">
              <el-form-item prop="bulkAnnualCapacity">
                <el-input v-model.trim="ruleForm.bulkAnnualCapacity" placeholder="请输入散装(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="hybridAnnualCapacity">
                <el-input v-model.trim="ruleForm.hybridAnnualCapacity" placeholder="请输入件杂(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="containerAnnualCapacity">
                <el-input v-model.trim="ruleForm.containerAnnualCapacity" placeholder="请输入集装箱（万吨）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="vehicleAnnualCapacity">
                <el-input v-model.trim="ruleForm.vehicleAnnualCapacity" placeholder="请输入滚装（万辆）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="passengerAnnualCapacity">
                <el-input v-model.trim="ruleForm.passengerAnnualCapacity" placeholder="请输入旅客（万人）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidAnnualCapacity" placeholder="请输入液货(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">核查年综合通过能力</th>
            <th class="text-center el-table-border">
              <el-form-item prop="bulkCheckCapacity">
                <el-input v-model.trim="ruleForm.bulkCheckCapacity" placeholder="请输入散装(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="hybridCheckCapacity">
                <el-input v-model.trim="ruleForm.hybridCheckCapacity" placeholder="请输入件杂(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="containerCheckCapacity">
                <el-input v-model.trim="ruleForm.containerCheckCapacity" placeholder="请输入集装箱(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="vehicleCheckCapacity">
                <el-input v-model.trim="ruleForm.vehicleCheckCapacity" placeholder="请输入滚装（万辆）：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="passengerCheckCapacity">
                <el-input v-model.trim="ruleForm.passengerCheckCapacity" placeholder="请输入旅客（万人）：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidCheckCapacity" placeholder="请输入液货(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">上一年度泊位吞吐量</th>
            <th class="text-center el-table-border">
              <el-form-item prop="bulkLastCapacity">
                <el-input v-model.trim="ruleForm.bulkLastCapacity" placeholder="请输入散装(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="hybridLastCapacity">
                <el-input v-model.trim="ruleForm.hybridLastCapacity" placeholder="请输入件杂(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="containerLastCapacity">
                <el-input v-model.trim="ruleForm.containerLastCapacity" placeholder="请输入集装箱(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="vehicleLastCapacity">
                <el-input v-model.trim="ruleForm.vehicleLastCapacity" placeholder="请输入滚装（万辆）：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="passengerLastCapacity">
                <el-input v-model.trim="ruleForm.passengerLastCapacity" placeholder="请输入旅客（万人）：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
            <th class="text-center el-table-border">
              <el-form-item prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidLastCapacity" placeholder="请输入液货(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
            </th>
          </tr>
        </table>
        <Maptable
          ref="berthMap"
          :is-edit="type==='detail'?false:true"
          @change="confirmMap"
        />
      </el-form>
      <div
        class="backstage-edit-btn"
      >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="medium"
          :loading="loading"
          @click="handlePost"
        >
          保存
        </el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getDetail,addBerth,updateBerth } from '@/api/port-services/coastline/berth'
import { getAllList } from '@/api/port-services/coastline/wharf'
import { getEnterpriseByName } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import Maptable from '@/components/Maptable/index'
import moment from 'moment'
export default {
  components: {
    Maptable
  },
  data() {
    return {
      ruleForm: {},
      wharf:[],
      geographyInfos:[],
      loading:false,
      enterpriseList:[],
      isDangerous:0,
      classify:[
        {key:1,name:'集装箱'},
        {key:2,name:'煤炭'},
        {key:3,name:'金属矿石'},
        {key:4,name:'原油'},
        {key:5,name:'成品油'},
        {key:6,name:'液体化工'},
        {key:7,name:'液化天然气'},
        {key:8,name:'液化石油气'},
        {key:9,name:'散装粮食'},
        {key:10,name:'散装水泥'},
        {key:11,name:'客运'},
        {key:12,name:'滚装'},
      ],
      rules: {
        berthName: [
          { required: true, message: '请输入泊位名称', trigger: 'blur' }
        ],
        wharfId: [
          { required: true, message: '请选择所在码头名称', trigger: 'change' }
        ],
        enterpriseId:[
          { required: true, message: '请选择所属企业', trigger: 'change' }
        ],
      }
    }
  },
  async created() {
    const { id, type, wharfId, wharfName, coastlineName } = this.$route.query
    this.ruleForm.wharfId = parseInt(wharfId)
    this.type = type
    this.wharfName = wharfName
    this.coastlineName = coastlineName
    this.fetchAllWharf()
    this.fetchEnterprise()
    if (id) await this.fetchData(id)
  },
  methods: {
    // 查询企业
    async fetchEnterprise(enterpriseName = '') {
      this.enterpriseList = (await getEnterpriseByName({ enterpriseName })).data
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    /**
     * 查询所有码头
     */
    async fetchAllWharf(){
      const res = await getAllList()
      this.wharf = res.data
    },
    async fetchData(detailId) {
      getDetail({ id: detailId }).then(res => {
        this.ruleForm = {...this.ruleForm,...res.data}
        this.isDangerous = this.ruleForm.isDangerousGoods ? 1 : 0
        this.geographyInfos = this.ruleForm.berthCoordinatesVoList || []
        this.$nextTick(() => {
          this.$refs.berthMap.init(this.geographyInfos)
        })
      })
    },
    saveData(){
      this.loading = true
      const berthCoordinatesDtoList = []
      this.geographyInfos.forEach((item,index) => {
        item.pointer = index+1
        berthCoordinatesDtoList.push(item)
      })
      this.enterpriseList.forEach(element => {
        if (element.id===this.ruleForm.enterpriseId){
          this.ruleForm.enterpriseName = element.enterpriseName
          return false
        }
      })
      this.ruleForm.berthCoordinatesDtoList = berthCoordinatesDtoList
      this.ruleForm.acceptanceDate = moment(this.ruleForm.acceptanceDate).format('YYYY-MM-DD')
      delete this.ruleForm.berthCoordinatesVoList
      if (this.ruleForm.id){
        updateBerth(this.ruleForm).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.returnBack()
          }
        })
      } else {
        this.ruleForm.infoFrom = false
        addBerth(this.ruleForm).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.returnBack()
          }
        })
      }
    },
    // 提交
    handlePost() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
.berth {
    //border: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    width: 100%;

    .el-form-item {
        margin-bottom: 0;
    }

    .el-table-border {
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
    }

    th {
        width: 14.3%;
        line-height: 40px;
        background: #f5f5f5;
    }

    td {
        padding: 0 10px;
    }

    .text-right {
        text-align: right;
    }

    .el-cascader-node > .el-radio, .el-radio:last-child {
        margin-right: 30px;
    }
}
</style>
