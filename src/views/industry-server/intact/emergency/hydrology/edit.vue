<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增水文信息' : type === 'edit' ? '编辑水文信息' : '水文信息详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="选择日期:"
          prop="operationDate"
        >
          <el-date-picker
            v-model="ruleForm.operationDate"
            type="date"
            placeholder="请选择日期"
            style="width: 100%;"
            :disabled="type !== 'add'"
          />
        </el-form-item>
        <template v-if="ruleForm.operationDate && show">
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <Hydrology
              ref="hydrology"
              :date="date"
              :payload="type"
            />
          </el-form-item>
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <div class="icon-title">
              <span class="span" />主要航电枢纽
            </div>
          </el-form-item>
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <Avionics
              ref="avionics"
              :date="date"
              :payload="type"
            />
          </el-form-item>
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <div class="icon-title">
              <span class="span" />主洪峰预报
            </div>
          </el-form-item>
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <Forecast
              ref="forecast"
              :date="date"
              :show-add="type !== 'detail'"
              :show-option="type !== 'detail'"
              :payload="type"
            />
          </el-form-item>
          <el-form-item
            v-if="type !== 'detail'"
            label="上传文件:"
            prop="filePath"
            style="width: 100%;"
          >
            <upload
              file
              :show-file-list="false"
              :file-list="fileList"
              :limit="5"
              @fileSuccess="success"
            />
          </el-form-item>
          <el-form-item
            label-width="0"
            style="width: 100%;"
          >
            <FileTable
              :show-download="type !== 'add'"
              :show-delete="type !== 'detail'"
              :table-data="fileList"
              @handleDelete="handleDelete"
            />
          </el-form-item>
        </template>
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
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import Hydrology from './components/Hydrology'
import Avionics from './components/Avionics'
import Forecast from './components/Forecast'
import { saveEntity, isExist, queryDetail, updateById } from '@/api/emergency-services/hydrological'
export default {
  components: {
    upload,
    FileTable,
    Hydrology,
    Avionics,
    Forecast
  },
  data() {
    return {
      date: '',
      fileList: [],
      type: '',
      ruleForm: {
        id: null,
        operationDate: ''
      },
      show: false
    }
  },
  watch: {
    'ruleForm.operationDate': function(newVal, _) {
      this.date = momentDate(newVal, 'YYYY-MM-DD')
      if (this.type === 'add') {
        this.fetchExist(this.date)
      }
    }
  },
  mounted() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) {
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = { ...res.data }
        this.show = true // 需要放在table前面
        this.$nextTick(() => {
          const watersTable = res.data.watersDateVoList
          const powersTbale = res.data.navigationPowerJunctionDateVoList
          const forecastsTable = res.data.floodForecastVoList
          if (watersTable) this.$refs.hydrology.updateTable(watersTable)
          if (powersTbale) this.$refs.avionics.updateTable(powersTbale)
          if (forecastsTable) this.$refs.forecast.updateTable(forecastsTable)
          this.fileList = res.data.filePath ? JSON.parse(res.data.filePath) : []
        })
      })
    },
    // 判断日期是否存在数据
    async fetchExist(date) {
      this.show = false
      isExist({ time: date }).then(res => {
        if (res.data === false) { // 当前日期不存在数据,可以新增
          this.show = true
        } else {
          this.show = false
          if (res.data === true) {
            this.$message({
              showClose: true,
              message: '当前日期存在水文信息,请更换日期',
              type: 'warning'
            })
          }
        }
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
    // 保存数据
    async saveData() {
      const watersDateDtoList = this.$refs.hydrology.getTableData()
      const navigationPowerJunctionDateDtoList = this.$refs.avionics.getTableData()
      const floodForecastDtoList = this.$refs.forecast.getTableData()
      const dto = {
        id: this.ruleForm.id,
        operationDate: this.date,
        watersDateDtoList,
        navigationPowerJunctionDateDtoList,
        floodForecastDtoList,
        filePath: this.fileList.length ? JSON.stringify(this.fileList) : ''
      }
      delete dto.updateTime
      const res = dto.id ? await updateById(dto) : await saveEntity(dto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // hook:文件上传成功
    success(file) {
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
