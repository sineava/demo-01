<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="泊位信息" />
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
        label-width="80px"
      >
        <el-form-item
          label="泊位名称:"
          prop="berthName"
        >
          <el-input
            v-model.trim="searchForm.berthName"
            placeholder="请输入泊位名称"
          />
        </el-form-item>
        <el-form-item
          label="所属企业:"
          prop="belongingEnterprise"
        >
          <el-input
            v-model.trim="searchForm.belongingEnterprise"
            placeholder="请输入所属企业"
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
      <div>
        <el-button
          style="float: left; margin-right: 10px;"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleEdit('add')"
        >
          新增泊位信息
        </el-button>
        <DownUpload
          filename="码头泊位导入模板.xlsx"
          :other-data="{ wharfId }"
          @uploadExcel="uploadExcel"
          @getExportData="getExportData"
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
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="泊位名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.berthName }}
          </template>
        </el-table-column>
        <el-table-column label="所在码头" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.wharfName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属企业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.operatingEnterprise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结构形式" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.structuralStyle }}
          </template>
        </el-table-column>
        <el-table-column label="主要用途" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.mainUses }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="专业化码头分类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ ['集装箱','煤炭','金属矿石','原油','成品油','液体化工','液化天然气','液化石油气','散装粮食','散装水泥','客运','滚装'][scope.row.serviceType-1] }}
          </template>
        </el-table-column> -->
        <el-table-column label="竣工验收日期" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.acceptanceDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="核查靠泊能力" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.checkBerthingCapability }}吨</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260"
        >
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
              plain
              type="danger"
              @click="handleDelete(scope.row)"
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
import DownUpload from '@/components/features/DownUpload'
import { getPageList, deleteBerth, exportBerthInfo, bulkImport } from '@/api/port-services/coastline/berth'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination,
    DownUpload
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      searchForm: {
        berthName: '',
        belongingEnterprise: '',
        operatingEnterprise: '',
        serviceType: ''
      },
      wharfId: '',
      wharfName: '',
      coastlineName: ''
    }
  },
  created() {
    const { wharfId, wharfName, coastlineName } = this.$route.query
    this.wharfId = wharfId
    this.wharfName = wharfName
    this.coastlineName = coastlineName
    this.fetchData()
  },
  methods: {
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        wharfId: this.wharfId,
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
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
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      exportBerthInfo({
        ...this.searchForm,
        wharfId: this.wharfId
      }).then(res => {
        const table = res.data ? res.data : []
        const header = {
          mainUses: '主要用途',
          berthUses: '泊位用途',
          frontDesignWaterDepth: '前沿设计水深（米）',
          frontDesignActualDepth: '前沿实际水深（米）',
          berthLength: '泊位长度（米）',
          /*
           * totalLength: '设计靠泊能力（万吨级）',
           * usingLength: '散装、件杂货物年通过能力（万吨)',
           * planningLength: '集装箱年通过能力（万标准箱)',
           * utilizationStatus: '旅客年通过能力（万人）',
           * planningPurposes: '滚装汽车年通过能力（万辆）'
           */
          isDangerousGoods: '是否装卸危险货物'
        }
        const arr = [...table.map(x => ({
          mainUses: x.mainUses,
          berthUses: x.berthUses,
          frontDesignWaterDepth: x.frontDesignWaterDepth,
          frontDesignActualDepth: x.frontDesignActualDepth,
          berthLength: x.berthLength,
          isDangerousGoods: x.isDangerousGoods ? '是' : '否'
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '码头泊位文件' })
      })
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchData()
        } else {

          return false
        }
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    // 详情/编辑/新增
    handleEdit(type, item) {
      this.$router.push({
        path: '/plan/deepwaterMoorEdit',
        query: {
          type, wharfId: this.wharfId,
          id: item ? item.id : null,
          wharfName: this.wharfName,
          coastlineName: this.coastlineName
        }
      })
    },
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteBerth(id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    }
  }
}
</script>

