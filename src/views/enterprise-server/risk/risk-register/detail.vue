<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="重大风险登记详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 评估信息
    </div>
    <el-table
      :data="list"
      fit
      border
      class="table-border"
    >
      <el-table-column
        label="风险事件"
        prop="incidentName"
      />
      <el-table-column
        label="所属作业单元"
        prop="activityName"
      />
      <el-table-column
        label="制险因素"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="制险因素分类"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsType===1?'人的因数':(item.factorsType===2?'设备因素':(item.factorsType===3?'环境因素':'管理因素')) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="制险因素相关描述"
        width="180"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsDesc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="发生可能性（L）"
        prop="happenPossibility"
        width="150"
      />
      <el-table-column
        label="后果严重程度（C）"
        prop="seriousDegree"
        width="180"
      />
      <el-table-column
        label="风险值"
        prop="riskValue"
      />
      <el-table-column label="风险等级">
        <template v-slot="scope">
          {{ scope.row.riskGrade===1?'较小风险':(scope.row.riskGrade===2?'一般风险':(scope.row.riskGrade===3?'较大风险':'重大风险')) }}
        </template>
      </el-table-column>
    </el-table>
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      style="margin-top: 20px;"
      :disabled="isEdit?false:true"
    >
      <el-form-item
        label="责任人:"
        prop="liablePerson"
      >
        <el-input v-model.trim="ruleForm.liablePerson" placeholder="请输入责任人" maxlength="20" />
      </el-form-item>
      <el-form-item
        label="联系方式:"
        prop="contactMode"
      >
        <el-input v-model.trim="ruleForm.contactMode" placeholder="请输入联系方式" maxlength="20" />
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 风险管控措施
      </div>
      <el-form-item
        label="管控措施:"
        prop="controlMeasures"
      >
        <el-input
          v-model="ruleForm.controlMeasures"
          :rows="6"
          type="textarea"
          placeholder="请输入管控措施"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="controlMeasuresRemarks"
      >
        <el-input
          v-model="ruleForm.controlMeasuresRemarks"
          :rows="6"
          type="textarea"
          placeholder="请输入备注"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="现场图片:"
        prop="sceneImg"
      >
        <upload
          :limit="9"
          :file-list="ruleForm.sceneImg"
          multiple
          @fileSuccess="uploadImgSuccess"
          @remove="uploadImgRemove"
        />
      </el-form-item>
      <div class="icon-title">
        <span class="span" /> 应急处置方案
      </div>
      <el-form-item
        label="应急处置方案:"
        prop="disposalPlan"
      >
        <el-input
          v-model="ruleForm.disposalPlan"
          :rows="6"
          type="textarea"
          placeholder="请输入应急处置方案"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="remarks"
      >
        <el-input
          v-model="ruleForm.remarks"
          :rows="6"
          type="textarea"
          placeholder="请输入备注"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        v-if="isEdit"
        label="附件:"
        prop="enclosureInfo"
      >
        <upload
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
      </el-form-item>
      <common-table
        v-if="isEdit"
        :table-data="ruleForm.enclosureInfo"
        show-download
        show-delete
        @handleDelete="handleDelete"
      />
    </el-form>
    <common-table
      v-if="!isEdit"
      :table-data="ruleForm.enclosureInfo"
      show-download
    />
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
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
import { getInfo, editRegister } from '@/api/port-services/risk-identification/major-risk-register'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        id: '',
        liablePerson: '',
        contactMode: '',
        controlMeasures: '',
        controlMeasuresRemarks: '',
        sceneImg: [],
        enclosureInfo: [],
        disposalPlan: '',
        remarks: ''
      },
      rules: {
        liablePerson: [
          { required: true, message: '请输入责任人', trigger: 'blur' }
        ],
        contactMode: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        controlMeasures: [
          { required: true, message: '请输入风险管控措施', trigger: 'blur' }
        ],
        controlMeasuresRemarks: [
          { required: true, message: '请输入管控措施备注', trigger: 'blur' }
        ],
        sceneImg: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        disposalPlan: [
          { required: true, message: '请输入应急处置方案', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      loading: false,
      info: {},
      list: [],
      isEdit: false
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.ruleForm.id = this.$route.query.id
      this.info = (await getInfo(this.$route.query.id)).data
      this.list = [this.info]
      this.ruleForm.contactMode = this.info.contactMode
      this.ruleForm.liablePerson = this.info.liablePerson
      this.ruleForm.controlMeasures = this.info.controlMeasures
      this.ruleForm.controlMeasuresRemarks = this.info.controlMeasuresRemarks
      this.ruleForm.disposalPlan = this.info.disposalPlan
      this.ruleForm.remarks = this.info.remarks
      try {
        this.info.sceneImg = JSON.parse(this.info.sceneImg)
        this.info.enclosureInfo = JSON.parse(this.info.enclosureInfo)
      } catch (err) {
        console.log()
      }
      this.ruleForm.sceneImg = this.info.sceneImg || []
      this.ruleForm.enclosureInfo = this.info.enclosureInfo || []
    }
  },
  methods: {
    // 图片上传成功钩子
    uploadImgSuccess(file) {
      this.ruleForm.sceneImg.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 图片列表移除文件时的钩子
    uploadImgRemove(file) {
      this.ruleForm.sceneImg.splice(this.ruleForm.sceneImg.findIndex(item => item.uid === file.uid), 1)
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.ruleForm.enclosureInfo.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除
    handleDelete(val) {
      this.ruleForm.enclosureInfo.splice(val.index, 1)
    },
    /**
     * 保存
     */
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
      data.sceneImg = JSON.stringify(data.sceneImg)
      data.enclosureInfo = JSON.stringify(data.enclosureInfo)
      this.loading = true
      let res = await editRegister(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-list {
    line-height: 50px;
}
</style>
