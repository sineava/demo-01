<template>
  <div class="body-card">
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />企业制度信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        size="medium"
        disabled
        class="three-column-input-table"
        label-width="140px"
      >
        <el-form-item
          label="企业名称:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="文件名称:"
          prop="fileName"
        >
          <el-input
            v-model.trim="ruleForm.fileName"
            placeholder="请输入文件名称"
            maxlength="100"
          />
        </el-form-item>
        <el-form-item
          label="制度类型:"
          prop="systemType"
        >
          <el-select
            v-model="ruleForm.systemType"
            clearable
            placeholder="请选择制度类型"
            style="width: 100%;"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="编制部门:"
          prop="organizationId"
        >
          <el-input
            v-model.trim="ruleForm.organizationName"
            placeholder="编制部门"
            maxlength="50"
          />
          <!-- <el-cascader
            v-model="ruleForm.organizationId"
            style="width: 100%;"
            :options="departmentList"
            clearable
            :props="{'label': 'organizationName', 'value': 'id', 'checkStrictly': true}"
            :show-all-levels="false"
            placeholder="请选择编制部门"
          /> -->
        </el-form-item>
        <el-form-item
          label="编制负责人"
          prop="directorName"
        >
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请输入编制负责人"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="phone"
        >
          <el-input
            v-model.trim="ruleForm.phone"
            maxlength="11"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item
          label="文件页数:"
          prop="fileTotalPages"
        >
          <el-input
            v-model.trim="ruleForm.fileTotalPages"
          />
        </el-form-item>
        <el-form-item
          label="有效期至:"
          prop="expiryEndDate"
        >
          <el-date-picker
            v-model="ruleForm.expiryDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />文件上传/下载
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="enterpriseSystemEnclosureInfoDtoList"
        border
        style="margin-top: 10px;"
      >
        <el-table-column
          prop="fileName"
          label="文件名"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="size"
          label="大小"
          align="center"
        >
          <template v-slot="scope">
            <span>{{ parseInt(scope.row.size)/1024 > 100 ? (parseInt(scope.row.size)/1024).toFixed(2) + 'MB' : scope.row.size + 'KB' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="上传时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="60"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDownload(scope.row)"
            >
              <em class="el-icon-download" /> 下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { findById, addSystemInfo, editSystemInfo } from '@/api/general-services/enterpriseInfo/enterpriseBasic'
// import { findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
import { momentDate, downloadCodeImg } from '@/utils/index'
export default {
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      enterpriseName: '',
      ruleForm: {
        id: '',
        enterpriseId: '',
        fileName: '',
        systemType: '',
        phone: '',
        organizationId: '',
        directorName: '',
        fileTotalPages: '',
        expiryDate: ''
      },
      type: [
        { value: '1', label: '人力资源管理制度' },
        { value: '2', label: '安全管理制度' },
        { value: '3', label: '财务管理制度' },
        { value: '4', label: '行政管理制度' },
        { value: '5', label: '物资管理制度' },
        { value: '6', label: '生产经营管理制度' },
        { value: '7', label: '销售管理制度' },
        { value: '8', label: '质量管理制度' }
      ],
      departmentList: [],
      enterpriseSystemEnclosureInfoDtoList: []
    }
  },
  async mounted() {
    /*
     *  查询企业组织机构 树结构信息
     * const obj = await findByEnOrganizationList()
     */
    this.departmentList = []// obj.data
    if (this.objData && this.objData.id) {
      // 通过ID查询企业制度详情
      const info = await findById(this.objData.id)
      this.ruleForm = {
        id: this.objData.id,
        enterpriseId: info.data.enterpriseId,
        fileName: info.data.fileName,
        systemType: String(info.data.systemType),
        phone: info.data.phone,
        organizationId: info.data.organizationId,
        directorName: info.data.directorName,
        fileTotalPages: info.data.fileTotalPages,
        organizationName:info.data.organizationName,
        expiryDate: [info.data.expiryStartDate, info.data.expiryEndDate]
      }
      this.enterpriseName = info.data.enterpriseName
      this.enterpriseSystemEnclosureInfoDtoList = info.data.enterpriseSystemEnclosureInfoVoList
      this.enterpriseSystemEnclosureInfoDtoList.forEach(item => {
        item.date = item.createTime
      })
    }
  },
  methods: {
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.enterpriseSystemEnclosureInfoDtoList.push({
        path: file.response.data,
        fileName: file.name,
        size: parseInt(file.size / 1024),
        date: momentDate(Date.now())
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
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    async saveSubmit() {
      const data = { ...this.ruleForm }
      data.organizationId = data.organizationId.length > 0 ? data.organizationId[data.organizationId.length - 1] : data.organizationId
      if (data.expiryDate.length > 0) {
        data.expiryStartDate = momentDate(data.expiryDate[0], 'YYYY-MM-DD')
        data.expiryEndDate = momentDate(data.expiryDate[1], 'YYYY-MM-DD')
      }
      delete data.expiryDate
      data.enterpriseSystemEnclosureInfoDtoList = []
      this.enterpriseSystemEnclosureInfoDtoList.forEach(item => {
        data.enterpriseSystemEnclosureInfoDtoList.push({
          fileName: item.fileName,
          path: item.path,
          size: item.size
        })
      })
      const res = this.ruleForm.id ? await editSystemInfo(data) : await addSystemInfo(data)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 关闭
    returnBack() {
      this.$emit('join', { name: '制度信息', data: { }})
    },
    // 删除
    handleDelete(index) {
      this.enterpriseSystemEnclosureInfoDtoList.splice(index, 1)
    },
    // 下载
    handleDownload(item) {
      downloadCodeImg(item.path)
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

            .quill-editor /deep/ .ql-container {
                height: 200px;
            }
        }
    }
}
</style>
