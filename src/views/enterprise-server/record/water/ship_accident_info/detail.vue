<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业重大事件备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="ruleForm.isStatus === 2 && isDisabled"
          type="primary"
          @click="isDisabled=false"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <el-row :gutter="20">
      <el-form
        ref="ruleForm"
        size="medium"
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        :disabled="isDisabled?true:false"
      >
        <el-col :span="8">
          <el-form-item label="企业名称:">
            <el-input
              v-model="ruleForm.enterpriseName"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="船舶名称:"
            prop="shipId"
          >
            <el-select
              v-model="ruleForm.shipId"
              placeholder="请选择船舶名称"
              style="width: 100%;"
              @change="shipChange"
            >
              <el-option
                v-for="item in shipList"
                :key="item.shipName"
                :label="item.shipName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="船舶营运证编号:">
            <el-input
              :value="shipLicenseNo"
              placeholder="船舶营运证编号"
              disabled
            />
          </el-form-item>
        </el-col>
        <div class="icon-title">
          <span class="span" /> 事故信息
        </div>
        <el-col :span="8">
          <el-form-item
            label="事故等级:"
            prop="accidentLevel"
          >
            <el-select
              v-model="ruleForm.accidentLevel"
              placeholder="请选择事故等级"
              style="width: 100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="事故描述:"
            style="width: 100%;"
            prop="accidentDesc"
          >
            <el-input
              v-model="ruleForm.accidentDesc"
              type="textarea"
              :rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入事故描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="事故原因:"
            style="width: 100%;"
            prop="accidentReason"
          >
            <el-input
              v-model="ruleForm.accidentReason"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入事故原因"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="备注:"
            style="width: 100%;"
            prop="remarks"
          >
            <el-input
              v-model="ruleForm.remarks"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-col>
        <div class="icon-title">
          <span class="span" />附件信息
        </div>
        <upload
          v-if="!isDisabled"
          style="width: 100%;"
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
        <common-table
          v-if="!isDisabled"
          :table-data="enclosureInfo"
          show-download
          show-delete
          @handleDelete="handleDelete"
        />
      </el-form>
    </el-row>
    <common-table
      v-if="isDisabled"
      :table-data="enclosureInfo"
      show-download
    />
    <div
      v-if="info.isStatus >= 2"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="审核状态">{{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}</el-descriptions-item>
        <el-descriptions-item label="审核人">{{ info.reviewedBy }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ info.reviewedDate }}</el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="3">
          {{ info.reviewedOpinion }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />审核附件
      </div>
      <common-table
        :table-data="info.reviewedFile"
        show-download
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="!isDisabled"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
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
import { addData, findById, updateData } from '@/api/water-transportation-services/information/ship-en-major-events-filing'
import { getShipEnShipList } from '@/api/water-transportation-services/information/enterprise-ship'
import { momentDate } from '@/utils/index'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        organizationName: '',
        shipId: '',
        accidentLevel: '',
        enterpriseName: '',
        enterpriseId: '',
        accidentDesc: '',
        remarks: '',
        accidentReason: '',
        isStatus: ''
      },
      rules: {
        shipId: [
          { required: true, message: '请选择船舶名称', trigger: 'change' }
        ]
      },
      loading: false,
      info: {},
      isDisabled: false,
      enclosureInfo: [],
      shipLicenseNo: '',
      shipList: [],
      options: [{
        value: 1,
        label: '特别重大'
      }, {
        value: 2,
        label: '重大'
      }, {
        value: 3,
        label: '较大'
      }, {
        value: 4,
        label: '一般'
      }]
    }
  },
  async mounted() {
    let enterpriseInfo = this.$store.getters.enterprise
    this.ruleForm.enterpriseName = enterpriseInfo.enterpriseName
    this.ruleForm.enterpriseId = enterpriseInfo.id
    this.ruleForm.organizationName = enterpriseInfo.organizationName
    // 通过id查询船舶
    const ship = await getShipEnShipList(enterpriseInfo.id)
    this.shipList = ship.data

    // 查询详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await findById(this.$route.query.id)
      this.ruleForm = {
        id: this.$route.query.id,
        organizationName: info.data.organizationName,
        shipId: info.data.shipId,
        accidentLevel: info.data.accidentLevel,
        enterpriseName: info.data.enterpriseName,
        enterpriseId: info.data.enterpriseId,
        accidentDesc: info.data.accidentDesc,
        remarks: info.data.remarks,
        accidentReason: info.data.accidentReason,
        isStatus: info.data.isStatus
      }
      try {
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      this.shipChange(info.data.shipId)
      this.enclosureInfo = info.data.enclosureInfo
      this.isDisabled = true
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.enclosureInfo.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.enclosureInfo.splice(val.index, 1)
    },
    // 获取编号
    shipChange(id) {
      this.shipList.forEach(item => {
        if (item.id === id) {
          this.shipLicenseNo = item.shipLicenseNo
        }
      })
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {

          return false
        }
      })
    },
    async save() {
      if (this.enclosureInfo.length > 5) {
        this.$message.warning('最多上传5个附件!')
        return
      }
      let data = { ...this.ruleForm }
      data.enclosureInfo = JSON.stringify(this.enclosureInfo)
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 30%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
}

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
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

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
