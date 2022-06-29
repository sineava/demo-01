<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="新增风险事件与制险因素" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 风险事件基本信息
    </div>
    <el-form
      v-if="query.isEdit"
      ref="ruleForm"
      size="medium"
      label-width="130px"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="风险作业单元:">
        <el-input
          v-model="query.activityName"
          disabled
        />
      </el-form-item>
      <el-form-item label="所属企业:">
        <el-input
          v-model="query.enterpriseName"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="风险事件:"
        prop="incidentName"
      >
        <el-input v-model.trim="ruleForm.incidentName" placeholder="请输入风险事件" maxlength="100" />
      </el-form-item>
      <el-form-item
        label="风险事件相关描述:"
        prop="incidentDesc"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.incidentDesc"
          :rows="6"
          type="textarea"
          maxlength="200"
          placeholder="请输入风险事件相关描述"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div
      v-else
      class="list-column-wrap"
    >
      <div class="info-list info-list-two">
        <div class="label">
          风险作业单元:
        </div><div class="content">
          {{ query.activityName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          所属企业:
        </div><div class="content">
          {{ query.enterpriseName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          风险事件:
        </div><div class="content">
          {{ ruleForm.incidentName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          风险事件相关描述:
        </div><div class="content">
          {{ ruleForm.incidentDesc }}
        </div>
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /><i style="margin-right: 10px;" class="required" /> 制险因素信息
    </div>
    <el-button
      v-if="query.isEdit"
      type="primary"
      size="medium"
      @click="handleAdd"
    >
      新增制险因素
    </el-button>
    <el-table
      :data="riskControlFactorsInfoDtoList"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        label="序号"
        width="55"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="制险因素"
        prop="factorsName"
        width="200"
        align="center"
      />
      <el-table-column
        label="制险因素分类"
        width="150"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.factorsType===1?'人的因数':(scope.row.factorsType===2?'设备因素':(scope.row.factorsType===3?'环境因素':'管理因素')) }}
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        prop="factorsDesc"
        align="center"
      />
      <el-table-column
        v-if="query.isEdit"
        label="操作"
        align="center"
        width="180"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row, scope.$index)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="riskControlFactorsInfoDtoList.splice(scope.$index, 1)"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      title="新增制险因素"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-form
        ref="dialogForm"
        size="medium"
        :model="dialogForm"
        :rules="dialogRules"
        label-width="120px"
      >
        <el-form-item
          label="制险因素:"
          prop="factorsName"
          style="width: 100%;"
        >
          <el-input v-model.trim="dialogForm.factorsName" placeholder="请输入制险因素" />
        </el-form-item>
        <el-form-item
          label="制险因素分类:"
          prop="factorsType"
          style="width: 100%;"
        >
          <el-select
            v-model="dialogForm.factorsType"
            placeholder="请选择制险因素分类"
            style="width: 100%;"
          >
            <el-option
              label="人的因数"
              :value="1"
            />
            <el-option
              label="设备因素"
              :value="2"
            />
            <el-option
              label="环境因素"
              :value="3"
            />
            <el-option
              label="管理因素"
              :value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="描述:"
          prop="factorsDesc"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="dialogForm.factorsDesc"
            type="textarea"
            placeholder="请输入描述"
            :rows="6"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          @click="submitDialog('dialogForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        v-if="query.isEdit"
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
import { addData, getInfo, updateData } from '@/api/port-services/risk-identification/risk-incident'
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        riskActivityId: ''
      },
      riskControlFactorsInfoDtoList: [],
      dialogVisible: false,
      rules: {
        incidentName: [
          { required: true, message: '请输入风险事件', trigger: 'blur' }
        ],
        incidentDesc: [
          { required: true, message: '请输入风险事件相关描述', trigger: 'blur' }
        ]
      },
      dialogForm: {},
      dialogRules: {
        factorsName: [
          { required: true, message: '请输入制险因素', trigger: 'blur' }
        ],
        factorsType: [
          { required: true, message: '请输入制险因素分类', trigger: 'blur' }
        ],
        factorsDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      loading: false,
      query: {},
      listEditShow: false
    }
  },
  async mounted() {
    this.ruleForm.riskActivityId = this.$route.query.riskActivityId
    this.query = this.$route.query
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      this.ruleForm = { ...info.data }
      this.riskControlFactorsInfoDtoList = info.data.riskControlFactorsInfoVoList
    }
  },
  methods: {
    // 添加列表
    handleAdd() {
      this.listEditIndex = -1
      this.dialogVisible = true
      this.dialogForm = {}
    },
    // 编辑列表
    handleEdit(item, index) {
      this.listEditIndex = index
      this.dialogForm = item
      this.dialogVisible = true
    },
    // 保存弹窗数据
    submitDialog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.listEditIndex >= 0) {
            this.riskControlFactorsInfoDtoList.splice(this.listEditIndex, 1, this.dialogForm)
          } else {
            this.riskControlFactorsInfoDtoList.push(this.dialogForm)
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
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
      if (this.riskControlFactorsInfoDtoList.length <= 0) {
        this.$message.error('请添加制险因素')
        return false
      }
      let data = { ...this.ruleForm }
      data.riskControlFactorsInfoDtoList = this.riskControlFactorsInfoDtoList
      delete data.riskControlFactorsInfoVoList
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}
</style>
