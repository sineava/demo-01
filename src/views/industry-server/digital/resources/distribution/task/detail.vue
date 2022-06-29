<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 作业区信息
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      label-width="200px"
      :model="ruleForm"
      :rules="rules"
      :disabled="isEdit?false:true"
    >
      <el-form-item
        label="作业区名称:"
        class="top-form-item"
        prop="name"
      >
        <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入作业区名称" />
      </el-form-item>
      <el-form-item
        label="所属港口:"
        class="top-form-item"
        prop="portId"
      >
        <el-select
          v-model="ruleForm.portId"
          style="width: 100%;"
          placeholder="请选择"
          @change="getPortArea"
        >
          <el-option
            v-for="item in portList"
            :key="item.id"
            :label="item.portName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属港区:"
        class="top-form-item"
        prop="portAreaId"
      >
        <el-select v-model="ruleForm.portAreaId" style="width: 100%;" placeholder="请选择">
          <el-option
            v-for="item in portAreaList"
            :key="item.id"
            :label="item.portAreaName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="概述:"
        class="top-form-item"
        prop="summary"
      >
        <el-input
          v-model="ruleForm.summary"
          type="textarea"
          :rows="6"
          maxlength="200"
          placeholder="请输入概述"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPortList, getPortArea } from '@/api/data-management/overall-distribution/port-area'
import { getInfo, addData, updateData } from '@/api/data-management/overall-distribution/business-area'
export default {
  data() {
    return {
      isEdit: false,
      ruleForm: {
        id: '',
        name: '',
        portId: '',
        portAreaId: '',
        coordinatesInfos: []
      },
      portList: [],
      portAreaList: [],
      rules: {
        name: [
          { required: true, message: '请输入作业区名称', trigger: 'blur' }
        ],
        portId: [
          { required: true, message: '请选择港口', trigger: 'change' }
        ],
        portAreaId: [
          { required: true, message: '请选择港区', trigger: 'change' }
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
      this.getPortArea()
    }
  },
  methods: {
    /**
     * 根据港口获取港区
     */
    async getPortArea() {
      this.portAreaList = (await getPortArea(this.ruleForm.portId)).data
    },
    /**
     * 保存
     */
    saveData(geographyInfos) {
      geographyInfos.forEach(element => {
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
