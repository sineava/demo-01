<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑生产码头' : type === 'add' ? '新增生产码头' : '生产码头详情'" />
      </span>
      <span v-if="type!=='add'" class="detail-header-button">
        <el-button type="primary" size="small" @click="type = type==='detail' ? 'edit': 'detail'">{{ type==='detail' ? '编辑' : '取消编辑' }}</el-button>
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
        label-position="top"
        :disabled="type === 'detail'"
      >
        <el-row :gutter="20">
          <div class="icon-title">
            <span class="span" />码头基本信息
          </div>
          <el-col :span="12">
            <el-form-item
              label="码头名称:"
              prop="wharfName"
            >
              <el-input v-model.trim="ruleForm.wharfName" placeholder="请输入码头名称" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所在区域:"
              prop="coastlineId"
            >
              <el-cascader
                ref="cascader"
                v-model="ruleForm.coastlineId"
                :options="portAreaVoList"
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', disabled: 'disabled', checkStrictly: true }"
                clearable
                style="width: 100%;"
                placeholder="请选择所在区域"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在航道:" prop="channel">
              <el-select
                v-model="ruleForm.channel"
                clearable
                placeholder="请选择所在航道"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in channel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="投产年份:"
              prop="productionYear"
            >
              <el-date-picker
                v-model="ruleForm.productionYear"
                type="year"
                placeholder="请选择投产年份"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="岸线长度（米）:"
              prop="shorelineLength"
            >
              <el-input-number
                v-model="ruleForm.shorelineLength"
                :precision="2"
                :min="0"
                :max="99999999.99"
                :controls="false"
                style="width: 100%;"
                placeholder="请输入岸线长度（米）"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="设计靠泊能力（吨）:"
              prop="berthingCapacity"
            >
              <el-input-number
                v-model="ruleForm.berthingCapacity"
                :precision="2"
                :min="0"
                :max="99999999.99"
                :controls="false"
                style="width: 100%;"
                placeholder="请输入设计靠泊能力"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="通过能力（万吨）:"
              prop="carryingCapacity"
            >
              <el-input-number
                v-model="ruleForm.carryingCapacity"
                :precision="2"
                :min="0"
                :max="99999999.99"
                :controls="false"
                style="width: 100%;"
                placeholder="请输入通过能力"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="利用状况:"
              prop="utilizationStatus"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.utilizationStatus"
                placeholder="请输入利用状况"
                type="textarea"
                rows="6"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="规划用途:"
              prop="planningPurposes"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.planningPurposes"
                type="textarea"
                maxlength="200"
                rows="6"
                show-word-limit
                placeholder="请输入规划用途"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="添加矢量图形（请在地图上进行标注选择）:"
              style="width: 100%;"
            >
              <Maptable
                ref="berthMap"
                :is-edit="type==='detail' ? false : true"
                :is-table="true"
                @change="confirmMap"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
  </el-card>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
import { momentDate,getRouterButtonRole } from '@/utils/index'
import { getArea, addWharf, updateWhatarf, getDetail } from '@/api/port-services/coastline/wharf'
import { Handle } from '@/utils/handle-shore-line'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    // MapLine,
    Maptable
  },
  mixins: [shoreLine],
  data() {
    return {
      type: '',
      button_roles:{},
      ruleForm: {
        berthingCapacity: undefined,
        carryingCapacity: undefined,
        coastlineId: '',
        id: null,
        planningPurposes: '',
        productionYear: '',
        shorelineLength: undefined,
        utilizationStatus: '',
        wharfCoordinatesDtoList: [],
        wharfName: '',
        channel: ''
      },
      returnUrl:'',
      portAreaVoList: [],
      loading: false,
      rules: {
        channel:[
          { required: true, message: '请选择航道', trigger: 'change' }
        ],
        wharfName: [
          { required: true, message: '请输入码头名称', trigger: 'blur' }
        ],
        coastlineId: [
          { required: true, message: '请选择所在区域', trigger: 'blur' }
        ],
        productionYear: [
          { required: true, message: '请输入投产年份', trigger: 'blur' }
        ],
        shorelineLength: [
          { required: true, message: '请输入岸线长度（米）', trigger: 'blur' }
        ],
        berthingCapacity: [
          { required: true, message: '请输入设计靠泊能力（吨）', trigger: 'blur' }
        ],
        carryingCapacity: [
          { required: true, message: '请输入通过能力（万吨）', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created() {
    this.button_roles = getRouterButtonRole('/plan/deepwater',true)
    this.fetchPort()
    const { id, type, url } = this.$route.query
    this.type = type
    this.returnUrl = url ? decodeURIComponent(url) : ''
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    } else {
      this.$nextTick(() => {
        this.$refs.berthMap.init([])
      })
    }
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      if (val){
        val.map((item,index)=>{
          item.pointer = index+1
          return item
        })
      }
      this.geographyInfos = val
    },
    // 查询港区信息
    async fetchPort() {
      getArea().then(res => {
        if (res.data) {
          this.portAreaVoList = new Handle(res.data).sameProps
        }
      })
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          wharfCoordinatesDtoList: res.data.wharfCoordinatesVoList
        }
        this.tableData = [...this.ruleForm.wharfCoordinatesDtoList]
        delete this.ruleForm.wharfCoordinatesVoList

        this.geographyInfos = this.tableData || []
        this.$nextTick(() => {
          this.$refs.berthMap.init(this.geographyInfos)
        })
      })
    },
    // 提交
    handlePost() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      const coastlineId = this.ruleForm.coastlineId
      const wharfInfoDto = {
        ...this.ruleForm,
        coastlineId: typeof coastlineId === 'object' ? coastlineId[coastlineId.length - 1] : coastlineId,
        wharfCoordinatesDtoList: [...this.geographyInfos],
        productionYear: Number(momentDate(this.ruleForm.productionYear, 'YYYY'))
      }
      delete wharfInfoDto.coastlineName
      delete wharfInfoDto.berthListVoList
      delete wharfInfoDto.portId
      this.loading = true
      const res = this.ruleForm.id ? await updateWhatarf(wharfInfoDto) : await addWharf(wharfInfoDto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: this.returnUrl || '/plan/deepwater' })
    },
    /**
     * 经纬度转换(度转度分秒)
     * @direction lon || lat
     */
    transformDMS(degree, direction) {
      let D = plusZeroAtHead(Math.floor(degree))
      let M = plusZeroAtHead(Math.floor((degree - D) * 60))
      let S = plusZeroAtHead(Math.floor(((degree - D) * 60 - M) * 60))
      let result = D + '°' + M + '′' + S + '″'

      // 如果是个位数， 则在首位加 0
      function plusZeroAtHead(num) {
        if (num > -10 && num < 0) {
          num = '-0' + Math.abs(num)
        }
        if (num > 0 && num < 10) {
          return '0' + num
        }
        return num
      }

      if (direction === 'lng') {
        D > 0 ? result += 'E' : result += 'W'
        return result
      }
      if (direction === 'lat') {
        D > 0 ? result += 'N' : result += 'S'
        return result
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
    /deep/ .el-input__inner {
        text-align: left;
    }
}
</style>
