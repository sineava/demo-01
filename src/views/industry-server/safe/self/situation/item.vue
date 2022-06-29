<template>
  <div class="info-detail detail">
    <el-form
      ref="ruleForm"
      label-width="120px"
      size="medium"
      :model="ruleForm"
      :rules="rules"
      :disabled="disabled ? true : false"
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
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
        style="margin-bottom: 0"
      >
        <el-descriptions-item label="是否存在问题:">{{ ['检查正常','存在问题','存在隐患'][ruleForm.isProblem] }}</el-descriptions-item>
        <el-descriptions-item v-show="ruleForm.isProblem!==0" label="危险等级:" :span="2">{{ ruleForm.riskLevel=== 1 ? '一般' : '重大' }}</el-descriptions-item>
        <el-descriptions-item label="检查情况:" :span="3">{{ ruleForm.inspectSituation }}</el-descriptions-item>
        <el-descriptions-item label="隐患/问题描述:" :span="3">{{ ruleForm.dangerDesc }}</el-descriptions-item>
        <el-descriptions-item label="是否需要整改:" >{{ ruleForm.isRectification===1?'是':'否' }}</el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.isRectification===1" label="整改时限:" >{{ ruleForm.timeRequirement }}</el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.isRectification===1" label="整改截止时间:" >{{ ruleForm.deadlineDate }}</el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.isRectification===1" label="整改要求:" :span="3">{{ ruleForm.rectificationRequirement }}</el-descriptions-item>
        <el-descriptions-item label="图片上传:" :span="3">
          <div v-for="(pic, index) in fileList" :key="index" style="display: inline-block; margin: 5px;">
            <Images
              :ref="`images${index}`"
              height="100px"
              width="120px"
              fit="cover"
              :url="pic.url"
              style="border: 1px solid #eee"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/upload'
import Images from '@/components/images'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    Images
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
    },
    disabled: {
      type: Boolean,
      default: false
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

.detail {
    /deep/ .el-radio__input.is-checked + .el-radio__label {
        color: #409eff;
    }

    /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner {
        border-color: #409eff;
        background: #409eff;
    }
}
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
