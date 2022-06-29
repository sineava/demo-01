<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急队伍查询</span>
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
              label="应急队伍名称:"
              prop="name"
            >
              <el-input
                v-model.trim="searchForm.name"
                placeholder="请输入应急队伍名称"
              />
            </el-form-item>
            <!-- <el-form-item
          label="所属港区:"
          prop="harbourDistrictName"
        >
          <el-input
            v-model.trim="searchForm.harbourDistrictName"
            placeholder="请输入所属港区"
          />
        </el-form-item> -->
            <el-form-item
              label="所属应急机构:"
              prop="organizationName"
            >
              <el-input
                v-model.trim="searchForm.organizationName"
                placeholder="请输入所属应急机构"
              />
            </el-form-item>
            <el-form-item
              label="级别:"
              prop="level"
            >
              <el-input
                v-model.trim="searchForm.level"
                placeholder="请输入级别"
              />
            </el-form-item>
            <el-form-item
              label="联系人:"
              prop="contact"
            >
              <el-input
                v-model.trim="searchForm.contact"
                placeholder="请输入联系人"
              />
            </el-form-item>
            <el-form-item
              label="联系电话:"
              prop="contactPhone"
            >
              <el-input
                v-model.trim="searchForm.contactPhone"
                placeholder="请输入联系电话"
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
                {{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="应急队伍名称"
              :show-overflow-tooltip="true"
            >
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="所属港区">
          <template v-slot="scope">
            {{ scope.row.harbourDistrictName }}
          </template>
        </el-table-column> -->
            <el-table-column label="所属应急机构" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.organizationName }}
              </template>
            </el-table-column>
            <el-table-column label="级别" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.level }}
              </template>
            </el-table-column>
            <el-table-column label="联系人" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.contact }}
              </template>
            </el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.contactPhone }}
              </template>
            </el-table-column>
            <el-table-column label="总人数" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.headcount }}
              </template>
            </el-table-column>
            <el-table-column label="专长描述" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.featDescription }}
              </template>
            </el-table-column>
            <el-table-column label="提交时间" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.updateTime }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getInPageList } from '@/api/emergency-services/team'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
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
        // harbourDistrictName: '',
        enterpriseName: '',
        level: '',
        contact: '',
        contactPhone: '',
        orgCode:'',
        organizationName:''
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
    handleDetail(item) {
      this.$router.push({ path: '/intact/emergency/team/detail', query: { id: item.id }})
    }
  }
}
</script>
