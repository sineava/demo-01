<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>船舶电子档案管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="船舶识别号:"
          prop="shipIdentifyNo"
        >
          <el-input
            v-model.trim="searchForm.shipIdentifyNo"
            placeholder="请输入船舶识别号"
          />
        </el-form-item>
        <el-form-item
          label="船舶登记号:"
          prop="shipRegisterNo"
        >
          <el-input
            v-model.trim="searchForm.shipRegisterNo"
            placeholder="请输入船舶登记号"
          />
        </el-form-item>
        <el-form-item
          label="船名:"
          prop="shipName"
        >
          <el-input
            v-model.trim="searchForm.shipName"
            placeholder="请输入船名"
          />
        </el-form-item>
        <el-form-item label="建成日期:">
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
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="船舶识别号"
          prop="shipIdentifyNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶登记号"
          prop="shipRegisterNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="中文船名"
          prop="shipName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船籍港"
          prop="registryPort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶所有人"
          prop="shipOwner"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶经营人"
          prop="shipOperator"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="建成日期"
          prop="completionDate"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶状态"
          prop="shipStatus"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.desc ||button_roles.update"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) "
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleAdd(scope.row.id)"
            >
              <em class="el-icon-info" />
              详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              plain
              @click="handleAdd(scope.row.id, true)"
            >
              <em class="el-icon-edit" />
              编辑
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
import { getList } from '@/api/ship-inspection/electronic-archives/electronic-archives'
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
        shipIdentifyNo: '',
        shipRegisterNo: '',
        shipName: ''
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
      getList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startCompletionDate: momentDate(screenStartTime),
        endCompletionDate: momentDate(screenEndTime, 'YYYY-MM-DD 23:59:59')
      }).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
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
     * 详情/编辑
     */
    handleAdd(id, isEdit) {
      this.$router.push({ path: '/electronic-archives/electronic-archives/detail', query: { id, isEdit }})
    }
  }
}
</script>
