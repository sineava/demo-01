<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业隐患整改信息记录" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />隐患情况
      </div>
      <el-descriptions
        class="descriptions"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="自查项名称">
          {{ ruleForm.itemName }}
        </el-descriptions-item>
        <el-descriptions-item label="自查项类型">
          {{ ruleForm.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="开展时间">
          {{ ruleForm.launchTime }}
        </el-descriptions-item>
        <el-descriptions-item label="是否存在问题">
          <el-tag :type="ruleForm.isProblem===1?'danger':(ruleForm.isProblem===2?'warning':'success')">
            {{ ruleForm.isProblem===1?'存在问题':ruleForm.isProblem===2?'存在隐患':'检查正常' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="危险等级">
          {{ getLabel('riskLevel',ruleForm.riskLevel) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否需要整改">
          <el-tag :type="ruleForm.isRectification===1?'danger':'success'">{{ ruleForm.isRectification===1?'是':'否' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="整改时限">
          {{ ruleForm.timeRequirement }}
        </el-descriptions-item>
        <el-descriptions-item label="整改截止时间">
          {{ ruleForm.deadlineDate }}
        </el-descriptions-item>
        <el-descriptions-item label="检查情况" :span="2">
          {{ ruleForm.inspectSituation }}
        </el-descriptions-item>
        <el-descriptions-item label="隐患描述" :span="2">
          {{ ruleForm.dangerDesc }}
        </el-descriptions-item>
        <el-descriptions-item label="整改要求" :span="2">
          {{ ruleForm.rectificationRequirement }}
        </el-descriptions-item>
        <el-descriptions-item label="图片" :span="2">
          <div v-for="(pic, index) in ruleForm.checkPicture" :key="index" style="display: inline-block; margin: 5px;">
            <Images
              :ref="`images${index}`"
              height="100px"
              fit="cover"
              :url="pic"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />整改记录
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="是否整改:"
          prop="isStatus"
        >
          <el-select
            v-model="ruleForm.isStatus"
            clearable
            style="width: 100%;"
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in isStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="整改时间:"
          prop="improvedDate"
        >
          <el-date-picker
            v-model="ruleForm.improvedDate"
            placeholder="请选择整改时间"
            type="date"
            style="width: 100%;"
            :disabled="type === 'detail'"
          />
        </el-form-item>
        <el-form-item
          label="整改责任人:"
          prop="directorName"
        >
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请填写整改责任人"
            :disabled="type === 'detail'"
          />
        </el-form-item>
        <el-form-item
          label="整改落实资金:"
          prop="fund"
        >
          <el-input-number
            v-model="ruleForm.fund"
            :precision="2"
            style="width: 100%;"
            label="请填写整改落实资金"
            :disabled="type === 'detail'"
          />
        </el-form-item>
        <el-form-item
          label="整改措施:"
          prop="improvementMeasure"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.improvementMeasure"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入整改措施"
            :disabled="type === 'detail'"
          />
        </el-form-item>
        <el-form-item
          label="应急保证措施:"
          prop="emergencyMeasure"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.emergencyMeasure"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入应急保证措施"
            :disabled="type === 'detail'"
          />
        </el-form-item>
        <el-form-item
          label="上传整改图片:"
          prop="improvementPicture"
          style="width: 100%;"
        >
          <template v-if="type === 'detail'">
            <div>
              <Images
                v-for="(pic, index) in ruleForm.improvementPicture"
                :key="index"
                :ref="`zimages${index}`"
                height="100px"
                width="100px"
                fit="cover"
                :url="pic"
              />
            </div>
          </template>
          <template v-else>
            <upload
              :file-list="ruleForm.improvementPicture"
              :limit="5"
              multiple
              @success="uploadSuccess"
              @remove="uploadRemove"
            />
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-if="type !== 'detail'"
      class="backstage-edit-btn"
    >
      <el-button
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
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import { getDetail, addRectificationSituation } from '@/api/general-services/enterprise-self-inspection/rectification-situation'
import Images from '@/components/images'
export default {
  components: {
    upload,
    Images
  },
  data() {
    return {
      ruleForm: {
        improvedDate: ''
      },
      loading: false,
      riskLevel: [ // 危险等级
        { value: 1, label: '一般' },
        { value: 2, label: '重大' }
      ],
      timeRequirement: [ // 整改时限
        { value: '立即整改', label: '立即整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '停业整改', label: '停业整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ],
      type: '',
      isStatus: [ // 是否整改
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      isRectification: [ // 是否需要整改
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      imgList: [],
      rules: {
        isStatus: [
          { required: true, message: '请选择是否整改', trigger: 'change' }
        ],
        improvedDate: [
          { required: true, message: '请选择整改时间', trigger: 'change' }
        ],
        directorName: [
          { required: true, message: '请填写整改责任人', trigger: 'blur' }
        ],
        improvementMeasure: [
          { required: true, message: '请输入整改措施', trigger: 'blur' }
        ],
        improvementPicture: [
          { required: true, message: '请上传整改图片', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          improvedDate: res?.data?.improvedDate || '',
          checkPicture: res.data.checkPicture ? JSON.parse(res.data.checkPicture) : [],
          improvementPicture: res.data.improvementPicture ? JSON.parse(res.data.improvementPicture) : []
        }
        console.log(this.ruleForm)
        this.imgList = this.ruleForm.improvementPicture
      })
    },
    getLabel(name,value){
      let label = ''
      for (let i=0;i<this[name].length;i++){
        if (this[name][i].value===value){
          label = this[name][i].label
        }
      }
      return label
    },
    // 提交
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
          this.loading = false
        } else {

          this.loading = false
          return false
        }
      })
      this.loading = false
    },
    // 保存
    async saveData() {
      const {
        directorName,
        emergencyMeasure,
        fund,
        id,
        improvedDate,
        improvementMeasure,
        isStatus
      } = this.ruleForm
      const rectificationSituationInfoDto = {
        directorName,
        emergencyMeasure,
        fund,
        id,
        improvedDate: momentDate(improvedDate, 'YYYY-MM-DD'),
        improvementMeasure,
        improvementPicture: JSON.stringify(this.imgList),
        isStatus
      }
      addRectificationSituation(rectificationSituationInfoDto).then(res => {
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/self/rectify' })
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.imgList.push({ url: file.data })
      this.$refs.ruleForm.validateField('improvementPicture')
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.imgList.splice(this.imgList.findIndex(item => item.uid === file.uid), 1)
    }
  }
}
</script>
<style lang="scss" scoped>
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
      width: 40%;
      line-height: 30px;
  }
}
</style>