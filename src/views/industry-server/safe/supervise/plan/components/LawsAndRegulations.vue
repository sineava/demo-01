<template>
  <div class="body-card">
    <div class="app-container">
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
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名称"
          prop="fileName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="文件类型"
          prop="fileType"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="颁布机构"
          prop="enactOrganization"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="颁布文号"
          prop="enactTitanic"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="颁布时间"
          prop="enactTime"
        />
        <el-table-column
          label="操作"
          width="100px"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleAdd(scope.row)"
            >
              <em class="el-icon-plus" /> 关联
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400, 1000]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
  </div>
</template>

<script>
import { pageList } from '@/api/general-services/public-information/lawsAndRegulations'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 400
    }
  },
  async mounted() {
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
      pageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleAdd(item) {
      this.$emit('getLegislation', item)
    }
  }
}
</script>

