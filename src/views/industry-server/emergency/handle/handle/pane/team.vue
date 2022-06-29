<template>
  <div>
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>应急队伍
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <el-button
      v-if="type === 'index' && tabType === 'add'"
      type="primary"
      size="small"
      @click="handleAdd"
    >
      添加应急队伍
    </el-button>
    <div class="app-container">
      <el-form
        v-if="type === 'add'"
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item>
          <em
            class="el-icon-back"
            style="font-size: 14px; cursor: pointer;"
            @click="back"
          />
        </el-form-item>
        <el-form-item
          label="队伍名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入队伍名称"
          />
        </el-form-item>
        <!-- <el-form-item
          label="所属港区:"
          prop="harbourDistrictId"
        >
          <el-input
            v-model.trim="searchForm.harbourDistrictId"
            placeholder="请输入所属港区"
          />
        </el-form-item> -->
        <el-form-item
          label="应急机构:"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入应急机构"
          />
        </el-form-item>
        <el-form-item
          label="距离:"
          prop="distance"
        >
          <el-select v-model="searchForm.distance" placeholder="请选择">
            <el-option label="5KM" value="5000" />
            <el-option label="10KM" value="10000" />
            <el-option label="20KM" value="20000" />
            <el-option label="50KM" value="50000" />
            <el-option label="全部" value="" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="fetchData"
          >
            查询
          </el-button>
          <el-button
            size="mini"
            icon="el-icon-refresh-left"
            @click="resetForm"
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
        style="width: 100%;"
      >
        <el-table-column
          label="编号"
          width="65"
          align="center"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="应急队伍名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="所属港区">
          <template v-slot="scope">
            <span>{{ scope.row.harbourDistrictName }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="应急机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.organizationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.level }}</span>
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
        <el-table-column label="总人数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.headcount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专长描述" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.featDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="距离(km)" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.distance + 'km' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'index'"
          label="操作"
          width="180"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="state !== 3 ? false : true"
              @click="handleTeamRevoke(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 撤回
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'add'"
          label="操作"
          width="270"
        >
          <template v-slot="scope">
            <el-button
              v-if="tabType === 'add'"
              size="mini"
              plain
              :disabled="scope.row.isDispatch === 1"
              @click="handleDispatch(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 派遣
            </el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="tabType === 'add'"
              size="mini"
              type="danger"
              :disabled="scope.row.isDispatch === 2"
              @click="handleTeamRevoke(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 撤回
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
  </div>
</template>

<script>
import { pageResponseTeam, withdrawTeam, pageTeamList, dispatchTeam } from '@/api/emergency-services/disposal-respons'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      type: 'index', // index:首页,add: 添加应急队伍页
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        harbourDistrictId: '',
        enterpriseName: '',
        distance: undefined
      },
      port: [
        { value: '1', label: '法律' },
        { value: '2', label: '法规' }
      ],
      department: [
        { value: '1', label: '法律' },
        { value: '2', label: '法规' }
      ],
      level: [
        { value: '1', label: '法律' },
        { value: '2', label: '法规' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 返回
    back() {
      this.type = 'index'
      this.fetchData()
    },
    // 查询列表数据
    fetchData() {
      if (this.type === 'index') {
        this.listLoading = true
        pageResponseTeam({
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
      if (this.type === 'add') {
        this.listLoading = true
        pageTeamList({
          ...this.searchForm,
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
    },
    // 查询
    submitForm() {
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 添加应急队伍
    handleAdd() {
      this.type = 'add'
      this.fetchData()
    },
    handleDetail(type, item) {
      this.$router.push({ path: '/emergency/data/teamAdd', query: { id: item.teamId, type }})
    },
    // 撤回
    handleTeamRevoke(_, item) {
      withdrawTeam({ responseTeamId: item.responseTeamId }).then(res => {
        if (res.code === '0') {
          this.$message.success('撤回完成!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 派遣
    handleDispatch(_, item) {
      const dto = {
        disposalId: this.id,
        teamId: item.id
      }
      dispatchTeam(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('派遣完成!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
