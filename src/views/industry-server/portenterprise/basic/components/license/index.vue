<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="clickTab">
      <el-tab-pane label="港口经营许可证信息" name="港口经营许可证信息">
        <div v-if="activeName==='港口经营许可证信息'" class="app-container">
          <div class="icon-title">
            <el-button type="success" size="small" @click="isEdit=!isEdit">{{ isEdit ? '取消编辑' : '编辑' }}</el-button>
          </div>
          <PortLicense ref="PortLicense" :data="info" :isEdit="isEdit" />
          <div style="text-align: center;">
            <el-button
              v-if="isEdit"
              v-loading="loading"
              type="primary"
              size="small"
              @click="submitForm('ruleForm')"
            >
              修改保存
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史资质" name="历史资质">
        <div v-if="activeName==='历史资质'" class="app-container">
          <el-form
            ref="selectForm"
            :model="selectForm"
            :inline="true"
            size="small"
          >
            <el-form-item label="到期时间:">
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
                @click="resetForm"
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
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            fit
            highlight-current-row
            class="table-border"
          >
            <el-table-column
              label="编号"
              width="55"
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { getBusinessLicensePageList,getHyLicense,resetLicense } from '@/api/general-services/enterprise-qualification/business-license'
import pagination from '@/components/Pagination'
import PortLicense from '@/views/components/license/port'
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
      type:'',
      total: 0,
      loading:false,
      info:{},
      activeName: '港口经营许可证信息',
      screenTime: [],
      isEdit:false,
      selectForm: {
        enterpriseName: '',
        certificateNumber: '',
        enterpriseId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    let { type , id ,name} = this.$route.query
    this.type = type
    this.selectForm.enterpriseId = id
    this.license()
  },
  methods: {
    clickTab(e) {
      this.activeName = e.name
      if (e.name==='历史资质'){
        this.fetchData()
      } else {
        this.license()
      }
    },
    license(){
      getHyLicense({enterpriseId:this.selectForm.enterpriseId}).then(res => {
        if (res.code==='0' && res.data){
          this.info = res.data
        } else {
          this.info = {
            address:'',
            businessScope:'',
            certificateNumber:'',
            filePath:'',
            geographical:'',
            id:'',
            maturityDate:'',
            operator:'',
            principal:'',
            releaseDate:'',
            departmentName:this.$route.query.departmentName,
            enterpriseId: this.$route.query.id,
            enterpriseName: this.$route.query.name
          }
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
        ...this.selectForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(startTime),
        endTime: momentDate(endTime,'YYYY-MM-DD 23:59:59')
      }
      getBusinessLicensePageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm() {
      this.$refs.selectForm.resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 提交
    submitForm() {
      this.saveData()
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
     * 详情
     */
    handleDetail(_, item) {
      this.$emit('join', { name: '港口经营许可证详情', data: { id: item.id }})
    },
    /**
     * 查看经营许可证历史
     */
    handleInfo(item) {
      this.$emit('join', { name: '港口经营许可证历史资质', data: { id: item.id, certificateNumber: item.certificateNumber }})
    }
  }
}
</script>
