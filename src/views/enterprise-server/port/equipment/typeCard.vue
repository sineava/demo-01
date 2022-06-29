<template>
  <div class="type-detail">
    <div class="icon-title">
      <span class="span" />设施详细信息
    </div>
    <el-form
      v-if="facilityCategory === '2'"
      ref="enterpriseFacilityTankInfoDto"
      :model="formData"
      size="medium"
      class="three-column-input-table"
      label-position="top"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="储罐名称或编号:"
        prop="enterpriseFacilityTankInfoDto.tankName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankName" placeholder="请输入储罐名称或编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="罐区名称:"
        prop="enterpriseFacilityTankInfoDto.tankAreaName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankAreaName" placeholder="请输入罐区名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="罐组名称:"
        prop="enterpriseFacilityTankInfoDto.tankGroupName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankGroupName" placeholder="请输入罐组名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="所属企业:"
        prop="enterpriseFacilityTankInfoDto.enterpriseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.enterpriseName" placeholder="请输入所属企业" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="储罐形状:"
        prop="enterpriseFacilityTankInfoDto.tankShape"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankShape" placeholder="请输入储罐形状" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="储罐形式:"
        prop="enterpriseFacilityTankInfoDto.tankForm"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankForm" placeholder="请输入储罐形式" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="储罐材质:"
        prop="enterpriseFacilityTankInfoDto.tankMaterial"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.tankMaterial" placeholder="请输入储罐材质" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="容积:"
        prop="enterpriseFacilityTankInfoDto.tankVolume"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.tankVolume"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入容积"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入罐内直径"
        />
      </el-form-item>
      <el-form-item
        label="高高液位:"
        prop="enterpriseFacilityTankInfoDto.highLiquidLevel"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.highLiquidLevel"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入高高液位"
        />
      </el-form-item>
      <el-form-item
        label="低低液位:"
        prop="enterpriseFacilityTankInfoDto.lowLiquidLevel"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.lowLiquidLevel"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入低低液位"
        />
      </el-form-item>
      <el-form-item
        label="设计储存货物名称:"
        prop="enterpriseFacilityTankInfoDto.storageCargoName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.storageCargoName" placeholder="请输入设计储存货物名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="许可储存介质:"
        prop="enterpriseFacilityTankInfoDto.storageMedium"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.storageMedium" placeholder="请输入许可储存介质" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="是否有设计资料:"
        prop="enterpriseFacilityTankInfoDto.hadDesignData"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.hadDesignData"
          placeholder="请选择是否有设计资料"
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
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designerName" placeholder="请输入设计单位名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="设计单位资质:"
        prop="enterpriseFacilityTankInfoDto.designerQualification"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.designerQualification" placeholder="请输入设计单位资质" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="设计压力:"
        prop="enterpriseFacilityTankInfoDto.designedPressure"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.designedPressure"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入设计压力"
        />
      </el-form-item>
      <el-form-item
        label="设计温度:"
        prop="enterpriseFacilityTankInfoDto.designedTemperature"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.designedTemperature"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入设计温度"
        />
      </el-form-item>
      <el-form-item
        label="建造日期:"
        prop="enterpriseFacilityTankInfoDto.buildDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityTankInfoDto.buildDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择建造日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="是否有建造工程资料（竣工资料）:"
        prop="enterpriseFacilityTankInfoDto.hadBuildData"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.hadBuildData"
          placeholder="请选择是否有建造工程资料（竣工资料）"
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
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.builderName" placeholder="请输入建造单位名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="建造单位资质:"
        prop="enterpriseFacilityTankInfoDto.builderQualification"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.builderQualification" placeholder="请输入建造单位资质" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="设计使用寿命:"
        prop="enterpriseFacilityTankInfoDto.useLife"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityTankInfoDto.useLife"
          style="width: 100%;"
          :max="1000000000"
          :min="1"
          placeholder="请输入设计使用寿命"
        />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityTankInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityTankInfoDto.testPeriod"
          placeholder="请选择检测周期"
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
          placeholder="请选择是否对储罐维修过"
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
          placeholder="请选择下次检测时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="安全负责人（联系人）姓名:"
        prop="enterpriseFacilityTankInfoDto.contactName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.contactName" placeholder="请输入安全负责人（联系人）姓名" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="联系人邮箱:"
        prop="enterpriseFacilityTankInfoDto.contactEmail"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.contactEmail" placeholder="请输入联系人邮箱" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="联系电话:"
        prop="enterpriseFacilityTankInfoDto.contactPhone"
      >
        <el-input
          v-model="formData.enterpriseFacilityTankInfoDto.contactPhone"
          maxlength="11"
          placeholder="请输入联系电话"
        />
      </el-form-item>
      <el-form-item
        label="港口危险货物作业附证编号:"
        prop="enterpriseFacilityTankInfoDto.certificateNo"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.certificateNo" placeholder="请输入港口危险货物作业附证编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="维修时间:"
        prop="enterpriseFacilityTankInfoDto.repairTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityTankInfoDto.repairTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择维修时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="维修部位:"
        prop="enterpriseFacilityTankInfoDto.repairPosition"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.repairPosition" placeholder="请输入维修部位" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="维修方式:"
        prop="enterpriseFacilityTankInfoDto.repairMode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityTankInfoDto.repairMode" placeholder="请输入维修方式" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="enterpriseFacilityTankInfoDto.remark"
        style="width: 100%;"
      >
        <el-input
          v-model="formData.enterpriseFacilityTankInfoDto.remark"
          type="textarea"
          rows="6"
          placeholder="请输入备注"
          maxlength="200"
          show-word-limit
        />
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
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="仓库名称或编号:"
        prop="enterpriseFacilityWarehouseInfoDto.warehouseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.warehouseName" placeholder="请输入仓库名称或编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="主要货种:"
        prop="enterpriseFacilityWarehouseInfoDto.cargoCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.cargoCategory" placeholder="请输入主要货种" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="生产火灾类别:"
        prop="enterpriseFacilityWarehouseInfoDto.fireCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.fireCategory" placeholder="请输入生产火灾类别" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="抗震等级:"
        prop="enterpriseFacilityWarehouseInfoDto.seismicLevel"
      >
        <el-select
          v-model="formData.enterpriseFacilityWarehouseInfoDto.seismicLevel"
          placeholder="请选择抗震等级"
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
          placeholder="请选择耐火等级"
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
        <el-input-number
          v-model="formData.enterpriseFacilityWarehouseInfoDto.coveredArea"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入占地面积"
        />
      </el-form-item>
      <el-form-item
        label="建筑面积:"
        prop="enterpriseFacilityWarehouseInfoDto.buildArea"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityWarehouseInfoDto.buildArea"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入建筑面积"
        />
      </el-form-item>
      <el-form-item
        label="仓容:"
        prop="enterpriseFacilityWarehouseInfoDto.warehouseVolume"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityWarehouseInfoDto.warehouseVolume"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入仓容"
        />
      </el-form-item>
      <el-form-item
        label="投用时间:"
        prop="enterpriseFacilityWarehouseInfoDto.useDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityWarehouseInfoDto.useDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择投用时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityWarehouseInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityWarehouseInfoDto.testPeriod"
          placeholder="请选择检测周期"
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
        <el-input v-model.trim="formData.enterpriseFacilityWarehouseInfoDto.remark" placeholder="请输入备注" maxlength="200" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '3'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      hide-required-asterisk
      class="three-column-input-table"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="堆场名称或编号:"
        prop="enterpriseFacilityYardInfoDto.yardName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardName" placeholder="请输入堆场名称或编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="所属企业名称:"
        prop="enterpriseFacilityYardInfoDto.enterpriseName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.enterpriseName" placeholder="请输入所属企业名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="设计存储的危险货物类别:"
        prop="enterpriseFacilityYardInfoDto.originalCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.originalCategory" placeholder="请输入设计存储的危险货物类别" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="许可堆存的危险货物类别:"
        prop="enterpriseFacilityYardInfoDto.allowedCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.allowedCategory" placeholder="请输入许可堆存的危险货物类别" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="堆场火灾危险性:"
        prop="enterpriseFacilityYardInfoDto.yarFireRisk"
      >
        <el-select
          v-model="formData.enterpriseFacilityYardInfoDto.yarFireRisk"
          placeholder="请选择堆场火灾危险性"
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
          placeholder="请选择消防许可的火灾危险性"
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
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardLocationType" placeholder="请输入堆场位置类型" maxlength="8" />
      </el-form-item>
      <el-form-item
        label="堆场用途:"
        prop="enterpriseFacilityYardInfoDto.yardPurpose"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.yardPurpose" placeholder="请输入堆场用途" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="港口危险货物作业附证编号:"
        prop="enterpriseFacilityYardInfoDto.certificateNo"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.certificateNo" placeholder="请输入港口危险货物作业附证编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="危险货物包装方式:"
        prop="enterpriseFacilityYardInfoDto.packingMode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.packingMode" placeholder="请输入危险货物包装方式" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="堆场面积:"
        prop="enterpriseFacilityYardInfoDto.yardArea"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityYardInfoDto.yardArea"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入堆场面积"
        />
      </el-form-item>
      <el-form-item
        label="堆场容量:"
        prop="enterpriseFacilityYardInfoDto.yardVolume"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityYardInfoDto.yardVolume"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入堆场容量"
        />
      </el-form-item>
      <el-form-item
        label="集装箱堆场堆存能力:"
        prop="enterpriseFacilityYardInfoDto.containerStorage"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityYardInfoDto.containerStorage"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入集装箱堆场堆存能力"
        />
      </el-form-item>
      <el-form-item
        label="投用时间:"
        prop="enterpriseFacilityYardInfoDto.useDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityYardInfoDto.useDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请输入投用时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="enterpriseFacilityYardInfoDto.remark"
      >
        <el-input v-model.trim="formData.enterpriseFacilityYardInfoDto.remark" placeholder="请输入备注" maxlength="200" />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '5'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      hide-required-asterisk
      class="three-column-input-table"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="船名:"
        prop="enterpriseFacilityPontoonInfoDto.boatName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatName" placeholder="请输入船名" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="船籍港:"
        prop="enterpriseFacilityPontoonInfoDto.registryPort"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.registryPort" placeholder="请输入船籍港" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="港内/沿海:"
        prop="enterpriseFacilityPontoonInfoDto.location"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.location" placeholder="请输入港内/沿海" maxlength="8" />
      </el-form-item>
      <el-form-item
        label="船舶种类:"
        prop="enterpriseFacilityPontoonInfoDto.boatCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatCategory" placeholder="请输入船舶种类" maxlength="8" />
      </el-form-item>
      <el-form-item
        label="船舶材料:"
        prop="enterpriseFacilityPontoonInfoDto.boatMaterial"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.boatMaterial" placeholder="请输入船舶材料" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="建造日期:"
        prop="enterpriseFacilityPontoonInfoDto.buildDate"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityPontoonInfoDto.buildDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择建造日期"
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
          placeholder="请选择改造日期"
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
          :min="1"
          :max="1000000000"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入总吨（吨）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入净吨（吨）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入载重吨（吨）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入船长（米）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入船宽（米）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入吃水（米）"
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
          :max="9999999999"
          :min="1"
          placeholder="请输入主机功率（kw）"
        />
      </el-form-item>
      <el-form-item
        label="停靠地点:"
        prop="enterpriseFacilityPontoonInfoDto.stopPort"
      >
        <el-input v-model.trim="formData.enterpriseFacilityPontoonInfoDto.stopPort" placeholder="请输入停靠地点" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="适航证书下次检验时间:"
        prop="enterpriseFacilityPontoonInfoDto.nextTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityPontoonInfoDto.nextTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择适航证书下次检验时间"
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
      hide-required-asterisk
      class="three-column-input-table"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="管线数量:"
        prop="enterpriseFacilityPipelineInfoDto.pipelineNum"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPipelineInfoDto.pipelineNum"
          style="width: 100%;"
          :max="1000000000"
          :min="1"
          placeholder="请输入管线数量"
        />
      </el-form-item>
      <el-form-item
        label="管线总长度:"
        prop="enterpriseFacilityPipelineInfoDto.totalLength"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityPipelineInfoDto.totalLength"
          :precision="2"
          style="width: 100%;"
          :max="9999999999"
          :min="1"
          placeholder="请输入管线总长度"
        />
      </el-form-item>
    </el-form>
    <el-form
      v-if="facilityCategory === '6'"
      ref="ruleForm"
      :model="formData"
      label-width="180px"
      size="medium"
      label-position="top"
      hide-required-asterisk
      class="three-column-input-table"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="环保设施名称:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentName" placeholder="请输入环保设施名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="环保设施编号:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentCode"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentCode" placeholder="请输入环保设施编号" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="环保设施种类:"
        prop="enterpriseFacilityEnvironmentInfoDto.environmentCategory"
      >
        <el-input v-model.trim="formData.enterpriseFacilityEnvironmentInfoDto.environmentCategory" placeholder="请输入环保设施种类" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="建设时间:"
        prop="enterpriseFacilityEnvironmentInfoDto.buildTime"
      >
        <el-date-picker
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.buildTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择建设时间"
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
          placeholder="请选择投入时间"
        />
      </el-form-item>
      <el-form-item
        label="检测周期:"
        prop="enterpriseFacilityEnvironmentInfoDto.testPeriod"
      >
        <el-select
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.testPeriod"
          placeholder="请选择检测周期"
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
        <el-date-picker
          v-model="formData.enterpriseFacilityEnvironmentInfoDto.lastTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择上次检测时间"
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
      hide-required-asterisk
      class="three-column-input-table"
      :disabled="isDisabled?true:false"
    >
      <el-form-item
        label="泊位名称:"
        prop="enterpriseFacilityBerthInfoDto.berthName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthName" placeholder="请输入泊位名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="港区名称:"
        prop="enterpriseFacilityBerthInfoDto.portAreaName"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.portAreaName" placeholder="请输入港区名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="所属企业:"
        prop="enterpriseFacilityBerthInfoDto.affiliatedEnterprise"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.affiliatedEnterprise" placeholder="请输入所属企业" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="使用企业:"
        prop="enterpriseFacilityBerthInfoDto.usingEnterprise"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.usingEnterprise" placeholder="请输入使用企业" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="服务类型:"
        prop="enterpriseFacilityBerthInfoDto.serviceType"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.serviceType" placeholder="请输入服务类型" maxlength="50" />
      </el-form-item>
      <el-form-item
        label="结构形式:"
        prop="enterpriseFacilityBerthInfoDto.structuralStyle"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.structuralStyle" placeholder="请输入结构形式" maxlength="255" />
      </el-form-item>
      <el-form-item
        label="主要用途（集装箱等）:"
        prop="enterpriseFacilityBerthInfoDto.mainUses"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.mainUses" placeholder="请输入主要用途（集装箱等）" maxlength="255" />
      </el-form-item>
      <el-form-item
        label="泊位用途:"
        prop="enterpriseFacilityBerthInfoDto.berthUsage"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.berthUsage" placeholder="请输入泊位用途" maxlength="255" />
      </el-form-item>
      <el-form-item
        label="前沿设计水深:"
        prop="enterpriseFacilityBerthInfoDto.designDepth"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityBerthInfoDto.designDepth"
          :precision="2"
          style="width: 100%;"
          :max="99999999"
          :min="1"
          placeholder="请输入前沿设计水深"
        />
      </el-form-item>
      <el-form-item
        label="泊位长度（米）:"
        prop="enterpriseFacilityBerthInfoDto.berthLength"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityBerthInfoDto.berthLength"
          :precision="2"
          style="width: 100%;"
          :max="99999999"
          :min="1"
          placeholder="请输入泊位长度（米）"
        />
      </el-form-item>
      <el-form-item
        label="设计靠泊能力（万吨）:"
        prop="enterpriseFacilityBerthInfoDto.berthingCapacity"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityBerthInfoDto.berthingCapacity"
          :precision="2"
          style="width: 100%;"
          :max="99999999"
          :min="1"
          placeholder="请输入设计靠泊能力（万吨）"
        />
      </el-form-item>
      <el-form-item
        label="散装:"
        prop="enterpriseFacilityBerthInfoDto.bulk"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityBerthInfoDto.bulk"
          :precision="2"
          style="width: 100%;"
          :max="99999999"
          :min="1"
          placeholder="请输入散装"
        />
      </el-form-item>
      <el-form-item
        label="件杂货物年通过能力（万吨/万标准箱/万辆/万人）:"
        prop="enterpriseFacilityBerthInfoDto.groceriesCarryingCapacity"
      >
        <el-input-number
          v-model="formData.enterpriseFacilityBerthInfoDto.groceriesCarryingCapacity"
          :precision="2"
          style="width: 100%;"
          :max="99999999"
          :min="1"
          placeholder="请输入件杂货物年通过能力（万吨/万标准箱/万辆/万人）"
        />
      </el-form-item>
      <el-form-item
        label="旅客年通过能力:"
        prop="enterpriseFacilityBerthInfoDto.passengersCarryingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.passengersCarryingCapacity" placeholder="请输入旅客年通过能力" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="滚装汽车年通过能力:"
        prop="enterpriseFacilityBerthInfoDto.rollCarryingCapacity"
      >
        <el-input v-model.trim="formData.enterpriseFacilityBerthInfoDto.rollCarryingCapacity" placeholder="请输入滚装汽车年通过能力" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="是否装卸危险货物:"
        prop="enterpriseFacilityBerthInfoDto.isDangerous"
      >
        <el-select
          v-model="formData.enterpriseFacilityBerthInfoDto.isDangerous"
          placeholder="请选择是否装卸危险货物"
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enterpriseFacilityTankInfoDtoRules: {
        'enterpriseFacilityTankInfoDto.tankName': [
          { required: true, message: '请输入储罐名称或编号', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-select {
    width: 100%;
}

/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
