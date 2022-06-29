<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'add' ? '新增船舶过闸' : type === 'edit' ? '编辑船舶过闸' : '船舶过闸详情' }}</span>
    </div>
    <div
      v-if="tabType === 'edit'"
      class="basic-detail"
    >
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="过闸编队号:"
          prop="fleetNumber"
        >
          <el-input
            v-model.trim="ruleForm.fleetNumber"
            maxlength="100"
            placeholder="请输入过闸编队号"
          />
        </el-form-item>
        <el-form-item
          label="实际过坝时间:"
          prop="occurrenceTime"
        >
          <el-date-picker
            v-model="ruleForm.occurrenceTime"
            type="datetime"
            style="width: 100%;"
            placeholder="请选择实际过坝时间"
          />
        </el-form-item>
        <el-form-item
          label="运行时长:"
          prop="duration"
        >
          <el-input-number
            v-model="ruleForm.duration"
            :min="0"
            :max="99999"
            :controls="false"
            style="width: 100%;"
            placeholder="请输入运行时长"
          />
        </el-form-item>
        <el-form-item
          label="枢纽大坝:"
          prop="damId"
        >
          <el-select
            v-model="ruleForm.damId"
            clearable
            placeholder="请选择枢纽大坝"
            style="width: 100%;"
          >
            <el-option
              v-for="item in dams"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="icon-title">
        <span class="span" /><i class="required" /> 船舶基本信息
        <el-button
          v-if="type !== 'detail'"
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          style="margin-left: 20px;"
          @click="addShip"
        >
          添加过闸船舶
        </el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="shipInfoDtoList"
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
          width="65"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="船舶名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="船舶唯一编号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.shipNumber }}
          </template>
        </el-table-column>
        <el-table-column label="船舶联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.shipPhone }}
          </template>
        </el-table-column>
        <el-table-column label="船舶分类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.lockTypeName }}
          </template>
        </el-table-column>
        <el-table-column label="船舶核载吨" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.nuclearLoadTons }}
          </template>
        </el-table-column>
        <el-table-column label="船舶实载吨位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.realLoadTons }}
          </template>
        </el-table-column>
        <el-table-column label="始发港" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.startPortName }}
          </template>
        </el-table-column>
        <el-table-column label="目的港" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.endPortName }}
          </template>
        </el-table-column>
        <el-table-column label="申报方式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.declareMeans }}
          </template>
        </el-table-column>
        <el-table-column label="申报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.informant }}
          </template>
        </el-table-column>
        <el-table-column label="申报人联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.informantPhone }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="210"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit('detail', scope.row, scope.$index)"
            >
              详情
            </el-button>
            <el-button
              v-if="type !== 'detail'"
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row, scope.$index)"
            >
              编辑
            </el-button>
            <el-button
              v-if="type !== 'detail'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="backstage-edit-btn">
        <el-button
          v-if="type !== 'detail'"
          :loading="saveLoading"
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
    <ship
      v-if="tabType === 'ship'"
      ref="ship"
      :goods="goods"
      @switchTabType="switchTabType"
      @change="change"
    />
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import ship from './ship'
import { selectLike } from '@/api/channel-services/ship/dam'
import { saveInfo, updateInfo, getMachineDetail } from '@/api/channel-services/ship/lock-info'
import { getGoodsList } from '@/api/channel-services/ship/goods'
export default {
  components: {
    ship
  },
  data() {
    return {
      goods: [],
      loading: false,
      saveLoading: false,
      tabType: 'edit', // edit:编辑页,ship:船舶过闸页
      ruleForm: {
        damId: '',
        damName: '',
        duration: undefined,
        fleetNumber: '',
        id: null,
        occurrenceTime: ''
      },
      dams: [],
      shipInfoDtoList: [],
      rules: {
        fleetNumber: [
          { required: true, message: '请输入过闸编队号', trigger: 'blur' }
        ],
        occurrenceTime: [
          { required: true, message: '请选择实际过坝时间', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请选择运行时长', trigger: 'blur' }
        ],
        damId: [
          { required: true, message: '请选择枢纽大坝', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 查询货物信息
    this.fetchGoods()
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
    this.getDamList()
  },
  methods: {
    // 查询货物分类信息
    async fetchGoods() {
      this.goods = (await getGoodsList()).data || []
    },
    // 查询详情
    async fetchDetail(id) {
      this.loading = true
      getMachineDetail({ id }).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.ruleForm = {
            ...res.data.lockAgeInfoVo
          }
          this.shipInfoDtoList = [
            ...res.data.lockShipInfoVoList.map(x => {
              const obj = {
                ...x,
                goodsInfoDtoList: x.lockGoodsInfoVos
              }
              delete obj.lockGoodsInfoVos
              delete obj.lockId
              return obj
            })
          ]
        }
      })
    },
    // 查询大坝信息
    async getDamList(val = '') {
      selectLike({ name: val }).then(res => {
        this.dams = res.data ? res.data : []
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.shipInfoDtoList.length===0){
            this.$message.error('请添加过闸船舶')
            return
          }
          this.saveData()
        } else {
          return false
        }
      })
    },
    getDamName(id){
      let name = ''
      if (this.dams && this.dams.length>0){
        this.dams.forEach(item=>{
          if (item.id===id){
            name = item.name
            return false
          }
        })
      }
      return name
    },
    // 保存
    async saveData() {
      const dto = {
        lockInfoDto: {
          ...this.ruleForm,
          damName: this.getDamName(this.ruleForm.damId),
          occurrenceTime: momentDate(this.ruleForm.occurrenceTime)
        },
        shipInfoDtoList: [...this.shipInfoDtoList].map(x => ({
          ...x,
          goodsInfoDtoList: x.goodsInfoDtoList.map(y => ({
            goodsId: y.goodsId,
            goodsNumber: y.goodsNumber,
            id: y.id,
            remark: y.remark,
            shipGoodsName: y.shipGoodsName
          }))
        }))
      }
      delete dto.lockInfoDto.updateBy
      delete dto.lockInfoDto.updateTime
      this.saveLoading = true
      const res = dto.lockInfoDto.id ? await updateInfo(dto) : await saveInfo(dto)
      this.saveLoading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/ship/pass' })
    },
    // 表格操作
    handleEdit(type, item, index) {
      this.tabType = 'ship'
      this.$nextTick(() => {
        this.$refs.ship.updateData(type, item, index)
      })
    },
    // 删除数据
    handleDelete(index) {
      this.shipInfoDtoList.splice(index, 1)
    },
    // 添加表格数据
    addTable(info) {
      this.shipInfoDtoList.push(info)
    },
    // 切换列表
    switchTabType(val) {
      this.tabType = val
    },
    // 子组件推数据
    change({ shipInfo, type, index }) {
      if (type === 'add') this.shipInfoDtoList.push(shipInfo)
      if (type === 'edit') this.shipInfoDtoList[index] = shipInfo
      this.tabType = 'edit'
    },
    addShip() {
      this.tabType = 'ship'
    }
  }
}
</script>

<style lang="scss" scoped>
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
