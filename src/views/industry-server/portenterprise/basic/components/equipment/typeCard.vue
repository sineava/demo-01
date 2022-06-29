<template>
  <div class="type-detail">
    <div class="icon-title">
      <span class="span" />设施详细信息
    </div>
    <el-form
      v-if="facilityCategory === '2'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      hide-required-asterisk
      class="three-column-input-table"
      label-position="top"
      disabled
    >
      <el-form-item
        label="储罐名称或编号:"
        prop="enterpriseFacilityTankInfoDto.tankName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankName" />
      </el-form-item>
      <el-form-item
        label="罐区名称:"
        prop="enterpriseFacilityTankInfoDto.tankAreaName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankAreaName" />
      </el-form-item>
      <el-form-item
        label="罐组名称:"
        prop="enterpriseFacilityTankInfoDto.tankGroupName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankGroupName" />
      </el-form-item>
      <el-form-item
        label="所属企业:"
        prop="enterpriseFacilityTankInfoDto.enterpriseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.enterpriseName" />
      </el-form-item>
      <el-form-item
        label="储罐形状:"
        prop="enterpriseFacilityTankInfoDto.tankShape"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankShape" />
      </el-form-item>
      <el-form-item
        label="储罐形式:"
        prop="enterpriseFacilityTankInfoDto.tankForm"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankForm" />
      </el-form-item>
      <el-form-item
        label="储罐材质:"
        prop="enterpriseFacilityTankInfoDto.tankMaterial"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankMaterial" />
      </el-form-item>
      <el-form-item
        label="容积:"
        prop="enterpriseFacilityTankInfoDto.tankVolume"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.tankVolume"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="罐内直径:"
        prop="enterpriseFacilityTankInfoDto.internalDiameter"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.internalDiameter"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="高高液位:"
        prop="enterpriseFacilityTankInfoDto.highLiquidLevel"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.highLiquidLevel" />
      </el-form-item>
      <el-form-item
        label="低低液位:"
        prop="enterpriseFacilityTankInfoDto.lowLiquidLevel"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.lowLiquidLevel" />
      </el-form-item>
      <el-form-item
        label="设计储存货物名称:"
        prop="enterpriseFacilityTankInfoDto.storageCargoName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.storageCargoName" />
      </el-form-item>
      <el-form-item
        label="许可储存介质:"
        prop="enterpriseFacilityTankInfoDto.storageMedium"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.storageMedium" />
      </el-form-item>
      <el-form-item
        label="是否有设计资料:"
        prop="enterpriseFacilityTankInfoDto.hadDesignData"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.hadDesignData"
          placeholder="请选择"
        >
          <el-option
            label="是"
            value="1"
          />
          <el-option
            label="否"
            value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="设计单位名称:"
        prop="enterpriseFacilityTankInfoDto.designerName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designerName" />
      </el-form-item>
      <el-form-item
        label="设计单位资质:"
        prop="enterpriseFacilityTankInfoDto.designerQualification"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designerQualification" />
      </el-form-item>
      <el-form-item
        label="设计压力:"
        prop="enterpriseFacilityTankInfoDto.designedPressure"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designedPressure" />
      </el-form-item>
      <el-form-item
        label="设计温度:"
        prop="enterpriseFacilityTankInfoDto.designedTemperature"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designedTemperature" />
      </el-form-item>
      <el-form-item
        label="建造日期:"
        prop="enterpriseFacilityTankInfoDto.buildDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityTankInfoDto.buildDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="是否有建造工程资料（竣工资料）:"
        prop="enterpriseFacilityTankInfoDto.hadBuildData"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.hadBuildData"
          placeholder="请选择"
        >
          <el-option
            label="是"
            value="1"
          />
          <el-option
            label="否"
            value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="建造单位名称:"
        prop="enterpriseFacilityTankInfoDto.builderName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.builderName" />
      </el-form-item>
      <el-form-item
        label="建造单位资质:"
        prop="enterpriseFacilityTankInfoDto.builderQualification"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.builderQualification" />
      </el-form-item>
      <el-form-item
        label="设计使用寿命:"
        prop="enterpriseFacilityTankInfoDto.useLife"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.useLife" />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityTankInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.testPeriod"
          placeholder="请选择"
        >
          <el-option
            label="周"
            value="1"
          />
          <el-option
            label="月"
            value="2"
          />
          <el-option
            label="季"
            value="3"
          />
          <el-option
            label="年"
            value="4"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否对储罐维修过:"
        prop="enterpriseFacilityTankInfoDto.isRepaired"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.isRepaired"
          placeholder="请选择"
        >
          <el-option
            label="是"
            value="1"
          />
          <el-option
            label="否"
            value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="下次检测时间:"
        prop="enterpriseFacilityTankInfoDto.nextTestDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityTankInfoDto.nextTestDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="安全负责人（联系人）姓名:"
        prop="enterpriseFacilityTankInfoDto.contactName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.contactName" />
      </el-form-item>
      <el-form-item
        label="联系人邮箱:"
        prop="enterpriseFacilityTankInfoDto.contactEmail"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.contactEmail" />
      </el-form-item>
      <el-form-item
        label="联系电话:"
        prop="enterpriseFacilityTankInfoDto.contactPhone"
      >
        <el-input
          v-model="formData.enterpriseFacilityTankInfoDto.contactPhone"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item
        label="港口危险货物作业附证编号:"
        prop="enterpriseFacilityTankInfoDto.certificateNo"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.certificateNo" />
      </el-form-item>
      <el-form-item
        label="维修时间:"
        prop="enterpriseFacilityTankInfoDto.repairTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityTankInfoDto.repairTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="维修部位:"
        prop="enterpriseFacilityTankInfoDto.repairPosition"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.repairPosition" />
      </el-form-item>
      <el-form-item
        label="维修方式:"
        prop="enterpriseFacilityTankInfoDto.repairMode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.repairMode" />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="enterpriseFacilityTankInfoDto.remark"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.remark" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '4'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      hide-required-asterisk
      label-position="top"
      class="three-column-input-table"
      disabled
    >
      <el-form-item
        label="仓库名称或编号:"
        prop="enterpriseFacilityWarehouseInfoDto.warehouseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.warehouseName" />
      </el-form-item>
      <el-form-item
        label="主要货种:"
        prop="enterpriseFacilityWarehouseInfoDto.cargoCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.cargoCategory" />
      </el-form-item>
      <el-form-item
        label="生产火灾类别:"
        prop="enterpriseFacilityWarehouseInfoDto.fireCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.fireCategory" />
      </el-form-item>
      <el-form-item
        label="抗震等级:"
        prop="enterpriseFacilityWarehouseInfoDto.seismicLevel"
      >
        <el-select
          v-model="formData.enterpriseFacilityWarehouseInfoDto.seismicLevel"
          placeholder="请选择"
        >
          <el-option
            label="一级"
            value="一级"
          />
          <el-option
            label="二级"
            value="二级"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="耐火等级:"
        prop="enterpriseFacilityWarehouseInfoDto.refractoryLevel"
      >
        <el-select
          v-model="formData.enterpriseFacilityWarehouseInfoDto.refractoryLevel"
          placeholder="请选择"
        >
          <el-option
            label="一级"
            value="一级"
          />
          <el-option
            label="二级"
            value="二级"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="占地面积:"
        prop="enterpriseFacilityWarehouseInfoDto.coveredArea"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.coveredArea" />
      </el-form-item>
      <el-form-item
        label="建筑面积:"
        prop="enterpriseFacilityWarehouseInfoDto.buildArea"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.buildArea" />
      </el-form-item>
      <el-form-item
        label="仓容:"
        prop="enterpriseFacilityWarehouseInfoDto.warehouseVolume"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.warehouseVolume" />
      </el-form-item>
      <el-form-item
        label="投用时间:"
        prop="enterpriseFacilityWarehouseInfoDto.useDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityWarehouseInfoDto.useDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityWarehouseInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityWarehouseInfoDto.testPeriod"
          placeholder="请选择"
        >
          <el-option
            label="周"
            value="1"
          />
          <el-option
            label="月"
            value="2"
          />
          <el-option
            label="季"
            value="3"
          />
          <el-option
            label="年"
            value="4"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="enterpriseFacilityWarehouseInfoDto.remark"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.remark" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '3'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      disabled
      hide-required-asterisk
      class="three-column-input-table"
    >
      <el-form-item
        label="堆场名称或编号:"
        prop="enterpriseFacilityYardInfoDto.yardName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardName" />
      </el-form-item>
      <el-form-item
        label="所属企业名称:"
        prop="enterpriseFacilityYardInfoDto.enterpriseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.enterpriseName" />
      </el-form-item>
      <el-form-item
        label="设计存储的危险货物类别:"
        prop="enterpriseFacilityYardInfoDto.originalCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.originalCategory" />
      </el-form-item>
      <el-form-item
        label="许可堆存的危险货物类别:"
        prop="enterpriseFacilityYardInfoDto.allowedCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.allowedCategory" />
      </el-form-item>
      <el-form-item
        label="堆场火灾危险性:"
        prop="enterpriseFacilityYardInfoDto.yarFireRisk"
      >
        <el-select
          v-model="formData.enterpriseFacilityYardInfoDto.yarFireRisk"
          placeholder="请选择"
        >
          <el-option
            label="一般"
            value="一般"
          />
          <el-option
            label="重大"
            value="重大"
          />
          <el-option
            label="特级"
            value="特级"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="消防许可的火灾危险性:"
        prop="enterpriseFacilityYardInfoDto.allowedFireRisk"
      >
        <el-select
          v-model="formData.enterpriseFacilityYardInfoDto.allowedFireRisk"
          placeholder="请选择"
        >
          <el-option
            label="一般"
            value="一般"
          />
          <el-option
            label="重大"
            value="重大"
          />
          <el-option
            label="特级"
            value="特级"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="堆场位置类型:"
        prop="enterpriseFacilityYardInfoDto.yardLocationType"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardLocationType" />
      </el-form-item>
      <el-form-item
        label="堆场用途:"
        prop="enterpriseFacilityYardInfoDto.yardPurpose"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardPurpose" />
      </el-form-item>
      <el-form-item
        label="港口危险货物作业附证编号:"
        prop="enterpriseFacilityYardInfoDto.certificateNo"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.certificateNo" />
      </el-form-item>
      <el-form-item
        label="危险货物包装方式:"
        prop="enterpriseFacilityYardInfoDto.packingMode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.packingMode" />
      </el-form-item>
      <el-form-item
        label="堆场面积:"
        prop="enterpriseFacilityYardInfoDto.yardArea"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardArea" />
      </el-form-item>
      <el-form-item
        label="堆场容量:"
        prop="enterpriseFacilityYardInfoDto.yardVolume"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardVolume" />
      </el-form-item>
      <el-form-item
        label="集装箱堆场堆存能力:"
        prop="enterpriseFacilityYardInfoDto.containerStorage"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.containerStorage" />
      </el-form-item>
      <el-form-item
        label="投用时间:"
        prop="enterpriseFacilityYardInfoDto.useDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityYardInfoDto.useDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="enterpriseFacilityYardInfoDto.remark"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.remark" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '5'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      disabled
      hide-required-asterisk
      class="three-column-input-table"
    >
      <el-form-item
        label="船名:"
        prop="enterpriseFacilityPontoonInfoDto.boatName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatName" />
      </el-form-item>
      <el-form-item
        label="船籍港:"
        prop="enterpriseFacilityPontoonInfoDto.registryPort"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.registryPort" />
      </el-form-item>
      <el-form-item
        label="港内/沿海:"
        prop="enterpriseFacilityPontoonInfoDto.location"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.location" />
      </el-form-item>
      <el-form-item
        label="船舶种类:"
        prop="enterpriseFacilityPontoonInfoDto.boatCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatCategory" />
      </el-form-item>
      <el-form-item
        label="船舶材料:"
        prop="enterpriseFacilityPontoonInfoDto.boatMaterial"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatMaterial" />
      </el-form-item>
      <el-form-item
        label="建造日期:"
        prop="enterpriseFacilityPontoonInfoDto.buildDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityPontoonInfoDto.buildDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="改造日期:"
        prop="enterpriseFacilityPontoonInfoDto.reformDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityPontoonInfoDto.reformDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="配员（人）:"
        prop="enterpriseFacilityPontoonInfoDto.manning"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.manning"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="总吨（吨）:"
        prop="enterpriseFacilityPontoonInfoDto.totalTons"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.totalTons"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="净吨（吨）:"
        prop="enterpriseFacilityPontoonInfoDto.netTons"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.netTons"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="载重吨（吨）:"
        prop="enterpriseFacilityPontoonInfoDto.loading"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.loading"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="船长（米）:"
        prop="enterpriseFacilityPontoonInfoDto.boatLength"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.boatLength"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="船宽（米）:"
        prop="enterpriseFacilityPontoonInfoDto.boatWidth"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.boatWidth"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="吃水（米）:"
        prop="enterpriseFacilityPontoonInfoDto.boatDraw"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.boatDraw"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="主机功率（kw）:"
        prop="enterpriseFacilityPontoonInfoDto.mainPower"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPontoonInfoDto.mainPower"
          :precision="2"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="停靠地点:"
        prop="enterpriseFacilityPontoonInfoDto.stopPort"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.stopPort" />
      </el-form-item>
      <el-form-item
        label="适航证书下次检验时间:"
        prop="enterpriseFacilityPontoonInfoDto.nextTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityPontoonInfoDto.nextTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '7'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      disabled
      hide-required-asterisk
      class="three-column-input-table"
    >
      <el-form-item
        label="管线数量:"
        prop="enterpriseFacilityPipelineInfoDto.pipelineNum"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPipelineInfoDto.pipelineNum" />
      </el-form-item>
      <el-form-item
        label="管线总长度:"
        prop="enterpriseFacilityPipelineInfoDto.totalLength"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPipelineInfoDto.totalLength" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '6'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      disabled
      hide-required-asterisk
      class="three-column-input-table"
    >
      <el-form-item
        label="环保设施名称:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentName" />
      </el-form-item>
      <el-form-item
        label="环保设施编号:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentCode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentCode" />
      </el-form-item>
      <el-form-item
        label="环保设施种类:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentCategory" />
      </el-form-item>
      <el-form-item
        label="建设时间:"
        prop="enterpriseFacilityEnvironmentInfoDto.buildTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.buildTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="投入时间:"
        prop="enterpriseFacilityEnvironmentInfoDto.investTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.investTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityEnvironmentInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.testPeriod"
          placeholder="请选择"
        >
          <el-option
            label="周"
            value="1"
          />
          <el-option
            label="月"
            value="2"
          />
          <el-option
            label="季"
            value="3"
          />
          <el-option
            label="年"
            value="4"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="上次检测时间:"
        prop="enterpriseFacilityEnvironmentInfoDto.lastTime"
      >
        <el-input
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.lastTime"
          disabled
        />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '1'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      disabled
      hide-required-asterisk
      class="three-column-input-table"
    >
      <el-form-item
        label="泊位名称:"
        prop="enterpriseFacilityBerthInfoDto.berthName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthName" />
      </el-form-item>
      <el-form-item
        label="港区名称:"
        prop="enterpriseFacilityBerthInfoDto.portAreaName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.portAreaName" />
      </el-form-item>
      <el-form-item
        label="所属企业:"
        prop="enterpriseFacilityBerthInfoDto.affiliatedEnterprise"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.affiliatedEnterprise" />
      </el-form-item>
      <el-form-item
        label="使用企业:"
        prop="enterpriseFacilityBerthInfoDto.usingEnterprise"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.usingEnterprise" />
      </el-form-item>
      <el-form-item
        label="服务类型:"
        prop="enterpriseFacilityBerthInfoDto.serviceType"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.serviceType" />
      </el-form-item>
      <el-form-item
        label="结构形式:"
        prop="enterpriseFacilityBerthInfoDto.structuralStyle"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.structuralStyle" />
      </el-form-item>
      <el-form-item
        label="主要用途（集装箱等）:"
        prop="enterpriseFacilityBerthInfoDto.mainUses"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.mainUses" />
      </el-form-item>
      <el-form-item
        label="泊位用途:"
        prop="enterpriseFacilityBerthInfoDto.berthUsage"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthUsage" />
      </el-form-item>
      <el-form-item
        label="前沿设计水深:"
        prop="enterpriseFacilityBerthInfoDto.designDepth"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.designDepth" />
      </el-form-item>
      <el-form-item
        label="泊位长度（米）:"
        prop="enterpriseFacilityBerthInfoDto.berthLength"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthLength" />
      </el-form-item>
      <el-form-item
        label="设计靠泊能力（万吨）:"
        prop="enterpriseFacilityBerthInfoDto.berthingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthingCapacity" />
      </el-form-item>
      <el-form-item
        label="散装:"
        prop="enterpriseFacilityBerthInfoDto.bulk"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.bulk" />
      </el-form-item>
      <el-form-item
        label="件杂货物年通过能力（万吨/万标准箱/万辆/万人）:"
        prop="enterpriseFacilityBerthInfoDto.groceriesCarryingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.groceriesCarryingCapacity" />
      </el-form-item>
      <el-form-item
        label="旅客年通过能力:"
        prop="enterpriseFacilityBerthInfoDto.passengersCarryingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.passengersCarryingCapacity" />
      </el-form-item>
      <el-form-item
        label="滚装汽车年通过能力:"
        prop="enterpriseFacilityBerthInfoDto.rollCarryingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.rollCarryingCapacity" />
      </el-form-item>
      <el-form-item
        label="是否装卸危险货物:"
        prop="enterpriseFacilityBerthInfoDto.isDangerous"
      >
        <el-select
          v-model="formData.enterpriseFacilityBerthInfoDto.isDangerous"
          placeholder="请选择"
        >
          <el-option
            label="是"
            value="1"
          />
          <el-option
            label="否"
            value="0"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    facilityCategory: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;

    .span {
        display: inline-block;
        margin-right: 7px;
        width: 6px;
        height: 18px;
        background-color: #409eff;
    }
}

/deep/ .el-select {
    width: 100%;
}

/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
