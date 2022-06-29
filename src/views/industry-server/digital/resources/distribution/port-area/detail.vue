<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 港区信息
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="200px"
      :model="ruleForm"
      :rules="rules"
      :disabled="isEdit?false:true"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="港区名称:"
            class="top-form-item"
            prop="portAreaName"
          >
            <el-input v-model.trim="ruleForm.portAreaName" maxlength="100" placeholder="请输入港区名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所属港口:"
            class="top-form-item"
            prop="portId"
          >
            <el-select v-model="ruleForm.portId" style="width: 100%;" placeholder="请选择">
              <el-option
                v-for="item in portList"
                :key="item.id"
                :label="item.portName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="港界（边界坐标点）:"
            class="top-form-item"
            prop="portBoundary"
          >
            <el-input v-model.trim="ruleForm.portBoundary" maxlength="30" placeholder="请输入港界（边界坐标点）" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="合计面积（万平方米）:"
            class="top-form-item"
            prop="totalArea"
          >
            <el-input-number
              v-model="ruleForm.totalArea"
              :min="1"
              :max="9999999999"
              :precision="2"
              style="width: 100%;"
              placeholder="请输入合计面积（万平方米）"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="陆域面积（万平方米）:"
            class="top-form-item"
            prop="landArea"
          >
            <el-input-number
              v-model="ruleForm.landArea"
              :min="1"
              :max="9999999999"
              style="width: 100%;"
              :precision="2"
              placeholder="请输入陆域面积（万平方米）"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="水域面积（万平方米）:"
            class="top-form-item"
            prop="waterArea"
          >
            <el-input-number
              v-model="ruleForm.waterArea"
              :min="1"
              :max="9999999999"
              style="width: 100%;"
              :precision="2"
              placeholder="请输入水域面积（万平方米）"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="规划港口岸线（公里）:"
            class="top-form-item"
            prop="plannedShoreline"
          >
            <el-input-number
              v-model="ruleForm.plannedShoreline"
              :min="1"
              :max="9999999999"
              :precision="2"
              style="width: 100%;"
              placeholder="请输入规划港口岸线（公里）"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="港口生产已使用自然岸线长度（公里）:"
            class="top-form-item"
            prop="useShoreline"
          >
            <el-input-number
              v-model="ruleForm.useShoreline"
              :min="1"
              :max="9999999999"
              style="width: 100%;"
              :precision="2"
              placeholder="请输入规划港口岸线（公里）"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getInfo, getPortList, addData, updateData } from '@/api/data-management/overall-distribution/port-area'
export default {
  data() {
    return {
      isEdit: false,
      ruleForm: {
        id: '',
        portAreaName: '',
        portId: '',
        coordinatesInfos: []
      },
      portList: [],
      rules: {
        portAreaName: [
          { required: true, message: '请输入港区名称', trigger: 'blur' }
        ],
        portId: [
          { required: true, message: '请选择港口', trigger: 'change' }
        ]
      },
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    this.portList = (await getPortList({portName:''})).data
    if (this.$route.query.id) {
      this.ruleForm = (await getInfo(this.$route.query.id)).data
      this.$emit('initMap', this.ruleForm.coordinatesInfos)
    }
  },
  methods: {
    /**
     * 保存
     */
    saveData(geographyInfos) {
      geographyInfos.forEach(element => {
        element.latitude = element.latitude ? parseFloat(element.latitude) : null
        element.longitude = element.longitude ? parseFloat(element.longitude) : null
        element.pointer = element.sort
        delete element.sort
      })
      this.ruleForm.coordinatesInfos = geographyInfos
      this.submitForm('ruleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    async save() {
      let data = { ...this.ruleForm }
      delete data.portName
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.$emit('back')
      }
    }
  }
}
</script>
