<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back" v-if="storageName">
        <el-page-header @back="returnBack" :content="`『${storageName}』应急物资信息`" />
      </span>
      <span v-else>应急物资信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          v-if="!searchForm.storageId"
          label="储备点名称:"
          prop="name"
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
          prop="typeName"
        >
          <el-select
            v-model="searchForm.typeName"
            clearable
            placeholder="请选择物资类别"
            style="width: 100%;"
          >
            <el-option
              v-for="item in materialType"
              :key="item.id"
              :label="item.name"
              :value="item.name"
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
      <div style="display: flex;">
        <el-button
          style="float: left; margin-right: 10px;"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit('add')"
        >
          新增应急物资
        </el-button>
        <DownUpload
          filename="应急物资导入模板.xlsx"
          :button_roles="button_roles"
          @uploadExcel="uploadExcel"
        />
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
        <el-table-column label="物资储备点名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.storageName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资类别" width="160" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ getType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="物资细类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ getDetailedType(scope.row.type,scope.row.detailedType) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="物资状态" width="100" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ getState(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.specifications }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位" width="120" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.measuringUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资数量" width="100" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.numbers }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="260"
        >
          <!-- <el-table-column
          v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        > -->
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
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
    </div>
  </el-card>
</template>

<script>
import { getPageList, deleteMaterial,getMaterialType,bulkImport } from '@/api/emergency-services/material'
import pagination from '@/components/Pagination'
import { emergencyGoods } from '@/utils/public-fields'
import { mapGetters } from 'vuex'
import DownUpload from '@/components/features/DownUpload'
export default {
  components: {
    pagination,
    DownUpload
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
      storageId:'',
      storageName:'',
      searchForm: {
        name: '',
        typeName: '',
        state: '',
        storageId: '',
        storageName:''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  watch:{
    $route:{
      handler(val,oldval){
        this.searchForm.storageId = val.query?.id || ''
        this.storageName = val.query?.name || ''
        this.fetchData()
      },
      // 深度观察监听
      deep: true
    }
  },
  async created() {
    this.button_roles['import'] = true
    // 从应急物资储备点跳转过来
    if (this.$route.query) {
      this.storageId = this.$route.query.id
      this.storageName = this.$route.query.name || ''
      this.searchForm.storageId = this.$route.query.id
    }
    await this.initMaterialType()
    this.fetchData()
  },
  methods: {
    /**
     * 导入表格
     */
    async uploadExcel(formData, end) {
      const res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    async initMaterialType(){
      const res = await getMaterialType()
      this.materialType = res.data || []
    },
    getState(state){
      let name = ''
      for (let i=0;i<this.field_state.length;i++){
        if (state===this.field_state[i].value){
          name = this.field_state[i].label
          return name
        }
      }
      return name
    },
    getDetailedType(type,detailedType){
      let name = ''
      for (let i=0;i<this.field_detailedType[Number(type)-1].length;i++){
        if (detailedType===this.field_detailedType[Number(type)-1][i].value){
          name = this.field_detailedType[Number(type)-1][i].label
          return name
        }
      }
      return name
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
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.fetchData()
        } else {

          return false
        }
      })
    },
    /**
     * 重置查询条件
     */
    resetForm() {
      this.searchForm = {
        name: '',
        typeName: '',
        state: '',
        storageId: this.searchForm.storageId,
        storageName:''
      }
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
    /**
     * 新建/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/emergency/infoEdit', query: { type, id: item ? item.id : null,storageId:type === 'add' ? this.storageId : '' }})
    },
    /**
     * 删除
     */
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteMaterial({ id: item.id }).then(res => {
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
