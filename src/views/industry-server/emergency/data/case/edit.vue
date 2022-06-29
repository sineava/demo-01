<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增事故案例' : type === 'edit' ? '编辑事故案例' : '事故案例详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="medium"
        :disabled="type === 'detail'"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />基础信息
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事故名称:"
              prop="name"
            >
              <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入事故名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事故类型:"
              prop="type"
            >
              <el-input v-model.trim="ruleForm.type" maxlength="50" placeholder="请输入事故类型" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事故级别:"
              prop="level"
            >
              <el-select
                v-model="ruleForm.level"
                clearable
                placeholder="请选择事故级别"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in field_level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事故类别:"
              prop="category"
            >
              <el-select
                v-model="ruleForm.category"
                clearable
                placeholder="请选择事故类别"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in field_category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话:"
              prop="phone"
            >
              <el-input v-model.trim="ruleForm.phone" maxlength="11" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故概述
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              prop="accidentDescribe"
              label="事故概述"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.accidentDescribe"
                type="textarea"
                rows="6"
                maxlength="200"
                placeholder="请输入事故概述"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故单位概括
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="单位名称:"
              prop="enterpriseName"
            >
              <el-input v-model.trim="ruleForm.enterpriseName" maxlength="100" placeholder="请输入单位名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="概括"
              prop="summary"
            >
              <el-input
                v-model="ruleForm.summary"
                type="textarea"
                rows="8"
                maxlength="200"
                placeholder="请输入概括"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故发生经过
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故发生经过"
              prop="pass"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.accidentHappened"
                type="textarea"
                placeholder="请输入事故发生经过"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故抢救情况
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              prop="situation"
              label="事故抢救情况"
            >
              <el-input
                v-model="ruleForm.emergencyRescueSituation"
                type="textarea"
                placeholder="请输入事故抢救情况"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故性质和原因
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故性质"
              prop="nature"
            >
              <el-input v-model.trim="ruleForm.nature" placeholder="请输入事故性质" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故直接原因"
              prop="immediateCause"
            >
              <el-input
                v-model="ruleForm.immediateCause"
                type="textarea"
                placeholder="请输入事故直接原因"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故间接原因"
              prop="indirectReason"
            >
              <el-input
                v-model="ruleForm.indirectReason"
                type="textarea"
                rows="6"
                maxlength="200"
                placeholder="请输入事故间接原因"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故责任与处理
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故责任认定"
              prop="responsibilityIdentification"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.responsibilityIdentification"
                type="textarea"
                rows="6"
                maxlength="200"
                placeholder="请输入事故责任认定"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="处理建议"
              prop="processingOpinion"
            >
              <el-input
                v-model="ruleForm.processingOpinion"
                type="textarea"
                placeholder="请输入处理建议"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />事故教训和防范措施
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="事故教训"
              prop="accidentLesson"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.accidentLesson"
                type="textarea"
                rows="6"
                maxlength="200"
                placeholder="请输入事故教训"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="防范措施"
              prop="precautionaryMeasure"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.precautionaryMeasure"
                type="textarea"
                placeholder="请输入防范措施"
                rows="6"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="icon-title">
              <span class="span" />应急预案文件
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item
              v-if="type !== 'detail'"
              style="width: 100%;"
              label-width="0"
            >
              <upload
                file
                :show-file-list="false"
                :file-list="fileList"
                multiple
                @fileSuccess="uploadSuccess"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <FileTable
        :show-download="type !== 'add'"
        :show-delete="type !== 'detail'"
        :table-data="fileList"
        @handleDelete="handleDelete"
      />
    </div>
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
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { emergencyCase } from '@/utils/public-fields'
import { telephone } from '@/utils/validate'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { saveEntity, updateById, queryDetail } from '@/api/emergency-services/accident-case'
export default {
  components: {
    FileTable,
    upload
  },
  mixins: [emergencyCase],
  data() {
    return {
      ruleForm: {
        accidentHappened: '',
        accidentLesson: '',
        accidentDescribe: '',
        emergencyRescueSituation: '',
        enterpriseName: '',
        filePath: [],
        id: null,
        immediateCause: '',
        indirectReason: '',
        level: '',
        name: '',
        nature: '',
        phone: '',
        precautionaryMeasure: '',
        processingOpinion: '',
        responsibilityIdentification: '',
        summary: '',
        type: ''
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入事故名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入事故类型', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择事故级别', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择事故类别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        enterpriseName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '请输入事故性质', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          filePath: JSON.parse(res.data.filePath)
        }
        this.fileList = this.ruleForm.filePath
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      const id = this.ruleForm.id || null
      const dto = {
        ...this.ruleForm,
        id,
        filePath: JSON.stringify(this.fileList)
      }
      const res = id ? await updateById(dto) : await saveEntity(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/data/case' })
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>
