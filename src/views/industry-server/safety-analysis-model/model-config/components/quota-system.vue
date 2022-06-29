<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>
              <span>指标体系</span>
              <el-button
                type="primary"
                style="float: right; margin-top: 15px;"
                size="mini"
                @click="addQuota"
              >
                添加指标
              </el-button>
            </div>
          </div>
          <el-tree
            v-loading="loading"
            default-expand-all
            highlight-current
            :data="quotaList"
            :expand-on-click-node="false"
            :props="{
              children: 'indicators',
              label: 'indicatorName'
            }"
            @node-click="nodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ ruleForm.id && ruleForm.id>0 ? '编辑': '新增' }}指标信息</span>
            <el-button
              v-if="ruleForm.id && ruleForm.id>0"
              style="float: right; margin-top: 15px;"
              size="mini"
              type="danger"
              @click="handleDelete"
            >
              删除
            </el-button>
          </div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            size="medium"
          >
            <el-form-item label-width="0" style="width: 100%;">
              <div class="icon-title">
                <span class="span" />基本信息
              </div>
            </el-form-item>
            <el-form-item
              label="指标名称:"
              prop="indicatorName"
            >
              <el-input
                v-model="ruleForm.indicatorName"
                placeholder="请输入指标名称"
                maxlength="20"
                show-word-limit
              />
            </el-form-item>
            <el-form-item
              label="指标类型:"
              prop="indicatorType"
            >
              <el-radio-group v-model="ruleForm.indicatorType">
                <el-radio :label="1">指标层</el-radio>
                <el-radio :label="2">数据层</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="上级指标:"
              prop="pids"
            >
              <el-cascader
                v-model="ruleForm.pids"
                :options="copyQuotaList"
                :props="{ children: 'indicators', label: 'indicatorName', value: 'id', checkStrictly: true }"
                style="width: 100%;"
                placeholder="不选默认顶级"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="权重:"
              prop="weight"
            >
              <el-input-number
                v-model="ruleForm.weight"
                :min="0.01"
                placeholder="请输入权重"
                :max="1"
                :precision="2"
              />
            </el-form-item>
            <el-form-item
              label="指标顺序:"
              prop="sort"
            >
              <el-input-number
                v-model="ruleForm.sort"
                :min="1"
                :max="999999"
                placeholder="请输入指标顺序"
              />
            </el-form-item>
            <el-form-item
              label="相关描述:"
              prop="relativeDes"
            >
              <el-input
                v-model="ruleForm.relativeDes"
                type="textarea"
                placeholder="请输入相关描述"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-form>

          <!-- 数据采集 -->
          <el-form
            v-if="ruleForm.indicatorType === 2"
            ref="indicatorData"
            :model="indicatorData"
            :rules="type === 'detail' ? indicatorRule : {}"
            label-width="120px"
            size="medium"
          >
            <el-form-item label-width="0" style="width: 100%;">
              <div class="icon-title">
                <span class="span" />数据采集
              </div>
            </el-form-item>
            <el-form-item
              label="数据采集方式:"
              prop="dataCollectionMode"
            >
              <el-radio-group v-model="indicatorData.dataCollectionMode">
                <el-radio :label="1">接口获取</el-radio>
                <el-radio :label="2">手动输入</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="indicatorData.dataCollectionMode !== 2"
              label="接口地址:"
              prop="interfaceAddress"
            >
              <el-input v-model.trim="indicatorData.interfaceAddress" placeholder="请输入接口地址" />
            </el-form-item>
            <el-form-item
              label="采集频率:"
              prop="collectionFrequency"
            >
              <el-select
                v-model="indicatorData.collectionFrequency"
                clearable
                placeholder="请选择采集频率"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in frequencyList"
                  :key="item.text"
                  :label="item.text "
                  :value="item.text"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="计算取值:"
              prop="calculatedValue"
            >
              <el-input v-model.trim="indicatorData.calculatedValue" placeholder="请输入计算取值" />
            </el-form-item>
            <template v-if="indicatorData.dataCollectionMode !== 1">
              <el-form-item
                label="数据性质:"
                prop="dataNature"
              >
                <el-radio-group v-model="indicatorData.dataNature">
                  <el-radio :label="1">量化数据</el-radio>
                  <el-radio :label="2">质化数据</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-show="indicatorData.dataNature === 2"
                label="质化标签:"
              >
                <div class="tags-wrapper">
                  <el-tag
                    v-for="({tagName}, index) in tags"
                    :key="index"
                    type="success"
                    size="mini"
                    closable
                    @close="removeTag(index)"
                  >
                    {{ tagName }}
                  </el-tag>
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    class="el-icon-plus"
                    @click="addTag"
                  >
                    添加
                  </el-button>
                </div>
              </el-form-item>
              <!-- <el-form-item v-if="indicatorData.dataNature === 1" label-width="0" style="width:100%">
                <div class="icon-title">
                  <span class="span" />指标转化
                </div>
              </el-form-item>
              <el-form-item
                v-if="indicatorData.dataNature === 1"
                class="dataNature"
                label="量化指标转换比例（评估值/数据值）:"
                prop="conversionRatio"
              >
                <el-input-number
                  v-model="indicatorData.conversionRatio"
                  :precision="2"
                  :min="0"
                  :max="100000"
                  style="width:50%;"
                  placeholder="请输入量化指标转换比例（评估值/数据值）"
                />
              </el-form-item> -->
              <el-form-item
                v-if="indicatorData.dataNature === 2"
                label="质化数据风险值："
                prop="tags"
                class="dataNature"
              >
                <el-table
                  border
                  :data="tags"
                  :header-cell-style="{textAlign:'center', backgroundColor: '#F2F2F2'}"
                  :cell-style="{textAlign:'center'}"
                >
                  <el-table-column
                    label="序号"
                    width="65"
                  >
                    <template v-slot="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="质化标签"
                    prop="tagName"
                  />
                  <el-table-column label="风险值">
                    <template v-slot="scope">
                      <el-input-number
                        v-model="tags[scope.$index].riskValue"
                        controls-position="right"
                        :min="0"
                        :max="999999"
                        :precision="2"
                        placeholder="请输入风险值"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </template>

            <el-form-item v-if="ruleForm.indicatorType === 2" label-width="0" style="width: 100%;">
              <div class="icon-title">
                <span class="span" />计算逻辑
              </div>
            </el-form-item>
            <RiskConfig v-if="ruleForm.indicatorType === 2" ref="riskConfig" :thresholds="thresholds" />
            <RiskFunction
              v-if="ruleForm.indicatorType === 2 && modules!==1"
              ref="riskFunction"
              :algorithms="algorithms"
              :isFunction="true"
              :modules="modules"
            />
          </el-form>

          <div class="backstage-edit-btn">
            <el-button
              type="primary"
              size="medium"
              @click="submitForm"
            >
              保存
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="添加标签"
      width="500px"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="tagForm"
        :model="tagForm"
        :rules="tagRules"
        label-width="100px"
        size="medium"
      >
        <el-form-item
          label="质化标签:"
          prop="tag"
        >
          <el-input
            v-model.trim="tagForm.tag"
            maxlength="30"
            show-word-limit
            placeholder="请输入质化标签"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addData, getData, deleteData, updateData, getFrequencyList } from '@/api/analysis-model/indicator'
