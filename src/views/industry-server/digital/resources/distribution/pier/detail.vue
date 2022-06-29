<template>
  <div class="base-ruleForm">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="160px"
      size="medium"
      class="table-column three"
      :disabled="!isEdit"
    >
      <el-form-item
        label-width="0"
        style="width: 100%;"
      >
        <div class="icon-title">
          <span class="span" />码头基本信息
        </div>
      </el-form-item>
      <el-form-item
        label="码头名称:"
        prop="wharfName"
      >
        <el-input v-model.trim="ruleForm.wharfName" maxlength="100" placeholder="请输入码头名称" />
      </el-form-item>
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
      <el-form-item
        label="投产年份:"
        prop="productionYear"
      >
        <el-date-picker
          v-model="ruleForm.productionYear"
          type="year"
          placeholder="投产年份"
          style="width: 100%;"
        />
      </el-form-item>
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
          placeholder="请输入岸线长度（米）"
          style="width: 100%;"
        />
      </el-form-item>
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
          placeholder="请输入设计靠泊能力（吨）"
          style="width: 100%;"
        />
      </el-form-item>
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
          placeholder="请输入通过能力（万吨）"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="利用状况:"
        prop="utilizationStatus"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.utilizationStatus"
          type="textarea"
          :rows="6"
          maxlength="200"
          show-word-limit
          placeholder="请输入利用状况"
        />
      </el-form-item>
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
          placeholder="请输入规划用途"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Handle } from '@/utils/handle-shore-line'
import { momentDate } from '@/utils/index'
import { shoreLine } from '@/utils/public-fields'
import { getArea, addWharf, updateWhatarf, getDetail } from '@/api/port-services/coastline/wharf'
export default {
  mixins: [shoreLine],
  data() {
    return {
      isEdit: false,
      ruleForm: {
        id: null,
        channel:''
      },
      portAreaVoList: [],
      rules: {
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
          { required: true, message: '通过能力（万吨）', trigger: 'blur' }
        ],
        channel:[
          { required: true, message: '请选择所在航道', trigger: 'change' }
        ]
      }
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    this.fetchPort()
    if (this.$route.query.id) {
      this.ruleForm = (await getDetail({ id: this.$route.query.id })).data
      this.$emit('initMap', this.ruleForm.wharfCoordinatesVoList)
      delete this.ruleForm.wharfCoordinatesVoList
    }
  },
  methods: {
    // 查询港区信息
    async fetchPort() {
      getArea().then(res => {
        if (res.data) {
          this.portAreaVoList = new Handle(res.data).sameProps
        }
      })
    },
    saveData(geographyInfos) {
      this.ruleForm.wharfCoordinatesDtoList = geographyInfos
      this.submitForm('ruleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.save()
      })
    },
    async save() {
      const wharfInfoDto = {
        ...this.ruleForm,
        coastlineId: this.ruleForm.coastlineId[this.ruleForm.coastlineId.length - 1],
        productionYear: Number(momentDate(this.ruleForm.productionYear, 'YYYY')),
        wharfCoordinatesDtoList: this.ruleForm.wharfCoordinatesDtoList.map(x => ({
          latitude: x.latitude,
          longitude: x.longitude,
          pointer: x.pointer
        }))
      }
      delete wharfInfoDto.coastlineName
      delete wharfInfoDto.berthListVoList
      delete wharfInfoDto.portId
      let res = this.ruleForm.id ? await updateWhatarf(wharfInfoDto) : await addWharf(wharfInfoDto)
      if (res.code === '0') {
        this.$emit('back')
      }
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

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
