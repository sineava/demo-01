<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>检查计划管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="计划名称:"
          prop="planningName"
        >
          <el-input
            v-model.trim="searchForm.planningName"
            placeholder="请输入计划名称"
          />
        </el-form-item>
        <el-form-item
          label="计划类型:"
          prop="categoryId"
        >
          <el-select
            v-model="searchForm.categoryId"
            clearable
            placeholder="请选择计划类型"
            style="width: 184px;"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="检查单位:"
          prop="isUseUnit"
        >
          <!-- <el-input
            v-model.trim="searchForm.isUseUnit"
            placeholder="请输入发布单位"
          /> -->
          <el-cascader
            v-model="searchForm.isUseUnit"
            placeholder="请选择检查单位"
            style="width: 300px;"
            :show-all-levels="false"
            :options="treeData"
            :props="{ checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="发布状态:"
          prop="publishStatus"
        >
          <el-select
            v-model="searchForm.publishStatus"
            clearable
            placeholder="请选择发布状态"
            style="width: 184px;"
          >
            <el-option
              label="未发布"
              value="0"
            />
            <el-option
              label="已发布"
              value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="search"
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
          @click="handleDetail(null, null, 'add')"
        >
          新增检查计划
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
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
        <el-table-column
          label="计划名称"
          :show-overflow-tooltip="true"
          align="left"
          prop="planningName"
        />
        <el-table-column
          label="计划类型"
          prop="categoryName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检查单位"
          prop="isUseUnit"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span v-for="(item,index) in scope.row.isUseUnit" :key="index">  {{ index!==0 ? '、':'' }}{{ item ? item[item.length-1] : '' }}</span>
            <!-- <span v-for="(item,index) in scope.row.isUseUnit" :key="index">  {{ index!==0 ? '、':'' }}{{ item ? item.join(' / ') : '' }}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="检查时间"
          prop="planningTime"
          align="center"
          width="150"
        />
        <el-table-column label="是否邀请专家" width="110" align="center">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isExpertInvited === 0" type="warning">否</el-tag>
            <el-tag v-else type="success">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          align="center"
          width="150"
        />
        <el-table-column label="抽查类型" width="100" align="center">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isRandom === 0" type="warning">指定抽取</el-tag>
            <el-tag v-if="scope.row.isRandom === 1">单随机</el-tag>
            <el-tag v-if="scope.row.isRandom === 2" type="success">双随机</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布状态" width="100" align="center">
          <template v-slot="scope">
            <span>{{ scope.row.publishStatus === 0 ? '未发布' : '已发布' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc ||(button_roles.publishStatus || button_roles.release)"
          label="操作"
          align="center"
          :width="(button_roles.update ? 70 : 0) + (button_roles.delete ? 70 : 0) + (button_roles.desc ? 70 : 0) + ((button_roles.publishStatus || button_roles.release) ? 70 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.release"
              :disabled="scope.row.publishStatus === 0 ? false : true"
              size="mini"
              plain
              @click="releasePlan(scope.row)"
            >
              发布
            </el-button>
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, 1, 'detail')"
            >
              详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              plain
              :disabled="scope.row.publishStatus !== 0"
              @click="handleDetail(scope.row, null, 'edit')"
            >
              编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              :disabled="scope.row.publishStatus !== 0"
              @click="handleDelete(scope.row)"
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
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { pageList, deletePlan, releasePlan } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { getSelectDepartments } from '@/api/general-services/intact'
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
      searchForm: {
        isUseUnit: '',
        categoryId: '',
        planningName: '',
        publishStatus: ''
      },
      treeData:[],
      managementDepartmentList: [],
      categoryList: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    const info = await findByCategoryList({ type: 1 })
    this.categoryList = info.data
    this.getDepartments()
    this.fetchData()
  },
  methods: {
    getDepartments() {
      getSelectDepartments().then(res => {
        if (!res.data) return
        this.useUnitList = res.data
        this.treeData = this.gettreeData(res.data)
      })
    },
    gettreeData(data){
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.enterpriseId] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.parentId]
        it.label = it.departmentName
        it.value = it.departmentName
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      data.isUseUnit = data.isUseUnit ? data.isUseUnit[data.isUseUnit.length-1] : ''
      pageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.list.forEach((item,index) => {
          this.list[index].isUseUnit = item.isUseUnit ? JSON.parse(item.isUseUnit) : []
        })
        this.total = res.data ? res.data.total : 0
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
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
     * 详情
     */
    handleDetail(item, disabled, type) {
      this.$router.push({ path: '/safe/supervise/planDetail', query: { id: item?.id, disabled, type }})
    },
    /**
     * 发布
     */
    releasePlan(item) {
      this.$confirm('即将发布, 是否继续?', '操作确认').then(() => {
        releasePlan(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('发布成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deletePlan(item.id).then(res => {
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

