<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>管理部门监管装备</span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="装备名称:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入装备名称"
          />
        </el-form-item>
        <el-form-item
          label="装备类型:"
          prop="type"
        >
          <el-input
            v-model.trim="ruleForm.type"
            placeholder="请输入装备类型"
          />
        </el-form-item>
        <el-form-item
          label="所属部门:"
          prop="departmentName"
        >
          <el-input
            v-model.trim="ruleForm.departmentName"
            placeholder="请输入所属部门"
          />
        </el-form-item>
        <el-form-item
          label="管理人:"
          prop="personName"
        >
          <el-input
            v-model.trim="ruleForm.personName"
            placeholder="请输入管理人"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="personPhone"
        >
          <el-input
            v-model.trim="ruleForm.personPhone"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="submitForm('ruleForm')"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('ruleForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="装备名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="装备类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属部门"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.managementName }}
          </template>
        </el-table-column>
        <el-table-column label="管理人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.personName }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.personPhone }}
          </template>
        </el-table-column>
        <el-table-column
          label="维修记录"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleRecord(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
          min-width="100px"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.createTime.replace('T', ' ') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
  </el-card>
</template>
<script>
import { getEquipList } from '@/api/general-services/intact'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      treeData: [],
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      ruleForm: {
        departmentName: '',
        name: '',
        type: '',
        personName: '',
        personPhone: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.ruleForm,
        managementId: this.ruleForm.managementId ? this.ruleForm.managementId[this.ruleForm.managementId.length - 1] : null,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getEquipList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleRecord(item) {
      this.$router.push({ path: '/intact/supervision/equipment/record', query: { id: item.id, name: item.name }})
    },
    handleDetail(item) {
      this.$router.push({ path: '/intact/supervision/equipment/detail', query: { id: item.id }})
    }
  }

}
</script>
