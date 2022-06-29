<template>
<div>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span>船舶基础数据管理</span>
      <span class="detail-header-button">
        <el-button
          :type="tabActive === 1 ? 'primary' : ''"
          @click="tabChange(1)"
        >
          系统已有数据
        </el-button>
        <el-button
          :type="tabActive === 2 ? 'primary' : ''"
          @click="tabChange(2)"
        >
          海事系统查询
        </el-button>
      </span>
    </div>
    <div v-if="tabActive === 2">
      <div class="icon-title">
        <span class="span" />  船舶查询添加（<span style="color:#409EFF"> 请选择输船舶识别号进行查询添加</span>）
      </div>
      <div style="margin-top: 20px;">
        <el-input placeholder="请输入内容" v-model="shipIdentifyNo" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="船舶识别号" value="1"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" type="primary" :loading="searchLoading" @click="searchQuery">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div v-if="tabActive === 1" class="app-container">
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
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0)"
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
   <Maritime v-if="info.id" :searchId="Number(info.id)" />
</div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getList } from '@/api/ship-inspection/electronic-archives/ship-basic'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import Maritime from './detail.vue'
import { updateShipInfo } from '@/api/ship-inspection/records/index'
export default {
  components: {
    pagination,
    Maritime
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tabActive: 1,
      screenTime: [],
      searchForm: {
        shipIdentifyNo: '',
        shipRegisterNo: '',
        shipName: ''
      },
      searchLoading: false,
      shipIdentifyNo: '',
      info: {},
      select: '1'
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
    tabChange(num) {
      this.tabActive = num
      if (num == 1) {
        this.shipIdentifyNo = ''
        this.info = {}
        this.fetchData()
      }
    },
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
      this.$router.push({ path: '/electronic-archives/basic-info/detail', query: { id, isEdit }})
    },
    searchQuery() {
      this.searchLoading = true;
      updateShipInfo({shipIdentifyNo: this.shipIdentifyNo}).then(res => {
        this.searchLoading = false;
        if (res.code === '0') {
          this.info = res?.data || {}
        }
      })
    }
  }
}
</script>
<style>
.input-with-select .el-select .el-input {
  width: 130px;
}
</style>
<style lang="scss" scoped>
/deep/ .clearfix {
  display: flex;
  align-items: center;

  .detail-header-button {
    margin-left: 50px;
  }
}
</style>