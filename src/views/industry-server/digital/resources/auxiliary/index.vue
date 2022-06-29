<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>辅助设施设备信息管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item
          label="分类:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属单位:"
          prop="orgId"
        >
          <el-select
            v-model="searchForm.orgId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in orgList"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="投用时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="fetchData"
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
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleDetail('', true)"
        >
          新增
        </el-button>
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
          label="设备名称"
          prop="name"
        />
        <el-table-column label="分类">
          <template v-slot="scope">
            {{ typeList[scope.row.type - 1].label }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属港区"
          prop="harbourDistrict"
        />
        <el-table-column
          label="所属单位"
          prop="orgName"
        />
        <el-table-column
          label="投用时间"
          prop="putIntoUseTime"
        />
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
              type="primary"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              plain
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="primary"
              plain
              @click="handleDelete(scope.row.id)"
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
import pagination from '@/components/Pagination'
import { getList, removeData } from '@/api/data-management/resources/auxiliary-facilities'
import { getOrgList } from '@/api/data-management/resources/other'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        type: '',
        orgId: ''
      },
      orgList: [],
      screenTime: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ]),
    typeList() {
      return [
        { label: '办公楼', value: 1 },
        { label: '控制室', value: 2 },
        { label: '变电室', value: 3 },
        { label: '配电室', value: 4 },
        { label: '生产泵房', value: 5 },
        { label: '排河口', value: 6 },
        { label: '防火堤', value: 7 },
        { label: '客运站（侯船大厅）', value: 8 },
        // { label: '视频监控点', value: 9 }
      ]
    }
  },
  async mounted() {
    this.orgList = (await getOrgList()).data
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime.length > 0) {
        data.startProductionTime = this.screenTime[0]
        data.endProductionTime = this.screenTime[1]
      }
      getList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
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
     * 删除
     */
    handleDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        removeData(id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 详情
     */
    handleDetail(item, isEdit) {
      this.$router.push({ path: '/digital/resources/auxiliaryDetail', query: { id: item.id, isEdit: isEdit }})
    }
  }
}
</script>
