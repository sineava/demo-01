<template>
  <el-card class="body-card" :style="{height: `${clientHeight - 140}px`}">
    <div
      slot="header"
      class="clearfix"
    >
      <span>公务船舶管理</span>
    </div>
    <el-row :gutter="10">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
      >
        <Org res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
        <div class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            style="margin-top: 10px;"
            size="small"
          >
            <el-form-item label="船名:" prop="shipName">
              <el-input
                v-model.trim="searchForm.shipName"
                placeholder="请输入船名"
              />
            </el-form-item>
            <el-form-item label="船舶识别号:" prop="shipIdentifyNo">
              <el-input
                v-model.trim="searchForm.shipIdentifyNo"
                placeholder="请输入船舶识别号"
              />
            </el-form-item>
            <!-- TIP: 后端拿不到船舶登记号,不要该字段 -->
            <el-form-item label="出厂日期:" prop="screenTime">
              <el-date-picker
                v-model="screenTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <br />
            <el-form-item style="margin-top: 8px">
              <el-button
                v-if="button_roles.create"
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="handleEdit('add')"
              >
                新增绑定
              </el-button>
              <el-button
                v-if="button_roles.export"
                type="primary"
                size="small"
                icon="el-icon-folder"
                @click="exportData"
              >
                导出
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="search()"
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
            <el-table-column label="编号" width="65">
              <template v-slot="scope">
                {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="单位" prop="enterpriseName" show-overflow-tooltip />
            <el-table-column label="船名" prop="shipName" show-overflow-tooltip />
            <el-table-column label="船舶类型" prop="shipType" show-overflow-tooltip />
            <el-table-column label="船舶识别号" prop="shipIdentifyNo" show-overflow-tooltip width="120" />
            <el-table-column label="总长（M）" prop="shipLength" show-overflow-tooltip width="120" />
            <el-table-column label="总吨（T）" prop="shipTons" show-overflow-tooltip width="120" />
            <el-table-column label="主机功率（KW）" prop="shipPower" show-overflow-tooltip width="140" />
            <el-table-column label="船舶材质" prop="shipMaterial" show-overflow-tooltip />
            <el-table-column label="出厂日期" prop="manufactureDate" show-overflow-tooltip />
            <el-table-column label="船舶用途" prop="shipPurpose" show-overflow-tooltip />
            <el-table-column label="资金来源" prop="capitalSource" show-overflow-tooltip />
            <el-table-column label="有无所有权证书" prop="isLicense" show-overflow-tooltip width="120" />
            <el-table-column label="船检证书到期日" prop="expiryDateOfSurveyCertificate" show-overflow-tooltip width="120" />
            <el-table-column label="国籍证书到期日" prop="nationalityCertificateExpireTime" show-overflow-tooltip width="120" />
            <el-table-column label="船舶使用状态" prop="usingState" show-overflow-tooltip width="120" />
            <el-table-column label="备注" prop="remark" show-overflow-tooltip />
            <el-table-column
              label="操作"
              align="center"
              fixed="right"
              :width="95 + (button_roles.desc ? 60 : 0) + (button_roles.update ? 60 : 0) + (button_roles.delete ? 60 : 0)"
            >
              <template v-slot="{row}">
                <el-button
                  v-if="button_roles.desc"
                  size="mini"
                  plain
                  @click="handleEdit('detail', row.id)"
                >
                  <em class="el-icon-info" /> 详情
                </el-button>
                <el-button
                  v-if="button_roles.update"
                  size="mini"
                  type="primary"
                  @click="handleEdit('edit', row.id)"
                >
                  <em class="el-icon-edit" /> 编辑
                </el-button>
                <el-button
                  v-if="button_roles.delete"
                  size="mini"
                  type="danger"
                  @click="handleDelete(row.id)"
                >
                  <em class="el-icon-link" /> 解绑
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import htmlToExcel from '@/utils/htmlToExcel'
import pagination from '@/components/Pagination'
import { getPageList, deleteInfo } from '@/api/ship-inspection/official-business-ship'
import { mapGetters } from 'vuex'
import Org from '../components/org'
export default {
  components: {
    pagination,
    Org
  },
  data() {
    return {
      list: [],
      listLoading: true,
      orgLoading:true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      searchForm: {},
      clientHeight: document.body.clientHeight
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || [null, null]
      const res = await getPageList({
        ...this.searchForm,
        isPage: true,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        enterpriseName: this.searchForm.organizationName,
        screenStartTime,
        screenEndTime
      })
      const { records, total } = res.data || {}
      this.listLoading = false
      this.list = records || []
      this.total = total || 0
    },
    clickOrgMenu(name){
      this.searchForm.organizationName = name
      this.search()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.search()
    },
    paginationChange({ currentPage, pageSize }) {
      this.pageSize = pageSize
      this.search(currentPage)
    },
    search(current = 1) {
      this.currentPage = current
      this.fetchData()
    },
    handleEdit(type, id) {
      this.$router.push({ path: '/asset/ship/ship/edit', query: { type, id } })
    },
    handleDelete(id) {
      this.$confirm('此操作将解绑该数据, 是否继续?', '操作确认').then(() => {
        deleteInfo(id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    async exportData() {
      const [screenStartTime, screenEndTime] = this.screenTime || [null, null]
      getPageList({
        ...this.searchForm,
        isPage: false,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        enterpriseName: this.searchForm.organizationName,
        screenStartTime,
        screenEndTime
      }).then(res => {
        console.log(res)
        const header = {
          enterpriseName: '单位',
          shipName: '船名',
          shipType: '船舶类型',
          shipIdentifyNo: '船舶识别号',
          shipLength: '总长（M）',
          shipTons: '总吨（T）',
          shipPower: '主机功率（KW）',
          shipMaterial: '船舶材质',
          manufactureDate: '出厂日期',
          shipPurpose: '船舶用途',
          capitalSource: '资金来源',
          isLicense: '有无所有权证书',
          expiryDateOfSurveyCertificate: '船检证书到期日',
          nationalityCertificateExpireTime: '国籍证书到期日',
          usingState: '船舶使用状态',
          remark: '备注'
        }
        const arr = [...(res?.data?.records || []).map(x => {
          const info = {}
          Object.keys(header).map(k => {
            info[k] = x[k]
          })
          return info
        })]
        arr.unshift(header)
        htmlToExcel.getJsonExcel(arr, '公务船舶管理')
      })
    }
  }
}
</script>
