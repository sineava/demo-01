<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增泊位信息' : type === 'detail' ? '泊位详情' : '编辑泊位信息'" />
      </span>
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
            <th class="text-right el-table-border"><i class="required" />泊位名称：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="berthName"><el-input v-model.trim="ruleForm.berthName" placeholder="请输入泊位名称" maxlength="100" /></el-form-item>
              <span v-else>{{ ruleForm.berthName }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">所在码头名称：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="wharfId">
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
              <span v-else>{{ wharfName }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />所属企业：</th>
            <td class="text-left el-table-border" colspan="3">
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
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />泊位状态：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="state">
                <el-select v-model="ruleForm.state" style="width: 100%;" placeholder="请选择泊位状态">
                  <el-option label="营业" value="营业" />
                  <el-option label="在建" value="在建" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.state }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />泊位区域归属：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="regionalIdentity">
                <el-select v-model="ruleForm.regionalIdentity" style="width: 100%;" placeholder="请选择泊位区域归属">
                  <el-option label="内河" value="内河" />
                  <el-option label="沿海" value="沿海" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.regionalIdentity }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <tr>
            <th class="text-right el-table-border"><i class="required" />竣工验收日期或老码头监测评估时间：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="acceptanceDate">
                <el-date-picker
                  v-model="ruleForm.acceptanceDate"
                  type="date"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                  placeholder="选择竣工验收日期或老码头监测评估时间"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.acceptanceDate }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />码头/泊位结构型式：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="structuralStyle">
                <el-select v-model="ruleForm.structuralStyle" style="width: 100%;" placeholder="请选择码头/泊位结构型式">
                  <el-option label="浮码头" value="浮码头" />
                  <el-option label="浮式+管道" value="浮式+管道" />
                  <el-option label="浮式+缆车" value="浮式+缆车" />
                  <el-option label="浮式+梭槽" value="浮式+梭槽" />
                  <el-option label="浮式+下河公路" value="浮式+下河公路" />
                  <el-option label="浮式+下河梯道" value="浮式+下河梯道" />
                  <el-option label="浮式+斜坡" value="浮式+斜坡" />
                  <el-option label="直立式" value="直立式" />
                  <el-option label="高桩码头" value="高桩码头" />
                  <el-option label="缆车码头" value="缆车码头" />
                  <el-option label="斜坡式" value="斜坡式" />
                  <el-option label="斜坡+公路" value="斜坡+公路" />
                  <el-option label="斜坡+梯道+浮式" value="斜坡+梯道+浮式" />
                  <el-option label="皮带机斜坡" value="皮带机斜坡" />
                  <el-option label="下河公路" value="下河公路" />
                  <el-option label="梭槽" value="梭槽" />
                  <el-option label="下河梯道" value="下河梯道" />
                  <el-option label="自然岸坡" value="自然岸坡" />
                  <el-option label="其他码头" value="其他码头" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.structuralStyle }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">备注：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="remark">
                <el-input
                  v-model="ruleForm.remark"
                  type="textarea"
                  placeholder="请输入备注"
                  maxlength="200"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  show-word-limit
                />
              </el-form-item>
              <span v-else>{{ ruleForm.remark }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border"><i class="required" />泊位主要用途：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="mainUses">
                <el-select
                  v-model="ruleForm.mainUses"
                  style="width: 100%;"
                  multiple
                  placeholder="请选择泊位主要用途"
                >
                  <el-option label="件杂" value="件杂" />
                  <el-option label="散货" value="散货" />
                  <el-option label="滚装" value="滚装" />
                  <el-option label="集装箱" value="集装箱" />
                  <el-option label="危险货物" value="危险货物" />
                  <el-option label="客运" value="客运" />
                  <el-option label="多功能" value="多功能" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
              <span v-else>
                <el-tag v-for="(item,index) in ruleForm.mainUses" :key="index" style="margin: 5px;">{{ item }}</el-tag>
              </span>
            </td>
          </tr>
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />是否危险品码头：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="dangerousGoodsTerminal">
                <el-select
                  v-model="ruleForm.dangerousGoodsTerminal"
                  style="width: 100%;"
                  placeholder="请选择是否危险品码头"
                >
                  <el-option label="是" :value="1" />
                  <el-option label="否" :value="0" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.dangerousGoodsTerminal ? '是' : '否' }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />结构安全等级：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="structuralSafetyClass">
                <el-select
                  v-model="ruleForm.structuralSafetyClass"
                  style="width: 100%;"
                  placeholder="请选择结构安全等级"
                >
                  <el-option label="一级" value="一级" />
                  <el-option label="二级" value="二级" />
                  <el-option label="三级" value="三级" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.structuralSafetyClass }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />抗震设防标准：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="seismicFortificationCriterion">
                <el-select v-model="ruleForm.seismicFortificationCriterion" style="width: 100%;" placeholder="请选择抗震设防标准">
                  <el-option label="标准设防类" value="标准设防类" />
                  <el-option label="重点设防类" value="重点设防类" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.seismicFortificationCriterion }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />抗震设防烈度（度）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="seismicFortificationIntensity">
                <el-select v-model="ruleForm.seismicFortificationIntensity" style="width: 100%;" placeholder="请选择抗震设防烈度（度）">
                  <el-option label="6级" value="6" />
                  <el-option label="7级" value="7" />
                  <el-option label="8级" value="8" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.seismicFortificationIntensity ? ruleForm.seismicFortificationIntensity + '级' : '' }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />设计使用年限（a）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="designLife">
                <el-select v-model="ruleForm.designLife" style="width: 100%;" placeholder="请选择设计使用年限（a）">
                  <el-option label="20" value="20" />
                  <el-option label="30" value="30" />
                  <el-option label="50" value="50" />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.designLife ? ruleForm.designLife + '年' : '' }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />泊位吨级（吨）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="berthTonnage">
                <el-select v-model="ruleForm.berthTonnage" style="width: 100%;" placeholder="请选择泊位吨级（吨）">
                  <el-option
                    v-for="(item,index) in berthTonnageArr"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.berthTonnage }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />码头前沿顶高程（m）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="topElevationOfWharfFront">
                <el-input-number
                  v-model="ruleForm.topElevationOfWharfFront"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="码头前沿顶高程（m）"
                  placeholder="请输入码头前沿顶高程（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.topElevationOfWharfFront }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />码头前沿底高程（m）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="bottomElevationOfWharfFront">
                <el-input-number
                  v-model="ruleForm.bottomElevationOfWharfFront"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="码头前沿底高程（m）"
                  placeholder="请输入码头前沿底高程（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.bottomElevationOfWharfFront }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />洪水设防重现期（内河）（年）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="periodOfFloodProtection">
                <el-form-item prop="periodOfFloodProtection"><el-input v-model.trim="ruleForm.periodOfFloodProtection" placeholder="请输入洪水设防重现期（内河）（年）" maxlength="100" /></el-form-item>
              </el-form-item>
              <span v-else>{{ ruleForm.periodOfFloodProtection }}</span>
            </td>
            <th class="text-right el-table-border">极端高水位（m）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="extremeHighWaterLevel">
                <el-input-number
                  v-model="ruleForm.extremeHighWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="极端高水位（m）"
                  placeholder="请输入极端高水位（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.extremeHighWaterLevel }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border">极端低水位（m）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="extremeLowWaterLevel">
                <el-input-number
                  v-model="ruleForm.extremeLowWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="极端低水位（m）"
                  placeholder="请输入极端低水位（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.extremeLowWaterLevel }}</span>
            </td>
            <th class="text-right el-table-border">设计高水位（m）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="designHighWaterLevel">
                <el-input-number
                  v-model="ruleForm.designHighWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计高水位（m）"
                  placeholder="请输入设计高水位（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designHighWaterLevel }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border">设计低水位（m）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="designLowWaterLevel">
                <el-input-number
                  v-model="ruleForm.designLowWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计低水位（m）"
                  placeholder="请输入设计低水位（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designLowWaterLevel }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />设计最高通航水位（内河）（m）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="maximumDesignedNavigableWaterLevel">
                <el-input-number
                  v-model="ruleForm.maximumDesignedNavigableWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计最高通航水位（内河）（m）"
                  placeholder="请输入设计最高通航水位（内河）（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.maximumDesignedNavigableWaterLevel }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />设计最低通航水位（内河）（m）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="minimumDesignedNavigableWaterLevel">
                <el-input-number
                  v-model="ruleForm.minimumDesignedNavigableWaterLevel"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计最低通航水位（内河）（m）"
                  placeholder="请输入设计最低通航水位（内河）（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.minimumDesignedNavigableWaterLevel }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />设计高水位50年一遇设计波高（m）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="designHighWaterLevelFiftyYears">
                <el-input-number
                  v-model="ruleForm.designHighWaterLevelFiftyYears"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计高水位50年一遇设计波高（m）"
                  placeholder="请输入设计高水位50年一遇设计波高（m）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designHighWaterLevelFiftyYears }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->

          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />设计波浪周期（s）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="designWavePeriod">
                <el-input-number
                  v-model="ruleForm.designWavePeriod"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计波浪周期（s）"
                  placeholder="设计波浪周期（s）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designWavePeriod }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />设计风速（m/s）:</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="designWindSpeed">
                <el-input-number
                  v-model="ruleForm.designWindSpeed"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计风速（m/s）"
                  placeholder="请输入设计风速（m/s）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designWindSpeed }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- 2022-02-28 - new -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />设计流速（m/s）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="designFlowRate">
                <el-input-number
                  v-model="ruleForm.designFlowRate"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000"
                  :precision="2"
                  label="设计流速（m/s）"
                  placeholder="请输入设计流速（m/s）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.designFlowRate }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />造价（万元）:</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="cost">
                <el-input-number
                  v-model="ruleForm.cost"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="99999999999"
                  :precision="2"
                  label="造价（万元）"
                  placeholder="造价（万元）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.cost }}</span>
            </td>
          </tr>
          <!-- 2022-02-28 - new end-->
          <!-- <tr>
            <th class="text-right el-table-border">专业化泊位分类：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="serviceType">
                <el-radio-group v-model="ruleForm.serviceType">
                  <el-radio v-for="(item, index) in classify" :key="index" :label="item.key">{{ item.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <span v-else><el-tag>{{ getServiceType(ruleForm.serviceType) }}</el-tag></span>
            </td>
          </tr> -->
          <!-- <tr>
            <th class="text-right el-table-border">码头前沿设计水深（米）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="frontDesignWaterDepth">
                <el-input-number
                  v-model="ruleForm.frontDesignWaterDepth"
                  :min="0"
                  :controls="false"
                  style="width:100%;"
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
                  :controls="false"
                  style="width:100%;"
                  :max="100000"
                  :precision="2"
                  label="码头前沿维护水深（米）"
                  placeholder="请输入码头前沿维护水深（米）"
                />
              </el-form-item>
            </td>
          </tr> -->
          <!-- <tr>
            <th class="text-right el-table-border">设计靠泊能力（万吨级）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item prop="designBerthingCapacity">
                <el-input-number
                  v-model="ruleForm.designBerthingCapacity"
                  :min="0"
                  :controls="false"
                  style="width:100%;"
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
                  :controls="false"
                  style="width:100%;"
                  :max="100000000"
                  :precision="3"
                  label="结构靠泊能力（吨级）"
                  placeholder="请输入结构靠泊能力（吨级）"
                />
              </el-form-item>
            </td>
          </tr> -->
          <tr>
            <th class="text-right el-table-border"><i class="required" />核查泊位吨级（吨）：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="checkBerthingCapability">
                <el-select v-model="ruleForm.checkBerthingCapability" style="width: 100%;" placeholder="请选择核查泊位吨级（吨）">
                  <el-option
                    v-for="(item,index) in berthTonnageArr"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <span v-else>{{ ruleForm.checkBerthingCapability }}</span>
            </td>
            <th class="text-right el-table-border"><i class="required" />泊位长度（米）：</th>
            <td class="text-left el-table-border" colspan="3">
              <el-form-item v-if="type !=='detail'" prop="berthLength">
                <el-input-number
                  v-model="ruleForm.berthLength"
                  :min="0"
                  :controls="false"
                  style="width: 100%;"
                  :max="100000000"
                  :precision="2"
                  label="泊位长度（米）"
                  placeholder="请输入泊位长度（米）"
                />
              </el-form-item>
              <span v-else>{{ ruleForm.berthLength }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">泊位前沿设施设备情况：</th>
            <td class="text-left el-table-border" colspan="2">
              <el-form-item v-if="type !=='detail'" prop="isDangerous">
                <el-radio-group v-model="isDangerous">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <span v-else>{{ ruleForm.isDangerous ? '有' : '无' }}</span>
            </td>
            <td class="text-left el-table-border" colspan="4">
              <el-form-item v-if="isDangerous && type !=='detail'" prop="isDangerousGoods">
                <el-input v-model.trim="ruleForm.isDangerousGoods" placeholder="请输入泊位前沿设施设备情况" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.isDangerousGoods }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">泊位有标准岸电几套：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="berthUses">
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
              <span v-else>{{ ruleForm.berthUses }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right el-table-border">岸电情况说明：</th>
            <td class="text-left el-table-border" colspan="6">
              <el-form-item v-if="type !=='detail'" prop="belongingEnterprise">
                <el-input v-model.trim="ruleForm.belongingEnterprise" placeholder="请输入岸电情况说明" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.belongingEnterprise }}</span>
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
              <el-form-item v-if="type !=='detail'" prop="bulkAnnualCapacity">
                <el-input v-model.trim="ruleForm.bulkAnnualCapacity" placeholder="请输入散装(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.bulkAnnualCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="hybridAnnualCapacity">
                <el-input v-model.trim="ruleForm.hybridAnnualCapacity" placeholder="请输入件杂(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.hybridAnnualCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="containerAnnualCapacity">
                <el-input v-model.trim="ruleForm.containerAnnualCapacity" placeholder="请输入集装箱（万吨）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.containerAnnualCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="vehicleAnnualCapacity">
                <el-input v-model.trim="ruleForm.vehicleAnnualCapacity" placeholder="请输入滚装（万辆）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.vehicleAnnualCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="passengerAnnualCapacity">
                <el-input v-model.trim="ruleForm.passengerAnnualCapacity" placeholder="请输入旅客（万人）：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.passengerAnnualCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidAnnualCapacity" placeholder="请输入液货(万吨)：设计年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.liquidAnnualCapacity }}</span>
            </th>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">核查年综合通过能力</th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="bulkCheckCapacity">
                <el-input v-model.trim="ruleForm.bulkCheckCapacity" placeholder="请输入散装(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.bulkCheckCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="hybridCheckCapacity">
                <el-input v-model.trim="ruleForm.hybridCheckCapacity" placeholder="请输入件杂(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.hybridCheckCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="containerCheckCapacity">
                <el-input v-model.trim="ruleForm.containerCheckCapacity" placeholder="请输入集装箱(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.containerCheckCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="vehicleCheckCapacity">
                <el-input v-model.trim="ruleForm.vehicleCheckCapacity" placeholder="请输入滚装（万辆）：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.vehicleCheckCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="passengerCheckCapacity">
                <el-input v-model.trim="ruleForm.passengerCheckCapacity" placeholder="请输入旅客（万人）：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.passengerCheckCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidCheckCapacity" placeholder="请输入液货(万吨)：检查年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.liquidCheckCapacity }}</span>
            </th>
          </tr>
          <tr>
            <th class="text-right el-table-border" style="padding: 0 10px 0 0;">上一年度泊位吞吐量</th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="bulkLastCapacity">
                <el-input v-model.trim="ruleForm.bulkLastCapacity" placeholder="请输入散装(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.bulkLastCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="hybridLastCapacity">
                <el-input v-model.trim="ruleForm.hybridLastCapacity" placeholder="请输入件杂(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.hybridLastCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="containerLastCapacity">
                <el-input v-model.trim="ruleForm.containerLastCapacity" placeholder="请输入集装箱(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.containerLastCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="vehicleLastCapacity">
                <el-input v-model.trim="ruleForm.vehicleLastCapacity" placeholder="请输入滚装（万辆）：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.vehicleLastCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="passengerLastCapacity">
                <el-input v-model.trim="ruleForm.passengerLastCapacity" placeholder="请输入旅客（万人）：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.passengerLastCapacity }}</span>
            </th>
            <th class="text-center el-table-border">
              <el-form-item v-if="type !=='detail'" prop="liquidLastCapacity">
                <el-input v-model.trim="ruleForm.liquidLastCapacity" placeholder="请输入液货(万吨)：上一年年综合通过能力" maxlength="100" />
              </el-form-item>
              <span v-else>{{ ruleForm.liquidLastCapacity }}</span>
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
      ruleForm: {
        state:'',
        enterpriseId:'',
        wharfId:'',
        regionalIdentity:'',
        structuralStyle:'',
        mainUses:[],
        dangerousGoodsTerminal:'',
        structuralSafetyClass:'',
        seismicFortificationCriterion:'',
        seismicFortificationIntensity:'',
        designLife:'',
        berthTonnage:'',
        checkBerthingCapability:'',
      },
      wharf:[],
      geographyInfos:[],
      enterpriseList:[],
      loading:false,
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
      berthTonnageArr:[
        '500以下',500,1000,1500,2000,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000,'10000以上'
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
        acceptanceDate:[
          { required: true, message: '请选择竣工验收日期或老码头监测评估时间', trigger: 'blur' }
        ],
        structuralStyle:[
          { required: true, message: '请输入码头/泊位结构型式', trigger: 'change' }
        ],
        state:[
          { required: true, message: '请选择泊位状态', trigger: 'change' }
        ],
        regionalIdentity:[
          { required: true, message: '请选择泊位区域归属', trigger: 'change' }
        ],
        mainUses:[
          { required: true, message: '请选择泊位主要用途', trigger: 'change' }
        ],
        dangerousGoodsTerminal:[
          { required: true, message: '请选择是否危险品码头', trigger: 'change' }
        ],
        structuralSafetyClass:[
          { required: true, message: '请选择结构安全等级', trigger: 'change' }
        ],
        seismicFortificationCriterion:[
          { required: true, message: '请选择抗震设防标准', trigger: 'change' }
        ],
        seismicFortificationIntensity:[
          { required: true, message: '请选择抗震设防烈度（度）', trigger: 'change' }
        ],
        designLife:[
          { required: true, message: '请选择设计使用年限（a）', trigger: 'change' }
        ],
        berthTonnage:[
          { required: true, message: '请选择泊位吨级（吨）', trigger: 'change' }
        ],
        checkBerthingCapability:[
          { required: true, message: '请选择核查泊位吨级（吨）', trigger: 'change' }
        ],
        berthLength:[
          { required: true, message: '请输入泊位长度（m）', trigger: 'blur' }
        ],
        topElevationOfWharfFront:[
          { required: true, message: '请输入码头前沿顶高程（m）', trigger: 'blur' }
        ],
        bottomElevationOfWharfFront:[
          { required: true, message: '请输入码头前沿底高程（m）', trigger: 'blur' }
        ],
        periodOfFloodProtection:[
          { required: true, message: '请输入洪水设防重现期（内河）（年）', trigger: 'blur' }
        ],
        maximumDesignedNavigableWaterLevel:[
          { required: true, message: '请输入设计最高通航水位（内河）（m）', trigger: 'blur' }
        ],
        minimumDesignedNavigableWaterLevel:[
          { required: true, message: '请输入设计最低通航水位（内河）（m）', trigger: 'blur' }
        ],
        designHighWaterLevelFiftyYears:[
          { required: true, message: '请输入设计高水位50年一遇设计波高（m）', trigger: 'blur' }
        ],
        designWavePeriod:[
          { required: true, message: '请输入设计波浪周期（s）', trigger: 'blur' }
        ],
        designFlowRate:[
          { required: true, message: '请输入设计流速（m/s）', trigger: 'blur' }
        ],
        designWindSpeed:[
          { required: true, message: '请输入设计风速（m/s）', trigger: 'blur' }
        ]
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
        if (res.code==='0'){
          this.ruleForm = {...this.ruleForm,...res.data}
          this.wharfName = res.data.wharfName
          this.isDangerous = this.ruleForm.isDangerousGoods ? 1 : 0
          this.geographyInfos = this.ruleForm.berthCoordinatesVoList || []
          this.ruleForm.mainUses = this.ruleForm.mainUses ? this.ruleForm.mainUses.split(',') : []
          this.$nextTick(() => {
            this.$refs.berthMap.init(this.geographyInfos)
          })
        }
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
      this.ruleForm.mainUses = this.ruleForm.mainUses ? this.ruleForm.mainUses.join(',') : ''
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
    getServiceType(type){
      let name = ''
      for (let i=0;i<this.classify.length;i++){
        if (this.classify[i].key === type){
          name = this.classify[i].name
          return name
        }
      }
      return name
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
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
    //border: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    width: 100%;

    .el-form-item {
        margin-bottom: 0;
    }

    .is-error {
        margin-bottom: 15px;
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
