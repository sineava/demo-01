<template>
  <div class="body-card">
    <div class="clearfix" style="font-size: 16px;font-weight: 600;height: 50px;line-height: 50px;border-radius: 5px;padding: 0 5px;background: #e1f0ff;margin-bottom: 20px;">
      <span>应急物资
        <span
          v-if="state !== 3"
          style="color: red;"
        >（救援中）</span>
        <span
          v-else
          style="color: green;"
        >救援终止</span>
      </span>
    </div>
    <el-button
      v-if="type === 'index' && tabType === 'add'"
      type="primary"
      size="small"
      @click="handleAdd"
    >
      添加应急物资
    </el-button>
    <div class="app-container">
      <el-form
        v-if="type === 'add'"
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item>
          <em
            class="el-icon-back"
            style="font-size: 14px; cursor: pointer;"
            @click="back"
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
          label="物资类型:"
          prop="type"
        >
          <el-select
            v-model="searchForm.type"
            clearable
            placeholder="请选择"
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
            placeholder="请选择"
          >
            <el-option
              v-for="item in field_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="距离:"
          prop="distance"
        >
          <el-select v-model="searchForm.distance" placeholder="请选择">
            <el-option label="5KM" value="5000" />
            <el-option label="10KM" value="10000" />
            <el-option label="20KM" value="20000" />
            <el-option label="50KM" value="50000" />
            <el-option label="全部" value="" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
          >
            查询
          </el-button>
          <el-button
            size="mini"
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
        style="width: 100%;"
      >
        <el-table-column
          label="编号"
          width="65"
          align="center"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
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
        <el-table-column label="物资类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ getType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="物资细类">
          <template v-slot="scope">
            <span>{{ scope.row.detailedType && field_detailedType[scope.row.type - 1].find(item => (item.value === scope.row.detailedType)).label }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="规格型号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.specifications }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.state && field_state.find(item => (item.value === scope.row.state)).label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="距离" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ (scope.row.distance || scope.row.distance === 0) ? `${scope.row.distance}KM` : '0KM' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物资数量" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.numbers }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.measuringUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'add'"
          label="调用数量"
          width="150"
        >
          <template v-slot="scope">
            <el-input-number
              v-model="scope.row.transfer"
              :min="0"
              :max="scope.row.numbers"
              style="margin-left: 5px; width: 100px;"
              :controls="false"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'index'"
          label="操作"
          width="180"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="tabType === 'add'"
              size="mini"
              type="danger"
              @click="handleTeamRevoke(scope.$index, scope.row)"
            >
              <em class="el-icon-delete" /> 撤回
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'add'"
          label="操作"
          width="180"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              :disabled="scope.row.numbers === 0"
              @click="handleDispatch(scope.$index, scope.row)"
            >
              <em class="el-icon-info" /> 调用
            </el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail('detail', scope.row)"
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
import { emergencyGoods } from '@/utils/public-fields'
import { pageResponseMaterial, pageMaterial, withdrawMaterial, dispatchMaterial } from '@/api/emergency-services/disposal-respons'
import pagination from '@/components/Pagination'
import { getMaterialType } from '@/api/emergency-services/material'
export default {
  components: {
    pagination
  },
  mixins: [emergencyGoods],
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      type: 'index', // index:首页,add: 添加应急物资页
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      materialType:[],
      searchForm: {
        name: '',
        type: '',
        state: '',
        distance: undefined
      }
    }
  },
  async created() {
    await this.initMaterialType()
    this.fetchData()
  },
  methods: {
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
    // 返回
    back() {
      this.type = 'index'
      this.fetchData()
    },
    // 查询列表数据
    fetchData() {
      if (this.type === 'index') {
        this.listLoading = true
        pageResponseMaterial({
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
      if (this.type === 'add') {
        this.listLoading = true
        pageMaterial({
          ...this.searchForm,
          disposalId: this.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.data ? res.data.records.map(data => ({ ...data, transfer: 0 })) : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }
    },
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchData()
        } else {

          return false
        }
      })
    },
    // 查询详情
    handleDetail(type, item) {
      this.$router.push({ path: '/emergency/data/infoEdit', query: { id: item.materialId, type }})
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    // 切换每页大小
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 添加应急物资
    handleAdd() {
      this.type = 'add'
      this.fetchData()
    },
    // 撤回物资
    handleTeamRevoke(_, item) {
      const dto = {
        disposalId: this.id,
        materialId: item.materialId,
        numbers: item.transfer,
        responseId: item.responseId || 0
      }
      withdrawMaterial(dto).then(res => {
        if (res.code === '0') {
          this.$message.success('撤回完成!')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 派遣物资
    handleDispatch(_, item) {
      if (!item.transfer) {
        this.$message.warning('未选择调用数量')
      } else {
        const dto = {
          disposalId: this.id,
          materialId: item.materialId,
          numbers: item.transfer,
          responseId: item.responseId || 0
        }
        dispatchMaterial(dto).then(res => {
          if (res.code === '0') {
            this.$message.success('派遣完成!')
            this.fetchData()
          }
        })
      }
    }
  }
}
</script>
