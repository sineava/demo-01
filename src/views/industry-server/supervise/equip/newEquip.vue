<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ detailId ? '修改装备' : '编辑装备' }}</span>
    </div>
    <div class="app-container newSystem-form">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        size="medium"
        style="width: 800px;"
      >
        <el-form-item
          label="装备名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" maxlength="50" placeholder="请输入装备名称" />
        </el-form-item>
        <el-form-item
          label="装备类型:"
          prop="type"
        >
          <el-input v-model.trim="ruleForm.type" maxlength="50" placeholder="请输入装备类型" />
        </el-form-item>
        <el-form-item
          label="装备所属部门:"
          prop="managementId"
        >
          <el-cascader
            v-model="ruleForm.managementId"
            style="width: 100%;"
            :options="options"
            clearable
            :props="{'label': 'departmentName', 'value': 'id', 'checkStrictly': true,expandTrigger: 'hover'}"
            :show-all-levels="false"
            collapse-tags
            peholder="不选默认顶级"
          />
        </el-form-item>
        <el-form-item
          label="装备数量:"
          prop="amount"
        >
          <el-input-number
            v-model="ruleForm.amount"
            :precision="0"
            :min="0"
            :max="999999"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="装备图片:"
          prop="fileList"
        >
          <upload
            :file-list="fileList"
            :limit="5"
            multiple
            @fileSuccess="uploadSuccess"
            @remove="uploadRemove"
          />
        </el-form-item>
        <el-form-item class="backstage-edit-btn">
          <el-button
            type="primary"
            size="medium "
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
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import upload from '@/components/upload'
import { toTreeData } from '@/utils/index'
import { getManagementDepartmentLikeName } from '@/api/general-services/supervisory-capability/management-department'
import { saveEquipment, updateEquipment, getDetail } from '@/api/general-services/supervisory-capability/equipment'
export default {
  components: {
    upload
  },
  data() {
    return {
      options: [], // 部门列表
      manageOptions: [], // 管理人列表
      fileList: [],
      loading:false,
      ruleForm: {
        amount: undefined,
        id: 0,
        managementId: [],
        name: '',
        type: ''
      },
      detailId: '',
      rules: {
        name: [
          { required: true, message: '请输入装备名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择装备类型', trigger: 'blur' }
        ],
        managementId: [
          { required: true, message: '请选择装备所属部门', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入装备数量', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 查询部门树形数据
    this.fetchDepts()
    const detailId = this.$route.query.id
    this.detailId = detailId
    // 查询详情
    if (detailId !== 0) this.fetchData(detailId)
  },
  methods: {
    // 查询部门机构信息
    async fetchDepts() {
      const res = await getManagementDepartmentLikeName({ departmentName: '',flag: this.type === 'detail' })
      this.options = toTreeData(res.data)
    },
    // 查询监管装备详情
    async fetchData(detailId) {
      const res = await getDetail({ id: detailId })
      if (res.data) {
        const {
          amount,
          id,
          managementId,
          name,
          type,
          filePath
        } = res.data
        this.ruleForm = {
          amount,
          id,
          managementId: typeof managementId === 'number' ? managementId : managementId[managementId.length - 1],
          name,
          type,
          filePath,
        }
        // 组装图片数据
        this.fileList = filePath ? JSON.parse(filePath).map(file => ({ url: file })) : []
      }
    },
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
    // 保存数据
    async saveData() {
      const filePath = this.fileList ? this.fileList.map(({ url }) => url) : ''
      const managementId = this.ruleForm.managementId[this.ruleForm.managementId.length - 1]
      const equipmentInfoDto = {
        ...this.ruleForm,
        filePath: JSON.stringify(filePath),
        managementId
      }
      const res = this.detailId ? await updateEquipment(equipmentInfoDto) : await saveEquipment(equipmentInfoDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        uid: file.uid,
        url: file.response.data
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/supervise/equip' })
    },
  }
}
</script>
<style lang="scss" scoped>
.newSystem-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-textarea__inner {
        width: 700px;
        height: 120px;
        resize: none;
    }

    .el-form-item {
        margin-left: 100px;
    }
}
</style>
