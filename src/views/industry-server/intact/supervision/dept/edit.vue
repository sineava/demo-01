<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门机构详情</span>
    </div>
    <div class="app-container mdept-container">
      <div class="icon-title">
        <span class="span" />部门信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="110px"
        size="medium"
        class="mdept-form"
        disabled
      >
        <el-form-item
          label="机构名称:"
          prop="departmentName"
        >
          <el-input v-model.trim="ruleForm.departmentName" />
        </el-form-item>
        <el-form-item
          label="主管人员:"
          prop="directorName"
        >
          <el-input v-model.trim="ruleForm.directorName" />
        </el-form-item>
        <el-form-item
          label="所属上级部门:"
          prop="parentId"
        >
          <el-cascader
            v-model="ruleForm.parentId"
            :options="treeData"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            clearable
            style="width: 100%;"
            :show-all-levels="false"
            placeholder="不选默认顶级部门"
          />
        </el-form-item>
        <el-form-item
          label="通信地址:"
          prop="mailingAddress"
        >
          <el-input v-model.trim="ruleForm.mailingAddress" />
        </el-form-item>
        <el-form-item
          label="邮政编码:"
          prop="zipCode"
        >
          <el-input v-model.trim="ruleForm.zipCode" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="phone"
        >
          <el-input v-model.trim="ruleForm.phone" />
        </el-form-item>
        <el-form-item
          label="传真:"
          prop="fax"
        >
          <el-input v-model.trim="ruleForm.fax" />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="state"
        >
          <el-radio-group v-model="ruleForm.state">
            <el-radio :label="0">
              禁用
            </el-radio>
            <el-radio :label="1">
              启用
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="备注:"
          prop="remarks"
        >
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          label="部门描述:"
          prop="introduce"
        >
          <el-input
            v-model.trim="ruleForm.introduce"
            type="textarea"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <el-table
        :data="ruleForm.persons"
        border
        class="detail-table"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="post"
          align="center"
          label="职务"
        />
        <el-table-column
          prop="phone"
          align="center"
          label="手机"
        />
        <el-table-column
          prop="email"
          align="center"
          label="电子邮箱"
        />
        <el-table-column
          prop="obligation"
          align="center"
          label="职责信息"
          min-width="200"
        />
      </el-table>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getManagementDepartmentById } from '@/api/general-services/supervisory-capability/management-department'
export default {
  data() {
    return {
      type: '',
      ruleForm: {}
    }
  },
  created() {
    const { id, type, treeData } = this.$route.query
    this.type = type
    this.treeData = treeData
    this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      const res = await getManagementDepartmentById({ id })
      this.ruleForm = res.data
    }
  }
}
</script>
