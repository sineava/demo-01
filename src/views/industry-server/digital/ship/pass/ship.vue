<template>
  <div class="basic-detail">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      size="medium"
      class="table-column three"
      :disabled="type === 'detail'"
    >
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" />船舶基本信息
        </div>
      </el-form-item>
      <el-form-item
        label="船舶名称:"
        prop="name"
      >
        <el-input
          v-model.trim="ruleForm.name"
          maxlength="100"
          placeholder="请输入船舶名称"
        />
      </el-form-item>
      <el-form-item
        label="船舶唯一编号:"
        prop="shipNumber"
      >
        <el-input
          v-model.trim="ruleForm.shipNumber"
          maxlength="100"
          placeholder="请输入船舶唯一编号"
        />
      </el-form-item>
      <el-form-item
        label="船舶联系电话:"
        prop="shipPhone"
      >
        <el-input v-model.trim="ruleForm.shipPhone" placeholder="请输入船舶联系电话" />
      </el-form-item>
      <el-form-item
        label="船舶分类:"
        prop="lockTypeId"
      >
        <el-select
          v-model="ruleForm.lockTypeId"
          clearable
          placeholder="请选择船舶分类"
          style="width: 100%;"
        >
          <el-option
            v-for="item in ships"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="船舶核载吨:"
        prop="nuclearLoadTons"
      >
        <el-input-number
          v-model="ruleForm.nuclearLoadTons"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入船舶核载吨"
        />
      </el-form-item>
      <el-form-item
        label="船舶实载吨:"
        prop="realLoadTons"
      >
        <el-input-number
          v-model="ruleForm.realLoadTons"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入船舶实载吨"
        />
      </el-form-item>
      <el-form-item
        label="始发港:"
        prop="startPortId"
      >
        <el-select
          v-model="ruleForm.startPortId"
          clearable
          placeholder="请选择始发港"
          style="width: 100%;"
          @change="handleChange('start')"
        >
          <el-option
            v-for="item in startOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="目的港:"
        prop="endPortId"
      >
        <el-select
          v-model="ruleForm.endPortId"
          clearable
          placeholder="请选择目的港"
          style="width: 100%;"
          @change="handleChange('end')"
        >
          <el-option
            v-for="item in endOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="申报方式:"
        prop="declareMeans"
      >
        <el-input
          v-model.trim="ruleForm.declareMeans"
          maxlength="50"
          placeholder="请输入申报方式"
        />
      </el-form-item>
      <el-form-item
        label="申报人:"
        prop="informant"
      >
        <el-input
          v-model.trim="ruleForm.informant"
          maxlength="50"
          placeholder="请输入申报人"
        />
      </el-form-item>
      <el-form-item
        label="申报人联系电话:"
        prop="informantPhone"
      >
        <el-input v-model.trim="ruleForm.informantPhone" maxlength="15" placeholder="请输入申报人联系电话" />
      </el-form-item>
      <el-form-item
        label="过坝长度(米):"
        prop="damLength"
      >
        <el-input-number
          v-model="ruleForm.damLength"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          placeholder="请输入过坝长度(米)"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="过坝宽度(米):"
        prop="damWidth"
      >
        <el-input-number
          v-model="ruleForm.damWidth"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝宽度(米)"
        />
      </el-form-item>
      <el-form-item
        label="过坝吃水(米):"
        prop="absorbWater"
      >
        <el-input-number
          v-model="ruleForm.absorbWater"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝吃水(米)"
        />
      </el-form-item>
      <el-form-item
        label="过坝净空高(米):"
        prop="shipTall"
      >
        <el-input-number
          v-model="ruleForm.shipTall"
          :precision="2"
          :min="0"
          :max="999999999"
          :controls="false"
          placeholder="请输入过坝净空高(米)"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="期望过坝时间:"
        prop="expectedTime"
      >
        <el-date-picker
          v-model="ruleForm.expectedTime"
          type="datetime"
          style="width: 100%;"
          placeholder="请选择期望过坝时间"
        />
      </el-form-item>
      <el-form-item
        label="过坝实载客量:"
        prop="realCapacity"
      >
        <el-input-number
          v-model="ruleForm.realCapacity"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝实载客量"
        />
      </el-form-item>
      <el-form-item
        label="过坝实载车量:"
        prop="realVehicleLoads"
      >
        <el-input-number
          v-model="ruleForm.realVehicleLoads"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝实载车量"
        />
      </el-form-item>
      <el-form-item
        label="过坝重箱数量:"
        prop="containerNumber"
      >
        <el-input-number
          v-model="ruleForm.containerNumber"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝重箱数量"
        />
      </el-form-item>
      <el-form-item
        label="过坝空箱数量:"
        prop="emptyNumber"
      >
        <el-input-number
          v-model="ruleForm.emptyNumber"
          :min="0"
          :max="999999999"
          :controls="false"
          style="width: 100%;"
          placeholder="请输入过坝空箱数量"
        />
      </el-form-item>
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" /><i class="required" /> 船舶运载货物
        </div>
      </el-form-item>
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <el-table
          v-loading="loading"
          :data="list"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          element-loading-text="Loading"
          stripe
          fit
          highlight-current-row
          class="table-border"
        >
          <el-table-column
            label="编号"
            width="55"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="货物分类" min-width="100" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span v-if="type === 'detail'">
                {{ scope.row.name }}
              </span>
              <el-select
                v-else
                v-model="list[scope.$index].goodsId"
                placeholder="请选择货物分类"
                @change="selectChange(scope.$index)"
              >
                <el-option
                  v-for="item in goods"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="货物名称" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span v-if="type === 'detail'">{{ scope.row.shipGoodsName }}</span>
              <el-input
                v-else
                v-model="list[scope.$index].shipGoodsName"
                maxlength="50"
              />
            </template>
          </el-table-column>
          <el-table-column label="计量单位" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.unit }}
            </template>
          </el-table-column>
          <el-table-column label="是否易燃易爆" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span v-if="scope.row.isInflammableExplosive === 1">是</span>
              <span v-if="scope.row.isInflammableExplosive === 0">否</span>
            </template>
          </el-table-column>
          <el-table-column label="货物国内编号" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.domesticCode }}
            </template>
          </el-table-column>
          <el-table-column label="父类货种编码" :show-overflow-tooltip="true">
            <template v-slot="scope">
              {{ scope.row.parentDomesticCode }}
            </template>
          </el-table-column>
          <el-table-column label="货物数量" width="200" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span v-if="type === 'detail'">{{ scope.row.goodsNumber }}</span>
              <el-input-number
                v-else
                v-model="list[scope.$index].goodsNumber"
                controls-position="right"
                :min="0"
                :max="99999999"
                style="width: 100%;"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            width="400"
            :show-overflow-tooltip="true"
          >
            <template v-slot="scope">
              <span v-if="type === 'detail'">{{ scope.row.remark }}</span>
              <el-input
                v-else
                v-model="list[scope.$index].remark"
                maxlength="200"
                show-word-limit
                style="width: 100%;"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="type !== 'detail'"
            label="操作"
          >
            <template v-slot="scope">
              <el-button
                size="mini"
                type="danger"
                @click="removeBtn(scope.$index)"
              >
                <em class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="type !== 'detail'" class="add-agency">
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            @click="addBtn"
          >
            新增船舶运载货物
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
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
</template>

