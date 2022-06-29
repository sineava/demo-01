<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急演练计划</span>
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
          label="演习类型细类:"
          prop="actingTypeDetailed"
        >
          <el-input
            v-model.trim="searchForm.actingTypeDetailed"
            placeholder="请输入演习类型细类"
          />
        </el-form-item>
        <el-form-item
          label="演习地点:"
          prop="planAddress"
        >
          <el-input
            v-model.trim="searchForm.planAddress"
            placeholder="请输入演习地点"
          />
        </el-form-item>
        <el-form-item
          label="演练牵头单位:"
          prop="planOrganization"
        >
          <el-input
            v-model.trim="searchForm.planOrganization"
            placeholder="请输入演练牵头单位"
          />
        </el-form-item>
        <el-form-item
          label="年度计划:"
          prop="planType"
        >
          <el-select
            v-model="searchForm.planType"
            clearable
            placeholder="请选择"
            style="width: 184px;"
          >
            <el-option
              v-for="item in planType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发布状态:"
          prop="postStatus"
        >
          <el-select
            v-model="searchForm.postStatus"
            clearable
            placeholder="请选择"
            style="width: 184px;"
          >
            <el-option
              v-for="item in postStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="填报时间:"
          prop="screenStartTime"
        >
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
      <el-button
        v-if="button_roles.create"
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd('add')"
      >
        新增应急演练计划
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
          width="65"
        >
          <template v-slot="scope">
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="所属管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="演习名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="演习类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.actingType }}
          </template>
        </el-table-column>
        <el-table-column label="演习类型细类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.actingTypeDetailed }}
          </template>
        </el-table-column>
        <el-table-column label="演习地点" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planAddress }}
          </template>
        </el-table-column>
        <el-table-column label="演练牵头单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planOriginator }}
          </template>
        </el-table-column>
        <el-table-column label="计划天数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planDays }}
          </template>
        </el-table-column>
        <el-table-column label="参演人员" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planPersons }}
          </template>
        </el-table-column>
        <el-table-column label="年度计划" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planType && planType.filter(item => (item.value === scope.row.planType))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.postStatus && postStatus.filter(item => (item.value === scope.row.postStatus))[0].label }}
          </template>
        </el-table-column>
        <el-table-column label="计划填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planFillInTime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc || button_roles.update ||button_roles.version_change ||button_roles.release ||button_roles.delete"
          label="操作"
          align="center"
          :width="130"
        >
          <template v-slot="scope">
            <el-dropdown>
              <el-button size="mini" type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="button_roles.desc" @click.native="handleAdd('info', scope.row)"><em class="el-icon-info" /> 详情</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.update" :disabled="(scope.row.postStatus === 1 && scope.row.state!==2) ? false : true" @click.native="handleAdd('edit', scope.row)"><em class="el-icon-edit" /> 编辑</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.version_change" :disabled="(scope.row.postStatus === 2 && scope.row.state!==2) ? false : true" @click.native="handleAdd('change', scope.row)"><em class="el-icon-edit" /> 变更</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.release" :disabled="(scope.row.postStatus === 2 || scope.row.state===2) ? true : false" @click.native="handlePost(scope.$index, scope.row)"><em class="el-icon-s-promotion" /> 发布</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.delete" :disabled="scope.row.state!==2 ? false : true" @click.native="handleDelete(scope.$index, scope.row)"><em class="el-icon-delete" /> 删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import { emergencyTrain } from '@/utils/public-fields'
import { getPageList, deleteExercise, releaseExercise } from '@/api/emergency-services/exercise-plan'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  mixins: [emergencyTrain],
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
        planType: '',
        actingType: '',
        actingTypeDetailed: '',
        postStatus: '',
        planOriginator: ''
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
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59')
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
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
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
     * 新建/编辑
     */
    handleAdd(type, item) {
      this.$router.push({ path: '/emergency/drillplanAdd', query: { id: item ? item.id : null, oper:type,postStatus:item ? item.postStatus : '' }})
    },
    /**
     * 发布
     */
    handlePost(_, item) {
      releaseExercise({ id: item.id }).then(res => {
        if (res.code === '0') {
          this.$message.success('发布成功!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
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
