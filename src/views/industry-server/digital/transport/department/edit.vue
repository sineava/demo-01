<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增上报部门' : type === 'edit' ? '编辑上报部门' : '上报部门详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="上报部门:"
          prop="orgId"
        >
          <el-tree
            ref="tree"
            v-loading="loading"
            :data="orgList"
            show-checkbox
            :props="{ children: 'children', label: 'orgName' }"
            node-key="orgId"
            default-expand-all
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        :loading="loading"
        type="primary"
        size="medium"
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
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveInfo, getOrgList } from '@/api/channel-services/period/department'
export default {
  data() {
    return {
      type: '',
      orgList: [],
      loading: false,
      ruleForm: {
        contact: '',
        contactPhone: '',
        departmentId: '',
        departmentName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['token_str'])
  },
  created() {
    const { type } = this.$route.query
    this.type = type
    this.fetchOrg()
  },
  methods: {
    // 查询机构
    async fetchOrg() {
      this.loading = true
      const res = await getOrgList({ tokenStr: this.token_str })
      this.loading = false
      if (res.data && res.data.length) {
        const list = res.data.filter(item => item.orgCategory === '2')
        list.push({ orgId: 1280, orgCategory: '1', orgName: '重庆市港航海事中心', parentOrgId: 0, disabled: true })
        this.orgList = this.toTreeData(list, 0)
      }
    },
    // 组装树
    toTreeData(data, id) {
      return data.filter(item => item.parentOrgId === id).map(item => ({ ...item, children: this.toTreeData(data, item.orgId).length > 0 ? this.toTreeData(data, item.orgId) : null }))
    },
    // 提交
    submitForm() {
      let arr = this.$refs.tree.getCheckedKeys().filter(item => item !== 1280)
      if (!arr.length) {
        this.$message.warning('请选择区县机构')
      } else {
        arr = this.orgList[0] && this.orgList[0].children && this.orgList[0].children && this.orgList[0].children.filter(org => arr.includes(org.orgId)).map(({ orgContact, orgId, orgMobile, orgName }) => ({ contact: orgContact, contactPhone: orgMobile, departmentId: orgId, departmentName: orgName }))
        this.saveData(arr)
      }
    },
    // 保存数据
    async saveData(arr) {
      const res = await saveInfo(arr)
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>
