<template>
  <div>
    <div class="icon-title">
      <span class="span" />权限申请人信息
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
      <!-- <el-descriptions-item label="统一社会信用代码:" :span="2">
          <el-input v-if="isEdit" v-model="info.enterpriseBusinessInfoVo.certificateNo" placeholder="请输入统一社会信用代码">
            <el-button slot="append" icon="el-icon-search" @click="query" />
          </el-input>
          <span v-else>{{ info.enterpriseBusinessInfoVo.certificateNo }}</span>
        </el-descriptions-item> -->
      <el-descriptions-item label="姓名:">{{ userInfo.username }}</el-descriptions-item>
      <el-descriptions-item label="所属单位:">{{ userInfo.orgname }}</el-descriptions-item>
      <el-descriptions-item label="职务:">{{ ruleForm.post }}</el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />申请权限内容
    </div>
    <el-descriptions
      class="descriptions-span"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="权限申请描述:" :span="3">{{ ruleForm.applicationDescription }}</el-descriptions-item>
      <el-descriptions-item label="申请原因:" :span="3">{{ ruleForm.applicationReason }}</el-descriptions-item>
      <el-descriptions-item label="备注:" :span="3">{{ ruleForm.remarks }}</el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />申请材料
    </div>
    <FileTable
      :show-download="true"
      :table-data="fileList"
    />
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />权限申请受理信息
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        label="受理状态:"
        prop="isStatus"
      >
        <el-select
          v-if="type === 'detail'"
          v-model="ruleForm.isStatus"
          clearable
          placeholder="请选择"
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
        <el-radio-group
          v-else
          v-model="ruleForm.isStatus"
        >
          <el-radio
            :label="2"
            border
          >
            业务办理
          </el-radio>
          <el-radio
            :label="3"
            border
          >
            退回
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item
        v-if="ruleForm.isStatus !== 1"
        label="受理人:"
        prop="acceptorBy"
      >
        <el-input
          v-model="ruleForm.acceptorBy"
          :disabled="type === 'detail'"
          placeholder="请输入受理人"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.isStatus !== 1"
        label="受理时间:"
        prop="acceptorDate"
      >
        <el-date-picker
          v-model="ruleForm.acceptorDate"
          style="width: 100%"
          type="date"
          :disabled="type === 'detail'"
          placeholder="请选择受理时间"
        />
      </el-form-item> -->
      <el-form-item
        v-if="ruleForm.isStatus !== 1"
        label="受理意见:"
        prop="rejectReason"
        style="width: 100%;"
      >
        <el-input
          v-model="ruleForm.rejectReason"
          type="textarea"
          rows="6"
          :disabled="type === 'detail'"
          placeholder="请输入受理意见"
          maxlength="1000"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
      <el-button @click="back">
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import FileTable from '@/components/features/FileTable'
import { mapState } from 'vuex'
import { getAuthorityDetail, examineAuthority } from '@/api/system-portal/authority-application'
export default {
  components: {
    FileTable
  },
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {},
      fileList: [],
      isStatus: [
        { value: 1, label: '审核中' },
        { value: 2, label: '已审核' },
        { value: 3, label: '驳回' }
      ],
      rules: {
        applicationDescription: [
          { required: true, message: '请输入权限申请描述', trigger: 'blur' }
        ],
        applicationReason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.user_info[0]
    })
  },
  created() {
    const { id, type } = this.payload
    this.type = type
    if (id) { // 详情/编辑
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getAuthorityDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          materials: res.data.materials ? JSON.parse(res.data.materials) : []
        }
        this.fileList = this.ruleForm.materials
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleVerify()
        } else {

          return false
        }
      })
    },
    // 审核
    async handleVerify() {
      const examineDto = {
        id: this.ruleForm.id,
        isStatus: this.ruleForm.isStatus,
        rejectReason: this.ruleForm.rejectReason
      }
      examineAuthority(examineDto).then(res => {
        if (res.code === '0') {
          this.back()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    back() {
      this.$emit('playEnd')
    }
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 12%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 21.3%;
        line-height: 30px;
    }
}

.descriptions-span {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 12%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 88%;
        line-height: 30px;
    }
}
// .dataForm {
//   padding-left: 50px;
//   margin: 20px 0;

//   .form-title {
//     color: #5B5B5B;
//     font-size: 16px;
//     font-weight: 600;
//     margin: 36px 0 18px 0;
//   }

//   /deep/ .el-form-item__label {
//     color: #666666;
//     font-size: 14px;
//     font-weight: 400;
//   }

//   /deep/ .el-button--primary {
//     width: 150px;
//     height: 42px;
//   }
// }
</style>
