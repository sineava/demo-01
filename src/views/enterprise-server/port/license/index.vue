<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口经营许可证信息</span>
      <div class="tab-wrap" style="float: right; margin: 0 0 20px 0;">
        <el-radio-group
          v-model="activeName"
          size="small"
          @change="changeRadio"
        >
          <el-radio-button label="港口经营许可证信息" />
          <el-radio-button v-if="enterpriseId && button_roles.history" label="历史资质" />
        </el-radio-group>
      </div>
    </div>
    <div v-if="activeName==='港口经营许可证信息'" class="app-container">
      <div class="icon-title">
        <el-button type="success" v-if="button_roles.update" size="small" @click="isEdit=!isEdit">{{ isEdit ? '取消编辑' : '编辑' }}</el-button>
      </div>
      <PortLicense ref="PortLicense" :data="licenseData" :isEdit="isEdit" />
      <div style="text-align: center;">
        <el-button
          v-if="isEdit"
          v-loading="loading"
          size="small"
          type="primary"
          @click="saveData"
        >
          立即保存
        </el-button>
      </div>
    </div>
    <div v-if="activeName==='历史资质'" class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item label="到期时间:" prop="screenTime">
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
            @click="submitForm('searchForm')"
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="办公地址" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column label="管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column label="发证日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.releaseDate }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.maturityDate || '永久' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.$index, scope.row)"
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
  </el-card>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getBusinessLicensePageList,getQyLicense,resetLicense } from '@/api/general-services/enterprise-qualification/business-license'
import pagination from '@/components/Pagination'
import PortLicense from '@/views/components/license/port'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    PortLicense
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      licenseData:{},
      isEdit:false,
      fileList:[],
      loading:false,
      enterpriseId:'',
      activeName: '港口经营许可证信息',
      searchForm: {
        enterpriseName: '',
        certificateNumber: ''
      },
      user:{},
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async created() {
    const res = await findByUserId()
    this.user = res.data
    this.license()
  },
  methods: {
    changeRadio(e) {
      this.activeName = e
      if (this.activeName==='历史资质'){
        this.fetchData()
      } else {
        this.license()
      }
    },
    license(){
      getQyLicense({}).then(res => {
        this.licenseData = res.data || {}
        if (res.data){
          this.enterpriseId = res.data.id
          this.fileList = this.licenseData.filePath ? JSON.parse(this.licenseData.filePath) : []
        } else {
          this.licenseData.enterpriseId = this.user.id
          this.licenseData.enterpriseName = this.user.enterpriseName
          this.licenseData.departmentName = this.user.organizationName
        }
      })
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const [startTime, endTime] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(startTime),
        endTime: momentDate(endTime,'YYYY-MM-DD 23:59:59'),
        enterpriseId:this.enterpriseId
      }
      getBusinessLicensePageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    // 保存
    async saveData() {
      if (this.loading){
        return false
      }
      this.loading = true
      let data = await this.$refs.PortLicense.submitForm()
      if (data===false){
        return false
      }
      if (data.ischange){
        data.id = ''
        delete data.ischange
      }
      const res = await resetLicense(data)
      this.loading = false
      if (res.code==='0'){
        this.$message.success('保存成功')
        this.isEdit = false
        this.license()
      }
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.fetchData()
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
    /**
     * 详情
     */
    handleDetail(index, item) {
      this.$router.push({ path: '/enterprise/qualification/licenseDetail', query: { id: item.id }})
    },
    /**
     * 历史资质
     */
    handleInfo(item) {
      this.$router.push({ path: '/enterprise/qualification/licenseHistory', query: { certificateNumber: item.certificateNumber }})
    }
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>

