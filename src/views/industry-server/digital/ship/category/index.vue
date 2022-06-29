<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>船舶分类</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="船舶种类名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入船舶种类名称"
          />
        </el-form-item>
        <el-form-item
          label="种类归属:"
          prop="kind"
        >
          <el-select
            v-model="searchForm.kind"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_kind"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否商船:"
          prop="isMerchantShip"
        >
          <el-select
            v-model="searchForm.isMerchantShip"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_isMerchantShip"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否允许多次申报:"
          prop="isManyTimesDeclare"
        >
          <el-select
            v-model="searchForm.isManyTimesDeclare"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_isManyTimesDeclare"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="优先级:"
          prop="priority"
        >
          <el-select
            v-model="searchForm.priority"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_priority"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('searchForm')"
          >
            重置
          </el-button>
          <el-button
            v-if="button_roles.create"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="handleEdit('add')"
          >
            新增船舶分类
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
        <el-table-column label="船舶种类名称">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="种类归属">
          <template v-slot="scope">
            {{ scope.row.kind && field_kind.find(x => x.value === scope.row.kind).label }}
          </template>
        </el-table-column>
        <el-table-column label="是否商船">
          <template v-slot="scope">
            {{ scope.row.isMerchantShip === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="允许多次申报">
          <template v-slot="scope">
            {{ scope.row.isManyTimesDeclare === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template v-slot="scope">
            {{ scope.row.priority && field_priority.find(x => x.value === scope.row.priority).label }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="small"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="small"
              type="primary"
              :disabled="scope.row.havePush > 0"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="small"
              type="danger"
              :disabled="scope.row.havePush > 0"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 删除
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
import { mapGetters } from 'vuex'
import { shipCategory } from '@/utils/public-fields'
import { getPageList, deleteInfo } from '@/api/channel-services/ship/ship-type'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  mixins: [shipCategory],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        kind: '',
        isMerchantShip: '',
        isManyTimesDeclare: '',
        priority: ''
      }
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    async fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
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
     * 详情/编辑/新增
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/digital/ship/categoryEdit', query: { type, id: item ? item.id : null, item: item }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    }
  }
}
</script>
