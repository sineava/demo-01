<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="160px"
      size="medium"
      class="table-column three"
      label-position="top"
      :disabled="!isEdit"
    >
      <el-form-item
        label="岸线规划名称:"
        prop="coastlineName"
      >
        <el-input v-model.trim="ruleForm.coastlineName" maxlength="100" placeholder="请输入岸线规划名称" />
      </el-form-item>
      <el-form-item
        label="所在区域:"
        prop="portAreaId"
      >
        <el-cascader
          v-model="ruleForm.portAreaId"
          :options="portAreaVoList"
          :props="{ expandTrigger: 'hover' }"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        label="岸线起迄点（千米）:"
        prop="coastLinePoint"
      >
        <el-input v-model.trim="ruleForm.coastLinePoint" placeholder="请输入岸线起迄点" maxlength="500" />
      </el-form-item>
      <el-form-item
        label="所在航道:"
        prop="channel"
      >
        <el-select
          v-model="ruleForm.channel"
          clearable
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option
            v-for="item in channel"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="岸别:"
        prop="type"
      >
        <el-select
          v-model="ruleForm.type"
          clearable
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option
            :value="1"
            label="左"
          />
          <el-option
            :value="2"
            label="右"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="规划港口岸线长度（米）合计:"
        prop="totalLength"
      >
        <el-input-number
          v-model="ruleForm.totalLength"
          :precision="2"
          :min="0"
          :max="99999999.99"
          style="width: 100%;"
          placeholder="请输入规划港口岸线长度（米）合计"
        />
      </el-form-item>
      <el-form-item
        label="规划港口岸线长度（米）已开发利用:"
        prop="usingLength"
      >
        <el-input-number
          v-model="ruleForm.usingLength"
          :precision="2"
          :min="0"
          :max="99999999.99"
          style="width: 100%;"
          placeholder="请输入规划港口岸线长度（米）已开发利用"
        />
      </el-form-item>
      <el-form-item
        label="规划港口岸线长度（米）规划利用:"
        prop="planningLength"
      >
        <el-input-number
          v-model="ruleForm.planningLength"
          :precision="2"
          :min="0"
          :max="99999999.99"
          style="width: 100%;"
          placeholder="请输入规划港口岸线长度（米）规划利用"
        />
      </el-form-item>
      <el-form-item
        label="利用状况:"
        prop="utilizationStatus"
      >
        <el-input v-model.trim="ruleForm.utilizationStatus" maxlength="100" placeholder="请输入利用状况" />
      </el-form-item>
      <el-form-item
        label="规划用途:"
        prop="planningPurposes"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.planningPurposes"
          type="textarea"
          rows="6"
          maxlength="200"
          placeholder="请输入规划用途"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remarks"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.remarks"
          type="textarea"
          rows="6"
          maxlength="200"
          placeholder="请输入备注"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
import { getPortArea, addLine, getDetail, updateCoastLine } from '@/api/port-services/coastline/coastline-planning'
export default {
  mixins: [shoreLine],
  data() {
    return {
      type: '',
      ruleForm: {},
      portAreaVoList: [],
      area:[],
      rules: {
        coastlineName: [
          { required: true, message: '请输入岸线规划名称', trigger: 'blur' }
        ],
        portAreaId: [
          { required: true, message: '请选择所在区域', trigger: 'blur' }
        ],
        coastLinePoint: [
          { required: true, message: '请输入岸线起迄点', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择所在航道', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择岸别', trigger: 'blur' }
        ],
        totalLength: [
          { required: true, message: '请输入规划港口岸线长度（米）合计', trigger: 'blur' }
        ],
        usingLength: [
          { required: true, message: '请输入规划港口岸线长度（米）已开发利用', trigger: 'blur' }
        ],
        planningLength: [
          { required: true, message: '请输入规划港口岸线长度（米）规划利用', trigger: 'blur' }
        ],
        utilizationStatus: [
          { required: true, message: '请输入利用状况', trigger: 'blur' }
        ],
        planningPurposes: [
          { required: true, message: '请输入规划用途', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  async created() {
    this.isEdit = this.$route.query.isEdit
    this.fetchPort()
    if (this.$route.query.id) {
      this.ruleForm = (await getDetail({ id: this.$route.query.id })).data
      this.$emit('initMap', this.ruleForm.coastalPlanningCoordinatesVoList)
      this.ruleForm.portAreaId = [this.ruleForm.portId,this.ruleForm.portAreaId]
      delete this.ruleForm.coastalPlanningCoordinatesVoList
    }
  },
  methods: {
    // 查询港区信息
    async fetchPort() {
      getPortArea().then(res => {
        if (res.data) {
          const voList = []
          res.data.forEach(element => {
            const items = []
            element.portAreaVoList.forEach(item=>{
              items.push({value:item.id,label:item.portAreaName})
            })
            if (items.length>0){
              voList.push({value:element.id,label:element.portName,children:items})
            }
          })
          this.portAreaVoList = voList
        }
      })
    },
    saveData(geographyInfos) {
      this.ruleForm.coastalPlanningCoordinatesDtoList = geographyInfos
      this.submitForm('ruleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.save()
      })
    },
    async save() {
      this.ruleForm.portId = this.ruleForm.portAreaId[0]
      this.ruleForm.portAreaId = this.ruleForm.portAreaId[1]
      const coastlinePlanningDto = {
        ...this.ruleForm,
        coastalPlanningCoordinatesDtoList: this.ruleForm.coastalPlanningCoordinatesDtoList.map((x, index) => ({
          latitude: x.latitude,
          longitude: x.longitude,
          pointer: index
        }))
      }
      const res = coastlinePlanningDto.id ? await updateCoastLine(coastlinePlanningDto) : await addLine(coastlinePlanningDto)
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form--label-top .el-form-item {
    padding: 10px 10px 10px 0;
}
</style>
