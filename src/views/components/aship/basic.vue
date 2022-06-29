<template>
  <div>
    <div v-if="oper==='add'" class="icon-title">
      <span class="span" />船舶查询添加<span style="font-size: 12px; font-weight: 500; color: #409eff;">（请输入船舶名称或船舶识别号进行查询添加）</span>
    </div>
    <div v-if="oper==='add'" style="margin: 15px 0;">
      <el-input v-model.trim="keyword" :placeholder="type===1?'请输入船舶名称':'请输入船舶识别号'" class="input-with-select">
        <el-select
          slot="prepend"
          v-model="type"
          style="width: 150px;"
          placeholder="请选择"
        >
          <!-- <el-option label="船舶名称" :value="1" /> -->
          <el-option label="船舶识别号" :value="2" />
        </el-select>
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
          @click="search"
        />
      </el-input>
    </div>
    <div v-if="oper!=='add' || isshow">
      <div class="icon-title">
        <span class="span" />船舶基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="basic"
        :rules="rules"
        label-width="0"
        class="base-ruleForm"
      >
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="船舶中文名称">
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶中文名称</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipName">
              <el-input
                v-model="basic.shipName"
                placeholder="请输入船舶中文名称"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">曾用名</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="usedName">
              <el-input
                v-model="basic.usedName"
                placeholder="请输入曾用名"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.usedName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船舶英文名称</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipEnglishName">
              <el-input
                v-model="basic.shipEnglishName"
                placeholder="请输入船舶英文名称"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipEnglishName }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶登记号</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipRegisterNo">
              <el-input
                v-model="basic.shipRegisterNo"
                placeholder="请输入船舶登记号"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipRegisterNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船舶初次登记号</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipFirstRegisterNo">
              <el-input
                v-model="basic.shipFirstRegisterNo"
                placeholder="请输入船舶初次登记号"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipFirstRegisterNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船检登记号</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipSurveyRegisterNo">
              <el-input
                v-model="basic.shipSurveyRegisterNo"
                placeholder="请输入船检登记号"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipSurveyRegisterNo }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶识别号</template>
            {{ basic.shipIdentifyNo }}
          </el-descriptions-item>
          <el-descriptions-item label="识别号生成时间">
            <el-form-item v-if="isEdit && enterpriseType===3" prop="identifyNoDate">
              <el-date-picker
                v-model="basic.identifyNoDate"
                type="date"
                style="width: 100%;"
                placeholder="选择建成日期"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.identifyNoDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船籍港</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="registryPort">
              <el-input
                v-model="basic.registryPort"
                placeholder="请输入船籍港"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.registryPort }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />运输区域</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="transportArea">
              <el-select
                v-model="basic.transportArea"
                clearable
                style="width: 100%;"
                placeholder="请选择运输区域"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="省内" value="省内" />
                <el-option label="省际" value="省际" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.transportArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />运输主水系类型</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="transportRiverType">
              <el-select
                v-model="basic.transportRiverType"
                clearable
                style="width: 100%;"
                placeholder="请选择运输主水系类型"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="长江" value="长江" />
                <el-option label="封闭水域" value="封闭水域" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.transportRiverType }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />沿海内河</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="coastalInland">
              <el-select
                v-model="basic.coastalInland"
                clearable
                style="width: 100%;"
                placeholder="请选择沿海内河"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="沿海" value="沿海" />
                <el-option label="内河" value="内河" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.coastalInland }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />运输类型</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="transportGoodsType">
              <el-select
                v-model="basic.transportGoodsType"
                clearable
                style="width: 100%;"
                placeholder="请选择运输类型"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="普货" value="普货" />
                <el-option label="集装箱" value="集装箱" />
                <el-option label="多用途" value="多用途" />
                <el-option label="商品汽车滚装" value="商品汽车滚装" />
                <el-option label="载重汽车滚装" value="载重汽车滚装" />
                <el-option label="危险品" value="危险品" />
                <el-option label="客运" value="客运" />
                <el-option label="渡运" value="渡运" />
                <el-option label="游览" value="游览" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.transportGoodsType }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶所有人</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipOwner">
              <el-input
                v-model="basic.shipOwner"
                placeholder="请输入船舶所有人"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipOwner }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">所占船舶股份</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shares">
              <el-input-number
                v-model="basic.shares"
                :min="0"
                :max="100"
                :precision="2"
                placeholder="请输入所占船舶股份"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shares }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="船舶经营人">
            {{ basic.shipOperator }}
          </el-descriptions-item>
          <el-descriptions-item label="经营人许可证号码" :span="2">
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />经营人许可证号码</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="operatorLicenceNo">
              <el-input
                v-model="basic.operatorLicenceNo"
                placeholder="请输入经营人许可证号码"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.operatorLicenceNo }}</span>
          </el-descriptions-item>

          <el-descriptions-item label="船舶管理人">
            <template slot="label">船舶管理人</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipEnterpriseId">
              <el-select
                v-model="basic.shipEnterpriseId"
                style="width: 100%;"
                placeholder="请选择"
                filterable
                clearable
                @change="shipCustodianChange"
                @clear="shipCustodianClear"
              >
                <el-option
                  v-for="(item,index) in shipList"
                  :key="index"
                  :label="item.enterpriseName"
                  :value="item.enterpriseId"
                />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.shipEnterpriseName }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="isEdit && enterpriseType!==3" class="required" />管理人许可证号码</template>
            <div v-if="isEdit">
              <el-form-item v-if="enterpriseType===3" prop="custodianLicenceNo">
                <el-select
                  v-model="basic.custodianLicenceNo"
                  style="width: 100%;"
                  clearable
                  filterable
                  placeholder="请选择管理人许可证号码"
                  @change="inputChange"
                  @clear="inputChange"
                >
                  <el-option
                    v-for="(item,index) in custodianLicenceNoList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-else
                prop="custodianLicenceNo"
                :rules="[
                  { required: true, message: '请选择管理人许可证号码', trigger: 'change' }
                ]"
              >
                <el-select
                  v-model="basic.custodianLicenceNo"
                  style="width: 100%;"
                  clearable
                  filterable
                  placeholder="请选择管理人许可证号码"
                  @change="inputChange"
                  @clear="inputChange"
                >
                  <el-option
                    v-for="(item,index) in custodianLicenceNoList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
            <span v-else>{{ basic.custodianLicenceNo }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶类型</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipType">
              <el-input
                v-model="basic.shipType"
                placeholder="请输入船舶类型"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipType }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船体材料</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="hullMaterial">
              <el-input
                v-model="basic.hullMaterial"
                placeholder="请输入船体材料"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.hullMaterial }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶总吨（吨）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipTotalTons">
              <el-input-number
                v-model="basic.shipTotalTons"
                :min="0"
                :max="1000000000"
                :precision="3"
                placeholder="请输入船舶总吨（吨）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipTotalTons }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />净吨位（吨）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="netTons">
              <el-input-number
                v-model="basic.netTons"
                :min="0"
                :max="1000000000"
                :precision="3"
                placeholder="请输入净吨位（吨）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.netTons }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />主机功率（千瓦）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="hostPower">
              <el-input-number
                v-model="basic.hostPower"
                :min="0"
                :max="1000000000"
                :precision="3"
                placeholder="请输入主机功率（千瓦）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.hostPower }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />主机数量（台）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="hostNum">
              <el-input-number
                v-model="basic.hostNum"
                :min="0"
                :max="1000000000"
                placeholder="请输入主机数量（台）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.hostNum }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />建成日期</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="completionDate">
              <el-date-picker
                v-model="basic.completionDate"
                type="date"
                style="width: 100%;"
                placeholder="选择建成日期"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.completionDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">改建日期</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="rebuildDate">
              <el-date-picker
                v-model="basic.rebuildDate"
                type="date"
                style="width: 100%;"
                placeholder="选择改建日期"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.rebuildDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船长（米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="captain">
              <el-input-number
                v-model="basic.captain"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入船长（米）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.captain }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />总长（米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="totalLength">
              <el-input-number
                v-model="basic.totalLength"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入总长（米）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.totalLength }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />型宽（米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="width">
              <el-input-number
                v-model="basic.width"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入型宽（米）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.width }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />型深（米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="depth">
              <el-input-number
                v-model="basic.depth"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入型深（米）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.depth }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">参考载货量（吨）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="referenceCapacity">
              <el-input-number
                v-model="basic.referenceCapacity"
                :min="0"
                :max="1000000000"
                :precision="3"
                placeholder="请输入参考载货量（吨）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.referenceCapacity }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />总载重吨（吨）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="netWeightTons">
              <el-input-number
                v-model="basic.netWeightTons"
                :min="0"
                :max="1000000000"
                :precision="3"
                placeholder="请输入载重吨（吨）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.netWeightTons }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">载箱量（TEU）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="loadingCapacity">
              <el-input-number
                v-model="basic.loadingCapacity"
                :min="0"
                :max="1000000000"
                placeholder="请输入载箱量（TEU）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.loadingCapacity }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">载气量（立方米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="gasCarryingCapacity">
              <el-input-number
                v-model="basic.gasCarryingCapacity"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入载气量（立方米）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.gasCarryingCapacity }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">载车量（车位）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="vehicleCapacity">
              <el-input-number
                v-model="basic.vehicleCapacity"
                :min="0"
                :max="1000000000"
                placeholder="请输入载车量（车位）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.vehicleCapacity }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">载客定额（客位）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="passengerQuota">
              <el-input-number
                v-model="basic.passengerQuota"
                :min="0"
                :max="1000000000"
                placeholder="请输入载客定额（客位）"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.passengerQuota }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="basic.shipOrigin==='购置' ? 1 : 3">
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />船舶来历</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipOrigin">
              <el-select
                v-model="basic.shipOrigin"
                clearable
                filterable
                :style="basic.shipOrigin==='购置' ? 'width:100%' : ''"
                placeholder="请选择船舶来历"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="新建" value="新建" />
                <el-option label="购置" value="购置" />
                <el-option label="光租" value="光租" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.shipOrigin }}</span>
          </el-descriptions-item>
          <el-descriptions-item v-if="basic.shipOrigin==='购置'" :span="basic.shipOrigin==='购置' ? 2 : 1">
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />购置地区</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="addressBuy">
              <el-cascader
                v-model="basic.addressBuy"
                style="width: 100%;"
                clearable
                class="elCacader"
                :props="defultProp"
                :options="address"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.addressBuy ? basic.addressBuy.join(' / ') : '' }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />满载吃水（米）</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="fullDraft">
              <el-input-number
                v-model="basic.fullDraft"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入满载吃水"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.fullDraft }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" /> 空载吃水</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="loadDraft">
              <el-input-number
                v-model="basic.loadDraft"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入空载吃水"
                :controls="false"
                style="width: 100%;"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.loadDraft }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">船检航区</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="shipSurveyArea">
              <el-input
                v-model="basic.shipSurveyArea"
                placeholder="请输入船检航区"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ basic.shipSurveyArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit && enterpriseType===3" class="required" />本船是否符合内河货运船舶船型主尺度系列标准</template>
            <el-form-item v-if="isEdit && enterpriseType===3" prop="isConformStandard">
              <el-select
                v-model="basic.isConformStandard"
                clearable
                placeholder="请选择"
                @change="inputChange"
                @clear="inputChange"
              >
                <el-option label="是" value="是" />
                <el-option label="否" value="否" />
              </el-select>
            </el-form-item>
            <span v-else>{{ basic.isConformStandard }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
    </div>
    <el-empty v-else :description="description" />
  </div>
</template>

<script>
import moment from 'moment'
import json from '@/api/address.json'
import { getShipInfo,getShipManagementList } from '@/api/water-transportation-services/information/enterprise-ship'
export default {
  props: {
    initData: {
      type: Object,
      default: ()=>{}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    enterpriseId:{
      type:[String,Number],
      default:''
    },
    enterpriseName:{ // 水路运输企业ID
      type:String,
      default:''
    },
    enterpriseType:{ // 企业类型 3-水路运输，5-船舶管理
      type:[String,Number],
      default:3
    },
    operType:{
      type:String,
      default:'add'
    },
  },
  data() {
    return {
      basic: {
        transportArea:'',
        transportRiverType:'',
        coastalInland:'',
        transportGoodsType:'',
        shipOrigin:'',
        isConformStandard:'',
        addressBuy:[],
        custodianLicenceNo:''
      },
      address:json,
      isshow:false,
      shipList:[],
      defultProp: {
        label: "name",
        value: "name",
        children: "sub"
      },
      isManually:false,
      description:'请输入船舶识别号',
      oper:'',
      type:2, // 搜索类型 - 1-船舶名称，2-船舶识别号
      keyword:'', // 搜索关键字
      custodianLicenceNoList:[], // 船舶管理企业-管理人许可证号码 选项
      rules: {
        /*
         * shipIdentifyNo:[
         *   { required: true, message: '请输入船舶识别号', trigger: 'blur' }
         * ],
         */
        shipSurveyRegisterNo:[
          { required: true, message: '请输入船检登记号', trigger: 'blur' }
        ],
        registryPort:[
          { required: true, message: '请输入船籍港', trigger: 'blur' }
        ],
        shipName:[
          { required: true, message: '请输入船舶中文名称', trigger: 'blur' }
        ],
        shipRegisterNo: [
          { required: true, message: '请输入船舶登记号', trigger: 'blur' }
        ],
        transportArea: [
          { required: true, message: '请选择运输区域', trigger: 'change' }
        ],
        transportRiverType: [
          { required: true, message: '请选择运输主水系类型', trigger: 'change' }
        ],
        coastalInland: [
          { required: true, message: '请选择沿海内河', trigger: 'change' }
        ],
        transportGoodsType: [
          { required: true, message: '请选择运输类型', trigger: 'change' }
        ],
        shipOwner: [
          { required: true, message: '请输入船舶所有人', trigger: 'blur' }
        ],
        operatorLicenceNo: [
          { required: true, message: '请输入经营人许可证号码', trigger: 'blur' }
        ],
        shipType: [
          { required: true, message: '请输入船舶类型', trigger: 'blur' }
        ],
        hullMaterial: [
          { required: true, message: '请输入船体材料', trigger: 'blur' }
        ],
        shipTotalTons: [
          { required: true, message: '请输入船舶总吨（吨）', trigger: 'blur' }
        ],
        netTons: [
          { required: true, message: '请输入净吨位（吨）', trigger: 'blur' }
        ],
        hostPower: [
          { required: true, message: '请输入主机功率（千瓦）', trigger: 'blur' }
        ],
        hostNum: [
          { required: true, message: '请输入主机数量（台）', trigger: 'blur' }
        ],
        completionDate: [
          { required: true, message: '请输入建成日期', trigger: 'blur' }
        ],
        captain: [
          { required: true, message: '请输入船长（米）', trigger: 'blur' }
        ],
        totalLength: [
          { required: true, message: '请输入总长（米）', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请输入型宽（米）', trigger: 'blur' }
        ],
        depth: [
          { required: true, message: '请输入型深（米）', trigger: 'blur' }
        ],
        netWeightTons: [
          { required: true, message: '请输入载重吨（吨）', trigger: 'blur' }
        ],
        shipOrigin: [
          { required: true, message: '请选择船舶来历', trigger: 'change' }
        ],
        fullDraft: [
          { required: true, message: '请输入满载吃水（米）', trigger: 'blur' }
        ],
        loadDraft: [
          { required: true, message: '请输入空载吃水', trigger: 'blur' }
        ],
        isConformStandard: [
          { required: true, message: '请输入本船是否符合内河货运船舶船型主尺度系列标准', trigger: 'change' }
        ],
        addressBuy:[
          { required: true, message: '请选择购置地区', trigger: 'change' }
        ],
      },
    }
  },
  watch:{
    initData:{
      handler(newV){
        this.initBasic(newV)
      },
      deep:true
    },
    enterpriseType(newV){
      this.getShipList()
    },
    operType(newV){
      this.oper = newV
    },
    enterpriseId(newV){
      this.getShipList()
    }
  },
  mounted() {
    this.getShipList()
    this.oper = this.operType
    this.initBasic(this.initData)
  },
  methods: {
    // 搜索
    search(){
      if (!this.keyword){
        this.setData(
          null,
          false,
          '请输入船舶识别号'
        )
        return false
      }
      const aloading = this.$loading({
        lock: true,
        text: '正在查询船舶信息，请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = {
        enterpriseId:this.enterpriseId,
        enterpriseType:this.enterpriseType
      }
      if (this.type===1){
        data.shipName = this.keyword
      } else {
        data.shipIdentifyNo = this.keyword
      }
      this.isManually = false
      getShipInfo(data).then(res=>{
        aloading.close()
        if (res){
          if (res.code==='0'){
            this.setData(
              res.data,
              res.code==='0'?true:false,
              res.code==='0'?'请输入船舶识别号':res.message,
            )
          } else {
            if (res.code==='303' && this.enterpriseType===3){
              this.$confirm('暂未在海事系统查询到船舶信息，请问是否需要手动添加?', '提示', {
                confirmButtonText: '手动添加',
                cancelButtonText: '在试试',
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                type: 'warning'
              }).then(() => {
                this.addManually()
              }).catch((action) => {

              })
            } else {
              this.setData('',false,res.possibleReason ? res.possibleReason : res.message)
              this.$message.error(res.possibleReason ? res.possibleReason : res.message)
            }
          }
        } else {
          this.$message.error('网络异常')
        }

      })
    },
    addManually(){
      this.isManually = true
      this.setData({shipIdentifyNo:this.keyword},true,'请输入船舶识别号')
    },
    // 设置数据
    setData(data,isshow,message){
      this.initBasic(data || {})
      this.$emit('changeLicense',data && data.enterpriseShipLicenseInfoVo || {})
      this.$emit('changeBusiness',this.basic)
      this.isshow = isshow
      this.$emit('saveButton',isshow)
      this.description = message
    },
    async getShipList(){
      let data = {
        enterpriseType:this.enterpriseType
      }
      if (this.enterpriseType===5){
        data.enterpriseId = this.enterpriseId
      }
      const res = await getShipManagementList(data)
      this.shipList = res.data || []
      if (this.enterpriseType===5 && this.shipList && this.shipList.length>0){
        this.basic.shipCustodian = this.shipList[0].enterpriseName
        this.basic.shipEnterpriseName = this.shipList[0].enterpriseName
        this.custodianLicenceNoList = this.shipList[0].licenseNo
      }
    },
    initBasic(data){
      this.basic = {
        assistShip:data?.assistShip || '', // 协助船舶
        businessScope:data?.businessScope || '', // 本船核定的经营范围
        id:data?.id || '',
        usedName:data?.usedName || '', // 曾用名
        shipName:data?.shipName || '', // 船舶中文名称
        shipEnglishName:data?.shipEnglishName || '', // 船舶英文名称
        transportArea:data?.transportArea || '', // 运输区域
        transportRiverType:data?.transportRiverType || '', // 运输主水系类型
        coastalInland:data?.coastalInland || '', // 沿海内河
        transportGoodsType:data?.transportGoodsType || '', // 运输类型
        shipFirstRegisterNo:data?.shipFirstRegisterNo || '', // 船舶初次登记号
        shipOwner:data?.shipOwner || '', // 船舶所有人
        shares:data?.shares , // 所占船舶股份
        operatorLicenceNo:data?.operatorLicenceNo || '', // 经营人许可证号码
        custodianLicenceNo:data?.custodianLicenceNo || '', // 管理人许可证号码
        shipType:data?.shipType || '', // 船舶类型
        shipEnterpriseId: this.enterpriseType===3 ? (data && data.shipEnterpriseId || '') : this.enterpriseId, // 船舶管理人ID
        shipEnterpriseName:this.enterpriseType===3 ? (data && data.shipEnterpriseName || '') : this.enterpriseName, // 船舶管理人名称
        shipCustodian:data?.shipCustodian || '', // 船舶管理人名称

        hullMaterial:data?.hullMaterial || '', // 船体材料
        shipTotalTons:data?.shipTotalTons, // 船舶总吨（吨）
        netTons:data?.netTons, // 净吨位（吨）
        hostPower:data?.hostPower, // 主机功率（千瓦）
        hostNum:data?.hostNum, // 主机数量（台）
        completionDate:data && data.completionDate ? moment(data.completionDate).format('YYYY-MM-DD') : '', // 建成日期
        rebuildDate:data && data.rebuildDate ? moment(data.rebuildDate).format('YYYY-MM-DD') : '', // 改建日期
        captain:data?.captain, // 船长（米）
        totalLength:data?.totalLength,// 总长（米）
        width:data?.width, // 型宽（米）
        depth:data?.depth, // 型深（米）
        referenceCapacity:data?.referenceCapacity, // 参考载货量（吨）
        netWeightTons:data?.netWeightTons, // 载重吨（吨）
        loadingCapacity:data?.loadingCapacity, // 载箱量（TEU）
        gasCarryingCapacity:data?.gasCarryingCapacity, // 载气量（立方米）
        vehicleCapacity:data?.vehicleCapacity, // 载车量（车位）
        passengerQuota:data?.passengerQuota, // 载客定额（客位）
        shipOrigin:data && data.shipOrigin || '', // 船舶来历
        fullDraft:data?.fullDraft, // 满载吃水（米）
        loadDraft:data?.loadDraft, // 空载吃水
        shipSurveyArea:data?.shipSurveyArea || '', // 船检航区
        isConformStandard:data?.isConformStandard || '', // 本船是否符合内河货运船舶船型主尺度系列标准
        registryPort:data?.registryPort || '', // 船籍港
        shipIdentifyNo:data?.shipIdentifyNo || '', // 船舶识别号
        shipRegisterNo:data?.shipRegisterNo || '', // 船舶登记号
        shipSurveyRegisterNo:data?.shipSurveyRegisterNo || '', // 船检登记号
        identifyNoDate:data && data.identifyNoDate ? moment(data.identifyNoDate).format('YYYY-MM-DD') : '', // 识别号生成时间
        shipOperator: this.enterpriseType===3 ? this.enterpriseName : (data && data.shipOperator || ''), // 船舶经营人
        shipId:data?.shipIdentifyNo || '', // 船舶识别号

        shipImo:data?.shipImo || '', // IMO编号
        mmsi:data?.mmsi || '',// MMSI编号
        shipStatus:data?.shipStatus || '',// 船舶状态，船舶技术资料接口
        financialLeaseFlag:data?.financialLeaseFlag || '', // 融资租赁标志
        hibernateFlag:data?.hibernateFlag || '',// 休眠标志
        hibernateRemark:data?.hibernateRemark || '', // 休眠理由
        origShipNameEn:data?.origShipNameEn || '',// 原船英文名
        origShipRegNo:data?.shipFirstRegisterNo || '',// 原船舶登记号
        shipCallSign:data?.shipCallSign || '',// 船舶呼号
        origRegPortName:data?.origRegPortName || '',// 原籍港名称
        origDeletionDate:data?.origDeletionDate || '',// 原注销日期
        shipRoute:data?.shipRoute || '',// 船线
        shipValue:data?.shipValue || '',// 船舶价值
        shipYardCn:data?.shipYardCn || '',// 造船厂名称
        shipYardEn:data?.shipYardEn || '',// 造船厂英文名称
        shipBuiltAddrCn:data?.shipBuiltAddrCn || '',// 造船地点中文名
        shipBuiltAddrEn:data?.shipBuiltAddrEn || '',// 造船地点英文名
        conversionShipyard:data?.conversionShipyard || '',// 改建船厂名称，船舶技术资料接口
        conversionShipyardEn:data?.conversionShipyardEn || '',// 英文改建船厂名称
        shipRebuiltAddrCn:data?.shipRebuiltAddrCn || '',// 改建地点
        shipRebuiltAddrEn:data?.shipRebuiltAddrEn || '',// 改建地点英文名
        shipEngineType:data && data.shipEngineType || '',// 主机种类
        shipPropellerNum:data?.shipPropellerNum || '',// 推进器数量
        shipPropellerKind:data?.shipPropellerKind || '',// 推进器种类
        shipOwnerAddr:data?.shipOwnerAddr || '',// 船舶所有人地址
        shipOperatorAddr:data?.shipOperatorAddr || '',// 船舶经营人地址
        shipRegionType:data?.shipRegionType || '',// 航海内河船标志
        remark:data?.remark || '',// 备注
        enterpriseId:this.enterpriseType===3 ? this.enterpriseId : (data && data.enterpriseId || ''),// 企业ID（水路运输企业）
        enterpriseName:this.enterpriseType===3 ? this.enterpriseName : (data && data.enterpriseName || ''),// 企业名称（水路运输企业）
        addressBuy:data && data.addressBuy ? (typeof(data.addressBuy)==='string' ? JSON.parse(data.addressBuy) : data.addressBuy) : [], // 购置地区
      }
      if (this.basic.shipEnterpriseId && this.enterpriseType===3){
        this.shipCustodianChange(this.basic.shipEnterpriseId)
      }
    },
    // 输入框变更
    inputChange(){
      this.$emit('changeBusiness',this.basic)
    },
    shipCustodianClear(){
      this.basic.shipCustodian = ''
      this.basic.shipEnterpriseName = ''
      this.basic.custodianLicenceNo = ''
      this.custodianLicenceNoList = []
      this.$emit('changeBusiness',this.basic)
    },
    shipCustodianChange(e){
      if (this.shipList.length>0){
        for (let i=0;i<this.shipList.length;i++){
          if (this.shipList[i].enterpriseId===e){
            this.basic.shipCustodian = this.shipList[i].enterpriseName
            this.basic.shipEnterpriseName = this.shipList[i].enterpriseName
            this.custodianLicenceNoList = this.shipList[i].licenseNo
            return false
          }
        }
        this.$emit('changeBusiness',this.basic)
      }
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      if (!this.basic.shipIdentifyNo){
        this.$message.error('未查询到船舶识别号')
        return false
      }
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.basic))
          res.completionDate=this.basic.completionDate ? moment(this.basic.completionDate).format('YYYY-MM-DD') : ''
          res.rebuildDate=this.basic.rebuildDate ? moment(this.basic.rebuildDate).format('YYYY-MM-DD') : ''
          res.addressBuy=this.basic.addressBuy ? (typeof(this.basic.addressBuy)==='object' ? JSON.stringify(this.basic.addressBuy) : '') : '' // 购置地区
          res.identifyNoDate=this.basic.identifyNoDate ? moment(this.basic.identifyNoDate).format('YYYY-MM-DD') : '' // 识别号生成时间
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
        width: 20%;
        line-height: 30px;
    }
}

.base-ruleForm {
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
}
</style>

