<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急演练情况查询</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="演习名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入演习名称"
          />
        </el-form-item>
        <el-form-item
          label="演习类型:"
          prop="actingType"
        >
          <el-input
            v-model.trim="searchForm.actingType"
            placeholder="请输入演习类型"
          />
        </el-form-item>
        <el-form-item
          label="演习地点:"
          prop="actualAddress"
        >
          <el-input
            v-model.trim="searchForm.actualAddress"
            placeholder="请输入演习地点"
          />
        </el-form-item>
        <el-form-item
          label="填报人:"
          prop="actualInformant"
        >
          <el-input
            v-model.trim="searchForm.actualInformant"
            placeholder="请输入填报人"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="actualInformantPhone"
        >
          <el-input
            v-model.trim="searchForm.actualInformantPhone"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item label="演习时间:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
        </el-form-item>
      </el-form>
      <div style="display: flex;">
        <el-button
          v-if="button_roles.create"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit('add')"
        >
          新建应急演练情况
        </el-button>
      </div>
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
          align="center"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所属管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="演习名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="演习类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actingType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="演习地点" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualInformant }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualInformantPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="演习开始日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualStartTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="演练时长（h）" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualDays }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.actualFillInTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleEdit('info', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-info" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
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
import { momentDate } from '@/utils/index'
import { getPageList, deleteExercise } from '@/api/emergency-services/exercise-case'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      searchForm: {
        name: '',
        actingType: '',
        actualAddress: '',
        actualInformant: '',
        actualInformantPhone: '',
        screenStartTime: '',
        screenEndTime: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59'),
        name:this.searchForm.name || '',
        actingType:this.searchForm.actingType || '',
        actualAddress:this.searchForm.actualAddress || '',
        actualInformant:this.searchForm.actualInformant || '',
        actualInformantPhone:this.searchForm.actualInformantPhone || '',
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
      this.screenTime = []
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
     * 新增/编辑
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/emergency/data/situationEdit', query: { id: item ? item.id : null, oper:type }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteExercise({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    }
  }
}
</script>

