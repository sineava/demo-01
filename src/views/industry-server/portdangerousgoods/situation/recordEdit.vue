<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增危险货物存量' : type === 'edit' ? '编辑危险货物存量' : '危险货物存量详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        style="width: 40%;"
        class="table-column one"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="危险品名称:"
          prop="dangerousGoodsName"
        >
          <el-input
            v-model.trim="ruleForm.dangerousGoodsName"
            :disabled="stockNum !== 0"
          />
        </el-form-item>
        <el-form-item
          label="危险品种类:"
          prop="dangerousGoodsType"
        >
          <el-select
            v-model="ruleForm.dangerousGoodsType"
            clearable
            placeholder="请选择"
            style="width: 100%;"
            :disabled="stockNum !== 0"
          >
            <el-option
              v-for="item in dangerousGoodsType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="当前存量:">
          <el-input
            :value="stockNum"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="危险品进出方式:"
          prop="mode"
        >
          <el-input
            :value="ruleForm.mode===1?'进':(ruleForm.mode===2?'出':'')"
          />
        </el-form-item>
        <el-form-item
          label="作业量:"
          prop="taskNum"
        >
          <el-input
            :value="ruleForm.taskNum"
          />
        </el-form-item>
        <el-form-item
          label="记录人:"
          prop="recordBy"
        >
          <el-input v-model.trim="ruleForm.recordBy" />
        </el-form-item>
        <el-form-item
          label="记录时间:"
          prop="recordTime"
        >
          <el-date-picker
            v-model="ruleForm.recordTime"
            type="datetime"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
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
import { momentDate } from '@/utils/index'
import { dangerGoods } from '@/utils/public-fields'
import { getGoods, addGoods, getDetail } from '@/api/port-services/danger-goods/dangerous-goods-record'
export default {
  mixins: [dangerGoods],
  data() {
    return {
      ruleForm: {
        dangerousGoodsName: '',
        dangerousGoodsType: '',
        id: null,
        mode: '',
        recordBy: '',
        recordTime: new Date(),
        stockEquipmentId: '',
        taskNum: 0
      },
      rules: {
        dangerousGoodsName: [
          { required: true, message: '请输入危险品名称', trigger: 'blur' }
        ],
        dangerousGoodsType: [
          { required: true, message: '请选择危险品种类', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择危险品进出方式', trigger: 'blur' }
        ],
        taskNum: [
          { required: true, message: '请输入作业量', trigger: 'blur' }
        ],
        recordBy: [
          { required: true, message: '请输入记录人', trigger: 'blur' }
        ],
        recordTime: [
          { required: true, message: '请输入记录时间', trigger: 'blur' }
        ]
      },
      portAreaVoList: [],
      stockNum: 0
    }
  },
  created() {
    const { type, id, stockEquipmentId } = this.$route.query
    this.type = type
    this.stockEquipmentId = stockEquipmentId
    if (id) {
      this.fetchDetail(id)
    }
    this.fetchInfo(stockEquipmentId)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = { ...res.data }
      })
    },
    // 查询存量信息
    async fetchInfo(stockEquipmentId) {
      getGoods({ id: stockEquipmentId }).then(res => {
        this.ruleForm.dangerousGoodsName = res.data ? res.data.dangerousGoodsName : ''
        this.ruleForm.dangerousGoodsType = res.data ? res.data.dangerousGoodsType : ''
        this.stockNum = res.data ? res.data.stockNum : ''
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
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 保存数据
    saveData() {
      const dangerousGoodsRecordInfoDto = {
        ...this.ruleForm,
        recordTime: momentDate(this.ruleForm.recordTime),
        stockEquipmentId: this.stockEquipmentId
      }
      addGoods(dangerousGoodsRecordInfoDto).then(res => {
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理改变
    handleChange() {
      this.ruleForm.taskNum = 0
    }
  }
}
</script>
