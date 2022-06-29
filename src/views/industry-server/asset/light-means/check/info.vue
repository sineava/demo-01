<template>
  <el-dialog
    title="盘点明细"
    :visible.sync="dialogVisible"
    width="90%"
    custom-class="check"
    :destroy-on-close="false"
    :close-on-click-modal="false"
  >
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="5">
          <AssetsType ref="AssetsType" :clientHeight="800" @changeAssetsType="changeAssetsType" />
        </el-col>
        <el-col :span="19">
          <div class="card-content" style="overflow-x: hidden; overflow-y: auto; height: 550px;">
            <CardInfo
              :id="id"
              ref="CardInfo"
              :oper="oper"
              :assetsTypeData="assetsTypeData"
              :assetsType="assetsType"
              @returnBack="returnBack"
              @submitForm="submitForm"
              @updata="updata"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="success" @click="confirm">确认选择</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AssetsType from '../card/components/assets-type'

import CardInfo from '../card/info'// 卡片基础信息
export default {
  components: {
    AssetsType,
    CardInfo
  },
  props:{
    checkId:{
      type:Number,
      default:0,
    }
  },
  data() {
    return {
      loading:false, // 加载动画
      currentPage:1,// 当前页码
      pageSize:10,// 每页大小
      total:0,// 数据总数
      data:[], // 数据集
      dialogVisible:false,
      assetsType: 0,
      assetsTypeData: {},
      oper:'check',
      clientHeight:document.body.clientHeight,
      id:0
    }
  },
  created() {

  },
  methods: {
    // 更新数据
    updata(assetsType,assetsTypeData,depreciation,info,financeData){
      this.assetsTypeData = assetsTypeData
      this.depreciation = depreciation
      this.info = info
      this.financeData = financeData
      this.assetsType = assetsType
    },
    // 左侧分类切换
    changeAssetsType(data){
      data.label = `${data.code} - ${data.name}`
      this.assetsType = data.type
      this.assetsTypeData = data
      this.info = {}
    },
    // 保存卡片信息
    async submitForm(pdata,typeData) {
      let datas = JSON.stringify(pdata)
      let rows = {}
      switch (Number(typeData.type)) {
      case 1: // 1-房屋 housingInfoDto
        rows = pdata.housingInfoDto
        break
      case 2: // 2-设备 equipmentInfoDto
        rows = pdata.equipmentInfoDto
        break
      case 3: // 3-文物 culturalRelicsInfoDto
        rows = pdata.culturalRelicsInfoDto
        break
      case 4: // 4-图书 bookInfoDto
        rows = pdata.bookInfoDto
        break
      case 5: // 5-家具 furnitureInfoDto
        rows = pdata.furnitureInfoDto
        break
      case 6: // 6-动植物 plantAnimalInfoDto
        rows = pdata.plantAnimalInfoDto
        break
      case 7: // 7-物资 suppliesInfoDto
        rows = pdata.suppliesInfoDto
        break
      case 101: // 101-构筑物 structuresInfoDto
        rows = pdata.structuresInfoDto
        break
      case 102: // 102-土地 landInfoDto
        rows = pdata.landInfoDto
        break
      case 201: // 201-车辆 vehicleInfoDto
        rows = pdata.vehicleInfoDto
        break
      default:
        break
      }
      rows.postData = JSON.parse(datas)
      rows.typeName = typeData.name
      this.$emit('append',rows)
      this.dialogVisible = false
    },
    // 开启
    open(datas){
      this.selectedArr = datas || []
      this.dialogVisible = true
    },
    // 确认选择
    confirm(){
      this.$refs.CardInfo.submitForm('ruleForm')
      // this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
.check {
    /deep/ .app-container {
        padding: 0;
    }

    .el-dialog__body {
        padding: 20px 20px 5px 20px;
    }
}

.popper-tools {
    overflow-y: auto;
    height: 300px;
}
</style>
