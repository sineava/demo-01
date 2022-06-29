<template>
  <div class="info-detail detail">
    <el-form
      ref="ruleForm"
      label-width="120px"
      size="medium"
      :model="ruleForm"
      :rules="rules"
    >
      <el-row :gutter="20">
        <div style="margin: 10px;">
          <h3>自查项{{ itemIndex }}</h3>
        </div>
        <div style="margin: 10px 10px 30px 10px;">
          <el-table
            :data="tableData"
            border
            :show-header="false"
            style="width: 100%;"
          >
            <el-table-column
              prop="ak"
              label=""
              align="center"
              width="100"
              class-name="bg-grey"
            />
            <el-table-column
              prop="av"
              label=""
              align="center"
            />
            <el-table-column
              prop="bk"
              label=""
              align="center"
              class-name="bg-grey"
              width="100"
            />
            <el-table-column
              prop="bv"
              label=""
              align="center"
            />
            <el-table-column
              prop="ck"
              label=""
              align="center"
              class-name="bg-grey"
              width="100"
            />
            <el-table-column
              prop="cv"
              label=""
              width="100"
              align="center"
            />
          </el-table>
        </div>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item
            label="是否存在问题:"
            prop="isProblem"
          >
            <el-radio-group v-model="ruleForm.isProblem">
              <el-radio :label="0">
                检查正常
              </el-radio>
              <el-radio :label="1">
                存在问题
              </el-radio>
              <el-radio :label="2">
                存在隐患
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="危险等级:"
            prop="riskLevel"
            :rules="ruleForm.isProblem===1 ||ruleForm.isProblem===2?[{ required: true, message: '请输入隐患描述', trigger: 'change' }]:[]"
          >
            <el-select
              v-model="ruleForm.riskLevel"
              clearable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item
          label="检查情况:"
          prop="inspectSituation"
          style="width: 80%;"
        >
          <el-input
            v-model.trim="ruleForm.inspectSituation"
            placeholder="请输入检查情况"
            type="textarea"
            rows="5"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item
          label="隐患/问题描述:"
          prop="dangerDesc"
          style="width: 80%;"
          :rules="ruleForm.isProblem===1 ||ruleForm.isProblem===2?[{ required: true, message: '请输入隐患描述', trigger: 'blur' }]:[]"
        >
          <el-input
            v-model.trim="ruleForm.dangerDesc"
            placeholder="请输入隐患/问题描述"
            type="textarea"
            rows="5"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="是否需要整改:"
            prop="isRectification"
          >
            <el-radio-group v-model="ruleForm.isRectification">
              <el-radio :label="1">
                是
              </el-radio>
              <el-radio :label="0">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          v-if="ruleForm.isRectification===1"
          :span="8"
        >
          <el-form-item
            label="整改时限:"
            prop="timeRequirement"
            :rules="ruleForm.isRectification===1?[{ required: true, message: '请选择整改时限', trigger: 'blur' }]:[]"
          >
            <el-select
              v-model="ruleForm.timeRequirement"
              clearable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in time_limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="ruleForm.isRectification===1"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item
            label="整改截止时间:"
            prop="deadlineDate"
            :rules="ruleForm.isRectification===1?[{ required: true, message: '请选择整改截止时间', trigger: 'change' }]:[]"
          >
            <el-date-picker
              v-model="ruleForm.deadlineDate"
              type="date"
              placeholder="请选择整改截止时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="ruleForm.isRectification===1"
        :gutter="20"
      >
        <el-form-item
          label="整改要求:"
          prop="rectificationRequirement"
          style="width: 80%;"
          :rules="ruleForm.isRectification===1?[{ required: true, message: '请选择整改要求', trigger: 'blur' }]:[]"
        >
          <el-input
            v-model.trim="ruleForm.rectificationRequirement"
            placeholder="请输入整改要求"
            type="textarea"
            rows="5"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item
          label="图片上传:"
          style="width: 100%;"
        >
          <upload
            :file-list="fileList"
            :limit="9"
            multiple
            @fileSuccess="uploadSuccess"
            @error="uploadError"
            @remove="uploadRemove"
          />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload
  },
  props: {
    itemObj: {
      type: Object,
      default: () => []
    },
    itemIndex: {
      type: Number,
      default: 1
    },
    operation: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      tableData: [],
      ruleForm: {
        checkPicture: '', // 检查图片（多张用json）
        dangerDesc: '', // 隐患描述
        deadlineDate: '', // 整改截止时间
        id: '', // 业自查情况自查项ID
        inspectSituation: '', // 检查情况
        isProblem: '', // 检查情况-是否存在问题（0检查正常 1存在问题 2存在隐患）
        isRectification: '', // 是否需要整改（0 否 1是）
        itemInfoId: '', // 企业自查项ID
        operation: '', // 操作类型 add 添加 update 修改（业自查情况自查项ID必传）delete 删除（业自查情况自查项ID必传）
        rectificationRequirement: '', // 整改要求
        riskLevel: '', // 危险等级（1、一般，2、重大）
        timeRequirement: '' // 整改时限（停业整改，限期整改，立即整改，挂牌督办）
      },
      fileList: [],
      rules: {
        isProblem: [
          { required: true, message: '请选择是否存在问题', trigger: 'change' }
        ],
        inspectSituation: [
          { required: true, message: '请输入检查情况', trigger: 'blur' }
        ],
        isRectification: [
          { required: true, message: '请选择是否需要整改', trigger: 'change' }
        ]
      },
      time_limit: [
        { value: '立即整改', label: '立即整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '停业整改', label: '停业整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ],
      level: [
        { value: 1, label: '一般' },
        { value: 2, label: '重大' }
      ]
    }
  },
  unmounted() {
  },
  async mounted() {
    this.tableData = [
      { ak: '自查项名称', av: this.itemObj.itemName, bk: '自查项类型', bv: this.itemObj.categoryName, ck: '自查周期', cv: this.itemObj.cycle === 1 ? '周' : (this.itemObj.cycle === 2 ? '月' : (this.itemObj.cycle === 3 ? '季' : '年')) },
      { ak: '发布单位', av: this.itemObj.isUseUnit, bk: '自查标准', bv: this.itemObj.standard, ck: '创建人', cv: '袁贵权' }
    ]
    if (this.itemObj.ruleForm) {
      this.ruleForm = this.itemObj.ruleForm
      if (this.ruleForm.checkPicture) {
        const imgs = JSON.parse(this.ruleForm.checkPicture)
        imgs.forEach((item, index) => {
          this.fileList.push({
            url: item,
            name: '图片' + index
          })
        })
      }
    }
    this.ruleForm.itemInfoId = this.itemObj.id
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.forEach((item, index) => {
        if (item.url === file.ydz) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/self/situation' })
    },
    // 保存
    submitForm(formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const img = []
          this.fileList.forEach((item, index) => {
            img.push(item.url)
          })
          this.ruleForm.deadlineDate = this.ruleForm.deadlineDate ? momentDate(this.ruleForm.deadlineDate, 'YYYY-MM-DD') : ''
          this.ruleForm.checkPicture = JSON.stringify(img)
          this.ruleForm.operation = this.operation
          flag = this.ruleForm
        } else {
          flag = false
        }
      })
      return flag
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table /deep/ .bg-grey {
    background: #f2f2f2 !important;
}
</style>
