<template>
  <div>
    <div>
      <div>
        <el-form
          ref="ruleForm"
          inline
          :model="ruleForm"
          size="small"
          class="system-form"
        >
          <el-form-item
            label="用户账号:"
            prop="loginAccount"
          >
            <el-input
              v-model.trim="ruleForm.loginAccount"
              placeholder="请输入用户账号"
            />
          </el-form-item>
          <el-form-item label="时间:">
            <el-date-picker
              v-model="screenTime"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
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
              @click="resetForm('ruleForm')"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          stripe
          fit
          highlight-current-row
          class="table-border"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column
            label="用户账号"
            prop="loginAccount"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="客户端信息"
            prop="clientInfo"
            min-width="140"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="类型"
            :show-overflow-tooltip="true"
          >
            登录
          </el-table-column>
          <el-table-column
            label="IP地址"
            prop="ip"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="时间"
            prop="time"
            :show-overflow-tooltip="true"
          />
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
  </div>
</template>
<script>
import { momentDate } from '@/utils/index'
import { getLoginInfo } from '@/api/log-server/log'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      ruleForm: {
        select: '',
        name: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getLoginInfo({
        ...this.ruleForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime),
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 重置查询条件
     */
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
  }

}
</script>
