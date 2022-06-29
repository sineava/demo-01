<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>法律法规资料数据管理</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="文件名称:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入文件名称"
          />
        </el-form-item>
        <el-form-item
          label="文件类型:"
          prop="fileType"
        >
          <el-cascader
            v-model="searchForm.fileType"
            style="width: 100%;"
            :options="options"
            :props="{ value: 'id',label:'name' }"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="颁布时间:"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
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
      <el-button
        v-if="button_roles.create"
        style="float: left; margin: 0 20px 10px 0;"
        type="primary"
        size="small"
        @click="handleAdd()"
      >
        新增法律法规
      </el-button>
      <!-- <DownUpload
        filename="法律法规导入模板.xlsx"
        :button_roles="button_roles"
        @uploadExcel="uploadExcel"
        @getExportData="getExportData"
      /> -->
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
        <el-table-column label="文件名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.fileName && scope.row.fileName.length > 20 ? scope.row.fileName.slice(0, 20) + '...' : scope.row.fileName }}
          </template>
        </el-table-column>
        <el-table-column label="文件类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.fileType && scope.row.fileType.length > 20 ? scope.row.fileType.slice(0, 20) + '...' : scope.row.fileType }}
          </template>
        </el-table-column>
        <el-table-column label="颁布机构" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enactOrganization && scope.row.enactOrganization.length > 20 ? scope.row.enactOrganization.slice(0, 20) + '...' : scope.row.enactOrganization }}
          </template>
        </el-table-column>
        <el-table-column label="颁布文号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enactTitanic && scope.row.enactTitanic.length > 20 ? scope.row.enactTitanic.slice(0, 20) + '...' : scope.row.enactTitanic }}
          </template>
        </el-table-column>
        <el-table-column label="颁布时间">
          <template v-slot="scope">
            {{ momentDate(scope.row.enactTime,'YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + 95"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleAdd(scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
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
import { momentDate } from '@/utils/index'
import { pageList, deleteLawRegulation, exportList, bulkImport,getLayType } from '@/api/general-services/public-information/lawsAndRegulations'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tempUrl: '',
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      options:[],
      screenTime: [],
      searchForm: {
        keyword: '',
        fileType: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
    this.getType()
  },
  methods: {
    momentDate,
    // 新增法律法规
    handleAdd(item) {
      this.$router.push({ path: '/data/lawAdd', query: { id: item ? item.id : null }})
    },
    // 查询列表数据
    fetchData() {
      this.listLoading = true
      let [ startTime, endTime ] = this.screenTime || []
      const queryInfo = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: momentDate(startTime),
        endTime: momentDate(endTime, 'YYYY-MM-DD 23:59:59')
      }
      queryInfo.fileType = queryInfo.fileType ? queryInfo.fileType[queryInfo.fileType.length-1] : ''
      pageList(queryInfo).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    getType(){
      getLayType({}).then(res => {
        res.data.forEach((item,index)=>{
          res.data[index].pid = item.pid || 0
        })
        const data = res.data ? this.toTreeData(res.data) : []
        data.forEach((item,index) => {
          if (item.children.length===0){
            delete data[index].children
          } else {
            item.children.forEach((val,key)=>{
              if (val.children.length===0){
                delete data[index].children[key].children
              }
            })
          }
        })
        this.options = data
      })
    },
    /**
     * 递归树
     */
    toTreeData(data) {
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },
    tree(data, id) {
      const arr = []
      data.filter(item => {
        return item.pid === id
      }).forEach(item => {
        arr.push({
          ...item,
          children: this.tree(data, item.id)
        })
      })
      return arr
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
      exportList({
        ...this.searchForm,
        startTime: momentDate(this.searchForm.startTime),
        endTime: momentDate(this.searchForm.endTime)
      }).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          fileName: '文件名称',
          fileType: '文件类型',
          enactOrganization: '颁布机构',
          enactTitanic: '颁布文号',
          enactTime: '颁布时间',
          synopsis: '简介'
        }
        const arr = [...this.table.map(x => ({
          fileName: x.fileName,
          fileType: x.fileType,
          enactOrganization: x.enactOrganization,
          enactTitanic: x.enactTitanic,
          enactTime: x.enactTime,
          synopsis: (x.synopsis).replace(/<[^>]+>/g, '')
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '法律法规' })
      })
    },
    // 查询
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
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
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
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/data/lawInfo', query: { id: item.id }})
    },
    /**
     * 删除
     */
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteLawRegulation(item.id).then(res => {
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

