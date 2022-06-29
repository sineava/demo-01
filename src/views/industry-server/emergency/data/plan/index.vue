<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急预案管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="预案名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入预案名称"
          />
        </el-form-item>
        <el-form-item
          label="响应级别:"
          prop="responseLevel"
        >
          <el-select
            v-model="searchForm.responseLevel"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_responseLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="预案类型:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发布状态:"
          prop="state"
        >
          <el-select
            v-model="searchForm.state"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间:">
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
          @click="handleAdd('add')"
        >
          新增应急预案
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
        >
          <template v-slot="scope">
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="预案名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预案类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.type && field_type.filter(item => (item.value === scope.row.type))[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="响应级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.responseLevel && field_responseLevel.filter(item => (item.value === scope.row.responseLevel))[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应急通讯对象" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.emergencyCommunicationObject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.contactPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布状态"
          width="80"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span>{{ scope.row.state && field_state.filter(item => (item.value === scope.row.state))[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.release || button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.release ? 95 : 0) + (button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.release"
              :disabled="scope.row.state === 2"
              size="mini"
              plain
              @click="handlePost(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 发布
            </el-button>
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleAdd('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 删除
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
import { emergencyPlan } from '@/utils/public-fields'
import { getHyPageList, deletePlan, releasePlan } from '@/api/emergency-services/response-plan'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  mixins: [emergencyPlan],
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
        responseLevel: '',
        type: '',
        state: ''
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
      getHyPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:58:59'),
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
     * 新建/编辑应急预案
     */
    handleAdd(type, item) {
      this.$router.push({ path: '/emergency/data/planAdd', query: { type, id: item ? item.id : null }})
    },
    /**
     * 发布
     */
    handlePost(_, item) {
      releasePlan({ id: item.id }).then(res => {
        if (res.code === '0') {
          this.$message.success('发布成功!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 详情
     */
    handleDetail(_, item) {
      this.$router.push({ path: '/emergency/data/planDetail', query: { id: item.id }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deletePlan({ id: item.id }).then(res => {
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

