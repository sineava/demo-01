<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口规划文件</span>
    </div>
    <el-row :gutter="20">
      <el-col
        v-if="areaList.length"
        :span="4"
        class="left"
        :style="`height: ${ clientHeight - 260}px;`"
      >
        <el-menu
          v-if="areaList.length"
          class="el-menu-vertical-demo menu"
          :collapse="false"
          :default-openeds="openeds"
          @select="handleSelect"
          @open="handleOpen"
        >
          <el-submenu v-for="(item, index) in areaList" :key="index" :index="'m_'+(index+1)">
            <template v-slot:title>
              <i class="el-icon-menu" />
              <span>{{ item.portName }}</span>
            </template>
            <template>
              <div class="input">
                <el-input
                  v-model="searchText"
                  prefix-icon="el-icon-search"
                  placeholder="请输入港区名称"
                  @input="areaSearch"
                />
              </div>
            </template>
            <el-menu-item
              v-for="vo in item.portAreaVoList"
              :key="vo.id"
              :class="isActive && isActive===vo.id ? 'isactive': ''"
              @click.native="handleClick(vo.id)"
            >
              {{ vo.portAreaName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="areaList.length ? 20 : 24" class="left" :style="`height: ${ clientHeight - 260}px;`">
        <div class="app-container">
          <div class="container">
            <el-form
              ref="searchForm"
              class="form"
              :model="searchForm"
              :inline="true"
              size="small"
              label-width="80px"
            >
              <el-form-item
                label="岸线名称:"
                prop="coastlineName"
              >
                <el-input
                  v-model="searchForm.coastlineName"
                  placeholder="请输入岸线名称"
                />
              </el-form-item>
              <el-form-item
                label="所在航道:"
                prop="channel"
              >
                <el-select
                  v-model="searchForm.channel"
                  clearable
                  placeholder="请选择所在航道"
                >
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="submitForm('searchForm')"
                >
                  查询
                </el-button>
                <el-button
                  icon="el-icon-refresh-left"
                  @click="resetForm('searchForm')"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-button
                v-if="button_roles.create"
                style="float: left; margin-right: 10px;"
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="handleEdit('add')"
              >
                新增港口规划文件
              </el-button>
              <DownUpload
                filename="岸线规划文件导入模板.xlsx"
                :button_roles="button_roles"
                @uploadExcel="uploadExcel"
                @getExportData="getExportData"
              />
            </div>
            <el-table
              v-loading="listLoading"
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
                align="center"
              >
                <template v-slot="scope">
                  {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="岸线名称" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.coastlineName }}
                </template>
              </el-table-column>
              <el-table-column label="所在港口名称" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  <span>{{ scope.row.portName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所在港区名称" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.portAreaName }}
                </template>
              </el-table-column>
              <el-table-column label="所在航道" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.channel && channel.filter(item => (item.value === scope.row.channel))[0].label }}
                </template>
              </el-table-column>
              <el-table-column label="岸别" align="center">
                <template v-slot="scope">
                  {{ scope.row.type === 1 ? '左' : '右' }}
                </template>
              </el-table-column>
              <el-table-column label="合计" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.totalLength }}
                </template>
              </el-table-column>
              <el-table-column label="已开发利用" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.usingLength && scope.row.usingLength + '米' }}
                </template>
              </el-table-column>
              <el-table-column label="规划利用" align="center" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.planningLength && scope.row.planningLength + '米' }}
                </template>
              </el-table-column>
              <el-table-column
                label="利用状况"
                width="100"
                :show-overflow-tooltip="true"
                align="center"
              >
                <template v-slot="scope">
                  {{ scope.row.utilizationStatus }}
                </template>
              </el-table-column>
              <el-table-column
                label="规划用途"
                width="100"
                :show-overflow-tooltip="true"
                align="center"
              >
                <template v-slot="scope">
                  {{ scope.row.planningPurposes }}
                </template>
              </el-table-column>
              <el-table-column
                v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
                label="操作"
                align="center"
                :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
              >
                <template v-slot="scope">
                  <el-button
                    v-if="button_roles.desc"
                    size="mini"
                    plain
                    @click="handleEdit('detail', scope.row)"
                  >
                    <em class="el-icon-info" /> 详情
                  </el-button>
                  <el-button
                    v-if="button_roles.update"
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit('edit', scope.row)"
                  >
                    <em class="el-icon-edit-outline" /> 编辑
                  </el-button>
                  <el-button
                    v-if="button_roles.delete"
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.row)"
                  >
                    <em class="el-icon-delete" /> 删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          background
          @change="paginationChange"
        />
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import DownUpload from '@/components/features/DownUpload'
import { shoreLine } from '@/utils/public-fields'
import { getPortArea, getPageList, deleteLine, exportCoastlinePlanning, bulkImport } from '@/api/port-services/coastline/coastline-planning'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    DownUpload
  },
  mixins: [shoreLine],
  data() {
    return {
      current: 2,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      isActive: '',
      searchText:'',
      openeds:['m_1'],
      clientHeight:document.body.clientHeight,
      row: '',
      areaList: [], // 区域列表
      areaLists: [],
      searchForm: {
        portAreaId: '',
        coastlineName: '',
        channel: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchPortArea()
    this.fetchData()
  },
  methods: {
    handleSelect(key, keyPath){
    },
    handleOpen(key){
      this.openeds.push(key)
    },
    /**
     * 查询区域列表
     */
    async fetchPortArea() {
      getPortArea().then(res => {
        this.areaList = res.data ? res.data : []
        this.areaLists = this.areaList
      })
    },
    /** 港区搜索 */
    areaSearch(e){
      const lists = []
      if (e){
        this.areaLists.forEach(elem => {
          const sxList = {
            id:elem.id,
            portName:elem.portName,
            portAreaVoList:[]
          }
          elem.portAreaVoList.forEach(item=>{
            if (item.portAreaName.search(e) !== -1){
              sxList.portAreaVoList.push(item)
            }
          })
          lists.push(sxList)
        })
        this.areaList = lists
      } else {
        this.areaList = this.areaLists
      }

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
      exportCoastlinePlanning({ ...this.searchForm }).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          portAreaName: '岸线规划名称',
          portAreaId: '所在区域',
          coastLinePoint: '岸线起迄点（千米）',
          channel: '所在航道',
          type: '岸别',
          totalLength: '规划港口岸线长度（米）合计',
          usingLength: '规划港口岸线长度（米）已开发利用',
          planningLength: '规划港口岸线长度（米）规划利用',
          utilizationStatus: '利用状况',
          planningPurposes: '规划用途'
          // remark: '备注'
        }
        const arr = [...this.table.map(x => ({
          portAreaName: x.portAreaName,
          portAreaId: x.portAreaId,
          coastLinePoint: x.coastLinePoint,
          channel: x.channel,
          type: x.type,
          totalLength: x.totalLength,
          usingLength: x.usingLength,
          planningLength: x.planningLength,
          utilizationStatus: x.utilizationStatus,
          planningPurposes: x.planningPurposes
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '岸线规划文件' })
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm.portAreaId = ''
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
     * 新增/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/plan/fileEdit', query: { type, id: item ? item.id : null }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteLine({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 菜单点击
     */
    handleClick(val) {
      this.searchForm.portAreaId = val
      this.isActive = val
      this.currentPage = 1
      this.fetchData()
    }
  }
}
</script>

<style  lang="scss" scoped>
.left::-webkit-scrollbar {
    display: none;
}

.left {
    overflow-y: auto;

    .el-menu-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.el-menu {
    border-top: solid 1px #e6e6e6;
    border-left: solid 1px #e6e6e6;
}

.menu {
    .input {
        margin: 10px 5px;
    }

    .el-menu-item {
        border-bottom: 1px solid #e6e6e6;
    }

    .isactive {
        color: #ffffff !important;
        background: #409eff;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

    /deep/ .is-active {
        color: #303133;
    }
}
</style>
