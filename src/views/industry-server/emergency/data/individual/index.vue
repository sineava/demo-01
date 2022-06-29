<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>单兵信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="单兵名称:"
          prop="individualName"
        >
          <el-input
            v-model.trim="searchForm.individualName"
            placeholder="请输入单兵名称"
          />
        </el-form-item>
        <el-form-item
          label="所属单位:"
          prop="affiliatedUnitName"
        >
          <el-input
            v-model.trim="searchForm.affiliatedUnitName"
            placeholder="请输入所属单位"
          />
        </el-form-item>
        <el-form-item
          label="单兵类型:"
          prop="individualType"
        >
          <el-select v-model="searchForm.individualType" placeholder="请选择">
            <el-option label="应急单兵" value="应急单兵" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="时间:"
          prop="timeList"
        >
          <el-date-picker
            v-model="searchForm.timeList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
      <div style="display: flex;">
        <el-button
          v-if="button_roles.create"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="addDialog"
        >
          新增单兵信息
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
        <el-table-column label="单兵名称">
          <template v-slot="scope">
            <span>{{ scope.row.individualName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属单位">
          <template v-slot="scope">
            <span>{{ scope.row.affiliatedUnitName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单兵类型">
          <template v-slot="scope">
            <span>{{ scope.row.individualType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话">
          <template v-slot="scope">
            <span>{{ scope.row.linkPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime }}</span>
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
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="addDialog(scope.row)"
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
      <el-dialog
        :visible.sync="addDialogVisible"
        :close-on-click-modal="false"
        title="新增单兵信息"
        width="600px"
      >
        <el-form
          v-if="addDialogVisible"
          ref="addForm"
          :model="addForm"
          :rules="rules"
          label-width="120px"
          size="medium"
        >
          <el-form-item
            label="单兵名称:"
            prop="individualName"
          >
            <el-input
              v-model="addForm.individualName"
              placeholder="请输入单兵名称"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item
            label="所属单位:"
            prop="affiliatedUnitId"
          >
            <el-select
              v-model="addForm.affiliatedUnitId"
              placeholder="请选择所属单位"
              style="width: 100%;"
              @change="affiliatedUnitChange"
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
            label="联系电话:"
            prop="linkPhone"
          >
            <el-input
              v-model="addForm.linkPhone"
              placeholder="请输入联系电话"
              maxlength="11"
            />
          </el-form-item>
          <el-form-item
            label="关联数据串:"
            prop="individualDeviceId"
          >
            <el-input
              v-model="addForm.individualDeviceId"
              placeholder="请输入关联数据串"
              minlength="50"
            />
          </el-form-item>
          <el-form-item
            label="单兵类型:"
            prop="individualType"
          >
            <el-select v-model="addForm.individualType" style="width: 100%;" placeholder="请选择单兵类型">
              <el-option label="应急单兵" value="应急单兵" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="备注:"
            prop="remark"
          >
            <el-input
              v-model="addForm.remark"
              type="textarea"
              rows="6"
              style="width: 100%;"
              placeholder="输入内容"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            :loading="saveLoading"
            @click="dialogSub"
          >保存</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { getList, deleteData, addData, redactData, getInfo } from '@/api/individual-soldier/single-pawn/single-pawn'
import pagination from '@/components/Pagination'
import { getOrgList } from '@/api/data-management/resources/other'
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
      saveLoading: false,
      pageSize: 20,
      total: 0,
      searchForm: {
        individualName: '',
        individualType: '',
        affiliatedUnitName: '',
        timeList: []
      },
      orgList: [],
      addDialogVisible: false,
      addForm: {},
      rules: {
        individualName: [
          { required: true, message: '请输入单兵名称', trigger: 'blur' }
        ],
        affiliatedUnitId: [
          { required: true, message: '请选择所属单位', trigger: 'change' }
        ],
        linkPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        individualDeviceId: [
          { required: true, message: '请输入关联数据串', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.orgList = (await getOrgList()).data
    this.fetchData()
  },
  methods: {
    // 获取所属单位名称
    affiliatedUnitChange() {
      this.addForm.affiliatedUnitName = this.orgList.filter(item => item.orgId === this.addForm.affiliatedUnitId)[0].orgName
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      let query = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const [ startTime, endTime ] = this.searchForm.timeList || []
      query.startTime = startTime ? startTime +' 00:00:00' :''
      query.endTime = endTime ? endTime +' 23:59:59' : ''
      delete query.timeList
      getList(query).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
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
    async addDialog(item) {
      this.addForm = item.id ? (await getInfo(item.id)).data :
        {
          affiliatedUnitId: '',
          affiliatedUnitName: '',
          id: '',
          individualDeviceId: '',
          individualName: '',
          individualType: '',
          linkPhone: '',
          remark: ''
        }
      this.addDialogVisible = true
    },
    // 保存
    dialogSub() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    async saveData() {
      this.saveLoading = true
      delete this.addForm.longitude
      delete this.addForm.latitude
      const res = this.addForm.id ? (await redactData(this.addForm)) : (await addData(this.addForm))
      this.saveLoading = false
      if (res.code === '0') {
        this.addDialogVisible = false
        this.fetchData()
      }
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/emergency/data/individual/detail', query: { id: item ? item.id : null}})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    }
  }
}
</script>
