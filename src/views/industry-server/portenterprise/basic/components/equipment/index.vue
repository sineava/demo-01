<template>
  <div class="body-card">
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
          label="负责人姓名:"
          prop="directorName"
        >
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请输入负责人姓名"
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
        <el-table-column label="编号" width="65">
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
            {{ type[scope.row.facilityCategory - 1].label }}
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
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
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
import { pageHyList } from '@/api/general-services/enterpriseInfo/enterpriseFacility'
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
      pageSize: 20,
      total: 0,
      ruleForm: {
        enterpriseId: '',
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
  created() {
    this.ruleForm.enterpriseId = this.$route.query.id
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
      pageHyList(data).then(res => {
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
      this.$emit('join', { name: '检测维护信息', data: { id: item.id, facilityName: item.facilityName, facilityCategory: item.facilityCategory }})
    },
    /**
     * 详情
     */
    handleDetail(item) {
      this.$emit('join', { name: '设施设备详情', data: { id: item.id }})
    }
  }
}
</script>

