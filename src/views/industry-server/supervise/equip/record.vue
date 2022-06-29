<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="监管装备维修记录" />
      </span>
    </div>
    <div class="basic-detail">
      <el-table
        :data="tableData"
        stripe
        fit
        border
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          prop="name"
          label="编号"
          align="center"
          width="60"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="装备名称"
          align="center"
        >
          {{ name }}
        </el-table-column>
        <el-table-column
          prop="size"
          label="损坏方式"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.type === 0 ? '人为' : '自然' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="报修人"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.fillPerson }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="送修人"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.sendPerson }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="维修金额"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="送修时间"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.sendTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="填报时间"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.fillTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="filePath"
          label="维修票据"
          align="center"
          width="310"
        >
          <template v-slot="scope">
            <div style="display: flex; flex-wrap: wrap;">
              <Images
                v-for="(item, index) in JSON.parse(scope.row.filePath)"
                :key="index"
                :ref="`images${index}`"
                height="40px"
                style="margin: 0 10px 10px 0;"
                fit="cover"
                :url="item"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-if="isMine"
        class="icon-title"
        style="margin-top: 20px;"
      >
        <span class="span" />新增维修记录
      </div>
      <div class="app-container equip-detail-form">
        <el-form
          v-if="isMine"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          size="medium"
          class="table-column one"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="报修人:"
                prop="fillPerson"
              >
                <el-input v-model.trim="ruleForm.fillPerson" placeholder="请输入报修人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="送修人:"
                prop="sendPerson"
              >
                <el-input v-model.trim="ruleForm.sendPerson" placeholder="请输入送修人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="损坏方式:"
                prop="type"
              >
                <el-radio-group v-model="ruleForm.type">
                  <el-radio :label="1">
                    自然
                  </el-radio>
                  <el-radio :label="0">
                    人为
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="送修时间:"
                prop="sendTime"
              >
                <el-date-picker
                  v-model="ruleForm.sendTime"
                  type="date"
                  placeholder="选择送修时间"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="维修金额:"
                prop="money"
              >
                <el-input-number
                  v-model="ruleForm.money"
                  :precision="2"
                  :min="0"
                  style="width: 100%;"
                  placeholder="请输入维修金额"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="填报时间:"
                prop="fillTime"
              >
                <el-date-picker
                  v-model="ruleForm.fillTime"
                  type="date"
                  placeholder="选择填报时间"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="维修票据:"
                prop="file"
              >
                <upload
                  :file-list="fileList"
                  :limit="9"
                  multiple
                  @beforeUpload="beforeUpload"
                  @fileSuccess="uploadSuccess"
                  @error="uploadError"
                  @remove="uploadRemove"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="backstage-edit-btn">
          <el-button
            v-if="isMine"
            type="primary"
            size="medium "
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
      </div>
    </div>
  </el-card>
</template>
<script>
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import { selectMaintenanceRecords, deleteMaintenanceRecord, saveMaintenanceRecord } from '@/api/general-services/supervisory-capability/equipment'
import Images from '@/components/images'
export default {
  components: {
    upload,
    Images
  },
  data() {
    return {
      isMine: '',
      name: '',
      fileList: [],
      ruleForm: {
        equipmentId: '',
        fillPerson: '',
        fillTime: '',
        id: '', // 新增
        money: undefined,
        sendPerson: '',
        sendTime: '',
        type: '',
        filePath: ''
      },
      tableData: [],
      rules: {
        fillPerson: [
          { required: true, message: '请输入报修人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10个字符姓名', trigger: 'blur' }
        ],
        sendPerson: [
          { required: true, message: '请输入送修人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10个字符姓名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择损坏方式', trigger: 'blur' }
        ],
        sendTime: [
          { required: true, message: '请选择送修时间', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入维修金额', trigger: 'blur' }
        ],
        fillTime: [
          { required: true, message: '请选择填报时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, name, isMine } = this.$route.query
    this.fetchData(id)
    this.isMine = isMine
    this.name = name // 装备名称
    this.ruleForm.equipmentId = id // 装备编号
  },
  methods: {
    // 查询监管装备记录详情
    async fetchData(id) {
      selectMaintenanceRecords({ id }).then(res => {
        this.tableData = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    async saveData() {
      const filePath = this.fileList ? this.fileList.map(({ url }) => url) : ''
      const equipmentInfoDto = {
        ...this.ruleForm,
        sendTime: momentDate(this.ruleForm.sendTime, 'YYYY-MM-DD'),
        fillTime: momentDate(this.ruleForm.fillTime, 'YYYY-MM-DD'),
        equipmentId: Number.parseInt(this.ruleForm.equipmentId),
        filePath: JSON.stringify(filePath)
      }
      delete equipmentInfoDto.id
      saveMaintenanceRecord(equipmentInfoDto).then(res => {
        if (res.code === '0') {
          this.ruleForm = {
            equipmentId: this.ruleForm.equipmentId,
            fillPerson: '',
            fillTime: '',
            id: '', // 新增
            money: undefined,
            sendPerson: '',
            sendTime: '',
            type: '',
            filePath: ''
          }
          this.fetchData(this.ruleForm.equipmentId)
          this.$message.success('新增成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        uid: file.uid,
        url: file.response.data
      })
    },
    // 文件上传失败时的钩子
    uploadError(err) {
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/supervise/equip' })
    },
    // 删除维修信息
    handleDelete(index, item) {
      deleteMaintenanceRecord({ id: item.id }).then(res => {
        if (res.code === '0') {
          this.$message.success('删除成功!')
          this.fetchData(this.ruleForm.equipmentId)
        } else {
          this.$message.error(res.message)
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
        border: 1px solid #ebeef5;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            border-top: 1px solid #ebeef5;
            border-right: 1px solid #ebeef5;
            padding: 10px 0;
            width: 33.3%;
            background-color: #ffffff;
        }
    }
}
</style>