<script>
import { selectLikeShipCategory } from '@/api/channel-services/ship/ship-type'
import { getPortList } from '@/api/channel-services/ship/port'
import { selectLike } from '@/api/channel-services/ship/goods'
import { momentDate } from '@/utils/index'
import { telephone } from '@/utils/validate'
export default {
  props: {
    goods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: 'add',
      list: [],
      ruleForm: {
        absorbWater: undefined,
        containerNumber: undefined,
        damLength: undefined,
        damWidth: undefined,
        declareMeans: '',
        emptyNumber: undefined,
        endPortId: undefined,
        expectedTime: '',
        id: null,
        informant: '',
        informantPhone: '',
        lockTypeId: undefined,
        name: '',
        nuclearLoadTons: undefined,
        realCapacity: undefined,
        realLoadTons: undefined,
        realVehicleLoads: undefined,
        shipNumber: '',
        shipPhone: '',
        shipTall: undefined,
        startPortId: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入船舶名称名称', trigger: 'blur' }
        ],
        shipNumber: [
          { required: true, message: '请输入船舶唯一编号', trigger: 'blur' }
        ],
        shipPhone: [
          { required: true, message: '请输入船舶联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        domesticCode: [
          { required: true, message: '请输入货物国内编号', trigger: 'blur' }
        ],
        nuclearLoadTons: [
          { required: true, message: '请输入船舶核载吨', trigger: 'blur' }
        ],
        startPortId: [
          { required: true, message: '请选择始发港', trigger: 'blur' }
        ],
        endPortId: [
          { required: true, message: '请选择目的港', trigger: 'blur' }
        ],
        declareMeans: [
          { required: true, message: '请输入申报方式', trigger: 'blur' }
        ],
        informant: [
          { required: true, message: '请输入申报人', trigger: 'blur' }
        ],
        informantPhone: [
          { required: true, message: '请输入申报人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        damLength: [
          { required: true, message: '请输入过坝长度(米)', trigger: 'blur' }
        ],
        damWidth: [
          { required: true, message: '请输入过坝宽度(米)', trigger: 'blur' }
        ],
        absorbWater: [
          { required: true, message: '请输入过坝吃水(米)', trigger: 'blur' }
        ],
        shipTall: [
          { required: true, message: '请输入过坝净空高(米)', trigger: 'blur' }
        ],
        expectedTime: [
          { required: true, message: '请输入期望过坝时间', trigger: 'blur' }
        ],
        lockTypeId: [
          { required: true, message: '请选择船舶分类', trigger: 'blur' }
        ],
        realLoadTons: [
          { required: true, message: '请输入船舶实载吨', trigger: 'blur' }
        ]
      },
      loading: false,
      index: null,
      options: [], // 用于恢复option
      startOptions: [],
      endOptions: [],
      ships: []
    }
  },
  created() {
    this.fetchPorts()
    this.fetchShipCatrgory()
  },
  methods: {
    // 查询船舶分类
    async fetchShipCatrgory() {
      selectLikeShipCategory().then(res => {
        this.ships = res.data || []
      })
    },
    // 查询上下行港口
    async fetchPorts() {
      getPortList().then(res => {
        this.options = res.data || []
        this.startOptions = [...this.options]
        this.endOptions = [...this.options]
      })
    },
    // 查询货物信息
    async fetchGoods(val = '') {
      this.loading = true
      const res = await selectLike({ name: val })
      this.list = res.data ? res.data.map(x => ({
        ...x,
        shipGoodsName: '',
        goodsNumber: 0,
        remark: '',
        goodsId: x.id,
        id: null
      })) : []
      this.loading = false
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.list.length===0){
            this.$message.error('请添加船舶运载货物')
            return
          }
          const goodsId = this.list.map(x => x.goodsId)
          if (goodsId.length !== new Set(goodsId).size) {
            this.$message.error('货物分类重复')
            return
          }
          if (goodsId.includes(null)) {
            this.$message.error('请选择货物分类')
            return
          }
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存
    async saveData() {
      const shipInfo = {
        ...this.ruleForm,
        lockTypeName: this.ships.find(x => x.id === this.ruleForm.lockTypeId).name,
        startPortName: this.options.find(x => x.id === this.ruleForm.startPortId).name,
        endPortName: this.options.find(x => x.id === this.ruleForm.endPortId).name,
        expectedTime: momentDate(this.ruleForm.expectedTime),
        goodsInfoDtoList: this.list
      }
      this.$emit('change', { shipInfo, type: this.type, index: this.index })
    },
    // 返回
    returnBack() {
      this.$emit('switchTabType', 'edit')
    },
    // 变更表单数据(父->子)
    updateData(type, item, index) {
      const { goodsInfoDtoList, ...ruleForm } = item
      this.type = type
      this.ruleForm = { ...ruleForm }
      this.list = [...goodsInfoDtoList]
      this.index = index
    },
    handleChange(val) {
      const { startPortId, endPortId } = this.ruleForm
      if (val === 'start' && startPortId) {
        const upsideType = this.options.find(x => x.id === startPortId).upsideType
        this.endOptions = this.options.filter(x => x.downsideType !== upsideType)
      }
      if (val === 'end' && endPortId) {
        const downsideType = this.options.find(x => x.id === endPortId).downsideType
        this.startOptions = this.options.filter(x => x.upsideType !== downsideType)
      }
      if (!startPortId && !endPortId) {
        this.startOptions = [...this.options]
        this.endOptions = [...this.options]
      }
    },
    // 添加分类
    addBtn() {
      this.list.push({
        domesticCode: '',
        goodsId: null,
        goodsNumber: undefined,
        id: null,
        isInflammableExplosive: undefined,
        lockShipId: '',
        name: '',
        parentDomesticCode: '',
        remark: '',
        shipGoodsName: '',
        unit: ''
      })
    },
    // 移除分类
    removeBtn(index) {
      this.list.splice(index, 1)
    },
    selectChange(index) {
      const item = this.goods.find(x => x.id === this.list[index].goodsId)
      if (item.id) { // 选择下拉
        this.$set(this.list, index, {
          ...item,
          goodsId: item.id,
          id: null
        })
      } else {
        this.$set(this.list, index, {
          domesticCode: '',
          goodsId: null,
          goodsNumber: undefined,
          id: null,
          isInflammableExplosive: undefined,
          lockShipId: '',
          name: '',
          parentDomesticCode: '',
          remark: '',
          shipGoodsName: '',
          unit: ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-agency {
    display: flex;
    margin-top: 20px;
    border: 1px dashed #e4e4e4;
    padding: 10px;
    justify-content: center;
    align-items: center;
}

.basic-detail {
    /deep/ .el-input-number .el-input__inner {
        text-align: left;
    }

    .required::after {
        margin-right: 10px;
        color: rgb(255, 0, 0);
        content: "* ";
    }
}
</style>
