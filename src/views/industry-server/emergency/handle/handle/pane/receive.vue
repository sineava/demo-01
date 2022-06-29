<template>
  <div>
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>重庆市港航海事事务中心水上交通事故接警登记表
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
      >
        <div class="icon-title">
          <span class="span" />基础信息
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="ruleForm-title"
          contentClassName="ruleForm-text"
          border
        >
        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="isEdit" class="required" />事故名称:</template>
          <el-form-item v-if="isEdit" prop="name">
            <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入事故名称" />
          </el-form-item>
          <span v-else>{{ ruleForm.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />所属水域:</template>
          <el-form-item v-if="isEdit" prop="waters">
            <el-input v-model.trim="ruleForm.waters" maxlength="100" placeholder="请输入所属水域" />
          </el-form-item>
          <span v-else>{{ ruleForm.waters }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />所处航段:</template>
          <el-form-item v-if="isEdit" prop="segment">
            <el-input v-model.trim="ruleForm.segment" maxlength="100" placeholder="请输入所处航段" />
          </el-form-item>
          <span v-else>{{ ruleForm.segment }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />接警时间:</template>
          <el-form-item v-if="isEdit" prop="receivingTime">
            <el-date-picker
              v-model="ruleForm.receivingTime"
              type="datetime"
              style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择接警时间"
            />
          </el-form-item>
          <span v-else>{{ ruleForm.receivingTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />报警人:</template>
          <el-form-item v-if="isEdit" prop="alarmPeople">
            <el-input v-model.trim="ruleForm.alarmPeople" maxlength="20" placeholder="请输入报警人" />
          </el-form-item>
          <span v-else>{{ ruleForm.alarmPeople }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />接警电话:</template>
          <el-form-item v-if="isEdit" prop="alarmCall">
            <el-input v-model.trim="ruleForm.alarmCall" maxlength="11" placeholder="请输入接警电话" />
          </el-form-item>
          <span v-else>{{ ruleForm.alarmCall }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />事发时间:</template>
          <el-form-item v-if="isEdit" prop="occurrenceTime">
            <el-date-picker
              v-model="ruleForm.occurrenceTime"
              type="datetime"
              placeholder="请选择事发时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ ruleForm.occurrenceTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />事故类别:</template>
          <el-form-item v-if="isEdit" prop="accidentType">
            <el-select
              v-model="ruleForm.accidentType"
              clearable
              style="width: 100%;"
              placeholder="请选择事故类别"
            >
              <el-option
                v-for="item in accidentType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <span v-else>{{ getAccidentTypeName(ruleForm.accidentType) }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />事故等级:</template>
          <el-form-item v-if="isEdit" prop="accidentLevel">
            <el-select
              v-model="ruleForm.accidentLevel"
              clearable
              style="width: 100%;"
              placeholder="请选择事故等级"
            >
              <el-option
                label="特别重大"
                :value="1"
              />
              <el-option
                label="重大"
                :value="2"
              />
              <el-option
                label="较大"
                :value="3"
              />
              <el-option
                label="一般"
                :value="4"
              />
            </el-select>
          </el-form-item>
          <span v-else>{{ ['特别重大','重大','较大','一般'][ruleForm.accidentLevel] }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label"><i v-if="isEdit" class="required" />事故描述:</template>
          <el-form-item v-if="isEdit" prop="accidentDescribe">
            <el-input
              v-model.trim="ruleForm.accidentDescribe"
              type="textarea"
              placeholder="请输入事故描述"
              rows="6"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
          <span v-else>{{ ruleForm.accidentDescribe }}</span>
        </el-descriptions-item>
      </el-descriptions>
        
      <div class="icon-title">
        <span class="span" />船舶信息
      </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="ruleForm-title"
          contentClassName="ruleForm-text"
          border
        >
          <el-descriptions-item>
            <template slot="label">船舶名称:</template>
            <el-form-item v-if="isEdit" prop="shipNumber">
              <el-select
                v-model="ruleForm.shipNumber"
                clearable
                placeholder="请选择船舶"
                style="width: 100%;"
                @change="handleChange"
              >
                <div class="el-select-dropdown__item selected" style="height: auto;margin: 0 0 5px 0;">
                  <el-input placeholder="请输入船舶名称或识别号" v-model="keyword" clearable @input="dataFilter" />
                </div>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.shipName"
                  :disabled="item.disabled"
                  :value="item.id">
                  <span style="float: left">{{ item.shipName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shipIdentifyNo }}</span>
                </el-option>
                <el-pagination
                    @current-change="shipPage"
                    :page-size="pageSize"
                    :hide-on-single-page="false"
                    small
                    :pager-count="5"
                    :current-page="currentPage"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
              </el-select>
            </el-form-item>
            <span v-else>{{ getShipName(ruleForm.shipNumber) }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="船舶类型">{{shipForm.shipType || ''}}</el-descriptions-item>
          <el-descriptions-item label="船籍港">{{shipForm.registryPort || ''}}</el-descriptions-item>
          <el-descriptions-item label="船长(米)">{{shipForm.captain || ''}}</el-descriptions-item>
          <el-descriptions-item label="船宽(米)">{{shipForm.width || ''}}</el-descriptions-item>
          <el-descriptions-item label="载重(吨)">{{shipForm.netWeightTons || ''}}</el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">货物名称:</template>
            <el-form-item v-if="isEdit" prop="goodsName">
              <el-input v-model.trim="ruleForm.goodsName" maxlength="100" placeholder="请输入货物名称" />
            </el-form-item>
            <span v-else>{{ ruleForm.goodsName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />货物数量:</template>
            <el-form-item v-if="isEdit" prop="goodsNumber">
              <el-input-number
                v-model="ruleForm.goodsNumber"
                style="width: 100%;"
                :min="0"
                :max="999999999"
                :controls="false"
                placeholder="请输入货物数量"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.goodsNumber }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div class="icon-title">
          <span class="span" />人员信息
        </div>
        <el-descriptions
            class="descriptions"
            :column="2"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
          >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />人员总数:</template>
            <el-form-item v-if="isEdit" prop="persons">
              <el-input-number
                v-model="ruleForm.persons"
                style="width: 100%;"
                :min="0"
                :max="999999999"
                :controls="false"
                placeholder="请输入人员总数"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.persons }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />受伤人数:</template>
            <el-form-item v-if="isEdit" prop="injuredNumber">
              <el-input-number
                v-model="ruleForm.injuredNumber"
                style="width: 100%;"
                :min="0"
                :max="999999999"
                :controls="false"
                placeholder="请输入受伤人数"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.injuredNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />死亡人数:</template>
            <el-form-item v-if="isEdit" prop="deathNumber">
              <el-input-number
                v-model="ruleForm.deathNumber"
                style="width: 100%;"
                :min="0"
                :max="999999999"
                :controls="false"
                placeholder="请输入死亡人数"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.deathNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />失踪人数:</template>
            <el-form-item v-if="isEdit" prop="missingNumber">
              <el-input-number
                v-model="ruleForm.missingNumber"
                style="width: 100%;"
                :min="0"
                :max="999999999"
                :controls="false"
                placeholder="请输入失踪人数"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.missingNumber }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <div class="icon-title">
          <span class="span" />影响范围
        </div>
        <el-descriptions
            class="descriptions"
            :column="2"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
          >
          <el-descriptions-item>
            <template slot="label">危险区域名称:</template>
            <el-form-item v-if="isEdit" prop="dangerArea">
              <el-input v-model.trim="ruleForm.dangerArea" maxlength="100" placeholder="请输入危险区域名称" />
            </el-form-item>
            <span v-else>{{ ruleForm.dangerArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">最低安全范围:</template>
            <el-form-item v-if="isEdit" prop="safeRange">
              <el-input v-model.trim="ruleForm.safeRange" maxlength="100" placeholder="请输入最低安全范围" />
            </el-form-item>
            <span v-else>{{ ruleForm.safeRange }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">重点保护范围:</template>
            <el-form-item v-if="isEdit" prop="protectedArea">
              <el-input v-model.trim="ruleForm.protectedArea" maxlength="100" placeholder="请输入重点保护范围" />
            </el-form-item>
            <span v-else>{{ ruleForm.protectedArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">事故经过:</template>
            <el-form-item v-if="isEdit" prop="accidentAfter">
              <el-input
                v-model.trim="ruleForm.accidentAfter"
                type="textarea"
                rows="6"
                maxlength="200"
                show-word-limit
                placeholder="请输入事故经过"
              />
            </el-form-item>
            <span v-else>{{ ruleForm.accidentAfter }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <div class="icon-title">
          <span class="span" /><i v-if="isEdit" class="required" style="margin-right:10px;" /> 位置信息
        </div>
        <el-descriptions
            class="descriptions-one"
            :column="1"
            :colon="true"
            size="medium"
            labelClassName="ruleForm-title"
            contentClassName="ruleForm-text"
            border
          >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />详细地址:</template>
            <el-form-item v-if="isEdit" prop="address">
              <el-input v-model.trim="ruleForm.address" maxlength="100" placeholder="请输入详细地址" />
            </el-form-item>
            <span v-else>{{ ruleForm.address }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <Maptable
          ref="berthMap"
          :is-edit="isEdit"
          :isManual="false"
          :tool="['spot']"
          @change="confirmMap"
        />
      </el-form>
    </div>
    <!-- <MapPoint ref="map" :disabled="tabType === 'detail'" /> -->
    <div class="backstage-edit-btn">
      <el-button
        v-if="tabType !== 'detail'"
        type="primary"
        size="medium"
        style="width: 180px;"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        修改接警记录
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { telephone, interger } from '@/utils/validate'
import { getAllShips } from '@/api/water-transportation-services/information/enterprise-ship'
import MapPoint from '@/components/features/MapPoint'
import { disposalRecord } from '@/utils/public-fields'
import { queryDetail, updateById } from '@/api/emergency-services/disposal-record'
import { mapGetters } from 'vuex'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    MapPoint,
    Maptable
  },
  mixins: [disposalRecord],
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: [],
      ruleForm: {},
      shipForm: {},
      geographyInfos:[],
      loading:false,
      isEdit:true,
      currentPage: 1,
      pageSize: 20,
      total: 100,
      shipId:'',
      keyword:'',
      rules: {
        address:[
          { required: true, message: '请输入事故详细地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入事故名称', trigger: 'blur' }
        ],
        waters: [
          { required: true, message: '请输入所属水域', trigger: 'blur' }
        ],
        segment: [
          { required: true, message: '请输入所处航段', trigger: 'blur' }
        ],
        receivingTime: [
          { required: true, message: '请选择接警时间', trigger: 'blur' }
        ],
        alarmPeople: [
          { required: true, message: '请输入报警人', trigger: 'blur' }
        ],
        alarmCall: [
          { validator: telephone, trigger: 'blur' },
          { required: true, message: '请输入接警电话', trigger: 'blur' }
        ],
        occurrenceTime: [
          { required: true, message: '请选择事发时间', trigger: 'blur' }
        ],
        accidentType: [
          { required: true, message: '请选择事故类别', trigger: 'blur' }
        ],
        accidentLevel: [
          { required: true, message: '请选择事故等级', trigger: 'blur' }
        ],
        accidentDescribe: [
          { required: true, message: '请输入事故描述', trigger: 'blur' }
        ],
        persons: [
          { required: true, message: '请输入人员总数', trigger: 'blur' }
        ],
        injuredNumber: [
          { required: true, message: '请输入受伤人数', trigger: 'blur' }
        ],
        deathNumber: [
          { required: true, message: '请输入死亡人数', trigger: 'blur' }
        ],
        missingNumber: [
          { required: true, message: '请输入失踪人数', trigger: 'blur' }
        ],
        goodsNumber:[
          { required: true, message: '请输入货物数量', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    this.isEdit = this.tabType === 'add' ? true : false
    this.fetchDetail()
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 获取分类名称
    getAccidentTypeName(type){
      let name = ''
      for(let i=0;i<this.accidentType.length;i++){
        if(this.accidentType[i].value === type){
          name = this.accidentType[i].label
          return name
        }
      }
      return name
    },
    //获取船舶名称
    getShipName(id){
      let name = ''
      for(let i=0;i<this.options.length;i++){
        if(this.options[i].id === id){
          name = this.options[i].shipName
          return name
        }
      }
      return name
    },
    // 查询所有船舶信息
    async fetchShips(shipName) {
      getAllShips({
        shipId:shipName ? '' : this.shipId,
        isPage:true,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        shipName:shipName
      }).then(res => {
        if(res.data.records && res.data.records.length>0){
          this.options = res.data.records
          this.total = res.data.total
        }else{
          this.options = [
            {id:-1,shipName:'未查询到船舶信息',shipIdentifyNo:'',disabled:true}
          ]
        }
        this.handleChange(this.ruleForm.shipNumber)
      })
    },
    // 查询详情
    async fetchDetail() {
      queryDetail({ id: this.id }).then(res => {
        if (res) {
          this.ruleForm = {
            ...res.data
          }
          this.shipId = this.ruleForm.shipNumber
          this.fetchShips()
          this.geographyInfos = [
            {longitude:res.data.longitude,latitude:res.data.latitude}
          ]
          this.$nextTick(() => {
            this.$refs.berthMap.init(this.geographyInfos)
            this.$emit('setCenter', this.geographyInfos)
          })
        }
      })
    },
    // 数据过滤(模糊搜索与数据筛选)
    dataFilter(val) {
      this.currentPage = 1
      this.total = 0
      this.ruleForm.shipNumber = ''
      this.fetchShips(val)
    },
    shipPage(e){
      this.currentPage = e
      this.ruleForm.shipNumber = ''
      this.fetchShips(this.keyword)
    },
    // 下拉框改变
    handleChange(val) {
      this.shipId = val
      if (val) {
        const res = this.options.find(item => item.id === val)
        this.shipForm.shipType = res.shipType
        this.shipForm.registryPort = res.registryPort
        this.shipForm.captain = res.captain
        this.shipForm.width = res.width
        this.shipForm.netWeightTons = res.netWeightTons
      } else {
        this.shipForm = {
          shipType: '',
          registryPort: '',
          captain: '',
          width: '',
          netWeightTons: ''
        }
      }
    },
    // 提交
    submitForm(formName) {
      // 地图组件验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      if(this.geographyInfos.length===0){
        this.$message.error('请在地图上标记位置点')
        return false
      }
      this.loading = true
      // 拿取表单组件数据
      const dto = {
        ...this.ruleForm,
        longitude:this.geographyInfos[0].longitude,
        latitude:this.geographyInfos[0].latitude,
        enterpriseId: Number(this.user_info.orgid),
        enterpriseName: this.user_info.orgname,
        occurrenceTime: momentDate(this.ruleForm.occurrenceTime),
        receivingTime: momentDate(this.ruleForm.receivingTime),
        postStatus: 2, // 已发布
        persons: Number(this.ruleForm.persons),
        injuredNumber: Number(this.ruleForm.injuredNumber),
        deathNumber: Number(this.ruleForm.deathNumber),
        missingNumber: Number(this.ruleForm.missingNumber),
        state: 2 // 救援中
      }
      delete dto.updateTime
      const res = await updateById(dto)
      this.loading = false
      if (res.code === '0') {
        this.$message.success('接警记录修改完成!')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
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
    .descriptions-one{
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
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
