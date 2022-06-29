<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急机构查询</span>
    </div>
    <el-row :gutter="10">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
      >
        <OrgAssembly res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
        <div class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            size="small"
          >
            <el-form-item
              label="应急机构名称:"
              prop="name"
            >
              <el-input
                v-model.trim="searchForm.name"
                placeholder="请输入应急机构名称"
              />
            </el-form-item>
            <el-form-item
              label="机构联系人:"
              prop="contact"
            >
              <el-input
                v-model.trim="searchForm.contact"
                placeholder="请输入机构联系人"
              />
            </el-form-item>
            <el-form-item
              label="联系电话:"
              prop="phone"
            >
              <el-input
                v-model.trim="searchForm.phone"
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="submitForm"
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
                {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="应急机构名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="机构联系人" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.contact }}
              </template>
            </el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.phone }}
              </template>
            </el-table-column>
            <el-table-column label="管理部门" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.enterpriseName }}
              </template>
            </el-table-column>
            <el-table-column label="更新时间" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.updateTime }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleEdit(scope.row)"
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getInPageList } from '@/api/emergency-services/organization'
import pagination from '@/components/Pagination'
import OrgAssembly from '../components/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchForm: {
        name: '',
        contact: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    if (this.user_info.orgcategory!=='1'){
      this.searchForm.orgCode = this.user_info.orgcode
      this.searchForm.organizationName = this.user_info.orgname
    }
    this.fetchData()
  },
  methods: {
    clickOrgMenu(name,code){
      this.searchForm.organizationName = name
      this.searchForm.orgCode = code
      this.currentPage = 1
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getInPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(item) {
      this.$router.push({ path: '/intact/emergency/organ/edit', query: { id: item ? item.id : null }})
    }
  }
}
</script>
