<template>
  <el-form
    ref="ruleForm"
    size="medium"
    label-position="top"
    :model="ruleForm"
    :rules="rules"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" />新建的船舶
      <span v-if="type!=='details'" style="position: absolute; right: 60px;"><el-button size="small" type="success" @click="clickEdit">{{ isEdit ? '取消编辑' : '编辑' }}</el-button></span>
    </div>
    <el-descriptions
      class="descriptions-one"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="船舶类型:">
        <el-row :gutter="20">
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />普货船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />集装箱船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />多用途船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />商品汽车滚装船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />载重汽车滚装船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />危险品船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />客船</el-col>
          <el-col :span="3" class="row row-title bg"><i v-if="isEdit" class="required" />客渡船</el-col>
        </el-row>
      </el-descriptions-item>

      <el-descriptions-item label="数量(艘):">
        <el-row :gutter="20">
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="generalCargoShip">
              <el-input-number
                v-model="ruleForm.generalCargoShip"
                :min="0"
                :max="1000000"
                label="普货船舶"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入普货船舶数量"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.generalCargoShip }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="containerShip">
              <el-input-number
                v-model="ruleForm.containerShip"
                :min="0"
                :max="1000000"
                label="集装箱船舶艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入集装箱船舶艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.containerShip }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="multipurposeShip">
              <el-input-number
                v-model="ruleForm.multipurposeShip"
                :min="0"
                :max="1000000"
                label="多用途船舶艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入多用途船舶艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.multipurposeShip }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="commercialVehiclesRoll">
              <el-input-number
                v-model="ruleForm.commercialVehiclesRoll"
                :min="0"
                :max="1000000"
                label="商品汽车滚装船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入商品汽车滚装船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.commercialVehiclesRoll }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="trucksRoll">
              <el-input-number
                v-model="ruleForm.trucksRoll"
                :min="0"
                :max="1000000"
                label="载重汽车滚装船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入载重汽车滚装船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.trucksRoll }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="dangerousGoodsShip">
              <el-input-number
                v-model="ruleForm.dangerousGoodsShip"
                :min="0"
                :max="1000000"
                label="危险品船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入危险品船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.dangerousGoodsShip }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="passengerShip">
              <el-input-number
                v-model="ruleForm.passengerShip"
                :min="0"
                :max="1000000"
                label="客船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入客船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.passengerShip }}</span>
          </el-col>
          <el-col :span="3" class="row">
            <el-form-item v-if="isEdit" prop="passengerFerry">
              <el-input-number
                v-model="ruleForm.passengerFerry"
                :min="0"
                :max="1000000"
                label="客渡船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入客渡船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.passengerFerry }}</span>
          </el-col>
        </el-row>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />购买的船舶
    </div>
    <el-descriptions
      class="descriptions-one"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="船舶类型:">
        <el-row :gutter="20">
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />普货船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />集装箱船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />多用途船舶</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />商品汽车滚装船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />载重汽车滚装船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />危险品船</el-col>
          <el-col :span="3" class="row row-title br bg"><i v-if="isEdit" class="required" />客船</el-col>
          <el-col :span="3" class="row row-title bg"><i v-if="isEdit" class="required" />客渡船</el-col>
        </el-row>
      </el-descriptions-item>
      <el-descriptions-item label="数量(艘):">
        <el-row :gutter="20">
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="generalCargoShipBuy">
              <el-input-number
                v-model="ruleForm.generalCargoShipBuy"
                :min="0"
                :max="1000000"
                label="普货船舶"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入普货船舶数量"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.generalCargoShipBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="containerShipBuy">
              <el-input-number
                v-model="ruleForm.containerShipBuy"
                :min="0"
                :max="1000000"
                label="集装箱船舶艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入集装箱船舶艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.containerShipBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="multipurposeShipBuy">
              <el-input-number
                v-model="ruleForm.multipurposeShipBuy"
                :min="0"
                :max="1000000"
                label="多用途船舶艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入多用途船舶艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.multipurposeShipBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="commercialVehiclesRollBuy">
              <el-input-number
                v-model="ruleForm.commercialVehiclesRollBuy"
                :min="0"
                :max="1000000"
                label="商品汽车滚装船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入商品汽车滚装船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.commercialVehiclesRollBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="trucksRollBuy">
              <el-input-number
                v-model="ruleForm.trucksRollBuy"
                :min="0"
                :max="1000000"
                label="载重汽车滚装船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入载重汽车滚装船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.trucksRollBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="dangerousGoodsShipBuy">
              <el-input-number
                v-model="ruleForm.dangerousGoodsShipBuy"
                :min="0"
                :max="1000000"
                label="危险品船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入危险品船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.dangerousGoodsShipBuy }}</span>
          </el-col>
          <el-col :span="3" class="row br">
            <el-form-item v-if="isEdit" prop="passengerShipBuy">
              <el-input-number
                v-model="ruleForm.passengerShipBuy"
                :min="0"
                :max="1000000"
                label="客船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入客船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.passengerShipBuy }}</span>
          </el-col>
          <el-col :span="3" class="row">
            <el-form-item v-if="isEdit" prop="passengerFerryBuy">
              <el-input-number
                v-model="ruleForm.passengerFerryBuy"
                :min="0"
                :max="1000000"
                label="客渡船艘数"
                style="width: 100%;"
                :controls="false"
                placeholder="请输入客渡船艘数"
                @change="inputChageNumber"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.passengerFerryBuy }}</span>
          </el-col>
        </el-row>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />初始运力情况
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />船舶艘数(合计):</template>
        <el-form-item v-if="isEdit" prop="shipNum">
          <el-input-number
            v-model="ruleForm.shipNum"
            :min="0"
            :max="1000000"
            label="船舶艘数"
            style="width: 100%;"
            :controls="false"
            disabled
            placeholder="请输入船舶艘数(合计)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.shipNum }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />船舶总吨(合计):</template>
        <el-form-item v-if="isEdit" prop="shipTotalTons">
          <el-input-number
            v-model="ruleForm.shipTotalTons"
            :min="0"
            :max="10000000000"
            :precision="2"
            label="船舶总吨"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入船舶总吨(合计)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.shipTotalTons }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />参考载重吨(吨):</template>
        <el-form-item v-if="isEdit" prop="netWeightTons">
          <el-input-number
            v-model="ruleForm.netWeightTons"
            :min="0"
            :max="10000000000"
            :precision="2"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入载重吨(吨)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.netWeightTons }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />载客量(客位):</template>
        <el-form-item v-if="isEdit" prop="passengerQuota">
          <el-input-number
            v-model="ruleForm.passengerQuota"
            :min="0"
            :max="10000000000"
            label="载客量"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入载客量(客位)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.passengerQuota }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />载箱量(TEU):</template>
        <el-form-item v-if="isEdit" prop="loadingCapacity">
          <el-input-number
            v-model="ruleForm.loadingCapacity"
            :min="0"
            :max="10000000000"
            label="载箱量"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入载箱量(TEU)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.loadingCapacity }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />载车量(车位):</template>
        <el-form-item v-if="isEdit" prop="vehicleCapacity">
          <el-input-number
            v-model="ruleForm.vehicleCapacity"
            :min="0"
            :max="10000000000"
            label="载车量"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入载车量(车位)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.vehicleCapacity }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />载气量(立方米):</template>
        <el-form-item v-if="isEdit" prop="gasCarryingCapacity">
          <el-input-number
            v-model="ruleForm.gasCarryingCapacity"
            :min="0"
            :max="10000000000"
            label="载气量"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入载气量(立方米)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.gasCarryingCapacity }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />主机总功率(千瓦):</template>
        <el-form-item v-if="isEdit" prop="hostTotalPower">
          <el-input-number
            v-model="ruleForm.hostTotalPower"
            :min="0"
            :max="10000000000"
            :precision="2"
            label="主机总功率"
            style="width: 100%;"
            :controls="false"
            placeholder="请输入主机总功率(千瓦)"
            @change="inputChageNumber"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.hostTotalPower }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    type:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {
      },
      initialData: {}, // 取消编辑时数据还原
      rules: {
        generalCargoShip:[
          { required: true, message: '请输入普货船舶数量', trigger: 'blur' }
        ],
        containerShip:[
          { required: true, message: '请输入集装箱船舶艘数', trigger: 'blur' }
        ],
        multipurposeShip:[
          { required: true, message: '请输入多用途船舶艘数', trigger: 'blur' }
        ],
        commercialVehiclesRoll:[
          { required: true, message: '请输入商品汽车滚装船艘数', trigger: 'blur' }
        ],
        trucksRoll:[
          { required: true, message: '请输入载重汽车滚装船艘数', trigger: 'blur' }
        ],
        dangerousGoodsShip:[
          { required: true, message: '请输入危险品船艘数', trigger: 'blur' }
        ],
        passengerShip:[
          { required: true, message: '请输入客船艘数', trigger: 'blur' }
        ],
        passengerFerry:[
          { required: true, message: '请输入客渡船艘数', trigger: 'blur' }
        ],
        generalCargoShipBuy:[
          { required: true, message: '请输入普货船舶数量', trigger: 'blur' }
        ],
        containerShipBuy:[
          { required: true, message: '请输入集装箱船舶艘数', trigger: 'blur' }
        ],

        multipurposeShipBuy:[
          { required: true, message: '请输入多用途船舶艘数', trigger: 'blur' }
        ],
        commercialVehiclesRollBuy:[
          { required: true, message: '请输入商品汽车滚装船艘数', trigger: 'blur' }
        ],
        trucksRollBuy:[
          { required: true, message: '请输入载重汽车滚装船艘数', trigger: 'blur' }
        ],
        dangerousGoodsShipBuy:[
          { required: true, message: '请输入危险品船艘数', trigger: 'blur' }
        ],
        passengerShipBuy:[
          { required: true, message: '请输入客船艘数', trigger: 'blur' }
        ],
        passengerFerryBuy:[
          { required: true, message: '请输入客渡船艘数', trigger: 'blur' }
        ],
        netWeightTons:[
          { required: true, message: '请输入载客量(客位)', trigger: 'blur' }
        ],
        loadingCapacity:[
          { required: true, message: '请输入载箱量(TEU)', trigger: 'blur' }
        ],
        vehicleCapacity:[
          { required: true, message: '请输入载车量(车位)', trigger: 'blur' }
        ],
        gasCarryingCapacity:[
          { required: true, message: '载气量(立方米)', trigger: 'blur' }
        ],
        hostTotalPower:[
          { required: true, message: '主机总功率(千瓦)', trigger: 'blur' }
        ],
        shipTotalTons:[
          { required: true, message: '请输入船舶总吨(合计)', trigger: 'blur' }
        ],
        passengerQuota:[
          { required: true, message: '请输入载客量(客位)', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.ruleForm = this.initData(newV)
        this.initialData = {...this.ruleForm}
      },
      deep:true
    },
  },
  mounted() {
    this.ruleForm = this.initData(this.data)
    this.initialData = {...this.ruleForm}
  },
  methods: {
    clickEdit(){
      this.$emit('clickEdit',!this.isEdit)
      this.ruleForm = { ...this.initialData }
    },
    inputChageNumber(val){
      let map = [
        'commercialVehiclesRoll',
        'commercialVehiclesRollBuy',
        'containerShip',
        'containerShipBuy',
        'dangerousGoodsShip',
        'dangerousGoodsShipBuy',
        'generalCargoShip',
        'generalCargoShipBuy',
        'multipurposeShip',
        'multipurposeShipBuy',
        'passengerFerry',
        'passengerFerryBuy',
        'passengerShip',
        'passengerShipBuy',
        'trucksRoll',
        'trucksRollBuy'
      ]
      let shipNum = 0
      map.forEach(element => {
        shipNum = shipNum + (this.ruleForm[element] || 0)
      })
      this.ruleForm.shipNum = shipNum
    },
    initData(data){
      return {
        commercialVehiclesRoll:data?.commercialVehiclesRoll || 0,
        commercialVehiclesRollBuy:data?.commercialVehiclesRollBuy || 0,
        containerShip:data?.containerShip || 0,
        containerShipBuy:data?.containerShipBuy || 0,
        dangerousGoodsShip:data?.dangerousGoodsShip || 0,
        dangerousGoodsShipBuy:data?.dangerousGoodsShipBuy || 0,
        generalCargoShip: data?.generalCargoShip || 0,
        generalCargoShipBuy: data?.generalCargoShipBuy || 0,
        multipurposeShip: data?.multipurposeShip || 0,
        multipurposeShipBuy: data?.multipurposeShipBuy || 0,
        passengerFerry: data?.passengerFerry || 0,
        passengerFerryBuy: data?.passengerFerryBuy || 0,
        passengerShip: data?.passengerShip || 0,
        passengerShipBuy: data?.passengerShipBuy || 0,
        trucksRoll: data?.trucksRoll || 0,
        trucksRollBuy: data?.trucksRollBuy || 0,

        gasCarryingCapacity: data?.gasCarryingCapacity || 0,
        hostTotalPower: data?.hostTotalPower || 0,
        id: data?.id || 0,
        loadingCapacity: data?.loadingCapacity || 0,
        netWeightTons: data?.netWeightTons || 0,
        passengerQuota: data?.passengerQuota || 0,
        shipNum: data?.shipNum || 0,
        shipTotalTons: data?.shipTotalTons || 0,
        vehicleCapacity:data?.vehicleCapacity || 0,
      }
    },
    /**
     * 保存
     */
    async submitForm() {
      /*
       * if (this.ruleForm.shipTotalTons===0){
       *   this.$message.error('船舶总吨(合计)必须大于0')
       *   return false
       * }
       * if (this.ruleForm.shipNum===0){
       *   this.$message.error('船舶艘数(合计)必须大于0')
       * }
       */
      let res = false
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          res = this.initData(this.ruleForm)
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.base-ruleForm {
    .descriptions {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            padding: 0 10px;
            width: 90%;
            line-height: 30px;
        }
    }

    .el-form-item {
        margin: 0;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .is-disabled {
        /deep/ input {
            border: none;
        }
    }

    .row {
        display: inline-block;
        overflow: hidden;
        padding: 0;
        width: 12.5%;
        line-height: 50px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .row-title {
        height: 50px;
    }

    .bg {
        background: #fafafa;
    }

    .br {
        border-right: 1px solid #f2f2f2;
    }
}
</style>
