<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增船舶分类' : type === 'edit' ? '编辑船舶分类' : '船舶分类详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="type === 'detail' ? {} : rules"
        label-width="160px"
        size="medium"
        class="table-column two"
        :disabled="type === 'detail'"
        style="width: 80%;"
      >
        <el-form-item
          label="船舶种类名称:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            maxlength="100"
            placeholder="请输入船舶种类名称"
          />
        </el-form-item>
        <el-form-item
          label="种类归属:"
          prop="kind"
        >
          <el-select
            v-model="ruleForm.kind"
            clearable
            placeholder="请选择种类归属"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_kind"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否商船:"
          prop="isMerchantShip"
        >
          <el-select
            v-model="ruleForm.isMerchantShip"
            clearable
            placeholder="请选择是否商船"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_isMerchantShip"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否允许多次申报:"
          prop="isManyTimesDeclare"
        >
          <el-select
            v-model="ruleForm.isManyTimesDeclare"
            clearable
            placeholder="请选择是否允许多次申报"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_isManyTimesDeclare"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="优先级:"
          prop="priority"
        >
          <el-select
            v-model="ruleForm.priority"
            clearable
            placeholder="请选择优先级"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_priority"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :disabled="loading"
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
import { shipCategory } from '@/utils/public-fields'
import { saveInfo, updateInfo } from '@/api/channel-services/ship/ship-type'
export default {
  mixins: [shipCategory],
  data() {
    return {
      loading: false,
      ruleForm: {
        id: null,
        isManyTimesDeclare: '',
        isMerchantShip: '',
        kind: '',
        name: '',
        priority: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入船舶种类名称', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请选择种类归属', trigger: 'blur' }
        ],
        isMerchantShip: [
          { required: true, message: '请选择是否商船', trigger: 'blur' }
        ],
        isManyTimesDeclare: [
          { required: true, message: '请选择是否允许多次申报', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '请选择优先级', trigger: 'blur' }
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
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      const dto = {
        ...this.ruleForm
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
      this.$router.push({ path: '/digital/ship/category' })
    }
  }
}
</script>
