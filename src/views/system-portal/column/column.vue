<template>
  <div>
    <div v-if="type === 'list'">
      <div>
        <el-form
          ref="ruleForm"
          inline
          :model="ruleForm"
          size="small"
          class="system-form"
        >
          <el-form-item
            label="栏目名称"
            prop="columnName"
          >
            <el-input
              v-model.trim="ruleForm.columnName"
              placeholder="栏目名称"
            />
          </el-form-item>
          <el-form-item label="更新时间">
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
          <el-button
            style="float: right;"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addColumn"
          >
            新增栏目
          </el-button>
        </el-form>
        <el-table
          v-loading="listLoading"
          style="margin: 0;"
          :data="list"
          element-loading-text="Loading"
          stripe
          fit
          highlight-current-row
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          class="table-border"
        >
          <el-table-column
            label="排序"
            :show-overflow-tooltip="true"
            prop="columnSort"
          />
          <el-table-column
            label="栏目名称"
            prop="columnName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="栏目描述"
            prop="columnDescribe"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="状态">
            <template v-slot="scope">
              {{ scope.row.isEnable === 1 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            prop="updateTime"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            width="280"
          >
            <template v-slot="scope">
              <el-button
                size="mini"
                plain
                @click="handleDetail(scope.$index, scope.row)"
              >
                <em class="el-icon-edit" /> 编辑
              </el-button>
              <el-button
                size="mini"
                plain
                @click="handleSetting(scope.$index, scope.row)"
              >
                <em class="el-icon-s-tools" /> 状态
              </el-button>
              <el-button
                size="mini"
                type="danger"
                plain
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
      <el-dialog
        :visible.sync="dialogVisible"
        title="状态"
        width="600px"
      >
        <el-form
          ref="settingForm"
          :model="settingForm"
          label-width="100px"
          size="medium"
          class="setting-form"
        >
          <el-form-item
            label="选择状态"
            prop="status"
          >
            <el-radio
              v-model="settingForm.status"
              label="1"
              border
            >
              启用
            </el-radio>
            <el-radio
              v-model="settingForm.status"
              label="0"
              border
            >
              禁用
            </el-radio>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="startStopColumn"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <detail
      v-if="type === 'detail' || type === 'add'"
      :id="checkId"
      :tab-type="tabType"
      @preservationEnd="preservationEnd"
    />
  </div>
</template>
<script>
import { momentDate } from '@/utils/index'
import { getColumnList, startStopColumn, deleteColumn } from '@/api/system-portal/column'
import pagination from '@/components/Pagination'
import Detail from './detail'
export default {
  components: {
    pagination,
    Detail,
  },
  data() {
    return {
      type: 'list',
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      columnType: 'hy',
      screenTime: [],
      ruleForm: {
        columnType: '1', // 默认行业端
        columnName: '',
        isEnable: null,
        screenStartTime: '',
        screenEndTime: ''
      },
      dialogVisible: false,
      settingForm: {
        status: ''
      },
      startPicker: {
        disabledDate: time => {
          if (this.ruleForm.screenEndTime) {
            return time.getTime() > this.ruleForm.screenEndTime.getTime()
          }
        }
      },
      endPicker: {
        disabledDate: time => {
          if (this.ruleForm.screenStartTime) {
            return time.getTime() < this.ruleForm.screenStartTime.getTime()
          }
        }
      },
      checkId: 0,
      tabType: null
    }
  },
  methods: {
    switchList(){
      this.type = 'list'
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getColumnList({
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
    preservationEnd(type) {
      type = String(type)
      this.type = 'list'
      this.tabType = type
      this.ruleForm.columnType = type
      this.columnType = type === '1' ? 'hy' : 'qy'
      this.fetchData()
    },
    addColumn() {
      this.type = 'add'
      this.checkId = 0
      this.tabType = this.ruleForm.columnType
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
    /**
     * 详情
     */
    handleDetail(index, item) {
      this.checkId = item.id
      this.type = 'detail'
      this.tabType = this.ruleForm.columnType
    },
    /**
     * 设置状态
     */
    handleSetting(index, item) {
      this.checkId = item.id
      this.settingForm.status = String(item.isEnable)
      this.dialogVisible = true
    },
    startStopColumn() {
      startStopColumn(this.checkId, this.settingForm.status).then(res => {
        if (res.code === '0') {
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteColumn(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * tab切换
     */
    typeClick(index) {
      this.ruleForm.columnType = index
      this.fetchData()
    }
  }

}
</script>
