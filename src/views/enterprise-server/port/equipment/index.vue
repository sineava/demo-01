<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口设施设备信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="设备名称:"
          prop="facilityName"
        >
          <el-input
            v-model.trim="ruleForm.facilityName"
            placeholder="请输入设备名称"
          />
        </el-form-item>
        <el-form-item
          label="设备类别:"
          prop="facilityCategory"
        >
          <el-select
            v-model="ruleForm.facilityCategory"
            clearable
            placeholder="请选择设备类别"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人姓名:"
          prop="directorName"
        >
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请输入负责人姓名"
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
            @click="resetForm('ruleForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleDetail"
      >
        新增设备/设施
      </el-button>
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
            {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="设备名称"
          prop="facilityName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="设备类别"
          prop="facilityCategory"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.facilityCategory && type[scope.row.facilityCategory - 1] ? type[scope.row.facilityCategory - 1].label : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="负责人姓名"
          prop="directorName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="手机号码"
          prop="contactNumber"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="检测维护信息">
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleInfo(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.update || button_roles.delete || button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row, true)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <em class="el-icon-info" /> 删除
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
import { pageEnList, deleteFacility } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
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
      ruleForm: {
        facilityName: '',
        directorName: '',
        facilityCategory: ''
      },
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ]
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
      const data = { ...this.ruleForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageEnList(data).then(res => {
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
     * 维护信息
     */
    handleInfo(index, item) {
      this.$router.push({ path: '/enterprise/basic/equipmentInfo', query: { id: item.id, facilityName: item.facilityName, facilityCategory: item.facilityCategory }})
    },
    /**
     * 详情
     */
    handleDetail(item, disabled) {
      this.$router.push({ path: '/enterprise/basic/equipmentDetail', query: { id: item.id, disabled: disabled }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteFacility(item.id).then(res => {
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

