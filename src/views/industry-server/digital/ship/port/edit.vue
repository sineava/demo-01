<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增港口信息' : type === 'edit' ? '编辑港口信息' : '港口信息详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="180px"
        size="medium"
        class="table-column two"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="港口名称:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            maxlength="100"
            placeholder="请输入港口名称"
          />
        </el-form-item>
        <el-form-item
          label="排序顺序:"
          prop="indexSort"
        >
          <el-input-number
            v-model="ruleForm.indexSort"
            :min="0"
            :max="999999"
            style="width: 100%;"
            placeholder="请输入排序顺序"
          />
        </el-form-item>
        <el-form-item
          label="港口拼音:"
          prop="portPinYin"
        >
          <el-input
            v-model.trim="ruleForm.portPinYin"
            maxlength="50"
            placeholder="请输入港口拼音"
          />
        </el-form-item>
        <el-form-item
          label="港口方位:"
          prop="bearing"
        >
          <el-input
            v-model.trim="ruleForm.bearing"
            maxlength="50"
            placeholder="请输入港口方位"
          />
        </el-form-item>
        <el-form-item
          label="港口方位名称:"
          prop="bearingName"
        >
          <el-input
            v-model.trim="ruleForm.bearingName"
            maxlength="100"
            placeholder="请输入港口方位名称"
          />
        </el-form-item>
        <el-form-item
          label="到达大坝时间（小时）:"
          prop="arrivalTime"
        >
          <el-input-number
            v-model="ruleForm.arrivalTime"
            :precision="2"
            :min="1"
            :max="999999"
            style="width: 100%;"
            placeholder="请输入到达大坝时间（小时）"
          />
        </el-form-item>
        <el-form-item
          label="上行港口分类:"
          prop="upsideType"
        >
          <el-select
            v-model="ruleForm.upsideType"
            clearable
            placeholder="请选择上行港口分类"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_upsideType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="下行港口分类:"
          prop="downsideType"
        >
          <el-select
            v-model="ruleForm.downsideType"
            clearable
            placeholder="请选择下行港口分类"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_downsideType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        type="primary"
        size="medium"
        @click="loading || submitForm('ruleForm')"
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
import { shipPort } from '@/utils/public-fields'
import { saveInfo, updateInfo } from '@/api/channel-services/ship/port'
export default {
  mixins: [shipPort],
  data() {
    return {
      loading: false,
      ruleForm: {
        id: null,
        arrivalTime: undefined,
        bearing: '',
        bearingName: '',
        downsideType: '',
        indexSort: undefined,
        name: '',
        portPinYin: '',
        upsideType: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入港口名称', trigger: 'blur' }
        ],
        indexSort: [
          { required: true, message: '请输入排序顺序', trigger: 'blur' }
        ],
        portPinYin: [
          { required: true, message: '请输入港口拼音', trigger: 'blur' }
        ],
        bearing: [
          { required: true, message: '请输入港口方位', trigger: 'blur' }
        ],
        bearingName: [
          { required: true, message: '请输入港口方位名称', trigger: 'blur'}
        ],
        arrivalTime: [
          { required: true, message: '请输入到达大坝时间（小时）', trigger: 'blur' }
        ],
        upsideType: [
          { required: true, message: '请输入上行港口分类', trigger: 'blur' }
        ],
        downsideType: [
          { required: true, message: '请输入下行港口分类', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type, item } = this.$route.query
    this.type = type
    if (id) {
      this.ruleForm = { ...item }
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存
    async saveData() {
      const dto = {
        ...this.ruleForm
      }
      if (dto.upsideType !== dto.downsideType) {
        this.$message.warning('上下行不能同时为始发港/到达港')
        return
      }
      this.loading = true
      const res = dto.id ? await updateInfo(dto) : await saveInfo(dto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/ship/port' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
    max-width: 600px;
}

.el-input-number {
    max-width: 600px;
}

.el-select {
    max-width: 600px;
}
</style>
