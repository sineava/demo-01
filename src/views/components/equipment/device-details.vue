<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <template v-if="facilityCategory === 2">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item>
                <template slot="label">储罐名称或编号:</template>
                <el-form-item v-if="isEdit" prop="tankName">
                <el-input
                    v-model.trim="ruleForm.tankName"
                    placeholder="请输入储罐名称或编号"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">罐区名称:</template>
                <el-form-item v-if="isEdit" prop="tankAreaName">
                <el-input
                    v-model.trim="ruleForm.tankAreaName"
                    placeholder="请输入罐区名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankAreaName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">罐组名称:</template>
                <el-form-item v-if="isEdit" prop="tankGroupName">
                <el-input
                    v-model.trim="ruleForm.tankGroupName"
                    placeholder="请输入罐组名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankGroupName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">所属企业:</template>
                <el-form-item v-if="isEdit" prop="enterpriseName">
                <el-input
                    v-model.trim="ruleForm.enterpriseName"
                    placeholder="请输入所属企业"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.enterpriseName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">储罐形状:</template>
                <el-form-item v-if="isEdit" prop="tankShape">
                <el-input
                    v-model.trim="ruleForm.tankShape"
                    placeholder="请输入储罐形状"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankShape}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">储罐形式:</template>
                <el-form-item v-if="isEdit" prop="tankForm">
                <el-input
                    v-model.trim="ruleForm.tankForm"
                    placeholder="请输入储罐形式"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankForm}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">储罐材质:</template>
                <el-form-item v-if="isEdit" prop="tankMaterial">
                <el-input
                    v-model.trim="ruleForm.tankMaterial"
                    placeholder="请输入储罐材质"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankMaterial}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">容积:</template>
                <el-form-item v-if="isEdit" prop="tankVolume">
                <el-input-number
                    v-model="ruleForm.tankVolume"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入容积"
                />
                </el-form-item>
                <span v-else>{{ruleForm.tankVolume}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">罐内直径:</template>
                <el-form-item v-if="isEdit" prop="internalDiameter">
                <el-input-number
                    v-model="ruleForm.internalDiameter"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入罐内直径"
                />
                </el-form-item>
                <span v-else>{{ruleForm.internalDiameter}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">高高液位:</template>
                <el-form-item v-if="isEdit" prop="highLiquidLevel">
                <el-input-number
                    v-model="ruleForm.highLiquidLevel"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入高高液位"
                />
                </el-form-item>
                <span v-else>{{ruleForm.highLiquidLevel}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">低低液位:</template>
                <el-form-item v-if="isEdit" prop="lowLiquidLevel">
                <el-input-number
                    v-model="ruleForm.lowLiquidLevel"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入低低液位"
                />
                </el-form-item>
                <span v-else>{{ruleForm.lowLiquidLevel}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计储存货物名称:</template>
                <el-form-item v-if="isEdit" prop="storageCargoName">
                <el-input
                    v-model.trim="ruleForm.storageCargoName"
                    placeholder="请输入设计储存货物名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.storageCargoName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">许可储存介质:</template>
                <el-form-item v-if="isEdit" prop="storageMedium">
                <el-input
                    v-model.trim="ruleForm.storageMedium"
                    placeholder="请输入许可储存介质"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.storageMedium}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">许可储存介质:</template>
                <el-form-item v-if="isEdit" prop="hadDesignData">
                <el-select
                    v-model="ruleForm.hadDesignData"
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
                <span v-else>{{ruleForm.hadDesignData === '1' ? '是' : '否'}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计单位名称:</template>
                <el-form-item v-if="isEdit" prop="designerName">
                <el-input
                    v-model.trim="ruleForm.designerName"
                    placeholder="请输入设计单位名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.designerName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计单位资质:</template>
                <el-form-item v-if="isEdit" prop="designerQualification">
                <el-input
                    v-model.trim="ruleForm.designerQualification"
                    placeholder="请输入设计单位资质"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.designerQualification}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计压力:</template>
                <el-form-item v-if="isEdit" prop="designedPressure">
                <el-input-number
                    v-model="ruleForm.designedPressure"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入设计压力"
                />
                </el-form-item>
                <span v-else>{{ruleForm.designedPressure}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计温度:</template>
                <el-form-item v-if="isEdit" prop="designedTemperature">
                <el-input-number
                    v-model="ruleForm.designedTemperature"
                    :precision="2"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入设计压力"
                />
                </el-form-item>
                <span v-else>{{ruleForm.designedTemperature}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建造日期:</template>
                <el-form-item v-if="isEdit" prop="buildDate">
                <el-date-picker
                    v-model="ruleForm.buildDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择建造日期"
                    style="width: 100%;"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.buildDate}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">是否有建造工程资料（竣工资料）:</template>
                <el-form-item v-if="isEdit" prop="hadBuildData">
                <el-select
                    v-model="ruleForm.hadBuildData"
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
                <span v-else>{{ruleForm.hadBuildData === '1' ? '是' : '否'}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建造单位名称:</template>
                <el-form-item v-if="isEdit" prop="builderName">
                <el-input
                    v-model.trim="ruleForm.builderName"
                    placeholder="请输入建造单位名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.builderName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建造单位资质:</template>
                <el-form-item v-if="isEdit" prop="builderQualification">
                <el-input
                    v-model.trim="ruleForm.builderQualification"
                    placeholder="请输入建造单位资质"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.builderQualification}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计使用寿命:</template>
                <el-form-item v-if="isEdit" prop="useLife">
                <el-input-number
                    v-model="ruleForm.useLife"
                    style="width: 100%;"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入设计使用寿命"
                />
                </el-form-item>
                <span v-else>{{ruleForm.useLife}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">检测周期:</template>
                <el-form-item v-if="isEdit" prop="testPeriod">
                <el-select
                    v-model="ruleForm.testPeriod"
                    placeholder="请选择检测周期"
                    >
                    <el-option label="周" value="1"/>
                    <el-option label="月" value="2"/>
                    <el-option label="季" value="3"/>
                    <el-option label="年" value="4"/>
                    </el-select>
                </el-form-item>
                <span v-else>{{ ['周','月','季','年'][Number(ruleForm.testPeriod)-1]}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">是否对储罐维修过:</template>
                <el-form-item v-if="isEdit" prop="isRepaired">
                <el-select
                    v-model="ruleForm.isRepaired"
                    placeholder="请选择是否对储罐维修过"
                    >
                    <el-option label="是" value="1"/>
                    <el-option label="否" value="0"/>
                </el-select>
                </el-form-item>
                <span v-else>{{ ruleForm.isRepaired === '1' ? '是' : '否' }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">下次检测时间:</template>
                <el-form-item v-if="isEdit" prop="nextTestDate">
                <el-date-picker
                    v-model="ruleForm.nextTestDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择下次检测时间"
                    style="width: 100%;"
                />
                </el-form-item>
                <span v-else>{{ ruleForm.nextTestDate }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">安全负责人（联系人）姓名:</template>
                <el-form-item v-if="isEdit" prop="contactName">
                <el-input
                    v-model.trim="ruleForm.contactName"
                    placeholder="请输入安全负责人（联系人）姓名"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.contactName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">联系人邮箱:</template>
                <el-form-item v-if="isEdit" prop="contactEmail">
                <el-input
                    v-model.trim="ruleForm.contactEmail"
                    placeholder="请输入联系人邮箱"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.contactEmail}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">联系电话:</template>
                <el-form-item v-if="isEdit" prop="contactPhone">
                <el-input
                    v-model.trim="ruleForm.contactPhone"
                    placeholder="请输入联系电话"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.contactPhone}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">港口危险货物作业附证编号:</template>
                <el-form-item v-if="isEdit" prop="certificateNo">
                <el-input
                    v-model.trim="ruleForm.certificateNo"
                    placeholder="请输入港口危险货物作业附证编号"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.certificateNo}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">维修时间:</template>
                <el-form-item v-if="isEdit" prop="repairTime">
                <el-date-picker
                    v-model="ruleForm.repairTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择维修时间"
                    style="width: 100%;"
                />
                </el-form-item>
                <span v-else>{{ruleForm.repairTime}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">维修部位:</template>
                <el-form-item v-if="isEdit" prop="repairPosition">
                <el-input
                    v-model.trim="ruleForm.repairPosition"
                    placeholder="请输入维修部位"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.repairPosition}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">维修方式:</template>
                <el-form-item v-if="isEdit" prop="repairMode">
                <el-input
                    v-model.trim="ruleForm.repairMode"
                    placeholder="请输入维修方式"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.repairMode}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">备注:</template>
                <el-form-item v-if="isEdit" prop="remark">
                <el-input
                    v-model="ruleForm.remark"
                    type="textarea"
                    rows="6"
                    placeholder="请输入备注"
                    maxlength="200"
                    show-word-limit
                />
                </el-form-item>
                <span v-else>{{ruleForm.remark}}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>

    <template v-if="facilityCategory === 4">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item :span="3">
                <template slot="label">仓库名称或编号:</template>
                <el-form-item v-if="isEdit" prop="warehouseName">
                <el-input
                    v-model.trim="ruleForm.warehouseName"
                    placeholder="请输入仓库名称或编号"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.warehouseName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">主要货种:</template>
                <el-form-item v-if="isEdit" prop="cargoCategory">
                <el-input
                    v-model.trim="ruleForm.cargoCategory"
                    placeholder="请输入主要货种"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.cargoCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">生产火灾类别:</template>
                <el-form-item v-if="isEdit" prop="fireCategory">
                <el-input
                    v-model.trim="ruleForm.fireCategory"
                    placeholder="请输入生产火灾类别"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.fireCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">抗震等级:</template>
                <el-form-item v-if="isEdit" prop="seismicLevel">
                <el-select
                    v-model="ruleForm.seismicLevel"
                    placeholder="请选择抗震等级"
                >
                    <el-option label="4级" value="4级"/>
                    <el-option label="5级" value="5级"/>
                    <el-option label="6级" value="6级"/>
                    <el-option label="7级" value="7级"/>
                    <el-option label="8级" value="8级"/>
                    <el-option label="9级" value="9级"/>
                </el-select>
                </el-form-item>
                <span v-else>{{ruleForm.seismicLevel}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">耐火等级:</template>
                <el-form-item v-if="isEdit" prop="refractoryLevel">
                <el-select
                    v-model="ruleForm.refractoryLevel"
                    placeholder="请选择耐火等级"
                >
                    <el-option label="1级" value="1级"/>
                    <el-option label="2级" value="2级"/>
                    <el-option label="3级" value="3级"/>
                    <el-option label="4级" value="4级"/>
                </el-select>
                </el-form-item>
                <span v-else>{{ruleForm.refractoryLevel}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">占地面积:</template>
                <el-form-item v-if="isEdit" prop="coveredArea">
                <el-input-number
                    v-model="ruleForm.coveredArea"
                    style="width: 100%;"
                    :max="9999999999"
                    :precision="2"
                    :controls="false"
                    :min="0"
                    placeholder="请输入占地面积"
                />
                </el-form-item>
                <span v-else>{{ruleForm.coveredArea}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建筑面积:</template>
                <el-form-item v-if="isEdit" prop="buildArea">
                <el-input-number
                    v-model="ruleForm.buildArea"
                    style="width: 100%;"
                    :precision="2"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入建筑面积"
                />
                </el-form-item>
                <span v-else>{{ruleForm.buildArea}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">仓容:</template>
                <el-form-item v-if="isEdit" prop="warehouseVolume">
                <el-input-number
                    v-model="ruleForm.warehouseVolume"
                    style="width: 100%;"
                    :precision="2"
                    :max="9999999999"
                    :controls="false"
                    :min="0"
                    placeholder="请输入仓容"
                />
                </el-form-item>
                <span v-else>{{ruleForm.warehouseVolume}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">投用时间:</template>
                <el-form-item v-if="isEdit" prop="useDate">
                <el-date-picker
                    v-model="ruleForm.useDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择投用时间"
                    style="width: 100%;"
                />
                </el-form-item>
                <span v-else>{{ruleForm.useDate}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">投用时间:</template>
                <el-form-item v-if="isEdit" prop="testPeriod">
                <el-select
                    v-model="ruleForm.testPeriod"
                    placeholder="请选择检测周期"
                >
                    <el-option label="周" value="1"/>
                    <el-option label="月" value="2"/>
                    <el-option label="季" value="3"/>
                    <el-option label="年" value="4"/>
                </el-select>
                </el-form-item>
                <span v-else>{{['周','月','季','年'][Number(ruleForm.testPeriod)-1]}}</span>
            </el-descriptions-item>
            <el-descriptions-item :span="3">
                <template slot="label">备注:</template>
                <el-form-item v-if="isEdit" prop="remark">
                <el-input
                    v-model="ruleForm.remark"
                    type="textarea"
                    rows="6"
                    placeholder="请输入备注"
                    maxlength="200"
                    show-word-limit
                />
                </el-form-item>
                <span v-else>{{ ruleForm.remark }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>

    <template v-if="facilityCategory === 3">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item>
                <template slot="label">堆场名称或编号:</template>
                <el-form-item v-if="isEdit" prop="yardName">
                <el-input
                    v-model.trim="ruleForm.yardName"
                    placeholder="请输入堆场名称或编号"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.yardName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">所属企业名称:</template>
                <el-form-item v-if="isEdit" prop="enterpriseName">
                <el-input
                    v-model.trim="ruleForm.enterpriseName"
                    placeholder="请输入所属企业名称"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.enterpriseName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计存储的危险货物类别:</template>
                <el-form-item v-if="isEdit" prop="originalCategory">
                <el-input
                    v-model.trim="ruleForm.originalCategory"
                    placeholder="请输入设计存储的危险货物类别"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.originalCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">设计存储的危险货物类别:</template>
                <el-form-item v-if="isEdit" prop="originalCategory">
                <el-input
                    v-model.trim="ruleForm.originalCategory"
                    placeholder="请输入设计存储的危险货物类别"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.originalCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">许可堆存的危险货物类别:</template>
                <el-form-item v-if="isEdit" prop="allowedCategory">
                    <el-input
                        v-model.trim="ruleForm.allowedCategory"
                        placeholder="请输入许可堆存的危险货物类别"
                        maxlength="100"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.allowedCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">堆场火灾危险性:</template>
                <el-form-item v-if="isEdit" prop="yarFireRisk">
                    <el-select
                        v-model="ruleForm.yarFireRisk"
                        placeholder="请选择堆场火灾危险性"
                    >
                        <el-option label="一般" value="一般"/>
                        <el-option label="重大" value="重大"/>
                        <el-option label="特级" value="特级"/>
                    </el-select>
                </el-form-item>
                <span v-else>{{ruleForm.yarFireRisk}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">消防许可的火灾危险性:</template>
                <el-form-item v-if="isEdit" prop="yarFireRisk">
                    <el-select
                        v-model="ruleForm.allowedFireRisk"
                        placeholder="请选择消防许可的火灾危险性"
                    >
                        <el-option label="一般" value="一般"/>
                        <el-option label="重大" value="重大"/>
                        <el-option label="特级" value="特级"/>
                    </el-select>
                </el-form-item>
                <span v-else>{{ruleForm.allowedFireRisk}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">堆场位置类型:</template>
                <el-form-item v-if="isEdit" prop="yardLocationType">
                <el-input
                    v-model.trim="ruleForm.yardLocationType"
                    placeholder="请输入堆场位置类型"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.yardLocationType}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">堆场用途:</template>
                <el-form-item v-if="isEdit" prop="yardPurpose">
                <el-input
                    v-model.trim="ruleForm.yardPurpose"
                    placeholder="请输入堆场用途"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.yardPurpose}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">港口危险货物作业附证编号:</template>
                <el-form-item v-if="isEdit" prop="certificateNo">
                <el-input
                    v-model.trim="ruleForm.certificateNo"
                    placeholder="请输入港口危险货物作业附证编号"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.certificateNo}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">危险货物包装方式:</template>
                <el-form-item v-if="isEdit" prop="packingMode">
                <el-input
                    v-model.trim="ruleForm.packingMode"
                    placeholder="请输入危险货物包装方式"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.packingMode}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">堆场面积:</template>
                <el-form-item v-if="isEdit" prop="packingMode">
                    <el-input-number
                        v-model="ruleForm.yardArea"
                        :precision="2"
                        style="width: 100%;"
                        :max="9999999999"
                        :controls="false"
                        :min="0"
                        placeholder="请输入堆场面积"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.yardArea}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">堆场容量:</template>
                <el-form-item v-if="isEdit" prop="yardVolume">
                    <el-input-number
                        v-model="ruleForm.yardVolume"
                        :precision="2"
                        style="width: 100%;"
                        :max="9999999999"
                        :controls="false"
                        :min="0"
                        placeholder="请输入堆场容量"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.yardVolume}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">集装箱堆场堆存能力:</template>
                <el-form-item v-if="isEdit" prop="containerStorage">
                    <el-input-number
                        v-model="ruleForm.containerStorage"
                        :precision="2"
                        style="width: 100%;"
                        :max="9999999999"
                        :controls="false"
                        :min="0"
                        placeholder="请输入集装箱堆场堆存能力"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.containerStorage}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">投用时间:</template>
                <el-form-item v-if="isEdit" prop="useDate">
                    <el-date-picker
                        v-model="ruleForm.useDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请输入投用时间"
                        style="width: 100%;"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.useDate}}</span>
            </el-descriptions-item>
            <el-descriptions-item :span="3">
                <template slot="label">备注:</template>
                <el-form-item v-if="isEdit" prop="remark">
                <el-input
                    v-model="ruleForm.remark"
                    type="textarea"
                    rows="6"
                    placeholder="请输入备注"
                    maxlength="200"
                    show-word-limit
                />
                </el-form-item>
                <span v-else>{{ ruleForm.remark }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>
    <template v-if="facilityCategory === 5">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item :span="3">
                <template slot="label">船名:</template>
                <el-form-item v-if="isEdit" prop="boatName">
                <el-input
                    v-model.trim="ruleForm.boatName"
                    placeholder="请输入船名"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">船籍港:</template>
                <el-form-item v-if="isEdit" prop="registryPort">
                <el-input
                    v-model.trim="ruleForm.registryPort"
                    placeholder="请输入船籍港"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.registryPort}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">港内/沿海:</template>
                <el-form-item v-if="isEdit" prop="location">
                <el-input
                    v-model.trim="ruleForm.location"
                    placeholder="请输入港内/沿海"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.location}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">船舶种类:</template>
                <el-form-item v-if="isEdit" prop="boatCategory">
                <el-input
                    v-model.trim="ruleForm.boatCategory"
                    placeholder="请输入船舶种类"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">船舶材料:</template>
                <el-form-item v-if="isEdit" prop="boatMaterial">
                <el-input
                    v-model.trim="ruleForm.boatMaterial"
                    placeholder="请输入船舶材料"
                    maxlength="100"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatMaterial}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建造日期:</template>
                <el-form-item v-if="isEdit" prop="buildDate">
                <el-date-picker
                    v-model="ruleForm.buildDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择建造日期"
                    style="width: 100%;"
                />
                </el-form-item>
                <span v-else>{{ruleForm.buildDate}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">改造日期:</template>
                <el-form-item v-if="isEdit" prop="reformDate">
                <el-date-picker
                    v-model="ruleForm.reformDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择改造日期"
                    style="width: 100%;"
                />
                </el-form-item>
                <span v-else>{{ruleForm.reformDate}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">配员（人）:</template>
                <el-form-item v-if="isEdit" prop="manning">
                <el-input-number
                    v-model="ruleForm.manning"
                    style="width: 100%;"
                    :min="0"
                    :controls="false"
                    placeholder="请输入配员（人）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.manning}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">总吨（吨）:</template>
                <el-form-item v-if="isEdit" prop="totalTons">
                <el-input-number
                    v-model="ruleForm.totalTons"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入总吨（吨）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.totalTons}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">净吨（吨）:</template>
                <el-form-item v-if="isEdit" prop="netTons">
                <el-input-number
                    v-model="ruleForm.netTons"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入净吨（吨）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.netTons}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">船长（米）:</template>
                <el-form-item v-if="isEdit" prop="boatLength">
                <el-input-number
                    v-model="ruleForm.boatLength"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入船长（米）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatLength}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">船宽（米）:</template>
                <el-form-item v-if="isEdit" prop="boatWidth">
                <el-input-number
                    v-model="ruleForm.boatWidth"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入船宽（米）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatWidth}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">吃水（米）:</template>
                <el-form-item v-if="isEdit" prop="boatDraw">
                <el-input-number
                    v-model="ruleForm.boatDraw"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入吃水（米）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.boatDraw}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">主机功率（kw）:</template>
                <el-form-item v-if="isEdit" prop="mainPower">
                <el-input-number
                    v-model="ruleForm.mainPower"
                    style="width: 100%;"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入主机功率（kw）"
                    :max="1000000000"
                />
                </el-form-item>
                <span v-else>{{ruleForm.mainPower}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">停靠地点:</template>
                <el-form-item v-if="isEdit" prop="stopPort">
                    <el-input v-model.trim="ruleForm.stopPort" placeholder="请输入停靠地点" maxlength="50" />
                </el-form-item>
                <span v-else>{{ruleForm.stopPort}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">适航证书下次检验时间:</template>
                <el-form-item v-if="isEdit" prop="nextTime">
                    <el-date-picker
                        v-model="ruleForm.nextTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择适航证书下次检验时间"
                        style="width: 100%;"
                    />
                </el-form-item>
                <span v-else>{{ruleForm.nextTime}}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>
    
    <template v-if="facilityCategory === 7">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item>
                <template slot="label">管线数量:</template>
                <el-form-item v-if="isEdit" prop="pipelineNum">
                <el-input-number
                    v-model="ruleForm.pipelineNum"
                    style="width: 100%;"
                    :max="1000000000"
                    :controls="false"
                    :min="0"
                    placeholder="请输入管线数量"
                />
                </el-form-item>
                <span v-else>{{ruleForm.pipelineNum}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">管线总长度（米）:</template>
                <el-form-item v-if="isEdit" prop="totalLength">
                <el-input-number
                    v-model="ruleForm.totalLength"
                    style="width: 100%;"
                    :max="1000000000"
                    :controls="false"
                    :precision="2"
                    :min="0"
                    placeholder="请输入管线总长度（米）"
                />
                </el-form-item>
                <span v-else>{{ruleForm.totalLength}}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>

    <template v-if="facilityCategory === 6">
        <el-descriptions
            class="descriptions"
            :column="3"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
        >
            <el-descriptions-item>
                <template slot="label">环保设施名称:</template>
                <el-form-item v-if="isEdit" prop="environmentName">
                    <el-input v-model.trim="ruleForm.environmentName" placeholder="请输入环保设施名称" maxlength="100" />
                </el-form-item>
                <span v-else>{{ruleForm.environmentName}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">环保设施编号:</template>
                <el-form-item v-if="isEdit" prop="environmentCode">
                    <el-input v-model.trim="ruleForm.environmentCode" placeholder="请输入环保设施编号" maxlength="100" />
                </el-form-item>
                <span v-else>{{ruleForm.environmentCode}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">环保设施种类:</template>
                <el-form-item v-if="isEdit" prop="environmentCategory">
                    <el-input v-model.trim="ruleForm.environmentCategory" placeholder="请输入环保设施种类" maxlength="100" />
                </el-form-item>
                <span v-else>{{ruleForm.environmentCategory}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">建设时间:</template>
                <el-form-item v-if="isEdit" prop="buildTime">
                    <el-date-picker
                        v-model="ruleForm.buildTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择建设时间"
                    />    
                </el-form-item>
                <span v-else>{{ruleForm.buildTime}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">投入时间:</template>
                <el-form-item v-if="isEdit" prop="investTime">
                    <el-date-picker
                        v-model="ruleForm.investTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择投入时间"
                    />    
                </el-form-item>
                <span v-else>{{ruleForm.investTime}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">检测周期:</template>
                <el-form-item v-if="isEdit" prop="testPeriod">
                <el-select
                    v-model="ruleForm.testPeriod"
                    placeholder="请选择检测周期"
                    >
                    <el-option label="周" value="1"/>
                    <el-option label="月" value="2"/>
                    <el-option label="季" value="3"/>
                    <el-option label="年" value="4"/>
                    </el-select>
                </el-form-item>
                <span v-else>{{ ['周','月','季','年'][Number(ruleForm.testPeriod)-1]}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">上次检测时间:</template>
                <el-form-item v-if="isEdit" prop="lastTime">
                    <el-date-picker
                        v-model="ruleForm.lastTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择上次检测时间"
                    />    
                </el-form-item>
                <span v-else>{{ruleForm.lastTime}}</span>
            </el-descriptions-item>
        </el-descriptions>
    </template>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    facilityCategory:{
      type: [Number,String],
      default:''
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    initIicense(data){
      this.ruleForm = data || {}
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          res = this.ruleForm
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
.base-ruleForm {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
