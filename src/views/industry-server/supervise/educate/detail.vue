<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增教育培训' : type === 'detail' ? '教育培训详情' : '编辑教育培训'" />
      </span>
    </div>
    <div class="manager-detail">
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
          label="管理部门:"
          prop="departmentId"
        >
          <el-cascader
            v-model="ruleForm.departmentId"
            style="width: 100%;"
            :options="options"
            clearable
            :props="{'label': 'departmentName', 'value': 'id', 'checkStrictly': true,expandTrigger: 'hover'}"
            :show-all-levels="false"
            peholder="不选默认顶级"
          />
        </el-form-item>
        <el-form-item
          label="培训科目:"
          prop="trainSubject"
        >
          <el-input v-model.trim="ruleForm.trainSubject" maxlength="50" placeholder="请输入培训科目" />
        </el-form-item>
        <el-form-item
          label="培训方式:"
          prop="trainModes"
        >
          <el-input v-model.trim="ruleForm.trainModes" maxlength="50" placeholder="请输入培训方式" />
        </el-form-item>
        <el-form-item
          label="开始培训时间:"
          prop="planningTime"
        >
          <el-date-picker
            v-model="ruleForm.planningTime"
            type="datetime"
            placeholder="请输入开始培训时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="培训学时:"
          prop="hours"
        >
          <el-input-number
            v-model="ruleForm.hours"
            :precision="2"
            :min="0"
            :max="999999"
            label="请输入培训学时"
            placeholder="请输入培训学时"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="组织人:"
          prop="organizerPerson"
        >
          <el-input v-model.trim="ruleForm.organizerPerson" maxlength="50" placeholder="请输入组织人" />
        </el-form-item>
        <el-form-item
          label="填报人:"
          prop="reporterPerson"
        >
          <el-input v-model.trim="ruleForm.reporterPerson" maxlength="50" placeholder="请输入填报人" />
        </el-form-item>
        <el-form-item
          label="填报时间:"
          prop="reportedTime"
        >
          <el-date-picker
            v-model="ruleForm.reportedTime"
            type="datetime"
            style="width: 100%;"
            placeholder="请选择填报时间"
          />
        </el-form-item>
        <el-form-item
          label="填报人联系电话:"
          prop="reporterPhone"
        >
          <el-input v-model.trim="ruleForm.reporterPhone" maxlength="11" placeholder="请输入填报人联系电话" />
        </el-form-item>
        <el-form-item
          label="培训对象:"
          prop="trainObject"
        >
          <el-input v-model.trim="ruleForm.trainObject" maxlength="100" placeholder="请输入培训对象" />
        </el-form-item>
        <el-form-item
          label="培训人数:"
          prop="peopleNumber"
        >
          <el-input-number
            v-model="ruleForm.peopleNumber"
            label="请输入培训人数"
            style="width: 100%;"
            :precision="0"
            :min="0"
            :max="999999"
          />
        </el-form-item>
        <el-form-item
          label="培训内容:"
          prop="trainContent"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.trainContent"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入培训内容"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入备注"
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="情况图片:"
          prop="caption"
        >
          <upload
            :file-list="imgList"
            multiple
            :limit="2"
            @success="imgUploadSuccess"
            @remove="imgUploadRemove"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />文件附件
          </div>
        </el-form-item>
        <el-form-item
          v-if="type !== 'detail'"
          label-width="0"
          style="width: 100%;"
        >
          <upload
            file
            :show-file-list="false"
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadSuccess"
            @remove="uploadRemove"
          />
        </el-form-item>
      </el-form>
    </div>
    <FileTable
      :show-download="type !== 'add'"
      :show-delete="type === 'add'"
      :table-data="fileList"
      @handleDelete="handleDelete"
    />
    <div
      class="backstage-edit-btn"
    >
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :loading="loading"
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
import { telephone } from '@/utils/validate'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import { momentDate, toTreeData } from '@/utils/index'
import { queryDetail, saveTraining, updateTraining } from '@/api/general-services/educateTrain/management-training'
import { getManagementDepartmentLikeName } from '@/api/general-services/supervisory-capability/management-department'
export default {
  components: {
    FileTable,
    upload
  },
  data() {
    return {
      options: [],
      loading:false,
      ruleForm: {
        caption: [],
        departmentId: undefined,
        departmentName: '',
        filePath: [],
        hours: undefined,
        id: null,
        organizerPerson: '',
        peopleNumber: undefined,
        planningTime: '',
        remark: '',
        reportedTime: '',
        reporterPerson: '',
        reporterPhone: '',
        trainContent: '',
        trainModes: '',
        trainObject: '',
        trainSubject: ''
      },
      imgList: [],
      fileList: [],
      rules: {
        departmentId: [
          { required: true, message: '请选择管理部门', trigger: 'blur' }
        ],
        trainSubject: [
          { required: true, message: '请输入培训科目', trigger: 'blur' }
        ],
        trainModes: [
          { required: true, message: '请输入培训方式', trigger: 'blur' }
        ],
        planningTime: [
          { required: true, message: '请选择开始培训时间', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请输入培训学时', trigger: 'blur' }
        ],
        organizerPerson: [
          { required: true, message: '请输入组织人', trigger: 'blur' }
        ],
        reporterPerson: [
          { required: true, message: '请输入填报人', trigger: 'blur' }
        ],
        reportedTime: [
          { required: true, message: '请选择填报时间', trigger: 'blur' }
        ],
        reporterPhone: [
          { required: true, message: '请输入填报人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        trainObject: [
          { required: true, message: '请输入培训对象', trigger: 'blur' }
        ],
        peopleNumber: [
          { required: true, message: '请输入培训人数', trigger: 'blur' }
        ],
        trainContent: [
          { required: true, message: '请输入培训内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
    this.fetchDepts()
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      const res = await getManagementDepartmentLikeName({ departmentName: '',flag: this.type === 'detail' })
      this.options = toTreeData(res.data)
    },
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.code === '0') {
          this.ruleForm = {
            ...res.data,
            enclosure: res.data.enclosure ? JSON.parse(res.data.enclosure) : [],
            caption: res.data.caption ? JSON.parse(res.data.caption) : []
          }
          this.fileList = res.data.enclosure ? JSON.parse(res.data.enclosure) : []
          this.imgList = res.data.caption ? JSON.parse(res.data.caption) : []
        }
      })
    },
    // 文件上传成功的钩子
    uploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      this.loading = true
      const dto = {
        ...this.ruleForm,
        caption: this.imgList ? JSON.stringify(this.imgList) : '',
        enclosure: this.fileList.length ? JSON.stringify(this.fileList) : '',
        planningTime: momentDate(this.ruleForm.planningTime),
        reportedTime: momentDate(this.ruleForm.reportedTime),
        departmentId: this.ruleForm.departmentId[this.ruleForm.departmentId.length - 1],
      }
      delete dto.departmentName
      delete dto.filePath
      const res = dto.id ? await updateTraining(dto) : await saveTraining(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 图片上传成功时的钩子
    imgUploadSuccess(res) {
      this.imgList.push({ url: res.data })
    },
    // 文件列表移除文件时的钩子
    imgUploadRemove(file) {
      this.imgList.splice(this.imgList.findIndex(item => item.uid === file.uid), 1)
    }
  }
}
</script>
