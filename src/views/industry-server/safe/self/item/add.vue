<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="ruleForm.id ? (isDisabled ? '企业自查项详情' : '编辑企业自查项') : '新增企业自查项'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-descriptions
        v-if="isDisabled"
        class="descriptions"
        :column="3"
        colon
        size="medium"
        :labelStyle="{ width: '10%' }"
        border
      >
        <el-descriptions-item label="自查项分类">
          {{ ruleForm.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="自查项名称">
          {{ ruleForm.itemName }}
        </el-descriptions-item>
        <el-descriptions-item label="自查项周期">
          {{ ruleForm.type ? cycleList[ruleForm.type - 1].label : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="自查项名称" :span="3">
          {{ ruleForm.standard }}
        </el-descriptions-item>
        <el-descriptions-item label="附件" :span="3">
          <common-table
            :table-data="reviewedFile"
            show-download
            :show-delete="false"
            style="width: 99%"
          />
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        v-else
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        size="medium"
        :disabled="isDisabled"
        class="three-column-input-table"
      >
        <el-form-item
          label="自查项分类:"
          prop="categoryId"
        >
          <el-select
            v-model="ruleForm.categoryId"
            clearable
            placeholder="请选择自查项分类"
            style="width: 100%;"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="自查项名称:"
          prop="itemName"
        >
          <el-input
            v-model.trim="ruleForm.itemName"
            maxlength="100"
            placeholder="请输入自查项名称"
          />
        </el-form-item>
        <el-form-item
          label="自查项周期:"
          prop="cycle"
        >
          <el-select
            v-model="ruleForm.cycle"
            clearable
            placeholder="请选择自查项周期"
            style="width: 100%;"
          >
            <el-option
              v-for="item in cycleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="自查内容:"
          prop="standard"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.standard"
            type="textarea"
            maxlength="1000"
            show-word-limit
            placeholder="请输入自查内容"
            rows="5"
          />
        </el-form-item>
        <el-form-item v-if="!isDisabled" label="附件:" prop="filePath" style="width: 100%;">
          <upload
            style="width: 100%;"
            file
            :limit="1"
            :show-file-list="false"
            :file-list="reviewedFile"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item label="" style="width: 100%;">
          <common-table
            :table-data="reviewedFile"
            show-download
            :show-delete="!isDisabled"
            @handleDelete="handleDelete"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="!isDisabled" class="backstage-edit-btn">
      <el-button
        size="medium "
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        type="primary"
        size="medium "
        :loading="saveloading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { getItem, hyAddExamineItem, hyUpdateExamineItem } from '@/api/general-services/enterprise-self-inspection/examineItem'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import moment from 'moment'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      saveloading:false,
      ruleForm: {
        categoryId: '',
        id: '',
        itemName: '',
        cycle: '',
        standard: ''
      },
      cycleList: [
        { value: 1, label: '周' },
        { value: 2, label: '月' },
        { value: 3, label: '季' },
        { value: 4, label: '年' },
        { value: 5, label: '次' }
      ],
      loading:false,
      rules: {
        categoryId: [
          { required: true, message: '请选择自查分类', trigger: 'change' }
        ],
        itemName: [
          { required: true, message: '请输入自查项名称', trigger: 'blur' }
        ],
        cycle: [
          { required: true, message: '请选择自查周期', trigger: 'change' }
        ],
        standard: [
          { required: true, message: '请输入自查内容', trigger: 'blur' }
        ]
      },
      isDisabled: false,
      categoryList: [],
      reviewedFile: []
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    if (this.$route.query.disabled) {
      this.isDisabled = true
    }
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      this.initEdit(this.ruleForm.id)
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/self/item' })
    },
    /**
     * 编辑初始化
     */
    initEdit() {
      getItem(this.ruleForm.id).then(res => {
        this.ruleForm = {...res?.data}
        this.reviewedFile = JSON.parse(res?.data?.filePath || '[]')
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = { ...this.ruleForm, filePath: JSON.stringify(this.reviewedFile || []) }
          this.saveloading = true
          if (this.ruleForm.id) {
            hyUpdateExamineItem(data).then(res => {
              this.saveloading = false
              if (res.code === '0') {
                this.returnBack()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            hyAddExamineItem(data).then(res => {
              this.saveloading = false
              if (res.code === '0') {
                this.returnBack()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        } else {
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
  .three-column-input-table {
      display: flex;
      margin: 20px 0;
      border-top: 0;
      flex-wrap: wrap;

      .el-form-item {
          margin: 0 0 1px 0;
          padding: 10px 0;
          width: 33.3%;
          background-color: #ffffff;
      }
  }
}
</style>