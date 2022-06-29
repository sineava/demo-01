<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急物资信息" />
      </span>
    </div>
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
        <el-table-column label="物资储备点名称">
          <template v-slot="scope">
            {{ scope.row.storageName }}
          </template>
        </el-table-column>
        <el-table-column label="物资名称">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="物资类别">
          <template v-slot="scope">
            <span>{{ getType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="物资细类">
          <template v-slot="scope">
            {{ scope.row.detailedType && field_detailedType[scope.row.type - 1].find(item => (item.value === scope.row.detailedType)).label }}
          </template>
        </el-table-column> -->
        <el-table-column label="物资状态">
          <template v-slot="scope">
            {{ scope.row.state && field_state.find(item => (item.value === scope.row.state)).label }}
          </template>
        </el-table-column>
        <el-table-column label="规格型号">
          <template v-slot="scope">
            {{ scope.row.specifications }}
          </template>
        </el-table-column>
        <el-table-column label="计量单位">
          <template v-slot="scope">
            {{ scope.row.measuringUnit }}
          </template>
        </el-table-column>
        <el-table-column label="物资数量">
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
  </el-card>
</template>

<script>
import { getInPageList,getMaterialType } from '@/api/emergency-services/material'
import pagination from '@/components/Pagination'
import { emergencyGoods } from '@/utils/public-fields'
export default {
  components: {
    pagination
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
        typeName: '',
        detailedType: '',
        state: ''
      },
      needDetailType: [],
      detailType: [
        [
          { value: 1, label: '围油栏' },
          { value: 2, label: '吸油毡' },
          { value: 3, label: '吸油拖栏' },
          { value: 4, label: '吸油索' },
          { value: 5, label: '消油剂' },
          { value: 6, label: '凝油剂' },
          { value: 7, label: '收油机' },
          { value: 8, label: '卸载泵' },
          { value: 9, label: '水下抽油设备' },
          { value: 10, label: '存油转驳和储油设备' },
          { value: 11, label: '高压清洗机' },
          { value: 12, label: '起吊设备' },
          { value: 13, label: '作业船/运输车辆' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 14, label: '泄露监测/检测设备' },
          { value: 15, label: '应急围控设备' },
          { value: 16, label: '喷水装置' },
          { value: 17, label: '消防泵' },
          { value: 18, label: '中和物质' },
          { value: 19, label: '惰性物质' },
          { value: 20, label: '吸收材料' },
          { value: 21, label: '卸载泵' },
          { value: 22, label: '过驳船舶' },
          { value: 23, label: '应急信息系统' },
          { value: 24, label: '人员防护装备' },
          { value: 25, label: '疏浚设备' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 26, label: '应急拖缆' },
          { value: 27, label: '撇缆枪' },
          { value: 28, label: '救生攀爬网' },
          { value: 29, label: '救生衣' },
          { value: 30, label: '救生圈' },
          { value: 31, label: '救生绳' },
          { value: 32, label: '救生软梯' },
          { value: 33, label: '气胀式救生筏' },
          { value: 34, label: '充气救生滑梯' },
          { value: 35, label: '捞网、吊篮' },
          { value: 36, label: '监测搜救设备' },
          { value: 37, label: '机动救生艇' },
          { value: 38, label: '药品' },
          { value: 39, label: '衣被' },
          { value: 40, label: '食品、淡水' },
          { value: 41, label: '救生医疗器材' },
          { value: 42, label: '防爆式手持对讲机' },
          { value: 43, label: '海事卫星电话（车载）' },
          { value: 44, label: '海事卫星电话（手持）' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 45, label: '普通防护服' },
          { value: 46, label: '内置式重型防化服' },
          { value: 47, label: '封闭式防化服' },
          { value: 48, label: '全棉防静电外衣' },
          { value: 49, label: '保温工作服' },
          { value: 50, label: '防浸服' },
          { value: 51, label: '正压式空气呼吸器' },
          { value: 52, label: '防毒面具' },
          { value: 53, label: '酸碱手套' },
          { value: 54, label: '护目镜' },
          { value: 0, label: '其它' }
        ]
      ]
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.needDetailType = [] // 重置细类需要清空
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(item) {
      this.$router.push({ path: '/intact/emergency/reserve/info-edit', query: { id: item ? item.id : null }})
    }
  }
}
</script>
