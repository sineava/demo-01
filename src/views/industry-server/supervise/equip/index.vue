<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>监管装备</span>
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="newEquipment"
      >
        新增监管装备
      </el-button>
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
          width="60"
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
        <el-table-column label="所属部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.managementName }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="管理人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.personName }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.personPhone }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="维修记录"
          width="120"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleRecord(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 维修记录
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
          :show-overflow-tooltip="true"
          prop="createTime"
        />
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 80 : 0) + (button_roles.delete ? 80 : 0) + (button_roles.desc ? 80 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
            >
              详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
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
import { getPageList, deleteEquipmentById } from '@/api/general-services/supervisory-capability/equipment'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
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
        type: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    console.log(this.button_roles)
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const queryInfo = {
        ...this.ruleForm,
        managementId: this.ruleForm.managementId ? this.ruleForm.managementId[this.ruleForm.managementId.length - 1] : null,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getPageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.fetchData()
        } else {

          return false
        }
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 新增
     */
    newEquipment() {
      this.$router.push({ path: '/supervise/newEquip', query: { id: 0 }})
    },
    /**
     * 编辑
     */
    handleEdit(index, item) {
      this.$router.push({ path: '/supervise/newEquip', query: { id: item.id }})
    },
    /**
     * 维修记录详情
     */
    handleRecord(index, item) {
      this.$router.push({ path: '/supervise/equipRecord', query: { id: item.id, name: item.name, isMine: this.button_roles.update || this.button_roles.create ? true : false }})
    },
    /**
     * 详情
     */
    handleDetail(index, item) {
      this.$router.push({ path: '/supervise/equipDetail', query: { id: item.id }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteEquipmentById({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    }
  }

}
</script>

