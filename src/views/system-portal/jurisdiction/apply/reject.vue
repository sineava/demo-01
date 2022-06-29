<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    width="800px"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="110px"
      size="medium"
    >
      <el-form-item
        label="驳回原因:"
        prop="rejectReason"
      >
        <el-input
          v-model="ruleForm.rejectReason"
          type="textarea"
          rows="6"
        />
      </el-form-item>
      <el-form-item class="backstage-edit-btn">
        <el-button
          type="primary"
          size="medium "
          @click="handleReject"
        >
          驳回
        </el-button>
        <el-button
          size="medium "
          @click="dialogVisible = false"
        >
          关闭
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { examineAuthority } from '@/api/system-portal/authority-application'
export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      ruleForm: {
        id: '',
        isStatus: 3, // 驳回
        rejectReason: ''
      }
    }
  },
  methods: {
    openReject(title, { id }) {
      this.dialogVisible = true
      this.title = title
      this.ruleForm.id = id
    },
    // 驳回
    handleReject() {
      const examineDto = {
        ...this.ruleForm
      }
      examineAuthority(examineDto).then(res => {
        if (res.code === '0') {
          this.close()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 关闭弹窗
    close() {
      this.dialogVisible = false
      this.$emit('playEnd')
    }
  }
}
</script>
