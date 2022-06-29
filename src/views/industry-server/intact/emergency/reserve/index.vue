<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急物资储备点</span>
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
          label="储备点名称:"
          prop="storageName"
        >
          <el-input
            v-model.trim="searchForm.storageName"
            placeholder="请输入储备点名称"
          />
        </el-form-item>
        <el-form-item
          label="物资名称:"
          prop="name"
        >
          <el-input
            v-model.trim="searchForm.name"
            placeholder="请输入物资名称"
          />
        </el-form-item>
        <el-form-item
          label="物资类别:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            clearable
            placeholder="请选择物资类别"
            style="width: 100%;"
          >
            <el-option
              v-for="item in materialType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="物资状态:"
          prop="state"
        >
          <el-select
            v-model="searchForm.state"
            clearable
            placeholder="请选择物资状态"
            style="width: 100%;"
          >
            <el-option
              v-for="item in field_state"
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
        <el-table-column label="物资名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="物资储备点名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.storageName }}
          </template>
        </el-table-column>
        <el-table-column label="所属港航机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="物资类别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ getType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.state && field_state.find(item => (item.value === scope.row.state)).label }}
          </template>
        </el-table-column>
        <el-table-column label="规格型号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.specifications }}
          </template>
        </el-table-column>
        <el-table-column label="计量单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.measuringUnit }}
          </template>
        </el-table-column>
        <el-table-column label="物资数量" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.numbers }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
import { getInPageList,getMaterialType } from '@/api/emergency-services/material'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
import { emergencyGoods } from '@/utils/public-fields'
export default {
  components: {
    pagination,
    OrgAssembly
  },
  mixins: [emergencyGoods],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      materialType:[],
      searchForm: {
        storageName: '',
        name: '',
        type: '',
        detailedType: '',
        state: '',
        enterpriseId:''
      },
      needDetailType: []
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async created() {
    await this.initMaterialType()
    if (this.user_info.orgcategory!=='1'){
      this.searchForm.enterpriseId = this.user_info.orgcode
      this.searchForm.enterpriseName = this.user_info.orgname
    }
    this.fetchData()
  },
  methods: {
    clickOrgMenu(name,code){
      this.searchForm.enterpriseName = name
      this.searchForm.enterpriseId = code
      this.currentPage = 1
      this.fetchData()
    },
    async initMaterialType(){
      const res = await getMaterialType()
      this.materialType = res.data || []
    },
    getType(type){
      let name = ''
      for (let i=0;i<this.materialType.length;i++){
        if (type===this.materialType[i].id){
          name = this.materialType[i].name
          return name
        }
      }
      return name
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
        console.log(this.list,'列表')
      })
    },
    submitForm(formName) {
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
      this.$router.push({ path: '/intact/emergency/reserve/info-edit', query: { id: item ? item.id : null }})
    },
  }
}
</script>
