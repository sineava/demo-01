<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type }}管理</span>
      <span style="float: right;">
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="水文信息" />
          <el-radio-button label="站点位置信息" />
        </el-radio-group>
      </span>
    </div>
    <div v-show="type==='水文信息'" class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item label="日期范围选择:">
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
            @click="submitForm"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm"
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
          新增水文信息
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
        <el-table-column label="日期">
          <template v-slot="scope">
            {{ scope.row.operationDate }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template v-slot="scope">
            {{ scope.row.updateTime }}
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
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row)"
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
    <div v-show="type==='站点位置信息'" class="app-container">
      <el-table
        :data="watersTableData"
        :span-method="objectSpanMethod"
        border
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        :header-cell-style="{ backgroundColor: '#F2F2F2' }"
      >
        <el-table-column
          prop="waters"
          label="水域"
          align="center"
          width="150"
        />
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
        />
        <el-table-column
          prop="name"
          label="水文站"
        />
        <el-table-column
          prop="latitude"
          label="纬度"
        />
        <el-table-column
          prop="longitude"
          label="经度"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="siteEdit(scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <SiteLocation ref="SiteLocation" @refresh="refreshSite" />
    </div>
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getPageList, deleteExercise,selectWatersList } from '@/api/emergency-services/hydrological'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import SiteLocation from './site-location'
export default {
  components: {
    pagination,
    SiteLocation
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      watersTableData:[],
      searchForm: {},
      screenTime: [],
      type:'水文信息'
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
    this.initWatersList()
  },
  methods: {
    // 初始化站点位置信息
    initWatersList(){
      selectWatersList().then(res=>{
        this.watersTableData = res.data
      })
    },
    refreshSite(){
      this.initWatersList()
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex === 6) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 10 || rowIndex === 16) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if ([12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].includes(rowIndex)) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59'),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    siteEdit(row){
      this.$refs.SiteLocation.init(row)
    },
    /**
     * 查询
     */
    submitForm() {
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm() {
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
     * 新建/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/emergency/data/hydrologyEdit', query: { id: item ? item.id : null, type }})
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
      }).catch()
    }
  }
}
</script>