import RiskConfig from './risk-config'
import RiskFunction from './risk-function'
export default {
  components: {
    RiskConfig,
    RiskFunction
  },
  inject: ['configType'],
  props: {
    modules:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      loading: false,
      current: 1,
      show: false, // 控制信息页visible
      type: '', // 用于标识当前操作类型,新增/详情/编辑/删除
      ruleForm:{
        id: null,
        pids:[],
        indicatorName: '',
        indicatorType: undefined,
        relativeDes: '',
        sort: undefined,
        superiorIndicatorId: undefined, // 默认顶级
        weight: undefined
      },
      thresholds:[],
      algorithms:[],
      tagForm: {
        tag: ''
      },
      tags: [],
      indicatorData: {
        dataNature:1,
        dataCollectionMode:1,
      },
      rules: {
        indicatorName: [
          { required: true, message: '请输入指标名称', trigger: 'blur' }
        ],
        indicatorType: [
          { required: true, message: '请选择指标类型', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入权重', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入指标顺序', trigger: 'blur' }
        ]
      },
      indicatorRule: {
        dataCollectionMode: [
          { required: true, message: '请选择数据采集方式', trigger: 'change' }
        ]
      },
      tagRules: {
        tag: [
          { required: true, trigger: 'blur', message: '请输入质化标签' }
        ]
      },
      dialogVisible: false,
      quotaList: [],
      copyQuotaList: []
    }
  },
  created() {
    this.loading = true
    this.getQuota()
    this.getFrequency()
  },
  methods: {
    // 查询指标体系
    async getQuota() {
      const data = (await getList(this.configType)).data || []
      this.quotaList = data
      this.wrapperCascader(this.quotaList.length ? JSON.parse(JSON.stringify(this.quotaList)) : [])
      this.loading = false
    },
    // 查询采集频率列表
    async getFrequency() {
      this.frequencyList = (await getFrequencyList()).data
    },
    // 包装级联选择器(设置childen为undefined,禁用子数据...)
    wrapperCascader(data) {
      if (!data || data.length>0){
        this.copyQuotaList = []
      }
      let pid = []
      const reqData = []
      data.forEach(item=>{
        let disabled = item.id === this.ruleForm.id || false
        if (item.id===this.ruleForm.superiorIndicatorId){
          pid = [item.id]
        }
        const items = []
        if (item.indicators && item.indicators.length>0){
          item.indicators.forEach(val=>{
            if (val.id===this.ruleForm.superiorIndicatorId){
              pid = [item.id,val.id]
            }
            const disableds = disabled ? disabled : (val.id===this.ruleForm.id || false)
            items.push({id:val.id,indicatorName:val.indicatorName,indicatorType:val.indicatorType,disabled: val.indicatorType ===2 ? true : disableds})
          })
        }
        if (items.length>0){
          reqData.push({id:item.id,indicatorName:item.indicatorName,indicatorType:item.indicatorType,disabled:item.indicatorType===2 ? true : disabled,indicators:items})
        } else {
          reqData.push({id:item.id,indicatorName:item.indicatorName,indicatorType:item.indicatorType,disabled:item.indicatorType===2 ? true : disabled})
        }
      })
      this.ruleForm.pids = pid
      this.copyQuotaList = reqData
    },
    /**
     * 添加指标
     */
    addQuota(){
      this.type = 'add'
      this.ruleForm = {
        id: '',
        indicatorName: '',
        pids: [],
        indicatorType: undefined,
        relativeDes: '',
        sort: undefined,
        superiorIndicatorId: undefined, // 默认顶级
        weight: undefined
      }
      this.thresholds = []
      this.algorithms = []
      this.indicatorData = {
        dataNature:1,
        dataCollectionMode:1,
      }
      this.wrapperCascader(this.quotaList.length ? JSON.parse(JSON.stringify(this.quotaList)) : [])
    },
    // 显示质化标签弹框
    addTag() {
      this.dialogVisible = true
      this.tagForm.tag = ''
    },
    // 保存标签
    saveTag() {
      this.$refs.tagForm.validate(valid => {
        if (!valid) return false
        const tag = this.tagForm.tag
        if (this.tags.some(x => x.tagName === tag)) {
          this.$message.warning('质化标签已存在')
          return
        }
        this.tags.push({ riskValue: undefined, tagName: this.tagForm.tag, id: null })
        this.dialogVisible = false
      })
    },
    // 移除标签
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    change(num) {
      this.current = num
    },
    submitForm() {
      const arr = this.ruleForm.indicatorType === 1 ? ['ruleForm'] : ['ruleForm', 'indicatorData']
      const formList = []
      arr.forEach(x => {
        formList.push(new Promise(resolve => {
          this.$refs[x].validate(valid => {
            if (!valid) return false
            resolve()
          })
        }))
      })
      Promise.all(formList).then(_ => {
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      this.ruleForm.superiorIndicatorId = this.ruleForm.pids
      delete this.ruleForm.pids
      let superiorIndicatorId = this.ruleForm.superiorIndicatorId
      const indicatorInfoDto = {
        ...this.ruleForm,
        type: this.configType,
        superiorIndicatorId: superiorIndicatorId ? superiorIndicatorId[superiorIndicatorId.length - 1] : 0,
        indicatorDataInfo: {
          ...this.indicatorData,
          tags: [...this.tags]
        }
      }
      if (this.ruleForm.indicatorType === 2){
        indicatorInfoDto.indicatorDataInfo.thresholds = this.$refs.riskConfig.getThresholds()
        if (this.modules!==1){
          indicatorInfoDto.indicatorDataInfo.algorithms = this.$refs.riskFunction.getAlgorithms()
        }
      } else {
        indicatorInfoDto.indicatorDataInfo.thresholds = []
        indicatorInfoDto.indicatorDataInfo.algorithms = []
      }
      let res
      if (indicatorInfoDto.id){
        res = await updateData(indicatorInfoDto)
      } else {
        res = await addData(indicatorInfoDto)
      }
      if (res.code === '0') {
        this.$message.success('保存成功!')
        this.getQuota()
        this.addQuota()
      }
    },
    nodeClick({ id }) {
      this.type = 'detail'
      getData(id).then(res => {
        if (res.code === '0') {
          this.show = true
          this.ruleForm = {
            ...res.data,
            superiorIndicatorId: res.data.superiorIndicatorId
          }
          const indicatorData = res.data.indicatorData || {}
          this.indicatorData = indicatorData
          this.tags = indicatorData.tags || []
          this.wrapperCascader(this.quotaList.length ? JSON.parse(JSON.stringify(this.quotaList)) : [])
          this.thresholds = this.indicatorData.thresholds
          this.algorithms = this.indicatorData.algorithms
        }
      })
    },
    handleStatus() {
      this.type = this.type === 'edit' ? 'detail' : 'edit'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData(this.ruleForm.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.show = false
            this.getQuota()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__content {
    padding: 20px 0;
}

/deep/ .el-tag.el-tag--success {
    display: inline-block;
    margin-right: 10px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
}

.dataNature {
    /deep/ .el-form-item__label {
        width: 100% !important;
        text-align: left;
    }

    /deep/ .el-form-item__content {
        margin-left: 0 !important;
        width: 100%;
    }
}
</style>
