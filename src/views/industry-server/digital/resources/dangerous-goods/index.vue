<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物设施信息管理</span>
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
          label="投产年份:"
        >
          <el-form-item prop="startProductionTime">
            <el-date-picker
              v-model="searchForm.startProductionTime"
              type="year"
              style="width: 160px;"
              :picker-options="startPicker"
              placeholder="请选择开始时间"
              value-format="yyyy"
            />
          </el-form-item>
          <span style="position: relative; right: 6px;">至</span>
          <el-form-item prop="endProductionTime">
            <el-date-picker
              v-model="searchForm.endProductionTime"
              type="year"
              style="width: 160px;"
              placeholder="请选择截止时间"
              :picker-options="endPicker"
              value-format="yyyy"
            />
          </el-form-item>
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
          label="所属单位"
          prop="orgName"
        />
        <el-table-column
          label="使用单位"
          prop="useOrgName"
        />
        <el-table-column
          label="投产年份"
          prop="productionYear"
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
import { momentDate } from '@/utils/index'
import pagination from '@/components/Pagination'
import { getList, removeData } from '@/api/data-management/resources/dangerous-goods-facilities'
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
        orgId: '',
        startProductionTime: '',
        endProductionTime: ''
      },
      orgList: [],
      screenTime: [],
      startPicker: {
        disabledDate: time => {
          if (this.searchForm.endTime) {
            return time.getTime() > this.searchForm.endTime.getTime()
          }
        }
      },
      endPicker: {
        disabledDate: time => {
          if (this.searchForm.startTime) {
            return time.getTime() < this.searchForm.startTime.getTime()
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ]),
    typeList() {
      return [
        { label: '储罐', value: 1 },
        { label: '重大危险资源', value: 2 },
        { label: '管线', value: 3 },
        { label: '汽车装卸台', value: 4 },
        { label: '火车装车台', value: 5 },
        { label: '堆场', value: 6 },
        { label: '仓库', value: 7 },
        { label: '加油（气）站', value: 8 }
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
      getList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startProductionTime: momentDate(this.searchForm.startProductionTime, 'YYYY'),
        endProductionTime: momentDate(this.searchForm.endProductionTime, 'YYYY')
      }).then(res => {
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
      this.$router.push({ path: '/digital/resources/dangerousGoodsDetail', query: { id: item.id, isEdit: isEdit }})
    }
  }
}
</script>
